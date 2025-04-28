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
    let config = await prisma.configuracion.findFirst()
    
    // Si no existe configuración, crear una por defecto
    if (!config) {
      config = await prisma.configuracion.create({
        data: {
          ivaPorDefecto: 21,
          moneda: "EUR",
          prefijoFactura: "FAC-",
          prefijoPresupuesto: "PRES-",
        }
      })
    }
    
    // Determinar el prefijo según el tipo
    const prefijo = tipo === 'presupuesto' ? config.prefijoPresupuesto : config.prefijoFactura
    
    // Obtener la fecha actual para el formato
    const today = new Date()
    const year = today.getFullYear()
    
    // Formato base del número (sin secuencia)
    const formatoBase = `${prefijo}${year}`
    
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
      // Si ya existen registros, incrementar el último número
      const ultimoNumero = ultimoRegistro.numero
      
      // Extraer el número de secuencia de la última parte
      // Asumimos que el formato es PREFIJO-AÑO-SECUENCIA o PREFIJOAÑOSECUENCIA
      const match = ultimoNumero.match(/\d+$/)
      if (match) {
        const ultimaSecuencia = parseInt(match[0])
        if (!isNaN(ultimaSecuencia)) {
          siguienteSecuencia = ultimaSecuencia + 1
        }
      }
    } else {
      // Si no hay registros previos y existe la variable de entorno, usarla
      const inicioSequencia = process.env.NUMERO_PRESUS_INCIO
      if (inicioSequencia && !isNaN(parseInt(inicioSequencia))) {
        siguienteSecuencia = parseInt(inicioSequencia)
      }
    }
    
    // Formatear el número de secuencia con padding a 4 dígitos (opcional)
    const secuenciaFormateada = siguienteSecuencia.toString().padStart(4, '0')
    
    // Número completo
    const numeroCompleto = `${formatoBase}${secuenciaFormateada}`
    
    return NextResponse.json({ numero: numeroCompleto })
  } catch (error) {
    console.error('Error al generar siguiente número:', error)
    return NextResponse.json(
      { error: 'Error al generar el siguiente número' },
      { status: 500 }
    )
  }
} 