import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/marcas - Obtener todas las marcas
export async function GET() {
  try {
    const marcas = await prisma.marca.findMany({
      orderBy: {
        nombre: 'asc',
      },
    })
    
    return NextResponse.json(marcas)
  } catch (error) {
    console.error('Error al obtener marcas:', error)
    return NextResponse.json(
      { error: 'Error al obtener marcas' },
      { status: 500 }
    )
  }
}

// POST /api/marcas - Crear una nueva marca
export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    const marca = await prisma.marca.create({
      data: {
        nombre: body.nombre,
      }
    })
    
    return NextResponse.json(marca, { status: 201 })
  } catch (error) {
    console.error('Error al crear marca:', error)
    return NextResponse.json(
      { error: 'Error al crear marca' },
      { status: 500 }
    )
  }
} 