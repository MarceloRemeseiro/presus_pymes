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
      // Ejemplo: Si el formato es PLM2025024, queremos extraer el 024
      const yearStr = year.toString();
      const regex = new RegExp(`${prefijo}${yearStr}(\\d+)$`);
      const match = ultimoNumero.match(regex);
      
      if (match && match[1]) {
        const ultimaSecuencia = parseInt(match[1])
        if (!isNaN(ultimaSecuencia)) {
          siguienteSecuencia = ultimaSecuencia + 1
        }
      }
    } else {
      // Si no hay registros previos, usar el valor inicial configurado en variables de entorno
      if (tipo === 'presupuesto') {
        // Usar NUMERO_PRESUS_INICIO para presupuestos
        const inicioPres = process.env.NUMERO_PRESUS_INICIO
        if (inicioPres && !isNaN(parseInt(inicioPres))) {
          siguienteSecuencia = parseInt(inicioPres)
          console.log(`Usando número inicial de presupuesto: ${siguienteSecuencia} de variable de entorno`)
        }
      } else {
        // Usar NUMERO_FACTURAS_INICIO para facturas
        const inicioFact = process.env.NUMERO_FACTURAS_INICIO
        if (inicioFact && !isNaN(parseInt(inicioFact))) {
          siguienteSecuencia = parseInt(inicioFact)
          console.log(`Usando número inicial de factura: ${siguienteSecuencia} de variable de entorno`)
        }
      }
    }
    
    // Formatear el número de secuencia con padding a 3 dígitos 
    // (ya que PLM2025024 debe ser formateo a 3 dígitos: 024)
    const secuenciaFormateada = siguienteSecuencia.toString().padStart(3, '0')
    
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