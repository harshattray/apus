/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'ChartLib',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'd3'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          d3: 'd3',
        },
      },
    },
  },
  resolve: {
    alias: {
      src: resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true, // Optional: to use Vitest globals like expect, vi without importing
    setupFiles: './src/setupTests.ts', // Optional: if you have a test setup file
  },
});
