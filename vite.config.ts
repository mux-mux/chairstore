import { defineConfig, type PluginOption } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

const VENDOR_LIBS = [
  '/react',
  '/react-dom',
  '/react-router',
  '/react-redux',
  '/redux',
  '/redux-logger',
  '/redux-persist',
  '/firebase',
  '/stripe',
  '/reselect',
  '/styled-components',
];

// https://vite.dev/config/
export default defineConfig({
  plugins: [svgr(), react(), visualizer() as PluginOption],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('node_modules') &&
            VENDOR_LIBS.some((lib) => id.includes(lib))
          ) {
            return 'vendor';
          }
        },
      },
    },
  },
});
