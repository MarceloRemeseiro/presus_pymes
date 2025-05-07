import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/gastos - Obtener todos los gastos
export async function GET() {
  try {
    const gastos = await prisma.facturaProveedor.findMany({
      include: {
        proveedor: {
          select: {
            id: true,
            nombre: true,
          },
        },
        factura: {
          select: {
            id: true,
            numero: true,
            nombre: true,
            estado: true,
            fecha: true,
          },
        },
        partida: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
      orderBy: [
        { documentoFecha: 'desc' },
        { createdAt: 'desc' },
      ],
    })

    return NextResponse.json(gastos)
  } catch (error) {
    console.error('Error al obtener los gastos:', error)
    return NextResponse.json(
      { error: 'Error al obtener los gastos' },
      { status: 500 }
    )
  }
}

// POST /api/gastos - Crear un nuevo gasto
export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Si hay fecha en string, convertirla a Date
    if (data.documentoFecha && typeof data.documentoFecha === 'string') {
      data.documentoFecha = new Date(data.documentoFecha)
    }

    // SOLUCIÓN TEMPORAL: Si no hay facturaId, asignar uno predeterminado
    // En el futuro, debería modificarse el schema para hacer facturaId opcional
    if (!data.facturaId) {
      // Buscar si existe la factura "GASTOS-INDEPENDIENTES"
      // NOTA: Esta es una factura especial interna que NO debe mostrarse en la lista de facturas normales
      // Se filtra en la API de facturas para excluirla de los resultados
      let facturaIndependiente = await prisma.factura.findFirst({
        where: { numero: "GASTOS-INDEPENDIENTES" }
      });
      
      // Si no existe, crearla
      if (!facturaIndependiente) {
        // Buscar un cliente de sistema para asignar a la factura (o crear uno)
        // NOTA: Todas las facturas asociadas a este cliente son internas y no deben mostrarse
        let clienteSistema = await prisma.cliente.findFirst({
          where: { nombre: "SISTEMA" }
        });
        
        if (!clienteSistema) {
          clienteSistema = await prisma.cliente.create({
            data: {
              nombre: "SISTEMA",
              email: "sistema@localhost",
            }
          });
        }
        
        // Crear factura para gastos independientes (no visible en la lista de facturas)
        facturaIndependiente = await prisma.factura.create({
          data: {
            numero: "GASTOS-INDEPENDIENTES",
            nombre: "Gastos Independientes (Sistema)",
            fecha: new Date(),
            fechaVencimiento: new Date(),
            clienteId: clienteSistema.id,
            estado: "PENDIENTE",
            subtotal: 0,
            iva: 0,
            total: 0
          }
        });
      }
      
      // Asignar la factura independiente a este gasto
      data.facturaId = facturaIndependiente.id;
      console.log("Asignando factura independiente:", facturaIndependiente.id);
    }

    const gasto = await prisma.facturaProveedor.create({
      data,
      include: {
        proveedor: true,
        factura: true,
        partida: true,
      },
    })

    return NextResponse.json(gasto)
  } catch (error) {
    console.error('Error al crear el gasto:', error)
    return NextResponse.json(
      { error: 'Error al crear el gasto' },
      { status: 500 }
    )
  }
} 