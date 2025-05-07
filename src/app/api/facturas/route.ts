import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/facturas - Obtener todas las facturas
export async function GET() {
  try {
    const facturas = await prisma.factura.findMany({
      where: {
        // Excluir facturas internas/sistema
        NOT: {
          OR: [
            // Excluir factura especial para gastos independientes
            { numero: "GASTOS-INDEPENDIENTES" },
            // Excluir facturas del cliente SISTEMA
            { cliente: { nombre: "SISTEMA" } }
          ]
        }
      },
      include: {
        cliente: true,
        items: {
          include: {
            producto: true,
            partida: true,
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
    const subtotal = body.items ? body.items.reduce(
      (acc: number, item: any) => acc + (item.cantidad * item.precioUnitario * (1 - item.descuento / 100)),
      0
    ) : 0
    
    const iva = body.items ? body.items.reduce(
      (acc: number, item: any) => {
        const baseImponible = item.cantidad * item.precioUnitario * (1 - item.descuento / 100)
        return acc + (baseImponible * (item.iva / 100))
      },
      0
    ) : 0
    
    const total = subtotal + iva
    
    // Generar un número único para la factura
    const nextNumberResponse = await fetch(`${req.headers.get('origin')}/api/configuracion/siguiente-numero?tipo=factura`)
    if (!nextNumberResponse.ok) {
      throw new Error('Error al generar el número de factura')
    }
    const { numero } = await nextNumberResponse.json()
    
    // Obtener la fecha actual y fecha de vencimiento (30 días después)
    const today = new Date()
    const fechaVencimiento = new Date(today)
    fechaVencimiento.setDate(fechaVencimiento.getDate() + 30)
    
    // Crear una factura vacía
    const facturaData: any = {
      numero,
      fecha: today,
      fechaVencimiento,
      estado: 'PENDIENTE',
      subtotal,
      iva,
      total,
    }
    
    // Agregar numeroPedido si existe
    if (body.numeroPedido) {
      facturaData.numeroPedido = body.numeroPedido;
    }
    
    // Agregar nombre si existe
    if (body.nombre) {
      facturaData.nombre = body.nombre;
    }
    
    // Agregar clienteId si existe
    if (body.clienteId) {
      facturaData.clienteId = body.clienteId
    }
    
    // Agregar items si existen
    if (body.items?.length) {
      facturaData.items = {
        create: body.items.map((item: any) => {
          const precioTotal = item.cantidad * item.precioUnitario * (1 - item.descuento / 100)
          const ivaImporte = precioTotal * (item.iva / 100)
          
          return {
            productoId: item.productoId,
            nombre: item.nombre,
            tipo: item.tipo,
            cantidad: item.cantidad,
            precioUnitario: item.precioUnitario,
            descuento: item.descuento,
            iva: item.iva,
            total: precioTotal + ivaImporte,
            dias: item.dias,
            partidaId: item.partidaId || null
          }
        }),
      }
    }
    
    // Agregar presupuestos si existen
    if (body.presupuestoIds?.length) {
      facturaData.presupuestos = {
        connect: body.presupuestoIds.map((id: string) => ({ id }))
      }
    }
    
    const factura = await prisma.factura.create({
      data: facturaData,
      include: {
        cliente: true,
        items: {
          include: {
            producto: true,
            partida: true,
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