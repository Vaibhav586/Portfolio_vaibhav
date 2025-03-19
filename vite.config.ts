import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react']
    // Remove the axios include
  },
  build: {
    rollupOptions: {
      // Remove the external axios configuration
    }
  }
});
