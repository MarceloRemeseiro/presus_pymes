import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import * as crypto from 'crypto';

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
    
    // Crear un nombre único para el archivo
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const fileExtension = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExtension}`;
    
    // Crear directorio si no existe
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    
    try {
      await writeFile(join(uploadDir, fileName), bytes);
    } catch (error) {
      console.error('Error al guardar el archivo:', error);
      
      // Intentar crear el directorio si no existe y reintentar
      const { mkdir } = await import('fs/promises');
      await mkdir(uploadDir, { recursive: true });
      await writeFile(join(uploadDir, fileName), bytes);
    }
    
    const publicPath = `/uploads/${fileName}`;
    
    return NextResponse.json({ fileUrl: publicPath });
  } catch (error) {
    console.error('Error al subir el archivo:', error);
    return NextResponse.json(
      { error: 'Error al subir el archivo' },
      { status: 500 }
    );
  }
} 