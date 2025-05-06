import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/gastos/[id] - Obtener un gasto específico
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  
  try {
    const gasto = await prisma.facturaProveedor.findUnique({
      where: { id },
      include: {
        proveedor: true,
        factura: {
          select: {
            id: true,
            numero: true,
            nombre: true,
            estado: true,
            fecha: true,
          }
        },
        partida: true,
      },
    })
    
    if (!gasto) {
      return NextResponse.json(
        { error: 'Gasto no encontrado' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(gasto)
  } catch (error) {
    console.error('Error al obtener el gasto:', error)
    return NextResponse.json(
      { error: 'Error al obtener el gasto' },
      { status: 500 }
    )
  }
}

// PUT /api/gastos/[id] - Actualizar un gasto
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  
  try {
    const data = await request.json()
    
    // Si hay fecha en string, convertirla a Date
    if (data.documentoFecha && typeof data.documentoFecha === 'string') {
      data.documentoFecha = new Date(data.documentoFecha)
    }
    
    const gasto = await prisma.facturaProveedor.update({
      where: { id },
      data,
      include: {
        proveedor: true,
        factura: {
          select: {
            id: true,
            numero: true,
            nombre: true,
            estado: true,
            fecha: true,
          }
        },
        partida: true,
      },
    })
    
    return NextResponse.json(gasto)
  } catch (error) {
    console.error('Error al actualizar el gasto:', error)
    return NextResponse.json(
      { error: 'Error al actualizar el gasto' },
      { status: 500 }
    )
  }
}

// DELETE /api/gastos/[id] - Eliminar un gasto
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  
  try {
    await prisma.facturaProveedor.delete({
      where: { id },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error al eliminar el gasto:', error)
    return NextResponse.json(
      { error: 'Error al eliminar el gasto' },
      { status: 500 }
    )
  }
} 