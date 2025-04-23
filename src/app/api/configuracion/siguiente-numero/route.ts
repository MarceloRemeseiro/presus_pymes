import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/configuracion/siguiente-numero?tipo=presupuesto
export async function GET(req: Request) {
  try {
    // Obtener el tipo (presupuesto o factura) desde la query
    const { searchParams } = new URL(req.url)
    const tipo = searchParams.get('tipo')?.toLowerCase() || 'presupuesto'
    
    // Validar el tipo
    if (tipo !== 'presupuesto' && tipo !== 'factura') {
      return NextResponse.json(
        { error: 'Tipo inválido. Debe ser "presupuesto" o "factura"' },
        { status: 400 }
      )
    }
    
    // Obtener configuración
    const config = await prisma.configuracion.findFirst()
    
    if (!config) {
      return NextResponse.json(
        { error: 'No se encontró configuración del sistema' },
        { status: 404 }
      )
    }
    
    // Determinar el prefijo según el tipo
    const prefijo = tipo === 'presupuesto' ? config.prefijoPresupuesto : config.prefijoFactura
    
    // Obtener la fecha actual para el formato
    const today = new Date()
    const year = today.getFullYear().toString().slice(2)
    const month = (today.getMonth() + 1).toString().padStart(2, '0')
    
    // Formato base del número (sin secuencia)
    const formatoBase = `${prefijo}${year}${month}-`
    
    // Buscar el último presupuesto/factura con ese prefijo para determinar la secuencia
    const ultimoRegistro = tipo === 'presupuesto'
      ? await prisma.presupuesto.findFirst({
          where: {
            numero: {
              startsWith: formatoBase
            }
          },
          orderBy: {
            numero: 'desc'
          }
        })
      : await prisma.factura.findFirst({
          where: {
            numero: {
              startsWith: formatoBase
            }
          },
          orderBy: {
            numero: 'desc'
          }
        })
    
    // Determinar el siguiente número de secuencia
    let siguienteSecuencia = 1
    
    if (ultimoRegistro) {
      const ultimoNumero = tipo === 'presupuesto' 
        ? ultimoRegistro.numero 
        : ultimoRegistro.numero
      
      // Extraer el número de secuencia de la última parte después del guión
      const partes = ultimoNumero.split('-')
      if (partes.length > 1) {
        const ultimaSecuencia = parseInt(partes[partes.length - 1])
        if (!isNaN(ultimaSecuencia)) {
          siguienteSecuencia = ultimaSecuencia + 1
        }
      }
    }
    
    // Formatear el número de secuencia (4 dígitos)
    const secuencia = siguienteSecuencia.toString().padStart(4, '0')
    
    // Número completo
    const numeroCompleto = `${formatoBase}${secuencia}`
    
    return NextResponse.json({ numero: numeroCompleto })
  } catch (error) {
    console.error('Error al generar siguiente número:', error)
    return NextResponse.json(
      { error: 'Error al generar el siguiente número' },
      { status: 500 }
    )
  }
} 