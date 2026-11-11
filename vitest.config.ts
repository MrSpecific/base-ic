import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import { responsiveCss } from './build/responsive-css.ts';

export default defineConfig({
  plugins: [react(), responsiveCss()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    css: true,
  },
});
