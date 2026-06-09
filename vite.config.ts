import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    rollupOptions: {
      input: './index.html',
    },
  },
  resolve: {
    alias: {
      '/src/main.tsx': './main.tsx',
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
