import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PUT /api/gastos/[id]/estado - Cambiar el estado de un gasto
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  
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
    
    // Si el gasto está asociado a una factura, actualizamos el estado de la factura
    if (gasto.factura) {
      // Convertimos el estado de gasto a estado de factura
      const estadoFactura = 
        estado === 'PAGADO' ? 'COBRADA' :
        estado === 'VENCIDO' ? 'VENCIDA' :
        estado === 'ANULADO' ? 'ANULADA' : 'PENDIENTE'
      
      await prisma.factura.update({
        where: { id: gasto.facturaId! },
        data: { estado: estadoFactura }
      })
      
      // Actualizamos el gasto para reflejar los cambios
      const gastoActualizado = await prisma.facturaProveedor.findUnique({
        where: { id },
        include: {
          proveedor: true,
          factura: true,
          partida: true,
        }
      })
      
      return NextResponse.json(gastoActualizado)
    } else {
      // Si no está asociado a una factura, solo actualizamos un campo custom del gasto
      // Por ejemplo, podríamos tener un campo estadoPersonalizado
      const gastoActualizado = await prisma.facturaProveedor.update({
        where: { id },
        data: {
          // Como no tenemos un campo específico para esto, podrías guardar en algún otro campo,
          // o simplemente retornar success sin actualizar nada en este caso
          tipoEspecial: estado === 'PAGADO' ? 'pagado' : 'pendiente'
        },
        include: {
          proveedor: true,
          factura: true,
          partida: true,
        }
      })
      
      return NextResponse.json(gastoActualizado)
    }
  } catch (error) {
    console.error('Error al actualizar el estado del gasto:', error)
    return NextResponse.json(
      { error: 'Error al actualizar el estado del gasto' },
      { status: 500 }
    )
  }
} 