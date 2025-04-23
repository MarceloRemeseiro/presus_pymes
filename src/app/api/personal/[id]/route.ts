import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/personal/[id] - Obtener una persona específica
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const persona = await prisma.personal.findUnique({
      where: { id },
      include: {
        puestos: {
          include: {
            puesto: true
          }
        }
      }
    })
    
    if (!persona) {
      return NextResponse.json(
        { error: 'Persona no encontrada' },
        { status: 404 }
      )
    }
    
    // Formatear datos para la respuesta
    const personaFormateada = {
      ...persona,
      puestos: persona.puestos.map(p => ({
        id: p.puesto.id,
        nombre: p.puesto.nombre,
        asignadoEn: p.asignadoEn
      }))
    }
    
    return NextResponse.json(personaFormateada)
  } catch (error) {
    console.error('Error al obtener persona:', error)
    return NextResponse.json(
      { error: 'Error al obtener persona' },
      { status: 500 }
    )
  }
}

// PUT /api/personal/[id] - Actualizar una persona
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    
    // Verificar si la persona existe
    const personaExistente = await prisma.personal.findUnique({
      where: { id }
    })
    
    if (!personaExistente) {
      return NextResponse.json(
        { error: 'Persona no encontrada' },
        { status: 404 }
      )
    }
    
    // Actualizar datos básicos
    const personaActualizada = await prisma.personal.update({
      where: { id },
      data: {
        nombre: body.nombre,
        telefono: body.telefono,
        email: body.email,
        notas: body.notas
      }
    })
    
    // Si se están actualizando los puestos
    if (body.puestos && Array.isArray(body.puestos)) {
      // Eliminar todas las asignaciones actuales
      await prisma.personalPuesto.deleteMany({
        where: { personalId: id }
      })
      
      // Crear las nuevas asignaciones
      if (body.puestos.length > 0) {
        await prisma.personalPuesto.createMany({
          data: body.puestos.map((puestoId: string) => ({
            personalId: id,
            puestoId: puestoId
          }))
        })
      }
      
      // Obtener datos actualizados con los puestos
      const personaConPuestos = await prisma.personal.findUnique({
        where: { id },
        include: {
          puestos: {
            include: {
              puesto: true
            }
          }
        }
      })
      
      return NextResponse.json(personaConPuestos)
    }
    
    return NextResponse.json(personaActualizada)
  } catch (error) {
    console.error('Error al actualizar persona:', error)
    return NextResponse.json(
      { error: 'Error al actualizar persona' },
      { status: 500 }
    )
  }
}

// DELETE /api/personal/[id] - Eliminar una persona
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Verificar si la persona existe
    const personaExistente = await prisma.personal.findUnique({
      where: { id }
    })
    
    if (!personaExistente) {
      return NextResponse.json(
        { error: 'Persona no encontrada' },
        { status: 404 }
      )
    }
    
    // Las relaciones PersonalPuesto se eliminarán automáticamente debido al onDelete: Cascade
    
    // Eliminar la persona
    await prisma.personal.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error al eliminar persona:', error)
    return NextResponse.json(
      { error: 'Error al eliminar persona' },
      { status: 500 }
    )
  }
} 