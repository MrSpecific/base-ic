import type { AccordionProps } from './components/Accordion';
import type { AlertDialogProps } from './components/AlertDialog';
import type { AvatarProps } from './components/Avatar';
import type { BadgeProps } from './components/Badge';
import type { ButtonProps } from './components/Button';
import type { CardProps } from './components/Card';
import type { CheckboxProps } from './components/Checkbox';
import type { CollapsibleProps } from './components/Collapsible';
import type { ContainerProps, SectionProps } from './components/Layout';
import type { DialogProps } from './components/Dialog';
import type { InputProps } from './components/Input';
import type { MenuProps } from './components/Menu';
import type { NumberFieldProps } from './components/NumberField';
import type { ProgressProps } from './components/Progress';
import type { RadioProps } from './components/RadioGroup';
import type { SelectProps } from './components/Select';
import type { SeparatorProps } from './components/Separator';
import type { SkeletonProps } from './components/Skeleton';
import type { SliderProps } from './components/Slider';
import type { SwitchProps } from './components/Switch';
import type { TabsProps } from './components/Tabs';
import type { TextareaProps } from './components/Textarea';
import type { ToggleProps } from './components/Toggle';
import type {
  CodeProps,
  HeadingProps,
  KbdProps,
  LinkProps,
  TextProps,
} from './components/Typography';
import type { AccentColor } from './components/Theme';

/** Removes `null` and `undefined` from a component prop's value type. */
export type PropValue<T, K extends keyof T> = NonNullable<T[K]>;

/** Color accepted by component `color` props. Includes custom theme color names. */
export type Color = AccentColor;

export type AccordionSize = PropValue<AccordionProps, 'size'>;
export type AccordionVariant = PropValue<AccordionProps, 'variant'>;
export type AlertDialogSize = PropValue<AlertDialogProps, 'size'>;
export type AvatarSize = PropValue<AvatarProps, 'size'>;
export type AvatarRadius = PropValue<AvatarProps, 'radius'>;
export type BadgeSize = PropValue<BadgeProps, 'size'>;
export type BadgeVariant = PropValue<BadgeProps, 'variant'>;
export type BadgeRadius = PropValue<BadgeProps, 'radius'>;
export type ButtonSize = PropValue<ButtonProps, 'size'>;
export type ButtonVariant = PropValue<ButtonProps, 'variant'>;
export type ButtonRadius = PropValue<ButtonProps, 'radius'>;
export type CardSize = PropValue<CardProps, 'size'>;
export type CardVariant = PropValue<CardProps, 'variant'>;
export type CardRadius = PropValue<CardProps, 'radius'>;
export type CheckboxSize = PropValue<CheckboxProps, 'size'>;
export type CollapsibleSize = PropValue<CollapsibleProps, 'size'>;
export type CollapsibleVariant = PropValue<CollapsibleProps, 'variant'>;
export type ContainerSize = PropValue<ContainerProps, 'size'>;
export type DialogSize = PropValue<DialogProps, 'size'>;
export type InputSize = PropValue<InputProps, 'size'>;
export type InputVariant = PropValue<InputProps, 'variant'>;
export type InputRadius = PropValue<InputProps, 'radius'>;
export type MenuSize = PropValue<MenuProps, 'size'>;
export type NumberFieldSize = PropValue<NumberFieldProps, 'size'>;
export type NumberFieldRadius = PropValue<NumberFieldProps, 'radius'>;
export type ProgressSize = PropValue<ProgressProps, 'size'>;
export type ProgressRadius = PropValue<ProgressProps, 'radius'>;
export type RadioSize = PropValue<RadioProps, 'size'>;
export type SelectSize = PropValue<SelectProps, 'size'>;
export type SelectRadius = PropValue<SelectProps, 'radius'>;
export type SeparatorSize = PropValue<SeparatorProps, 'size'>;
export type SeparatorOrientation = PropValue<SeparatorProps, 'orientation'>;
export type SectionSize = PropValue<SectionProps, 'size'>;
export type SkeletonRadius = PropValue<SkeletonProps, 'radius'>;
export type SliderSize = PropValue<SliderProps, 'size'>;
export type SliderRadius = PropValue<SliderProps, 'radius'>;
export type SwitchSize = PropValue<SwitchProps, 'size'>;
export type TabsSize = PropValue<TabsProps, 'size'>;
export type TabsVariant = PropValue<TabsProps, 'variant'>;
export type TextareaSize = PropValue<TextareaProps, 'size'>;
export type TextareaVariant = PropValue<TextareaProps, 'variant'>;
export type TextareaRadius = PropValue<TextareaProps, 'radius'>;
export type ToggleSize = PropValue<ToggleProps, 'size'>;
export type ToggleVariant = PropValue<ToggleProps, 'variant'>;

export type TextElement = PropValue<TextProps, 'as'>;
export type TextSize = PropValue<TextProps, 'size'>;
export type TextWeight = PropValue<TextProps, 'weight'>;
export type TextAlign = PropValue<TextProps, 'align'>;
export type TextWrap = PropValue<TextProps, 'wrap'>;
export type TextTrim = PropValue<TextProps, 'trim'>;
export type HeadingElement = PropValue<HeadingProps, 'as'>;
export type HeadingSize = PropValue<HeadingProps, 'size'>;
export type HeadingWeight = PropValue<HeadingProps, 'weight'>;
export type HeadingAlign = PropValue<HeadingProps, 'align'>;
export type HeadingWrap = PropValue<HeadingProps, 'wrap'>;
export type HeadingTrim = PropValue<HeadingProps, 'trim'>;
export type CodeSize = PropValue<CodeProps, 'size'>;
export type CodeVariant = PropValue<CodeProps, 'variant'>;
export type CodeWeight = PropValue<CodeProps, 'weight'>;
export type KbdSize = PropValue<KbdProps, 'size'>;
export type LinkSize = PropValue<LinkProps, 'size'>;
export type LinkWeight = PropValue<LinkProps, 'weight'>;
export type LinkUnderline = PropValue<LinkProps, 'underline'>;

export type { SpaceProps, SpaceValue } from './components/Layout/layout.utils';
