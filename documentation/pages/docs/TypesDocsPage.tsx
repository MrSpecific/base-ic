import { CodeBlock } from '../../components/CodeBlock';
import { DocsList } from '../../components/DocsPrimitives';
import { DocsSection } from '../../components/DocsSection';

export function TypesDocsPage() {
  const importSnippet = [
    "import type {",
    "  ButtonProps,",
    "  ButtonSize,",
    "  ButtonVariant,",
    "  Color,",
    "} from '@wlcr/base-ic';",
  ].join('\n');

  const sharedTypesSnippet = [
    "import type {",
    "  AccentColor, // built-in and custom theme color names",
    "  Color,       // color accepted by component color props",
    "  GrayColor,   // neutral palette names",
    "  Radius,      // 'none' | 'small' | 'medium' | 'large' | 'full'",
    "  Scaling,     // '80%' through '150%' in 5% steps",
    "  Appearance,  // 'light' | 'dark' | 'inherit'",
    "  ThemeContextValue, // value returned by useTheme()",
    "  SpaceProps,",
    "  SpaceValue,",
    "} from '@wlcr/base-ic';",
  ].join('\n');

  const componentPropsSnippet = [
    "import { Button } from '@wlcr/base-ic';",
    "import type { ButtonProps } from '@wlcr/base-ic';",
    '',
    'interface SaveButtonProps extends Omit<ButtonProps, \'children\'> {',
    '  label: string;',
    '}',
    '',
    'function SaveButton({ label, ...props }: SaveButtonProps) {',
    '  return <Button {...props}>{label}</Button>;',
    '}',
  ].join('\n');

  const propValuesSnippet = [
    "import type { ButtonSize, ButtonVariant, Color } from '@wlcr/base-ic';",
    '',
    'type ActionConfig = {',
    '  color: Color;',
    '  size: ButtonSize;',
    '  variant: ButtonVariant;',
    '};',
    '',
    'const primaryAction: ActionConfig = {',
    "  color: 'violet',",
    "  size: '3',",
    "  variant: 'solid',",
    '};',
  ].join('\n');

  const deriveSnippet = [
    "import type { ButtonProps, PropValue } from '@wlcr/base-ic';",
    '',
    "type ButtonColor = PropValue<ButtonProps, 'color'>;",
    "type LoadingState = PropValue<ButtonProps, 'loading'>;",
    '',
    '// Keep optionality when you need the exact prop declaration:',
    "type OptionalButtonColor = ButtonProps['color'];",
  ].join('\n');

  const propsCatalogSnippet = [
    '// Theme and layout',
    'ThemeProps, ThemeContextValue, BoxProps, FlexProps, GridProps, ContainerProps, SectionProps',
    '',
    '// Components',
    'AccordionProps, AccordionItemProps, AccordionTriggerProps, AccordionContentProps,',
    'AlertDialogProps, AvatarProps, BadgeProps, ButtonProps, CardProps,',
    'CollapsibleProps, CollapsibleTriggerProps, CollapsibleContentProps,',
    'DialogProps, DrawerProps, PopoverProps, ProgressProps, SeparatorProps,',
    'SkeletonProps, TooltipProps, TooltipProviderProps,',
    'MenuProps, MenuItemProps, MenuCheckboxItemProps, MenuRadioGroupProps,',
    'MenuRadioItemProps, MenuGroupProps, MenuSubProps, MenubarProps,',
    'NavigationMenuProps, NavigationMenuListProps, NavigationMenuItemProps,',
    'NavigationMenuTriggerProps, NavigationMenuContentProps, NavigationMenuLinkProps,',
    'TabsProps, TabsListProps, TabProps, TabsPanelProps,',
    'ToggleProps, ToggleGroupProps',
    '',
    '// Toast',
    'ToasterProps, ToastTitleProps, ToastDescriptionProps, ToastActionProps, ToastCloseProps',
    '',
    '// Forms',
    'AutocompleteProps, AutocompleteItemProps, AutocompleteGroupProps,',
    'CheckboxProps, FieldProps, FieldLabelProps, FieldDescriptionProps, FieldErrorProps,',
    'FieldControlProps, FieldsetProps, FieldsetLegendProps, InputProps, NumberFieldProps,',
    'OTPFieldProps, OTPFieldRootProps, OTPFieldInputProps, OTPFieldSeparatorProps,',
    'RadioGroupProps, RadioProps, SelectProps, SelectItemProps, SelectGroupProps,',
    'SliderProps, SwitchProps, TextareaProps',
    '',
    '// Typography',
    'TextProps, HeadingProps, LinkProps, CodeProps, KbdProps, EmProps,',
    'StrongProps, QuoteProps',
  ].join('\n');

  const componentTypesSnippet = [
    "import type {",
    "  DrawerSide,           // 'left' | 'right' | 'top' | 'bottom'",
    "  ToasterPosition,      // 'top-left' | 'top-center' | … | 'bottom-right'",
    "  ToastOptions,         // options accepted by toast(...)",
    "  ToastVariant,         // 'success' | 'error' | 'warning' | 'info'",
    "  AutocompleteItemData, // item shapes accepted by Autocomplete's items",
    "  AutocompleteGroupData,",
    "  AutocompleteItems,",
    "  CustomColorScale,     // Theme custom color definitions",
    "  FontFamilies,         // Theme font family slots",
    "} from '@wlcr/base-ic';",
  ].join('\n');

  const primitiveSnippet = [
    "import { DrawerPrimitive, SelectPrimitive } from '@wlcr/base-ic';",
    '',
    '// Each *Primitive is the raw Base UI namespace, so its part types come along:',
    'type SwipeAreaProps = DrawerPrimitive.SwipeArea.Props;',
    'type SelectGroupBaseProps = SelectPrimitive.Group.Props;',
    '',
    '// Available: AccordionPrimitive, AlertDialogPrimitive, AutocompletePrimitive,',
    '// AvatarPrimitive, CollapsiblePrimitive, DialogPrimitive, DrawerPrimitive,',
    '// FieldPrimitive, FieldsetPrimitive, MenuPrimitive, MenubarPrimitive,',
    '// NavigationMenuPrimitive, NumberFieldPrimitive, OTPFieldPrimitive,',
    '// PopoverPrimitive, ProgressPrimitive, SelectPrimitive, SliderPrimitive,',
    '// TabsPrimitive, ToastPrimitive, TogglePrimitive, ToggleGroupPrimitive,',
    '// TooltipPrimitive',
  ].join('\n');

  const valueCatalogSnippet = [
    '// Sizes',
    'AccordionSize, AlertDialogSize, AvatarSize, BadgeSize, ButtonSize, CardSize,',
    'CheckboxSize, CollapsibleSize, ContainerSize, DialogSize, InputSize, MenuSize,',
    'NumberFieldSize, ProgressSize, RadioSize, SelectSize, SeparatorSize, SectionSize,',
    'SliderSize, SwitchSize, TabsSize, TextareaSize, ToggleSize, TextSize,',
    'HeadingSize, CodeSize, KbdSize, LinkSize',
    '',
    '// Variants',
    'AccordionVariant, BadgeVariant, ButtonVariant, CardVariant, CollapsibleVariant,',
    'InputVariant, TabsVariant, TextareaVariant, ToggleVariant, CodeVariant',
    '',
    '// Radius, typography, and other values',
    'AvatarRadius, BadgeRadius, ButtonRadius, CardRadius, InputRadius,',
    'NumberFieldRadius, ProgressRadius, SelectRadius, SkeletonRadius, SliderRadius,',
    'TextareaRadius, TextElement, TextWeight, TextAlign, TextWrap, TextTrim,',
    'HeadingElement, HeadingWeight, HeadingAlign, HeadingWrap, HeadingTrim,',
    'CodeWeight, LinkWeight, LinkUnderline, SeparatorOrientation',
  ].join('\n');

  return (
    <>
      <DocsSection>
        <h1>Types</h1>
        <p>
          Base-IC exports component props, shared theme values, and reusable prop value types from
          the package root. Use type-only imports so the types are removed from emitted JavaScript.
        </p>
        <CodeBlock title="Type-only imports" code={importSnippet} />
      </DocsSection>

      <DocsSection>
        <h2>Shared Types</h2>
        <p>
          Shared types cover values used across the system. <code>Color</code> is the component-facing alias
          for <code>AccentColor</code>; both allow registered custom color names in addition to built-in hues.
        </p>
        <CodeBlock title="Shared types" code={sharedTypesSnippet} />
      </DocsSection>

      <DocsSection>
        <h2>Component Props</h2>
        <p>
          Every public component exports its props interface. Use it to wrap a component without
          repeating its contract, or to type configuration passed between modules.
        </p>
        <CodeBlock title="Extending component props" code={componentPropsSnippet} />
        <CodeBlock title="Props interfaces" code={propsCatalogSnippet} />
        <p>
          Some components also export the types behind their non-props APIs, such as a Drawer's
          {' '}<code>side</code>, the Toaster's <code>position</code>, or the options passed to{' '}
          <code>toast(...)</code>.
        </p>
        <CodeBlock title="Other component types" code={componentTypesSnippet} />
      </DocsSection>

      <DocsSection>
        <h2>Primitive Namespaces</h2>
        <p>
          Base UI-backed components re-export the raw Base UI namespace as <code>*Primitive</code>.
          These are values, but they also carry the Base UI part types, which is useful when typing
          props passed through to a part.
        </p>
        <CodeBlock title="Base UI part types" code={primitiveSnippet} />
      </DocsSection>

      <DocsSection>
        <h2>Prop Value Types</h2>
        <p>
          Component-specific names keep APIs precise: <code>ButtonSize</code> only permits sizes supported by
          `Button`, while `TextSize` covers the full typography scale.
        </p>
        <CodeBlock title="Using prop value types" code={propValuesSnippet} />
        <CodeBlock title="Available prop value types" code={valueCatalogSnippet} />
      </DocsSection>

      <DocsSection>
        <h2>Deriving a Prop Type</h2>
        <p>
          For props without a named alias, <code>PropValue</code> extracts the usable value and removes
          `null` and `undefined`. Indexed access preserves the exact optional prop type.
        </p>
        <CodeBlock title="Derive from any props interface" code={deriveSnippet} />
      </DocsSection>

      <DocsSection>
        <h2>Guidelines</h2>
        <DocsList>
          <li>Prefer <code>import type</code> for all type-only dependencies.</li>
          <li>Use a named prop value type when one exists, such as <code>ButtonSize</code> or <code>Color</code>.</li>
          <li>Use the component props interface when building wrappers and composed controls.</li>
          <li>Use <code>PropValue</code> for an unnamed prop value instead of copying its union.</li>
        </DocsList>
      </DocsSection>
    </>
  );
}
