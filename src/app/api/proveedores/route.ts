import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/proveedores - Obtener todos los proveedores
export async function GET() {
  try {
    const proveedores = await prisma.proveedor.findMany({
      orderBy: {
        nombre: 'asc',
      },
    })

    return NextResponse.json(proveedores)
  } catch (error) {
    console.error('Error al obtener proveedores:', error)
    return NextResponse.json(
      { error: 'Error al obtener proveedores' },
      { status: 500 }
    )
  }
}

// POST /api/proveedores - Crear un nuevo proveedor
export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Validación básica
    if (!body.nombre) {
      return NextResponse.json(
        { error: 'El nombre es obligatorio' },
        { status: 400 }
      )
    }
    
    // Verificar si ya existe un proveedor con el mismo NIF
    if (body.nif) {
      const existente = await prisma.proveedor.findFirst({
        where: {
          nif: body.nif,
        },
      })
      
      if (existente) {
        return NextResponse.json(
          { error: 'Ya existe un proveedor con ese NIF' },
          { status: 400 }
        )
      }
    }
    
    // Crear el proveedor
    const proveedor = await prisma.proveedor.create({
      data: {
        nombre: body.nombre,
        nif: body.nif || null,
        direccion: body.direccion || null,
        email: body.email || null,
        telefono: body.telefono || null,
        contacto: body.contacto || null,
        notas: body.notas || null,
      },
    })
    
    return NextResponse.json(proveedor, { status: 201 })
  } catch (error) {
    console.error('Error al crear proveedor:', error)
    return NextResponse.json(
      { error: 'Error al crear proveedor' },
      { status: 500 }
    )
  }
} 