import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/facturas/proveedores/[id] - Obtener una factura de proveedor específica
export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params
    const facturaProveedorId = params.id
    
    const facturaProveedor = await prisma.facturaProveedor.findUnique({
      where: { id: facturaProveedorId },
      include: {
        proveedor: true,
        partida: true
      }
    })
    
    if (!facturaProveedor) {
      return NextResponse.json(
        { error: 'Factura de proveedor no encontrada' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(facturaProveedor)
  } catch (error) {
    console.error('Error al obtener factura de proveedor:', error)
    return NextResponse.json(
      { error: 'Error al obtener factura de proveedor' },
      { status: 500 }
    )
  }
}

// PUT /api/facturas/proveedores/[id] - Actualizar una factura de proveedor
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params
    const facturaProveedorId = params.id
    const body = await req.json()
    
    // Verificar que la factura de proveedor existe
    const facturaProveedorExistente = await prisma.facturaProveedor.findUnique({
      where: { id: facturaProveedorId }
    })
    
    if (!facturaProveedorExistente) {
      return NextResponse.json(
        { error: 'Factura de proveedor no encontrada' },
        { status: 404 }
      )
    }
    
    // Actualizar la factura de proveedor
    const facturaProveedorActualizada = await prisma.facturaProveedor.update({
      where: { id: facturaProveedorId },
      data: {
        nombre: body.nombre || facturaProveedorExistente.nombre,
        descripcion: body.descripcion !== undefined ? body.descripcion : facturaProveedorExistente.descripcion,
        precio: body.precio || facturaProveedorExistente.precio,
        precioConIVA: body.precioConIVA !== undefined ? body.precioConIVA : facturaProveedorExistente.precioConIVA,
        proveedorId: body.proveedorId !== undefined ? body.proveedorId : facturaProveedorExistente.proveedorId,
        partidaId: body.partidaId !== undefined ? body.partidaId : facturaProveedorExistente.partidaId,
        tipoEspecial: body.tipoEspecial !== undefined ? body.tipoEspecial : facturaProveedorExistente.tipoEspecial,
        archivoUrl: body.archivoUrl !== undefined ? body.archivoUrl : facturaProveedorExistente.archivoUrl,
        documentoNombre: body.documentoNombre !== undefined ? body.documentoNombre : facturaProveedorExistente.documentoNombre,
        documentoFecha: body.documentoFecha ? new Date(body.documentoFecha) : facturaProveedorExistente.documentoFecha
      },
      include: {
        proveedor: true,
        partida: true
      }
    })
    
    return NextResponse.json(facturaProveedorActualizada)
  } catch (error) {
    console.error('Error al actualizar factura de proveedor:', error)
    return NextResponse.json(
      { error: 'Error al actualizar factura de proveedor' },
      { status: 500 }
    )
  }
}

// DELETE /api/facturas/proveedores/[id] - Eliminar una factura de proveedor
export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params
    const facturaProveedorId = params.id
    
    // Verificar que la factura de proveedor existe
    const facturaProveedorExistente = await prisma.facturaProveedor.findUnique({
      where: { id: facturaProveedorId }
    })
    
    if (!facturaProveedorExistente) {
      return NextResponse.json(
        { error: 'Factura de proveedor no encontrada' },
        { status: 404 }
      )
    }
    
    // Eliminar la factura de proveedor
    await prisma.facturaProveedor.delete({
      where: { id: facturaProveedorId }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error al eliminar factura de proveedor:', error)
    return NextResponse.json(
      { error: 'Error al eliminar factura de proveedor' },
      { status: 500 }
    )
  }
} 