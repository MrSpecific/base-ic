import type { AccentColor, Appearance, GrayColor, Radius, Scaling } from '../src';
import type { DocsSection, Page } from './routes';

export type { AccentColor, Appearance, GrayColor, Radius, Scaling };
export type { DocsSection, Page };

export type RouteState = {
  page: Page;
  docsSection: DocsSection;
};
