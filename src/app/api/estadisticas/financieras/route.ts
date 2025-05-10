import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/estadisticas/financieras - Obtener estadísticas financieras
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

    // 2. Total de gastos en el período
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

    // 3. Total de facturas pendientes de cobro
    const pendienteCobro = await prisma.factura.aggregate({
      _sum: {
        total: true
      },
      where: {
        fecha: {
          gte: fechaInicio,
          lte: fechaFin
        },
        estado: 'ENVIADA'
      }
    });

    // 4. Datos para evolución temporal (por mes)
    const evolucionMensual = [];
    
    // Definir el número de meses a mostrar según el período
    let mesesAMostrar;
    if (periodo === 'anual') {
      mesesAMostrar = 12;
    } else if (periodo === 'trimestral') {
      mesesAMostrar = 3;
    } else {
      mesesAMostrar = 1;
    }
    
    // Obtener datos mensuales
    for (let i = 0; i < mesesAMostrar; i++) {
      let mesInicio: Date;
      let mesFin: Date;
      
      if (periodo === 'anual') {
        mesInicio = new Date(año, i, 1);
        mesFin = new Date(año, i + 1, 0, 23, 59, 59);
      } else if (periodo === 'trimestral') {
        const mesBase = (trimestre - 1) * 3;
        mesInicio = new Date(año, mesBase + i, 1);
        mesFin = new Date(año, mesBase + i + 1, 0, 23, 59, 59);
      } else {
        mesInicio = new Date(año, mes - 1, 1);
        mesFin = new Date(año, mes, 0, 23, 59, 59);
      }
      
      // Facturación del mes
      const facturacionMes = await prisma.factura.aggregate({
        _sum: {
          total: true
        },
        where: {
          fecha: {
            gte: mesInicio,
            lte: mesFin
          },
          estado: {
            not: 'ANULADA'
          }
        }
      });
      
      // Gastos del mes
      const gastosMes = await prisma.facturaProveedor.aggregate({
        _sum: {
          precio: true
        },
        where: {
          createdAt: {
            gte: mesInicio,
            lte: mesFin
          }
        }
      });
      
      // Nombre del mes
      const nombreMes = mesInicio.toLocaleString('es-ES', { month: 'long' });
      
      evolucionMensual.push({
        mes: nombreMes,
        ingresos: facturacionMes._sum.total || 0,
        gastos: gastosMes._sum.precio || 0,
        beneficio: (facturacionMes._sum.total || 0) - (gastosMes._sum.precio || 0)
      });
    }

    // 5. Proyección de ingresos basada en presupuestos pendientes
    // Nota: Ajustado según el modelo de datos actual, asumiendo que los presupuestos
    // tienen un estado 'APROBADO' y no tienen factura asociada
    const presupuestosPendientes = await prisma.presupuesto.aggregate({
      _sum: {
        total: true
      },
      where: {
        estado: 'APROBADO',
        // Si la relación no existe en el modelo, omitimos la condición
        // y confiamos en el estado 'APROBADO' para indicar pendiente de facturar
      }
    });

    // Calcular margen de beneficio
    const ingresos = totalFacturado._sum.total || 0;
    const gastos = totalGastos._sum.precio || 0;
    const beneficio = ingresos - gastos;
    const margenPorcentaje = ingresos > 0 ? (beneficio / ingresos) * 100 : 0;

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
      financieras: {
        ingresos,
        gastos,
        beneficio,
        margenPorcentaje,
        pendienteCobro: pendienteCobro._sum.total || 0,
        proyeccionIngresos: presupuestosPendientes._sum?.total || 0,
        evolucionMensual
      }
    });
  } catch (error) {
    console.error('Error al obtener estadísticas financieras:', error);
    return NextResponse.json({ error: 'Error al obtener estadísticas financieras' }, { status: 500 });
  }
} 