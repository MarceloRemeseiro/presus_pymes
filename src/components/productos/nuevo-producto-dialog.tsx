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

interface NuevoProductoDialogProps {
  categorias: { id: string; nombre: string }[]
  marcas: { id: string; nombre: string }[]
  trigger?: React.ReactNode
  onSuccess?: () => void
}

export function NuevoProductoDialog({ 
  categorias,
  marcas,
  trigger,
  onSuccess
}: NuevoProductoDialogProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleSubmit = async (data: ProductoFormValues) => {
    try {
      console.log("Datos del formulario:", data)
      
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
        // Agregamos un precio de venta por defecto (que ya no se usará)
        precio: data.precioAlquiler || 0,
        // Aseguramos que el stock inicial sea siempre 0
        stock: 0,
        marcaId: data.marcaId === "" ? null : data.marcaId,
        marcaNombre: data.marcaNombre === "" ? null : data.marcaNombre
      }

      const response = await fetch("/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al crear el producto")
      }

      // Mostrar mensaje de éxito
      toast.success("Producto creado correctamente")
      
      // Cerrar el diálogo
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
      toast.error(error instanceof Error ? error.message : "Error al crear el producto")
      throw error
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Agregar Producto</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Agregar nuevo producto</DialogTitle>
          <DialogDescription>
            Complete los datos del producto y haga clic en guardar cuando termine.
          </DialogDescription>
        </DialogHeader>
        <ProductoForm 
          categorias={categorias}
          marcas={marcas}
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
} 