"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast, Toaster } from "sonner"
import { PlusCircle, Loader2, Search, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/ui/data-table"

interface Puesto {
  id: string
  nombre: string
  asignadoEn: string
}

interface Personal {
  id: string
  nombre: string
  telefono?: string | null
  email?: string | null
  notas?: string | null
  puestos: Puesto[]
  createdAt: string
  updatedAt: string
}

export default function PersonalPage() {
  const [personal, setPersonal] = useState<Personal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  
  useEffect(() => {
    fetchPersonal()
  }, [])

  const fetchPersonal = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/personal')
      
      if (!response.ok) {
        throw new Error("Error al cargar el personal")
      }
      
      const data = await response.json()
      setPersonal(data)
      setError(null)
    } catch (err) {
      console.error('Error al cargar personal:', err)
      setError('Error al cargar la lista de personal')
      toast.error('Error al cargar personal')
    } finally {
      setIsLoading(false)
    }
  }

  // Filtrar personal basado en el término de búsqueda
  const filteredPersonal = personal.filter(
    (persona) =>
      persona.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (persona.email && persona.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (persona.telefono && persona.telefono.toLowerCase().includes(searchTerm.toLowerCase())) ||
      persona.puestos.some(puesto => 
        puesto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
  )

  // Definir las columnas para la tabla
  const columns = [
    {
      key: "nombre",
      header: "Nombre",
      sortable: true,
      cell: (persona: Personal) => (
        <Link 
          href={`/personal/${persona.id}`} 
          className="hover:underline font-medium"
        >
          {persona.nombre}
        </Link>
      )
    },
    {
      key: "contacto",
      header: "Contacto",
      sortable: false,
      cell: (persona: Personal) => (
        <div className="text-sm">
          {persona.email && <div className="mb-1">{persona.email}</div>}
          {persona.telefono && <div>{persona.telefono}</div>}
        </div>
      )
    },
    {
      key: "puestos",
      header: "Puestos",
      sortable: false,
      cell: (persona: Personal) => (
        <div className="flex flex-wrap gap-1">
          {persona.puestos.map(puesto => (
            <Badge key={puesto.id} variant="secondary">
              {puesto.nombre}
            </Badge>
          ))}
          {persona.puestos.length === 0 && (
            <span className="text-muted-foreground text-sm">Sin puesto asignado</span>
          )}
        </div>
      )
    },
    {
      key: "actions",
      header: "Acciones",
      cell: (persona: Personal) => (
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/personal/${persona.id}`}>
              Ver
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/personal/editar/${persona.id}`}>
              Editar
            </Link>
          </Button>
        </div>
      )
    }
  ]

  if (isLoading) {
    return (
      <div className="py-10 flex justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="mt-2">Cargando personal...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-10">
        <div className="p-4 mb-4 text-red-800 rounded-lg bg-red-50">
          <p>{error}</p>
          <Button onClick={() => fetchPersonal()} className="mt-4">
            Intentar de nuevo
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-10">
      <Toaster />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Personal</h1>
        <Button asChild>
          <Link href="/personal/nuevo">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Personal
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Personal</CardTitle>
          <CardDescription>
            Administra todo tu personal desde aquí
          </CardDescription>
          
          <div className="flex items-center mt-4">
            <Search className="h-4 w-4 mr-2 opacity-50" />
            <Input
              placeholder="Buscar por nombre, email, teléfono o puesto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin opacity-70" />
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-800 p-4 rounded-md">
              {error}
            </div>
          ) : filteredPersonal.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm 
                ? "No se encontró personal que coincida con tu búsqueda" 
                : "No hay personal registrado. Agrega uno para empezar."}
            </div>
          ) : (
            <DataTable 
              columns={columns} 
              data={filteredPersonal}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
} 