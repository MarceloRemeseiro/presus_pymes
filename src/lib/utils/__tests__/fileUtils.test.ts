import {
  getFileNameWithoutExtension,
  getFileExtension,
  isPdfFile,
  generateUniqueFileName
} from '../fileUtils';

describe('Utilidades de archivos', () => {
  // Pruebas para getFileNameWithoutExtension
  describe('getFileNameWithoutExtension', () => {
    it('debe devolver el nombre del archivo sin la extensión', () => {
      expect(getFileNameWithoutExtension('documento.pdf')).toBe('documento');
      expect(getFileNameWithoutExtension('imagen.jpg')).toBe('imagen');
      expect(getFileNameWithoutExtension('archivo.con.puntos.txt')).toBe('archivo.con.puntos');
    });

    it('debe devolver el nombre original si no tiene extensión', () => {
      expect(getFileNameWithoutExtension('archivo_sin_extension')).toBe('archivo_sin_extension');
    });
  });

  // Pruebas para getFileExtension
  describe('getFileExtension', () => {
    it('debe devolver la extensión del archivo', () => {
      expect(getFileExtension('documento.pdf')).toBe('pdf');
      expect(getFileExtension('imagen.JPG')).toBe('JPG');
      expect(getFileExtension('archivo.con.puntos.txt')).toBe('txt');
    });

    it('debe devolver cadena vacía si no tiene extensión', () => {
      expect(getFileExtension('archivo_sin_extension')).toBe('');
    });
  });

  // Pruebas para isPdfFile
  describe('isPdfFile', () => {
    it('debe devolver true para archivos PDF', () => {
      expect(isPdfFile('documento.pdf')).toBe(true);
      expect(isPdfFile('factura.PDF')).toBe(true);
    });

    it('debe devolver false para archivos que no son PDF', () => {
      expect(isPdfFile('imagen.jpg')).toBe(false);
      expect(isPdfFile('archivo_sin_extension')).toBe(false);
      expect(isPdfFile('documento.pdf.txt')).toBe(false);
    });
  });

  // Pruebas para generateUniqueFileName
  describe('generateUniqueFileName', () => {
    it('debe generar un nombre de archivo único con el identificador', () => {
      expect(generateUniqueFileName('documento.pdf', 'abc123')).toBe('documento_abc123.pdf');
      expect(generateUniqueFileName('imagen.JPG', 'xyz789')).toBe('imagen_xyz789.JPG');
    });

    it('debe manejar archivos sin extensión', () => {
      expect(generateUniqueFileName('archivo_sin_extension', 'def456')).toBe('archivo_sin_extension_def456.');
    });

    it('debe manejar nombres de archivo con múltiples puntos', () => {
      expect(generateUniqueFileName('archivo.con.puntos.txt', 'ghi789')).toBe('archivo.con.puntos_ghi789.txt');
    });
  });
}); 