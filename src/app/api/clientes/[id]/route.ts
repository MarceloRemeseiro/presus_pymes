import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/clientes/[id] - Obtener un cliente específico
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const cliente = await prisma.cliente.findUnique({
      where: {
        id,
      },
    })

    if (!cliente) {
      return NextResponse.json(
        { error: 'Cliente no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(cliente)
  } catch (error) {
    console.error('Error al obtener cliente:', error)
    return NextResponse.json(
      { error: 'Error al obtener cliente' },
      { status: 500 }
    )
  }
}

// PUT /api/clientes/[id] - Actualizar un cliente
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    
    // Verificar que el cliente existe
    const clienteExistente = await prisma.cliente.findUnique({
      where: {
        id,
      },
    })
    
    if (!clienteExistente) {
      return NextResponse.json(
        { error: 'Cliente no encontrado' },
        { status: 404 }
      )
    }

    // Actualizar el cliente
    const clienteActualizado = await prisma.cliente.update({
      where: {
        id,
      },
      data: {
        nombre: body.nombre,
        tipo: body.tipo,
        nif: body.nif,
        esIntracomunitario: body.esIntracomunitario,
        direccion: body.direccion,
        ciudad: body.ciudad,
        email: body.email,
        telefono: body.telefono,
      },
    })

    return NextResponse.json(clienteActualizado)
  } catch (error) {
    console.error('Error al actualizar cliente:', error)
    return NextResponse.json(
      { error: 'Error al actualizar cliente' },
      { status: 500 }
    )
  }
}

// DELETE /api/clientes/[id] - Eliminar un cliente
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Verificar que el cliente existe
    const clienteExistente = await prisma.cliente.findUnique({
      where: {
        id,
      },
    })
    
    if (!clienteExistente) {
      return NextResponse.json(
        { error: 'Cliente no encontrado' },
        { status: 404 }
      )
    }
    
    // Eliminar el cliente
    await prisma.cliente.delete({
      where: {
        id,
      },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error al eliminar cliente:', error)
    
    // Verificar si el error es por registros relacionados
    if (error instanceof Error && error.message.includes('foreign key constraint')) {
      return NextResponse.json(
        { error: 'No se puede eliminar el cliente porque tiene registros relacionados' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Error al eliminar cliente' },
      { status: 500 }
    )
  }
} 