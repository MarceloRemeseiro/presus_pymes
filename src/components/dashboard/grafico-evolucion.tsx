"use client"

import { useState, useEffect, useMemo } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import {
  BarChart3,
  TrendingUp
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface GraficoEvolucionProps {
  filtros: {
    periodo: string;
    año: number;
    trimestre?: number;
    mes?: number;
  }
}

interface DatosMensuales {
  mes: string;
  ingresos: number;
  gastos: number;
  beneficio: number;
}

export function GraficoEvolucion({ filtros }: GraficoEvolucionProps) {
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [datos, setDatos] = useState<DatosMensuales[]>([])

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
          throw new Error('Error al obtener datos de evolución')
        }
        
        const data = await respuesta.json()
        setDatos(data.financieras.evolucionMensual)
      } catch (error) {
        console.error('Error al cargar datos:', error)
        setError('No se pudieron cargar los datos de evolución')
      } finally {
        setCargando(false)
      }
    }
    
    obtenerDatos()
  }, [filtros])

  // Encontrar el valor máximo para escalar el gráfico
  const valorMaximo = useMemo(() => {
    if (!datos.length) return 100;
    const valores = datos.flatMap(d => [d.ingresos, d.gastos]);
    return Math.max(...valores, 100); // Mínimo 100 para evitar divisiones por cero
  }, [datos]);

  // Formatear moneda para tooltips
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
          <CardTitle>Evolución</CardTitle>
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
          <BarChart3 className="h-5 w-5 text-primary" />
          <span>Evolución Temporal</span>
        </CardTitle>
        <CardDescription>
          Comparativa de ingresos vs gastos {filtros.periodo === 'anual' 
            ? `del año ${filtros.año}` 
            : filtros.periodo === 'trimestral' 
              ? `del ${filtros.trimestre}º trimestre de ${filtros.año}`
              : `de ${new Date(filtros.año, (filtros.mes || 1) - 1).toLocaleString('es-ES', { month: 'long' })} de ${filtros.año}`
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {cargando ? (
          <div className="h-[300px] w-full">
            <Skeleton className="h-full w-full" />
          </div>
        ) : datos.length > 0 ? (
          <div className="h-[300px] w-full">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-sm">Ingresos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive"></div>
                <span className="text-sm">Gastos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm">Beneficio</span>
              </div>
            </div>
            
            <div className="flex h-[220px] items-end space-x-2">
              {datos.map((datoMes, index) => (
                <div 
                  key={index} 
                  className="flex-1 flex flex-col items-center"
                >
                  <div 
                    className="relative w-full group"
                    style={{ height: `${Math.max(0, Math.min(100, (datoMes.beneficio / valorMaximo) * 100))}%` }}
                  >
                    <div 
                      className="absolute inset-x-0 bottom-0 bg-green-500 w-full rounded-t"
                      style={{ height: `100%` }}
                    ></div>
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                      Beneficio: {formatearMoneda(datoMes.beneficio)}
                    </div>
                  </div>

                  <div className="flex w-full">
                    <div 
                      className="relative w-1/2 group"
                      style={{ height: `${Math.max(0, Math.min(100, (datoMes.ingresos / valorMaximo) * 100))}%` }}
                    >
                      <div 
                        className="absolute inset-x-0 bottom-0 bg-primary w-full"
                        style={{ height: `100%` }}
                      ></div>
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                        Ingresos: {formatearMoneda(datoMes.ingresos)}
                      </div>
                    </div>

                    <div 
                      className="relative w-1/2 group"
                      style={{ height: `${Math.max(0, Math.min(100, (datoMes.gastos / valorMaximo) * 100))}%` }}
                    >
                      <div 
                        className="absolute inset-x-0 bottom-0 bg-destructive w-full"
                        style={{ height: `100%` }}
                      ></div>
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                        Gastos: {formatearMoneda(datoMes.gastos)}
                      </div>
                    </div>
                  </div>

                  <div className="text-xs mt-2 text-center">{datoMes.mes}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-[300px] w-full flex items-center justify-center">
            <p className="text-muted-foreground">No hay datos disponibles para este período</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 