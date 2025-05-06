import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/gastos - Obtener todos los gastos
export async function GET() {
  try {
    const gastos = await prisma.facturaProveedor.findMany({
      include: {
        proveedor: {
          select: {
            id: true,
            nombre: true,
          },
        },
        factura: {
          select: {
            id: true,
            numero: true,
            nombre: true,
            estado: true,
            fecha: true,
          },
        },
        partida: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
      orderBy: [
        { documentoFecha: 'desc' },
        { createdAt: 'desc' },
      ],
    })

    return NextResponse.json(gastos)
  } catch (error) {
    console.error('Error al obtener los gastos:', error)
    return NextResponse.json(
      { error: 'Error al obtener los gastos' },
      { status: 500 }
    )
  }
}

// POST /api/gastos - Crear un nuevo gasto
export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Si hay fecha en string, convertirla a Date
    if (data.documentoFecha && typeof data.documentoFecha === 'string') {
      data.documentoFecha = new Date(data.documentoFecha)
    }

    const gasto = await prisma.facturaProveedor.create({
      data,
      include: {
        proveedor: true,
        factura: true,
        partida: true,
      },
    })

    return NextResponse.json(gasto)
  } catch (error) {
    console.error('Error al crear el gasto:', error)
    return NextResponse.json(
      { error: 'Error al crear el gasto' },
      { status: 500 }
    )
  }
} 