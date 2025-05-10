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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Esquema de validación con Zod
const clienteSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre es obligatorio" }),
  nif: z.string().optional().nullable(),
  esIntracomunitario: z.boolean().optional(),
  direccion: z.string().optional().nullable(),
  ciudad: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  telefono: z.string().optional().nullable(),
  tipo: z.enum(["EMPRESA", "PARTICULAR"]),
})

export type ClienteFormValues = z.infer<typeof clienteSchema>

interface ClienteFormProps {
  initialData?: {
    id: string
    nombre: string
    nif?: string | null
    esIntracomunitario?: boolean
    direccion?: string | null
    ciudad?: string | null
    email?: string | null
    telefono?: string | null
    tipo: "EMPRESA" | "PARTICULAR"
  } | null
  onSubmit: (data: ClienteFormValues) => void
  isSubmitting?: boolean
}

export function ClienteForm({ initialData, onSubmit, isSubmitting = false }: ClienteFormProps) {
  // Inicializar el formulario con react-hook-form y zod
  const form = useForm<ClienteFormValues>({
    resolver: zodResolver(clienteSchema),
    defaultValues: {
      nombre: initialData?.nombre || "",
      nif: initialData?.nif || "",
      esIntracomunitario: initialData?.esIntracomunitario || false,
      direccion: initialData?.direccion || "",
      ciudad: initialData?.ciudad || "",
      email: initialData?.email || "",
      telefono: initialData?.telefono || "",
      tipo: initialData?.tipo || "EMPRESA",
    }
  })

  // Observar el valor de esIntracomunitario para cambiar la etiqueta del NIF
  const esIntracomunitario = form.watch("esIntracomunitario");

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
                <Input {...field} placeholder="Nombre del cliente" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tipo de cliente */}
        <FormField
          control={form.control}
          name="tipo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de cliente</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="EMPRESA">Empresa</SelectItem>
                  <SelectItem value="PARTICULAR">Autónomo</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Es Intracomunitario (Checkbox) */}
        <FormField
          control={form.control}
          name="esIntracomunitario"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Cliente Intracomunitario (operación exenta de IVA)
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        {/* NIF/CIF o VAT Number */}
        <FormField
          control={form.control}
          name="nif"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{esIntracomunitario ? "VAT Number (Intracomunitario)" : "NIF/CIF"}</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder={esIntracomunitario ? "Ej: DE123456789" : "NIF o CIF"} 
                  value={field.value || ""} 
                />
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
        <h2>Dirección</h2>
        <FormField
          control={form.control}
          name="direccion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Calle y numero</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Dirección completa" value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ciudad"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CP y Ciudad</FormLabel>
              <FormControl>
                <Input {...field} placeholder="codigo postal y ciudad" value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botón de enviar */}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? "Actualizar cliente" : "Crear cliente"}
        </Button>
      </form>
    </Form>
  )
} 