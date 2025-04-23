"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

// Esquema de validación con Zod
const proveedorSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre es obligatorio" }),
  nif: z.string().optional().nullable(),
  direccion: z.string().optional().nullable(),
  email: z.string().email({ message: "Introduzca un email válido" }).optional().nullable(),
  telefono: z.string().optional().nullable(),
  contacto: z.string().optional().nullable(),
  notas: z.string().optional().nullable(),
})

type ProveedorFormValues = z.infer<typeof proveedorSchema>

interface ProveedorFormProps {
  initialData?: {
    id: string
    nombre: string
    nif?: string | null
    direccion?: string | null
    email?: string | null
    telefono?: string | null
    contacto?: string | null
    notas?: string | null
  } | null
  onSubmit: (data: ProveedorFormValues) => void
  isSubmitting?: boolean
}

export function ProveedorForm({ initialData, onSubmit, isSubmitting = false }: ProveedorFormProps) {
  // Inicializar el formulario con react-hook-form y zod
  const form = useForm<ProveedorFormValues>({
    resolver: zodResolver(proveedorSchema),
    defaultValues: {
      nombre: initialData?.nombre || "",
      nif: initialData?.nif || "",
      direccion: initialData?.direccion || "",
      email: initialData?.email || "",
      telefono: initialData?.telefono || "",
      contacto: initialData?.contacto || "",
      notas: initialData?.notas || "",
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Nombre */}
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Nombre del proveedor" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* NIF/CIF */}
        <FormField
          control={form.control}
          name="nif"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NIF/CIF</FormLabel>
              <FormControl>
                <Input {...field} placeholder="NIF o CIF" value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Email de contacto" value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Teléfono */}
          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Teléfono de contacto" value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Dirección */}
        <FormField
          control={form.control}
          name="direccion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Dirección completa" value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Persona de contacto */}
        <FormField
          control={form.control}
          name="contacto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Persona de contacto</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Nombre de la persona de contacto" value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Notas */}
        <FormField
          control={form.control}
          name="notas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notas</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  placeholder="Notas o información adicional" 
                  value={field.value || ""}
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botón de enviar */}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? "Actualizar proveedor" : "Crear proveedor"}
        </Button>
      </form>
    </Form>
  )
} 