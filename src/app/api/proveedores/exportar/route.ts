import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { stringify } from 'csv-stringify/sync';

// GET /api/proveedores/exportar - Exportar todos los proveedores a CSV
export async function GET() {
  try {
    const proveedores = await prisma.proveedor.findMany({
      orderBy: {
        nombre: 'asc',
      },
    });

    if (!proveedores.length) {
      return NextResponse.json({ message: 'No hay proveedores para exportar.' }, { status: 404 });
    }

    const headers = [
      'id',
      'nombre',
      'nif',
      'direccion',
      'email',
      'telefono',
      'contacto',
      'notas',
      'createdAt',
      'updatedAt',
    ];

    const dataRows = proveedores.map((prov) => [
      prov.id,
      prov.nombre,
      prov.nif || '',
      prov.direccion || '',
      prov.email || '',
      prov.telefono || '',
      prov.contacto || '',
      prov.notas || '',
      prov.createdAt.toISOString(),
      prov.updatedAt.toISOString(),
    ]);

    const csvData = [headers, ...dataRows];

    const csvString = stringify(csvData, {
      quoted_empty: true,
      quote: '"',
      delimiter: ',',
    });

    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', 'text/csv; charset=utf-8');
    responseHeaders.set('Content-Disposition', 'attachment; filename="proveedores_exportados.csv"');

    return new NextResponse(csvString, {
      status: 200,
      headers: responseHeaders,
    });

  } catch (error) {
    console.error('Error al exportar proveedores:', error);
    return NextResponse.json({ error: 'Error interno del servidor al exportar proveedores.' }, { status: 500 });
  }
} 