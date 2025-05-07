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
    
    // Si el gasto está asociado a una factura, actualizamos el estado de la factura
    if (gasto.factura) {
      // Convertimos el estado de gasto a estado de factura
      const estadoFactura = 
        estado === 'PAGADO' ? 'COBRADA' :
        estado === 'VENCIDO' ? 'VENCIDA' :
        estado === 'ANULADO' ? 'ANULADA' : 'PENDIENTE'
      
      // IMPORTANTE: Verificar si hay más gastos asociados a esta factura antes de actualizar su estado
      const gastosAsociados = await prisma.facturaProveedor.findMany({
        where: { facturaId: gasto.facturaId },
      });
      
      // Si esta factura es referenciada por más de un gasto, no cambiaremos su estado directamente
      // En su lugar, usaremos un campo específico en el gasto actual
      if (gastosAsociados.length > 1) {
        console.log(`Esta factura (${gasto.facturaId}) es compartida por ${gastosAsociados.length} gastos. 
                    No actualizaremos el estado de la factura, solo el del gasto.`);
                    
        // Actualizar solo el gasto con un estado personalizado
        const gastoActualizado = await prisma.facturaProveedor.update({
          where: { id },
          data: {
            tipoEspecial: `estado_${estado.toLowerCase()}`
          },
          include: {
            proveedor: true,
            factura: true,
            partida: true,
          }
        });
        
        return NextResponse.json(gastoActualizado);
      }
      
      // Si la factura no es compartida, actualizamos su estado normalmente
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
      // Si no está asociado a una factura, actualizamos el tipoEspecial con un prefijo para diferenciar estado
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
    }
  } catch (error) {
    console.error('Error al actualizar el estado del gasto:', error)
    return NextResponse.json(
      { error: 'Error al actualizar el estado del gasto' },
      { status: 500 }
    )
  }
} 