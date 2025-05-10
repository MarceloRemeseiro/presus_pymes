"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ClienteForm } from "@/components/clientes/cliente-form"
import { toast, Toaster } from "sonner"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { use } from "react"
import { type ClienteFormValues } from "@/components/clientes/cliente-form"

interface PageParams {
  params: Promise<{
    id: string
  }>
}

interface Cliente {
  id: string
  nombre: string
  nif?: string | null
  esIntracomunitario?: boolean
  direccion?: string | null
  email?: string | null
  telefono?: string | null
  tipo: "EMPRESA" | "PARTICULAR"
  createdAt: string
  updatedAt: string
}

export default function EditarClientePage({ params }: PageParams) {
  const router = useRouter()
  const resolvedParams = use(params)
  const { id } = resolvedParams
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [cliente, setCliente] = useState<Cliente | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/clientes/${id}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Cliente no encontrado")
          }
          throw new Error("Error al cargar la información del cliente")
        }
        
        const data = await response.json()
        setCliente(data)
        setError(null)
      } catch (err) {
        console.error('Error al cargar cliente:', err)
        setError(err instanceof Error ? err.message : 'Error desconocido al cargar el cliente')
        toast.error('Error al cargar cliente')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCliente()
  }, [id])

  const handleSubmit = async (data: ClienteFormValues) => {
    try {
      setIsSubmitting(true)
      
      const dataToSend = {
        ...data,
        esIntracomunitario: data.esIntracomunitario || false,
      };

      const response = await fetch(`/api/clientes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al actualizar el cliente')
      }
      
      toast.success('Cliente actualizado correctamente')
      
      // Redirigir a la lista de clientes
      setTimeout(() => {
        router.push('/clientes')
      }, 1000)
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : 'Error al actualizar el cliente')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="py-10 flex justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="mt-2">Cargando información del cliente...</p>
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
            <Link href="/clientes">Volver a la lista de clientes</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-10">
      <div className="flex items-center mb-8">
        <Button variant="outline" size="icon" asChild className="mr-4">
          <Link href="/clientes">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Editar Cliente</h1>
      </div>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Información del Cliente</CardTitle>
          <CardDescription>
            Actualiza los datos del cliente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ClienteForm 
            initialData={cliente} 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting} 
          />
        </CardContent>
      </Card>
      
      <Toaster />
    </div>
  )
} 