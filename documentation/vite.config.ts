import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
// Explicit extension: config files are loaded natively by future Vite versions.
import { getRouteMeta, getStaticRoutes, SITE_NAME, SITE_URL } from './routes.ts';

const require = createRequire(import.meta.url);
const reactEntry = require.resolve('react');
const reactJsxRuntimeEntry = require.resolve('react/jsx-runtime');
const reactJsxDevRuntimeEntry = require.resolve('react/jsx-dev-runtime');
const reactDomEntry = require.resolve('react-dom');
const baseUiReactEntry = require.resolve('@base-ui/react');

const THEME_STORAGE_KEY = 'base-ic:documentation-theme';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Per-route <head>: title, description, canonical, Open Graph / Twitter tags,
 * theme-color, plus a tiny pre-paint script at the top of <body> that applies
 * the visitor's saved appearance before React mounts (no light/dark flash). Every HTML entry is
 * identical on disk; this fills in the route-specific bits at build/serve time
 * from the route manifest (routes.ts). Also emits sitemap.xml.
 */
function routeHeadPlugin(): Plugin {
  const routes = getStaticRoutes();

  const buildSitemap = () => {
    const urls = routes
      .filter((route) => route.page !== 'not-found')
      .map((route) => `  <url><loc>${SITE_URL}${route.path}</loc></url>`)
      .join('\n');
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  };

  return {
    name: 'base-ic-docs-route-head',
    buildStart() {
      const missing = routes.filter(
        (route) => !existsSync(resolve(import.meta.dirname, route.htmlFile)),
      );
      if (missing.length > 0) {
        this.error(
          `Missing HTML entries for routes: ${missing.map((route) => route.htmlFile).join(', ')}`,
        );
      }
    },
    configureServer(server) {
      server.middlewares.use('/sitemap.xml', (_req, res) => {
        res.setHeader('Content-Type', 'application/xml');
        res.end(buildSitemap());
      });
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        // ctx.path is the entry's URL path, e.g. /docs/button/index.html.
        const htmlFile = ctx.path.replace(/^\//, '').replace(/(^|\/)$/, '$1index.html');
        const route =
          routes.find((candidate) => candidate.htmlFile === htmlFile) ??
          routes.find((candidate) => candidate.page === 'not-found')!;
        const meta = getRouteMeta(route.page, route.docsSection);
        const title = escapeHtml(meta.title);
        const description = escapeHtml(meta.description);
        const tags = [
          `<title>${title}</title>`,
          `<meta name="description" content="${description}" />`,
          meta.canonical
            ? `<link rel="canonical" href="${meta.canonical}" />`
            : '<meta name="robots" content="noindex" />',
          `<meta property="og:type" content="website" />`,
          `<meta property="og:site_name" content="${SITE_NAME}" />`,
          `<meta property="og:title" content="${title}" />`,
          `<meta property="og:description" content="${description}" />`,
          meta.canonical ? `<meta property="og:url" content="${meta.canonical}" />` : '',
          `<meta name="twitter:card" content="summary" />`,
          `<meta name="twitter:title" content="${title}" />`,
          `<meta name="twitter:description" content="${description}" />`,
          `<meta name="theme-color" media="(prefers-color-scheme: light)" content="#fcfcfd" />`,
          `<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#111113" />`,
        ]
          .filter(Boolean)
          .join('\n  ');
        // Applied to <body> (where Theme syncs appearance) before first paint;
        // the :root light defaults would beat an attribute on <html>.
        const appearanceScript = `<script>try{var a=JSON.parse(localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)})||'{}').appearance;if(a==='light'||a==='dark')document.body.setAttribute('data-appearance',a)}catch(e){}</script>`;
        return html
          .replace(/<title>[\s\S]*?<\/title>/, tags)
          .replace(/<body>/, `<body>\n  ${appearanceScript}`);
      },
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemap() });
    },
  };
}

/**
 * Documentation site Vite config — dev server for docs/playground iteration.
 *
 * Imports directly from src/ (not dist/) so HMR works instantly.
 * This is NOT the library build config — that lives at the project root.
 */
export default defineConfig({
  plugins: [react(), routeHeadPlugin()],
  root: resolve(import.meta.dirname),
  appType: 'mpa',
  resolve: {
    dedupe: ['react', 'react-dom', '@base-ui/react'],
    alias: [
      // Let `import ... from 'base-ic'` resolve to the source for HMR
      { find: 'base-ic', replacement: resolve(import.meta.dirname, '../src/index.ts') },
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
      // One HTML entry per route, straight from the route manifest.
      input: Object.fromEntries(
        getStaticRoutes().map((route) => [
          route.htmlFile.replace(/(\/)?index\.html$|\.html$/, '').replace(/\//g, '-') || 'home',
          resolve(import.meta.dirname, route.htmlFile),
        ]),
      ),
      output: {
        // Long-lived vendor chunks cache across deploys; docs pages are
        // lazy-loaded per section (pages/DocsPage.tsx).
        codeSplitting: {
          groups: [
            { name: 'vendor-react', test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
            { name: 'vendor-base-ui', test: /node_modules[\\/](@base-ui|@floating-ui|tabbable|reselect|use-sync-external-store)[\\/]/ },
          ],
        },
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
