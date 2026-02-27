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
  appType: 'mpa',
  resolve: {
    alias: {
      // Let `import ... from 'base-ic'` resolve to the source for HMR
      'base-ic': resolve(__dirname, '../src/index.ts'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        docs: resolve(__dirname, 'docs/index.html'),
        docsTheme: resolve(__dirname, 'docs/theme/index.html'),
        docsTooltip: resolve(__dirname, 'docs/tooltip/index.html'),
        docsPopover: resolve(__dirname, 'docs/popover/index.html'),
        customization: resolve(__dirname, 'customization/index.html'),
        forDesigners: resolve(__dirname, 'for-designers/index.html'),
        playground: resolve(__dirname, 'playground/index.html'),
      },
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
