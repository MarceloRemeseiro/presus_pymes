import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { parse } from 'csv-parse/sync';

// POST /api/proveedores/importar - Importar proveedores desde CSV
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No se proporcionó ningún archivo.' }, { status: 400 });
    }

    if (file.type !== 'text/csv') {
      return NextResponse.json({ error: 'Formato de archivo no válido. Solo se permiten archivos CSV.' }, { status: 400 });
    }

    const fileContent = await file.text();

    const records: any[] = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    if (!records.length) {
      return NextResponse.json({ error: 'El archivo CSV está vacío o no contiene datos válidos.' }, { status: 400 });
    }

    let proveedoresCreados = 0;
    let errores: string[] = [];
    const proveedoresParaCrear = [];

    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      const linea = i + 2;

      if (!record.nombre || typeof record.nombre !== 'string') {
        errores.push(`Línea ${linea}: El campo 'nombre' es obligatorio y debe ser texto.`);
        continue;
      }
       if (record.nif && typeof record.nif !== 'string') {
        errores.push(`Línea ${linea}: El campo 'nif' debe ser texto.`);
        continue;
      }

      // Comprobar si el proveedor con ese NIF ya existe
      if (record.nif) {
        const nifExistente = await prisma.proveedor.findUnique({
          where: { nif: record.nif },
        });
        if (nifExistente) {
          errores.push(`Línea ${linea}: Ya existe un proveedor con el NIF ${record.nif}. Se omitirá este registro.`);
          continue;
        }
      }

      proveedoresParaCrear.push({
        nombre: record.nombre,
        nif: record.nif || null,
        direccion: record.direccion || null,
        email: record.email || null,
        telefono: record.telefono || null,
        contacto: record.contacto || null,
        notas: record.notas || null,
      });
    }

    if (proveedoresParaCrear.length > 0) {
      try {
        const resultadoCreacion = await prisma.proveedor.createMany({
          data: proveedoresParaCrear,
          skipDuplicates: true, // Omitir duplicados basados en NIF
        });
        proveedoresCreados = resultadoCreacion.count;
      } catch (dbError) {
        console.error('Error de base de datos al crear proveedores:', dbError);
        return NextResponse.json({ error: 'Error al guardar proveedores en la base de datos.', detalles: errores }, { status: 500 });
      }
    }

    let mensaje = `Importación completada. Proveedores creados: ${proveedoresCreados}.`;
    if (errores.length > 0) {
      mensaje += ` Se encontraron ${errores.length} errores o advertencias.`;
      return NextResponse.json({ message: mensaje, errores: errores, proveedoresCreados }, { status: 207 }); // 207 Multi-Status
    }

    return NextResponse.json({ message: mensaje, proveedoresCreados });

  } catch (error: any) {
    console.error('Error al importar proveedores:', error);
    if (error.name === 'CSVParseError') {
      return NextResponse.json({ error: 'Error al parsear el archivo CSV. Verifique el formato.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Error interno del servidor al importar proveedores.' }, { status: 500 });
  }
} 