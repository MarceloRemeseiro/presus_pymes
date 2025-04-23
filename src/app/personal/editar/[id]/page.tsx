"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PersonalForm } from "@/components/personal/personal-form"
import { toast, Toaster } from "sonner"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { use } from "react"

interface PageParams {
  params: Promise<{
    id: string
  }>
}

interface Personal {
  id: string
  nombre: string
  telefono?: string | null
  email?: string | null
  notas?: string | null
  puestos: { id: string; nombre: string }[]
  createdAt: string
  updatedAt: string
}

export default function EditarPersonalPage({ params }: PageParams) {
  const router = useRouter()
  const resolvedParams = use(params)
  const { id } = resolvedParams
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [personal, setPersonal] = useState<Personal | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPersonal = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/personal/${id}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Personal no encontrado")
          }
          throw new Error("Error al cargar la información del personal")
        }
        
        const data = await response.json()
        setPersonal(data)
        setError(null)
      } catch (err) {
        console.error('Error al cargar personal:', err)
        setError(err instanceof Error ? err.message : 'Error desconocido al cargar el personal')
        toast.error('Error al cargar personal')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPersonal()
  }, [id])

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true)
      
      const response = await fetch(`/api/personal/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al actualizar el personal')
      }
      
      toast.success('Personal actualizado correctamente')
      
      // Redirigir a la lista de personal
      setTimeout(() => {
        router.push('/personal')
      }, 1000)
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : 'Error al actualizar el personal')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="py-10 flex justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="mt-2">Cargando información del personal...</p>
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
            <Link href="/personal">Volver a la lista de personal</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-10">
      <div className="flex items-center mb-8">
        <Button variant="outline" size="icon" asChild className="mr-4">
          <Link href="/personal">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Editar Personal</h1>
      </div>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Información del Personal</CardTitle>
          <CardDescription>
            Actualiza los datos del miembro del personal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PersonalForm 
            initialData={personal} 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting} 
          />
        </CardContent>
      </Card>
      
      <Toaster />
    </div>
  )
} 