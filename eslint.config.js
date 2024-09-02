import eslintConfigPrettier from 'eslint-config-prettier';
import jest from 'eslint-plugin-jest';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Reference: https://eslint.org/docs/latest/use/configure/migration-guide#using-eslintrc-configs-in-flat-config
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const compat = new FlatCompat({
  baseDirectory: dirname,
});

export default [
  {
    ignores: ['**/.*', 'dist/**', 'node_modules/**', 'bin/**', 'build/**'],
  },

  js.configs.recommended,

  {
    plugins: {
      jest: jest,
    },
    rules: {
      'no-console': 'error',
    },
  },

  // mimic environments
  ...compat.env({
    es2022: true,
    node: true,
    jest: true,
  }),

  eslintConfigPrettier,
];
