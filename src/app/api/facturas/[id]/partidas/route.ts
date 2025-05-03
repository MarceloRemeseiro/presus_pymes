import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/facturas/[id]/partidas - Obtener las partidas asociadas a una factura
export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params
    const facturaId = params.id
    
    // Verificar que la factura existe
    const factura = await prisma.factura.findUnique({
      where: { id: facturaId }
    })
    
    if (!factura) {
      return NextResponse.json(
        { error: 'Factura no encontrada' },
        { status: 404 }
      )
    }
    
    // Obtener las partidas utilizadas en esta factura
    const partidasFactura = await prisma.itemFactura.findMany({
      where: {
        facturaId: facturaId,
        partidaId: { not: null }
      },
      select: {
        partidaId: true,
        partida: true
      },
      distinct: ['partidaId']
    })
    
    // Extraer solo las partidas
    const partidas = partidasFactura
      .map(item => item.partida)
      .filter(partida => partida !== null)
    
    return NextResponse.json(partidas)
  } catch (error) {
    console.error('Error al obtener partidas de la factura:', error)
    return NextResponse.json(
      { error: 'Error al obtener partidas de la factura' },
      { status: 500 }
    )
  }
} 