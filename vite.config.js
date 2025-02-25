import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
        background: 'public/background.js' // Inclui o background.js no build
      },
      output: {
          entryFileNames: '[name].js' // Mantém o nome do arquivo
      }
    },
  },
});