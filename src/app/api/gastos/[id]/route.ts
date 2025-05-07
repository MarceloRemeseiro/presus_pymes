import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
    const { join } = await import('path');
    
    // Construir la ruta absoluta al archivo
    const filePath = join(process.cwd(), 'public', 'uploads', fileName);
    
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
    // Primero obtenemos el gasto actual para verificar el archivo
    const gastoActual = await prisma.facturaProveedor.findUnique({
      where: { id },
      select: { archivoUrl: true }
    });
    
    if (!gastoActual) {
      return NextResponse.json(
        { error: 'Gasto no encontrado' },
        { status: 404 }
      );
    }
    
    const data = await request.json()
    
    // Si hay fecha en string, convertirla a Date
    if (data.documentoFecha && typeof data.documentoFecha === 'string') {
      data.documentoFecha = new Date(data.documentoFecha)
    }
    
    // Verificar si el archivo ha cambiado o se ha eliminado
    const archivoAnterior = gastoActual.archivoUrl;
    const archivoNuevo = data.archivoUrl;
    
    // Si el archivo ha cambiado o se ha eliminado, eliminamos el archivo anterior
    if (archivoAnterior && archivoAnterior !== archivoNuevo) {
      console.log("El archivo ha cambiado o ha sido eliminado, eliminando archivo anterior");
      await deleteFile(archivoAnterior);
    }
    
    const gasto = await prisma.facturaProveedor.update({
      where: { id },
      data,
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
    return NextResponse.json(
      { error: 'Error al actualizar el gasto' },
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