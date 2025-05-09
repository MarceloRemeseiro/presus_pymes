import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/estadisticas/gastos - Obtener estadísticas de gastos
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

    // 1. Total de gastos en el período
    const totalGastos = await prisma.facturaProveedor.aggregate({
      _sum: {
        precio: true
      },
      where: {
        createdAt: {
          gte: fechaInicio,
          lte: fechaFin
        }
      }
    });

    // 2. Total de gastos por estado (pagados vs pendientes)
    // Nota: Asumimos que los gastos con "tipoEspecial" que contiene "estado_pagado" están pagados
    const gastosPagados = await prisma.facturaProveedor.aggregate({
      _sum: {
        precio: true
      },
      where: {
        createdAt: {
          gte: fechaInicio,
          lte: fechaFin
        },
        tipoEspecial: {
          contains: 'estado_pagado'
        }
      }
    });

    const gastosPendientes = await prisma.facturaProveedor.aggregate({
      _sum: {
        precio: true
      },
      where: {
        createdAt: {
          gte: fechaInicio,
          lte: fechaFin
        },
        tipoEspecial: {
          not: {
            contains: 'estado_pagado'
          }
        }
      }
    });

    // 3. Número de gastos registrados
    const numeroGastos = await prisma.facturaProveedor.count({
      where: {
        createdAt: {
          gte: fechaInicio,
          lte: fechaFin
        }
      }
    });

    // 4. Gastos por tipo/categoría (Top 5)
    const gastosPorTipo = await prisma.facturaProveedor.groupBy({
      by: ['tipoEspecial'],
      _sum: {
        precio: true
      },
      where: {
        createdAt: {
          gte: fechaInicio,
          lte: fechaFin
        },
        tipoEspecial: {
          not: null
        }
      },
      orderBy: {
        _sum: {
          precio: 'desc'
        }
      },
      take: 5
    });

    // Limpiar los datos de tipoEspecial (quitar prefijos "estado_")
    const gastosPorTipoFormateados = gastosPorTipo.map(gasto => {
      let tipo = gasto.tipoEspecial || 'Sin categoría';
      
      // Si comienza con "estado_", quitarlo ya que no es un tipo real sino un estado
      if (tipo.startsWith('estado_')) {
        tipo = 'Sin categoría';
      }
      
      return {
        tipo,
        total: gasto._sum.precio || 0
      };
    });

    // 5. Gasto promedio
    const promedioGasto = numeroGastos > 0 
      ? (totalGastos._sum.precio || 0) / numeroGastos 
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
      gastos: {
        total: totalGastos._sum.precio || 0,
        totalPagado: gastosPagados._sum.precio || 0,
        totalPendiente: gastosPendientes._sum.precio || 0,
        numeroGastos,
        promedioGasto,
        porCategoria: gastosPorTipoFormateados
      }
    });
  } catch (error) {
    console.error('Error al obtener estadísticas de gastos:', error);
    return NextResponse.json({ error: 'Error al obtener estadísticas de gastos' }, { status: 500 });
  }
} 