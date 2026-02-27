import type { DocsSection, Page, RouteState } from './types';

export function getRouteFromPath(pathname: string): RouteState {
  const normalized = pathname.trim().replace(/\/+$/, '') || '/';
  if (normalized === '/docs') return { page: 'docs', docsSection: 'overview' };
  if (normalized.startsWith('/docs/')) {
    const slug = normalized.slice('/docs/'.length) as DocsSection;
    if (slug === 'theme' || slug === 'tooltip' || slug === 'popover') {
      return { page: 'docs', docsSection: slug };
    }
    return { page: 'docs', docsSection: 'overview' };
  }
  if (normalized === '/customization') return { page: 'customization', docsSection: 'overview' };
  if (normalized === '/for-designers') return { page: 'for-designers', docsSection: 'overview' };
  if (normalized === '/playground') return { page: 'playground', docsSection: 'overview' };
  return { page: 'home', docsSection: 'overview' };
}

export function pageToPath(page: Page, docsSection: DocsSection = 'overview'): string {
  if (page === 'docs') return docsSection === 'overview' ? '/docs/' : `/docs/${docsSection}/`;
  if (page === 'customization') return '/customization/';
  if (page === 'for-designers') return '/for-designers/';
  if (page === 'playground') return '/playground/';
  return '/';
}
