'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'

export interface Proveedor {
  id: string
  nombre: string
}

export function useProveedores() {
  const [proveedores, setProveedores] = useState<Proveedor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchProveedores = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/proveedores')
        if (!response.ok) {
          throw new Error('Error al cargar proveedores')
        }
        const data = await response.json()
        setProveedores(data)
      } catch (err) {
        console.error('Error:', err)
        setError(err as Error)
        toast.error('Error al cargar la lista de proveedores')
      } finally {
        setLoading(false)
      }
    }

    fetchProveedores()
  }, [])

  return { proveedores, loading, error }
} 