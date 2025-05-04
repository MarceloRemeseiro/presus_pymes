"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Definimos los tipos para nuestras props
type SortDirection = "asc" | "desc" | null
type SortConfig = {
  key: string
  direction: SortDirection
}

interface DataTableProps<T> {
  columns: {
    key: string
    header: string
    cell: (item: T) => React.ReactNode
    sortable?: boolean
    defaultSort?: "asc" | "desc"
  }[]
  data: T[]
  className?: string
}

export function DataTable<T extends Record<string, any>>({ 
  columns, 
  data,
  className 
}: DataTableProps<T>) {
  // Encontrar la columna con ordenamiento por defecto
  const defaultSortColumn = columns.find(col => col.defaultSort)
  
  const [sortConfig, setSortConfig] = useState<SortConfig>({ 
    key: defaultSortColumn?.key || "", 
    direction: defaultSortColumn?.defaultSort || null 
  })

  const handleSort = (key: string) => {
    let direction: SortDirection = "asc"
    
    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc"
      } else if (sortConfig.direction === "desc") {
        direction = null
      }
    }
    
    setSortConfig({ key, direction })
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.direction || !sortConfig.key) {
      return 0
    }

    const key = sortConfig.key
    
    // Manejar propiedades anidadas (por ejemplo, "cliente.nombre")
    const getNestedValue = (obj: any, path: string) => {
      return path.split('.').reduce((acc, part) => acc && acc[part], obj)
    }
    
    const aValue = getNestedValue(a, key)
    const bValue = getNestedValue(b, key)

    if (aValue === bValue) {
      return 0
    }

    // Manejar diferentes tipos de datos
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortConfig.direction === "asc" 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }

    // Manejar números y fechas
    return sortConfig.direction === "asc" 
      ? (aValue > bValue ? 1 : -1)
      : (aValue > bValue ? -1 : 1)
  })

  // Renderizar el ícono de ordenación adecuado
  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />
    }
    
    if (sortConfig.direction === "asc") {
      return <ArrowUp className="ml-2 h-4 w-4" />
    }
    
    if (sortConfig.direction === "desc") {
      return <ArrowDown className="ml-2 h-4 w-4" />
    }
    
    return <ArrowUpDown className="ml-2 h-4 w-4" />
  }

  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key}>
              {column.sortable ? (
                <Button
                  variant="ghost"
                  onClick={() => handleSort(column.key)}
                  className="h-auto font-medium flex item-center  text-muted-foreground justify-start hover:bg-transparent hover:text-foreground"
                >
                  {column.header}
                  {getSortIcon(column.key)}
                </Button>
              ) : (
                column.header
              )}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="h-24 text-center"
            >
              No hay datos disponibles
            </TableCell>
          </TableRow>
        ) : (
          sortedData.map((item, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.cell(item)}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
} 