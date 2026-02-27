import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * Documentation site Vite config — dev server for docs/playground iteration.
 *
 * Imports directly from src/ (not dist/) so HMR works instantly.
 * This is NOT the library build config — that lives at the project root.
 */
export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname),
  resolve: {
    alias: {
      // Let `import ... from 'base-ic'` resolve to the source for HMR
      'base-ic': resolve(__dirname, '../src/index.ts'),
    },
  },
  server: {
    port: 3333,
    open: true,
  },
  css: {
    modules: {
      // Match the same scoped name pattern as the library build
      generateScopedName: '[local]__[hash:base64:5]',
    },
  },
});
