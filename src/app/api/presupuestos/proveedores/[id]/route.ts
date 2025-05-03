import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

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

// GET /api/presupuestos/proveedores/[id]
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Obtener el presupuesto de proveedor por su ID
    const presupuestoProveedor = await prisma.presupuestoProveedor.findUnique({
      where: { id },
      include: {
        proveedor: true,
        partida: true
      }
    })

    if (!presupuestoProveedor) {
      return NextResponse.json(
        { error: 'Presupuesto de proveedor no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(presupuestoProveedor)
  } catch (error) {
    console.error('Error al obtener presupuesto de proveedor:', error)
    return NextResponse.json(
      { error: 'Error al obtener presupuesto de proveedor' },
      { status: 500 }
    )
  }
}

// PUT /api/presupuestos/proveedores/[id]
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()

    // Validar campos requeridos
    if (!body.nombre || body.precio === undefined) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios (nombre, precio)' },
        { status: 400 }
      )
    }

    // Verificar que el presupuesto de proveedor existe
    const presupuestoProveedor = await prisma.presupuestoProveedor.findUnique({
      where: { id }
    })

    if (!presupuestoProveedor) {
      return NextResponse.json(
        { error: 'Presupuesto de proveedor no encontrado' },
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

    // Actualizar el presupuesto de proveedor
    const presupuestoProveedorActualizado = await prisma.presupuestoProveedor.update({
      where: { id },
      data: {
        nombre: body.nombre,
        descripcion: body.descripcion || null,
        precio: parseFloat(body.precio),
        precioConIVA: body.precioConIVA === true,
        proveedorId: body.proveedorId || null,
        partidaId: body.partidaId === "sin-partida" ? null : body.partidaId,
        tipoEspecial: body.tipoEspecial || null,
        archivoUrl: body.archivoUrl || null,
        documentoNombre: body.documentoNombre !== undefined ? body.documentoNombre : presupuestoProveedor.documentoNombre,
        documentoFecha: body.documentoFecha ? new Date(body.documentoFecha) : presupuestoProveedor.documentoFecha
      },
      include: {
        proveedor: true,
        partida: true
      }
    })

    // Actualizar los totales del presupuesto principal
    await actualizarTotalesPresupuesto(presupuestoProveedor.presupuestoId)

    return NextResponse.json(presupuestoProveedorActualizado)
  } catch (error) {
    console.error('Error al actualizar presupuesto de proveedor:', error)
    return NextResponse.json(
      { error: 'Error al actualizar presupuesto de proveedor' },
      { status: 500 }
    )
  }
}

// DELETE /api/presupuestos/proveedores/[id]
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Verificar que el presupuesto de proveedor existe
    const presupuestoProveedor = await prisma.presupuestoProveedor.findUnique({
      where: { id }
    })

    if (!presupuestoProveedor) {
      return NextResponse.json(
        { error: 'Presupuesto de proveedor no encontrado' },
        { status: 404 }
      )
    }

    // Guardar el ID del presupuesto principal para actualizar totales después
    const presupuestoId = presupuestoProveedor.presupuestoId

    // Eliminar el presupuesto de proveedor
    await prisma.presupuestoProveedor.delete({
      where: { id }
    })

    // Actualizar los totales del presupuesto principal
    await actualizarTotalesPresupuesto(presupuestoId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error al eliminar presupuesto de proveedor:', error)
    return NextResponse.json(
      { error: 'Error al eliminar presupuesto de proveedor' },
      { status: 500 }
    )
  }
} 