import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { parse } from 'csv-parse/sync';

// POST /api/personal/importar - Importar personal desde CSV
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

    let personalCreado = 0;
    let errores: string[] = [];
    const personalParaCrear = [];

    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      const linea = i + 2;

      if (!record.nombre || typeof record.nombre !== 'string') {
        errores.push(`Línea ${linea}: El campo 'nombre' es obligatorio y debe ser texto.`);
        continue;
      }
      // Podríamos añadir validación para email/telefono si es necesario

      // Por simplicidad, no comprobamos duplicados aquí, pero podría añadirse por email o teléfono si fueran únicos.

      personalParaCrear.push({
        nombre: record.nombre,
        telefono: record.telefono || null,
        email: record.email || null,
        notas: record.notas || null,
        // Los puestos no se importan en esta versión simplificada
      });
    }

    if (personalParaCrear.length > 0) {
      try {
        const resultadoCreacion = await prisma.personal.createMany({
          data: personalParaCrear,
          skipDuplicates: false, // No hay campos únicos definidos para personal (aparte de ID)
        });
        personalCreado = resultadoCreacion.count;
      } catch (dbError) {
        console.error('Error de base de datos al crear personal:', dbError);
        return NextResponse.json({ error: 'Error al guardar personal en la base de datos.', detalles: errores }, { status: 500 });
      }
    }

    let mensaje = `Importación completada. Personal creado: ${personalCreado}.`;
    if (errores.length > 0) {
      mensaje += ` Se encontraron ${errores.length} errores o advertencias.`;
      return NextResponse.json({ message: mensaje, errores: errores, personalCreado }, { status: 207 }); // 207 Multi-Status
    }

    return NextResponse.json({ message: mensaje, personalCreado });

  } catch (error: any) {
    console.error('Error al importar personal:', error);
    if (error.name === 'CSVParseError') {
      return NextResponse.json({ error: 'Error al parsear el archivo CSV. Verifique el formato.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Error interno del servidor al importar personal.' }, { status: 500 });
  }
} 