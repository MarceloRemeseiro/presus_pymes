import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import { formatCurrency } from '@/lib/utils';

// Usamos los tipos existentes en la aplicación, pero los declaramos aquí para que el archivo sea independiente
// Estos tipos deben mantenerse sincronizados con los de la aplicación
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

interface ItemPresupuesto {
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

interface Presupuesto {
  id: string;
  numero: string;
  nombre?: string | null;
  referencia?: string | null;
  fecha: string;
  fechaValidez: string;
  fechaMontaje?: string | null;
  fechaInicio?: string | null;
  fechaFin?: string | null;
  clienteId?: string;
  cliente?: Cliente;
  estado: string;
  observaciones?: string | null;
  subtotal: number;
  iva: number;
  total: number;
  items: ItemPresupuesto[];
}

interface GroupedItems {
  partidaId: string | null;
  partidaNombre: string;
  items: ItemPresupuesto[] | ItemFactura[];
  subtotal: number;
}

// Interfaz para los datos de la celda de la tabla
interface CellHookData {
  column: { index: number };
  row: { index: number };
  section: string;
}

// Interfaces para facturas
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
}

// Función para cargar imágenes desde URL a Base64
async function loadImageAsBase64(url: string): Promise<string> {
  // Para URLs relativas desde la raíz del sitio, convertirlas a absolutas
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

export const generatePresupuestoPDF = async (
  presupuesto: Presupuesto, 
  partidasAgrupadas: GroupedItems[],
  empresa?: Empresa,
  colorPresupuesto?: string,
  nivelDetalle: 'completo' | 'medio' | 'minimo' = 'completo'
) => {
  // Crear el documento PDF utilizando la función compartida
  const { doc, filename } = await createPresupuestoPDF(
    presupuesto, 
    partidasAgrupadas, 
    empresa, 
    colorPresupuesto, 
    nivelDetalle
  );

  // Nombre personalizado para el archivo
  const nombreArchivo = presupuesto.nombre || `Presupuesto_${presupuesto.numero}`;
  
  // Establecer propiedades del documento para mejorar la visualización
  doc.setProperties({ 
    title: nombreArchivo,
    subject: `Presupuesto ${presupuesto.numero}`,
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

// Función para descargar el PDF directamente con el nombre correcto
export const downloadPresupuestoPDF = async (
  presupuesto: Presupuesto, 
  partidasAgrupadas: GroupedItems[],
  empresa?: Empresa,
  colorPresupuesto?: string,
  nivelDetalle: 'completo' | 'medio' | 'minimo' = 'completo'
) => {
  // Crear el documento PDF utilizando la función compartida
  const { doc, filename } = await createPresupuestoPDF(
    presupuesto, 
    partidasAgrupadas, 
    empresa, 
    colorPresupuesto, 
    nivelDetalle
  );
  
  // Descargar el PDF con el nombre correcto
  doc.save(filename);
  
  return;
};

// Función interna compartida que genera el documento PDF
async function createPresupuestoPDF(
  presupuesto: Presupuesto, 
  partidasAgrupadas: GroupedItems[],
  empresa?: Empresa,
  colorPresupuesto?: string,
  nivelDetalle: 'completo' | 'medio' | 'minimo' = 'completo'
): Promise<{ doc: jsPDF, filename: string }> {
  // Crear nuevo documento PDF
  const doc = new jsPDF();
  
  // Configuración de estilos y colores
  const primaryColor = colorPresupuesto || '#150a4a';
  const textColor = '#333333';
  // Convertir el color primario de hex a RGB para las cabeceras de tablas
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
  
  const headerBgColor: [number, number, number] = hexToRgb(primaryColor);
  
  // Configuración de márgenes - reducimos los márgenes laterales
  const marginLeft = 8; // Reducido de 15 a 10
  const marginTop = 5;
  const pageWidth = doc.internal.pageSize.width;
  
  // ----- HEADER CON LOGO, NOMBRE DE EMPRESA Y NÚMERO DE PRESUPUESTO -----
  
  // Posición Y inicial para el header
  const headerY = marginTop;
  
  // Definir ancho y posiciones
  const logoWidth = 40;
  const logoHeight = 20;
  const logoX = marginLeft;
  
  const empresaNombreX = logoX + logoWidth + 10;
  
  const presupuestoNumeroX = pageWidth - marginLeft - 70;
  
  // 1. LOGO
  // Si hay logo en la empresa, intentar cargarlo
  if (empresa?.logoUrl) {
    try {
      // Cargar logo como base64
      const logoBase64 = await loadImageAsBase64(empresa.logoUrl);
      
      // Para determinar las dimensiones originales, podemos usar una función auxiliar
      const getImageDimensions = (base64String: string): Promise<{width: number, height: number}> => {
        return new Promise((resolve, reject) => {
          try {
            // Para entornos del navegador
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
              // En entornos de servidor, extraemos la información de la imagen de manera más básica
              // Para imágenes data:image, se asume un tamaño fijo manteniendo proporción 2:1
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
      
      // Si el aspecto es más ancho que alto, ajustar por ancho
      if (aspectRatio > logoWidth / logoHeight) {
        finalWidth = logoWidth;
        finalHeight = finalWidth / aspectRatio;
      } 
      // Si el aspecto es más alto que ancho, ajustar por alto
      else {
        finalHeight = logoHeight;
        finalWidth = finalHeight * aspectRatio;
      }
      
      // Calcular posición centrada en el área reservada
      const centerX = logoX + (logoWidth - finalWidth) / 2;
      const centerY = headerY + (logoHeight - finalHeight) / 2;
      
      // Añadir la imagen al PDF con las dimensiones ajustadas
      doc.addImage(
        logoBase64,
        'PNG', // Formato de imagen
        centerX,
        centerY,
        finalWidth,
        finalHeight,
        undefined,
        'FAST' // Mejor calidad
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
  doc.setTextColor(primaryColor);
  doc.setFont('helvetica', 'bold');
  const empresaNombre = empresa?.nombre || 'Presus Pymes S.L.';
  doc.text(empresaNombre, empresaNombreX, headerY + 10);
  
  // 3. NÚMERO DE PRESUPUESTO
  // Crear un "botón" para la palabra PRESUPUESTO con fondo de color primario y texto blanco
  // Definir dimensiones y posición del botón
  const botonWidth = 60;
  const botonHeight = 15;
  const botonX = presupuestoNumeroX + 10;
  const botonY = headerY + 2;
  const cornerRadius = 3; // Radio de las esquinas para el efecto redondeado
  
  // Dibujar el fondo del botón con esquinas redondeadas
  doc.setFillColor(headerBgColor[0], headerBgColor[1], headerBgColor[2]); // Usar color primario
  doc.roundedRect(botonX, botonY, botonWidth, botonHeight, cornerRadius, cornerRadius, 'F');
  
  // Añadir el texto "PRESUPUESTO" en blanco
  doc.setTextColor(255, 255, 255); // Texto blanco
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(
    'PRESUPUESTO', 
    botonX + botonWidth/2, 
    botonY + botonHeight/2, 
    { align: 'center', baseline: 'middle' }
  );
  
  // Línea separadora debajo del header
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.5);
  doc.line(marginLeft, headerY + logoHeight + 5, pageWidth - marginLeft, headerY + logoHeight + 5);
  
  // Ajustar la posición Y inicial para el contenido que viene después del header
  const startY = headerY + logoHeight + 15;
  
  // ----- FIN DEL HEADER -----
  
  // Inicio de las 4 columnas de datos usando tablas
  // Nueva disposición de columnas: EMPRESA / CLIENTE / presu / FECHAS
  // Calculamos el ancho para cada columna
  const columnWidth = (pageWidth - (marginLeft * 2)) / 4;
  
  // Posiciones iniciales de cada columna
  const empresaCol = marginLeft + 2;
  const clienteCol = empresaCol + columnWidth;
  const presuCol = clienteCol + columnWidth;
  const fechasCol = presuCol + columnWidth;
  
  // Colores para las cabeceras de las tablas
  const headerTextColor: [number, number, number] = [255, 255, 255]; // Blanco
  
  // TABLA 1: EMPRESA
  autoTable(doc, {
    startY: startY,
    head: [['EMPRESA']],
    body: empresa ? [
      [`${empresa.nombre}`],
      [`CIF: ${empresa.cif}`],
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
    body: presupuesto.cliente ? [
      [`${presupuesto.cliente.nombre}`],
      [`NIF/CIF: ${presupuesto.cliente.nif || '-'}`],
      [`${presupuesto.cliente.direccion || '-'}`],
      [`${presupuesto.cliente.ciudad || '-'}`]
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
  
  // TABLA 3: presu
  // Primero preparamos los datos a mostrar en formato de dos columnas
  const presuData = [];

  if (presupuesto.numero) {
    presuData.push(['Número:', presupuesto.numero]);
  }
  
  if (presupuesto.nombre) {
    presuData.push(['Proyecto:', presupuesto.nombre]);
  }
  
  if (presupuesto.referencia) {
    presuData.push(['Ref:', presupuesto.referencia]);
  }
  
  // Rellenamos con filas vacías para mantener altura consistente
  while (presuData.length < 5) {
    presuData.push(['', '']);
  }
  
  autoTable(doc, {
    startY: startY,
    head: [
      [{ content: 'PRESUPUESTO', colSpan: 2 }]
    ],
    body: presuData,
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
      0: { fontStyle: 'bold', cellWidth: 15 },
      1: { fontStyle: 'normal' }
    },
    margin: { left: presuCol },
    tableWidth: columnWidth - 4
  });
  
  // TABLA 4: FECHAS
  // Preparamos los datos de fechas en formato de dos columnas
  const fechasData = [
    ['Fecha:', formatDate(presupuesto.fecha)]
  ];
  
  if (presupuesto.fechaInicio) {
    fechasData.push(['Inicio:', formatDate(presupuesto.fechaInicio)]);
  }
  
  if (presupuesto.fechaFin) {
    fechasData.push(['Fin:', formatDate(presupuesto.fechaFin)]);
  }
  
  if (presupuesto.fechaMontaje) {
    fechasData.push(['Montaje:', formatDate(presupuesto.fechaMontaje)]);
  }
  
  fechasData.push(['Válido hasta:', formatDate(presupuesto.fechaValidez)]);
  
  // Rellenamos con filas vacías para mantener altura consistente
  while (fechasData.length < 5) {
    fechasData.push(['', '']);
  }
  
  autoTable(doc, {
    startY: startY,
    head: [
      [{ content: 'FECHAS PRESUPUESTO', colSpan: 2 }]
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
  
  // Espacio para el título de "Servicios presupuestados"
  const tituloServiciosY = headerTablesEndY - 3;
  
  // Añadir el título "Servicios presupuestados" centrado
  doc.setFontSize(11);
  doc.setTextColor(primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.text('SERVICIOS PRESUPUESTADOS', pageWidth / 2, tituloServiciosY, { align: 'center' });
  
  // Línea debajo del título
  doc.setDrawColor(220, 220, 220);  
  doc.setLineWidth(0.5);
  doc.line(marginLeft, tituloServiciosY + 3, pageWidth - marginLeft, tituloServiciosY + 3);
  
  // Espacio para empezar las tablas de partidas
  let tableY = tituloServiciosY + 10;
  
  // Generar tablas para cada partida
  partidasAgrupadas.forEach((partida) => {
    // Si no hay suficiente espacio para la tabla, agregar nueva página
    if (tableY > doc.internal.pageSize.height - 50) {
      doc.addPage();
      tableY = marginTop;
    }
    
    // Título de la partida en azul
    doc.setFontSize(8);
    doc.setTextColor(primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text(partida.partidaNombre, marginLeft, tableY);
    tableY += 4;
    
    // Verificar si es la partida de personal para el nivel de detalle "medio"
    const esPartidaPersonal = partida.partidaNombre.toUpperCase() === 'PERSONAL';
    
    // Determinar el formato basado en el nivel de detalle
    const usarDetalleCompleto = nivelDetalle === 'completo' || (nivelDetalle === 'medio' && esPartidaPersonal);
    
    // Crear la tabla de items
    const tableData = partida.items.map(item => {
      const itemNombre = item.nombre || item.producto?.nombre || '';
      
      // Si es una categoría, crear una fila con una celda que ocupe todas las columnas y texto a la izquierda
      if (item.tipo === 'CATEGORIA') {
        // El número de columnas varía según el nivel de detalle
        let colSpan = usarDetalleCompleto ? 6 : 2;
        return [{ content: itemNombre, colSpan: colSpan, styles: { halign: 'left' as const, fontStyle: 'bold' as const } }];
      }
      
      // Si es un separador, crear una fila con una celda que ocupe todas las columnas y texto centrado
      if (item.tipo === 'SEPARADOR') {
        console.log(`Detectado ${item.tipo}: ${itemNombre}`);
        return [{ content: itemNombre, colSpan: 6, styles: { halign: 'center' as const, fontStyle: 'bold' as const } }];
      }
      
      // Para nivel mínimo, sólo mostrar descripción y cantidad
      if (nivelDetalle === 'minimo') {
        return [
          itemNombre,
          item.cantidad.toString()
        ];
      }
      
      // Para nivel medio, mostrar todo el detalle solo para partida de PERSONAL
      if (nivelDetalle === 'medio') {
        if (esPartidaPersonal) {
          // Detalle completo para personal
          return [
            itemNombre,
            item.cantidad.toString(),
            item.dias ? item.dias.toString() : '1',
            formatCurrency(item.precioUnitario),
            `${item.descuento}%`,
            formatCurrency(item.cantidad * item.precioUnitario * (item.dias || 1) * (1 - item.descuento / 100))
          ];
        } else {
          // Detalle mínimo para el resto
          return [
            itemNombre,
            item.cantidad.toString()
          ];
        }
      }
      
      // Para nivel completo, mostrar todo el detalle
      return [
        itemNombre,
        item.cantidad.toString(),
        item.dias ? item.dias.toString() : '1',
        formatCurrency(item.precioUnitario),
        `${item.descuento}%`,
        formatCurrency(item.cantidad * item.precioUnitario * (item.dias || 1) * (1 - item.descuento / 100))
      ];
    });
    
    // Configuración de la tabla compacta basada en el nivel de detalle
    if ((nivelDetalle === 'completo') || (nivelDetalle === 'medio' && esPartidaPersonal)) {
      // Tabla con detalle completo
      autoTable(doc, {
        startY: tableY -2,
        head: [['Descripción', 'Cantidad', 'Días', 'Precio', 'Descuento', 'Subtotal']],
        body: tableData,
        margin: { left: marginLeft, right: marginLeft },
        headStyles: { 
          fillColor: headerBgColor, 
          textColor: [255, 255, 255] as [number, number, number],
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
          0: { cellWidth: 100 }, // Descripción
          1: { cellWidth: 15, halign: 'center' }, // Cantidad
          2: { cellWidth: 15, halign: 'center' }, // Días
          3: { cellWidth: 20, halign: 'right' }, // Precio
          4: { cellWidth: 15, halign: 'center' }, // Descuento
          5: { cellWidth: 30, halign: 'right' } // Subtotal
        },
        didDrawCell: (data: CellHookData) => {
          // Estilo mejorado para categorías y separadores
          if (data.row.index >= 0 && data.column.index === 0) {
            const item = partida.items[data.row.index];
            // Estilo para categorías
            if (item && item.tipo === 'CATEGORIA') {
              doc.setTextColor(primaryColor);
              doc.setFontSize(9);
              doc.setFont('helvetica', 'bold');
            }
            // Estilo para separadores
            else if (item && item.tipo === 'SEPARADOR') {
              doc.setTextColor(primaryColor);
              doc.setFontSize(9);
              doc.setFont('helvetica', 'bold');
            }
          }
        }
      });
    } else {
      // Tabla con detalle mínimo (sólo descripción y cantidad)
      autoTable(doc, {
        startY: tableY -2,
        head: [['Descripción', 'Cantidad']],
        body: tableData,
        margin: { left: marginLeft, right: marginLeft },
        headStyles: { 
          fillColor: headerBgColor, 
          textColor: [255, 255, 255] as [number, number, number],
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
          0: { cellWidth: 170 }, // Descripción
          1: { cellWidth: 25, halign: 'center' } // Cantidad
        },
        didDrawCell: (data: CellHookData) => {
          // Estilo mejorado para categorías y separadores
          if (data.row.index >= 0 && data.column.index === 0) {
            const item = partida.items[data.row.index];
            // Estilo para categorías
            if (item && item.tipo === 'CATEGORIA') {
              doc.setTextColor(primaryColor);
              doc.setFontSize(9);
              doc.setFont('helvetica', 'bold');
            }
            // Estilo para separadores
            else if (item && item.tipo === 'SEPARADOR') {
              doc.setTextColor(primaryColor);
              doc.setFontSize(9);
              doc.setFont('helvetica', 'bold');
            }
          }
        }
      });
    }
    
    // Actualizar la posición Y para el siguiente contenido
    const finalY = (doc as any).lastAutoTable?.finalY || tableY + 20;
    
    // Añadir el subtotal debajo de la tabla en todas las versiones de impresión
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor);
    const subtotalText = `Subtotal: ${formatCurrency(partida.subtotal)}`;
    const subtotalWidth = doc.getTextWidth(subtotalText);
    doc.text(subtotalText, pageWidth - marginLeft - subtotalWidth, finalY + 4);
    
    tableY = finalY + 10;
  });
  
  // Totales después de las tablas
  // Si no hay suficiente espacio para los totales, agregar nueva página
  if (tableY > doc.internal.pageSize.height - 40) {
    doc.addPage();
    tableY = marginTop;
  }
  
  // Totales con mejor presentación
  doc.setFontSize(10);
  doc.setTextColor(textColor);
  doc.setFont('helvetica', 'normal');
  
  // Rectángulo para los totales - alineado con el resto del contenido
  const totalsBoxWidth = 80; // Ancho razonable para la caja
  // Ajuste para alinear con el resto del contenido a la derecha
  const totalsBoxX = pageWidth - marginLeft - totalsBoxWidth;
  
  // Altura de la caja de totales (reducida para una sola línea)
  const totalsBoxHeight = 10; // Suficiente para una línea de total

  // Rectángulo con borde para los totales
  doc.setDrawColor(220, 220, 220);
  doc.setFillColor(250, 250, 250);
  // Ajustar altura de la caja de totales para una sola línea
  doc.roundedRect(totalsBoxX, tableY, totalsBoxWidth, totalsBoxHeight, 2, 2, 'FD');
  
  // Total - ajustado para mostrar la base imponible y única línea
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor);
  const totalLabel = 'TOTAL (Base Impon.):'; // Etiqueta actualizada
  // Posicionar en el centro vertical de la nueva caja más pequeña
  doc.text(totalLabel, totalsBoxX + 8, tableY + totalsBoxHeight - 3); 
  doc.text(formatCurrency(presupuesto.subtotal), totalsBoxX + totalsBoxWidth - 8, tableY + totalsBoxHeight - 3, { align: 'right' });
  
  tableY += totalsBoxHeight + 4; // Espacio ajustado después de los totales
  
  // Observaciones
  if (presupuesto.observaciones) {
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
    const splitObservaciones = doc.splitTextToSize(presupuesto.observaciones, pageWidth - (marginLeft * 2));
    doc.text(splitObservaciones, marginLeft, tableY + 5);
  }
  
  // Construir el nombre del archivo para usarlo como título del PDF
  const numero = presupuesto.numero || 'SIN_NUMERO';
  const nombreEmpresa = empresa?.nombre || 'MiEmpresa';
  const referencia = presupuesto.referencia || 'SIN_REF';
  const baseFilename = `${numero}_Presupuesto_${nombreEmpresa}_${referencia}-PRESUPUESTO`;
  const filename = sanitizeFilename(baseFilename) + '.pdf';

  // Devolver el documento generado y el nombre del archivo
  return { doc, filename };
}

export const generateFacturaPDF = (
  factura: Factura, 
  partidasAgrupadas: GroupedItems[],
  empresa?: Empresa,
  colorFactura?: string
) => {
  // Crear nuevo documento PDF
  const doc = new jsPDF();
  
  // Configuración de estilos y colores
  const primaryColor = colorFactura || '#150a4a';
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
  
  // Convertir el color primario de hex a RGB para las cabeceras de tablas
  const headerBgColor: [number, number, number] = hexToRgb(primaryColor);
  
  // Configuración de márgenes - reducidos para aprovechar mejor el espacio
  const marginLeft = 10; // Reducido de 15 a 10
  const marginTop = 15;
  const pageWidth = doc.internal.pageSize.width;
  
  // Título de la factura centrado y destacado
  doc.setFontSize(16);
  doc.setTextColor(primaryColor);
  doc.text(`FACTURA #${factura.numero}`, pageWidth / 2, marginTop, { align: 'center' });
  
  if (factura.cliente) {
    doc.setFontSize(12);
    doc.text(`${factura.cliente.nombre}`, pageWidth / 2, marginTop + 7, { align: 'center' });
  }
  
  // Inicio de las 4 columnas de datos
  const startY = marginTop + 20;
  
  // Ajustamos las proporciones de las columnas para dar más espacio a las que tienen datos de etiqueta-valor
  // Las columnas CLIENTE y EMPRESA tendrán 20% cada una, mientras que presu y FECHAS tendrán 30% cada una
  const clienteColWidth = pageWidth * 0.2;
  const presuColWidth = pageWidth * 0.3;
  const fechasColWidth = pageWidth * 0.3;
  const empresaColWidth = pageWidth * 0.2;
  
  // Posiciones iniciales de cada columna
  const clienteCol = marginLeft;
  const presuCol = clienteCol + clienteColWidth;
  const fechasCol = presuCol + presuColWidth;
  const empresaCol = fechasCol + fechasColWidth;
  
  // Establecer estilo para títulos de columna
  doc.setFontSize(10);
  doc.setTextColor(primaryColor);
  doc.setFont('helvetica', 'bold');
  
  // Títulos de las 4 columnas
  doc.text('CLIENTE', clienteCol, startY);
  doc.text('FACTURA', presuCol, startY);
  doc.text('DATOS', fechasCol, startY);
  doc.text('EMPRESA', empresaCol, startY);
  
  // Establecer estilo para contenido
  doc.setFontSize(9);
  doc.setTextColor(textColor);
  doc.setFont('helvetica', 'normal');
  
  let currentY = startY + 6;
  const lineHeight = 4.5;
  
  // COLUMNA 1: CLIENTE
  if (factura.cliente) {
    const cliente = factura.cliente;
    doc.text(`${cliente.nombre}`, clienteCol, currentY);
    currentY += lineHeight;
    
    if (cliente.direccion) {
      doc.text(`${cliente.direccion}`, clienteCol, currentY);
      currentY += lineHeight;
    }
    
    if (cliente.nif) {
      const nifLabel = 'NIF/CIF:';
      doc.text(nifLabel, clienteCol, currentY);
      doc.text(`${cliente.nif}`, clienteCol + 35, currentY);
      currentY += lineHeight;
    }
  }
  
  // Resetear Y para la siguiente columna
  currentY = startY + 6;
  
  // COLUMNA 2: FACTURA
  doc.text(`Número: ${factura.numero}`, presuCol, currentY);
  currentY += lineHeight;
  
  if (factura.numeroPedido) {
    doc.text(`Pedido: ${factura.numeroPedido}`, presuCol, currentY);
    currentY += lineHeight;
  }
  
  // Resetear Y para la siguiente columna
  currentY = startY + 6;
  
  // COLUMNA 3: DATOS
  doc.text(`Fecha emisión: ${formatDate(factura.fecha)}`, fechasCol, currentY);
  currentY += lineHeight;
  
  doc.text(`Vencimiento: ${formatDate(factura.fechaVencimiento)}`, fechasCol, currentY);
  currentY += lineHeight;
  
  // Resetear Y para la siguiente columna
  currentY = startY + 6;
  
  // COLUMNA 4: EMPRESA (usar datos de la empresa o valores por defecto)
  if (empresa) {
    doc.text(`${empresa.nombre}`, empresaCol, currentY);
    currentY += lineHeight;
    
    const cifLabel = 'CIF:';
    doc.text(cifLabel, empresaCol, currentY);
    doc.text(`${empresa.cif}`, empresaCol + 35, currentY);
    currentY += lineHeight;
    
    doc.text(`${empresa.direccion}`, empresaCol, currentY);
    currentY += lineHeight;
    
    doc.text(`${empresa.email}`, empresaCol, currentY);
    currentY += lineHeight;
    
    doc.text(`${empresa.telefono}`, empresaCol, currentY);
  } else {
    // Usar datos por defecto si no hay datos de empresa
    doc.text(`Presus Pymes S.L.`, empresaCol, currentY);
    currentY += lineHeight;
    
    const cifLabel = 'CIF:';
    doc.text(cifLabel, empresaCol, currentY);
    doc.text(`B12345678`, empresaCol + 35, currentY);
    currentY += lineHeight;
    
    doc.text(`Calle Ejemplo, 123`, empresaCol, currentY);
    currentY += lineHeight;
    
    doc.text(`contacto@presuspymes.com`, empresaCol, currentY);
    currentY += lineHeight;
    
    doc.text(`+34 912 345 678`, empresaCol, currentY);
  }
  
  // Espacio para empezar las tablas
  let tableY = startY + 35; // Espacio fijo para las cabeceras y datos principales
  
  // Generar tablas para cada partida
  partidasAgrupadas.forEach((partida) => {
    // Si no hay suficiente espacio para la tabla, agregar nueva página
    if (tableY > doc.internal.pageSize.height - 50) {
      doc.addPage();
      tableY = marginTop;
    }
    
    // Título de la partida en azul
    doc.setFontSize(11);
    doc.setTextColor(primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text(partida.partidaNombre, marginLeft, tableY);
    tableY += 6;
    
    // Crear la tabla de items
    const tableData = partida.items.map(item => {
      const itemNombre = item.nombre || item.producto?.nombre || '';
      
      // Debug: Verificar el tipo de cada item
      console.log(`Item: ${itemNombre}, Tipo: ${item.tipo || 'normal'}`);
      
      // Si es una categoría, crear una fila con una celda que ocupe todas las columnas y texto a la izquierda
      if (item.tipo === 'CATEGORIA') {
        console.log(`Detectada ${item.tipo}: ${itemNombre}`);
        return [{ content: itemNombre, colSpan: 6, styles: { halign: 'left' as const, fontStyle: 'bold' as const } }];
      }
      
      // Si es un separador, crear una fila con una celda que ocupe todas las columnas y texto centrado
      if (item.tipo === 'SEPARADOR') {
        console.log(`Detectado ${item.tipo}: ${itemNombre}`);
        return [{ content: itemNombre, colSpan: 6, styles: { halign: 'center' as const, fontStyle: 'bold' as const } }];
      }
      
      return [
        itemNombre,
        item.cantidad.toString(),
        item.dias ? item.dias.toString() : '1',
        formatCurrency(item.precioUnitario),
        `${item.descuento}%`,
        formatCurrency(item.cantidad * item.precioUnitario * (item.dias || 1) * (1 - item.descuento / 100))
      ];
    });
    
    // Configuración de la tabla compacta
    autoTable(doc, {
      startY: tableY,
      head: [['Descripción', 'Cantidad', 'Días', 'Precio', 'Descuento', 'Subtotal']],
      body: tableData,
      margin: { left: marginLeft, right: marginLeft },
      headStyles: { 
        fillColor: headerBgColor, 
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'left',
        fontSize: 7,
        cellPadding: 2
      },
      bodyStyles: {
        fontSize: 7,
        lineWidth: 0.1,
        lineColor: [220, 220, 220],
        cellPadding: 2
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      columnStyles: {
        0: { cellWidth: 'auto' },
        1: { halign: 'center' },
        2: { halign: 'center' },
        3: { halign: 'right' },
        4: { halign: 'center' },
        5: { halign: 'right' }
      },
      didDrawCell: (data: CellHookData) => {
        // Estilo mejorado para categorías y separadores
        if (data.row.index >= 0 && data.column.index === 0) {
          const item = partida.items[data.row.index];
          // Estilo para categorías
          if (item && item.tipo === 'CATEGORIA') {
            doc.setTextColor(primaryColor);
            doc.setFontSize(9);
            doc.setFont('helvetica', 'bold');
          }
          // Estilo para separadores (la celda ya está centrada en la definición)
          else if (item && item.tipo === 'SEPARADOR') {
            doc.setTextColor(primaryColor);
            doc.setFontSize(9);
            doc.setFont('helvetica', 'bold');
          }
        }
      }
    });
    
    // Actualizar la posición Y para el siguiente contenido
    const finalY = (doc as any).lastAutoTable?.finalY || tableY + 20;
    
    // Añadir el subtotal debajo de la tabla en todas las versiones de impresión
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor);
    const subtotalText = `Subtotal: ${formatCurrency(partida.subtotal)}`;
    const subtotalWidth = doc.getTextWidth(subtotalText);
    doc.text(subtotalText, pageWidth - marginLeft - subtotalWidth, finalY + 4);
    
    tableY = finalY + 10;
  });
  
  // Totales después de las tablas
  // Si no hay suficiente espacio para los totales, agregar nueva página
  if (tableY > doc.internal.pageSize.height - 40) {
    doc.addPage();
    tableY = marginTop;
  }
  
  // Totales con mejor presentación
  doc.setFontSize(10);
  doc.setTextColor(textColor);
  doc.setFont('helvetica', 'normal');
  
  // Rectángulo para los totales - alineado con el resto del contenido
  const totalsBoxWidth = 60; // Ancho razonable para la caja
  // Ajuste para alinear con el resto del contenido a la derecha
  const totalsBoxX = pageWidth - marginLeft - totalsBoxWidth;
  
  // Rectángulo con borde para los totales
  doc.setDrawColor(220, 220, 220);
  doc.setFillColor(250, 250, 250);
  doc.roundedRect(totalsBoxX, tableY, totalsBoxWidth, 32, 2, 2, 'FD');
  
  // Textos y valores con menos espacio horizontal
  doc.text('Subtotal:', totalsBoxX + 8, tableY + 8);
  doc.text(formatCurrency(factura.subtotal), totalsBoxX + totalsBoxWidth - 8, tableY + 8, { align: 'right' });
  
  doc.text('IVA (21%):', totalsBoxX + 8, tableY + 16);
  doc.text(formatCurrency(factura.iva), totalsBoxX + totalsBoxWidth - 8, tableY + 16, { align: 'right' });
  
  // Línea separadora, más fina y sin llegar a los bordes
  doc.setDrawColor(220, 220, 220);
  doc.line(totalsBoxX + 8, tableY + 20, totalsBoxX + totalsBoxWidth - 8, tableY + 20);
  
  // Total - menos espacio vertical con el resto
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor);
  doc.text('TOTAL:', totalsBoxX + 8, tableY + 28);
  doc.text(formatCurrency(factura.total), totalsBoxX + totalsBoxWidth - 8, tableY + 28, { align: 'right' });
  
  tableY += 36; // Espacio reducido después de los totales
  
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
  }
  
  return doc;
};

// Función auxiliar para formatear fechas
function formatDate(dateString: string | null): string {
  if (!dateString) return '--';
  return new Date(dateString).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
} 