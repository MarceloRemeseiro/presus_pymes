"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast, Toaster } from "sonner"
import { ArrowLeft, Edit, Loader2, Mail, Phone, MapPin, Building, FileText, Trash, User } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { use } from "react"

interface PageParams {
  params: Promise<{
    id: string
  }>
}

interface Cliente {
  id: string
  nombre: string
  nif?: string | null
  direccion?: string | null
  ciudad?: string | null
  email?: string | null
  telefono?: string | null
  tipo: "EMPRESA" | "PARTICULAR"
  createdAt: string
  updatedAt: string
}

export default function DetalleClientePage({ params }: PageParams) {
  const router = useRouter()
  const resolvedParams = use(params)
  const { id } = resolvedParams
  
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
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

  const handleEliminar = async () => {
    if (!window.confirm("¿Estás seguro de eliminar este cliente? Esta acción no se puede deshacer.")) {
      return
    }
    
    try {
      setIsDeleting(true)
      
      const response = await fetch(`/api/clientes/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al eliminar el cliente')
      }
      
      toast.success('Cliente eliminado correctamente')
      
      // Redirigir a la lista de clientes
      setTimeout(() => {
        router.push('/clientes')
      }, 1000)
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : 'Error al eliminar el cliente')
      setIsDeleting(false)
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
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Button variant="outline" size="icon" asChild className="mr-4">
            <Link href="/clientes">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{cliente?.nombre}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/clientes/editar/${id}`}>
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
      
      <Badge className="mb-6" variant={cliente?.tipo === "EMPRESA" ? "default" : "secondary"}>
        {cliente?.tipo === "EMPRESA" ? "Empresa" : "Autónomo"}
      </Badge>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Información General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cliente?.nif && (
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground mr-2">NIF/CIF:</span>
                <span>{cliente.nif}</span>
              </div>
            )}
            
            {cliente?.direccion && (
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground mt-1" />
                <span className="text-muted-foreground mr-2">Dirección:</span>
                <span>{cliente.direccion}</span>
              </div>
            )}
             {cliente?.ciudad && (
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground mt-1" />
                <span className="text-muted-foreground mr-2">Cp, Ciudad, etc:</span>
                <span>{cliente.ciudad}</span>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Información de Contacto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cliente?.telefono && (
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground mr-2">Teléfono:</span>
                <span>{cliente.telefono}</span>
              </div>
            )}
            {cliente?.email && (
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground mr-2">Email:</span>
                <span>{cliente.email}</span>
              </div>
            )}
            {!cliente?.telefono && !cliente?.email && (
              <p className="text-muted-foreground">No hay información de contacto registrada</p>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Información Adicional</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Creado el</span>
              <span>{new Date(cliente?.createdAt || "").toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Última actualización</span>
              <span>{new Date(cliente?.updatedAt || "").toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Toaster />
    </div>
  )
} 