import { Heading, Link, Text, Toggle, ToggleGroup } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import {
  DocsDemoGrid,
  DocsDemoRow,
  DocsList,
} from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { PropsTable } from "../../components/PropsTable";
import { DemoCard } from "./DemoCard";

function BoldIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 2h3.5a2 2 0 0 1 0 4H3V2zm0 4h4a2.5 2.5 0 0 1 0 5H3V6z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
    </svg>
  );
}

function ItalicIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="7" y1="2" x2="5" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4" y1="2" x2="8" y2="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4" y1="10" x2="8" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function UnderlineIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 2v4a3 3 0 0 0 6 0V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="2" y1="11" x2="10" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ToggleDocsPage() {
  const usageSnippet = [
    "import { Toggle } from '@wlcr/base-ic';",
    "",
    "<Toggle>Bold</Toggle>",
  ].join("\n");

  const variantsSnippet = [
    '<Toggle variant="solid">Solid</Toggle>',
    '<Toggle variant="soft">Soft</Toggle>',
    '<Toggle variant="surface">Surface</Toggle>',
    '<Toggle variant="outline">Outline</Toggle>',
    '<Toggle variant="ghost">Ghost</Toggle>',
  ].join("\n");

  const sizesSnippet = [
    '<Toggle size="1">Sm</Toggle>',
    '<Toggle size="2">Md</Toggle>',
    '<Toggle size="3">Lg</Toggle>',
    '<Toggle size="4">Xl</Toggle>',
  ].join("\n");

  const radiusSnippet = [
    '<Toggle radius="none">None</Toggle>',
    '<Toggle radius="small">Small</Toggle>',
    '<Toggle radius="large">Large</Toggle>',
    '<Toggle radius="full">Full</Toggle>',
  ].join("\n");

  const highContrastSnippet = [
    '<Toggle variant="solid" defaultPressed highContrast>Theme accent</Toggle>',
    '<Toggle variant="solid" defaultPressed highContrast color="crimson">Crimson</Toggle>',
  ].join("\n");

  const groupOverrideSnippet = [
    '<ToggleGroup variant="soft" size="1">',
    '  <Toggle value="a">Soft</Toggle>',
    '  <Toggle value="b">Soft</Toggle>',
    '  <Toggle value="c" variant="outline" size="2">Outline, size 2</Toggle>',
    "</ToggleGroup>",
  ].join("\n");

  const groupSnippet = [
    "import { Toggle, ToggleGroup } from '@wlcr/base-ic';",
    "",
    "// Single-select by default; `multiple` lets several be pressed at once.",
    "<ToggleGroup multiple>",
    '  <Toggle value="bold" aria-label="Bold"><BoldIcon /></Toggle>',
    '  <Toggle value="italic" aria-label="Italic"><ItalicIcon /></Toggle>',
    '  <Toggle value="underline" aria-label="Underline"><UnderlineIcon /></Toggle>',
    "</ToggleGroup>",
  ].join("\n");

  const connectedSnippet = [
    "<ToggleGroup connected defaultValue={['week']}>",
    '  <Toggle value="day">Day</Toggle>',
    '  <Toggle value="week">Week</Toggle>',
    '  <Toggle value="month">Month</Toggle>',
    "</ToggleGroup>",
  ].join("\n");

  return (
    <>
      <DocsSection>
        <Heading as="h1">Toggle</Heading>
        <Text as="p">
          A two-state pressable button. Base UI sets <code>data-pressed</code>{" "}
          when active, which drives the visual state. ToggleGroup manages
          selection state across multiple toggles.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Built On Base UI</Heading>
        <Text as="p">
          This component wraps the Base UI Toggle and ToggleGroup primitives.
          Base primitive docs:{" "}
          <Link
            href="https://base-ui.com/react/components/toggle"
            target="_blank"
            rel="noreferrer"
          >
            base-ui.com/react/components/toggle
          </Link>
          .
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Variants"
            description="Five visual variants matching the Button palette."
            code={variantsSnippet}
          >
            <DocsDemoRow>
              {(["solid", "soft", "surface", "outline", "ghost"] as const).map(
                (variant) => (
                  <Toggle key={variant} variant={variant}>
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Toggle>
                )
              )}
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Sizes"
            description="Four sizes matching button/input size tokens."
            code={sizesSnippet}
          >
            <DocsDemoRow>
              {(["1", "2", "3", "4"] as const).map((size) => (
                <Toggle key={size} size={size}>
                  Size {size}
                </Toggle>
              ))}
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Radius"
            description="Override the corner radius per toggle with `radius`. Without it, the toggle follows the Theme's radius."
            code={radiusSnippet}
          >
            <DocsDemoRow>
              {(["none", "small", "large", "full"] as const).map((radius) => (
                <Toggle key={radius} radius={radius}>
                  {radius.charAt(0).toUpperCase() + radius.slice(1)}
                </Toggle>
              ))}
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="High contrast"
            description="`highContrast` switches to step-12 text (and a step-12 fill for a pressed `solid` toggle). It works with the theme accent alone or together with `color`."
            code={highContrastSnippet}
          >
            <DocsDemoRow>
              <Toggle variant="solid" defaultPressed highContrast>
                Theme accent
              </Toggle>
              <Toggle variant="solid" defaultPressed highContrast color="crimson">
                Crimson
              </Toggle>
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Icon toggles"
            description="Compact icon-only toggles for toolbars. Give each one an `aria-label`, since there is no visible text."
            code={'<Toggle aria-label="Bold"><BoldIcon /></Toggle>\n<Toggle aria-label="Italic"><ItalicIcon /></Toggle>\n<Toggle aria-label="Underline"><UnderlineIcon /></Toggle>'}
          >
            <DocsDemoRow>
              <Toggle aria-label="Bold"><BoldIcon /></Toggle>
              <Toggle aria-label="Italic"><ItalicIcon /></Toggle>
              <Toggle aria-label="Underline"><UnderlineIcon /></Toggle>
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Toggle Group"
            description="ToggleGroup manages pressed state across toggles identified by `value`. It is single-select by default; pass `multiple` to allow several pressed at once."
            code={groupSnippet}
          >
            <DocsDemoRow>
              <ToggleGroup multiple>
                <Toggle value="bold" aria-label="Bold"><BoldIcon /></Toggle>
                <Toggle value="italic" aria-label="Italic"><ItalicIcon /></Toggle>
                <Toggle value="underline" aria-label="Underline"><UnderlineIcon /></Toggle>
              </ToggleGroup>
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Group defaults"
            description="`size` and `variant` on ToggleGroup apply to every child Toggle that doesn't set its own. An explicit prop on a Toggle wins over the group's value."
            code={groupOverrideSnippet}
          >
            <DocsDemoRow>
              <ToggleGroup variant="soft" size="1">
                <Toggle value="a">Soft</Toggle>
                <Toggle value="b">Soft</Toggle>
                <Toggle value="c" variant="outline" size="2">
                  Outline, size 2
                </Toggle>
              </ToggleGroup>
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Connected (segmented control)"
            description="Use connected on ToggleGroup for a pill-bar layout."
            code={connectedSnippet}
          >
            <DocsDemoRow>
              <ToggleGroup connected defaultValue={["week"]}>
                <Toggle value="day">Day</Toggle>
                <Toggle value="week">Week</Toggle>
                <Toggle value="month">Month</Toggle>
              </ToggleGroup>
            </DocsDemoRow>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Usage</Heading>
        <CodeBlock title="Toggle Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Props</Heading>
        <Text as="p">Toggle</Text>
        <PropsTable
          rows={[
            {
              name: "size",
              type: "'1' | '2' | '3' | '4'",
              default: "'2'",
              description:
                "Visual size. When omitted, inherits the parent ToggleGroup's size (an explicit prop on the Toggle wins).",
            },
            {
              name: "variant",
              type: "'solid' | 'soft' | 'surface' | 'outline' | 'ghost'",
              default: "'surface'",
              description:
                "Visual style. When omitted, inherits the parent ToggleGroup's variant (an explicit prop on the Toggle wins).",
            },
            {
              name: "color",
              type: "AccentColor",
              description: "Accent color override.",
            },
            {
              name: "highContrast",
              type: "boolean",
              default: "false",
              description:
                "Increase text/icon contrast (step 12 text, and a step-12 fill for pressed `solid`). Works with the theme accent or with `color`.",
            },
            {
              name: "radius",
              type: "'none' | 'small' | 'medium' | 'large' | 'full'",
              description:
                "Override the border-radius for this toggle. Falls back to the Theme's radius. Toggles inside a `connected` ToggleGroup keep the group's inset radius.",
            },
            {
              name: "pressed",
              type: "boolean",
              description:
                "Controlled pressed state. Use with onPressedChange for a controlled toggle.",
            },
            {
              name: "defaultPressed",
              type: "boolean",
              default: "false",
              description: "Initial pressed state for uncontrolled usage.",
            },
            {
              name: "onPressedChange",
              type: "(pressed: boolean, eventDetails) => void",
              description: "Called when the pressed state changes.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Whether the component should ignore user interaction.",
            },
            {
              name: "value",
              type: "string",
              description:
                "Unique string identifying the toggle inside a ToggleGroup. Required when the toggle is in a group — the group tracks pressed state by value.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional class name applied to the toggle.",
            },
            {
              name: "style",
              type: "React.CSSProperties",
              description: "Inline styles applied to the toggle.",
            },
          ]}
        />
        <Text as="p">ToggleGroup</Text>
        <PropsTable
          rows={[
            {
              name: "connected",
              type: "boolean",
              default: "false",
              description:
                "Display toggles as a connected segmented group with shared borders and no gap.",
            },
            {
              name: "size",
              type: "'1' | '2' | '3' | '4'",
              description:
                "Visual size inherited by child Toggles that don't set their own.",
            },
            {
              name: "variant",
              type: "'solid' | 'soft' | 'surface' | 'outline' | 'ghost'",
              description:
                "Visual variant inherited by child Toggles that don't set their own.",
            },
            {
              name: "value",
              type: "readonly string[]",
              description:
                "Controlled array of pressed toggle values. Use with onValueChange for a controlled group.",
            },
            {
              name: "defaultValue",
              type: "readonly string[]",
              description: "Initial array of pressed toggle values for uncontrolled usage.",
            },
            {
              name: "onValueChange",
              type: "(groupValue: string[], eventDetails) => void",
              description: "Called when the set of pressed toggles changes.",
            },
            {
              name: "multiple",
              type: "boolean",
              default: "false",
              description:
                "When true, multiple items in the group can be pressed at once. When false, pressing one unpresses the others.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Whether the whole group should ignore user interaction.",
            },
            {
              name: "orientation",
              type: "'horizontal' | 'vertical'",
              default: "'horizontal'",
              description: "The orientation of the toggle group.",
            },
            {
              name: "loopFocus",
              type: "boolean",
              default: "true",
              description:
                "Whether arrow-key focus wraps around from the last toggle to the first.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional class name applied to the group.",
            },
            {
              name: "style",
              type: "React.CSSProperties",
              description: "Inline styles applied to the group.",
            },
          ]}
        />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Notes</Heading>
        <DocsList>
          <li>
            Use <code>pressed</code> / <code>defaultPressed</code> for
            controlled / uncontrolled state.
          </li>
          <li>
            <code>ToggleGroup</code> takes a <code>value</code> /{" "}
            <code>defaultValue</code> array of pressed toggle values. It is
            single-select unless <code>multiple</code> is set; every child
            Toggle needs a unique <code>value</code>.
          </li>
          <li>
            The <code>connected</code> prop on ToggleGroup renders a segmented
            control with shared border and no gap.
          </li>
        </DocsList>
      </DocsSection>
    </>
  );
}
