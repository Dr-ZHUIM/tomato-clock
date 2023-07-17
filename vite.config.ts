import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { builtinModules } from "module";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    host: "0.0.0.0"
  },
  base: './',
  assetsInclude: ['**/*.json'],
  optimizeDeps: {
    include: ['react', 'ReactDOM', 'react-router-dom', 'typescript'],
    exclude: ['electron']
  },
  build: {
    minify: 'terser',
    outDir: 'build',
    rollupOptions: {
      output: {
        format: "es",
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'src/assets/[ext]/[name]-[hash].[ext]',
      },
      external: [
        'electron',
        ...builtinModules
      ]
    }
  },
})
