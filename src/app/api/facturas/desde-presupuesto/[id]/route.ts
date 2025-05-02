import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// POST /api/facturas/desde-presupuesto/[id]
// Crear una factura a partir de un presupuesto
export async function POST(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params
    const presupuestoId = params.id
    
    // 1. Obtener el presupuesto
    const presupuesto = await prisma.presupuesto.findUnique({
      where: { id: presupuestoId },
      include: {
        cliente: true,
        items: {
          include: {
            producto: true,
            partida: true
          }
        },
        presupuestosProveedores: true
      }
    })
    
    if (!presupuesto) {
      return NextResponse.json(
        { error: 'Presupuesto no encontrado' },
        { status: 404 }
      )
    }
    
    // 2. Verificar que el presupuesto esté en estado APROBADO
    if (presupuesto.estado !== 'APROBADO') {
      return NextResponse.json(
        { error: 'Solo se pueden facturar presupuestos aprobados' },
        { status: 400 }
      )
    }
    
    // 3. Obtener el siguiente número de factura
    const numeroResponse = await fetch(`${req.headers.get('origin')}/api/configuracion/siguiente-numero?tipo=factura`)
    if (!numeroResponse.ok) {
      throw new Error('Error al generar el número de factura')
    }
    const { numero: numeroFactura } = await numeroResponse.json()
    
    // 4. Obtener la fecha actual y fecha de vencimiento (30 días después)
    const today = new Date()
    const fechaVencimiento = new Date(today)
    fechaVencimiento.setDate(fechaVencimiento.getDate() + 30)
    
    // 5. Crear la factura
    // Preparar los datos para la factura
    const facturaData: any = {
      numero: numeroFactura,
      fecha: today,
      fechaVencimiento: fechaVencimiento,
      estado: 'PENDIENTE',
      subtotal: presupuesto.subtotal,
      iva: presupuesto.iva,
      total: presupuesto.total,
      observaciones: `Factura generada a partir del presupuesto ${presupuesto.numero}`,
      // Relación con el presupuesto
      presupuestos: {
        connect: { id: presupuestoId }
      },
      // Crear los items de la factura
      items: {
        create: presupuesto.items.map(item => {
          // Preparar el objeto base para el item de factura
          const facturaItem: any = {
            productoId: item.productoId,
            cantidad: item.cantidad,
            precioUnitario: item.precioUnitario,
            descuento: item.descuento,
            iva: item.iva,
            total: item.total,
            dias: item.dias || 1,
            tipo: item.tipo,
            nombre: item.nombre
          };
          
          // Añadir la relación con la partida si existe
          if (item.partidaId) {
            facturaItem.partidaId = item.partidaId;
          }
          
          return facturaItem;
        })
      }
    }
    
    // Añadir clienteId solo si existe
    if (presupuesto.clienteId) {
      facturaData.clienteId = presupuesto.clienteId
    }
    
    const factura = await prisma.factura.create({
      data: facturaData,
      include: {
        cliente: true,
        items: {
          include: {
            producto: true
          }
        },
        presupuestos: true
      }
    })
    
    // 6. Actualizar el estado del presupuesto a FACTURADO
    await prisma.presupuesto.update({
      where: { id: presupuestoId },
      data: { 
        estado: 'FACTURADO',
        facturaId: factura.id
      }
    })
    
    return NextResponse.json(factura)
  } catch (error) {
    console.error('Error al crear factura desde presupuesto:', error)
    return NextResponse.json(
      { error: 'Error al crear la factura' },
      { status: 500 }
    )
  }
} 