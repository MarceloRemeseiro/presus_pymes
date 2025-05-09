"use client"

import { useState, useEffect } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import {
  Users,
  Crown,
  BadgeDollarSign,
  FileText,
  ArrowUpDown
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface TopClientesProps {
  filtros: {
    periodo: string;
    año: number;
    trimestre?: number;
    mes?: number;
  }
}

interface ClienteEstadisticas {
  id: string;
  nombre: string;
  nif: string | null;
  tipo: string;
  estadisticas: {
    totalFacturado: number;
    numeroFacturas: number;
    facturasCompletadas: number;
    facturasPendientes: number;
    promedioFactura: number;
    tasaCompletado: number;
  }
}

export function TopClientes({ filtros }: TopClientesProps) {
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [clientes, setClientes] = useState<ClienteEstadisticas[]>([])
  const [criterioOrden, setCriterioOrden] = useState<string>('facturacion')

  useEffect(() => {
    const obtenerDatos = async () => {
      setCargando(true)
      setError(null)
      
      try {
        // Construir parámetros de consulta
        const params = new URLSearchParams()
        params.append('periodo', filtros.periodo)
        params.append('año', filtros.año.toString())
        params.append('ordenarPor', criterioOrden)
        params.append('limite', '5')
        
        if (filtros.periodo === 'trimestral' && filtros.trimestre) {
          params.append('trimestre', filtros.trimestre.toString())
        }
        
        if (filtros.periodo === 'mensual' && filtros.mes) {
          params.append('mes', filtros.mes.toString())
        }
        
        const respuesta = await fetch(`/api/estadisticas/clientes?${params.toString()}`)
        
        if (!respuesta.ok) {
          throw new Error('Error al obtener datos de clientes')
        }
        
        const data = await respuesta.json()
        setClientes(data.clientes)
      } catch (error) {
        console.error('Error al cargar datos:', error)
        setError('No se pudieron cargar los datos de clientes')
      } finally {
        setCargando(false)
      }
    }
    
    obtenerDatos()
  }, [filtros, criterioOrden])

  // Función para formatear moneda
  const formatearMoneda = (valor: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(valor)
  }

  const cambiarOrden = () => {
    setCriterioOrden(criterioOrden === 'facturacion' ? 'numero_facturas' : 'facturacion')
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Clientes</CardTitle>
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
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <span>Top Clientes</span>
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={cambiarOrden}
            className="h-8"
            disabled={cargando}
          >
            <ArrowUpDown className="h-4 w-4 mr-1" />
            {criterioOrden === 'facturacion' ? 'Por facturación' : 'Por cantidad'}
          </Button>
        </div>
        <CardDescription>
          Mejores clientes {filtros.periodo === 'anual' 
            ? `del año ${filtros.año}` 
            : filtros.periodo === 'trimestral' 
              ? `del ${filtros.trimestre}º trimestre de ${filtros.año}`
              : `de ${new Date(filtros.año, (filtros.mes || 1) - 1).toLocaleString('es-ES', { month: 'long' })} de ${filtros.año}`
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {cargando ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : clientes.length > 0 ? (
          <div className="space-y-6">
            {clientes.map((cliente, index) => (
              <div key={cliente.id} className="flex items-start gap-4">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                  {index === 0 ? (
                    <Crown className="h-5 w-5" />
                  ) : (
                    <span className="font-bold">{index + 1}</span>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">
                        <Link href={`/clientes/${cliente.id}`} className="hover:underline">
                          {cliente.nombre}
                        </Link>
                      </h3>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <Badge variant="outline">{cliente.tipo}</Badge>
                        {cliente.nif && <span>{cliente.nif}</span>}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{formatearMoneda(cliente.estadisticas.totalFacturado)}</div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <FileText className="h-3.5 w-3.5" />
                        <span>{cliente.estadisticas.numeroFacturas} facturas</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <BadgeDollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>Promedio: {formatearMoneda(cliente.estadisticas.promedioFactura)}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-green-600">{Math.round(cliente.estadisticas.tasaCompletado)}% cobrado</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No hay datos de clientes para este período</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <Button variant="outline" asChild>
          <Link href="/clientes">
            Ver todos los clientes
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
} 