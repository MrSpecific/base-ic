/**
 * Route manifest — the single source of truth for every page on the docs site.
 *
 * It drives:
 *  - client routing (routing.ts) and the `Page` / `DocsSection` types
 *  - the docs sidebar groups + search keywords (pages/DocsPage.tsx)
 *  - per-route <title>, meta description, canonical and Open Graph tags,
 *    injected into each HTML entry at build/serve time (vite.config.ts)
 *  - the Vite MPA build inputs and sitemap.xml
 *  - llms.txt and per-route JSON-LD (seo.ts)
 *
 * Keep this file free of React / DOM imports: vite.config.ts imports it.
 */

export const SITE_URL = 'https://base-ic.vercel.app';
export const SITE_NAME = 'base-ic';
export const SITE_TAGLINE = 'Radix Themes-style React components, built on Base UI';
export const GITHUB_URL = 'https://github.com/MrSpecific/base-ic';
export const NPM_URL = 'https://www.npmjs.com/package/@wlcr/base-ic';

export const DOCS_GROUPS = [
  'Overview',
  'Theming',
  'Layout',
  'Components',
  'Forms',
  'Overlays',
  'Navigation',
  'Typography',
] as const;

export type DocsGroup = (typeof DOCS_GROUPS)[number];

type DocsRouteDefinition = {
  /** URL slug under /docs/ ("overview" is /docs/ itself). */
  slug: string;
  /** Sidebar label. */
  label: string;
  /** Sidebar group. */
  group: DocsGroup;
  /** Page <title> prefix; defaults to `label`. */
  title?: string;
  /** Meta description (also used for og:description). */
  description: string;
  /** Extra sidebar search terms. */
  keywords?: readonly string[];
};

