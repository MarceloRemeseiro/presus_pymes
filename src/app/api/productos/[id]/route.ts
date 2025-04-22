import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/productos/[id] - Obtener un producto específico
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  try {
    const producto = await prisma.producto.findUnique({
      where: { id },
      include: {
        categoria: true,
        marca: true
      },
    })
    
    if (!producto) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(producto)
  } catch (error) {
    console.error('Error al obtener producto:', error)
    return NextResponse.json(
      { error: 'Error al obtener producto' },
      { status: 500 }
    )
  }
}

// PUT /api/productos/[id] - Actualizar un producto
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  try {
    const body = await req.json()
    
    console.log("Datos recibidos para actualizar:", body)
    
    // Verificar si el producto existe
    const existingProducto = await prisma.producto.findUnique({
      where: { id }
    })
    
    if (!existingProducto) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      )
    }
    
    // Preparamos los datos base para actualizar
    const updateData: any = {
      nombre: body.nombre,
      descripcion: body.descripcion,
      stock: body.stock,
      precio: body.precio,
      precioAlquiler: body.precioAlquiler,
      modelo: body.modelo,
      categoria: {
        connectOrCreate: {
          where: { id: body.categoriaId },
          create: { 
            id: body.categoriaId,
            nombre: body.categoriaNombre
          }
        }
      }
    }
    
    // Manejar marca
    if (body.marcaId) {
      updateData.marca = {
        connectOrCreate: {
          where: { id: body.marcaId },
          create: {
            id: body.marcaId,
            nombre: body.marcaNombre || ''
          }
        }
      }
    } else {
      // Si no hay marcaId, desconectar la marca
      updateData.marca = { disconnect: true }
    }
    
    // Actualizar el producto
    const producto = await prisma.producto.update({
      where: { id },
      data: updateData,
      include: {
        categoria: true,
        marca: true
      }
    })
    
    return NextResponse.json(producto)
  } catch (error) {
    console.error('Error al actualizar producto:', error)
    return NextResponse.json(
      { error: 'Error al actualizar producto' },
      { status: 500 }
    )
  }
}

// DELETE /api/productos/[id] - Eliminar un producto
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  try {
    // Verificar si el producto existe
    const existingProducto = await prisma.producto.findUnique({
      where: { id }
    })
    
    if (!existingProducto) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      )
    }
    
    // Eliminar el producto
    await prisma.producto.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error al eliminar producto:', error)
    return NextResponse.json(
      { error: 'Error al eliminar producto' },
      { status: 500 }
    )
  }
} 