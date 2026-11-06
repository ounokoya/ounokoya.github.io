// Règles JavaScript vérifiées comme par les vérifications automatiques de FM (préréglage recommandé d'ESLint)
import js from '@eslint/js'
import globals from 'globals'

export default [
  { ignores: ['dist/', 'node_modules/', 'test-results/', 'playwright-report/'] },
  js.configs.recommended,
  { files: ['tests/**/*.js', 'scripts/**/*.js', '*.config.js'], languageOptions: { globals: { ...globals.node, ...globals.browser } } },
]
