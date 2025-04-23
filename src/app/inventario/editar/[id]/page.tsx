"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductoForm, ProductoFormValues } from "@/components/productos/producto-form"
import { toast, Toaster } from "sonner"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

interface Categoria {
  id: string;
  nombre: string;
}

interface Marca {
  id: string;
  nombre: string;
}

interface Producto {
  id: string;
  nombre: string;
  descripcion: string | null;
  stock: number;
  precio: number;
  precioCompra: number | null;
  precioAlquiler: number | null;
  categoriaId: string;
  marcaId: string | null;
  modelo: string | null;
  categoria: {
    id: string;
    nombre: string;
  };
  marca: {
    id: string;
    nombre: string;
  } | null;
}

export default function EditarProductoPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [producto, setProducto] = useState<Producto | null>(null)
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [marcas, setMarcas] = useState<Marca[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        
        // Cargar producto
        const productoResponse = await fetch(`/api/productos/${id}`)
        
        if (!productoResponse.ok) {
          if (productoResponse.status === 404) {
            throw new Error("Producto no encontrado")
          }
          throw new Error("Error al cargar la información del producto")
        }
        
        const productoData = await productoResponse.json()
        setProducto(productoData)
        
        // Cargar categorías
        const categoriasResponse = await fetch('/api/categorias')
        const categoriasData = await categoriasResponse.json()
        setCategorias(categoriasData)
        
        // Cargar marcas
        const marcasResponse = await fetch('/api/marcas')
        const marcasData = await marcasResponse.json()
        setMarcas(marcasData)
        
        setError(null)
      } catch (err) {
        console.error('Error al cargar datos:', err)
        setError(err instanceof Error ? err.message : 'Error desconocido al cargar los datos')
        toast.error('Error al cargar datos')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id])

  const handleSubmit = async (data: ProductoFormValues) => {
    try {
      setIsSubmitting(true)
      
      const response = await fetch(`/api/productos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al actualizar el producto')
      }
      
      toast.success('Producto actualizado correctamente')
      
      // Redirigir al inventario
      setTimeout(() => {
        router.push('/inventario')
      }, 1000)
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : 'Error al actualizar el producto')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Convertir el producto a formato del formulario
  const getFormValues = (): ProductoFormValues | undefined => {
    if (!producto) return undefined;
    
    return {
      nombre: producto.nombre,
      categoriaId: producto.categoriaId,
      categoriaNombre: producto.categoria.nombre,
      marcaId: producto.marcaId,
      marcaNombre: producto.marca?.nombre || "",
      modelo: producto.modelo,
      descripcion: producto.descripcion,
      precioAlquiler: producto.precioAlquiler
    };
  }

  if (isLoading) {
    return (
      <div className="py-10 flex justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="mt-2">Cargando información del producto...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-10">
        <div className="p-4 mb-4 text-red-800 rounded-lg bg-red-50">
          <p>{error}</p>
          <Button asChild className="mt-4">
            <Link href="/inventario">Volver al inventario</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-10">
      <div className="flex items-center mb-8">
        <Button variant="outline" size="icon" asChild className="mr-4">
          <Link href="/inventario">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Editar Producto</h1>
      </div>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Información del Producto</CardTitle>
          <CardDescription>
            Actualiza los datos del producto.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductoForm 
            initialData={getFormValues()} 
            categorias={categorias}
            marcas={marcas}
            onSubmit={handleSubmit} 
            onCancel={() => router.push('/inventario')}
          />
        </CardContent>
      </Card>
      
      <Toaster />
    </div>
  )
} 