import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/productos - Obtener todos los productos
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const includeEquipoItems = searchParams.get('includeEquipoItems') === 'true'
  
  try {
    let productos
    
    if (includeEquipoItems) {
      productos = await prisma.producto.findMany({
        include: {
          categoria: true,
          marca: true,
          _count: {
            select: {
              equipoItems: true
            }
          }
        },
        orderBy: {
          nombre: 'asc',
        },
      })
    } else {
      productos = await prisma.producto.findMany({
        include: {
          categoria: true,
          marca: true,
        },
        orderBy: {
          nombre: 'asc',
        },
      })
    }
    
    return NextResponse.json(productos)
  } catch (error) {
    console.error('Error al obtener productos:', error)
    return NextResponse.json(
      { error: 'Error al obtener productos' },
      { status: 500 }
    )
  }
}

// POST /api/productos - Crear un nuevo producto
export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Usar any para evitar problemas de tipo
    const createData: any = {
      nombre: body.nombre,
      stock: body.stock !== null && body.stock !== undefined ? parseInt(body.stock) : 0,
      precio: parseFloat(body.precio) || 0,
      categoria: {
        connectOrCreate: {
          where: { id: body.categoriaId },
          create: { 
            id: body.categoriaId,
            nombre: body.categoriaNombre
          }
        }
      }
    }
    
    // Agregar campos opcionales si existen
    if (body.descripcion !== undefined) {
      createData.descripcion = body.descripcion
    }
    
    if (body.modelo !== undefined) {
      createData.modelo = body.modelo
    }
    
    if (body.precioCompra !== undefined && body.precioCompra !== null && body.precioCompra !== '') {
      createData.precioCompra = parseFloat(body.precioCompra)
    }
    
    if (body.precioAlquiler !== undefined && body.precioAlquiler !== null && body.precioAlquiler !== '') {
      createData.precioAlquiler = parseFloat(body.precioAlquiler)
    }
    
    // Manejar la marca correctamente
    if (body.marcaId && body.marcaId !== 'nueva' && body.marcaId !== '') {
      // Verificar si la marca existe antes de intentar conectarla
      const existingMarca = await prisma.marca.findUnique({
        where: { id: body.marcaId }
      })
      
      if (existingMarca) {
        // Si la marca existe, conéctala
        createData.marca = {
          connect: { id: body.marcaId }
        }
      } else if (body.marcaNombre) {
        // Si la marca no existe pero tenemos un nombre, créala
        createData.marca = {
          create: { nombre: body.marcaNombre }
        }
      }
    } else if (body.marcaId === 'nueva' && body.marcaNombre) {
      // Crear una nueva marca
      createData.marca = {
        create: { nombre: body.marcaNombre }
      }
    }
    
    console.log('Creating product with data:', JSON.stringify(createData, null, 2))
    
    const producto = await prisma.producto.create({
      data: createData,
      include: {
        categoria: true,
        marca: true,
      }
    })
    
    return NextResponse.json(producto, { status: 201 })
  } catch (error) {
    console.error('Error al crear producto:', error)
    return NextResponse.json(
      { error: 'Error al crear producto' },
      { status: 500 }
    )
  }
} 