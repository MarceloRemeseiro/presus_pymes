"use client"

import { useState, useCallback } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { FiltroPeriodo } from "@/components/dashboard/filtro-periodo"
import { ResumenFacturacion } from "@/components/dashboard/resumen-facturacion"
import { ResumenGastos } from "@/components/dashboard/resumen-gastos"
import { TopClientes } from "@/components/dashboard/top-clientes"
import { ResumenFinanciero } from "@/components/dashboard/resumen-financiero"
import { GraficoEvolucion } from "@/components/dashboard/grafico-evolucion"

export default function Home() {
  const [filtros, setFiltros] = useState({
    periodo: 'anual',
    año: new Date().getFullYear(),
  })

  // Usar useCallback para evitar renderizados innecesarios
  const handleFiltrosCambio = useCallback((nuevosFiltros: any) => {
    setFiltros(nuevosFiltros)
  }, [])

  // Nombre de la empresa (en una aplicación real, esto podría venir de una API o contexto)
  const nombreEmpresa = "Presus Pymes"

  return (
    <div className="py-10">
      <h1 className="text-4xl font-bold mb-2">{nombreEmpresa} - Panel de Control</h1>
      <p className="text-muted-foreground mb-8">Supervisa las métricas clave de tu negocio</p>
      
      <FiltroPeriodo onCambio={handleFiltrosCambio} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ResumenFacturacion filtros={filtros} />
        <ResumenGastos filtros={filtros} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ResumenFinanciero filtros={filtros} />
        <GraficoEvolucion filtros={filtros} />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <TopClientes filtros={filtros} />
      </div>
    </div>
  )
}
