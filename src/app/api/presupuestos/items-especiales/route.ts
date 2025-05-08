import { NextResponse } from 'next/server';
import { getOrCreateEspecialProduct, TipoEspecial } from '@/lib/productosEspeciales'; // Importar desde la nueva ubicación

// GET /api/presupuestos/items-especiales?tipo=CATEGORIA|SEPARADOR|PERSONAL|PERSONALIZADO
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tipo = searchParams.get('tipo');

    // Validar el tipo
    if (!tipo || !['CATEGORIA', 'SEPARADOR', 'PERSONAL', 'PERSONALIZADO'].includes(tipo.toUpperCase())) {
      return NextResponse.json(
        { error: 'Tipo especial inválido o no proporcionado' },
        { status: 400 }
      );
    }

    const productoId = await getOrCreateEspecialProduct(tipo.toUpperCase() as TipoEspecial);

    return NextResponse.json({ productoId });
  } catch (error) {
    console.error('Error al obtener producto especial:', error);
    // Asegurarse de que el error sea una instancia de Error para acceder a message
    const errorMessage = error instanceof Error ? error.message : 'Error interno del servidor';
    return NextResponse.json(
      { error: 'Error al obtener producto especial', details: errorMessage },
      { status: 500 }
    );
  }
} 