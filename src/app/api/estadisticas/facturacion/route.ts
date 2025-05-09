import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/estadisticas/facturacion - Obtener estadísticas de facturación
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const periodo = searchParams.get('periodo') || 'anual'; // anual, trimestral, mensual
    const año = parseInt(searchParams.get('año') || new Date().getFullYear().toString());
    const trimestre = parseInt(searchParams.get('trimestre') || '0');
    const mes = parseInt(searchParams.get('mes') || '0');

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

    // 1. Total facturado en el período
    const totalFacturado = await prisma.factura.aggregate({
      _sum: {
        total: true
      },
      where: {
        fecha: {
          gte: fechaInicio,
          lte: fechaFin
        },
        estado: {
          not: 'ANULADA'
        }
      }
    });

    // 2. Total de facturas pendientes de cobro
    const pendienteCobro = await prisma.factura.aggregate({
      _sum: {
        total: true
      },
      where: {
        fecha: {
          gte: fechaInicio,
          lte: fechaFin
        },
        estado: 'PENDIENTE'
      }
    });

    // 3. Total de facturas cobradas
    const totalCobrado = await prisma.factura.aggregate({
      _sum: {
        total: true
      },
      where: {
        fecha: {
          gte: fechaInicio,
          lte: fechaFin
        },
        estado: 'COBRADA'
      }
    });

    // 4. Número de facturas emitidas
    const numeroFacturas = await prisma.factura.count({
      where: {
        fecha: {
          gte: fechaInicio,
          lte: fechaFin
        },
        estado: {
          not: 'ANULADA'
        }
      }
    });

    // 5. Valor promedio de factura
    const promedioFactura = numeroFacturas > 0 
      ? (totalFacturado._sum.total || 0) / numeroFacturas 
      : 0;

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
      facturacion: {
        total: totalFacturado._sum.total || 0,
        pendienteCobro: pendienteCobro._sum.total || 0,
        totalCobrado: totalCobrado._sum.total || 0,
        numeroFacturas,
        promedioFactura
      }
    });
  } catch (error) {
    console.error('Error al obtener estadísticas de facturación:', error);
    return NextResponse.json({ error: 'Error al obtener estadísticas de facturación' }, { status: 500 });
  }
} 