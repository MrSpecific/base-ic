import { cpSync } from 'fs';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      outDir: 'dist',
      rollupTypes: false,
    }),
    {
      name: 'copy-token-css',
      // After the bundle is written, copy the token CSS directory into dist/.
      // Plain CSS files are not automatically emitted by Vite's JS pipeline,
      // so we copy them manually to make `import 'base-ic/tokens'` work.
      closeBundle() {
        cpSync(
          resolve(__dirname, 'src/tokens'),
          resolve(__dirname, 'dist/tokens'),
          { recursive: true }
        );
      },
    },
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      // Use rollupOptions.input directly (instead of lib.entry) so that
      // preserveModules applies correctly — lib mode's entry conflicts with it.
      input: resolve(__dirname, 'src/index.ts'),
      // Peer deps must never be bundled — consumers provide them
      external: ['react', 'react/jsx-runtime', 'react-dom', '@base-ui/react'],
      // preserveEntrySignatures must be set when using preserveModules without lib mode
      preserveEntrySignatures: 'exports-only',
      output: {
        // One .js file per source file — enables tree-shaking and
        // emits CSS alongside each component's JS module
        preserveModules: true,
        // Strip 'src/' prefix: dist/components/Theme/Theme.js (not dist/src/...)
        preserveModulesRoot: 'src',
        format: 'es',
        // Ensure .js extensions on output files
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        // Place the consolidated style.css at a fixed path (no hash) so the
        // package.json export "./style.css" resolves to a stable filename.
        assetFileNames: '[name][extname]',
      },
    },
    // All component CSS extracted into a single dist/style.css so consumers
    // can import '@wlcr/base-ic/style.css' and bundlers discover it reliably.
    // Without this, CSS module proxy files have no import chain to dist/assets/
    // and Turbopack / webpack skip the CSS entirely.
    cssCodeSplit: false,
    // Do not minify — consumers handle that in their own build
    minify: false,
    // Source maps for debuggability in downstream projects
    sourcemap: true,
    emptyOutDir: true,
  },
  css: {
    modules: {
      // Readable in DevTools, collision-free: e.g. "button.module__root__abc12"
      generateScopedName: '[name]__[local]__[hash:base64:5]',
    },
  },
});
