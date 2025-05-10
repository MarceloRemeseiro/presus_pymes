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
    const body = await request.json()

    // Convertir fecha si es string
    if (body.documentoFecha && typeof body.documentoFecha === 'string') {
      body.documentoFecha = new Date(body.documentoFecha)
    }

    // Obtener configuración de IVA por defecto
    const configuracion = await prisma.configuracion.findFirst();
    const ivaPorDefecto = configuracion?.ivaPorDefecto || 21; // Usar 21 si no hay configuración

    let { 
      precio, 
      precioConIVA, 
      esFactura, 
      // Extraer los campos que no deben ir directamente al 'data' de create
      facturaId: bodyFacturaId, 
      ...restOfBody 
    } = body;

    let datosIva = {};

    if (esFactura) {
      const porcentajeIvaAplicado = ivaPorDefecto; // Podríamos añadir un campo para porcentajeIva en el request si queremos que sea variable
      let baseImponibleCalc: number;
      let ivaDesglosadoCalc: number;

      if (precioConIVA) {
        // El precio YA incluye IVA
        baseImponibleCalc = precio / (1 + (porcentajeIvaAplicado / 100));
        ivaDesglosadoCalc = precio - baseImponibleCalc;
      } else {
        // El precio NO incluye IVA (es la base imponible)
        baseImponibleCalc = precio;
        ivaDesglosadoCalc = precio * (porcentajeIvaAplicado / 100);
      }
      
      datosIva = {
        baseImponible: parseFloat(baseImponibleCalc.toFixed(2)),
        ivaDesglosado: parseFloat(ivaDesglosadoCalc.toFixed(2)),
        porcentajeIva: porcentajeIvaAplicado,
      };
    }

    // Manejo de facturaId (lógica existente)
    let facturaIdFinal = bodyFacturaId;
    if (!facturaIdFinal) {
      let facturaIndependiente = await prisma.factura.findFirst({
        where: { numero: "GASTOS-INDEPENDIENTES" }
      });
      
      if (!facturaIndependiente) {
        let clienteSistema = await prisma.cliente.findFirst({
          where: { nombre: "SISTEMA" }
        });
        
        if (!clienteSistema) {
          clienteSistema = await prisma.cliente.create({
            data: {
              nombre: "SISTEMA",
              email: "sistema@localhost", // Añadido email para el cliente
            }
          });
        }
        
        facturaIndependiente = await prisma.factura.create({
          data: {
            numero: "GASTOS-INDEPENDIENTES",
            nombre: "Gastos Generales",
            fecha: new Date(),
            fechaVencimiento: new Date(),
            clienteId: clienteSistema.id,
            estado: "PENDIENTE", // Usar el tipo Enum directamente
            subtotal: 0,
            iva: 0,
            total: 0
          }
        });
      }
      facturaIdFinal = facturaIndependiente.id;
    }

    const dataParaCrear = {
      ...restOfBody,
      precio, // Se guarda el precio original tal como se introdujo
      precioConIVA,
      esFactura,
      ...datosIva, // Añadimos los campos de IVA calculados
      facturaId: facturaIdFinal, // Aseguramos que facturaId se incluye
    };

    const gasto = await prisma.facturaProveedor.create({
      data: dataParaCrear,
      include: {
        proveedor: true,
        factura: true,
        partida: true,
      },
    })

    return NextResponse.json(gasto)
  } catch (error) {
    console.error('Error al crear el gasto:', error)
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido al crear el gasto';
    return NextResponse.json(
      { error: 'Error al crear el gasto', details: errorMessage },
      { status: 500 }
    )
  }
} 