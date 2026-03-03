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

// Accordion
export { Accordion } from './components/Accordion';
export type { AccordionProps, AccordionItemProps, AccordionTriggerProps, AccordionContentProps } from './components/Accordion';

// Slider
export { Slider, SliderPrimitive } from './components/Slider';
export type { SliderProps } from './components/Slider';

// Progress
export { Progress, ProgressPrimitive } from './components/Progress';
export type { ProgressProps } from './components/Progress';

// Avatar
export { Avatar, AvatarPrimitive } from './components/Avatar';
export type { AvatarProps } from './components/Avatar';

// AlertDialog
export { AlertDialog, AlertDialogPrimitive } from './components/AlertDialog';
export type { AlertDialogProps } from './components/AlertDialog';

// Overlay components
export { Tooltip, TooltipPrimitive } from './components/Tooltip';
export type { TooltipProps } from './components/Tooltip';
export { Popover, PopoverPrimitive } from './components/Popover';
export type { PopoverProps } from './components/Popover';
export { Dialog, DialogPrimitive } from './components/Dialog';
export type { DialogProps } from './components/Dialog';

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

// Form components
export { Textarea } from './components/Textarea';
export type { TextareaProps } from './components/Textarea';
export { Tabs } from './components/Tabs';
export type { TabsProps, TabsListProps, TabProps, TabsPanelProps } from './components/Tabs';
export { Checkbox } from './components/Checkbox';
export type { CheckboxProps } from './components/Checkbox';
export { Switch } from './components/Switch';
export type { SwitchProps } from './components/Switch';
export { RadioGroup, Radio } from './components/RadioGroup';
export type { RadioGroupProps, RadioProps } from './components/RadioGroup';
export { Input } from './components/Input';
export type { InputProps } from './components/Input';
export { Select } from './components/Select';
export type { SelectProps, SelectItemProps, SelectGroupProps } from './components/Select';

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
