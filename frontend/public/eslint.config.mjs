import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'react-hooks/exhaustive-deps': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      // Use this rukle when cicurlar imports breaks the build step
      // 'import/no-cycle': ['error', { maxDepth: Infinity }],
      '@next/next/no-img-element': 'off',
      'prefer-const': 'off',
      '@typescript-eslint/no-unused-expressions': 'off'
    },
  },
];

export default eslintConfig;