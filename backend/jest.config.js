/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * http
 */

const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  bail: true,
  clearMocks: true,
  preset: 'ts-jest',
  coverageProvider: 'v8',
  // testEnvironment: "test",
  testMatch: ['**/__tests__/**/*.spec.ts?(x)'],
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' } )
};
