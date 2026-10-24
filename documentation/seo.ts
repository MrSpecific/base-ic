/**
 * Machine-readable site metadata built from the route manifest (routes.ts):
 *  - llms.txt (https://llmstxt.org): a Markdown index of the docs for LLMs
 *  - per-route JSON-LD (schema.org) injected into each HTML entry's <head>
 *
 * vite.config.ts calls these at build/serve time, alongside sitemap.xml.
 * Keep this file free of React / DOM imports.
 */

import {
  DOCS_GROUPS,
  DOCS_ROUTES,
  GITHUB_URL,
  NPM_URL,
  PAGE_ROUTES,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  getRouteMeta,
  pageToPath,
  type DocsGroup,
  type DocsSection,
  type Page,
} from './routes.ts';

/** The fields of the library's package.json that the metadata uses. */
export type PackageInfo = {
  name: string;
  version: string;
  license: string;
  author: string;
  peerDependencies: Record<string, string>;
};

const WEBSITE_ID = `${SITE_URL}/#website`;
const SOFTWARE_ID = `${SITE_URL}/#software`;

/** llms.txt section heading for each docs sidebar group. */
const LLMS_GROUP_HEADINGS: Record<DocsGroup, string> = {
  Overview: 'Getting started',
  Theming: 'Theming',
  Layout: 'Layout components',
  Components: 'Components',
  Forms: 'Form components',
  Overlays: 'Overlay components',
  Navigation: 'Navigation components',
  Typography: 'Typography components',
};

function absoluteUrl(page: Page, docsSection?: DocsSection): string {
  return `${SITE_URL}${pageToPath(page, docsSection)}`;
}

function docsTitle(route: (typeof DOCS_ROUTES)[number]): string {
  return 'title' in route ? route.title : route.label;
}

// ============================================================================
// llms.txt
// ============================================================================

export function buildLlmsTxt(pkg: PackageInfo): string {
  const link = (title: string, url: string, description: string) =>
    `- [${title}](${url}): ${description}`;

  const docsSections = DOCS_GROUPS.map((group) => {
    const links = DOCS_ROUTES.filter((route) => route.group === group).map((route) =>
      link(docsTitle(route), absoluteUrl('docs', route.slug), route.description),
    );
    return `## ${LLMS_GROUP_HEADINGS[group]}\n\n${links.join('\n')}`;
  });

  const guides = (['customization', 'for-designers'] as const).map((page) =>
    link(PAGE_ROUTES[page].label, absoluteUrl(page), PAGE_ROUTES[page].description),
  );

  return `# ${SITE_NAME}

> ${PAGE_ROUTES.home.description}

- Package: \`${pkg.name}\` (current version ${pkg.version}, ${pkg.license} license). ESM only.
- Peer dependencies: \`@base-ui/react\` ${pkg.peerDependencies['@base-ui/react']}, plus \`react\` and \`react-dom\` (17, 18 or 19).
- Props follow Radix Themes: \`color\`, \`variant\`, \`size\`, \`radius\`, \`highContrast\`, and spacing props such as \`p\`, \`px\`, \`m\`, \`mt\`.
- Styling is plain CSS: CSS modules plus CSS custom properties. No Tailwind, no runtime CSS-in-JS.
- Wrap the app in \`<Theme>\` to set accent color, gray palette, radius, scaling and light/dark appearance. A nested \`Theme\` overrides these for its subtree.
- Components that wrap a Base UI part also export the raw part as \`<Name>Primitive\` (for example \`DialogPrimitive\`) for full control.

\`\`\`bash
npm install ${pkg.name} @base-ui/react
\`\`\`

\`\`\`tsx
import { Theme, Button, Text } from '${pkg.name}';
import '${pkg.name}/tokens';    // CSS custom property token definitions
import '${pkg.name}/style.css'; // component styles

export default function App() {
  return (
    <Theme accentColor="violet" radius="medium">
      <Button variant="solid" size="2">Get started</Button>
      <Text size="3">Shipped with semantic tokens.</Text>
    </Theme>
  );
}
\`\`\`

${docsSections.join('\n\n')}

## Guides

${guides.join('\n')}

## Optional

${link('Playground', absoluteUrl('playground'), PAGE_ROUTES.playground.description)}
${link('Source code', GITHUB_URL, 'The GitHub repository, with the README and source for every component.')}
${link('Changelog', `${GITHUB_URL}/blob/main/CHANGELOG.md`, 'Notable changes in each release, including breaking changes.')}
${link('npm package', NPM_URL, `Published versions of ${pkg.name}.`)}
`;
}

// ============================================================================
// JSON-LD
// ============================================================================

type JsonLdNode = Record<string, unknown>;

function siteNodes(pkg: PackageInfo): JsonLdNode[] {
  return [
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      description: SITE_TAGLINE,
      inLanguage: 'en',
      about: { '@id': SOFTWARE_ID },
    },
    {
      '@type': 'SoftwareSourceCode',
      '@id': SOFTWARE_ID,
      name: SITE_NAME,
      alternateName: pkg.name,
      description: PAGE_ROUTES.home.description,
      url: `${SITE_URL}/`,
      codeRepository: GITHUB_URL,
      programmingLanguage: ['TypeScript', 'CSS'],
      runtimePlatform: 'React',
      version: pkg.version,
      license: `https://spdx.org/licenses/${pkg.license}.html`,
      author: { '@type': 'Person', name: pkg.author },
      sameAs: [GITHUB_URL, NPM_URL],
    },
  ];
}

function breadcrumbs(items: Array<{ name: string; url: string }>): JsonLdNode {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * The JSON-LD graph for one route: the site and library on every page, plus a
 * WebPage (or TechArticle for component docs) with breadcrumbs. Null for pages
 * that aren't indexed (404).
 */
export function buildJsonLd(
  pkg: PackageInfo,
  page: Page,
  docsSection: DocsSection = 'overview',
): JsonLdNode | null {
  const meta = getRouteMeta(page, docsSection);
  if (!meta.canonical) return null;

  const home = { name: PAGE_ROUTES.home.label, url: absoluteUrl('home') };
  const docsHome = { name: 'Docs', url: absoluteUrl('docs') };

  let pageNode: JsonLdNode;
  if (page === 'home') {
    pageNode = { '@type': 'WebPage' };
  } else if (page === 'docs') {
    const route = DOCS_ROUTES.find((candidate) => candidate.slug === docsSection)!;
    const trail =
      docsSection === 'overview' ? [home, docsHome] : [home, docsHome, { name: docsTitle(route), url: meta.canonical }];
    pageNode = {
      '@type': docsSection === 'overview' ? 'WebPage' : 'TechArticle',
      ...(docsSection === 'overview' ? {} : { headline: docsTitle(route), articleSection: route.group }),
      breadcrumb: breadcrumbs(trail),
    };
  } else {
    pageNode = {
      '@type': 'WebPage',
      breadcrumb: breadcrumbs([home, { name: PAGE_ROUTES[page].label, url: meta.canonical }]),
    };
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...siteNodes(pkg),
      {
        ...pageNode,
        '@id': `${meta.canonical}#webpage`,
        url: meta.canonical,
        name: meta.title,
        description: meta.description,
        inLanguage: 'en',
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': SOFTWARE_ID },
      },
    ],
  };
}

/** A `<script type="application/ld+json">` tag, safe to inline in HTML. */
export function jsonLdScriptTag(data: JsonLdNode): string {
  // Escape `<` so a value can never close the script element early.
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">${json}</script>`;
}
