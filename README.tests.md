# Guía de Pruebas para Presus-PYMES

Este documento proporciona información sobre cómo ejecutar y escribir pruebas para la aplicación Presus-PYMES.

## Configuración

La aplicación utiliza Jest como framework de pruebas junto con React Testing Library para probar componentes. La configuración está definida en los siguientes archivos:

- `jest.config.ts`: Configuración principal de Jest
- `jest.setup.ts`: Configuración adicional y extensiones para Jest

## Ejecutar las pruebas

Puedes ejecutar las pruebas utilizando los siguientes comandos:

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas en modo vigilancia (útil durante el desarrollo)
npm run test:watch

# Ejecutar pruebas con cobertura
npm run test:coverage

# Ejecutar pruebas específicas (por ruta o patrón)
npm test -- src/lib/utils
```

## Tipos de pruebas

### 1. Pruebas de Utilidades

Estas pruebas verifican funciones utilitarias específicas. Son las más simples y no requieren mocks complejos.

Ejemplo: `src/lib/utils/__tests__/fileUtils.test.ts`

```typescript
import { getFileNameWithoutExtension } from '../fileUtils';

describe('getFileNameWithoutExtension', () => {
  it('debe devolver el nombre del archivo sin la extensión', () => {
    expect(getFileNameWithoutExtension('documento.pdf')).toBe('documento');
  });
});
```

### 2. Pruebas de Componentes

Estas pruebas verifican que los componentes de React se rendericen correctamente y respondan a las interacciones del usuario.

Ejemplo: `src/components/ui/tests/__tests__/archivo-item.test.tsx`

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { ArchivoItem } from '../archivo-item';

describe('ArchivoItem', () => {
  it('debe renderizar correctamente el nombre del archivo', () => {
    render(
      <ArchivoItem
        fileName="documento_test.pdf"
        fileUrl="/uploads/documento_test.pdf"
        onRemove={() => {}}
      />
    );

    const nombreArchivo = screen.getByTestId('archivo-nombre');
    expect(nombreArchivo).toBeInTheDocument();
  });
});
```

### 3. Pruebas de API (Avanzado)

Estas pruebas verifican el comportamiento de las rutas de API. Requieren mocks más complejos y simulación de peticiones HTTP.

## Buenas prácticas

1. **Nombres descriptivos**: Usa nombres descriptivos para tus pruebas. El formato `it('debe hacer algo', ...)` ayuda a entender qué se está probando.

2. **Aislamiento**: Cada prueba debe ser independiente. Usa `beforeEach` para restablecer el estado entre pruebas.

3. **Testing Library**: Prefiere los selectores que proporciona React Testing Library en este orden:
   - `getByRole` (más accesible)
   - `getByTestId` (cuando los roles no son claros)
   - `getByText`

4. **Prueba comportamientos, no implementación**: Enfócate en probar lo que el usuario ve y con lo que interactúa, no detalles internos de implementación.

5. **Mocks**: Usa mocks para simular dependencias externas (API, servicios, etc.).

## Ejemplo de un test completo

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MiComponente } from '../mi-componente';

// Mock para las funciones externas
jest.mock('@/lib/api', () => ({
  fetchData: jest.fn().mockResolvedValue({ id: 1, name: 'Ejemplo' }),
}));

describe('MiComponente', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe mostrar datos cargados desde la API', async () => {
    render(<MiComponente />);
    
    // Comprueba que se muestra un indicador de carga
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
    
    // Espera a que se complete la carga
    await waitFor(() => {
      expect(screen.getByText('Ejemplo')).toBeInTheDocument();
    });
  });
  
  it('debe manejar la interacción del usuario', async () => {
    const mockOnClick = jest.fn();
    render(<MiComponente onClick={mockOnClick} />);
    
    // Simula un clic en un botón
    fireEvent.click(screen.getByRole('button', { name: 'Enviar' }));
    
    // Verifica que se llamó a la función
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
```

## Recursos adicionales

- [Documentación de Jest](https://jestjs.io/docs/getting-started)
- [Documentación de React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Guía de consultas en Testing Library](https://testing-library.com/docs/queries/about)
- [Buenas prácticas de Testing Library](https://testing-library.com/docs/guiding-principles) 