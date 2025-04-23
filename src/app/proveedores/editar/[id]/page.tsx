"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProveedorForm } from "@/components/proveedores/proveedor-form"
import { toast, Toaster } from "sonner"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { use } from "react"

interface PageParams {
  params: Promise<{
    id: string
  }>
}

interface Proveedor {
  id: string
  nombre: string
  nif?: string | null
  direccion?: string | null
  email?: string | null
  telefono?: string | null
  contacto?: string | null
  notas?: string | null
  createdAt: string
  updatedAt: string
}

export default function EditarProveedorPage({ params }: PageParams) {
  const router = useRouter()
  const resolvedParams = use(params)
  const { id } = resolvedParams
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [proveedor, setProveedor] = useState<Proveedor | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProveedor = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/proveedores/${id}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Proveedor no encontrado")
          }
          throw new Error("Error al cargar la información del proveedor")
        }
        
        const data = await response.json()
        setProveedor(data)
        setError(null)
      } catch (err) {
        console.error('Error al cargar proveedor:', err)
        setError(err instanceof Error ? err.message : 'Error desconocido al cargar el proveedor')
        toast.error('Error al cargar proveedor')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProveedor()
  }, [id])

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true)
      
      const response = await fetch(`/api/proveedores/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al actualizar el proveedor')
      }
      
      toast.success('Proveedor actualizado correctamente')
      
      // Redirigir a la lista de proveedores
      setTimeout(() => {
        router.push('/proveedores')
      }, 1000)
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : 'Error al actualizar el proveedor')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="py-10 flex justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="mt-2">Cargando información del proveedor...</p>
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
            <Link href="/proveedores">Volver a la lista de proveedores</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-10">
      <div className="flex items-center mb-8">
        <Button variant="outline" size="icon" asChild className="mr-4">
          <Link href="/proveedores">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Editar Proveedor</h1>
      </div>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Información del Proveedor</CardTitle>
          <CardDescription>
            Actualiza los datos del proveedor.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProveedorForm 
            initialData={proveedor} 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting} 
          />
        </CardContent>
      </Card>
      
      <Toaster />
    </div>
  )
} 