import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { stringify } from 'csv-stringify/sync';

// GET /api/personal/exportar - Exportar todo el personal a CSV
export async function GET() {
  try {
    const personal = await prisma.personal.findMany({
      include: {
        puestos: { // Incluir la relación con PersonalPuesto
          include: {
            puesto: true, // Incluir los datos del Puesto relacionado
          },
        },
      },
      orderBy: {
        nombre: 'asc',
      },
    });

    if (!personal.length) {
      return NextResponse.json({ message: 'No hay personal para exportar.' }, { status: 404 });
    }

    const headers = [
      'id',
      'nombre',
      'telefono',
      'email',
      'notas',
      'puestos', // Columna para los nombres de los puestos
      'createdAt',
      'updatedAt',
    ];

    const dataRows = personal.map((p) => [
      p.id,
      p.nombre,
      p.telefono || '',
      p.email || '',
      p.notas || '',
      // Mapear los puestos a una cadena separada por comas
      p.puestos.map(pp => pp.puesto.nombre).join(', ') || '',
      p.createdAt.toISOString(),
      p.updatedAt.toISOString(),
    ]);

    const csvData = [headers, ...dataRows];

    const csvString = stringify(csvData, {
      quoted_empty: true,
      quote: '"',
      delimiter: ',',
    });

    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', 'text/csv; charset=utf-8');
    responseHeaders.set('Content-Disposition', 'attachment; filename="personal_exportado.csv"');

    return new NextResponse(csvString, {
      status: 200,
      headers: responseHeaders,
    });

  } catch (error) {
    console.error('Error al exportar personal:', error);
    return NextResponse.json({ error: 'Error interno del servidor al exportar personal.' }, { status: 500 });
  }
} 