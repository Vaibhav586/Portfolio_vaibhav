import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['axios'], // Add axios to the include list
  },
  build: {
    rollupOptions: {
      external: ['axios'], // Explicitly externalize axios
    },
  },
});
