import { isDocsSection, PAGE_ROUTES } from './routes';
import type { RouteState } from './types';

export { getRouteMeta, pageToPath } from './routes';

export function getRouteFromPath(pathname: string): RouteState {
  const normalized = pathname.trim().replace(/\/index\.html$/, '').replace(/\/+$/, '') || '/';
  if (normalized === '/') return { page: 'home', docsSection: 'overview' };
  if (normalized === '/docs') return { page: 'docs', docsSection: 'overview' };
  if (normalized.startsWith('/docs/')) {
    const slug = normalized.slice('/docs/'.length);
    if (slug !== 'overview' && isDocsSection(slug)) {
      return { page: 'docs', docsSection: slug };
    }
    return { page: 'not-found', docsSection: 'overview' };
  }
  for (const page of ['customization', 'for-designers', 'playground'] as const) {
    if (normalized === PAGE_ROUTES[page].path.replace(/\/+$/, '')) {
      return { page, docsSection: 'overview' };
    }
  }
  return { page: 'not-found', docsSection: 'overview' };
}
