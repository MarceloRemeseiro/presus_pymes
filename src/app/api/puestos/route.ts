import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/puestos - Obtener todos los puestos
export async function GET() {
  try {
    const puestos = await prisma.puesto.findMany({
      orderBy: {
        nombre: 'asc',
      },
    })
    
    return NextResponse.json(puestos)
  } catch (error) {
    console.error('Error al obtener puestos:', error)
    return NextResponse.json(
      { error: 'Error al obtener puestos' },
      { status: 500 }
    )
  }
}

// POST /api/puestos - Crear un nuevo puesto
export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Verificación básica
    if (!body.nombre) {
      return NextResponse.json(
        { error: 'El nombre es obligatorio' },
        { status: 400 }
      )
    }
    
    // Verificar si ya existe un puesto con el mismo nombre
    const puestoExistente = await prisma.puesto.findFirst({
      where: {
        nombre: body.nombre
      }
    })
    
    if (puestoExistente) {
      return NextResponse.json(
        { error: 'Ya existe un puesto con este nombre' },
        { status: 400 }
      )
    }
    
    // Crear el puesto
    const puesto = await prisma.puesto.create({
      data: {
        nombre: body.nombre,
        descripcion: body.descripcion,
        tarifa: body.tarifa ? parseFloat(body.tarifa) : null,
      }
    })
    
    return NextResponse.json(puesto, { status: 201 })
  } catch (error) {
    console.error('Error al crear puesto:', error)
    return NextResponse.json(
      { error: 'Error al crear puesto' },
      { status: 500 }
    )
  }
} 