export const DOCS_ROUTES = [
  {
    slug: 'overview',
    label: 'Getting Started',
    group: 'Overview',
    title: 'Getting started',
    description: 'Install base-ic, wrap your app in Theme, and start building with Radix Themes-style components on Base UI.',
    keywords: ['install', 'setup', 'introduction', 'quick start'],
  },
  {
    slug: 'types',
    label: 'Types',
    group: 'Overview',
    description: 'Shared TypeScript types exported by base-ic: AccentColor, GrayColor, Radius, Scaling, Appearance and more.',
    keywords: ['typescript', 'accentcolor', 'graycolor', 'radius', 'scaling'],
  },
  {
    slug: 'theme',
    label: 'Theme',
    group: 'Theming',
    description: 'Configure accent color, gray palette, radius, scaling, appearance and fonts for everything inside a Theme.',
    keywords: ['appearance', 'dark mode', 'light mode', 'accent', 'tokens', 'custom colors', 'font'],
  },
  { slug: 'box', label: 'Box', group: 'Layout', description: 'Box is the base layout primitive: a div with spacing, sizing and display props.', keywords: ['div', 'spacing', 'padding', 'margin'] },
  { slug: 'container', label: 'Container', group: 'Layout', description: 'Container constrains page content to a consistent maximum width.', keywords: ['max width', 'page'] },
  { slug: 'flex', label: 'Flex', group: 'Layout', description: 'Flex lays out children with flexbox: direction, alignment, wrapping and gap.', keywords: ['flexbox', 'stack', 'row', 'column', 'gap'] },
  { slug: 'grid', label: 'Grid', group: 'Layout', description: 'Grid lays out children with CSS grid columns, rows and gap.', keywords: ['css grid', 'columns', 'rows'] },
  { slug: 'section', label: 'Section', group: 'Layout', description: 'Section adds consistent vertical spacing between large blocks of page content.', keywords: ['spacing', 'page'] },
  { slug: 'accordion', label: 'Accordion', group: 'Components', description: 'Accordion: a stack of headings that expand and collapse their associated panels.', keywords: ['expand', 'collapse', 'disclosure', 'faq'] },
  { slug: 'avatar', label: 'Avatar', group: 'Components', description: 'Avatar shows a user image with an initials fallback.', keywords: ['image', 'profile', 'user', 'fallback'] },
  { slug: 'badge', label: 'Badge', group: 'Components', description: 'Badge: a compact label for status, counts and metadata.', keywords: ['tag', 'chip', 'label', 'status', 'pill'] },
  { slug: 'button', label: 'Button', group: 'Components', description: 'Button triggers actions, with sizes, variants, colors, radius and loading state.', keywords: ['action', 'cta', 'submit', 'loading'] },
  { slug: 'card', label: 'Card', group: 'Components', description: 'Card groups related content on a raised or outlined surface.', keywords: ['surface', 'panel', 'container'] },
  { slug: 'collapsible', label: 'Collapsible', group: 'Components', description: 'Collapsible shows and hides a single panel of content.', keywords: ['expand', 'disclosure', 'toggle', 'details'] },
  { slug: 'data-list', label: 'DataList', group: 'Components', description: 'DataList displays metadata as aligned label/value pairs in a semantic description list.', keywords: ['dl', 'description list', 'key value', 'metadata', 'details', 'definition'] },
  { slug: 'inset', label: 'Inset', group: 'Components', description: 'Inset lets images and other content bleed to the edges of a Card.', keywords: ['bleed', 'full bleed', 'card image', 'media', 'negative margin'] },
  { slug: 'menu', label: 'Menu', group: 'Components', description: 'Menu: a dropdown list of actions with groups, checkbox items, radio items and submenus.', keywords: ['dropdown', 'context menu', 'actions'] },
  { slug: 'menubar', label: 'Menubar', group: 'Components', description: 'Menubar: a horizontal bar of menus, like a desktop application menu.', keywords: ['application menu', 'file edit view'] },
  { slug: 'progress', label: 'Progress', group: 'Components', description: 'Progress shows the completion status of a task.', keywords: ['loading', 'bar', 'percent'] },
  { slug: 'separator', label: 'Separator', group: 'Components', description: 'Separator visually or semantically divides content.', keywords: ['divider', 'hr', 'rule'] },
  { slug: 'skeleton', label: 'Skeleton', group: 'Components', description: 'Skeleton renders a placeholder while content is loading.', keywords: ['loading', 'placeholder', 'shimmer'] },
  { slug: 'table', label: 'Table', group: 'Components', description: 'Table lays out tabular data with semantic table markup, sizes, variants and horizontal scrolling.', keywords: ['data table', 'grid', 'rows', 'columns', 'thead', 'tbody'] },
  { slug: 'toggle', label: 'Toggle', group: 'Components', description: 'Toggle and ToggleGroup: buttons that switch between on and off states.', keywords: ['toggle group', 'pressed', 'segmented'] },
  { slug: 'autocomplete', label: 'Autocomplete', group: 'Forms', description: 'Autocomplete: a text input that suggests matching options as you type.', keywords: ['combobox', 'typeahead', 'search', 'suggest'] },
  { slug: 'checkbox', label: 'Checkbox', group: 'Forms', description: 'Checkbox lets users toggle an option on or off, with an indeterminate state.', keywords: ['check', 'tick', 'form'] },
  { slug: 'field', label: 'Field', group: 'Forms', description: 'Field connects a label, description, control and validation error.', keywords: ['label', 'error', 'validation', 'description', 'form'] },
  { slug: 'fieldset', label: 'Fieldset', group: 'Forms', description: 'Fieldset groups related form controls under a shared legend.', keywords: ['legend', 'group', 'form'] },
  { slug: 'input', label: 'Input', group: 'Forms', description: 'Input: a styled text field with sizes, variants and prefix/suffix slots.', keywords: ['text field', 'textbox', 'form', 'prefix', 'suffix'] },
  { slug: 'number-field', label: 'NumberField', group: 'Forms', description: 'NumberField: a numeric input with increment and decrement controls.', keywords: ['number', 'stepper', 'spin button', 'numeric'] },
  { slug: 'otp-field', label: 'OTPField', group: 'Forms', description: 'OTPField: segmented inputs for one-time passcodes and verification codes.', keywords: ['one time password', 'pin', 'code', 'verification'] },
  { slug: 'radio-group', label: 'RadioGroup', group: 'Forms', description: 'RadioGroup lets users pick exactly one option from a set.', keywords: ['radio', 'option', 'choice', 'form'] },
  { slug: 'select', label: 'Select', group: 'Forms', description: 'Select: a dropdown for choosing one value from a list of options.', keywords: ['dropdown', 'picker', 'listbox', 'form'] },
  { slug: 'slider', label: 'Slider', group: 'Forms', description: 'Slider selects a single value or a range by dragging a thumb.', keywords: ['range', 'drag', 'thumb'] },
  { slug: 'switch', label: 'Switch', group: 'Forms', description: 'Switch toggles a setting on or off immediately.', keywords: ['toggle', 'on off', 'form'] },
  { slug: 'textarea', label: 'Textarea', group: 'Forms', description: 'Textarea: a multi-line text input with sizes, variants and resize control.', keywords: ['multiline', 'text', 'form'] },
  { slug: 'alert-dialog', label: 'AlertDialog', group: 'Overlays', description: 'AlertDialog interrupts the user to confirm an important or destructive action.', keywords: ['confirm', 'modal', 'destructive'] },
  { slug: 'dialog', label: 'Dialog', group: 'Overlays', description: 'Dialog: a modal window layered over the page.', keywords: ['modal', 'popup', 'overlay'] },
  { slug: 'drawer', label: 'Drawer', group: 'Overlays', description: 'Drawer: a panel that slides in from the edge of the screen.', keywords: ['sheet', 'side panel', 'slide over'] },
  { slug: 'popover', label: 'Popover', group: 'Overlays', description: 'Popover shows rich, interactive content anchored to a trigger.', keywords: ['floating', 'overlay', 'anchor'] },
  { slug: 'toast', label: 'Toast', group: 'Overlays', description: 'Toast shows brief, non-blocking notifications.', keywords: ['notification', 'snackbar', 'alert', 'message'] },
  { slug: 'tooltip', label: 'Tooltip', group: 'Overlays', description: 'Tooltip shows a short hint when a trigger is hovered or focused.', keywords: ['hint', 'hover', 'title'] },
  { slug: 'navigation-menu', label: 'NavigationMenu', group: 'Navigation', description: 'NavigationMenu: site navigation links with rich dropdown panels.', keywords: ['nav', 'mega menu', 'links'] },
  { slug: 'tabs', label: 'Tabs', group: 'Navigation', description: 'Tabs switch between related panels of content.', keywords: ['tab list', 'panels', 'segmented'] },
  { slug: 'code', label: 'Code', group: 'Typography', description: 'Code marks up inline code snippets.', keywords: ['monospace', 'inline code', 'typography'] },
  { slug: 'em', label: 'Em', group: 'Typography', description: 'Em adds emphasis to a run of text.', keywords: ['italic', 'emphasis', 'typography'] },
  { slug: 'heading', label: 'Heading', group: 'Typography', description: 'Heading renders semantic h1–h6 titles on the type scale.', keywords: ['title', 'h1', 'h2', 'typography'] },
  { slug: 'kbd', label: 'Kbd', group: 'Typography', description: 'Kbd represents keyboard input and shortcuts.', keywords: ['keyboard', 'shortcut', 'key', 'typography'] },
  { slug: 'link', label: 'Link', group: 'Typography', description: 'Link: a styled anchor with size, weight, color and underline options.', keywords: ['anchor', 'href', 'a', 'typography'] },
  {
    slug: 'typography',
    label: 'Overview',
    group: 'Typography',
    title: 'Typography',
    description: 'The base-ic typography components and type scale at a glance.',
    keywords: ['typography', 'type scale', 'fonts', 'text'],
  },
  { slug: 'quote', label: 'Quote', group: 'Typography', description: 'Quote marks up short inline quotations.', keywords: ['quotation', 'q', 'typography'] },
  { slug: 'strong', label: 'Strong', group: 'Typography', description: 'Strong marks text of strong importance.', keywords: ['bold', 'typography'] },
  { slug: 'text', label: 'Text', group: 'Typography', description: 'Text renders body copy on the type scale with size, weight, color and truncation.', keywords: ['paragraph', 'body', 'span', 'typography'] },
] as const satisfies readonly DocsRouteDefinition[];

