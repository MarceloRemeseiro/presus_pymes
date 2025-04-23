"use client"

import { EjemploAlert } from "@/components/ejemplos/ejemplo-alert"

export default function EjemplosPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Ejemplos de Componentes</h1>
      
      <div className="space-y-12">
        <section>
          <EjemploAlert />
        </section>
      </div>
    </div>
  )
} 