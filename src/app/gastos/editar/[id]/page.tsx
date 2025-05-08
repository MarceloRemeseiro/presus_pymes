'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

// params ahora es una Promise
export default function EditarGastoPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [gastoId, setGastoId] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true; // Flag para evitar actualización de estado en componente desmontado

    params.then(resolvedParams => {
      if (isActive) {
        setGastoId(resolvedParams.id);
      }
    }).catch(error => {
      console.error("Error al resolver params de gasto:", error);
      // Podrías manejar este error, quizás redirigiendo a una página de error o a /gastos
      if (isActive) {
        router.push('/gastos'); // Redirigir si hay error obteniendo el id
      }
    });

    return () => {
      isActive = false;
    };
  }, [params, router]); // Depender de params y router

  useEffect(() => {
    // Este useEffect se ejecuta cuando gastoId tiene un valor
    if (gastoId) {
      const redirectTimer = setTimeout(() => {
        router.push(`/gastos/${gastoId}`);
      }, 100);
      return () => clearTimeout(redirectTimer);
    }
  }, [gastoId, router]); // Depender de gastoId y router

  return (
    <div className="py-10 flex justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
        <p className="mt-2">Cargando y redirigiendo...</p>
      </div>
    </div>
  )
} 