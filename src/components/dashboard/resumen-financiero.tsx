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
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CalendarClock
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface ResumenFinancieroProps {
  filtros: {
    periodo: string;
    año: number;
    trimestre?: number;
    mes?: number;
  }
}

interface DatosFinancieros {
  ingresos: number;
  gastos: number;
  beneficio: number;
  margenPorcentaje: number;
  pendienteCobro: number;
  proyeccionIngresos: number;
  evolucionMensual: Array<{
    mes: string;
    ingresos: number;
    gastos: number;
    beneficio: number;
  }>;
}

export function ResumenFinanciero({ filtros }: ResumenFinancieroProps) {
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [datos, setDatos] = useState<DatosFinancieros | null>(null)

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
        
        const respuesta = await fetch(`/api/estadisticas/financieras?${params.toString()}`)
        
        if (!respuesta.ok) {
          throw new Error('Error al obtener datos financieros')
        }
        
        const data = await respuesta.json()
        setDatos(data.financieras)
      } catch (error) {
        console.error('Error al cargar datos:', error)
        setError('No se pudieron cargar los datos financieros')
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
          <CardTitle>Finanzas</CardTitle>
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
          <DollarSign className="h-5 w-5 text-primary" />
          <span>Resumen Financiero</span>
        </CardTitle>
        <CardDescription>
          Balance financiero {filtros.periodo === 'anual' 
            ? `del año ${filtros.año}` 
            : filtros.periodo === 'trimestral' 
              ? `del ${filtros.trimestre}º trimestre de ${filtros.año}`
              : `de ${new Date(filtros.año, (filtros.mes ? filtros.mes -1 : 0)).toLocaleString('es-ES', { month: 'long' })} de ${filtros.año}`
          }. Ingresos (sin IVA) vs Coste Total de Gastos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Margen de beneficio */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span>Margen de Beneficio</span>
            </h3>
            {cargando ? (
              <Skeleton className="h-8 w-full" />
            ) : (
              <div className="flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">
                      {formatearMoneda(datos?.beneficio || 0)}
                    </span>
                    <span className={`text-sm font-medium px-2 py-0.5 rounded-md ${datos?.beneficio && datos.beneficio > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {datos?.margenPorcentaje ? Math.round(datos.margenPorcentaje * 10) / 10 : 0}%
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ingresos (sin IVA): {formatearMoneda(datos?.ingresos || 0)} | 
                    Coste Total Gastos: {formatearMoneda(datos?.gastos || 0)}
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full flex items-center justify-center">
                  {datos?.beneficio && datos.beneficio > 0 ? (
                    <ArrowUpRight className="h-5 w-5 text-green-600" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5 text-red-600" />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Pendiente de cobro */}
          <div className="space-y-2 pt-4 border-t">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Pendiente de Cobro (con IVA)</span>
            </h3>
            {cargando ? (
              <Skeleton className="h-8 w-full" />
            ) : (
              <div className="flex justify-between items-end">
                <span className="text-xl font-bold text-amber-500">
                  {formatearMoneda(datos?.pendienteCobro || 0)}
                </span>
                {datos?.ingresos && datos.ingresos > 0 && (
                  <span className="text-sm text-muted-foreground">
                    {Math.round((datos?.pendienteCobro || 0) / datos.ingresos * 100)}% del total facturado
                  </span>
                )}
              </div>
            )}
          </div>
          
          {/* Proyección de ingresos */}
          <div className="space-y-2 pt-4 border-t">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-1">
              <CalendarClock className="h-4 w-4" />
              <span>Proyección de Ingresos (sin IVA)</span>
            </h3>
            {cargando ? (
              <Skeleton className="h-8 w-full" />
            ) : (
              <div className="flex justify-between items-end">
                <span className="text-xl font-bold text-blue-600">
                  {formatearMoneda(datos?.proyeccionIngresos || 0)}
                </span>
                <span className="text-sm text-muted-foreground">
                  Basado en presupuestos aprobados
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 