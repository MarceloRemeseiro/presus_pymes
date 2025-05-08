'use client';

import { PuestoForm } from "@/components/puestos/PuestoForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Usar useParams para obtener el ID
import { toast } from "sonner";

// Usar la misma interfaz definida en PuestoForm o importar de un lugar común
interface Puesto {
  id: string;
  nombre: string;
  descripcion: string | null;
  tarifa: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export default function EditarPuestoPage() {
  const params = useParams();
  const router = useRouter();
  const puestoId = params.id as string; // Obtener ID de la URL
  const [puesto, setPuesto] = useState<Puesto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!puestoId) {
      setError("No se proporcionó ID del puesto.");
      setIsLoading(false);
      return;
    }

    const fetchPuesto = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/puestos/${puestoId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Error al cargar los datos del puesto");
        }
        const data = await response.json();
        setPuesto(data);
      } catch (err) {
        console.error("Error fetching puesto:", err);
        const message = err instanceof Error ? err.message : "Error desconocido";
        setError(`No se pudieron cargar los datos del puesto: ${message}`);
        toast.error(`Error al cargar datos: ${message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPuesto();
  }, [puestoId]);

  return (
    <div className="py-10">
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/puestos">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Puestos
        </Link>
      </Button>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Editar Puesto</CardTitle>
          <CardDescription>
            Modifica los detalles del puesto de trabajo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin opacity-70" />
              <p className="ml-2">Cargando datos del puesto...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-800 p-4 rounded-md">
              {error}
            </div>
          ) : puesto ? (
            <PuestoForm puesto={puesto} />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No se encontraron los datos del puesto.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 