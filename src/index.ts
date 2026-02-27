/**
 * base-ic
 * An opinionated React UI library built on Base UI.
 */

// Theme
export { Theme, useTheme } from './components/Theme';
export type {
  ThemeProps,
  AccentColor,
  GrayColor,
  Radius,
  Scaling,
  Appearance,
  CustomColorScale,
  FontFamilies,
} from './components/Theme';

// Overlay components
export { Tooltip, TooltipPrimitive } from './components/Tooltip';
export type { TooltipProps } from './components/Tooltip';
export { Popover, PopoverPrimitive } from './components/Popover';
export type { PopoverProps } from './components/Popover';
