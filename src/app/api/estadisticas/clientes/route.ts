import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/estadisticas/clientes - Obtener estadísticas de clientes
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const periodo = searchParams.get('periodo') || 'anual'; // anual, trimestral, mensual
    const año = parseInt(searchParams.get('año') || new Date().getFullYear().toString());
    const trimestre = parseInt(searchParams.get('trimestre') || '0');
    const mes = parseInt(searchParams.get('mes') || '0');
    const ordenarPor = searchParams.get('ordenarPor') || 'facturacion'; // facturacion, numero_facturas
    const limite = parseInt(searchParams.get('limite') || '5');
    
    let fechaInicio: Date;
    let fechaFin: Date;

    // Configurar fechas según el período
    if (periodo === 'anual') {
      fechaInicio = new Date(año, 0, 1); // 1 de enero del año seleccionado
      fechaFin = new Date(año, 11, 31, 23, 59, 59); // 31 de diciembre del año seleccionado
    } else if (periodo === 'trimestral' && trimestre >= 1 && trimestre <= 4) {
      const mesInicio = (trimestre - 1) * 3;
      fechaInicio = new Date(año, mesInicio, 1);
      fechaFin = new Date(año, mesInicio + 3, 0, 23, 59, 59);
    } else if (periodo === 'mensual' && mes >= 1 && mes <= 12) {
      fechaInicio = new Date(año, mes - 1, 1);
      fechaFin = new Date(año, mes, 0, 23, 59, 59);
    } else {
      // Período por defecto: año actual
      fechaInicio = new Date(new Date().getFullYear(), 0, 1);
      fechaFin = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59);
    }

    // Obtener todos los clientes que tienen facturas en el período
    const clientes = await prisma.cliente.findMany({
      where: {
        facturas: {
          some: {
            fecha: {
              gte: fechaInicio,
              lte: fechaFin
            },
            estado: {
              not: 'ANULADA'
            }
          }
        }
      },
      select: {
        id: true,
        nombre: true,
        tipo: true,
        nif: true,
        facturas: {
          where: {
            fecha: {
              gte: fechaInicio,
              lte: fechaFin
            },
            estado: {
              not: 'ANULADA'
            }
          },
          select: {
            id: true,
            total: true,
            estado: true,
            fecha: true
          }
        }
      }
    });

    // Procesar datos para obtener estadísticas por cliente
    const estadisticasClientes = clientes.map(cliente => {
      const totalFacturado = cliente.facturas.reduce((total, factura) => total + factura.total, 0);
      const numeroFacturas = cliente.facturas.length;
      const facturasCompletadas = cliente.facturas.filter(f => f.estado === 'COBRADA').length;
      const facturasPendientes = cliente.facturas.filter(f => f.estado === 'PENDIENTE').length;
      const promedioFactura = numeroFacturas > 0 ? totalFacturado / numeroFacturas : 0;
      
      return {
        id: cliente.id,
        nombre: cliente.nombre,
        nif: cliente.nif,
        tipo: cliente.tipo,
        estadisticas: {
          totalFacturado,
          numeroFacturas,
          facturasCompletadas,
          facturasPendientes,
          promedioFactura,
          tasaCompletado: numeroFacturas > 0 ? facturasCompletadas / numeroFacturas * 100 : 0
        }
      };
    });

    // Ordenar según el criterio seleccionado
    const clientesOrdenados = estadisticasClientes.sort((a, b) => {
      if (ordenarPor === 'numero_facturas') {
        return b.estadisticas.numeroFacturas - a.estadisticas.numeroFacturas;
      } else {
        // Por defecto, ordenar por totalFacturado
        return b.estadisticas.totalFacturado - a.estadisticas.totalFacturado;
      }
    });

    // Limitar número de resultados
    const mejoresClientes = clientesOrdenados.slice(0, limite);

    // Retornar datos
    return NextResponse.json({
      periodo: {
        tipo: periodo,
        año,
        trimestre: periodo === 'trimestral' ? trimestre : null,
        mes: periodo === 'mensual' ? mes : null,
        fechaInicio: fechaInicio.toISOString(),
        fechaFin: fechaFin.toISOString()
      },
      clientes: mejoresClientes,
      criterioOrden: ordenarPor,
      totalClientes: clientesOrdenados.length
    });
  } catch (error) {
    console.error('Error al obtener estadísticas de clientes:', error);
    return NextResponse.json({ error: 'Error al obtener estadísticas de clientes' }, { status: 500 });
  }
} 