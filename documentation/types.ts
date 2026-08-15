import type { AccentColor, Appearance, GrayColor, Radius, Scaling } from '../src';

export type { AccentColor, Appearance, GrayColor, Radius, Scaling };

export type Page = 'home' | 'docs' | 'customization' | 'for-designers' | 'playground';

export type DocsSection =
  | 'overview'
  | 'types'
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
  | 'navigation-menu'
  | 'dialog'
  | 'alert-dialog'
  | 'drawer'
  | 'accordion'
  | 'slider'
  | 'progress'
  | 'avatar'
  | 'field'
  | 'fieldset'
  | 'number-field'
  | 'otp-field'
  | 'toggle'
  | 'menu'
  | 'menubar'
  | 'collapsible'
  | 'skeleton';

export type RouteState = {
  page: Page;
  docsSection: DocsSection;
};
