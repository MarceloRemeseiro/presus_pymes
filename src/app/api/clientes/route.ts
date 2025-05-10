import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/clientes - Obtener todos los clientes
export async function GET() {
  try {
    const clientes = await prisma.cliente.findMany({
      orderBy: {
        nombre: 'asc',
      },
    })
    
    return NextResponse.json(clientes)
  } catch (error) {
    console.error('Error al obtener clientes:', error)
    return NextResponse.json(
      { error: 'Error al obtener clientes' },
      { status: 500 }
    )
  }
}

// POST /api/clientes - Crear un nuevo cliente
export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    const cliente = await prisma.cliente.create({
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
    
    return NextResponse.json(cliente, { status: 201 })
  } catch (error) {
    console.error('Error al crear cliente:', error)
    return NextResponse.json(
      { error: 'Error al crear cliente' },
      { status: 500 }
    )
  }
} 