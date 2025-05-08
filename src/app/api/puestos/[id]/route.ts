import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/puestos/[id] - Obtener un puesto específico
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    if (!resolvedParams.id) {
      return NextResponse.json(
        { error: 'ID de puesto no proporcionado' },
        { status: 400 }
      )
    }

    const puesto = await prisma.puesto.findUnique({
      where: {
        id: resolvedParams.id,
      },
      include: {
        personal: {
          include: {
            personal: true
          }
        }
      }
    })

    if (!puesto) {
      return NextResponse.json(
        { error: 'Puesto no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(puesto)
  } catch (error) {
    console.error('Error al obtener puesto:', error)
    return NextResponse.json(
      { error: 'Error al obtener puesto' },
      { status: 500 }
    )
  }
}

// PUT /api/puestos/[id] - Actualizar un puesto
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    if (!resolvedParams.id) {
      return NextResponse.json(
        { error: 'ID de puesto no proporcionado' },
        { status: 400 }
      )
    }

    const body = await req.json()

    // Verificación básica
    if (!body.nombre) {
      return NextResponse.json(
        { error: 'El nombre es obligatorio' },
        { status: 400 }
      )
    }

    // Verificar si existe el puesto
    const puestoExistente = await prisma.puesto.findUnique({
      where: {
        id: resolvedParams.id,
      },
    })

    if (!puestoExistente) {
      return NextResponse.json(
        { error: 'Puesto no encontrado' },
        { status: 404 }
      )
    }

    // Actualizar el puesto
    const puesto = await prisma.puesto.update({
      where: {
        id: resolvedParams.id,
      },
      data: {
        nombre: body.nombre,
        descripcion: body.descripcion,
        tarifa: body.tarifa ? parseFloat(body.tarifa) : null,
      },
    })

    return NextResponse.json(puesto)
  } catch (error) {
    console.error('Error al actualizar puesto:', error)
    return NextResponse.json(
      { error: 'Error al actualizar puesto' },
      { status: 500 }
    )
  }
}

// DELETE /api/puestos/[id] - Eliminar un puesto
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    if (!resolvedParams.id) {
      return NextResponse.json(
        { error: 'ID de puesto no proporcionado' },
        { status: 400 }
      )
    }

    // Verificar si existe el puesto
    const puestoExistente = await prisma.puesto.findUnique({
      where: {
        id: resolvedParams.id,
      },
    })

    if (!puestoExistente) {
      return NextResponse.json(
        { error: 'Puesto no encontrado' },
        { status: 404 }
      )
    }

    // Eliminar el puesto
    await prisma.puesto.delete({
      where: {
        id: resolvedParams.id,
      },
    })

    return NextResponse.json(
      { message: 'Puesto eliminado correctamente' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error al eliminar puesto:', error)
    return NextResponse.json(
      { error: 'Error al eliminar puesto' },
      { status: 500 }
    )
  }
} 