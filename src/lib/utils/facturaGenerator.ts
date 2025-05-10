import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Tipos
interface Cliente {
  id: string;
  nombre: string;
  nif?: string | null;
  direccion?: string | null;
  ciudad?: string | null;
  email?: string | null;
  telefono?: string | null;
}

interface Empresa {
  id: string;
  nombre: string;
  cif: string;
  direccion: string;
  email: string;
  telefono: string;
  logoUrl?: string | null;
  cuentaBancaria?: string | null;
}

interface Producto {
  id: string;
  nombre: string;
  descripcion?: string | null;
  precioBase?: number;
}

interface Partida {
  id: string;
  nombre: string;
}

interface ItemFactura {
  id: string;
  productoId: string;
  producto: Producto;
  cantidad: number;
  precioUnitario: number;
  descuento: number;
  iva: number;
  total: number;
  dias?: number;
  partidaId?: string | null;
  partida?: Partida | null;
  tipo?: string | null;
  nombre?: string;
}

interface Factura {
  id: string;
  numero: string;
  numeroPedido?: string | null;
  nombre?: string | null;
  fecha: string;
  fechaVencimiento: string;
  clienteId?: string;
  cliente?: Cliente;
  estado: string;
  observaciones?: string | null;
  subtotal: number;
  iva: number;
  total: number;
  items: ItemFactura[];
  presupuestos?: { id: string; numero: string }[];
  esOperacionIntracomunitaria?: boolean;
}

interface GroupedItems {
  partidaId: string | null;
  partidaNombre: string;
  items: ItemFactura[];
  subtotal: number;
}

// Interfaz para los datos de la celda de la tabla
interface CellHookData {
  column: { index: number };
  row: { index: number };
  section: string;
}

// Interfaz para la configuración del PDF
interface PDFConfig {
  color?: string;
  fontSize?: number;
  margin?: number;
}

const pageDimensions = { width: 210, height: 297 }; // A4 en mm
const margin = 8;
const marginTop = 5;
const marginLeft = 8;
const primaryColorGlobal = '#000000'; // Renombrado para evitar conflicto con primaryColor dentro de la función

// Función para cargar imágenes desde URL a Base64
async function loadImageAsBase64(url: string): Promise<string> {
  if (url.startsWith('/')) {
    url = window.location.origin + url;
  }
  
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error al cargar la imagen:', error);
    throw error;
  }
}

// Función para sanitizar nombres de archivo
function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-z0-9áéíóúüñ_.-]/gi, '_')
    .replace(/_+/g, '_');
}

