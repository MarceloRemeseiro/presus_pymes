import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const filePath = path.join(
      process.cwd(),
      'public',
      ...params.path
    );

    console.log(`Intentando servir archivo: ${filePath}`);

    // Verificar si el archivo existe
    if (!fs.existsSync(filePath)) {
      console.log(`Archivo no encontrado: ${filePath}`);
      return new NextResponse('Archivo no encontrado', { status: 404 });
    }

    // Leer el archivo
    const fileBuffer = fs.readFileSync(filePath);
    const contentType = getContentType(filePath);
    
    console.log(`Sirviendo archivo: ${filePath} con tipo de contenido: ${contentType}`);
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': 'inline',
        // Cache por 1 día (opcional)
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error(`Error al servir archivo: ${error}`);
    return new NextResponse('Error al procesar el archivo', { status: 500 });
  }
}

function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.pdf':
      return 'application/pdf';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.gif':
      return 'image/gif';
    case '.svg':
      return 'image/svg+xml';
    case '.doc':
    case '.docx':
      return 'application/msword';
    case '.xls':
    case '.xlsx':
      return 'application/vnd.ms-excel';
    case '.ppt':
    case '.pptx':
      return 'application/vnd.ms-powerpoint';
    case '.txt':
      return 'text/plain';
    case '.csv':
      return 'text/csv';
    default:
      return 'application/octet-stream';
  }
} 