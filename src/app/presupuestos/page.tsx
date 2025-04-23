"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
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
import { EstadoBadge } from "@/components/presupuestos/estado-badge"
import { useRouter } from "next/navigation"

interface Presupuesto {
  id: string
  numero: string
  nombre?: string | null
  referencia?: string | null
  fecha: string
  fechaValidez: string
  clienteId?: string
  cliente?: {
    nombre: string
  }
  estado: "PENDIENTE" | "APROBADO" | "RECHAZADO" | "FACTURADO"
  subtotal: number
  iva: number
  total: number
}

export default function PresupuestosPage() {
  const [presupuestos, setPresupuestos] = useState<Presupuesto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  
  useEffect(() => {
    const fetchPresupuestos = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/presupuestos')
        
        if (!response.ok) {
          throw new Error("Error al cargar los presupuestos")
        }
        
        const data = await response.json()
        setPresupuestos(data)
        setError(null)
      } catch (err) {
        console.error('Error al cargar presupuestos:', err)
        setError('Error al cargar la lista de presupuestos')
        toast.error('Error al cargar presupuestos')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPresupuestos()
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value)
  }

  // Función para crear un nuevo presupuesto vacío
  const crearNuevoPresupuesto = async () => {
    try {
      setIsCreating(true)
      
      // Obtener el siguiente número de presupuesto
      const numeroResponse = await fetch('/api/configuracion/siguiente-numero?tipo=presupuesto')
      if (!numeroResponse.ok) {
        throw new Error('Error al generar el número de presupuesto')
      }
      
      const { numero: numeroPresupuesto } = await numeroResponse.json()
      
      // Obtener la fecha actual y calcular validez
      const today = new Date()
      
      // Calcular fecha de validez (15 días después)
      const validityDate = new Date(today)
      validityDate.setDate(validityDate.getDate() + 15)
      
      // Datos mínimos para el presupuesto
      const presupuestoData = {
        numero: numeroPresupuesto,
        fecha: today.toISOString(),
        fechaValidez: validityDate.toISOString(),
        estado: "PENDIENTE",
        subtotal: 0,
        iva: 0,
        total: 0,
        items: []
      }
      
      console.log('Datos recibidos:', presupuestoData)
      
      // Crear el presupuesto vacío
      const response = await fetch('/api/presupuestos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(presupuestoData),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al crear el presupuesto')
      }
      
      const presupuestoCreado = await response.json()
      
      // Redirigir a la página de edición del presupuesto
      router.push(`/presupuestos/editar/${presupuestoCreado.id}`)
      
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : 'Error al crear el presupuesto')
      setIsCreating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="py-10 flex justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2">Cargando presupuestos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-10">
        <div className="p-4 mb-4 text-red-800 rounded-lg bg-red-50">
          <p>{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Intentar de nuevo
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Presupuestos</h1>
        <Button onClick={crearNuevoPresupuesto} disabled={isCreating}>
          {isCreating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creando...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nuevo Presupuesto
            </>
          )}
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Número</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Referencia</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Válido hasta</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {presupuestos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
                  No hay presupuestos registrados. Crea uno para empezar.
                </TableCell>
              </TableRow>
            ) : (
              presupuestos.map((presupuesto) => (
                <TableRow key={presupuesto.id}>
                  <TableCell className="font-medium">{presupuesto.numero}</TableCell>
                  <TableCell>{presupuesto.nombre || '-'}</TableCell>
                  <TableCell>{presupuesto.referencia || '-'}</TableCell>
                  <TableCell>{presupuesto.cliente?.nombre || 'Sin cliente'}</TableCell>
                  <TableCell>{new Date(presupuesto.fecha).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(presupuesto.fechaValidez).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <EstadoBadge estado={presupuesto.estado} />
                  </TableCell>
                  <TableCell className="text-right">{formatCurrency(presupuesto.total)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/presupuestos/${presupuesto.id}`}>
                          Ver
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/presupuestos/editar/${presupuesto.id}`}>
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