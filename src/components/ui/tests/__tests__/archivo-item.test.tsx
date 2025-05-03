import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ArchivoItem } from '../archivo-item';

// Mock para las funciones de callback
const mockOnRemove = jest.fn();
const mockOnView = jest.fn();

describe('ArchivoItem', () => {
  // Antes de cada test, limpiamos los mocks
  beforeEach(() => {
    mockOnRemove.mockClear();
    mockOnView.mockClear();
  });

  it('debe renderizar correctamente el nombre del archivo', () => {
    render(
      <ArchivoItem
        fileName="documento_test.pdf"
        fileUrl="/uploads/documento_test.pdf"
        onRemove={mockOnRemove}
      />
    );

    const nombreArchivo = screen.getByTestId('archivo-nombre');
    expect(nombreArchivo).toBeInTheDocument();
    expect(nombreArchivo.textContent).toBe('documento_test.pdf');
  });

  it('debe tener el enlace de descarga correctamente configurado', () => {
    render(
      <ArchivoItem
        fileName="documento_test.pdf"
        fileUrl="/uploads/documento_test.pdf"
        onRemove={mockOnRemove}
      />
    );

    const enlaceDescarga = screen.getByTestId('archivo-descargar');
    expect(enlaceDescarga).toHaveAttribute('href', '/uploads/documento_test.pdf');
    expect(enlaceDescarga).toHaveAttribute('download', 'documento_test.pdf');
  });

  it('debe usar el nombre de descarga personalizado si se proporciona', () => {
    render(
      <ArchivoItem
        fileName="documento_test_abc123.pdf"
        fileUrl="/uploads/documento_test_abc123.pdf"
        onRemove={mockOnRemove}
        downloadName="Documento de prueba.pdf"
      />
    );

    const enlaceDescarga = screen.getByTestId('archivo-descargar');
    expect(enlaceDescarga).toHaveAttribute('download', 'Documento de prueba.pdf');
  });

  it('debe llamar a onView al hacer clic en el enlace de descarga', () => {
    render(
      <ArchivoItem
        fileName="documento_test.pdf"
        fileUrl="/uploads/documento_test.pdf"
        onRemove={mockOnRemove}
        onView={mockOnView}
      />
    );

    const enlaceDescarga = screen.getByTestId('archivo-descargar');
    fireEvent.click(enlaceDescarga);

    expect(mockOnView).toHaveBeenCalledTimes(1);
  });

  it('debe llamar a onRemove al hacer clic en el botón de eliminar', async () => {
    render(
      <ArchivoItem
        fileName="documento_test.pdf"
        fileUrl="/uploads/documento_test.pdf"
        onRemove={mockOnRemove}
      />
    );

    const botonEliminar = screen.getByTestId('archivo-eliminar');
    fireEvent.click(botonEliminar);

    await waitFor(() => {
      expect(mockOnRemove).toHaveBeenCalledTimes(1);
    });
  });

  it('debe desactivar el botón de eliminar durante la operación', async () => {
    // Simulamos una operación de eliminación que tarda un poco
    mockOnRemove.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(
      <ArchivoItem
        fileName="documento_test.pdf"
        fileUrl="/uploads/documento_test.pdf"
        onRemove={mockOnRemove}
      />
    );

    const botonEliminar = screen.getByTestId('archivo-eliminar');
    
    // El botón inicialmente está habilitado
    expect(botonEliminar).not.toBeDisabled();
    
    // Hacemos clic en el botón
    fireEvent.click(botonEliminar);
    
    // Durante la operación, el botón debería estar desactivado
    expect(botonEliminar).toBeDisabled();
    
    // Después de la operación, el botón debería volver a estar habilitado
    await waitFor(() => {
      expect(botonEliminar).not.toBeDisabled();
    });
    
    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });
}); 