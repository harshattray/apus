/// <reference types="vitest" />
import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig(() => {
  // Environment variable to differentiate between library and demo build
  const isDemoBuild = process.env.VITE_APP_BUILD === 'demo';

  const baseConfig: UserConfig = {
    plugins: [react()],
    resolve: {
      alias: {
        src: resolve(__dirname, './src'),
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/setupTests.ts'],
    },
  };

  // Configuration for building the demo application
  const demoConfig: UserConfig = {
    ...baseConfig,
    build: {
      outDir: 'dist/demo',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/main.tsx'),
          index: resolve(__dirname, 'index.html'),
        },
        output: {
          // Customize output if needed, but default should be fine
        },
      },
    },
  };

  // Configuration for building the library
  const libraryConfig: UserConfig = {
    ...baseConfig,
    plugins: [
      react(),
      dts({
        include: ['src'],
        rollupTypes: true,
      }),
    ],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        fileName: (format) => `index.${format}.js`,
        formats: ['es', 'umd', 'cjs'],
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'd3', '@heroicons/react'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            d3: 'd3',
            '@heroicons/react': 'HeroiconsReact',
          },
          exports: 'named',
        },
      },
    },
  };

  // Return the appropriate configuration based on the environment variable
  return isDemoBuild ? demoConfig : libraryConfig;
});
