import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // Classic JSX import convention used throughout the project.
      'no-unused-vars': ['error', { varsIgnorePattern: '^React$', argsIgnorePattern: '^_' }],
      // The React Compiler-oriented rules added in eslint-plugin-react-hooks v7
      // over-flag legitimate imperative code that this site depends on:
      //  - Three.js / R3F buffer-attribute mutation inside useFrame (immutability)
      //  - seeded particle generation via Math.random in useMemo (purity)
      //  - one-shot init / media-query setState in effects (set-state-in-effect),
      //    a pattern the original LoopVideo.jsx already uses.
      // This project does not use the React Compiler, so disable these experimental
      // rules while keeping the classic rules-of-hooks + exhaustive-deps checks.
      'react-hooks/purity': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
])
