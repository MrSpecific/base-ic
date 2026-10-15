import { NAV_PAGES, pageLabel } from './routes';
import type { AccentColor, Appearance, GrayColor, Page, Radius, Scaling } from './types';

export const NAV_ITEMS: Array<{ page: Page; label: string }> = NAV_PAGES.map((page) => ({
  page,
  label: pageLabel(page),
}));

export const ACCENT_COLORS: AccentColor[] = [
  'tomato', 'red', 'ruby', 'crimson', 'pink', 'plum', 'purple', 'violet',
  'iris', 'indigo', 'blue', 'cyan', 'teal', 'jade', 'green', 'grass',
  'bronze', 'gold', 'brown', 'orange', 'amber', 'yellow', 'lime', 'mint',
  'sky', 'black',
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
  'gray', 'mauve', 'slate', 'sage', 'olive', 'sand',
  'tomato', 'red', 'ruby', 'crimson', 'pink', 'plum', 'purple', 'violet',
  'iris', 'indigo', 'blue', 'cyan', 'teal', 'jade', 'green', 'grass',
  'bronze', 'gold', 'brown', 'orange', 'amber', 'yellow', 'lime', 'mint', 'sky',
];

export const STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const ACCENT_SWATCH_COLORS: Record<string, string> = Object.fromEntries(
  ACCENT_COLORS.map((color) => [color, `var(--color-${color}-9)`]),
);

export function toDisplayName(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
