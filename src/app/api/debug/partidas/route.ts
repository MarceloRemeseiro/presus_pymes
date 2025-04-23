import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Consultar partidas de presupuesto
    const partidas = await prisma.partidaPresupuesto.findMany({
      include: {
        items: {
          include: {
            producto: true,
            presupuesto: true
          }
        },
      },
    })
    
    return NextResponse.json({
      partidas,
      partidasCount: partidas.length,
      itemsCount: partidas.reduce((acc, partida) => acc + partida.items.length, 0),
    })
  } catch (error) {
    console.error('Error al obtener datos de partidas:', error)
    return NextResponse.json(
      { error: 'Error al obtener datos de partidas' },
      { status: 500 }
    )
  }
} 