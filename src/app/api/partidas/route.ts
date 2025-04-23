import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/partidas - Obtener todas las partidas
export async function GET() {
  try {
    const partidas = await prisma.partidaPresupuesto.findMany({
      orderBy: {
        nombre: 'asc',
      },
    })
    
    return NextResponse.json(partidas)
  } catch (error) {
    console.error('Error al obtener partidas:', error)
    return NextResponse.json(
      { error: 'Error al obtener partidas' },
      { status: 500 }
    )
  }
}

// POST /api/partidas - Crear una nueva partida
export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Validar datos mínimos requeridos
    if (!body.nombre) {
      return NextResponse.json(
        { error: 'El nombre de la partida es obligatorio' },
        { status: 400 }
      )
    }
    
    // Verificar si ya existe una partida con el mismo nombre
    const partidaExistente = await prisma.partidaPresupuesto.findFirst({
      where: {
        nombre: {
          equals: body.nombre,
          mode: 'insensitive', // Búsqueda case-insensitive
        },
      },
    })
    
    if (partidaExistente) {
      return NextResponse.json(
        { error: 'Ya existe una partida con este nombre' },
        { status: 400 }
      )
    }
    
    // Crear nueva partida
    const partida = await prisma.partidaPresupuesto.create({
      data: {
        nombre: body.nombre,
        descripcion: body.descripcion || null,
      },
    })
    
    return NextResponse.json(partida, { status: 201 })
  } catch (error) {
    console.error('Error al crear partida:', error)
    return NextResponse.json(
      { error: 'Error al crear partida' },
      { status: 500 }
    )
  }
} 