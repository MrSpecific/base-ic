import type { AccentColor, Appearance, GrayColor, Page, Radius, Scaling } from './types';

export const NAV_ITEMS: Array<{ page: Page; label: string }> = [
  { page: 'home', label: 'Home' },
  { page: 'docs', label: 'Docs' },
  { page: 'customization', label: 'Customization' },
  { page: 'for-designers', label: 'For Designers' },
  { page: 'playground', label: 'Playground' },
];

export const ACCENT_COLORS: AccentColor[] = [
  'blue', 'indigo', 'purple', 'violet', 'pink', 'ruby', 'red', 'orange',
  'amber', 'yellow', 'lime', 'green', 'jade', 'teal', 'cyan', 'sky', 'black',
];

export const GRAY_COLORS: GrayColor[] = ['gray', 'mauve', 'slate', 'sage', 'olive', 'sand'];

export const RADII: Radius[] = ['none', 'small', 'medium', 'large', 'full'];

export const SCALINGS: Scaling[] = [
  '80%', '85%', '90%', '95%', '100%',
  '105%', '110%', '115%', '120%', '125%',
  '130%', '135%', '140%', '145%', '150%',
];

export const APPEARANCES: Appearance[] = ['light', 'dark', 'inherit'];

export const ALL_HUES = [
  'gray', 'mauve', 'slate', 'sage', 'olive', 'sand', 'blue', 'indigo', 'purple', 'violet',
  'pink', 'ruby', 'red', 'orange', 'amber', 'yellow', 'lime', 'green',
  'jade', 'teal', 'cyan', 'sky',
];

export const STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const ACCENT_SWATCH_COLORS: Record<string, string> = {
  blue: 'var(--color-blue-9)',
  indigo: 'var(--color-indigo-9)',
  purple: 'var(--color-purple-9)',
  violet: 'var(--color-violet-9)',
  pink: 'var(--color-pink-9)',
  ruby: 'var(--color-ruby-9)',
  red: 'var(--color-red-9)',
  orange: 'var(--color-orange-9)',
  amber: 'var(--color-amber-9)',
  yellow: 'var(--color-yellow-9)',
  lime: 'var(--color-lime-9)',
  green: 'var(--color-green-9)',
  jade: 'var(--color-jade-9)',
  teal: 'var(--color-teal-9)',
  cyan: 'var(--color-cyan-9)',
  sky: 'var(--color-sky-9)',
  black: 'var(--color-black-9)',
};

export function toDisplayName(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