export const generateFacturaPDF = async (
  factura: Factura, 
  partidasAgrupadas: GroupedItems[],
  empresa?: Empresa,
  colorFactura?: string,
  configuracion?: { condicionesFactura?: string[] }
) => {
  // Añadir log para depurar
  console.log('GENERADOR PDF - Valor de esOperacionIntracomunitaria:', factura.esOperacionIntracomunitaria);
  console.log('GENERADOR PDF - Tipo de esOperacionIntracomunitaria:', typeof factura.esOperacionIntracomunitaria);
  console.log('GENERADOR PDF - Datos de factura básicos:', JSON.stringify({
    id: factura.id,
    numero: factura.numero,
    esOperacionIntracomunitaria: factura.esOperacionIntracomunitaria
  }));

  // Crear nuevo documento PDF
  const doc = new jsPDF();
  
  // Configuración de estilos y colores - Usamos un color diferente para facturas
  const localPrimaryColor = colorFactura || '#3c4e66'; // Nombre local para evitar conflicto con la constante global
  const textColor = '#333333';
  
  // La función hexToRgb convierte un color hexadecimal a RGB
  const hexToRgb = (hex: string): [number, number, number] => {
    // Eliminar el # si existe
    hex = hex.replace('#', '');
    
    // Convertir a valores RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return [r, g, b];
  };
  
  const headerBgColor: [number, number, number] = hexToRgb(localPrimaryColor);
  
  // Usar las constantes globales marginLeft y marginTop directamente
  const pageWidth = doc.internal.pageSize.width;
  
  // ----- HEADER CON LOGO, NOMBRE DE EMPRESA Y NÚMERO DE FACTURA -----
  
  // Posición Y inicial para el header
  const headerY = marginTop; // Usar marginTop global (5)
  
  // Definir ancho y posiciones
  const logoWidth = 40;
  const logoHeight = 20;
  const logoX = marginLeft; // Usar marginLeft global (8)
  
  const empresaNombreX = logoX + logoWidth + 10;
  
  const facturaNumeroX = pageWidth - marginLeft - 70; // Usar marginLeft global (8)
  
  // 1. LOGO
  // Si hay logo en la empresa, intentar cargarlo
  if (empresa?.logoUrl) {
    try {
      // Cargar logo como base64
      const logoBase64 = await loadImageAsBase64(empresa.logoUrl);
      
      // Para determinar las dimensiones originales
      const getImageDimensions = async (base64String: string): Promise<{width: number, height: number}> => {
        return new Promise((resolve, reject) => {
          try {
            if (typeof window !== 'undefined') {
              const img = new Image();
              img.onload = () => {
                resolve({
                  width: img.width,
                  height: img.height
                });
              };
              img.onerror = reject;
              img.src = base64String;
            } else {
              resolve({
                width: 200,
                height: 100
              });
            }
          } catch (error) {
            reject(error);
          }
        });
      };
      
      // Obtener dimensiones originales
      const dimensions = await getImageDimensions(logoBase64);
      
      // Calcular la relación de aspecto
      const aspectRatio = dimensions.width / dimensions.height;
      
      // Determinar dimensiones finales respetando la relación de aspecto
      let finalWidth = logoWidth;
      let finalHeight = logoHeight;
      
      if (aspectRatio > logoWidth / logoHeight) {
        finalWidth = logoWidth;
        finalHeight = finalWidth / aspectRatio;
      } else {
        finalHeight = logoHeight;
        finalWidth = finalHeight * aspectRatio;
      }
      
      // Calcular posición centrada en el área reservada
      const centerX = logoX + (logoWidth - finalWidth) / 2;
      const centerY = headerY + (logoHeight - finalHeight) / 2;
      
      // Añadir la imagen al PDF
      doc.addImage(
        logoBase64,
        'PNG',
        centerX,
        centerY,
        finalWidth,
        finalHeight,
        undefined,
        'FAST'
      );
    } catch (e) {
      console.error('Error al cargar el logo:', e);
      // Si hay error, mostrar un placeholder
      doc.setFillColor(245, 245, 245);
      doc.rect(logoX, headerY, logoWidth, logoHeight, 'F');
      
      // Texto en el placeholder
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text('LOGO', logoX + logoWidth/2, headerY + logoHeight/2, { align: 'center', baseline: 'middle' });
    }
  } else {
    // Si no hay logo, mostrar un placeholder
    doc.setFillColor(245, 245, 245);
    doc.rect(logoX, headerY, logoWidth, logoHeight, 'F');
    
    // Añadir texto al placeholder
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('LOGO', logoX + logoWidth/2, headerY + logoHeight/2, { align: 'center', baseline: 'middle' });
  }
  
  // 2. NOMBRE DE LA EMPRESA
  doc.setFontSize(16);
  doc.setTextColor(localPrimaryColor);
  doc.setFont('helvetica', 'bold');
  const empresaNombre = empresa?.nombre || 'Presus Pymes S.L.';
  doc.text(empresaNombre, empresaNombreX, headerY + 10);
  
  // 3. NÚMERO DE FACTURA
  // Crear un "botón" para la palabra FACTURA con fondo de color primario y texto blanco
  const botonWidth = 60;
  const botonHeight = 15;
  const botonX = facturaNumeroX + 10;
  const botonY = headerY + 2;
  const cornerRadius = 3;
  
  // Dibujar el fondo del botón con esquinas redondeadas
  doc.setFillColor(headerBgColor[0], headerBgColor[1], headerBgColor[2]);
  doc.roundedRect(botonX, botonY, botonWidth, botonHeight, cornerRadius, cornerRadius, 'F');
  
  // Añadir el texto "FACTURA" en blanco
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(
    'FACTURA',
    botonX + botonWidth/2,
    botonY + botonHeight/2,
    { align: 'center', baseline: 'middle' }
  );
  
  // Línea separadora debajo del header
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.5);
  doc.line(marginLeft, headerY + logoHeight + 5, pageWidth - marginLeft, headerY + logoHeight + 5); // Usar marginLeft global (8)
  
  // Ajustar la posición Y inicial para el contenido que viene después del header, igual que en presupuestos
  const startY = headerY + logoHeight + 15; 
  
  // ----- FIN DEL HEADER -----
  
  // Inicio de las 4 columnas de datos usando tablas
  // Nueva disposición de columnas: EMPRESA / CLIENTE / FACTURA / FECHAS
  // Calculamos el ancho para cada columna
  const columnWidth = (pageWidth - (marginLeft * 2)) / 4; // Usar marginLeft global (8)
  
  // Posiciones iniciales de cada columna
  const empresaCol = marginLeft + 2; // Usar marginLeft global (8)
  const clienteCol = empresaCol + columnWidth;
  const facturaCol = clienteCol + columnWidth;
  const fechasCol = facturaCol + columnWidth;
  
  // Colores para las cabeceras de las tablas
  const headerTextColor: [number, number, number] = [255, 255, 255]; // Blanco
  
  // TABLA 1: EMPRESA
  autoTable(doc, {
    startY: startY,
    head: [['EMPRESA']],
    body: empresa ? [
      [`${empresa.nombre}`],
      [factura.esOperacionIntracomunitaria ? `VAT NUMBER: ES${empresa.cif}` : `CIF: ${empresa.cif}`],
      [`${empresa.direccion}`],
      [`${empresa.email}`],
      [`${empresa.telefono}`]
    ] : [
      ['Presus Pymes S.L.'],
      ['CIF: B12345678'],
      ['Calle Ejemplo, 123'],
      ['contacto@presuspymes.com'],
      ['+34 912 345 678']
    ],
    theme: 'plain',
    styles: {
      fontSize: 7,
      textColor: [50, 50, 50] as [number, number, number],
      cellPadding: 1
    },
    headStyles: {
      fillColor: headerBgColor,
      textColor: headerTextColor,
      fontStyle: 'bold',
      halign: 'left',
      fontSize: 7
    },
    margin: { left: empresaCol },
    tableWidth: columnWidth - 4
  });
  
  // TABLA 2: CLIENTE
  autoTable(doc, {
    startY: startY,
    head: [['CLIENTE']],
    body: factura.cliente ? [
      [`${factura.cliente.nombre}`],
      [factura.esOperacionIntracomunitaria ? `VAT NUMBER: ${factura.cliente.nif || '-'}` : `NIF/CIF: ${factura.cliente.nif || '-'}`],
      [`${factura.cliente.direccion || '-'}`],
      [`${factura.cliente.ciudad || '-'}`]
    ] : [
      ['Sin cliente asignado'],
      [''],
      [''],
      [''],
      ['']
    ],
    theme: 'plain',
    styles: {
      fontSize: 7,
      textColor: [50, 50, 50] as [number, number, number],
      cellPadding: 1
    },
    headStyles: {
      fillColor: headerBgColor,
      textColor: headerTextColor,
      fontStyle: 'bold',
      halign: 'left',
      fontSize: 7
    },
    margin: { left: clienteCol },
    tableWidth: columnWidth - 4
  });
  
  // TABLA 3: FACTURA
  // Preparamos los datos a mostrar en formato de dos columnas
  const facturaData = [];

  if (factura.numero) {
    facturaData.push(['Número:', factura.numero]);
  }
  // Añadir presupuesto relacionado si existe
  if (factura.presupuestos && factura.presupuestos.length > 0) {
    const presupuestosStr = factura.presupuestos.map(p => p.numero).join(', ');
    facturaData.push(['Presupuesto:', presupuestosStr]);
  }
  
  if (factura.numeroPedido) {
    facturaData.push(['Pedido:', factura.numeroPedido]);
  }

  if (factura.nombre) {
    facturaData.push(['Nombre:', factura.nombre]);
  }
  
  // Rellenamos con filas vacías para mantener altura consistente
  while (facturaData.length < 5) {
    facturaData.push(['', '']);
  }
  
  autoTable(doc, {
    startY: startY,
    head: [
      [{ content: 'FACTURA', colSpan: 2 }]
    ],
    body: facturaData,
    theme: 'plain',
    styles: {
      fontSize: 7,
      textColor: [50, 50, 50] as [number, number, number],
      cellPadding: 1
    },
    headStyles: {
      fillColor: headerBgColor,
      textColor: headerTextColor,
      fontStyle: 'bold',
      halign: 'left',
      fontSize: 7
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 20 },
      1: { fontStyle: 'normal' }
    },
    margin: { left: facturaCol },
    tableWidth: columnWidth - 4
  });
  
  // TABLA 4: FECHAS
  // Preparamos los datos de fechas en formato de dos columnas
  const fechasData = [
    ['Emisión:', formatDate(factura.fecha)],
    ['Vencimiento:', formatDate(factura.fechaVencimiento)]
  ];
  
  // Rellenamos con filas vacías para mantener altura consistente
  while (fechasData.length < 5) {
    fechasData.push(['', '']);
  }
  
  autoTable(doc, {
    startY: startY,
    head: [
      [{ content: 'FECHAS', colSpan: 2 }]
    ],
    body: fechasData,
    theme: 'plain',
    styles: {
      fontSize: 7,
      textColor: [50, 50, 50] as [number, number, number],
      cellPadding: 1
    },
    headStyles: {
      fillColor: headerBgColor,
      textColor: headerTextColor,
      fontStyle: 'bold',
      halign: 'left',
      fontSize: 7
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 25 },
      1: { fontStyle: 'normal' }
    },
    margin: { left: fechasCol },
    tableWidth: columnWidth - 4
  });
  
  // Calculamos la posición Y después de las tablas de encabezado
  const headerTablesEndY = Math.max(
    (doc as any).lastAutoTable.finalY,
    startY + 40 // Altura mínima
  );
  
  // Espacio para el título de "Servicios facturados"
  const tituloServiciosY = headerTablesEndY - 3;
  
  // Añadir el título "Servicios facturados" centrado
  doc.setFontSize(11);
  doc.setTextColor(localPrimaryColor);
  doc.setFont('helvetica', 'bold');
  doc.text('SERVICIOS FACTURADOS', pageWidth / 2, tituloServiciosY, { align: 'center' });
  
  // Línea debajo del título
  doc.setDrawColor(220, 220, 220);  
  doc.setLineWidth(0.5);
  doc.line(marginLeft, tituloServiciosY + 3, pageWidth - marginLeft, tituloServiciosY + 3); // Usar marginLeft global (8)
  
  // Espacio para empezar las tablas de partidas
  let tableY = tituloServiciosY + 10;
  
  // itemsTableMargin ahora debe ser igual a marginLeft global (8)
  const itemsTableMargin = marginLeft; 

  // Generar tablas para cada partida
  partidasAgrupadas.forEach((partida) => {
    // Si no hay suficiente espacio para la tabla, agregar nueva página
    if (tableY > doc.internal.pageSize.height - 50) {
      doc.addPage();
      tableY = marginTop; // Usar marginTop global (5)
    }
    
    // Título de la partida en azul
    doc.setFontSize(8);
    doc.setTextColor(localPrimaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text(partida.partidaNombre, marginLeft, tableY); // Usar marginLeft global (8) para el título de la partida
    tableY += 4;
    
    // Verificar si es la partida de personal
    const esPartidaPersonal = partida.partidaNombre.toUpperCase() === 'PERSONAL';
    
    // Crear la tabla de items
    const tableData = partida.items.map(item => {
      const itemNombre = item.nombre || item.producto?.nombre || '';
      
      // Si es una categoría, crear una fila con una celda que ocupe todas las columnas y texto a la izquierda
      if (item.tipo === 'CATEGORIA') {
        const colSpan = esPartidaPersonal ? 5 : 2;
        return [{ content: itemNombre, colSpan: colSpan, styles: { halign: 'left' as const, fontStyle: 'bold' as const } }];
      }
      
      // Si es un separador, crear una fila con una celda que ocupe todas las columnas y texto centrado
      if (item.tipo === 'SEPARADOR') {
        const colSpan = esPartidaPersonal ? 5 : 2;
        return [{ content: itemNombre, colSpan: colSpan, styles: { halign: 'center' as const, fontStyle: 'bold' as const } }];
      }
      
      // Si es la partida de personal, mostrar todos los detalles
      if (esPartidaPersonal) {
        return [
          item.cantidad.toString(),
          itemNombre,
          item.dias ? item.dias.toString() : '1',
          formatCurrency(item.precioUnitario),
          formatCurrency(item.cantidad * item.precioUnitario * (item.dias || 1) * (1 - item.descuento / 100))
        ];
      } else {
        // Para otras partidas, mantener el formato compacto
        return [
          item.cantidad.toString(),
          itemNombre
        ];
      }
    });
    
    // Configuración de la tabla según el tipo de partida
    if (esPartidaPersonal) {
      // Tabla detallada para PERSONAL
      autoTable(doc, {
        startY: tableY - 2,
        head: [['Cant.', 'Descripción', 'Días', 'Precio/día', 'Subtotal']],
        body: tableData,
        margin: { left: itemsTableMargin, right: itemsTableMargin },
        headStyles: { 
          fillColor: headerBgColor, 
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          halign: 'left',
          fontSize: 7,
          cellPadding: 1
        },
        bodyStyles: {
          fontSize: 7,
          lineWidth: 0.1,
          lineColor: [220, 220, 220],
          cellPadding: 1
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        },
        columnStyles: {
          0: { cellWidth: 15, halign: 'center' },  // Cantidad (sin cambios)
          1: { cellWidth: 109, halign: 'left' }, // Descripción (ajustado para llenar espacio)
          2: { cellWidth: 15, halign: 'center' },  // Días (sin cambios)
          3: { cellWidth: 25, halign: 'right' },   // Precio/día (sin cambios)
          4: { cellWidth: 30, halign: 'right' }    // Subtotal (sin cambios)
        },
        didDrawCell: (data: CellHookData) => {
          // Estilo mejorado para categorías y separadores
          if (data.row.index >= 0 && data.column.index === 1) { // Ahora es columna 1 para descripción
            const item = partida.items[data.row.index];
            // Estilo para categorías
            if (item && item.tipo === 'CATEGORIA') {
              doc.setTextColor(localPrimaryColor);
              doc.setFontSize(9);
              doc.setFont('helvetica', 'bold');
            }
            // Estilo para separadores (la celda ya está centrada en la definición)
            else if (item && item.tipo === 'SEPARADOR') {
              doc.setTextColor(localPrimaryColor);
              doc.setFontSize(9);
              doc.setFont('helvetica', 'bold');
            }
          }
        }
      });
    } else {
      // Tabla compacta para otras partidas (formato original)
      autoTable(doc, {
        startY: tableY - 2,
        head: [['Cantidad', 'Descripción']],
        body: tableData,
        margin: { left: itemsTableMargin, right: itemsTableMargin },
        headStyles: { 
          fillColor: headerBgColor, 
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          halign: 'left',
          fontSize: 7,
          cellPadding: 1
        },
        bodyStyles: {
          fontSize: 7,
          lineWidth: 0.1,
          lineColor: [220, 220, 220],
          cellPadding: 1
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        },
        columnStyles: {
          0: { cellWidth: 20, halign: 'center' }, // Cantidad (sin cambios)
          1: { cellWidth: 174, halign: 'left' }  // Descripción (ajustado para llenar espacio)
        },
        didDrawCell: (data: CellHookData) => {
          // Estilo mejorado para categorías y separadores
          if (data.row.index >= 0 && data.column.index === 1) { // Columna 1 para descripción
            const item = partida.items[data.row.index];
            // Estilo para categorías
            if (item && item.tipo === 'CATEGORIA') {
              doc.setTextColor(localPrimaryColor);
              doc.setFontSize(9);
              doc.setFont('helvetica', 'bold');
            }
            // Estilo para separadores (la celda ya está centrada en la definición)
            else if (item && item.tipo === 'SEPARADOR') {
              doc.setTextColor(localPrimaryColor);
              doc.setFontSize(9);
              doc.setFont('helvetica', 'bold');
            }
          }
        }
      });
    }
    
    // Actualizar la posición Y para el siguiente contenido
    const finalY = (doc as any).lastAutoTable?.finalY || tableY + 20;
    
    // Añadir el subtotal debajo de la tabla
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(localPrimaryColor);
    const subtotalText = `Subtotal: ${formatCurrency(partida.subtotal)}`;
    const subtotalWidth = doc.getTextWidth(subtotalText);
    doc.text(subtotalText, pageWidth - marginLeft - subtotalWidth, finalY + 4); // Usar marginLeft global (8)
    
    // Actualizar la posición Y para la siguiente partida
    tableY = finalY + 10;
  });
  
  // Totales
  if (tableY > doc.internal.pageSize.height - 40) {
    doc.addPage();
    tableY = marginTop; // Usar marginTop global (5) en lugar de startY para consistencia
  }

  // Definir dimensiones de las cajas
  const totalsBoxWidth = 60;
  const cuentaBoxWidth = 80; // Más ancha
  const boxHeight = factura.esOperacionIntracomunitaria ? 20 : 36;
  const leftBoxX = marginLeft;
  const rightBoxX = pageWidth - marginLeft - totalsBoxWidth;

  // Caja de cuenta bancaria (izquierda, más ancha)
  if (empresa?.cuentaBancaria) {
    doc.setDrawColor(220, 220, 220);
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(leftBoxX, tableY, cuentaBoxWidth, boxHeight, 2, 2, 'FD');
    // Título
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(localPrimaryColor);
    doc.text('Número de cuenta', leftBoxX + 8, tableY + 8);
    // IBAN
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(textColor);
    doc.text(empresa.cuentaBancaria, leftBoxX + 8, tableY + 15);
    // Forma de pago
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(textColor);
    doc.text('FORMA DE PAGO: Transferencia', leftBoxX + 8, tableY + 22);
  }

  // Caja de totales (derecha)
  doc.setFontSize(10);
  doc.setTextColor(textColor);
  doc.setFont('helvetica', 'normal');
  doc.setDrawColor(220, 220, 220);
  doc.setFillColor(250, 250, 250);
  doc.roundedRect(rightBoxX, tableY, totalsBoxWidth, boxHeight, 2, 2, 'FD');

  if (factura.esOperacionIntracomunitaria) {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(localPrimaryColor);
    doc.text('TOTAL:', rightBoxX + 8, tableY + 10);
    doc.text(formatCurrency(factura.total), rightBoxX + totalsBoxWidth - 8, tableY + 10, { align: 'right' });
  } else {
    doc.text('Subtotal:', rightBoxX + 8, tableY + 8);
    doc.text(formatCurrency(factura.subtotal), rightBoxX + totalsBoxWidth - 8, tableY + 8, { align: 'right' });
    doc.text('IVA (21%):', rightBoxX + 8, tableY + 16);
    doc.text(formatCurrency(factura.iva), rightBoxX + totalsBoxWidth - 8, tableY + 16, { align: 'right' });
    doc.setDrawColor(220, 220, 220);
    doc.line(rightBoxX + 8, tableY + 20, rightBoxX + totalsBoxWidth - 8, tableY + 20);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(localPrimaryColor);
    doc.text('TOTAL:', rightBoxX + 8, tableY + 28);
    doc.text(formatCurrency(factura.total), rightBoxX + totalsBoxWidth - 8, tableY + 28, { align: 'right' });
  }

  // Reducir el espacio inferior entre las cajas y el siguiente contenido
  tableY += boxHeight + 2;
  
  // Observaciones
  if (factura.observaciones) {
    // Si no hay espacio suficiente para las observaciones, agregar página
    if (tableY > doc.internal.pageSize.height - 30) {
      doc.addPage();
      tableY = marginTop;
    }
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(textColor);
    doc.text('Observaciones:', marginLeft, tableY);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    
    // Dividir las observaciones en líneas para evitar desbordamiento
    const splitObservaciones = doc.splitTextToSize(factura.observaciones, pageWidth - (marginLeft * 2));
    doc.text(splitObservaciones, marginLeft, tableY + 5);
    
    // Actualizar la posición Y considerando el alto del texto
    tableY += 10 + (splitObservaciones.length * 4);
  }
  
  // Mostrar las condiciones si existen
  if (configuracion?.condicionesFactura && configuracion.condicionesFactura.length > 0) {
    // Si no hay espacio suficiente para las condiciones, agregar página
    if (tableY > doc.internal.pageSize.height - 40) {
      doc.addPage();
      tableY = marginTop;
    }
    
    // Título de las condiciones
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(localPrimaryColor);
    doc.text('CONDICIONES:', marginLeft, tableY);
    
    // Dibujar las condiciones como lista
    doc.setFontSize(6);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textColor);
    
    let condicionY = tableY + 4;
    
    configuracion.condicionesFactura.forEach((condicion, index) => {
      // Comprobar si necesitamos una nueva página para esta condición
      if (condicionY > doc.internal.pageSize.height - 10) {
        doc.addPage();
        condicionY = marginTop + 5;
      }
      
      // Dividir la condición en líneas si es muy larga
      const splitCondicion = doc.splitTextToSize(condicion, pageWidth - (marginLeft * 2) - 10);
      
      // Dibujar el punto de lista
      doc.setTextColor(localPrimaryColor);
      doc.text('-', marginLeft, condicionY);
      
      // Dibujar el texto de la condición
      doc.setTextColor(textColor);
      doc.text(splitCondicion, marginLeft + 5, condicionY);
      
      // Actualizar la posición Y para la siguiente condición
      // Reducimos el espaciado entre condiciones y entre líneas
      condicionY += 3 + ((splitCondicion.length - 1) * 2);
    });
    
    // Actualizar la posición Y general
    tableY = condicionY + 3;
  }
  
  // Generar el nombre del archivo PDF con el formato solicitado:
  // [numero de factura]__Factura[nombreEmpresa]_[referencia]-FACTURA
  const numeroFactura = factura.numero || 'SIN_NUMERO';
  const nombreEmpresa = empresa?.nombre || 'MiEmpresa';
  // Usar numeroPedido como referencia, o una cadena genérica si no hay
  const referencia = factura.numeroPedido || factura.nombre?.replace(/\s+/g, '_') || 'SIN_REF';
  
  const baseFilename = `${numeroFactura}__Factura_${nombreEmpresa}_${referencia}-FACTURA`;
  const filename = sanitizeFilename(baseFilename) + '.pdf';

  // Establecer el título del documento PDF
  doc.setProperties({ 
    title: filename,
    subject: `Factura ${factura.numero}`,
    author: empresa?.nombre || 'PresupPymes',
    creator: 'PresupPymes'
  });
  
  try {
    // Método alternativo para mostrar PDF sin perder el nombre: crear un documento HTML con iframe embebido
    const dataUri = doc.output('datauristring');
    
    // Crear una ventana nueva
    const win = window.open('', '_blank');
    if (!win) {
      throw new Error('No se pudo abrir una nueva ventana');
    }
    
    // Nombre personalizado para el archivo
    const nombreArchivo = factura.nombre || `Factura_${factura.numero}`;
    
    // Escribir el contenido HTML con el iframe para mostrar el PDF y opción de descarga
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${nombreArchivo}</title>
          <style>
            body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; }
            #pdf-container { width: 100%; height: 100%; position: absolute; top: 0; left: 0; }
            #download-btn {
              position: fixed; top: 20px; right: 20px; z-index: 9999;
              padding: 8px 16px; background-color: #4a5568; color: white;
              border: none; border-radius: 4px; cursor: pointer;
              font-family: Arial, sans-serif; font-size: 14px;
            }
            #download-btn:hover { background-color: #2d3748; }
          </style>
        </head>
        <body>
          <button id="download-btn" onclick="downloadPdf()">Descargar PDF</button>
          <iframe id="pdf-container" src="${dataUri}" width="100%" height="100%" frameborder="0"></iframe>
          <script>
            function downloadPdf() {
              const link = document.createElement('a');
              link.href = '${dataUri}';
              link.download = '${filename}';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          </script>
        </body>
      </html>
    `);
    win.document.close();
  } catch (error) {
    console.error('Error al abrir el PDF:', error);
    // Como fallback, guardarlo directamente
    doc.save(filename);
  }
};

// Función auxiliar para formatear fechas
function formatDate(dateString: string | null): string {
  if (!dateString) return '--';
  const date = new Date(dateString);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset()); // Ajustar UTC
  return format(date, 'dd/MM/yyyy', { locale: es });
}