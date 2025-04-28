"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Loader2 } from "lucide-react"
import { Proveedor } from "@/hooks/use-proveedores"

interface PresupuestoProveedorFormProps {
  presupuestoId: string
  proveedores: Proveedor[]
  presupuestoProveedorId?: string
  onSuccess: (data: any) => void
  onCancel: () => void
}

export function PresupuestoProveedorForm({
  presupuestoId,
  proveedores,
  presupuestoProveedorId,
  onSuccess,
  onCancel
}: PresupuestoProveedorFormProps) {
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [precio, setPrecio] = useState("")
  const [precioConIVA, setPrecioConIVA] = useState(false)
  const [proveedorId, setProveedorId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  // Cargar datos existentes si es modo edición
  useEffect(() => {
    if (presupuestoProveedorId) {
      setIsEditing(true)
      setIsLoading(true)

      const fetchData = async () => {
        try {
          const response = await fetch(`/api/presupuestos/proveedores/${presupuestoProveedorId}`)
          if (!response.ok) {
            throw new Error("Error al cargar datos del presupuesto de proveedor")
          }

          const data = await response.json()
          
          setNombre(data.nombre || "")
          setDescripcion(data.descripcion || "")
          setPrecio(data.precio?.toString() || "")
          setPrecioConIVA(data.precioConIVA || false)
          setProveedorId(data.proveedorId || "")
        } catch (error) {
          console.error("Error:", error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchData()
    }
  }, [presupuestoProveedorId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = {
        presupuestoId,
        nombre,
        descripcion: descripcion || null,
        precio: parseFloat(precio),
        precioConIVA,
        proveedorId: proveedorId || null
      }

      const url = isEditing
        ? `/api/presupuestos/proveedores/${presupuestoProveedorId}`
        : "/api/presupuestos/proveedores"
      
      const method = isEditing ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al guardar el presupuesto de proveedor")
      }

      const data = await response.json()
      onSuccess(data)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading && isEditing) {
    return (
      <div className="flex justify-center items-center p-6">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Cargando datos...</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="nombre">Nombre/Concepto*</Label>
        <Input
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: Alquiler de equipo, Servicio de..."
          required
        />
      </div>

      <div>
        <Label htmlFor="descripcion">Descripción</Label>
        <Textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción detallada (opcional)"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="precio">Precio*</Label>
          <Input
            id="precio"
            type="number"
            step="0.01"
            min="0"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="0.00"
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="precioConIVA"
            checked={precioConIVA}
            onCheckedChange={setPrecioConIVA}
          />
          <Label htmlFor="precioConIVA">Precio incluye IVA</Label>
        </div>
      </div>

      <div>
        <Label htmlFor="proveedor">Proveedor (opcional)</Label>
        <select
          id="proveedor"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={proveedorId}
          onChange={(e) => setProveedorId(e.target.value)}
        >
          <option value="">Sin proveedor</option>
          {proveedores.map((proveedor) => (
            <option key={proveedor.id} value={proveedor.id}>
              {proveedor.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Guardando...
            </>
          ) : (
            isEditing ? "Actualizar" : "Guardar"
          )}
        </Button>
      </div>
    </form>
  )
} 