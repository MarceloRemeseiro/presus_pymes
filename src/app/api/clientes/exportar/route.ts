import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { stringify } from 'csv-stringify/sync';

// GET /api/clientes/exportar - Exportar todos los clientes a CSV
export async function GET() {
  try {
    const clientes = await prisma.cliente.findMany({
      orderBy: {
        nombre: 'asc',
      },
    });

    if (!clientes.length) {
      return NextResponse.json({ message: 'No hay clientes para exportar.' }, { status: 404 });
    }

    // Definir las cabeceras del CSV
    const headers = [
      'id',
      'nombre',
      'tipo',
      'nif',
      'direccion',
      'ciudad',
      'email',
      'telefono',
      'createdAt',
      'updatedAt',
    ];

    // Mapear los datos de los clientes al formato esperado por el CSV
    const dataRows = clientes.map((cliente) => [
      cliente.id,
      cliente.nombre,
      cliente.tipo,
      cliente.nif || '',
      cliente.direccion || '',
      cliente.ciudad || '',
      cliente.email || '',
      cliente.telefono || '',
      cliente.createdAt.toISOString(),
      cliente.updatedAt.toISOString(),
    ]);

    // Combinar cabeceras y filas de datos
    const csvData = [headers, ...dataRows];

    // Convertir los datos a una cadena CSV
    // Usamos la opción 'quoted_empty' para asegurar que los campos vacíos se traten como ""
    // y 'quote' para asegurar que todos los campos estén entre comillas, manejando comas internas.
    const csvString = stringify(csvData, {
      quoted_empty: true,
      quote: '"', 
      delimiter: ',',
    });

    // Configurar las cabeceras de la respuesta para la descarga del archivo
    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', 'text/csv; charset=utf-8');
    responseHeaders.set('Content-Disposition', 'attachment; filename="clientes_exportados.csv"');

    return new NextResponse(csvString, {
      status: 200,
      headers: responseHeaders,
    });

  } catch (error) {
    console.error('Error al exportar clientes:', error);
    return NextResponse.json({ error: 'Error interno del servidor al exportar clientes.' }, { status: 500 });
  }
} 