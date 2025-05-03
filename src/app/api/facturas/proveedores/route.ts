import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// POST /api/facturas/proveedores - Crear una nueva factura de proveedor
export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Verificar campos obligatorios
    if (!body.facturaId) {
      return NextResponse.json(
        { error: 'El ID de la factura es obligatorio' },
        { status: 400 }
      )
    }
    
    if (!body.nombre) {
      return NextResponse.json(
        { error: 'El nombre de la factura de proveedor es obligatorio' },
        { status: 400 }
      )
    }
    
    if (typeof body.precio !== 'number' || body.precio <= 0) {
      return NextResponse.json(
        { error: 'El precio debe ser un número mayor que 0' },
        { status: 400 }
      )
    }
    
    // Verificar que la factura existe
    const factura = await prisma.factura.findUnique({
      where: { id: body.facturaId }
    })
    
    if (!factura) {
      return NextResponse.json(
        { error: 'La factura no existe' },
        { status: 404 }
      )
    }
    
    // Crear factura de proveedor
    const facturaProveedor = await prisma.facturaProveedor.create({
      data: {
        facturaId: body.facturaId,
        nombre: body.nombre,
        descripcion: body.descripcion || null,
        precio: body.precio,
        precioConIVA: body.precioConIVA || false,
        proveedorId: body.proveedorId || null,
        partidaId: body.partidaId || null,
        tipoEspecial: body.tipoEspecial || null,
        archivoUrl: body.archivoUrl || null,
        documentoNombre: body.documentoNombre || null,
        documentoFecha: body.documentoFecha ? new Date(body.documentoFecha) : null
      },
      include: {
        proveedor: true,
        partida: true
      }
    })
    
    return NextResponse.json(facturaProveedor, { status: 201 })
  } catch (error) {
    console.error('Error al crear factura de proveedor:', error)
    return NextResponse.json(
      { error: 'Error al crear factura de proveedor' },
      { status: 500 }
    )
  }
} 