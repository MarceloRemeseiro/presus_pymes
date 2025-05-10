import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/configuracion - Obtener la configuración del sistema
export async function GET() {
  try {
    // Buscamos la configuración existente (debería haber solo un registro)
    let configuracion = await prisma.configuracion.findFirst()
    
    // Si no existe, creamos una configuración por defecto
    if (!configuracion) {
      configuracion = await prisma.configuracion.create({
        data: {
          ivaPorDefecto: 21,
          moneda: "EUR",
          prefijoFactura: "FAC-",
          prefijoPresupuesto: "PRES-",
          colorFactura: "#3c4e66",
          colorPresupuesto: "#150a4a",
        }
      })
    }
    
    return NextResponse.json(configuracion)
  } catch (error) {
    console.error('Error al obtener configuración:', error)
    return NextResponse.json(
      { error: 'Error al obtener la configuración' },
      { status: 500 }
    )
  }
}

// PUT /api/configuracion - Actualizar la configuración del sistema
export async function PUT(req: Request) {
  try {
    const body = await req.json()
    
    // Buscamos la configuración existente
    let configuracion = await prisma.configuracion.findFirst()
    
    if (configuracion) {
      // Si existe, actualizamos los valores
      configuracion = await prisma.configuracion.update({
        where: { id: configuracion.id },
        data: {
          ivaPorDefecto: body.ivaPorDefecto !== undefined ? parseFloat(body.ivaPorDefecto) : configuracion.ivaPorDefecto,
          moneda: body.moneda || configuracion.moneda,
          prefijoFactura: body.prefijoFactura || configuracion.prefijoFactura,
          prefijoPresupuesto: body.prefijoPresupuesto || configuracion.prefijoPresupuesto,
          colorFactura: body.colorFactura || configuracion.colorFactura,
          colorPresupuesto: body.colorPresupuesto || configuracion.colorPresupuesto,
          condicionesPresupuesto: body.condicionesPresupuesto || configuracion.condicionesPresupuesto,
          condicionesFactura: body.condicionesFactura || configuracion.condicionesFactura,
        }
      })
    } else {
      // Si no existe, creamos un nuevo registro
      configuracion = await prisma.configuracion.create({
        data: {
          ivaPorDefecto: body.ivaPorDefecto !== undefined ? parseFloat(body.ivaPorDefecto) : 21,
          moneda: body.moneda || "EUR",
          prefijoFactura: body.prefijoFactura || "FAC-",
          prefijoPresupuesto: body.prefijoPresupuesto || "PRES-",
          colorFactura: body.colorFactura || "#3c4e66",
          colorPresupuesto: body.colorPresupuesto || "#150a4a",
          condicionesPresupuesto: body.condicionesPresupuesto || [],
          condicionesFactura: body.condicionesFactura || [],
        }
      })
    }
    
    return NextResponse.json(configuracion)
  } catch (error) {
    console.error('Error al actualizar configuración:', error)
    return NextResponse.json(
      { error: 'Error al actualizar la configuración' },
      { status: 500 }
    )
  }
} 