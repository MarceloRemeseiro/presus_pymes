import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// PUT /api/presupuestos/[id]/estado - Actualizar el estado de un presupuesto
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params
    const presupuestoId = params.id
    const { estado } = await req.json()
    
    // Validar que el estado sea válido
    const estadosValidos = ["PENDIENTE", "APROBADO", "RECHAZADO", "FACTURADO"]
    if (!estadosValidos.includes(estado)) {
      return NextResponse.json(
        { error: 'Estado no válido' },
        { status: 400 }
      )
    }
    
    // Verificar que el presupuesto existe
    const presupuestoExistente = await prisma.presupuesto.findUnique({
      where: { id: presupuestoId }
    })
    
    if (!presupuestoExistente) {
      return NextResponse.json(
        { error: 'Presupuesto no encontrado' },
        { status: 404 }
      )
    }
    
    // Actualizar el estado del presupuesto
    const presupuestoActualizado = await prisma.presupuesto.update({
      where: { id: presupuestoId },
      data: { estado },
      include: {
        cliente: true,
        items: {
          include: {
            producto: true,
            partida: true
          },
        },
        presupuestosProveedores: {
          include: {
            proveedor: true
          }
        }
      },
    })
    
    return NextResponse.json(presupuestoActualizado)
  } catch (error) {
    console.error('Error al actualizar estado de presupuesto:', error)
    return NextResponse.json(
      { error: 'Error al actualizar estado de presupuesto' },
      { status: 500 }
    )
  }
} 