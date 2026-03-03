import type { AccentColor, Appearance, GrayColor, Radius, Scaling } from '../src';

export type { AccentColor, Appearance, GrayColor, Radius, Scaling };

export type Page = 'home' | 'docs' | 'customization' | 'for-designers' | 'playground';

export type DocsSection =
  | 'overview'
  | 'theme'
  | 'button'
  | 'badge'
  | 'card'
  | 'separator'
  | 'typography'
  | 'text'
  | 'heading'
  | 'link'
  | 'code'
  | 'kbd'
  | 'em'
  | 'strong'
  | 'quote'
  | 'tooltip'
  | 'popover'
  | 'box'
  | 'flex'
  | 'grid'
  | 'container'
  | 'section'
  | 'checkbox'
  | 'switch'
  | 'radio-group'
  | 'input'
  | 'select'
  | 'textarea'
  | 'tabs'
  | 'dialog'
  | 'alert-dialog'
  | 'accordion'
  | 'slider'
  | 'progress'
  | 'avatar';

export type RouteState = {
  page: Page;
  docsSection: DocsSection;
};
