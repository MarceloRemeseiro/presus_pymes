import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  // Proporcionar la ruta al directorio de la aplicación Next.js para cargar next.config.js y .env
  dir: './',
});

// Configuración personalizada de Jest
const config: Config = {
  // Agrega más configuraciones aquí según sea necesario
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    // Manejar los alias de módulos (como se definen en tsconfig.json)
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
};

// createJestConfig se exporta de esta manera para garantizar que next/jest pueda cargar la configuración Next.js
export default createJestConfig(config); 