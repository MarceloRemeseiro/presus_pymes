import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/idiomas - Obtener todos los idiomas
export async function GET(request: Request) {
  try {
    const idiomas = await prisma.idioma.findMany({
      orderBy: { nombre: 'asc' },
    });
    
    return NextResponse.json(idiomas);
  } catch (error) {
    console.error('Error al obtener idiomas:', error);
    return NextResponse.json({ error: 'Error al obtener idiomas' }, { status: 500 });
  }
}

// POST /api/idiomas - Crear un nuevo idioma
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validar que el nombre no esté vacío
    if (!data.nombre || data.nombre.trim() === '') {
      return NextResponse.json(
        { error: 'El nombre del idioma es obligatorio' },
        { status: 400 }
      );
    }
    
    // Normalizar el nombre (primera letra en mayúscula, resto en minúscula)
    const nombreNormalizado = data.nombre.trim().charAt(0).toUpperCase() + 
                             data.nombre.trim().slice(1).toLowerCase();
    
    // Verificar si ya existe un idioma con ese nombre
    const idiomaExistente = await prisma.idioma.findUnique({
      where: { nombre: nombreNormalizado },
    });
    
    if (idiomaExistente) {
      return NextResponse.json(
        { error: 'Ya existe un idioma con ese nombre' },
        { status: 400 }
      );
    }
    
    // Crear el idioma
    const nuevoIdioma = await prisma.idioma.create({
      data: {
        nombre: nombreNormalizado,
      },
    });
    
    return NextResponse.json(nuevoIdioma);
  } catch (error) {
    console.error('Error al crear idioma:', error);
    return NextResponse.json({ error: 'Error al crear idioma' }, { status: 500 });
  }
} 