import { NextResponse } from 'next/server';
import { writeFile, unlink, access } from 'fs/promises';
import path from 'path';
import * as crypto from 'crypto';

// Función auxiliar para verificar si un archivo existe
async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

// Función para asegurar que el directorio de uploads existe
async function ensureUploadDirExists(uploadDir: string): Promise<void> {
  try {
    await access(uploadDir);
  } catch {
    const { mkdir } = await import('fs/promises');
    await mkdir(uploadDir, { recursive: true });
    console.log(`Directorio de uploads creado: ${uploadDir}`);
  }
}

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
    
    // Mantener el nombre original pero añadir un ID único al final
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const originalName = file.name;
    const uniqueId = crypto.randomUUID().slice(0, 8); // Usar solo los primeros 8 caracteres del UUID
    
    // Separar el nombre y la extensión
    const lastDotIndex = originalName.lastIndexOf('.');
    const nameWithoutExt = lastDotIndex !== -1 ? originalName.slice(0, lastDotIndex) : originalName;
    const extension = lastDotIndex !== -1 ? originalName.slice(lastDotIndex + 1) : '';
    
    // Crear el nuevo nombre con el ID único al final
    const fileName = `${nameWithoutExt}_${uniqueId}.${extension}`;
    
    // Definir directorio de uploads usando rutas absolutas
    const rootDir = process.cwd();
    const uploadDir = path.join(rootDir, 'public', 'uploads');
    console.log(`Directorio de uploads: ${uploadDir}`);
    
    // Asegurar que el directorio existe
    await ensureUploadDirExists(uploadDir);
    
    // Ruta completa del archivo
    const filePath = path.join(uploadDir, fileName);
    console.log(`Guardando archivo en: ${filePath}`);
    
    try {
      // Asegurar permisos
      console.log('Intentando escribir archivo...');
      await writeFile(filePath, bytes);
      console.log(`Archivo guardado con éxito: ${fileName} en ${filePath}`);
    } catch (error) {
      console.error('Error al guardar el archivo:', error);
      throw error;
    }
    
    // La URL pública para acceder al archivo desde el navegador
    const publicPath = `/uploads/${fileName}`;
    
    // Devolver tanto la URL como el nombre original del archivo
    return NextResponse.json({ 
      fileUrl: publicPath,
      originalName: originalName
    });
  } catch (error) {
    console.error('Error al subir el archivo:', error);
    return NextResponse.json(
      { 
        error: 'Error al subir el archivo',
        message: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { filePath } = body;
    
    if (!filePath) {
      console.log("Error: No se proporcionó una ruta de archivo");
      return NextResponse.json(
        { error: 'No se ha proporcionado una ruta de archivo' },
        { status: 400 }
      );
    }
    
    // Extraer el nombre del archivo de la ruta pública
    const fileName = filePath.split('/').pop();
    console.log("Intentando eliminar archivo:", fileName);
    
    if (!fileName) {
      console.log("Error: Ruta de archivo inválida:", filePath);
      return NextResponse.json(
        { error: 'Ruta de archivo inválida' },
        { status: 400 }
      );
    }
    
    // Construir la ruta absoluta al archivo
    const rootDir = process.cwd();
    const filePath2 = path.join(rootDir, 'public', 'uploads', fileName);
    console.log("Ruta absoluta del archivo a eliminar:", filePath2);
    
    // Verificar si el archivo existe antes de intentar eliminarlo
    if (await fileExists(filePath2)) {
      console.log("El archivo existe, procediendo a eliminarlo");
      await unlink(filePath2);
      console.log("Archivo eliminado correctamente:", fileName);
      return NextResponse.json({ 
        success: true, 
        message: 'Archivo eliminado correctamente',
        fileName: fileName,
        path: filePath2
      });
    } else {
      console.log("El archivo no existe en el sistema de archivos:", filePath2);
      return NextResponse.json({ 
        success: false, 
        message: 'El archivo no existe',
        fileName: fileName,
        path: filePath2
      });
    }
  } catch (error) {
    console.error('Error al eliminar el archivo:', error);
    return NextResponse.json(
      { 
        error: 'Error al eliminar el archivo',
        message: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
} 