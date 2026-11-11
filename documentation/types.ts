import type { AccentColor, Appearance, GrayColor, Radius, Scaling } from '../src';
import type { DocsSection, Page } from './routes';

export type { AccentColor, Appearance, GrayColor, Radius, Scaling };
export type { DocsSection, Page };

export type RouteState = {
  page: Page;
  docsSection: DocsSection;
};

/** The palette builder's saved palette: its share-link query string, and whether it is applied site-wide. */
export type SavedPalette = { search: string; on: boolean };
