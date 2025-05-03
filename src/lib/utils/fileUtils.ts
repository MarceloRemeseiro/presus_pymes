/**
 * Extrae el nombre del archivo sin la extensión
 * @param fileName Nombre del archivo incluyendo la extensión
 * @returns Nombre del archivo sin la extensión
 */
export function getFileNameWithoutExtension(fileName: string): string {
  const lastDotIndex = fileName.lastIndexOf('.');
  return lastDotIndex !== -1 ? fileName.slice(0, lastDotIndex) : fileName;
}

/**
 * Extrae la extensión del archivo
 * @param fileName Nombre del archivo
 * @returns Extensión del archivo
 */
export function getFileExtension(fileName: string): string {
  const lastDotIndex = fileName.lastIndexOf('.');
  return lastDotIndex !== -1 ? fileName.slice(lastDotIndex + 1) : '';
}

/**
 * Verifica si el archivo es un PDF
 * @param fileName Nombre del archivo
 * @returns true si es un PDF, false en caso contrario
 */
export function isPdfFile(fileName: string): boolean {
  const extension = getFileExtension(fileName).toLowerCase();
  return extension === 'pdf';
}

/**
 * Genera un nombre de archivo único agregando un identificador al final
 * @param fileName Nombre del archivo original
 * @param uniqueId Identificador único
 * @returns Nombre de archivo con identificador único
 */
export function generateUniqueFileName(fileName: string, uniqueId: string): string {
  const nameWithoutExt = getFileNameWithoutExtension(fileName);
  const extension = getFileExtension(fileName);
  return `${nameWithoutExt}_${uniqueId}.${extension}`;
} 