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
      notas: p.notas,
      puestos: p.puestos.map(pp => ({
        id: pp.puesto.id,
        nombre: pp.puesto.nombre,
        asignadoEn: pp.asignadoEn
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
        notas: body.notas,
      }
    })
    
    // Si hay puestos a asignar, crear las relaciones
    if (body.puestos && Array.isArray(body.puestos) && body.puestos.length > 0) {
      // Crear todas las relaciones de una vez
      await prisma.personalPuesto.createMany({
        data: body.puestos.map((puestoId: string) => ({
          personalId: persona.id,
          puestoId: puestoId
        }))
      })
      
      // Volvemos a consultar para incluir los puestos en la respuesta
      const personaConPuestos = await prisma.personal.findUnique({
        where: { id: persona.id },
        include: {
          puestos: {
            include: {
              puesto: true
            }
          }
        }
      })
      
      return NextResponse.json(personaConPuestos, { status: 201 })
    }
    
    return NextResponse.json(persona, { status: 201 })
  } catch (error) {
    console.error('Error al crear persona:', error)
    return NextResponse.json(
      { error: 'Error al crear persona' },
      { status: 500 }
    )
  }
} 