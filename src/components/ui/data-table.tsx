"use client"

import { useState, useMemo } from "react"
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react"
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
  itemsPerPage?: number // Prop opcional para configurar items por página
}

export function DataTable<T extends Record<string, any>>({
  columns, 
  data,
  className, 
  itemsPerPage: initialItemsPerPage = 10 // Valor por defecto si no se proporciona
}: DataTableProps<T>) {
  // Encontrar la columna con ordenamiento por defecto
  const defaultSortColumn = columns.find(col => col.defaultSort)
  
  const [sortConfig, setSortConfig] = useState<SortConfig>({ 
    key: defaultSortColumn?.key || (columns.length > 0 ? columns[0].key : ""), // Usar la primera columna si no hay default
    direction: defaultSortColumn?.defaultSort || null 
  })
  
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage)

  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortConfig.direction && sortConfig.key) {
      sortableData.sort((a, b) => {
        const key = sortConfig.key;
        const getNestedValue = (obj: any, path: string) => {
          return path.split('.').reduce((acc, part) => acc && acc[part], obj);
        };
        const aValue = getNestedValue(a, key);
        const bValue = getNestedValue(b, key);

        if (aValue === bValue) return 0;
        if (aValue === null || aValue === undefined) return sortConfig.direction === 'asc' ? -1 : 1;
        if (bValue === null || bValue === undefined) return sortConfig.direction === 'asc' ? 1 : -1;

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "asc" 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return sortConfig.direction === "asc" 
          ? (aValue > bValue ? 1 : -1)
          : (aValue > bValue ? -1 : 1);
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = useMemo(() => sortedData.slice(startIndex, endIndex), [sortedData, startIndex, endIndex]);

  const handleSort = (key: string) => {
    let direction: SortDirection = "asc";
    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") direction = "desc";
      else if (sortConfig.direction === "desc") direction = null;
    }
    setSortConfig({ key, direction });
    setCurrentPage(1); // Resetear a la primera página al ordenar
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Renderizar el ícono de ordenación adecuado
  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key || !sortConfig.direction) {
      return <ArrowUpDown className="ml-2 h-4 w-4 opacity-30" />;
    }
    if (sortConfig.direction === "asc") {
      return <ArrowUp className="ml-2 h-4 w-4" />;
    }
    if (sortConfig.direction === "desc") {
      return <ArrowDown className="ml-2 h-4 w-4" />;
    }
    return null; // No debería llegar aquí, pero TS lo necesita
  };

  return (
    <div> {/* Envolvemos todo en un div para añadir los controles */} 
      <Table className={className}>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>
                {column.sortable ? (
                  <Button
                    variant="ghost"
                    onClick={() => handleSort(column.key)}
                    className="h-auto px-2 py-1 font-medium flex item-center text-muted-foreground justify-start hover:bg-transparent hover:text-foreground"
                  >
                    {column.header}
                    {getSortIcon(column.key)}
                  </Button>
                ) : (
                  <span className="px-2 py-1 font-medium text-muted-foreground">{column.header}</span>
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                No hay datos disponibles
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((item, index) => (
              <TableRow key={item.id || index}>{/* Ensure no whitespace here */
                columns.map((column) => (
                  <TableCell key={column.key}>{column.cell(item)}</TableCell>
                ))
              }</TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Controles de Paginación */}
      {totalPages > 1 && (
         <div className="flex items-center justify-end space-x-2 py-4">
          <span className="text-sm text-muted-foreground">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1"/>
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Siguiente
            <ChevronRight className="h-4 w-4 ml-1"/>
          </Button>
        </div>
      )}
    </div>
  );
} 