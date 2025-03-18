import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-github-calendar': 'react-github-calendar/es/index.js', // try 'cjs' or 'umd' too if needed
    },
  },
});
