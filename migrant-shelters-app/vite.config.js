import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'maplibre': ['maplibre-gl'],
          'mapbox': ['mapbox-gl', 'react-map-gl'],
          'radix': ['@radix-ui/themes', '@radix-ui/react-icons', '@radix-ui/react-switch', '@radix-ui/react-popover'],
          'vendor': ['react', 'react-dom'],
          // Add more chunks if needed
          'utils': [
            './src/utils/filterShelters.js', 
            './src/utils/servicebuckets.js'
          ]
        }
      },
      // Add cache buster to chunk filenames
      entryFileNames: 'assets/[name].[hash].js',
      chunkFileNames: 'assets/[name].[hash].js',
      assetFileNames: 'assets/[name].[hash].[ext]'
    },
    sourcemap: false, // Set to true for development
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
