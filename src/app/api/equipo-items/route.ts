import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/equipo-items - Obtener todas las instancias de equipos
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const productoId = searchParams.get('productoId')
  
  try {
    let equipoItems
    
    if (productoId) {
      // Si se proporciona un productoId, filtrar por ese producto
      equipoItems = await prisma.equipoItem.findMany({
        where: {
          productoId: productoId,
        },
        include: {
          producto: {
            include: {
              categoria: true,
              marca: true,
            }
          },
          proveedor: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    } else {
      // Si no, obtener todos los equipos
      equipoItems = await prisma.equipoItem.findMany({
        include: {
          producto: {
            include: {
              categoria: true,
              marca: true,
            }
          },
          proveedor: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    }
    
    return NextResponse.json(equipoItems)
  } catch (error) {
    console.error('Error al obtener instancias de equipos:', error)
    return NextResponse.json(
      { error: 'Error al obtener instancias de equipos' },
      { status: 500 }
    )
  }
}

// POST /api/equipo-items - Crear una nueva instancia de equipo
export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Primero obtenemos el producto para validar
    const producto = await prisma.producto.findUnique({
      where: { id: body.productoId }
    })
    
    if (!producto) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      )
    }

    // Crear la instancia del equipo con any para evitar errores de tipo
    const createData: any = {
      productoId: body.productoId,
      numeroSerie: body.numeroSerie,
      notasInternas: body.notasInternas,
      estado: body.estado || 'DISPONIBLE',
      fechaCompra: body.fechaCompra ? new Date(body.fechaCompra) : null,
      proveedorId: body.proveedorId || null,
    }
    
    // Agregar precio de compra si existe
    if (body.precioCompra !== undefined && body.precioCompra !== null) {
      createData.precioCompra = parseFloat(body.precioCompra)
    }
    
    // Usamos una transacción para asegurar la integridad de los datos
    const [equipoItem] = await prisma.$transaction([
      // 1. Crear el elemento de equipo
      prisma.equipoItem.create({
        data: createData,
        include: {
          producto: true,
          proveedor: true,
        }
      }),
      
      // 2. Incrementar el stock del producto
      prisma.producto.update({
        where: { id: body.productoId },
        data: {
          stock: { increment: 1 }
        }
      })
    ])
    
    return NextResponse.json(equipoItem, { status: 201 })
  } catch (error) {
    console.error('Error al crear instancia de equipo:', error)
    return NextResponse.json(
      { error: 'Error al crear instancia de equipo' },
      { status: 500 }
    )
  }
} 