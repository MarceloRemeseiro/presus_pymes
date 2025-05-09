import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PUT /api/gastos/[id]/estado - Cambiar el estado de un gasto
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
  const id = resolvedParams.id
  
  try {
    const { estado } = await request.json()
    
    // Buscamos el gasto
    const gasto = await prisma.facturaProveedor.findUnique({
      where: { id },
      include: { factura: true }
    })
    
    if (!gasto) {
      return NextResponse.json(
        { error: 'Gasto no encontrado' },
        { status: 404 }
      )
    }
    
    // Actualizamos el estado del gasto (sin modificar el de la factura)
    const gastoActualizado = await prisma.facturaProveedor.update({
      where: { id },
      data: {
        // Agregamos prefijo "estado_" para diferenciar cuando es un estado y no un tipo especial
        tipoEspecial: `estado_${estado.toLowerCase()}`
      },
      include: {
        proveedor: true,
        factura: true,
        partida: true,
      }
    })
    
    return NextResponse.json(gastoActualizado)
  } catch (error) {
    console.error('Error al actualizar el estado del gasto:', error)
    return NextResponse.json(
      { error: 'Error al actualizar el estado del gasto' },
      { status: 500 }
    )
  }
} 