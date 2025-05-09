"use client"

import { useState, useEffect } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import {
  CircleDollarSign,
  TrendingUp,
  Clock,
  Check
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface ResumenFacturacionProps {
  filtros: {
    periodo: string;
    año: number;
    trimestre?: number;
    mes?: number;
  }
}

interface DatosFacturacion {
  total: number;
  pendienteCobro: number;
  totalCobrado: number;
  numeroFacturas: number;
  promedioFactura: number;
}

export function ResumenFacturacion({ filtros }: ResumenFacturacionProps) {
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [datos, setDatos] = useState<DatosFacturacion | null>(null)

  useEffect(() => {
    const obtenerDatos = async () => {
      setCargando(true)
      setError(null)
      
      try {
        // Construir parámetros de consulta
        const params = new URLSearchParams()
        params.append('periodo', filtros.periodo)
        params.append('año', filtros.año.toString())
        
        if (filtros.periodo === 'trimestral' && filtros.trimestre) {
          params.append('trimestre', filtros.trimestre.toString())
        }
        
        if (filtros.periodo === 'mensual' && filtros.mes) {
          params.append('mes', filtros.mes.toString())
        }
        
        const respuesta = await fetch(`/api/estadisticas/facturacion?${params.toString()}`)
        
        if (!respuesta.ok) {
          throw new Error('Error al obtener datos de facturación')
        }
        
        const data = await respuesta.json()
        setDatos(data.facturacion)
      } catch (error) {
        console.error('Error al cargar datos:', error)
        setError('No se pudieron cargar los datos de facturación')
      } finally {
        setCargando(false)
      }
    }
    
    obtenerDatos()
  }, [filtros])

  // Función para formatear moneda
  const formatearMoneda = (valor: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(valor)
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Facturación</CardTitle>
          <CardDescription>Error al cargar datos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-destructive">{error}</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CircleDollarSign className="h-5 w-5 text-primary" />
          <span>Facturación</span>
        </CardTitle>
        <CardDescription>
          Resumen de facturación {filtros.periodo === 'anual' 
            ? `del año ${filtros.año}` 
            : filtros.periodo === 'trimestral' 
              ? `del ${filtros.trimestre}º trimestre de ${filtros.año}`
              : `de ${new Date(filtros.año, (filtros.mes || 1) - 1).toLocaleString('es-ES', { month: 'long' })} de ${filtros.año}`
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total facturado</h3>
            {cargando ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <p className="text-2xl font-bold">{formatearMoneda(datos?.total || 0)}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Pendiente de cobro</h3>
            {cargando ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <p className="text-2xl font-bold text-amber-500">{formatearMoneda(datos?.pendienteCobro || 0)}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-1">
              <Check className="h-4 w-4" />
              <span>Cobrado</span>
            </h3>
            {cargando ? (
              <Skeleton className="h-8 w-full" />
            ) : (
              <p className="text-xl font-semibold text-green-600">{formatearMoneda(datos?.totalCobrado || 0)}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span>Promedio por factura</span>
            </h3>
            {cargando ? (
              <Skeleton className="h-8 w-full" />
            ) : (
              <p className="text-xl font-semibold">{formatearMoneda(datos?.promedioFactura || 0)}</p>
            )}
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total facturas</span>
            {cargando ? (
              <Skeleton className="h-6 w-16" />
            ) : (
              <span className="font-medium">{datos?.numeroFacturas || 0}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 