export type DocsSection = (typeof DOCS_ROUTES)[number]['slug'];

export type DocsRoute = DocsRouteDefinition & { slug: DocsSection };

export const DOCS_ROUTE_BY_SLUG: Record<DocsSection, DocsRoute> = Object.fromEntries(
  DOCS_ROUTES.map((route) => [route.slug, route]),
) as unknown as Record<DocsSection, DocsRoute>;

export function isDocsSection(value: string): value is DocsSection {
  return Object.prototype.hasOwnProperty.call(DOCS_ROUTE_BY_SLUG, value);
}

export type Page = 'home' | 'docs' | 'customization' | 'for-designers' | 'playground' | 'not-found';

type PageDefinition = {
  path: string;
  label: string;
  title: string;
  description: string;
};

export const PAGE_ROUTES: Record<Exclude<Page, 'docs'>, PageDefinition> = {
  home: {
    path: '/',
    label: 'Home',
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      'base-ic is a themeable React component library with a Radix Themes-style API, built on accessible Base UI primitives. Bring your own brand colors.',
  },
  customization: {
    path: '/customization/',
    label: 'Customization',
    title: `Customization — ${SITE_NAME}`,
    description: 'Theme base-ic with runtime props, override semantic tokens, and register custom brand color scales.',
  },
  'for-designers': {
    path: '/for-designers/',
    label: 'For Designers',
    title: `For designers — ${SITE_NAME}`,
    description: 'How base-ic tokens, color scales, type scale and spacing map to your design tool.',
  },
  playground: {
    path: '/playground/',
    label: 'Playground',
    title: `Playground — ${SITE_NAME}`,
    description: 'Try base-ic components live and tweak accent color, gray, radius, scaling and appearance.',
  },
  'not-found': {
    path: '/404.html',
    label: 'Not found',
    title: `Page not found — ${SITE_NAME}`,
    description: 'This page does not exist.',
  },
};

