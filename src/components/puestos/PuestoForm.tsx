'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { Loader2 } from "lucide-react"
import { useState } from 'react'

// Interfaz local para el tipo Puesto (lo ideal sería usar el tipo generado por Prisma)
interface Puesto {
  id: string;
  nombre: string;
  descripcion: string | null;
  tarifa: number | null;
  createdAt: Date;
  updatedAt: Date;
}

// Zod Schema - Simplificado: tarifa se valida como string opcional compatible con el input
const puestoFormSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre del puesto es obligatorio." }).trim(),
  descripcion: z.string().nullable().optional(), 
  tarifa: z.string().optional().refine((val) => {
    if (val === undefined || val === null || val.trim() === '') return true; // Permitir vacío
    const num = parseFloat(val.replace(',', '.'));
    return !isNaN(num) && num >= 0; // Debe ser un número positivo o cero después de parsear
  }, { message: "La tarifa debe ser un número positivo (ej: 25.50 o 25,50)." }),
});

type PuestoFormValues = z.infer<typeof puestoFormSchema>

interface PuestoFormProps {
  puesto?: Puesto | null; // Puesto existente para editar, o null/undefined para crear
  onSuccess?: () => void; // Callback opcional al éxito
}

export function PuestoForm({ puesto, onSuccess }: PuestoFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!puesto;

  const form = useForm<PuestoFormValues>({
    resolver: zodResolver(puestoFormSchema),
    defaultValues: {
      nombre: puesto?.nombre || "",
      descripcion: puesto?.descripcion ?? null,
      // Default value debe ser string para el input
      tarifa: puesto?.tarifa !== null && puesto?.tarifa !== undefined ? String(puesto.tarifa) : '', 
    },
  });

  const onSubmit: SubmitHandler<PuestoFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      const apiUrl = isEditing ? `/api/puestos/${puesto?.id}` : '/api/puestos';
      const method = isEditing ? "PUT" : "POST";

      // Convertir tarifa a número o null antes de enviar
      let tarifaNumerica: number | null = null;
      if (data.tarifa && data.tarifa.trim() !== '') {
        tarifaNumerica = parseFloat(data.tarifa.replace(',', '.'));
        // Doble check por si acaso, aunque Zod ya validó
        if (isNaN(tarifaNumerica) || tarifaNumerica < 0) {
          throw new Error("Formato de tarifa inválido detectado antes de enviar.")
        }
      }

      const dataToSend = {
        nombre: data.nombre,
        descripcion: data.descripcion,
        tarifa: tarifaNumerica, // Enviar el número parseado o null
      };

      const response = await fetch(apiUrl, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error al ${isEditing ? 'actualizar' : 'crear'} el puesto`);
      }

      toast.success(`Puesto ${isEditing ? 'actualizado' : 'creado'} correctamente`);
      
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/puestos');
        router.refresh();
      }

    } catch (error) {
      console.error("Error en el formulario de puesto:", error);
      toast.error(error instanceof Error ? error.message : "Ocurrió un error inesperado");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del Puesto</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Técnico de Sonido" {...field} />
              </FormControl>
              <FormDescription>
                El nombre identificativo del puesto de trabajo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción (Opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe brevemente las funciones o responsabilidades del puesto..."
                  className="resize-none"
                  {...field}
                  // react-hook-form maneja null como valor vacío para textarea
                  value={field.value ?? ''} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tarifa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tarifa (Opcional)</FormLabel>
              <FormControl>
                <Input 
                  type="text" // Mantener tipo texto para flexibilidad de entrada
                  placeholder="Ej: 25.50 ó 25,50"
                  {...field}
                  // field.value será string (o undefined inicialmente)
                  value={field.value ?? ''} 
                />
              </FormControl>
              <FormDescription>
                Tarifa asociada al puesto (ej: por hora o día). Usa '.' o ',' como separador decimal.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Guardando...</>
          ) : isEditing ? (
            'Guardar Cambios'
          ) : (
            'Crear Puesto'
          )}
        </Button>
      </form>
    </Form>
  )
} 