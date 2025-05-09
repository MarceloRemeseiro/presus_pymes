import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// PUT /api/facturas/[id]/estado - Actualizar el estado de una factura
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params
    const facturaId = params.id
    const { estado, actualizarGastosAsociados = false } = await req.json()
    
    // Validar que el estado sea válido
    const estadosValidos = ["PENDIENTE", "ENVIADA", "COBRADA", "VENCIDA", "ANULADA"]
    if (!estadosValidos.includes(estado)) {
      return NextResponse.json(
        { error: 'Estado no válido' },
        { status: 400 }
      )
    }
    
    // Verificar que la factura existe
    const facturaExistente = await prisma.factura.findUnique({
      where: { id: facturaId }
    })
    
    if (!facturaExistente) {
      return NextResponse.json(
        { error: 'Factura no encontrada' },
        { status: 404 }
      )
    }
    
    // Actualizar el estado de la factura
    const facturaActualizada = await prisma.factura.update({
      where: { id: facturaId },
      data: { estado },
      include: {
        cliente: true,
        items: {
          include: {
            producto: true,
          },
        },
        presupuestos: true,
      },
    })
    
    // Si se solicita actualizar los gastos asociados
    if (actualizarGastosAsociados) {
      // Convertir estado de factura a estado de gasto
      const estadoGasto = 
        estado === 'COBRADA' ? 'PAGADO' :
        estado === 'VENCIDA' ? 'VENCIDO' :
        estado === 'ANULADA' ? 'ANULADO' : 'PENDIENTE'
      
      // Buscar todos los gastos asociados a esta factura
      const gastosAsociados = await prisma.facturaProveedor.findMany({
        where: { facturaId: facturaId }
      })
      
      // Actualizar el estado de cada gasto
      if (gastosAsociados.length > 0) {
        await prisma.facturaProveedor.updateMany({
          where: { facturaId: facturaId },
          data: {
            tipoEspecial: `estado_${estadoGasto.toLowerCase()}`
          }
        })
        
        console.log(`${gastosAsociados.length} gastos asociados a la factura ${facturaId} actualizados a estado: ${estadoGasto}`)
      }
    }
    
    return NextResponse.json(facturaActualizada)
  } catch (error) {
    console.error('Error al actualizar estado de factura:', error)
    return NextResponse.json(
      { error: 'Error al actualizar estado de factura' },
      { status: 500 }
    )
  }
} 