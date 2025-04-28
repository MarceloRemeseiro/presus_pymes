import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/presupuestos/[id]/partidas - Obtener partidas asociadas a un presupuesto específico
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const presupuestoId = resolvedParams.id
    
    // Verificar que el presupuesto existe
    const presupuesto = await prisma.presupuesto.findUnique({
      where: { id: presupuestoId },
      include: {
        items: {
          include: {
            partida: true,
          },
        },
      },
    })
    
    if (!presupuesto) {
      return NextResponse.json(
        { error: 'Presupuesto no encontrado' },
        { status: 404 }
      )
    }
    
    // Extraer solo las partidas únicas que están siendo utilizadas en este presupuesto
    const partidasUtilizadas = presupuesto.items
      .filter(item => item.partidaId && item.partida) // Filtrar items con partida asignada
      .map(item => item.partida) // Extraer la partida
    
    // Eliminar duplicados (puede haber múltiples items con la misma partida)
    const partidasUnicas = Array.from(
      new Map(partidasUtilizadas.map(partida => [partida!.id, partida])).values()
    )
    
    return NextResponse.json(partidasUnicas)
  } catch (error) {
    console.error('Error al obtener partidas del presupuesto:', error)
    return NextResponse.json(
      { error: 'Error al obtener partidas del presupuesto' },
      { status: 500 }
    )
  }
} 