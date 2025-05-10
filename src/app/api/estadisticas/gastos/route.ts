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
      fechaInicio = new Date(año, 0, 1);
      fechaFin = new Date(año, 11, 31, 23, 59, 59);
    } else if (periodo === 'trimestral' && trimestre >= 1 && trimestre <= 4) {
      const mesInicio = (trimestre - 1) * 3;
      fechaInicio = new Date(año, mesInicio, 1);
      fechaFin = new Date(año, mesInicio + 3, 0, 23, 59, 59);
    } else if (periodo === 'mensual' && mes >= 1 && mes <= 12) {
      fechaInicio = new Date(año, mes - 1, 1);
      fechaFin = new Date(año, mes, 0, 23, 59, 59);
    } else {
      fechaInicio = new Date(new Date().getFullYear(), 0, 1);
      fechaFin = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59);
    }

    // 1. Obtener todos los gastos del período para cálculos manuales más precisos
    const todosLosGastosDelPeriodo = await prisma.facturaProveedor.findMany({
      where: {
        // Usar documentoFecha si está disponible y es más relevante que createdAt para el período del gasto
        OR: [
          { documentoFecha: { gte: fechaInicio, lte: fechaFin } },
          { AND: [{ documentoFecha: null }, { createdAt: { gte: fechaInicio, lte: fechaFin } }] }
        ]
        // Si siempre se debe usar createdAt para el filtro de período, cambiar a:
        // createdAt: { gte: fechaInicio, lte: fechaFin }
      }
    });

    let totalGastosConIVA = 0;
    let totalGastosSinIVA_Deducibles = 0;
    let totalIVASoportado_Deducible = 0;
    let gastosPagadosConIVA = 0;
    let gastosPendientesConIVA = 0;

    todosLosGastosDelPeriodo.forEach(gasto => {
      let gastoConIVA = 0;
      if (gasto.precioConIVA) {
        gastoConIVA = gasto.precio;
      } else {
        if (gasto.esFactura && gasto.baseImponible !== null && gasto.ivaDesglosado !== null) {
          // Asegurarse que baseImponible e ivaDesglosado son números
          const base = typeof gasto.baseImponible === 'number' ? gasto.baseImponible : parseFloat(gasto.baseImponible?.toString() || '0');
          const iva = typeof gasto.ivaDesglosado === 'number' ? gasto.ivaDesglosado : parseFloat(gasto.ivaDesglosado?.toString() || '0');
          gastoConIVA = base + iva;
        } else {
          gastoConIVA = gasto.precio; // Si no es factura o no hay desglose, precio es el total
        }
      }
      totalGastosConIVA += gastoConIVA;

      if (gasto.esFactura) {
        const baseDeducible = typeof gasto.baseImponible === 'number' ? gasto.baseImponible : parseFloat(gasto.baseImponible?.toString() || '0');
        const ivaDeducible = typeof gasto.ivaDesglosado === 'number' ? gasto.ivaDesglosado : parseFloat(gasto.ivaDesglosado?.toString() || '0');
        totalGastosSinIVA_Deducibles += baseDeducible;
        totalIVASoportado_Deducible += ivaDeducible;
      }

      // Asumimos la misma lógica para pagado/pendiente basada en tipoEspecial
      // Esta parte podría necesitar ajustarse si el estado de pago es más complejo
      if (gasto.tipoEspecial?.includes('estado_pagado')) {
        gastosPagadosConIVA += gastoConIVA;
      } else {
        gastosPendientesConIVA += gastoConIVA;
      }
    });
    
    // 2. Número de gastos registrados
    const numeroGastos = todosLosGastosDelPeriodo.length;

    // 3. Gastos por tipo/categoría (Top 5) - Se mantiene la lógica original, pero podría recalcularse con gastoConIVA
    const gastosPorTipo = await prisma.facturaProveedor.groupBy({
      by: ['tipoEspecial'],
      _sum: {
        // Esta suma es sobre el campo 'precio'. Si queremos el total con IVA,
        // necesitaríamos agregar los gastos individualmente como arriba o añadir un campo totalConIva al modelo.
        // Por simplicidad y consistencia con el código original, lo dejamos así, 
        // pero ten en cuenta que este 'total' por categoría puede no ser el total con IVA real.
        precio: true 
      },
      where: {
        OR: [
          { documentoFecha: { gte: fechaInicio, lte: fechaFin } },
          { AND: [{ documentoFecha: null }, { createdAt: { gte: fechaInicio, lte: fechaFin } }] }
        ],
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

    const gastosPorTipoFormateados = gastosPorTipo.map(gasto => {
      let tipo = gasto.tipoEspecial || 'Sin categoría';
      if (tipo.startsWith('estado_')) {
        tipo = 'Sin categoría';
      }
      // Aquí también, el total es la suma de 'precio'
      return {
        tipo,
        total: gasto._sum.precio || 0 
      };
    });

    // 4. Gasto promedio (calculado sobre el total CON IVA)
    const promedioGasto = numeroGastos > 0 
      ? totalGastosConIVA / numeroGastos 
      : 0;

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
        totalGastosConIVA: parseFloat(totalGastosConIVA.toFixed(2)),
        totalGastosSinIVA_Deducibles: parseFloat(totalGastosSinIVA_Deducibles.toFixed(2)),
        totalIVASoportado_Deducible: parseFloat(totalIVASoportado_Deducible.toFixed(2)),
        totalPagado: parseFloat(gastosPagadosConIVA.toFixed(2)), // Anteriormente sumaba 'precio'
        totalPendiente: parseFloat(gastosPendientesConIVA.toFixed(2)), // Anteriormente sumaba 'precio'
        numeroGastos,
        promedioGasto: parseFloat(promedioGasto.toFixed(2)),
        porCategoria: gastosPorTipoFormateados 
      }
    });
  } catch (error) {
    console.error('Error al obtener estadísticas de gastos:', error);
    return NextResponse.json({ error: 'Error al obtener estadísticas de gastos' }, { status: 500 });
  }
} 