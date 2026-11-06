import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// base : le site est servi à la racine de ounokoya.github.io (ADR-0008)
export default defineConfig({ base: '/', plugins: [tailwindcss()] })
