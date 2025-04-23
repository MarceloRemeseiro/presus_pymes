"use client"

import React from "react"
import { Alert, AlertTitle, AlertDescription, AlertIcon } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react"

export function EjemploAlert() {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold mb-4">Ejemplos de Alertas</h2>
      
      <Alert variant="default">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Alerta por defecto</AlertTitle>
        <AlertDescription>
          Este es un mensaje de alerta predeterminado con estilo neutro.
        </AlertDescription>
      </Alert>
      
      <Alert variant="destructive">
        <XCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Ha ocurrido un error en la operación solicitada.
        </AlertDescription>
      </Alert>
      
      <Alert variant="success">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Éxito</AlertTitle>
        <AlertDescription>
          La operación se ha completado correctamente.
        </AlertDescription>
      </Alert>
      
      <Alert variant="warning">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Advertencia</AlertTitle>
        <AlertDescription>
          Hay elementos que requieren su atención.
        </AlertDescription>
      </Alert>
      
      <Alert variant="info">
        <Info className="h-4 w-4" />
        <AlertTitle>Información</AlertTitle>
        <AlertDescription>
          Esto es un mensaje informativo que no requiere acción.
        </AlertDescription>
      </Alert>
    </div>
  )
} 