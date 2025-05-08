'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast, Toaster } from "sonner";
import { PlusCircle, Loader2, Search, Edit, Trash, MoreHorizontal } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { formatCurrency } from "@/lib/utils"; // Para formatear la tarifa
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Definición de la interfaz para Puesto
interface Puesto {
  id: string;
  nombre: string;
  descripcion: string | null;
  tarifa: number | null;
  createdAt: string; // O Date, dependiendo de lo que devuelva el API
  updatedAt: string; // O Date
  // Podríamos añadir _count si queremos mostrar cuántas personas tienen ese puesto
}

export default function PuestosPage() {
  const [puestos, setPuestos] = useState<Puesto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [eliminandoId, setEliminandoId] = useState<string | null>(null);

  // Función para cargar los puestos
  const fetchPuestos = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/puestos');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al cargar los puestos");
      }
      const data = await response.json();
      setPuestos(data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar puestos:', err);
      const errorMessage = err instanceof Error ? err.message : "Error desconocido";
      setError(`Error al cargar la lista de puestos: ${errorMessage}`);
      toast.error(`Error al cargar puestos: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPuestos();
  }, []);

  // Filtrar puestos basados en el término de búsqueda (nombre o descripción)
  const filteredPuestos = puestos.filter(
    (puesto) =>
      puesto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (puesto.descripcion && 
        puesto.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Función para eliminar un puesto
  const handleDeletePuesto = async (id: string) => {
    try {
      setEliminandoId(id);
      const response = await fetch(`/api/puestos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al eliminar el puesto");
      }
      
      setPuestos(puestos.filter(puesto => puesto.id !== id));
      toast.success("Puesto eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar puesto:", error);
      toast.error(error instanceof Error ? error.message : "Error al eliminar el puesto");
    } finally {
      setEliminandoId(null);
    }
  };

  // Definir las columnas para la tabla de puestos
  const columns = [
    {
      key: "nombre",
      header: "Nombre del Puesto",
      sortable: true,
      cell: (puesto: Puesto) => (
        <Link 
          href={`/puestos/${puesto.id}/editar`} // O a una página de detalle si la creamos
          className="hover:underline font-medium"
        >
          {puesto.nombre}
        </Link>
      )
    },
    {
      key: "descripcion",
      header: "Descripción",
      sortable: false, // O true si se desea
      cell: (puesto: Puesto) => <div className="truncate max-w-xs">{puesto.descripcion || "-"}</div>
    },
    {
      key: "tarifa",
      header: "Tarifa por Hora/Día", // O la unidad que corresponda
      sortable: true,
      cell: (puesto: Puesto) => <div>{puesto.tarifa !== null ? formatCurrency(puesto.tarifa) : "-"}</div>
    },
    {
      key: "actions",
      header: "Acciones",
      cell: (puesto: Puesto) => (
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/puestos/${puesto.id}/editar`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" disabled={eliminandoId === puesto.id}>
                {eliminandoId === puesto.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={() => {
                  const confirmed = confirm(`¿Estás seguro de eliminar el puesto "${puesto.nombre}"? Esta acción no se puede deshacer y podría afectar al personal asignado.`);
                  if (confirmed) {
                    handleDeletePuesto(puesto.id);
                  }
                }}
                disabled={eliminandoId === puesto.id}
                className="text-red-600 hover:!bg-red-100 hover:!text-red-700 flex items-center gap-2"
              >
                <Trash className="h-4 w-4" />
                <span>Eliminar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  ];

  return (
    <div className="py-10">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Puestos de Trabajo</h1>
        <Button asChild>
          <Link href="/puestos/nuevo">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Puesto
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Puestos</CardTitle>
          <CardDescription>
            Define los diferentes roles y tarifas para tu personal.
          </CardDescription>
          <div className="flex items-center mt-4">
            <Search className="h-4 w-4 mr-2 opacity-50" />
            <Input
              placeholder="Buscar por nombre o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin opacity-70" />
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-800 p-4 rounded-md">
              {error}
            </div>
          ) : filteredPuestos.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm 
                ? "No se encontraron puestos que coincidan con tu búsqueda" 
                : "No hay puestos registrados. Agrega uno para empezar."}
            </div>
          ) : (
            <DataTable 
              columns={columns} 
              data={filteredPuestos} 
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
} 