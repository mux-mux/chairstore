import { defineConfig, type PluginOption } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa';

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
  plugins: [
    svgr(),
    react(),
    visualizer() as PluginOption,
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Chairstore',
        short_name: 'Chairstore',
        description: 'A Progressive Web App for Chair Store App',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
    }),
  ],
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
