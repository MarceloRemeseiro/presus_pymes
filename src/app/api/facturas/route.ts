import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/facturas - Obtener todas las facturas
export async function GET() {
  try {
    const facturas = await prisma.factura.findMany({
      include: {
        cliente: true,
        items: {
          include: {
            producto: true,
          },
        },
        presupuestos: true,
      },
      orderBy: {
        fecha: 'desc',
      },
    })
    
    return NextResponse.json(facturas)
  } catch (error) {
    console.error('Error al obtener facturas:', error)
    return NextResponse.json(
      { error: 'Error al obtener facturas' },
      { status: 500 }
    )
  }
}

// POST /api/facturas - Crear una nueva factura
export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Calculamos los totales
    const subtotal = body.items.reduce(
      (acc: number, item: any) => acc + (item.cantidad * item.precioUnitario * (1 - item.descuento / 100)),
      0
    )
    
    const iva = body.items.reduce(
      (acc: number, item: any) => {
        const baseImponible = item.cantidad * item.precioUnitario * (1 - item.descuento / 100)
        return acc + (baseImponible * (item.iva / 100))
      },
      0
    )
    
    const total = subtotal + iva
    
    // Creamos la factura con sus items
    const factura = await prisma.factura.create({
      data: {
        numero: body.numero,
        fecha: new Date(body.fecha),
        fechaVencimiento: new Date(body.fechaVencimiento),
        clienteId: body.clienteId,
        estado: body.estado,
        observaciones: body.observaciones,
        subtotal,
        iva,
        total,
        items: {
          create: body.items.map((item: any) => {
            const precioTotal = item.cantidad * item.precioUnitario * (1 - item.descuento / 100)
            const ivaImporte = precioTotal * (item.iva / 100)
            
            return {
              productoId: item.productoId,
              cantidad: item.cantidad,
              precioUnitario: item.precioUnitario,
              descuento: item.descuento,
              iva: item.iva,
              total: precioTotal + ivaImporte,
            }
          }),
        },
        // Conectar con presupuestos si vienen en la petición
        presupuestos: body.presupuestoIds?.length 
          ? {
              connect: body.presupuestoIds.map((id: string) => ({ id }))
            }
          : undefined,
      },
      include: {
        cliente: true,
        items: {
          include: {
            producto: true,
          },
        },
        presupuestos: true,
      },
    })
    
    // Actualizar el estado de los presupuestos en una operación separada
    if (body.presupuestoIds?.length) {
      await prisma.presupuesto.updateMany({
        where: { id: { in: body.presupuestoIds } },
        data: { estado: 'FACTURADO' }
      })
    }
    
    return NextResponse.json(factura, { status: 201 })
  } catch (error) {
    console.error('Error al crear factura:', error)
    return NextResponse.json(
      { error: 'Error al crear factura' },
      { status: 500 }
    )
  }
} 