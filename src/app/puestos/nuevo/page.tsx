'use client';

import { PuestoForm } from "@/components/puestos/PuestoForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NuevoPuestoPage() {
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
          <CardTitle>Crear Nuevo Puesto</CardTitle>
          <CardDescription>
            Define un nuevo rol o puesto de trabajo para tu equipo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PuestoForm /> 
        </CardContent>
      </Card>
    </div>
  );
} 