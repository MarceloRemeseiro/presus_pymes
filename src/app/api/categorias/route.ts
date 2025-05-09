import { prisma } from '@/lib/prisma'
import { Value } from '@radix-ui/react-select'
import { NextResponse } from 'next/server'
import { string } from 'zod'

// GET /api/categorias - Obtener todas las categorías
export async function GET() {
  try {
    const categorias = await prisma.categoria.findMany({
      orderBy: {
        nombre: 'asc',
      },
    })

    
    return NextResponse.json(categorias)
  } catch (error) {
    console.error('Error al obtener categorías:', error)
    return NextResponse.json(
      { error: 'Error al obtener categorías' },
      { status: 500 }
    )
  }
} 