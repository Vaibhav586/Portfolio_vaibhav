import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    // Remove axios from here if you want it to be external
  },
  build: {
    rollupOptions: {
      // Either remove this entire section if you want axios bundled
      // Or keep it if you truly want axios as an external dependency
    },
  },
});
