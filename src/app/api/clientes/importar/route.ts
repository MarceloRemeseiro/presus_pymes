import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { parse } from 'csv-parse/sync';

// POST /api/clientes/importar - Importar clientes desde CSV
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No se proporcionó ningún archivo.' }, { status: 400 });
    }

    // Validar tipo de archivo (opcional pero recomendado)
    if (file.type !== 'text/csv') {
      return NextResponse.json({ error: 'Formato de archivo no válido. Solo se permiten archivos CSV.' }, { status: 400 });
    }

    const fileContent = await file.text();

    // Parsear el contenido CSV
    // skip_empty_lines: true para ignorar líneas vacías
    // columns: true para usar la primera línea como cabeceras y obtener objetos
    // trim: true para eliminar espacios en blanco alrededor de los valores y cabeceras
    const records: any[] = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    if (!records.length) {
      return NextResponse.json({ error: 'El archivo CSV está vacío o no contiene datos válidos.' }, { status: 400 });
    }

    let clientesCreados = 0;
    let errores: string[] = [];
    const clientesParaCrear = [];

    // Validar y preparar datos para la creación
    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      const linea = i + 2; // +1 por cabecera, +1 por índice base 0

      // Validaciones básicas (puedes añadir más según necesidad)
      if (!record.nombre || typeof record.nombre !== 'string') {
        errores.push(`Línea ${linea}: El campo 'nombre' es obligatorio y debe ser texto.`);
        continue;
      }
      if (record.tipo && !['PARTICULAR', 'EMPRESA'].includes(record.tipo.toUpperCase())) {
        errores.push(`Línea ${linea}: El campo 'tipo' debe ser PARTICULAR o EMPRESA.`);
        continue;
      }
      if (record.nif && typeof record.nif !== 'string') {
        errores.push(`Línea ${linea}: El campo 'nif' debe ser texto.`);
        continue;
      }
      
      // Comprobar si el cliente con ese NIF ya existe (si se proporciona NIF)
      if (record.nif) {
        const nifExistente = await prisma.cliente.findUnique({
          where: { nif: record.nif },
        });
        if (nifExistente) {
          errores.push(`Línea ${linea}: Ya existe un cliente con el NIF ${record.nif}. Se omitirá este registro.`);
          continue;
        }
      }

      clientesParaCrear.push({
        nombre: record.nombre,
        tipo: record.tipo ? record.tipo.toUpperCase() : 'PARTICULAR',
        nif: record.nif || null,
        direccion: record.direccion || null,
        ciudad: record.ciudad || null,
        email: record.email || null,
        telefono: record.telefono || null,
        // createdAt y updatedAt se generarán automáticamente por Prisma
      });
    }

    if (clientesParaCrear.length > 0) {
      try {
        const resultadoCreacion = await prisma.cliente.createMany({
          data: clientesParaCrear,
          skipDuplicates: true, // Omitir duplicados basados en campos únicos (como NIF)
        });
        clientesCreados = resultadoCreacion.count;
      } catch (dbError) {
        console.error('Error de base de datos al crear clientes:', dbError);
        return NextResponse.json({ error: 'Error al guardar clientes en la base de datos.', detalles: errores }, { status: 500 });
      }
    }

    let mensaje = `Importación completada. Clientes creados: ${clientesCreados}.`;
    if (errores.length > 0) {
      mensaje += ` Se encontraron ${errores.length} errores o advertencias.`;
      return NextResponse.json({ message: mensaje, errores: errores, clientesCreados }, { status: 207 }); // 207 Multi-Status
    }

    return NextResponse.json({ message: mensaje, clientesCreados });

  } catch (error: any) {
    console.error('Error al importar clientes:', error);
    if (error.name === 'CSVParseError') {
      return NextResponse.json({ error: 'Error al parsear el archivo CSV. Verifique el formato.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Error interno del servidor al importar clientes.' }, { status: 500 });
  }
} 