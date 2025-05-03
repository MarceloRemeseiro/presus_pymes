import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/facturas/[id] - Obtener una factura específica
export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params
    const facturaId = params.id
    
    const factura = await prisma.factura.findUnique({
      where: { id: facturaId },
      include: {
        cliente: true,
        items: {
          include: {
            producto: true,
            partida: true,
          },
        },
        presupuestos: true,
        facturasProveedores: {
          include: {
            proveedor: true,
            partida: true
          }
        }
      }
    })
    
    if (!factura) {
      return NextResponse.json(
        { error: 'Factura no encontrada' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(factura)
  } catch (error) {
    console.error('Error al obtener factura:', error)
    return NextResponse.json(
      { error: 'Error al obtener factura' },
      { status: 500 }
    )
  }
}

// PUT /api/facturas/[id] - Actualizar una factura
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params
    const facturaId = params.id
    const body = await req.json()
    
    console.log("==== BACKEND: ACTUALIZANDO FACTURA ====");
    console.log(`Factura ID: ${facturaId}`);
    console.log(`Número de items recibidos: ${body.items.length}`);
    
    // Verificar que la factura existe
    const facturaExistente = await prisma.factura.findUnique({
      where: { id: facturaId },
      include: { items: true }
    })
    
    if (!facturaExistente) {
      return NextResponse.json(
        { error: 'Factura no encontrada' },
        { status: 404 }
      )
    }
    
    // Actualizar datos básicos de la factura
    const facturaActualizada = await prisma.factura.update({
      where: { id: facturaId },
      data: {
        // Solo actualizar campos que existen en el body
        ...(body.numero ? { numero: body.numero } : {}),
        ...(body.numeroPedido !== undefined ? { numeroPedido: body.numeroPedido } : {}),
        ...(body.fecha ? { fecha: new Date(body.fecha) } : {}),
        ...(body.fechaVencimiento ? { fechaVencimiento: new Date(body.fechaVencimiento) } : {}),
        ...(body.clienteId !== undefined ? { clienteId: body.clienteId } : {}),
        ...(body.observaciones !== undefined ? { observaciones: body.observaciones } : {}),
        ...(body.estado ? { estado: body.estado } : {})
      },
    })
    
    // Eliminar todos los items existentes
    console.log("Eliminando items existentes...");
    await prisma.itemFactura.deleteMany({
      where: { facturaId: facturaId }
    })
    
    // Crear los nuevos items
    console.log("Creando nuevos items...");
    for (const item of body.items) {
      console.log(`Procesando item de tipo: ${item.tipo} - Nombre: ${item.nombre}`);
      
      // Preparar datos base del item
      const itemData: any = {
        facturaId: facturaId,
        productoId: item.productoId,
        tipo: item.tipo || 'EQUIPO',
        nombre: item.nombre || 'Sin nombre',
        cantidad: item.cantidad || 0,
        precioUnitario: item.precioUnitario || 0,
        descuento: item.descuento || 0,
        iva: item.iva || 0,
        total: item.total || 0, // Importante enviar el total
        dias: item.dias || 1,
        partidaId: item.partidaId || null
      }
      
      // Eliminamos la parte que procesaba datosExtra ya que no existe en el modelo de Prisma
      
      try {
        // Crear el item en la base de datos
        const createdItem = await prisma.itemFactura.create({ data: itemData });
        console.log(`Item creado: ${createdItem.id}, ${createdItem.nombre}, tipo: ${createdItem.tipo}`);
      } catch (error) {
        console.error(`Error al crear item "${item.nombre}":`, error);
        throw error; // Propagar error para que se pueda manejar
      }
    }
    
    // Calcular totales
    const itemsResult = await prisma.itemFactura.findMany({
      where: { facturaId: facturaId }
    })
    
    let subtotal = 0
    let totalIva = 0
    
    // Calcular la suma de todos los importes
    for (const item of itemsResult) {
      const itemSubtotal = (item.cantidad || 0) * (item.precioUnitario || 0) * (item.dias || 1) * (1 - (item.descuento || 0) / 100)
      const itemIva = itemSubtotal * (item.iva || 0) / 100
      
      subtotal += itemSubtotal
      totalIva += itemIva
    }
    
    const total = subtotal + totalIva
    
    // Actualizar los totales en la factura
    await prisma.factura.update({
      where: { id: facturaId },
      data: {
        subtotal,
        iva: totalIva,
        total
      }
    })
    
    // Buscar la factura actualizada completa
    const facturaFinal = await prisma.factura.findUnique({
      where: { id: facturaId },
      include: {
        items: {
          include: {
            producto: true,
            partida: true,
          }
        },
        cliente: true,
        presupuestos: true
      }
    })
    
    return NextResponse.json(facturaFinal)
    
  } catch (error) {
    console.error('Error al actualizar la factura:', error)
    return NextResponse.json(
      { error: 'Error al actualizar la factura' },
      { status: 500 }
    )
  }
}

// DELETE /api/facturas/[id] - Eliminar una factura
export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params
    const facturaId = params.id
    
    // Verificar que la factura existe
    const facturaExistente = await prisma.factura.findUnique({
      where: { id: facturaId },
      include: { presupuestos: true }
    })
    
    if (!facturaExistente) {
      return NextResponse.json(
        { error: 'Factura no encontrada' },
        { status: 404 }
      )
    }
    
    // Si hay presupuestos asociados, actualizar su estado
    if (facturaExistente.presupuestos.length > 0) {
      await prisma.presupuesto.updateMany({
        where: { 
          id: { 
            in: facturaExistente.presupuestos.map(p => p.id) 
          } 
        },
        data: { 
          estado: 'APROBADO',
          facturaId: null
        }
      })
    }
    
    // Eliminar la factura (y sus items por cascada)
    await prisma.factura.delete({
      where: { id: facturaId }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error al eliminar factura:', error)
    return NextResponse.json(
      { error: 'Error al eliminar factura' },
      { status: 500 }
    )
  }
} 