import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/presupuestos - Obtener todos los presupuestos
export async function GET() {
  try {
    const presupuestos = await prisma.presupuesto.findMany({
      include: {
        cliente: true,
        items: {
          include: {
            producto: true,
          },
        },
      },
      orderBy: {
        fecha: 'desc',
      },
    })
    
    return NextResponse.json(presupuestos)
  } catch (error) {
    console.error('Error al obtener presupuestos:', error)
    return NextResponse.json(
      { error: 'Error al obtener presupuestos' },
      { status: 500 }
    )
  }
}

// POST /api/presupuestos - Crear un nuevo presupuesto
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
    
    // Creamos el presupuesto con sus items
    const presupuesto = await prisma.presupuesto.create({
      data: {
        numero: body.numero,
        fecha: new Date(body.fecha),
        fechaValidez: new Date(body.fechaValidez),
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
      },
      include: {
        cliente: true,
        items: {
          include: {
            producto: true,
          },
        },
      },
    })
    
    return NextResponse.json(presupuesto, { status: 201 })
  } catch (error) {
    console.error('Error al crear presupuesto:', error)
    return NextResponse.json(
      { error: 'Error al crear presupuesto' },
      { status: 500 }
    )
  }
} 