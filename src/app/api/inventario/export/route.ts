import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { stringify } from 'csv-stringify/sync';

export async function GET(req: Request) {
  try {
    const productosConItems = await prisma.producto.findMany({
      include: {
        marca: true,
        categoria: true,
        equipoItems: {
          include: {
            proveedor: true, // Incluir el proveedor del EquipoItem
          },
        },
      },
      orderBy: {
        nombre: 'asc',
      },
    });

    const recordsToExport = [];
    const headers = [
      'producto_id',
      'producto_nombre',
      'producto_marca_nombre',
      'producto_modelo',
      'producto_categoria_nombre',
      'producto_descripcion',
      'producto_precio_venta',
      'producto_precio_compra',
      'producto_precio_alquiler',
      'equipo_item_id',
      'equipo_item_numero_serie',
      'equipo_item_estado',
      'equipo_item_fecha_compra',
      'equipo_item_precio_compra_individual',
      'equipo_item_proveedor_nombre',
      'equipo_item_notas_internas',
    ];

    for (const producto of productosConItems) {
      if (producto.equipoItems && producto.equipoItems.length > 0) {
        for (const item of producto.equipoItems) {
          recordsToExport.push({
            producto_id: producto.id,
            producto_nombre: producto.nombre || '',
            producto_marca_nombre: producto.marca?.nombre || '',
            producto_modelo: producto.modelo || '',
            producto_categoria_nombre: producto.categoria?.nombre || '',
            producto_descripcion: producto.descripcion || '',
            producto_precio_venta: producto.precio ?? '',
            producto_precio_compra: producto.precioCompra ?? '',
            producto_precio_alquiler: producto.precioAlquiler ?? '',
            equipo_item_id: item.id,
            equipo_item_numero_serie: item.numeroSerie || '',
            equipo_item_estado: item.estado || '',
            equipo_item_fecha_compra: item.fechaCompra ? new Date(item.fechaCompra).toISOString().split('T')[0] : '', // Formato YYYY-MM-DD
            equipo_item_precio_compra_individual: item.precioCompra ?? '',
            equipo_item_proveedor_nombre: item.proveedor?.nombre || '',
            equipo_item_notas_internas: item.notasInternas || '',
          });
        }
      } else {
        // Opcional: Si quieres incluir productos sin items, descomenta y ajusta
        /*
        recordsToExport.push({
          producto_id: producto.id,
          producto_nombre: producto.nombre || '',
          producto_marca_nombre: producto.marca?.nombre || '',
          producto_modelo: producto.modelo || '',
          producto_categoria_nombre: producto.categoria?.nombre || '',
          producto_descripcion: producto.descripcion || '',
          producto_precio_venta: producto.precio ?? '',
          producto_precio_compra: producto.precioCompra ?? '',
          producto_precio_alquiler: producto.precioAlquiler ?? '',
          equipo_item_id: '',
          equipo_item_numero_serie: '',
          equipo_item_estado: '',
          equipo_item_fecha_compra: '',
          equipo_item_precio_compra_individual: '',
          equipo_item_proveedor_nombre: '',
          equipo_item_notas_internas: '',
        });
        */
      }
    }

    if (recordsToExport.length === 0) {
      return NextResponse.json({ message: 'No hay datos de inventario para exportar.' }, { status: 200 });
    }

    const csvString = stringify(recordsToExport, { header: true, columns: headers });

    return new NextResponse(csvString, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv;charset=utf-8',
        'Content-Disposition': 'attachment; filename="inventario_completo.csv"',
      },
    });

  } catch (error) {
    console.error('Error al exportar inventario:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor al exportar el inventario.' },
      { status: 500 }
    );
  }
} 