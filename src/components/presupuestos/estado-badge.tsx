import React from "react"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, XCircle, ClipboardList } from "lucide-react"

type EstadoPresupuesto = "PENDIENTE" | "APROBADO" | "RECHAZADO" | "FACTURADO"

interface EstadoBadgeProps {
  estado: EstadoPresupuesto
  showIcon?: boolean
  className?: string
}

export function EstadoBadge({ estado, showIcon = true, className = "" }: EstadoBadgeProps) {
  const getEstadoConfig = (estado: EstadoPresupuesto) => {
    switch (estado) {
      case "PENDIENTE":
        return {
          variant: "warning" as const,
          icon: <AlertCircle className="h-3.5 w-3.5 mr-1" />,
          label: "Pendiente"
        }
      case "APROBADO":
        return {
          variant: "success" as const,
          icon: <CheckCircle className="h-3.5 w-3.5 mr-1" />,
          label: "Aprobado"
        }
      case "RECHAZADO":
        return {
          variant: "danger" as const,
          icon: <XCircle className="h-3.5 w-3.5 mr-1" />,
          label: "Rechazado"
        }
      case "FACTURADO":
        return {
          variant: "info" as const,
          icon: <ClipboardList className="h-3.5 w-3.5 mr-1" />,
          label: "Facturado"
        }
      default:
        return {
          variant: "default" as const,
          icon: <AlertCircle className="h-3.5 w-3.5 mr-1" />,
          label: estado
        }
    }
  }

  const config = getEstadoConfig(estado)

  return (
    <Badge 
      variant={config.variant} 
      className={`flex items-center ${className}`}
    >
      {showIcon && config.icon}
      {config.label}
    </Badge>
  )
} 