/** Primary header navigation. */
export const NAV_PAGES: Page[] = ['home', 'docs', 'customization', 'for-designers', 'playground'];

export function pageLabel(page: Page): string {
  return page === 'docs' ? 'Docs' : PAGE_ROUTES[page].label;
}

export function pageToPath(page: Page, docsSection: DocsSection = 'overview'): string {
  if (page === 'docs') return docsSection === 'overview' ? '/docs/' : `/docs/${docsSection}/`;
  return PAGE_ROUTES[page].path;
}

export type RouteMeta = {
  title: string;
  description: string;
  /** Absolute canonical URL, or null for pages that shouldn't be indexed. */
  canonical: string | null;
};

export function getRouteMeta(page: Page, docsSection: DocsSection = 'overview'): RouteMeta {
  if (page === 'docs') {
    const route = DOCS_ROUTE_BY_SLUG[docsSection];
    return {
      title: `${route.title ?? route.label} — ${SITE_NAME} docs`,
      description: route.description,
      canonical: `${SITE_URL}${pageToPath('docs', docsSection)}`,
    };
  }
  const definition = PAGE_ROUTES[page];
  return {
    title: definition.title,
    description: definition.description,
    canonical: page === 'not-found' ? null : `${SITE_URL}${definition.path}`,
  };
}

/** Every statically-built route: one HTML entry each. */
export function getStaticRoutes(): Array<{
  page: Page;
  docsSection: DocsSection;
  path: string;
  /** HTML entry, relative to the documentation root. */
  htmlFile: string;
}> {
  const pages = (['home', 'customization', 'for-designers', 'playground', 'not-found'] as const).map(
    (page) => ({
      page,
      docsSection: 'overview' as DocsSection,
      path: PAGE_ROUTES[page].path,
      htmlFile: page === 'not-found' ? '404.html' : `${PAGE_ROUTES[page].path.slice(1)}index.html`,
    }),
  );
  const docs = DOCS_ROUTES.map((route) => {
    const path = pageToPath('docs', route.slug);
    return { page: 'docs' as Page, docsSection: route.slug as DocsSection, path, htmlFile: `${path.slice(1)}index.html` };
  });
  return [...pages, ...docs];
}
