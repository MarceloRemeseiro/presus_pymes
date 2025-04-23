import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/presupuestos/[id]
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const presupuestoId = resolvedParams.id
    
    const presupuesto = await prisma.presupuesto.findUnique({
      where: { id: presupuestoId },
      include: {
        cliente: true,
        items: {
          include: {
            producto: true,
            partida: true,
          },
        },
      },
    })
    
    if (!presupuesto) {
      return NextResponse.json(
        { error: 'Presupuesto no encontrado' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(presupuesto)
  } catch (error) {
    console.error('Error al obtener presupuesto:', error)
    return NextResponse.json(
      { error: 'Error al obtener presupuesto' },
      { status: 500 }
    )
  }
}

// PATCH /api/presupuestos/[id] - Actualizar el estado u otros campos del presupuesto
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const presupuestoId = resolvedParams.id
    const body = await req.json()
    
    console.log('Actualizando presupuesto:', presupuestoId)
    console.log('Datos recibidos:', JSON.stringify(body, null, 2))
    console.log('Items recibidos:', body.items ? body.items.length : 0)
    
    // Verificar que el presupuesto existe
    const presupuestoExistente = await prisma.presupuesto.findUnique({
      where: { id: presupuestoId },
      include: {
        items: true
      }
    })
    
    if (!presupuestoExistente) {
      return NextResponse.json(
        { error: 'Presupuesto no encontrado' },
        { status: 404 }
      )
    }
    
    // Verificar si se está actualizando el estado
    if (body.estado) {
      // Validar que el estado sea válido
      const estadosValidos = ['PENDIENTE', 'APROBADO', 'RECHAZADO', 'FACTURADO']
      if (!estadosValidos.includes(body.estado)) {
        return NextResponse.json(
          { error: 'Estado no válido' },
          { status: 400 }
        )
      }
      
      // Verificar reglas de negocio para cambios de estado
      if (presupuestoExistente.estado === 'FACTURADO' && body.estado !== 'FACTURADO') {
        return NextResponse.json(
          { error: 'No se puede cambiar el estado de un presupuesto ya facturado' },
          { status: 400 }
        )
      }
    }
    
    // Preparar datos para la actualización
    const updateData: any = {
      nombre: body.nombre,
      referencia: body.referencia,
      clienteId: body.clienteId,
      estado: body.estado,
      observaciones: body.observaciones,
    }
    
    // Si hay fechas en el body, convertirlas a Date
    if (body.fecha) updateData.fecha = new Date(body.fecha)
    if (body.fechaValidez) updateData.fechaValidez = new Date(body.fechaValidez)
    if (body.fechaMontaje) updateData.fechaMontaje = body.fechaMontaje ? new Date(body.fechaMontaje) : null
    if (body.fechaInicio) updateData.fechaInicio = body.fechaInicio ? new Date(body.fechaInicio) : null
    if (body.fechaFin) updateData.fechaFin = body.fechaFin ? new Date(body.fechaFin) : null
    
    // Manejar los items si están presentes
    if (body.items && body.items.length > 0) {
      console.log(`Procesando ${body.items.length} items para actualización`)
      
      // Importar la función para productos especiales
      const { getOrCreateEspecialProduct } = await import('../items-especiales/route')
      
      // Calcular totales
      const subtotal = body.items.reduce(
        (acc: number, item: any) => {
          // Para elementos de tipo CATEGORIA o SEPARADOR, no sumamos al total
          if (item.tipo === "CATEGORIA" || item.tipo === "SEPARADOR") {
            return acc;
          }
          // Incluimos el factor días en el cálculo
          const dias = item.dias || 1;
          const itemSubtotal = item.cantidad * item.precioUnitario * dias * (1 - item.descuento / 100)
          return acc + itemSubtotal
        },
        0
      )
      
      const iva = body.items.reduce(
        (acc: number, item: any) => {
          // Para elementos de tipo CATEGORIA o SEPARADOR, no sumamos al total
          if (item.tipo === "CATEGORIA" || item.tipo === "SEPARADOR") {
            return acc;
          }
          // Incluimos el factor días en el cálculo
          const dias = item.dias || 1;
          const baseImponible = item.cantidad * item.precioUnitario * dias * (1 - item.descuento / 100)
          return acc + (baseImponible * (item.iva / 100))
        },
        0
      )
      
      const total = subtotal + iva
      
      updateData.subtotal = subtotal
      updateData.iva = iva
      updateData.total = total
      
      // Primero, eliminar todos los items actuales
      await prisma.itemPresupuesto.deleteMany({
        where: { presupuestoId }
      })
      
      // Procesar cada ítem y verificar si necesitamos obtener productos especiales
      const itemsToCreate = []
      
      for (const item of body.items) {
        // Manejar el caso de productos especiales (CATEGORIA y SEPARADOR)
        if ((item.tipo === "CATEGORIA" || item.tipo === "SEPARADOR") && 
            (item.productoId === "categoria" || item.productoId === "separador" || !item.productoId)) {
          // Obtener el ID del producto especial adecuado
          const productoId = await getOrCreateEspecialProduct(item.tipo)
          
          itemsToCreate.push({
            presupuestoId,
            productoId,
            tipo: item.tipo,
            nombre: item.nombre,
            cantidad: 0,
            precioUnitario: 0,
            descuento: 0,
            iva: 0,
            total: 0,
            dias: 0,
            partidaId: item.partidaId || null
          })
        } else {
          // Para elementos normales (equipos, personal, etc.)
          const dias = item.dias || 1;
          const precioTotal = item.cantidad * item.precioUnitario * dias * (1 - item.descuento / 100)
          const ivaImporte = precioTotal * (item.iva / 100)
          
          itemsToCreate.push({
            presupuestoId,
            productoId: item.productoId,
            tipo: item.tipo,
            nombre: item.nombre, // Guardamos el nombre directamente para categorías
            cantidad: item.cantidad,
            precioUnitario: item.precioUnitario,
            descuento: item.descuento || 0,
            iva: item.iva,
            dias: dias,
            total: precioTotal + ivaImporte,
            partidaId: item.partidaId || null
          })
        }
      }
      
      // Crear los items uno por uno para evitar errores si hay algún ítem problemático
      for (const item of itemsToCreate) {
        try {
          await prisma.itemPresupuesto.create({
            data: item
          })
        } catch (error) {
          console.error(`Error al crear ítem: ${JSON.stringify(item)}`, error)
          throw new Error(`Error al crear ítem: ${error}`)
        }
      }
    }
    
    // Actualizar el presupuesto
    const presupuestoActualizado = await prisma.presupuesto.update({
      where: { id: presupuestoId },
      data: updateData,
      include: {
        cliente: true,
        items: {
          include: {
            producto: true,
            partida: true,
          },
        },
      },
    })
    
    return NextResponse.json(presupuestoActualizado)
  } catch (error) {
    console.error('Error al actualizar presupuesto:', error)
    return NextResponse.json(
      { error: 'Error al actualizar presupuesto' },
      { status: 500 }
    )
  }
}

// DELETE /api/presupuestos/[id] - Eliminar un presupuesto
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const presupuestoId = resolvedParams.id
    
    // Verificar que el presupuesto existe
    const presupuestoExistente = await prisma.presupuesto.findUnique({
      where: { id: presupuestoId }
    })
    
    if (!presupuestoExistente) {
      return NextResponse.json(
        { error: 'Presupuesto no encontrado' },
        { status: 404 }
      )
    }
    
    // No permitir eliminar presupuestos facturados
    if (presupuestoExistente.estado === 'FACTURADO') {
      return NextResponse.json(
        { error: 'No se puede eliminar un presupuesto facturado' },
        { status: 400 }
      )
    }
    
    // Eliminar los items del presupuesto primero
    await prisma.itemPresupuesto.deleteMany({
      where: { presupuestoId }
    })
    
    // Eliminar el presupuesto
    await prisma.presupuesto.delete({
      where: { id: presupuestoId }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error al eliminar presupuesto:', error)
    return NextResponse.json(
      { error: 'Error al eliminar presupuesto' },
      { status: 500 }
    )
  }
} 