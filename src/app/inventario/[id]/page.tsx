"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast, Toaster } from "sonner"
import { ArrowLeft, Edit, Loader2, Box, Tag, Badge, Bookmark, FileText, Trash, LayoutList } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

interface Producto {
  id: string;
  codigo: string;
  nombre: string;
  descripcion: string | null;
  stock: number;
  precio: number;
  precioCompra: number | null;
  precioAlquiler: number | null;
  categoriaId: string;
  marcaId: string | null;
  modelo: string | null;
  createdAt: string;
  updatedAt: string;
  categoria: {
    id: string;
    nombre: string;
  };
  marca: {
    id: string;
    nombre: string;
  } | null;
  _count?: {
    equipoItems: number;
  };
}

export default function DetalleProductoPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params
  
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [producto, setProducto] = useState<Producto | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/productos/${id}?includeEquipoItems=true`)
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Producto no encontrado")
          }
          throw new Error("Error al cargar la información del producto")
        }
        
        const data = await response.json()
        setProducto(data)
        setError(null)
      } catch (err) {
        console.error('Error al cargar producto:', err)
        setError(err instanceof Error ? err.message : 'Error desconocido al cargar el producto')
        toast.error('Error al cargar producto')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducto()
  }, [id])

  const handleEliminar = async () => {
    if (!window.confirm("¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer.")) {
      return
    }
    
    try {
      setIsDeleting(true)
      
      const response = await fetch(`/api/productos/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al eliminar el producto')
      }
      
      toast.success('Producto eliminado correctamente')
      
      // Redirigir a la lista de productos
      setTimeout(() => {
        router.push('/inventario')
      }, 1000)
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : 'Error al eliminar el producto')
      setIsDeleting(false)
    }
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

  if (!producto) {
    return (
      <div className="py-10">
        <div className="p-4 mb-4 text-red-800 rounded-lg bg-red-50">
          <p>Producto no encontrado</p>
          <Button asChild className="mt-4">
            <Link href="/inventario">Volver al inventario</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Button variant="outline" size="icon" asChild className="mr-4">
            <Link href="/inventario">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{producto.nombre}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/inventario/equipos/${id}`}>
              <LayoutList className="mr-2 h-4 w-4" />
              Ver Elementos
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/inventario/editar/${id}`}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Link>
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleEliminar}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Eliminando...
              </>
            ) : (
              <>
                <Trash className="mr-2 h-4 w-4" />
                Eliminar
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Información General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <Box className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-muted-foreground mr-2">Código:</span>
              <span>{producto.codigo}</span>
            </div>
            
            <div className="flex items-center">
              <Bookmark className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-muted-foreground mr-2">Categoría:</span>
              <span>{producto.categoria.nombre}</span>
            </div>
            
            {producto.marca && (
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground mr-2">Marca:</span>
                <span>{producto.marca.nombre}</span>
              </div>
            )}
            
            {producto.modelo && (
              <div className="flex items-center">
                <Badge className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground mr-2">Modelo:</span>
                <span>{producto.modelo}</span>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Información de Inventario</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <span className="text-muted-foreground mr-2">Stock:</span>
              <span className="font-semibold">{producto.stock}</span>
            </div>
            
            <div className="flex items-center">
              <span className="text-muted-foreground mr-2">Precio:</span>
              <span>{producto.precio ? `$${producto.precio.toFixed(2)}` : "—"}</span>
            </div>
            
            {producto.precioCompra !== null && (
              <div className="flex items-center">
                <span className="text-muted-foreground mr-2">Precio de Compra:</span>
                <span>${producto.precioCompra.toFixed(2)}</span>
              </div>
            )}
            
            {producto.precioAlquiler !== null && (
              <div className="flex items-center">
                <span className="text-muted-foreground mr-2">Precio de Alquiler:</span>
                <span>${producto.precioAlquiler.toFixed(2)}</span>
              </div>
            )}
            
            <div className="flex items-center">
              <span className="text-muted-foreground mr-2">Elementos de Equipo:</span>
              <span>{producto._count?.equipoItems || 0}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {producto.descripcion && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Descripción</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start">
              <FileText className="h-4 w-4 mr-2 text-muted-foreground mt-1" />
              <p className="whitespace-pre-line">{producto.descripcion}</p>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Información Adicional</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Creado el</span>
              <span>{new Date(producto.createdAt || "").toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Última actualización</span>
              <span>{new Date(producto.updatedAt || "").toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Toaster />
    </div>
  )
} 