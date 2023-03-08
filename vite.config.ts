import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/components/index.ts',
      formats: ['es', 'umd'],
      name: 'built-case',
    },
    rollupOptions: {
      external: /^lit/,
    },
  },
  server: {
    port: 80
  }
})
