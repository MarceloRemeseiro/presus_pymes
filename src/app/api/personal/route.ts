import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/personal - Obtener todo el personal
export async function GET() {
  try {
    const personal = await prisma.personal.findMany({
      include: {
        puestos: {
          include: {
            puesto: true
          }
        },
        idiomas: {
          include: {
            idioma: true
          }
        }
      },
      orderBy: {
        nombre: 'asc',
      },
    })
    
    // Transformar los datos para una respuesta más limpia
    const personalFormateado = personal.map(p => ({
      id: p.id,
      nombre: p.nombre,
      telefono: p.telefono,
      email: p.email,
      ciudad: p.ciudad,
      notas: p.notas,
      puestos: p.puestos.map(pp => ({
        id: pp.puesto.id,
        nombre: pp.puesto.nombre,
        asignadoEn: pp.asignadoEn
      })),
      idiomas: p.idiomas.map(i => ({
        id: i.idioma.id,
        nombre: i.idioma.nombre,
        asignadoEn: i.asignadoEn
      })),
      createdAt: p.createdAt,
      updatedAt: p.updatedAt
    }))
    
    return NextResponse.json(personalFormateado)
  } catch (error) {
    console.error('Error al obtener personal:', error)
    return NextResponse.json(
      { error: 'Error al obtener personal' },
      { status: 500 }
    )
  }
}

// POST /api/personal - Crear una nueva persona
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
    
    // Crear la persona
    const persona = await prisma.personal.create({
      data: {
        nombre: body.nombre,
        telefono: body.telefono,
        email: body.email,
        ciudad: body.ciudad,
        notas: body.notas,
      }
    })
    
    // Si hay puestos a asignar, crear las relaciones
    if (body.puestos && Array.isArray(body.puestos) && body.puestos.length > 0) {
      await prisma.personalPuesto.createMany({
        data: body.puestos.map((puestoId: string) => ({
          personalId: persona.id,
          puestoId: puestoId
        }))
      })
    }
    
    // Si hay idiomas a asignar, crear las relaciones
    if (body.idiomas && Array.isArray(body.idiomas) && body.idiomas.length > 0) {
      await prisma.personalIdioma.createMany({
        data: body.idiomas.map((idiomaId: string) => ({
          personalId: persona.id,
          idiomaId: idiomaId
        }))
      })
    }
    
    // Volvemos a consultar para incluir los puestos e idiomas en la respuesta
    const personaConRelaciones = await prisma.personal.findUnique({
      where: { id: persona.id },
      include: {
        puestos: {
          include: {
            puesto: true
          }
        },
        idiomas: {
          include: {
            idioma: true
          }
        }
      }
    })
    
    return NextResponse.json(personaConRelaciones, { status: 201 })
  } catch (error) {
    console.error('Error al crear persona:', error)
    return NextResponse.json(
      { error: 'Error al crear persona' },
      { status: 500 }
    )
  }
} 