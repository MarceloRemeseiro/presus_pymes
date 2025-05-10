"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ClienteForm } from "@/components/clientes/cliente-form"
import { toast, Toaster } from "sonner"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Importar el tipo desde el componente del formulario
import { type ClienteFormValues } from "@/components/clientes/cliente-form";

export default function NuevoClientePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: ClienteFormValues) => {
    try {
      setIsSubmitting(true)
      
      // Asegurarse de que esIntracomunitario se envíe, incluso si es false
      const dataToSend = {
        ...data,
        esIntracomunitario: data.esIntracomunitario || false,
      };

      const response = await fetch("/api/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al crear el cliente")
      }
      
      toast.success("Cliente creado correctamente")
      
      // Redirigir a la lista de clientes
      setTimeout(() => {
        router.push("/clientes")
      }, 1000)
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : "Error al crear el cliente")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-10">
      <div className="flex items-center mb-8">
        <Button variant="outline" size="icon" asChild className="mr-4">
          <Link href="/clientes">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Nuevo Cliente</h1>
      </div>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Información del Cliente</CardTitle>
          <CardDescription>
            Añade los datos del nuevo cliente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ClienteForm 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting} 
          />
        </CardContent>
      </Card>
      
      <Toaster />
    </div>
  )
} 