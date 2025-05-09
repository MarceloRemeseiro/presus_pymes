"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast, Toaster } from "sonner"
import { ArrowLeft, Edit, Loader2, Mail, Phone, Trash } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
  ciudad?: string | null
  notas?: string | null
  puestos: { id: string; nombre: string; asignadoEn: string }[]
  idiomas?: { id: string; nombre: string; asignadoEn: string }[]
  createdAt: string
  updatedAt: string
}

export default function DetallesPersonalPage({ params }: PageParams) {
  const router = useRouter()
  const resolvedParams = use(params)
  const { id } = resolvedParams
  
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
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

  const handleEliminar = async () => {
    // Confirmar antes de eliminar
    if (!window.confirm("¿Estás seguro de eliminar a este miembro del personal? Esta acción no se puede deshacer.")) {
      return
    }
    
    try {
      setIsDeleting(true)
      
      const response = await fetch(`/api/personal/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al eliminar el personal')
      }
      
      toast.success('Personal eliminado correctamente')
      
      // Redirigir a la lista de personal
      setTimeout(() => {
        router.push('/personal')
      }, 1000)
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : 'Error al eliminar el personal')
      setIsDeleting(false)
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
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Button variant="outline" size="icon" asChild className="mr-4">
            <Link href="/personal">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{personal?.nombre}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/personal/editar/${id}`}>
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
            <CardTitle>Información de Contacto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {personal?.telefono && (
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{personal.telefono}</span>
              </div>
            )}
            {personal?.email && (
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{personal.email}</span>
              </div>
            )}
            {personal?.ciudad && (
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2 text-muted-foreground">
                  <path d="M12 22s-8-4.5-8-11.8a8 8 0 0 1 16 0c0 7.3-8 11.8-8 11.8z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{personal.ciudad}</span>
              </div>
            )}
            {!personal?.telefono && !personal?.email && !personal?.ciudad && (
              <p className="text-muted-foreground">No hay información de contacto registrada</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Puestos Asignados</CardTitle>
          </CardHeader>
          <CardContent>
            {personal?.puestos && personal.puestos.length > 0 ? (
              <div className="space-y-2">
                {personal.puestos.map(puesto => (
                  <div key={puesto.id} className="flex items-center justify-between">
                    <Badge variant="secondary" className="mr-2">
                      {puesto.nombre}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Asignado el {new Date(puesto.asignadoEn).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No tiene puestos asignados</p>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Idiomas</CardTitle>
        </CardHeader>
        <CardContent>
          {personal?.idiomas && personal.idiomas.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {personal.idiomas.map(idioma => (
                <Badge key={idioma.id} variant="outline" className="py-1 px-3">
                  {idioma.nombre}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No hay idiomas registrados</p>
          )}
        </CardContent>
      </Card>
      
      {personal?.notas && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Notas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line">{personal.notas}</p>
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
              <span>{new Date(personal?.createdAt || "").toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Última actualización</span>
              <span>{new Date(personal?.updatedAt || "").toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Toaster />
    </div>
  )
} 