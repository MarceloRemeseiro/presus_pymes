// Importar extensiones de jest-dom
import '@testing-library/jest-dom';

// Esto agrega matchers personalizados como 'toBeInTheDocument' a Jest
// Lo que facilita las pruebas de componentes de React con Testing Library

// Aquí también se pueden realizar configuraciones globales para pruebas
// como simular fetch, localStorage, etc.

// Ejemplo de configuración para simular fetch si es necesario:
// global.fetch = jest.fn();

// Eliminar advertencias relacionadas con act() en las pruebas
// Esto es útil para pruebas asíncronas
jest.setTimeout(10000); // Aumentar el tiempo de espera para pruebas más largas 