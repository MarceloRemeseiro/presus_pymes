import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { Readable } from 'stream';
import { parse } from 'csv-parse';
import { z } from 'zod';

// Zod schema para validar cada fila del CSV
const CsvRowSchema = z.object({
  producto_id: z.string().optional(), // Opcional, ya que podemos identificar/crear productos por nombre/modelo
  producto_nombre: z.string().min(1, "El nombre del producto es requerido."),
  producto_marca_nombre: z.string().optional(),
  producto_modelo: z.string().optional(),
  producto_categoria_nombre: z.string().min(1, "La categoría del producto es requerida."),
  producto_descripcion: z.string().optional(),
  producto_precio_venta: z.preprocess(val => parseFloat(String(val)), z.number().nonnegative("El precio de venta debe ser un número positivo.").optional().default(0)),
  producto_precio_compra: z.preprocess(val => val ? parseFloat(String(val)) : undefined, z.number().nonnegative("El precio de compra debe ser un número positivo.").optional()),
  producto_precio_alquiler: z.preprocess(val => val ? parseFloat(String(val)) : undefined, z.number().nonnegative("El precio de alquiler debe ser un número positivo.").optional()),
  equipo_item_id: z.string().optional(), // Opcional, principalmente para referencia interna del CSV
  equipo_item_numero_serie: z.string().optional(),
  equipo_item_estado: z.string().optional().default('DISPONIBLE'), // Asumir DISPONIBLE si no se especifica
  equipo_item_fecha_compra: z.preprocess(val => val ? new Date(String(val)) : undefined, z.date().optional()),
  equipo_item_precio_compra_individual: z.preprocess(val => val ? parseFloat(String(val)) : undefined, z.number().nonnegative("El precio de compra individual debe ser un número positivo.").optional()),
  equipo_item_proveedor_nombre: z.string().optional(),
  equipo_item_notas_internas: z.string().optional(),
});

