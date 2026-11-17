import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// base : le site est servi à la racine de ounokoya.github.io (ADR-0008) ;
// deux pages, une par langue : / (anglais) et /fr/ (français) (ADR-0009)
export default defineConfig({
  base: '/',
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        en: new URL('./index.html', import.meta.url).pathname,
        fr: new URL('./fr/index.html', import.meta.url).pathname,
      },
    },
  },
})
