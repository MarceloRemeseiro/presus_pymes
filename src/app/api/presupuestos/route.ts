import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/presupuestos - Obtener todos los presupuestos
export async function GET() {
  try {
    const presupuestos = await prisma.presupuesto.findMany({
      include: {
        cliente: true,
        items: {
          include: {
            producto: true,
            partida: true,
          },
        },
      },
      orderBy: {
        fecha: 'desc',
      },
    })
    
    return NextResponse.json(presupuestos)
  } catch (error) {
    console.error('Error al obtener presupuestos:', error)
    return NextResponse.json(
      { error: 'Error al obtener presupuestos' },
      { status: 500 }
    )
  }
}

// POST /api/presupuestos - Crear un nuevo presupuesto
export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    console.log('Datos recibidos:', JSON.stringify(body, null, 2))
    
    // Validaciones mínimas
    if (!body.numero || !body.fecha || !body.fechaValidez) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios (número, fecha, fechaValidez)' },
        { status: 400 }
      )
    }
    
    // Verificar si ya existe un presupuesto con el mismo número
    const presupuestoExistente = await prisma.presupuesto.findUnique({
      where: { numero: body.numero }
    })
    
    if (presupuestoExistente) {
      return NextResponse.json(
        { error: 'Ya existe un presupuesto con este número' },
        { status: 400 }
      )
    }

    // Preparar los datos básicos del presupuesto
    const presupuestoData: any = {
      numero: body.numero,
      nombre: body.nombre || null,
      referencia: body.referencia || null,
      fecha: new Date(body.fecha),
      fechaValidez: new Date(body.fechaValidez),
      estado: body.estado || 'PENDIENTE',
      observaciones: body.observaciones || null,
      subtotal: body.subtotal || 0,
      iva: body.iva || 0,
      total: body.total || 0,
    }

    // Añadir el cliente solo si está presente
    if (body.clienteId) {
      presupuestoData.clienteId = body.clienteId
    }
    
    // Agregar fechas opcionales si están presentes
    if (body.fechaMontaje) {
      presupuestoData.fechaMontaje = new Date(body.fechaMontaje)
    }
    
    if (body.fechaInicio) {
      presupuestoData.fechaInicio = new Date(body.fechaInicio)
    }
    
    if (body.fechaFin) {
      presupuestoData.fechaFin = new Date(body.fechaFin)
    }
    
    // Manejar items si hay
    if (body.items && body.items.length > 0) {
      // Existente: Procesar items...
      console.log('Items recibidos:', body.items.length)
      
      // Si hay items en el body, mostrarlos detalladamente
      if (body.items.length > 0) {
        console.log('Detalles de los items:')
        body.items.forEach((item: any, index: number) => {
          console.log(`Item ${index+1}:`, JSON.stringify(item, null, 2))
        })
      } else {
        console.warn('⚠️ No se recibieron items en la solicitud')
      }
      
      // Calcular totales solo si hay items
      if (body.items.length > 0) {
        console.log(`Procesando ${body.items.length} items`)
        
        // Calculamos los totales
        const subtotal = body.items.reduce(
          (acc: number, item: any) => {
            const itemSubtotal = item.cantidad * item.precioUnitario * (1 - item.descuento / 100)
            return acc + itemSubtotal
          },
          0
        )
        
        const iva = body.items.reduce(
          (acc: number, item: any) => {
            const baseImponible = item.cantidad * item.precioUnitario * (1 - item.descuento / 100)
            return acc + (baseImponible * (item.iva / 100))
          },
          0
        )
        
        const total = subtotal + iva
        
        presupuestoData.subtotal = subtotal
        presupuestoData.iva = iva
        presupuestoData.total = total
        
        // Preparar los ítems si existen
        if (body.items.length > 0) {
          // Buscar o crear la categoría "Otros" para elementos temporales
          console.log('Buscando categoría "Otros"')
          let categoriaOtros = await prisma.categoria.findFirst({
            where: { nombre: "Otros" }
          });
          
          if (!categoriaOtros) {
            console.log('Creando categoría "Otros"')
            categoriaOtros = await prisma.categoria.create({
              data: { nombre: "Otros" }
            });
          }
          
          console.log('Categoría Otros:', categoriaOtros)
          
          // Primero, verificamos que todas las partidas existan
          const partidasIds = [...new Set(body.items
            .filter((item: any) => item.partidaId)
            .map((item: any) => item.partidaId))] as string[];
          
          console.log('Partidas IDs para verificar:', partidasIds);
          
          // Verificar las partidas existentes
          const partidasExistentes = await prisma.partidaPresupuesto.findMany({
            where: { 
              id: { 
                in: partidasIds.length > 0 ? partidasIds : ['0'] 
              } 
            },
          });
          
          console.log('Partidas encontradas:', partidasExistentes.length);
          
          // Mapeo de IDs de partidas por su ID
          const partidasPorId: Record<string, boolean> = {};
          partidasExistentes.forEach(partida => {
            partidasPorId[partida.id] = true;
          });
          
          // DIRECTAMENTE: construir los items para crear sin Promise.all
          // Esto evita problemas asíncronos
          const itemsToCreate = [];
          
          for (const item of body.items) {
            console.log(`Procesando item:`, JSON.stringify(item, null, 2));
            
            const precioTotal = item.cantidad * item.precioUnitario * (1 - item.descuento / 100);
            const ivaImporte = precioTotal * (item.iva / 100);
            
            let itemData: any = {
              cantidad: item.cantidad,
              precioUnitario: item.precioUnitario,
              descuento: item.descuento || 0,
              iva: item.iva,
              total: precioTotal + ivaImporte,
            };
            
            // Si tiene partidaId y la partida existe, relacionar con la partida
            if (item.partidaId && partidasPorId[item.partidaId]) {
              console.log(`Item con partidaId válido: ${item.partidaId}`);
              itemData.partidaId = item.partidaId;
            } else if (item.partidaId) {
              console.log(`Error: partidaId ${item.partidaId} no encontrado en la base de datos`);
            }
            
            // Si tiene productoId, usarlo
            if (item.productoId) {
              console.log(`Item con productoId: ${item.productoId}`);
              itemData.productoId = item.productoId;
            } else {
              // Si no tiene productoId, es un elemento temporal (categoría o separador)
              console.log(`Creando producto temporal para: ${item.nombre || 'sin nombre'}`);
              // Crear un producto temporal
              const productoTemporal = await prisma.producto.create({
                data: {
                  nombre: item.nombre || 'Producto temporal',
                  descripcion: item.descripcion || null,
                  precio: item.precioUnitario || 0,
                  precioAlquiler: item.precioUnitario || 0,
                  stock: 0,
                  categoriaId: categoriaOtros.id
                }
              });
              
              console.log('Producto temporal creado:', productoTemporal);
              itemData.productoId = productoTemporal.id;
            }
            
            console.log('ItemData final:', itemData);
            itemsToCreate.push(itemData);
          }
          
          console.log(`${itemsToCreate.length} items listos para crear`);
          presupuestoData.items = {
            create: itemsToCreate
          };
        }
      }
    }
    
    // Crear el presupuesto
    console.log('Creando presupuesto con datos:', JSON.stringify(presupuestoData, null, 2))
    const presupuesto = await prisma.presupuesto.create({
      data: presupuestoData,
      include: {
        cliente: true,
        items: {
          include: {
            producto: true,
            partida: true,
          },
        },
      },
    })
    
    console.log('Presupuesto creado correctamente:', presupuesto.id)
    return NextResponse.json(presupuesto, { status: 201 })
  } catch (error) {
    console.error('Error al crear presupuesto:', error)
    return NextResponse.json(
      { error: 'Error al crear presupuesto' },
      { status: 500 }
    )
  }
} 