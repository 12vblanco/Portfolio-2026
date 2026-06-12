import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'gsap'],
  },
  ssr: {
    // CJS packages must be bundled (not externalized) in the prerender build,
    // otherwise their default export breaks under Node ESM
    noExternal: ['styled-components', 'react-helmet-async'],
  },
});
