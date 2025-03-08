import nextJest from 'next/jest.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  coverageProvider: 'v8',
  testEnvironment: 'node', // Changed from 'jsdom' for API testing
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/*.test.js', '**/*.test.jsx', '**/*.test.ts', '**/*.test.tsx'],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': [
      'babel-jest',
      { configFile: path.resolve(__dirname, '.babelrc.test') },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!(next|next/server|@next|next-auth|@babel/runtime)/)'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node', 'mjs'],
  // Add this configuration for different test environments
  projects: [
    {
      displayName: 'api',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/src/app/api/**/*.test.(js|ts)'],
      transform: {
        '^.+\\.(js|jsx|ts|tsx|mjs)$': [
          'babel-jest',
          { configFile: path.resolve(__dirname, '.babelrc.test') },
        ],
      },
      moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node', 'mjs'],
      transformIgnorePatterns: [
        'node_modules/(?!(next|next/server|@next|next-auth|@babel/runtime)/)',
      ],
    },
    {
      displayName: 'client',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/src/app/**/*.test.(jsx|tsx)'],
      moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node', 'mjs'],
      transformIgnorePatterns: [
        'node_modules/(?!(next|next/server|@next|next-auth|@babel/runtime)/)',
      ],
    },
    {
      displayName: 'integration',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/src/tests/integration/**/*.test.js'],
      setupFilesAfterEnv: ['<rootDir>/src/tests/integration/setup.js'],
    },
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig);
