"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// Componente StringField personalizado para manejar strings null/undefined
function StringField({ field, placeholder }: { field: any, placeholder: string }) {
  return (
    <Input 
      placeholder={placeholder} 
      value={field.value || ""}
      onChange={(e) => field.onChange(e.target.value || null)}
      onBlur={field.onBlur}
      disabled={field.disabled}
      name={field.name}
      ref={field.ref}
    />
  )
}

const productoSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  marcaId: z.string().nullable().optional(),
  marcaNombre: z.string().optional(),
  modelo: z.string().nullable().optional(),
  descripcion: z.string().nullable().optional(),
  precioAlquiler: z.coerce.number().min(0, "El precio de alquiler no puede ser negativo").nullable().optional(),
  categoriaId: z.string().min(1, "La categoría es obligatoria"),
  categoriaNombre: z.string().min(1, "El nombre de la categoría es obligatorio"),
})

export type ProductoFormValues = z.infer<typeof productoSchema>

interface ProductoFormProps {
  initialData?: ProductoFormValues
  categorias?: { id: string; nombre: string }[]
  marcas?: { id: string; nombre: string }[]
  onSubmit: (data: ProductoFormValues) => void
  onCancel?: () => void
}

export function ProductoForm({ 
  initialData,
  categorias = [],
  marcas = [],
  onSubmit,
  onCancel
}: ProductoFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  const form = useForm<ProductoFormValues>({
    resolver: zodResolver(productoSchema),
    defaultValues: initialData || {
      nombre: "",
      marcaId: null,
      marcaNombre: "",
      modelo: null,
      descripcion: null,
      precioAlquiler: null,
      categoriaId: "",
      categoriaNombre: "",
    }
  })

  const handleSubmit = async (data: ProductoFormValues) => {
    try {
      setIsLoading(true)
      await onSubmit(data)
      router.refresh()
    } catch (error) {
      console.error("Error al guardar producto:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del producto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="categoriaId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoría</FormLabel>
                <FormControl>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={field.value || ""}
                    onChange={(e) => {
                      const value = e.target.value === "" ? null : e.target.value;
                      field.onChange(value);
                      if (e.target.value) {
                        const selectedCategoria = categorias.find(c => c.id === e.target.value)
                        if (selectedCategoria) {
                          form.setValue("categoriaNombre", selectedCategoria.nombre)
                        }
                      } else {
                        form.setValue("categoriaNombre", "")
                      }
                    }}
                    onBlur={field.onBlur}
                    disabled={field.disabled}
                    name={field.name}
                    ref={field.ref}
                  >
                    <option value="">Seleccionar categoría</option>
                    {categorias.map((categoria) => (
                      <option key={categoria.id} value={categoria.id}>
                        {categoria.nombre}
                      </option>
                    ))}
                    <option value="nueva">+ Nueva categoría</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {form.watch("categoriaId") === "nueva" && (
          <FormField
            control={form.control}
            name="categoriaNombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de Nueva Categoría</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre de la categoría" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="marcaId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marca</FormLabel>
                <FormControl>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={field.value || ""}
                    onChange={(e) => {
                      const value = e.target.value === "" ? null : e.target.value;
                      field.onChange(value);
                      if (e.target.value) {
                        const selectedMarca = marcas.find(m => m.id === e.target.value)
                        if (selectedMarca) {
                          form.setValue("marcaNombre", selectedMarca.nombre)
                        }
                      } else {
                        form.setValue("marcaNombre", "")
                      }
                    }}
                    onBlur={field.onBlur}
                    disabled={field.disabled}
                    name={field.name}
                    ref={field.ref}
                  >
                    <option value="">Seleccionar marca</option>
                    {marcas.map((marca) => (
                      <option key={marca.id} value={marca.id}>
                        {marca.nombre}
                      </option>
                    ))}
                    <option value="nueva">+ Nueva marca</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {form.watch("marcaId") === "nueva" && (
            <FormField
              control={form.control}
              name="marcaNombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de Nueva Marca</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre de la marca" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          <FormField
            control={form.control}
            name="modelo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modelo</FormLabel>
                <FormControl>
                  <StringField field={field} placeholder="Modelo del producto" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="precioAlquiler"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio de Alquiler</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    placeholder="0.00" 
                    {...field} 
                    value={field.value === null ? "" : field.value}
                    onChange={(e) => {
                      const value = e.target.value === "" ? null : parseFloat(e.target.value)
                      field.onChange(value)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <StringField field={field} placeholder="Descripción del producto" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
            
        <div className="flex justify-end gap-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Guardando..." : "Guardar producto"}
          </Button>
        </div>
      </form>
    </Form>
  )
} 