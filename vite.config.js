import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react({
      // React 19 specific optimizations
      jsxRuntime: 'automatic',
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
        ]
      }
    })
  ],
  optimizeDeps: {
    include: ['react', 'react-dom', 'gsap', 'framer-motion'],
    exclude: ['@gsap/react'] // Don't pre-bundle GSAP React plugin
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'gsap': ['gsap', '@gsap/react'],
          'framer': ['framer-motion']
        }
      }
    }
  }
});