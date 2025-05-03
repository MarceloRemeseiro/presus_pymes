// Tenemos que simular los módulos de next/server y fs
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({
      data,
      options,
      headers: new Map(),
    })),
  }
}));

// Simulamos fs/promises para evitar operaciones reales de archivo
jest.mock('fs/promises', () => ({
  writeFile: jest.fn(),
  unlink: jest.fn(),
  access: jest.fn(),
  mkdir: jest.fn(),
}));

// Simular el objeto Request si no está disponible en el entorno de prueba
// En Jest, Request no está disponible por defecto
class MockRequest {
  private url: string;
  private config: RequestInit;
  private _body: any;
  
  constructor(url: string, config: RequestInit = {}) {
    this.url = url;
    this.config = config;
    this._body = config.body;
  }
  
  async formData() {
    return this._body as FormData;
  }
  
  async json() {
    return typeof this._body === 'string' ? JSON.parse(this._body) : this._body;
  }
}

// Si Request no está definido globalmente, lo definimos
if (typeof globalThis.Request === 'undefined') {
  // @ts-ignore - Esto es necesario para el entorno de prueba
  globalThis.Request = MockRequest;
}

// Importamos el mock directamente desde nuestro archivo de mock
import { POST, DELETE, mockedFiles, mockedDeletedFiles } from '../__mocks__/route';
import { NextResponse } from 'next/server';

// Función auxiliar para crear un objeto File
function createMockFile(name: string, content: string) {
  return new File([content], name, { type: 'application/pdf' });
}

// Extender el tipo de NextResponse para los tests
type MockedResponse = {
  data: any;
  options?: any;
  headers: Map<string, string>;
};

describe('API de subida y eliminación de archivos', () => {
  beforeEach(() => {
    // Limpiamos los mocks y el estado entre pruebas
    jest.clearAllMocks();
    Object.keys(mockedFiles).forEach(key => delete mockedFiles[key]);
    mockedDeletedFiles.length = 0;
  });

  describe('POST /api/upload', () => {
    it('debe rechazar solicitudes sin archivo', async () => {
      // Crear un FormData vacío
      const formData = new FormData();
      
      // Crear una solicitud con el FormData
      const request = new Request('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });

      // Llamar a la función POST
      const response = await POST(request) as unknown as MockedResponse;
      
      // Verificar que la respuesta incluye un error
      expect(response.data.error).toBe('No se ha proporcionado un archivo');
      expect(response.options.status).toBe(400);
    });

    it('debe procesar correctamente un archivo subido', async () => {
      // Crear un archivo de prueba
      const testFile = createMockFile('documento_prueba.pdf', 'contenido de prueba');
      
      // Crear un FormData y añadir el archivo
      const formData = new FormData();
      formData.append('file', testFile);
      
      // Crear una solicitud con el FormData
      const request = new Request('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });

      // Llamar a la función POST
      const response = await POST(request) as unknown as MockedResponse;
      
      // Verificar la respuesta
      expect(response.data.fileUrl).toContain('/uploads/documento_prueba_mock-uuid-12345678.pdf');
      expect(response.data.originalName).toBe('documento_prueba.pdf');
      
      // Verificar que el archivo se "guardó" en nuestro mock
      expect(Object.keys(mockedFiles).length).toBe(1);
      expect(mockedFiles[response.data.fileUrl]).toBeDefined();
    });
  });

  describe('DELETE /api/upload', () => {
    it('debe rechazar solicitudes sin ruta de archivo', async () => {
      // Crear una solicitud sin filePath
      const request = new Request('http://localhost:3000/api/upload', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      // Llamar a la función DELETE
      const response = await DELETE(request) as unknown as MockedResponse;
      
      // Verificar que la respuesta incluye un error
      expect(response.data.error).toBe('No se ha proporcionado una ruta de archivo');
      expect(response.options.status).toBe(400);
    });

    it('debe eliminar correctamente un archivo existente', async () => {
      // Primero, "subimos" un archivo
      const testFile = createMockFile('documento_prueba.pdf', 'contenido de prueba');
      const formData = new FormData();
      formData.append('file', testFile);
      
      const uploadRequest = new Request('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadResponse = await POST(uploadRequest) as unknown as MockedResponse;
      const fileUrl = uploadResponse.data.fileUrl;
      
      // Ahora intentamos eliminarlo
      const deleteRequest = new Request('http://localhost:3000/api/upload', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filePath: fileUrl }),
      });

      const deleteResponse = await DELETE(deleteRequest) as unknown as MockedResponse;
      
      // Verificar que la respuesta indica éxito
      expect(deleteResponse.data.success).toBe(true);
      expect(deleteResponse.data.message).toBe('Archivo eliminado correctamente');
      
      // Verificar que el archivo ya no está en nuestro mock
      expect(mockedFiles[fileUrl]).toBeUndefined();
      // Y que está en la lista de archivos eliminados
      expect(mockedDeletedFiles).toContain(fileUrl);
    });

    it('debe manejar correctamente la eliminación de un archivo inexistente', async () => {
      // Intentar eliminar un archivo que no existe
      const deleteRequest = new Request('http://localhost:3000/api/upload', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filePath: '/uploads/archivo_inexistente.pdf' }),
      });

      const deleteResponse = await DELETE(deleteRequest) as unknown as MockedResponse;
      
      // Verificar que la respuesta indica que el archivo no existe
      expect(deleteResponse.data.success).toBe(false);
      expect(deleteResponse.data.message).toBe('El archivo no existe');
    });
  });
}); 