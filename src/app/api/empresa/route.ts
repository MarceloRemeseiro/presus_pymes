import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/empresa - Obtener la información de la empresa
export async function GET() {
  try {
    // Buscamos la empresa existente (debería haber solo un registro)
    let empresa = await prisma.empresa.findFirst()
    
    // Si no existe, creamos una empresa por defecto
    if (!empresa) {
      empresa = await prisma.empresa.create({
        data: {
          nombre: "Presus Pymes S.L.",
          cif: "B12345678",
          direccion: "Calle Ejemplo, 123",
          email: "contacto@presuspymes.com",
          telefono: "+34 912 345 678",
          cuentaBancaria: null,
        }
      })
    }
    
    return NextResponse.json(empresa)
  } catch (error) {
    console.error('Error al obtener información de empresa:', error)
    return NextResponse.json(
      { error: 'Error al obtener la información de la empresa' },
      { status: 500 }
    )
  }
}

// PUT /api/empresa - Actualizar la información de la empresa
export async function PUT(req: Request) {
  try {
    const body = await req.json()
    
    // Buscamos la empresa existente
    let empresa = await prisma.empresa.findFirst()
    
    if (empresa) {
      // Si existe, actualizamos los valores
      empresa = await prisma.empresa.update({
        where: { id: empresa.id },
        data: {
          nombre: body.nombre || empresa.nombre,
          cif: body.cif || empresa.cif,
          direccion: body.direccion || empresa.direccion,
          email: body.email || empresa.email,
          telefono: body.telefono || empresa.telefono,
          logoUrl: body.logoUrl || empresa.logoUrl,
          cuentaBancaria: body.cuentaBancaria !== undefined ? body.cuentaBancaria : empresa.cuentaBancaria,
        }
      })
    } else {
      // Si no existe, creamos un nuevo registro
      empresa = await prisma.empresa.create({
        data: {
          nombre: body.nombre || "Presus Pymes S.L.",
          cif: body.cif || "B12345678",
          direccion: body.direccion || "Calle Ejemplo, 123",
          email: body.email || "contacto@presuspymes.com",
          telefono: body.telefono || "+34 912 345 678",
          logoUrl: body.logoUrl,
          cuentaBancaria: body.cuentaBancaria || null,
        }
      })
    }
    
    return NextResponse.json(empresa)
  } catch (error) {
    console.error('Error al actualizar información de empresa:', error)
    return NextResponse.json(
      { error: 'Error al actualizar la información de la empresa' },
      { status: 500 }
    )
  }
} 