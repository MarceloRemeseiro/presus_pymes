import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Consultar presupuestos con sus items y partidas
    const presupuestos = await prisma.presupuesto.findMany({
      include: {
        cliente: true,
        items: {
          include: {
            producto: true,
            partida: true,
          },
        },
      },
    })
    
    // Consultar partidas de presupuesto
    const partidas = await prisma.partidaPresupuesto.findMany({
      include: {
        items: true,
      },
    })
    
    // Consultar items de presupuesto
    const items = await prisma.itemPresupuesto.findMany({
      include: {
        producto: true,
        partida: true,
      },
    })
    
    return NextResponse.json({
      presupuestos,
      partidas,
      items,
      presupuestosCount: presupuestos.length,
      partidasCount: partidas.length,
      itemsCount: items.length,
    })
  } catch (error) {
    console.error('Error al obtener datos de depuración:', error)
    return NextResponse.json(
      { error: 'Error al obtener datos de depuración' },
      { status: 500 }
    )
  }
} 