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
    "import type { ButtonProps, InputProps, ThemeProps } from '@wlcr/base-ic';",
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
    '// Components and forms',
    'AccordionProps, AlertDialogProps, AvatarProps, BadgeProps, ButtonProps,',
    'CardProps, CheckboxProps, CollapsibleProps, DialogProps, FieldProps,',
    'InputProps, MenuProps, NumberFieldProps, PopoverProps, ProgressProps,',
    'RadioGroupProps, RadioProps, SelectProps, SeparatorProps, SkeletonProps,',
    'SliderProps, SwitchProps, TabsProps, TextareaProps, ToggleProps, TooltipProps',
    '',
    '// Typography',
    'TextProps, HeadingProps, LinkProps, CodeProps, KbdProps, EmProps,',
    'StrongProps, QuoteProps',
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
          Shared types cover values used across the system. `Color` is the component-facing alias
          for `AccentColor`; both allow registered custom color names in addition to built-in hues.
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
      </DocsSection>

      <DocsSection>
        <h2>Prop Value Types</h2>
        <p>
          Component-specific names keep APIs precise: `ButtonSize` only permits sizes supported by
          `Button`, while `TextSize` covers the full typography scale.
        </p>
        <CodeBlock title="Using prop value types" code={propValuesSnippet} />
        <CodeBlock title="Available prop value types" code={valueCatalogSnippet} />
      </DocsSection>

      <DocsSection>
        <h2>Deriving a Prop Type</h2>
        <p>
          For props without a named alias, `PropValue` extracts the usable value and removes
          `null` and `undefined`. Indexed access preserves the exact optional prop type.
        </p>
        <CodeBlock title="Derive from any props interface" code={deriveSnippet} />
      </DocsSection>

      <DocsSection>
        <h2>Guidelines</h2>
        <DocsList>
          <li>Prefer `import type` for all type-only dependencies.</li>
          <li>Use a named prop value type when one exists, such as `ButtonSize` or `Color`.</li>
          <li>Use the component props interface when building wrappers and composed controls.</li>
          <li>Use `PropValue` for an unnamed prop value instead of copying its union.</li>
        </DocsList>
      </DocsSection>
    </>
  );
}
