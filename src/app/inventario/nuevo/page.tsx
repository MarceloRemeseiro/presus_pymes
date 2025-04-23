"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductoForm, ProductoFormValues } from "@/components/productos/producto-form"
import { toast, Toaster } from "sonner"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Categoria {
  id: string;
  nombre: string;
}

interface Marca {
  id: string;
  nombre: string;
}

export default function NuevoProductoPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [marcas, setMarcas] = useState<Marca[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Cargar categorías y marcas al iniciar
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        
        // Cargar categorías
        const categoriasResponse = await fetch('/api/categorias')
        const categoriasData = await categoriasResponse.json()
        setCategorias(categoriasData)
        
        // Cargar marcas
        const marcasResponse = await fetch('/api/marcas')
        const marcasData = await marcasResponse.json()
        setMarcas(marcasData)
      } catch (error) {
        console.error("Error al cargar datos:", error)
        toast.error("Error al cargar categorías y marcas")
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [])

  const handleSubmit = async (data: ProductoFormValues) => {
    try {
      setIsSubmitting(true)
      
      const response = await fetch("/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al crear el producto")
      }
      
      toast.success("Producto creado correctamente")
      
      // Redirigir al inventario
      setTimeout(() => {
        router.push("/inventario")
      }, 1000)
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : "Error al crear el producto")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-10">
      <div className="flex items-center mb-8">
        <Button variant="outline" size="icon" asChild className="mr-4">
          <Link href="/inventario">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Nuevo Producto</h1>
      </div>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Información del Producto</CardTitle>
          <CardDescription>
            Añade los datos del nuevo producto.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
            </div>
          ) : (
            <ProductoForm 
              onSubmit={handleSubmit} 
              categorias={categorias}
              marcas={marcas}
              onCancel={() => router.push("/inventario")}
            />
          )}
        </CardContent>
      </Card>
      
      <Toaster />
    </div>
  )
} 