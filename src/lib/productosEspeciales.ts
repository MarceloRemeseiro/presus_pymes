import { prisma } from '@/lib/prisma';

export type TipoEspecial = 'CATEGORIA' | 'SEPARADOR' | 'PERSONAL' | 'PERSONALIZADO';

/**
 * Asegura que existe un producto base para tipos especiales (Categoría, Separador, Personal, Personalizado)
 * y devuelve su ID. Si no existe, lo crea bajo una categoría '__SISTEMA__'.
 * @param tipo El tipo de ítem especial.
 * @returns El ID del producto correspondiente.
 */
export async function getOrCreateEspecialProduct(tipo: TipoEspecial): Promise<string> {
  const productNames: Record<TipoEspecial, string> = {
    'CATEGORIA': '__CATEGORIA__',
    'SEPARADOR': '__SEPARADOR__',
    'PERSONAL': '__PERSONAL__',
    'PERSONALIZADO': '__PERSONALIZADO__',
  };

  if (!productNames[tipo]) {
    throw new Error(`Tipo especial inválido: ${tipo}`);
  }

  const productName = productNames[tipo];

  // Intentar encontrar el producto existente
  let producto = await prisma.producto.findFirst({
    where: { nombre: productName },
  });

  if (producto) {
    return producto.id;
  }

  // Si no existe, asegurar que la categoría '__SISTEMA__' existe
  let categoriaSistema = await prisma.categoria.findUnique({
    where: { nombre: '__SISTEMA__' },
  });

  if (!categoriaSistema) {
    categoriaSistema = await prisma.categoria.create({
      data: { nombre: '__SISTEMA__' },
    });
  }

  // Crear el producto especial
  producto = await prisma.producto.create({
    data: {
      nombre: productName,
      descripcion: `Producto del sistema para ${tipo}`,
      precio: 0, // O el precio base que consideres
      stock: 0,  // O el stock que consideres
      categoriaId: categoriaSistema.id,
      // Puedes añadir marcaId si es relevante, o dejarlo nulo
    },
  });

  return producto.id;
} 