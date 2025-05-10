import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import path from 'path'

// GET /api/gastos/[id] - Obtener un gasto específico
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
  const id = resolvedParams.id
  
  try {
    const gasto = await prisma.facturaProveedor.findUnique({
      where: { id },
      include: {
        proveedor: true,
        factura: {
          select: {
            id: true,
            numero: true,
            nombre: true,
            estado: true,
            fecha: true,
          }
        },
        partida: true,
      },
    })
    
    if (!gasto) {
      return NextResponse.json(
        { error: 'Gasto no encontrado' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(gasto)
  } catch (error) {
    console.error('Error al obtener el gasto:', error)
    return NextResponse.json(
      { error: 'Error al obtener el gasto' },
      { status: 500 }
    )
  }
}

// Función auxiliar para eliminar un archivo
async function deleteFile(fileUrl: string) {
  try {
    console.log("Intentando eliminar archivo:", fileUrl);
    
    // Extraer el nombre del archivo de la ruta
    const fileName = fileUrl.split('/').pop();
    if (!fileName) {
      console.error("Nombre de archivo inválido:", fileUrl);
      return false;
    }
    
    // Importar las funciones necesarias
    const { unlink, access } = await import('fs/promises');
    
    // Construir la ruta absoluta al archivo
    const rootDir = process.cwd();
    const filePath = path.join(rootDir, 'public', 'uploads', fileName);
    console.log("Ruta absoluta del archivo a eliminar:", filePath);
    
    // Verificar si el archivo existe
    try {
      await access(filePath);
      // Si llegamos aquí, el archivo existe, intentamos eliminarlo
      await unlink(filePath);
      console.log("Archivo eliminado correctamente:", filePath);
      return true;
    } catch (accessError) {
      console.error("El archivo no existe o no se puede acceder a él:", filePath);
      return false;
    }
  } catch (error) {
    console.error("Error al eliminar archivo:", error);
    return false;
  }
}

// PUT /api/gastos/[id] - Actualizar un gasto
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
  const id = resolvedParams.id
  
  try {
    const gastoActual = await prisma.facturaProveedor.findUnique({
      where: { id },
      select: { archivoUrl: true }
    });
    
    if (!gastoActual) {
      return NextResponse.json(
        { error: 'Gasto no encontrado para actualizar' },
        { status: 404 }
      );
    }
    
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
      // facturaId no se debería modificar directamente en la actualización de un gasto individual,
      // se maneja a través de la asignación a una factura general si es necesario.
      // Si se necesita cambiar la factura asociada, se haría con otra lógica.
      ...restOfBody 
    } = body;

    let datosIva = {};
    let dataFinal = { ...restOfBody, precio, precioConIVA, esFactura }; // Incluimos los campos base por defecto

    if (esFactura !== undefined) { // Solo recalculamos si esFactura se envía en el body
      if (esFactura) {
        const porcentajeIvaAplicado = ivaPorDefecto;
        let baseImponibleCalc: number;
        let ivaDesglosadoCalc: number;

        if (precioConIVA) {
          baseImponibleCalc = precio / (1 + (porcentajeIvaAplicado / 100));
          ivaDesglosadoCalc = precio - baseImponibleCalc;
        } else {
          baseImponibleCalc = precio;
          ivaDesglosadoCalc = precio * (porcentajeIvaAplicado / 100);
        }
        
        datosIva = {
          baseImponible: parseFloat(baseImponibleCalc.toFixed(2)),
          ivaDesglosado: parseFloat(ivaDesglosadoCalc.toFixed(2)),
          porcentajeIva: porcentajeIvaAplicado,
        };
      } else {
        // Si no es factura, los campos de IVA se ponen a null o 0
        datosIva = {
          baseImponible: null,
          ivaDesglosado: null,
          porcentajeIva: null,
        };
      }
      dataFinal = { ...dataFinal, ...datosIva };
    } else {
      // Si esFactura no viene en el body, no modificamos los campos de IVA existentes.
      // Esto permite actualizaciones parciales sin afectar el IVA si no se cambia esFactura.
      // Para borrar los campos de IVA, esFactura debe enviarse explícitamente como false.
    }
    
    // Verificar si el archivo ha cambiado o se ha eliminado
    const archivoAnterior = gastoActual.archivoUrl;
    const archivoNuevo = body.archivoUrl; // body.archivoUrl en lugar de data.archivoUrl
    
    if (archivoAnterior && archivoAnterior !== archivoNuevo) {
      await deleteFile(archivoAnterior);
    }
    
    const gasto = await prisma.facturaProveedor.update({
      where: { id },
      data: dataFinal, // Usar dataFinal que contiene los campos de IVA actualizados
      include: {
        proveedor: true,
        factura: {
          select: {
            id: true,
            numero: true,
            nombre: true,
            estado: true,
            fecha: true,
          }
        },
        partida: true,
      },
    })
    
    return NextResponse.json(gasto)
  } catch (error) {
    console.error('Error al actualizar el gasto:', error)
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido al actualizar el gasto';
    return NextResponse.json(
      { error: 'Error al actualizar el gasto', details: errorMessage },
      { status: 500 }
    )
  }
}

// DELETE /api/gastos/[id] - Eliminar un gasto
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
  const id = resolvedParams.id
  
  try {
    // Primero obtenemos el gasto para verificar si tiene un archivo asociado
    const gasto = await prisma.facturaProveedor.findUnique({
      where: { id },
      select: { archivoUrl: true }
    })
    
    if (!gasto) {
      return NextResponse.json(
        { error: 'Gasto no encontrado' },
        { status: 404 }
      )
    }
    
    // Si tiene un archivo asociado, lo eliminamos primero
    if (gasto.archivoUrl) {
      await deleteFile(gasto.archivoUrl);
    }
    
    // Ahora eliminamos el gasto
    await prisma.facturaProveedor.delete({
      where: { id },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error al eliminar el gasto:', error)
    return NextResponse.json(
      { error: 'Error al eliminar el gasto' },
      { status: 500 }
    )
  }
} 