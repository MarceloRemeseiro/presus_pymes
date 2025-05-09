import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { parse } from 'csv-parse/sync';
import { z } from 'zod';

// Zod schema para validar cada fila del CSV
const CsvRowPersonalSchema = z.object({
  //id: z.string().optional(), // No importaremos ID, se generará o buscaremos por otros campos
  nombre: z.string().min(1, "El nombre del personal es requerido."),
  telefono: z.string().optional().nullable(),
  email: z.string().email("Email inválido").optional().nullable(),
  ciudad: z.string().optional().nullable(),
  notas: z.string().optional().nullable(),
  puestos: z.string().optional().nullable(), // Nombres de puestos separados por coma
  idiomas: z.string().optional().nullable(), // Nombres de idiomas separados por coma
});

// POST /api/personal/importar - Importar personal desde CSV
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No se proporcionó ningún archivo.' }, { status: 400 });
    }

    if (file.type !== 'text/csv') {
      return NextResponse.json({ error: 'Formato de archivo no válido. Solo se permiten archivos CSV.' }, { status: 400 });
    }

    const fileContent = await file.text();

    const records: any[] = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    if (!records.length) {
      return NextResponse.json({ error: 'El archivo CSV está vacío o no contiene datos válidos.' }, { status: 400 });
    }

    let personalCreado = 0;
    let personalActualizado = 0; // Para futura implementación de actualización
    let puestosAsignados = 0;
    let idiomasAsignados = 0;
    const erroresDetallados: { fila: number; mensaje: string; datos: any }[] = [];

    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      const filaActual = i + 2; // +1 por el header, +1 por el índice base 0

      try {
        const validatedData = CsvRowPersonalSchema.parse(record);

        // Buscar si el personal ya existe (ej. por email si es único, o nombre)
        // Por ahora, crearemos siempre, a menos que implementemos una lógica de "upsert" más compleja.
        // Si se implementa upsert, se necesitaría un identificador en el CSV.
        
        const personaTransaccion = await prisma.$transaction(async (tx) => {
          const nuevaPersona = await tx.personal.create({
            data: {
              nombre: validatedData.nombre,
              telefono: validatedData.telefono,
              email: validatedData.email,
              ciudad: validatedData.ciudad,
              notas: validatedData.notas,
            },
          });
          personalCreado++;

          // Procesar puestos
          if (validatedData.puestos) {
            const nombresPuestos = validatedData.puestos.split(',').map(p => p.trim()).filter(p => p.length > 0);
            
            for (const nombrePuesto of nombresPuestos) {
              let puesto = await tx.puesto.findUnique({
                where: { nombre: nombrePuesto },
              });

              if (!puesto) {
                puesto = await tx.puesto.create({
                  data: { nombre: nombrePuesto },
                });
              }

              // Asignar puesto a persona
              await tx.personalPuesto.create({
                data: {
                  personalId: nuevaPersona.id,
                  puestoId: puesto.id,
                },
              });
              puestosAsignados++;
            }
          }

          // Procesar idiomas
          if (validatedData.idiomas) {
            const nombresIdiomas = validatedData.idiomas.split(',').map(i => i.trim()).filter(i => i.length > 0);
            
            for (const nombreIdioma of nombresIdiomas) {
              let idioma = await tx.idioma.findUnique({
                where: { nombre: nombreIdioma },
              });

              if (!idioma) {
                idioma = await tx.idioma.create({
                  data: { nombre: nombreIdioma },
                });
              }

              // Asignar idioma a persona
              await tx.personalIdioma.create({
                data: {
                  personalId: nuevaPersona.id,
                  idiomaId: idioma.id,
                },
              });
              idiomasAsignados++;
            }
          }

          return nuevaPersona;
        });

      } catch (e: any) {
        const mensajeError =
          e instanceof z.ZodError
            ? e.errors.map((err) => `${err.path.join('.')}: ${err.message}`).join('; ')
            : e.message || 'Error desconocido al procesar la fila.';
        erroresDetallados.push({ fila: filaActual, mensaje: mensajeError, datos: record });
      }
    }

    const resumen = {
      personalCreado,
      personalActualizado,
      puestosAsignados,
      idiomasAsignados,
      filasProcesadas: records.length,
      errores: erroresDetallados.length,
      detallesErrores: erroresDetallados,
    };

    if (erroresDetallados.length > 0 && personalCreado === 0) {
      return NextResponse.json(
        { 
            message: 'La importación de personal falló completamente o no se procesaron datos válidos.', 
            summary: resumen 
        },
        { status: 400 }
      );
    } else if (erroresDetallados.length > 0) {
      return NextResponse.json(
        { 
            message: 'Importación de personal completada con algunos errores.', 
            summary: resumen 
        },
        { status: 207 } // Multi-Status
      );
    }

    return NextResponse.json(
      { message: 'Personal importado correctamente.', summary: resumen },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Error en el proceso de importación de personal:', error);
    if (error.name === 'CSVParseError') {
      return NextResponse.json({ error: 'Error al parsear el archivo CSV de personal. Verifique el formato.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Error interno del servidor al importar personal.' }, { status: 500 });
  }
} 