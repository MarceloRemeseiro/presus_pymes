import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const MAX_LOGO_HEIGHT = 100; // Altura máxima para el logo en el PDF
const MAX_LOGO_WIDTH = 200;  // Ancho máximo para el logo en el PDF

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const file = formData.get('logo') as File;
    if (!file) {
      return NextResponse.json(
        { error: 'No se proporcionó ningún archivo de logo' },
        { status: 400 }
      );
    }
    
    // Comprobar que es una imagen
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'El archivo debe ser una imagen' },
        { status: 400 }
      );
    }
    
    // Convertir File a Buffer para procesar con sharp
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Procesar la imagen con sharp
    const image = sharp(buffer);
    const metadata = await image.metadata();
    
    // Calcular nuevas dimensiones manteniendo la proporción
    let width = metadata.width || MAX_LOGO_WIDTH;
    let height = metadata.height || MAX_LOGO_HEIGHT;
    
    // Calcular la proporción para redimensionar
    let ratio = Math.min(
      MAX_LOGO_WIDTH / width,
      MAX_LOGO_HEIGHT / height
    );
    
    // Si la imagen es más pequeña que los límites, no la ampliamos
    ratio = ratio > 1 ? 1 : ratio;
    
    // Calcular nuevas dimensiones
    const newWidth = Math.round(width * ratio);
    const newHeight = Math.round(height * ratio);
    
    // Redimensionar y optimizar la imagen
    const resizedImage = await image
      .resize(newWidth, newHeight, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .toFormat('png')
      .toBuffer();
    
    // Crear nombre de archivo único
    const fileName = `logo-${uuidv4()}.png`;
    
    // Usar rutas absolutas
    const rootDir = process.cwd();
    const uploadDir = path.join(rootDir, 'public', 'uploads');
    
    // Crear directorio si no existe
    await mkdir(uploadDir, { recursive: true });
    
    // Guardar archivo con ruta absoluta
    const filePath = path.join(uploadDir, fileName);
    console.log('Guardando logo en:', filePath);
    
    await writeFile(filePath, resizedImage);  
    
    // URL pública usando la ruta API para acceder al archivo
    const publicUrl = `/api/static/uploads/${fileName}`;
    
    return NextResponse.json({ logoUrl: publicUrl });
  } catch (error) {
    console.error('Error al procesar el logo:', error);
    return NextResponse.json(
      { error: 'Error al procesar el logo' },
      { status: 500 }
    );
  }
} 