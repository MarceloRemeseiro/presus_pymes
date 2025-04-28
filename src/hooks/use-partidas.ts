'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'

export interface Partida {
  id: string
  nombre: string
  descripcion?: string | null
}

export function usePartidas() {
  const [partidas, setPartidas] = useState<Partida[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchPartidas = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/partidas')
      if (!response.ok) {
        throw new Error('Error al cargar partidas')
      }
      const data = await response.json()
      setPartidas(data)
      return data
    } catch (err) {
      console.error('Error:', err)
      setError(err as Error)
      toast.error('Error al cargar la lista de partidas')
      return []
    } finally {
      setLoading(false)
    }
  }

  // Obtener partidas asociadas a un presupuesto específico
  const getPartidasPresupuesto = async (presupuestoId: string) => {
    try {
      const response = await fetch(`/api/presupuestos/${presupuestoId}/partidas`)
      if (!response.ok) {
        throw new Error('Error al cargar partidas del presupuesto')
      }
      return await response.json()
    } catch (err) {
      console.error('Error:', err)
      toast.error('Error al cargar partidas del presupuesto')
      return []
    }
  }

  useEffect(() => {
    fetchPartidas()
  }, [])

  return { partidas, loading, error, fetchPartidas, getPartidasPresupuesto }
} 