import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/equipo-items/[id] - Obtener un elemento específico
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  try {
    const equipoItem = await prisma.equipoItem.findUnique({
      where: { id },
      include: {
        producto: {
          include: {
            categoria: true,
            marca: true,
          }
        },
        proveedor: true,
      },
    })
    
    if (!equipoItem) {
      return NextResponse.json(
        { error: 'Elemento no encontrado' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(equipoItem)
  } catch (error) {
    console.error('Error al obtener elemento:', error)
    return NextResponse.json(
      { error: 'Error al obtener elemento' },
      { status: 500 }
    )
  }
}

// PUT /api/equipo-items/[id] - Actualizar un elemento
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  try {
    const body = await req.json()
    
    // Verificar si el elemento existe
    const existingItem = await prisma.equipoItem.findUnique({
      where: { id }
    })
    
    if (!existingItem) {
      return NextResponse.json(
        { error: 'Elemento no encontrado' },
        { status: 404 }
      )
    }
    
    // Preparar los datos de actualización
    const updateData: any = {
      numeroSerie: body.numeroSerie,
      notasInternas: body.notasInternas,
      estado: body.estado,
      fechaCompra: body.fechaCompra ? new Date(body.fechaCompra) : null,
      proveedorId: body.proveedorId || null,
    }
    
    // Agregar precio de compra si existe
    if (body.precioCompra !== undefined && body.precioCompra !== null) {
      updateData.precioCompra = parseFloat(body.precioCompra)
    }
    
    // Actualizar el elemento
    const equipoItem = await prisma.equipoItem.update({
      where: { id },
      data: updateData,
      include: {
        producto: true,
        proveedor: true,
      }
    })
    
    return NextResponse.json(equipoItem)
  } catch (error) {
    console.error('Error al actualizar elemento:', error)
    return NextResponse.json(
      { error: 'Error al actualizar elemento' },
      { status: 500 }
    )
  }
}

// DELETE /api/equipo-items/[id] - Eliminar un elemento
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  try {
    // Verificar si el elemento existe
    const existingItem = await prisma.equipoItem.findUnique({
      where: { id },
      include: { producto: true }
    })
    
    if (!existingItem) {
      return NextResponse.json(
        { error: 'Elemento no encontrado' },
        { status: 404 }
      )
    }
    
    // Usar transacción para eliminar el elemento y actualizar el stock
    await prisma.$transaction([
      // 1. Eliminar el elemento
      prisma.equipoItem.delete({
        where: { id }
      }),
      
      // 2. Decrementar el stock del producto
      // (asegurarse de que no sea negativo)
      prisma.producto.update({
        where: { id: existingItem.productoId },
        data: {
          stock: {
            decrement: 1
          }
        }
      })
    ])
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error al eliminar elemento:', error)
    return NextResponse.json(
      { error: 'Error al eliminar elemento' },
      { status: 500 }
    )
  }
} 