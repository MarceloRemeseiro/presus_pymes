'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function NuevoGastoPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirigir a la página de gastos después de un breve tiempo
    const redirectTimer = setTimeout(() => {
      router.push('/gastos')
    }, 100)
    
    return () => clearTimeout(redirectTimer)
  }, [router])

  return (
    <div className="py-10 flex justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
        <p className="mt-2">Redirigiendo...</p>
      </div>
    </div>
  )
} 