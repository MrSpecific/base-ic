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

// Layout components
export { Box, Flex, Grid, Container, Section } from './components/Layout';
export type {
  BoxProps,
  FlexProps,
  GridProps,
  ContainerProps,
  SectionProps,
} from './components/Layout';

// Button
export { Button } from './components/Button';
export type { ButtonProps } from './components/Button';

// Card
export { Card } from './components/Card';
export type { CardProps } from './components/Card';

// Badge
export { Badge } from './components/Badge';
export type { BadgeProps } from './components/Badge';

// Separator
export { Separator } from './components/Separator';
export type { SeparatorProps } from './components/Separator';

// Typography components
export {
  Text,
  Heading,
  Code,
  Kbd,
  Link,
  Em,
  Strong,
  Quote,
} from './components/Typography';
export type {
  TextProps,
  HeadingProps,
  CodeProps,
  KbdProps,
  LinkProps,
  EmProps,
  StrongProps,
  QuoteProps,
} from './components/Typography';
