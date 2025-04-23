import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/proveedores/[id] - Obtener un proveedor específico
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { searchParams } = new URL(req.url)
  const equiposParam = searchParams.get('equipos')
  
  try {
    // Verificar si el proveedor existe
    const proveedor = await prisma.proveedor.findUnique({
      where: { id },
    })
    
    if (!proveedor) {
      return NextResponse.json(
        { error: "Proveedor no encontrado" },
        { status: 404 }
      )
    }

    // Si se solicitan los equipos relacionados
    if (equiposParam === "true") {
      // Obtener los equipos relacionados con este proveedor
      const equipos = await prisma.equipoItem.findMany({
        where: { proveedorId: id },
        include: {
          producto: {
            include: {
              categoria: true,
              marca: true,
            }
          }
        },
        orderBy: { fechaCompra: 'desc' }
      })
      
      // Calcular el total gastado
      const totalGastado = equipos.reduce((sum, item) => {
        return sum + (item.precioCompra || 0)
      }, 0)
      
      return NextResponse.json({ equipos, totalGastado })
    }
    
    // Si solo se solicita la información del proveedor
    return NextResponse.json(proveedor)
  } catch (error) {
    console.error("Error al obtener proveedor:", error)
    return NextResponse.json(
      { error: "Error al obtener los datos del proveedor" },
      { status: 500 }
    )
  }
}

// PUT /api/proveedores/[id] - Actualizar un proveedor
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const body = await req.json()
    
    // Verificar que el proveedor existe
    const proveedorExistente = await prisma.proveedor.findUnique({
      where: {
        id: resolvedParams.id,
      },
    })
    
    if (!proveedorExistente) {
      return NextResponse.json(
        { error: 'Proveedor no encontrado' },
        { status: 404 }
      )
    }
    
    // Verificar si se está intentando cambiar el NIF a uno que ya existe
    if (body.nif && body.nif !== proveedorExistente.nif) {
      const existeNif = await prisma.proveedor.findFirst({
        where: {
          nif: body.nif,
          id: { not: resolvedParams.id },
        },
      })
      
      if (existeNif) {
        return NextResponse.json(
          { error: 'Ya existe otro proveedor con ese NIF' },
          { status: 400 }
        )
      }
    }

    // Actualizar el proveedor
    const proveedorActualizado = await prisma.proveedor.update({
      where: {
        id: resolvedParams.id,
      },
      data: {
        nombre: body.nombre,
        nif: body.nif,
        direccion: body.direccion,
        email: body.email,
        telefono: body.telefono,
        contacto: body.contacto,
        notas: body.notas,
      },
    })

    return NextResponse.json(proveedorActualizado)
  } catch (error) {
    console.error('Error al actualizar proveedor:', error)
    return NextResponse.json(
      { error: 'Error al actualizar proveedor' },
      { status: 500 }
    )
  }
}

// DELETE /api/proveedores/[id] - Eliminar un proveedor
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    
    // Verificar que el proveedor existe
    const proveedorExistente = await prisma.proveedor.findUnique({
      where: {
        id: resolvedParams.id,
      },
    })
    
    if (!proveedorExistente) {
      return NextResponse.json(
        { error: 'Proveedor no encontrado' },
        { status: 404 }
      )
    }
    
    // Eliminar el proveedor
    await prisma.proveedor.delete({
      where: {
        id: resolvedParams.id,
      },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error al eliminar proveedor:', error)
    
    // Verificar si el error es por registros relacionados
    if (error instanceof Error && error.message.includes('foreign key constraint')) {
      return NextResponse.json(
        { error: 'No se puede eliminar el proveedor porque tiene registros relacionados' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Error al eliminar proveedor' },
      { status: 500 }
    )
  }
} 