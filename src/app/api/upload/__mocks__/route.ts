// Mock para la ruta de API de carga de archivos

import { NextResponse } from 'next/server';

// Mantenemos un registro de los archivos "subidos" para poder verificarlos en las pruebas
export const mockedFiles: Record<string, Uint8Array> = {};
export const mockedDeletedFiles: string[] = [];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No se ha proporcionado un archivo' },
        { status: 400 }
      );
    }
    
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const originalName = file.name;
    const uniqueId = 'mock-uuid-12345678';
    
    // Separar el nombre y la extensión
    const lastDotIndex = originalName.lastIndexOf('.');
    const nameWithoutExt = lastDotIndex !== -1 ? originalName.slice(0, lastDotIndex) : originalName;
    const extension = lastDotIndex !== -1 ? originalName.slice(lastDotIndex + 1) : '';
    
    // Crear el nuevo nombre con el ID único al final
    const fileName = `${nameWithoutExt}_${uniqueId}.${extension}`;
    
    // Almacenar el archivo en nuestro mock
    const publicPath = `/uploads/${fileName}`;
    mockedFiles[publicPath] = bytes;
    
    // Devolver tanto la URL como el nombre original del archivo
    return NextResponse.json({ 
      fileUrl: publicPath,
      originalName: originalName
    });
  } catch (error) {
    console.error('Error al subir el archivo:', error);
    return NextResponse.json(
      { error: 'Error al subir el archivo' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { filePath } = body;
    
    if (!filePath) {
      return NextResponse.json(
        { error: 'No se ha proporcionado una ruta de archivo' },
        { status: 400 }
      );
    }
    
    // Extraer el nombre del archivo de la ruta pública
    const fileName = filePath.split('/').pop();
    
    if (!fileName) {
      return NextResponse.json(
        { error: 'Ruta de archivo inválida' },
        { status: 400 }
      );
    }
    
    // Verificar si el archivo existe en nuestro mock
    if (mockedFiles[filePath]) {
      // "Eliminar" el archivo
      delete mockedFiles[filePath];
      mockedDeletedFiles.push(filePath);
      return NextResponse.json({ success: true, message: 'Archivo eliminado correctamente' });
    } else {
      return NextResponse.json({ success: false, message: 'El archivo no existe' });
    }
  } catch (error) {
    console.error('Error al eliminar el archivo:', error);
    return NextResponse.json(
      { error: 'Error al eliminar el archivo' },
      { status: 500 }
    );
  }
} 