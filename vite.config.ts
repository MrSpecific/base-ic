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
      // Roll up all declarations into a single index.d.ts for cleaner imports
      rollupTypes: true,
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
      },
    },
    // Do not minify — consumers handle that in their own build
    minify: false,
    // Source maps for debuggability in downstream projects
    sourcemap: true,
    emptyOutDir: true,
  },
  css: {
    modules: {
      // Readable in DevTools, collision-free: e.g. "theme__abc12"
      generateScopedName: '[local]__[hash:base64:5]',
    },
  },
});
