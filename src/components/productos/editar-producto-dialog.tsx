"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ProductoForm, ProductoFormValues } from "./producto-form"

interface EditarProductoDialogProps {
  producto: {
    id: string
    nombre: string
    descripcion?: string | null
    categoriaId: string
    categoria: { id: string; nombre: string }
    marca?: { id: string; nombre: string } | null
    marcaId?: string | null
    modelo?: string | null
    stock: number
    precio: number
    precioCompra?: number | null
    precioAlquiler?: number | null
  }
  categorias: { id: string; nombre: string }[]
  marcas: { id: string; nombre: string }[]
  trigger?: React.ReactNode
  onSuccess?: () => void
}

export function EditarProductoDialog({
  producto,
  categorias,
  marcas,
  trigger,
  onSuccess
}: EditarProductoDialogProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleSubmit = async (data: ProductoFormValues) => {
    try {
      console.log("Datos de edición:", data)
      
      // Determinar si estamos creando una nueva categoría
      if (data.categoriaId === "nueva") {
        // Generar un ID único para la nueva categoría
        data.categoriaId = crypto.randomUUID()
      }

      // Manejo específico para marcas
      if (data.marcaId === "nueva") {
        if (data.marcaNombre) {
          // Si seleccionó "Nueva marca" y proporcionó un nombre, generamos un ID
          data.marcaId = crypto.randomUUID()
        } else {
          // Si no proporcionó un nombre, eliminamos la referencia a la marca
          data.marcaId = ""
          data.marcaNombre = ""
        }
      } else if (!data.marcaId) {
        // Si no seleccionó ninguna marca, asegurarse de que sea una cadena vacía
        data.marcaId = ""
        data.marcaNombre = ""
      }

      // Conversión de datos para enviar a la API
      const apiData = {
        ...data,
        // Mantener el precio de venta para compatibilidad con el esquema
        precio: data.precioAlquiler || 0,
        // Mantener el stock existente (no lo modificamos aquí)
        stock: producto.stock,
        modelo: data.modelo,
        marcaId: data.marcaId === "" ? null : data.marcaId,
        marcaNombre: data.marcaNombre === "" ? null : data.marcaNombre
      }

      const response = await fetch(`/api/productos/${producto.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al actualizar el producto")
      }
      
      // Mostrar mensaje de éxito
      toast.success("Producto actualizado correctamente")
      
      // Cerrar diálogo
      setOpen(false)
      
      // Llamar a la función de éxito si existe
      if (onSuccess) {
        onSuccess()
      } else {
        // Si no hay callback de éxito, refrescar la página
        router.refresh()
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : "Error al actualizar el producto")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || <Button variant="outline" size="icon"><span className="sr-only">Editar</span>✏️</Button>}</DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Editar producto</DialogTitle>
          <DialogDescription>
            Actualice los datos del producto y haga clic en guardar cuando termine.
          </DialogDescription>
        </DialogHeader>
        <ProductoForm
          categorias={categorias}
          marcas={marcas}
          initialData={{
            nombre: producto.nombre,
            descripcion: producto.descripcion ?? "",
            categoriaId: producto.categoriaId,
            categoriaNombre: producto.categoria.nombre,
            marcaId: producto.marcaId ?? "",
            marcaNombre: producto.marca?.nombre ?? "",
            modelo: producto.modelo ?? "",
            precioAlquiler: producto.precioAlquiler,
          }}
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
} 