async function streamToBuffer(readableStream: Readable): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of readableStream) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ message: 'No se proporcionó ningún archivo.' }, { status: 400 });
    }

    if (file.type !== 'text/csv') {
      return NextResponse.json({ message: 'El archivo debe ser de tipo CSV.' }, { status: 400 });
    }

    const fileBuffer = await streamToBuffer(file.stream() as unknown as Readable);
    
    const records: any[] = [];
    const parser = parse(fileBuffer, {
      columns: true, // Tratar la primera fila como encabezados
      skip_empty_lines: true,
      trim: true,
    });

    parser.on('readable', () => {
      let record;
      while ((record = parser.read()) !== null) {
        records.push(record);
      }
    });

    await new Promise<void>((resolve, reject) => {
      parser.on('end', resolve);
      parser.on('error', reject);
    });

    if (records.length === 0) {
      return NextResponse.json({ message: 'El archivo CSV está vacío o no tiene un formato válido.' }, { status: 400 });
    }

    let productosCreados = 0;
    let productosActualizados = 0;
    let itemsCreados = 0;
    let itemsActualizados = 0; // Podríamos implementar actualización de items si es necesario
    const errores: string[] = [];

    for (let i = 0; i < records.length; i++) {
      const row = records[i];
      try {
        const validatedData = CsvRowSchema.parse(row);
        
        // 1. Obtener o crear Categoría
        let categoria = await prisma.categoria.findUnique({
          where: { nombre: validatedData.producto_categoria_nombre },
        });
        if (!categoria) {
          categoria = await prisma.categoria.create({
            data: { nombre: validatedData.producto_categoria_nombre },
          });
        }

        // 2. Obtener o crear Marca (si se proporciona)
        let marca = null;
        if (validatedData.producto_marca_nombre) {
          marca = await prisma.marca.findUnique({
            where: { nombre: validatedData.producto_marca_nombre },
          });
          if (!marca) {
            marca = await prisma.marca.create({
              data: { nombre: validatedData.producto_marca_nombre },
            });
          }
        }

        // 3. Obtener o crear Proveedor (si se proporciona para el item)
        let proveedor = null;
        if (validatedData.equipo_item_proveedor_nombre) {
          proveedor = await prisma.proveedor.findFirst({
            where: { nombre: validatedData.equipo_item_proveedor_nombre },
          });
          if (!proveedor) {
            proveedor = await prisma.proveedor.create({
              data: { nombre: validatedData.equipo_item_proveedor_nombre }, // Añadir más campos si es necesario/posible desde CSV
            });
          }
        }

        // 4. Upsert Producto (crear o actualizar si ya existe por nombre y modelo)
        // Para una verdadera "actualización", necesitaríamos un identificador único en el CSV para el producto.
        // Por ahora, si encontramos uno con el mismo nombre, lo actualizamos. Si no, lo creamos.
        // Una mejor aproximación sería usar producto_id del CSV si se provee, y si no, buscar por nombre/modelo.
        let producto;
        const existingProducto = await prisma.producto.findFirst({
            where: {
                nombre: validatedData.producto_nombre,
                // Opcionalmente, añadir más criterios como marcaId y modelo si son fiables
                // marcaId: marca?.id,
                // modelo: validatedData.producto_modelo,
            }
        });

        const productoData = {
            nombre: validatedData.producto_nombre,
            descripcion: validatedData.producto_descripcion,
            precio: validatedData.producto_precio_venta,
            precioCompra: validatedData.producto_precio_compra,
            precioAlquiler: validatedData.producto_precio_alquiler,
            modelo: validatedData.producto_modelo,
            categoriaId: categoria.id,
            marcaId: marca?.id,
            // stock se manejará al crear/eliminar EquipoItems
        };

        if (existingProducto) {
            producto = await prisma.producto.update({
                where: { id: existingProducto.id },
                data: productoData,
            });
            productosActualizados++;
        } else {
            producto = await prisma.producto.create({
                data: productoData,
            });
            productosCreados++;
        }

        // 5. Crear EquipoItem si se proporcionan detalles para él
        // Solo creamos EquipoItem si hay un numero_serie, ya que es un buen indicador
        if (validatedData.equipo_item_numero_serie) {
          const existingEquipoItem = await prisma.equipoItem.findUnique({
            where: {
              productoId_numeroSerie: {
                productoId: producto.id,
                numeroSerie: validatedData.equipo_item_numero_serie,
              },
            },
          });

          if (!existingEquipoItem) {
            await prisma.$transaction(async (tx) => {
              await tx.equipoItem.create({
                data: {
                  productoId: producto.id,
                  numeroSerie: validatedData.equipo_item_numero_serie,
                  estado: validatedData.equipo_item_estado as any, // Zod ya valida los valores posibles si se definiera un enum
                  fechaCompra: validatedData.equipo_item_fecha_compra,
                  precioCompra: validatedData.equipo_item_precio_compra_individual,
                  proveedorId: proveedor?.id,
                  notasInternas: validatedData.equipo_item_notas_internas,
                },
              });
              // Incrementar stock del producto
              await tx.producto.update({
                where: { id: producto.id },
                data: { stock: { increment: 1 } },
              });
            });
            itemsCreados++;
          } else {
            // Lógica opcional para actualizar EquipoItem si ya existe
            // itemsActualizados++;
            // Por ahora, si ya existe un item con ese productoId y numeroSerie, lo ignoramos.
          }
        }

      } catch (e: any) {
        console.error(`Error procesando fila ${i + 1}:`, row, e);
        const errorMessage = e instanceof z.ZodError 
          ? e.errors.map(err => `${err.path.join('.')}: ${err.message}`).join('; ') 
          : (e.message || 'Error desconocido');
        errores.push(`Fila ${i + 2}: ${errorMessage}`); // +2 porque la fila 1 es header y el índice es base 0
      }
    }

    const resumen = {
      productosCreados,
      productosActualizados,
      itemsCreados,
      // itemsActualizados,
      totalFilasProcesadas: records.length,
      errores,
    };

    if (errores.length > 0 && (productosCreados + productosActualizados + itemsCreados === 0)) {
        return NextResponse.json(
            { 
                message: 'La importación falló completamente o no se procesaron datos válidos.', 
                summary: resumen 
            },
            { status: 400 }
        );
    } else if (errores.length > 0) {
        return NextResponse.json(
            { 
                message: 'Importación completada con algunos errores.', 
                summary: resumen 
            },
            { status: 207 } // Multi-Status
        );
    }

    return NextResponse.json(
      { message: 'Inventario importado correctamente.', summary: resumen },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Error en el proceso de importación:', error);
    return NextResponse.json(
      { message: error.message || 'Error interno del servidor al importar el inventario.' },
      { status: 500 }
    );
  }
} 