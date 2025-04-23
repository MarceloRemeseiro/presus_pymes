"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast, Toaster } from "sonner"
import { PlusCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Personal</h1>
        <Button asChild>
          <Link href="/personal/nuevo">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Personal
          </Link>
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Puestos</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {personal.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                  No hay personal registrado. Agrega uno para empezar.
                </TableCell>
              </TableRow>
            ) : (
              personal.map((persona) => (
                <TableRow key={persona.id}>
                  <TableCell className="font-medium">{persona.nombre}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {persona.email && <div className="mb-1">{persona.email}</div>}
                      {persona.telefono && <div>{persona.telefono}</div>}
                    </div>
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell className="text-right">
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
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <Toaster />
    </div>
  )
} 