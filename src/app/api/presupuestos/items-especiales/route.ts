import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

type TipoEspecial = 'CATEGORIA' | 'SEPARADOR' | 'PERSONAL' | 'PERSONALIZADO';

// Función para asegurar que existe el producto para categorías y separadores
async function getOrCreateEspecialProduct(tipo: TipoEspecial) {
  // Nombres de productos a buscar/crear
  const productNames: Record<TipoEspecial, string> = {
    'CATEGORIA': '__CATEGORIA__',
    'SEPARADOR': '__SEPARADOR__',
    'PERSONAL': '__PERSONAL__',
    'PERSONALIZADO': '__PERSONALIZADO__'
  };
  
  if (!productNames[tipo]) {
    throw new Error(`Tipo especial inválido: ${tipo}`);
  }
  
  // Intentar encontrar el producto
  const productoExistente = await prisma.producto.findFirst({
    where: {
      nombre: productNames[tipo]
    }
  });
  
  if (productoExistente) {
    return productoExistente.id;
  }
  
  // Si no existe, crear la categoría para estos productos especiales
  let categoriaEspecial = await prisma.categoria.findFirst({
    where: {
      nombre: '__SISTEMA__'
    }
  });
  
  if (!categoriaEspecial) {
    categoriaEspecial = await prisma.categoria.create({
      data: {
        nombre: '__SISTEMA__'
      }
    });
  }
  
  // Crear el producto especial
  const nuevoProducto = await prisma.producto.create({
    data: {
      nombre: productNames[tipo],
      descripcion: `Producto del sistema para ${tipo}`,
      precio: 0,
      stock: 0,
      categoriaId: categoriaEspecial.id
    }
  });
  
  return nuevoProducto.id;
}

// GET /api/presupuestos/items-especiales?tipo=CATEGORIA|SEPARADOR|PERSONAL|PERSONALIZADO
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tipo = searchParams.get('tipo');
    
    if (!tipo || !['CATEGORIA', 'SEPARADOR', 'PERSONAL', 'PERSONALIZADO'].includes(tipo)) {
      return NextResponse.json(
        { error: 'Tipo especial inválido o no proporcionado' },
        { status: 400 }
      );
    }
    
    const productoId = await getOrCreateEspecialProduct(tipo as TipoEspecial);
    
    return NextResponse.json({ productoId });
  } catch (error) {
    console.error('Error al obtener producto especial:', error);
    return NextResponse.json(
      { error: 'Error al obtener producto especial' },
      { status: 500 }
    );
  }
}

// Exportamos la función para usarla en otras rutas
export { getOrCreateEspecialProduct }; 