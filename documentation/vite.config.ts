import { createRequire } from 'node:module';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const require = createRequire(import.meta.url);
const reactEntry = require.resolve('react');
const reactJsxRuntimeEntry = require.resolve('react/jsx-runtime');
const reactJsxDevRuntimeEntry = require.resolve('react/jsx-dev-runtime');
const reactDomEntry = require.resolve('react-dom');
const baseUiReactEntry = require.resolve('@base-ui/react');

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
    dedupe: ['react', 'react-dom', '@base-ui/react'],
    alias: [
      // Let `import ... from 'base-ic'` resolve to the source for HMR
      { find: 'base-ic', replacement: resolve(__dirname, '../src/index.ts') },
      // Ensure dependencies resolve from documentation/node_modules even when importing ../src/*
      { find: /^react$/, replacement: reactEntry },
      { find: /^react\/jsx-runtime$/, replacement: reactJsxRuntimeEntry },
      { find: /^react\/jsx-dev-runtime$/, replacement: reactJsxDevRuntimeEntry },
      { find: /^react-dom$/, replacement: reactDomEntry },
      { find: /^@base-ui\/react$/, replacement: baseUiReactEntry },
    ],
  },
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        docs: resolve(__dirname, 'docs/index.html'),
        docsTheme: resolve(__dirname, 'docs/theme/index.html'),
        docsButton: resolve(__dirname, 'docs/button/index.html'),
        docsBadge: resolve(__dirname, 'docs/badge/index.html'),
        docsCard: resolve(__dirname, 'docs/card/index.html'),
        docsSeparator: resolve(__dirname, 'docs/separator/index.html'),
        docsTypography: resolve(__dirname, 'docs/typography/index.html'),
        docsText: resolve(__dirname, 'docs/text/index.html'),
        docsHeading: resolve(__dirname, 'docs/heading/index.html'),
        docsLink: resolve(__dirname, 'docs/link/index.html'),
        docsCode: resolve(__dirname, 'docs/code/index.html'),
        docsKbd: resolve(__dirname, 'docs/kbd/index.html'),
        docsEm: resolve(__dirname, 'docs/em/index.html'),
        docsStrong: resolve(__dirname, 'docs/strong/index.html'),
        docsQuote: resolve(__dirname, 'docs/quote/index.html'),
        docsTooltip: resolve(__dirname, 'docs/tooltip/index.html'),
        docsPopover: resolve(__dirname, 'docs/popover/index.html'),
        docsBox: resolve(__dirname, 'docs/box/index.html'),
        docsFlex: resolve(__dirname, 'docs/flex/index.html'),
        docsGrid: resolve(__dirname, 'docs/grid/index.html'),
        docsContainer: resolve(__dirname, 'docs/container/index.html'),
        docsSection: resolve(__dirname, 'docs/section/index.html'),
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
