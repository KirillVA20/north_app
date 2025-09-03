import { readFileSync } from 'fs';

// Reading the SWC compilation config for the spec files
const swcJestConfig = JSON.parse(
  readFileSync(`${__dirname}/.spec.swcrc`, 'utf-8')
);

// Disable .swcrc look-up by SWC core because we're passing in swcJestConfig ourselves
swcJestConfig.swcrc = false;

if (typeof structuredClone === 'undefined') {
  global.structuredClone = (val) => JSON.parse(JSON.stringify(val)); // Basic polyfill for testing
  // For more robust polyfill, consider a library like 'lodash.clonedeep'
}

export default {
  displayName: '@test/frontend-admin-app',
  testEnvironment: 'jsdom',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['@swc/jest', swcJestConfig],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: 'test-output/jest/coverage',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
