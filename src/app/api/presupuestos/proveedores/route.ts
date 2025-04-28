import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/presupuestos/proveedores?presupuestoId=...
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const presupuestoId = searchParams.get('presupuestoId')

    if (!presupuestoId) {
      return NextResponse.json(
        { error: 'Se requiere presupuestoId para obtener presupuestos de proveedores' },
        { status: 400 }
      )
    }

    // Obtener todos los presupuestos de proveedores para un presupuesto específico
    const presupuestosProveedores = await prisma.presupuestoProveedor.findMany({
      where: {
        presupuestoId
      },
      include: {
        proveedor: true,
        partida: true
      }
    })

    return NextResponse.json(presupuestosProveedores)
  } catch (error) {
    console.error('Error al obtener presupuestos de proveedores:', error)
    return NextResponse.json(
      { error: 'Error al obtener presupuestos de proveedores' },
      { status: 500 }
    )
  }
}

// POST /api/presupuestos/proveedores
export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validar campos requeridos
    if (!body.presupuestoId || !body.nombre || body.precio === undefined) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios (presupuestoId, nombre, precio)' },
        { status: 400 }
      )
    }

    // Verificar que el presupuesto existe
    const presupuesto = await prisma.presupuesto.findUnique({
      where: { id: body.presupuestoId }
    })

    if (!presupuesto) {
      return NextResponse.json(
        { error: 'El presupuesto especificado no existe' },
        { status: 404 }
      )
    }

    // Si se proporciona un proveedorId, verificar que existe
    if (body.proveedorId) {
      const proveedor = await prisma.proveedor.findUnique({
        where: { id: body.proveedorId }
      })

      if (!proveedor) {
        return NextResponse.json(
          { error: 'El proveedor especificado no existe' },
          { status: 404 }
        )
      }
    }

    // Crear el presupuesto de proveedor
    const presupuestoProveedor = await prisma.presupuestoProveedor.create({
      data: {
        presupuestoId: body.presupuestoId,
        nombre: body.nombre,
        descripcion: body.descripcion || null,
        precio: parseFloat(body.precio),
        precioConIVA: body.precioConIVA === true,
        proveedorId: body.proveedorId || null,
        partidaId: body.partidaId === "sin-partida" ? null : body.partidaId,
        tipoEspecial: body.tipoEspecial || null,
        archivoUrl: body.archivoUrl || null
      },
      include: {
        proveedor: true,
        partida: true
      }
    })

    // Actualizar los totales del presupuesto
    await actualizarTotalesPresupuesto(body.presupuestoId)

    return NextResponse.json(presupuestoProveedor, { status: 201 })
  } catch (error) {
    console.error('Error al crear presupuesto de proveedor:', error)
    return NextResponse.json(
      { error: 'Error al crear presupuesto de proveedor' },
      { status: 500 }
    )
  }
}

// Función para actualizar los totales del presupuesto
async function actualizarTotalesPresupuesto(presupuestoId: string) {
  try {
    // Obtener el presupuesto con sus items y presupuestos de proveedores
    const presupuesto = await prisma.presupuesto.findUnique({
      where: { id: presupuestoId },
      include: {
        items: true,
        presupuestosProveedores: true
      }
    })

    if (!presupuesto) return

    // Calcular el subtotal de los items del presupuesto
    const subtotalItems = presupuesto.items.reduce((acc, item) => {
      const dias = item.dias || 1
      const itemSubtotal = item.cantidad * item.precioUnitario * dias * (1 - item.descuento / 100)
      return acc + itemSubtotal
    }, 0)

    // Calcular el IVA de los items del presupuesto
    const ivaItems = presupuesto.items.reduce((acc, item) => {
      const dias = item.dias || 1
      const baseImponible = item.cantidad * item.precioUnitario * dias * (1 - item.descuento / 100)
      return acc + (baseImponible * (item.iva / 100))
    }, 0)

    // Calculamos totales, pero NO los sumamos al presupuesto al cliente
    // Los presupuestos de proveedores NO deben sumarse a los totales del presupuesto principal
    // Simplemente actualizamos con los totales de los items
    await prisma.presupuesto.update({
      where: { id: presupuestoId },
      data: {
        subtotal: subtotalItems,
        iva: ivaItems,
        total: subtotalItems + ivaItems
      }
    })
  } catch (error) {
    console.error('Error al actualizar totales del presupuesto:', error)
    throw error
  }
} 