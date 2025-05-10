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
      fechaInicio = new Date(año, 0, 1);
      fechaFin = new Date(año, 11, 31, 23, 59, 59);
    } else if (periodo === 'trimestral' && trimestre >= 1 && trimestre <= 4) {
      const mesInicioNum = (trimestre - 1) * 3;
      fechaInicio = new Date(año, mesInicioNum, 1);
      fechaFin = new Date(año, mesInicioNum + 3, 0, 23, 59, 59);
    } else if (periodo === 'mensual' && mes >= 1 && mes <= 12) {
      fechaInicio = new Date(año, mes - 1, 1);
      fechaFin = new Date(año, mes, 0, 23, 59, 59);
    } else {
      fechaInicio = new Date(new Date().getFullYear(), 0, 1);
      fechaFin = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59);
    }

    // 1. Total Ingresos (Facturado SIN IVA) en el período
    const ingresosData = await prisma.factura.aggregate({
      _sum: {
        subtotal: true // Suma de bases imponibles (SIN IVA)
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
    const ingresosSinIVA = ingresosData._sum.subtotal || 0;

    // 2. Total Gastos Operativos (para cálculo de beneficio)
    // Incluye base imponible de gastos con factura y el total de gastos sin factura (tickets)
    const todosLosGastosDelPeriodo = await prisma.facturaProveedor.findMany({
      where: {
        OR: [
          { documentoFecha: { gte: fechaInicio, lte: fechaFin } },
          { AND: [{ documentoFecha: null }, { createdAt: { gte: fechaInicio, lte: fechaFin } }] }
        ]
      }
    });

    const costeTotalGastos = todosLosGastosDelPeriodo.reduce((acc, gasto) => {
      if (gasto.esFactura) {
        const base = typeof gasto.baseImponible === 'number' ? gasto.baseImponible : parseFloat(gasto.baseImponible?.toString() || '0');
        return acc + base;
      } else {
        // Para gastos sin factura (tickets), el 'precio' es el coste total para la empresa
        return acc + gasto.precio;
      }
    }, 0);

    // 3. Total de facturas pendientes de cobro (esto se mantiene sobre el total CON IVA)
    const pendienteCobroData = await prisma.factura.aggregate({
      _sum: {
        total: true
      },
      where: {
        fecha: {
          gte: fechaInicio,
          lte: fechaFin
        },
        estado: 'ENVIADA' // O cualquier estado que signifique pendiente
      }
    });
    const pendienteCobroConIVA = pendienteCobroData._sum.total || 0;

    // 4. Datos para evolución temporal (por mes)
    const evolucionMensual = [];
    let mesesBucle: number[];
    let inicioMesBucle: number;

    if (periodo === 'anual') {
      mesesBucle = Array.from({ length: 12 }, (_, i) => i); // 0 (Enero) a 11 (Diciembre)
      inicioMesBucle = 0;
    } else if (periodo === 'trimestral') {
      inicioMesBucle = (trimestre - 1) * 3;
      mesesBucle = Array.from({ length: 3 }, (_, i) => inicioMesBucle + i);
    } else { // mensual
      mesesBucle = [mes - 1]; // El mes ya viene 1-indexado
      inicioMesBucle = mes - 1;
    }
    
    for (const mesIndex of mesesBucle) {
      const mesActualInicio = new Date(año, mesIndex, 1);
      const mesActualFin = new Date(año, mesIndex + 1, 0, 23, 59, 59);
      
      // Facturación del mes (SIN IVA)
      const facturacionMes = await prisma.factura.aggregate({
        _sum: {
          subtotal: true
        },
        where: {
          fecha: {
            gte: mesActualInicio,
            lte: mesActualFin
          },
          estado: {
            not: 'ANULADA'
          }
        }
      });
      const ingresosMesSinIVA = facturacionMes._sum.subtotal || 0;
      
      // Gastos del mes (para beneficio)
      const gastosMesRecords = await prisma.facturaProveedor.findMany({
        where: {
          // No filtramos por esFactura aquí, ya que los sumaremos de forma diferente
          OR: [
            { documentoFecha: { gte: mesActualInicio, lte: mesActualFin } },
            { AND: [{ documentoFecha: null }, { createdAt: { gte: mesActualInicio, lte: mesActualFin } }] }
          ]
        }
      });
      const costeTotalGastosMes = gastosMesRecords.reduce((acc, gasto) => {
        if (gasto.esFactura) {
          const base = typeof gasto.baseImponible === 'number' ? gasto.baseImponible : parseFloat(gasto.baseImponible?.toString() || '0');
          return acc + base;
        } else {
          return acc + gasto.precio;
        }
      }, 0);
      
      const nombreMes = mesActualInicio.toLocaleString('es-ES', { month: 'long' });
      
      evolucionMensual.push({
        mes: nombreMes,
        ingresos: parseFloat(ingresosMesSinIVA.toFixed(2)),
        gastos: parseFloat(costeTotalGastosMes.toFixed(2)), // Usar el nuevo cálculo
        beneficio: parseFloat((ingresosMesSinIVA - costeTotalGastosMes).toFixed(2))
      });
    }

    // 5. Proyección de ingresos (SIN IVA) basada en presupuestos APROBADOS
    const proyeccionData = await prisma.presupuesto.aggregate({
      _sum: {
        subtotal: true // Sumamos el subtotal (SIN IVA)
      },
      where: {
        estado: 'APROBADO',
        // Aquí podríamos añadir una condición para excluir presupuestos que ya han sido facturados
        // Por ejemplo, si tienes una relación o un campo que lo indique.
        // facturaId: null, // Si tienes un campo así en tu modelo Presupuesto
        fecha: { // Opcional: filtrar por presupuestos aprobados en el período actual
          gte: fechaInicio,
          lte: fechaFin
        }
      }
    });
    const proyeccionIngresosSinIVA = proyeccionData._sum.subtotal || 0;

    // Calcular margen de beneficio
    const beneficio = ingresosSinIVA - costeTotalGastos; // Usar costeTotalGastos
    const margenPorcentaje = ingresosSinIVA > 0 ? (beneficio / ingresosSinIVA) * 100 : 0;

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
        ingresos: parseFloat(ingresosSinIVA.toFixed(2)),
        gastos: parseFloat(costeTotalGastos.toFixed(2)), // Usar costeTotalGastos
        beneficio: parseFloat(beneficio.toFixed(2)),
        margenPorcentaje: parseFloat(margenPorcentaje.toFixed(2)),
        pendienteCobro: parseFloat(pendienteCobroConIVA.toFixed(2)), 
        proyeccionIngresos: parseFloat(proyeccionIngresosSinIVA.toFixed(2)), 
        evolucionMensual 
      }
    });
  } catch (error) {
    console.error('Error al obtener estadísticas financieras:', error);
    return NextResponse.json({ error: 'Error al obtener estadísticas financieras' }, { status: 500 });
  }
} 