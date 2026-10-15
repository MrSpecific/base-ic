import { Button, Heading, Link, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import {
  DocsDemoGrid,
  DocsDemoRow,
  DocsList,
} from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { PropsTable } from "../../components/PropsTable";
import { DemoCard } from "./DemoCard";

export function ButtonDocsPage() {
  const usageSnippet = [
    "import { Button } from '@wlcr/base-ic';",
    "",
    '<Button size="2" variant="solid">Save changes</Button>',
  ].join("\n");

  const variantsSnippet = [
    '<div className="docs-demo-button-row">',
    '  <Button variant="solid">Solid</Button>',
    '  <Button variant="soft">Soft</Button>',
    '  <Button variant="surface">Surface</Button>',
    '  <Button variant="outline">Outline</Button>',
    '  <Button variant="ghost">Ghost</Button>',
    "</div>",
  ].join("\n");

  const statesSnippet = [
    '<div className="docs-demo-button-row">',
    "  <Button>Default</Button>",
    "  <Button loading>Loading</Button>",
    "  <Button disabled>Disabled</Button>",
    "  <Button disabled focusableWhenDisabled>Focusable disabled</Button>",
    "  <Button highContrast>High Contrast</Button>",
    "</div>",
  ].join("\n");
  const sizeSnippet = [
    '<div className="docs-demo-button-row">',
    '  <Button size="1" variant="surface">Size 1</Button>',
    '  <Button size="2" variant="surface">Size 2</Button>',
    '  <Button size="3" variant="surface">Size 3</Button>',
    '  <Button size="4" variant="surface">Size 4</Button>',
    "</div>",
  ].join("\n");

  const toneSnippet = [
    '<div className="docs-demo-button-row">',
    '  <Button color="blue">Blue</Button>',
    '  <Button color="green">Green</Button>',
    '  <Button color="orange" highContrast>Orange High Contrast</Button>',
    '  <Button variant="outline" radius="full">Pill</Button>',
    "</div>",
  ].join("\n");

  const renderSnippet = [
    "import { Link as RouterLink } from 'react-router-dom';",
    "",
    "// Rendering a non-<button> element: set nativeButton={false}",
    "<Button render={<RouterLink to=\"/settings\" />} nativeButton={false}>",
    "  Settings",
    "</Button>",
  ].join("\n");

  const renderLinkSnippet = [
    "<Button",
    "  render={",
    "    <a href=\"https://base-ui.com/react/components/button\" target=\"_blank\" rel=\"noreferrer\" />",
    "  }",
    "  nativeButton={false}",
    "  variant=\"soft\"",
    ">",
    "  Base UI docs",
    "</Button>",
  ].join("\n");

  return (
    <>
      <DocsSection>
        <Heading as="h1">Button</Heading>
        <Text as="p">
          `Button` is a styled action primitive with size, variant, radius,
          color override, and loading states.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Built On Base-UI</Heading>
        <Text as="p">
          This component wraps the Base UI Button primitive. Base primitive
          docs:{" "}
          <Link
            href="https://base-ui.com/react/components/button"
            target="_blank"
            rel="noreferrer"
          >
            base-ui.com/react/components/button
          </Link>
          .
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Variants"
            description="Choose visual emphasis per context."
            code={variantsSnippet}
          >
            <DocsDemoRow>
              <Button variant="solid">Solid</Button>
              <Button variant="soft">Soft</Button>
              <Button variant="surface">Surface</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Sizes"
            description="Scale controls from compact toolbars to prominent CTAs."
            code={sizeSnippet}
          >
            <DocsDemoRow>
              <Button size="1" variant="surface">
                Size 1
              </Button>
              <Button size="2" variant="surface">
                Size 2
              </Button>
              <Button size="3" variant="surface">
                Size 3
              </Button>
              <Button size="4" variant="surface">
                Size 4
              </Button>
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="States"
            description="`loading` shows a spinner, sets `aria-busy`, and blocks clicks but stays focusable. `focusableWhenDisabled` keeps a disabled button in the tab order."
            code={statesSnippet}
          >
            <DocsDemoRow>
              <Button>Default</Button>
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
              <Button disabled focusableWhenDisabled>
                Focusable disabled
              </Button>
              <Button highContrast>High Contrast</Button>
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Color and Radius"
            description="Override accent hue per action and adjust corner treatment."
            code={toneSnippet}
          >
            <DocsDemoRow>
              <Button color="blue">Blue</Button>
              <Button color="green">Green</Button>
              <Button color="orange" highContrast>
                Orange High Contrast
              </Button>
              <Button variant="outline" radius="full">
                Pill
              </Button>
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Render as a link"
            description="`render` swaps the element while keeping Button styling. Pass `nativeButton={false}` when it is not a `<button>`."
            code={renderLinkSnippet}
          >
            <DocsDemoRow>
              <Button
                render={
                  <a
                    href="https://base-ui.com/react/components/button"
                    target="_blank"
                    rel="noreferrer"
                  />
                }
                nativeButton={false}
                variant="soft"
              >
                Base UI docs
              </Button>
            </DocsDemoRow>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Usage</Heading>
        <CodeBlock title="Button Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Props</Heading>
        <PropsTable
          rows={[
            {
              name: "size",
              type: "'1' | '2' | '3' | '4'",
              default: "'2'",
              description: "Visual size preset.",
            },
            {
              name: "variant",
              type: "'solid' | 'soft' | 'surface' | 'outline' | 'ghost'",
              default: "'solid'",
              description: "Visual style.",
            },
            {
              name: "color",
              type: "AccentColor",
              description:
                "Override the accent color for this button. Falls back to the current Theme's accentColor.",
            },
            {
              name: "highContrast",
              type: "boolean",
              default: "false",
              description: "Increase foreground contrast against the background.",
            },
            {
              name: "radius",
              type: "'none' | 'small' | 'medium' | 'large' | 'full'",
              description: "Override the border-radius for this button. Falls back to the Theme's radius.",
            },
            {
              name: "loading",
              type: "boolean",
              default: "false",
              description:
                "Shows a loading spinner and disables interaction. The button stays focusable (so focus isn't dropped mid-action) and is marked `aria-busy`.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description:
                "Disables the button. Sets the native `disabled` attribute (removed from the tab order) unless `focusableWhenDisabled` is set, in which case `aria-disabled` is used instead.",
            },
            {
              name: "focusableWhenDisabled",
              type: "boolean",
              default: "false",
              description: "Keep the button in the tab order while `disabled`. Always on while `loading`.",
            },
            {
              name: "render",
              type: "React.ReactElement | ((props, state) => React.ReactElement)",
              description:
                "Render as a different element (e.g. a router `Link`) while keeping Button's styling. Pair with `nativeButton={false}` when the element is not a `<button>`.",
            },
            {
              name: "nativeButton",
              type: "boolean",
              default: "true",
              description:
                "Set to `false` when `render` is not a `<button>` (e.g. an `<a>` or router `Link`) so Base UI adds button semantics and keyboard handling instead of native-button attributes.",
            },
            {
              name: "px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml",
              type: "number | string",
              description:
                "Padding/margin shorthands. Numbers and digit-only strings map to space tokens (`3` and `\"3\"` → `var(--space-3)`; `0` → `0`); any other string is used as a raw CSS length.",
            },
            {
              name: "children",
              type: "React.ReactNode",
              description: "Button label/content.",
            },
          ]}
        />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Notes</Heading>
        <DocsList>
          <li>
            Use `loading` for async actions: it disables interaction but keeps
            the button focusable and sets `aria-busy`, so keyboard focus isn't
            lost while the action runs.
          </li>
          <li>
            Prefer `variant=&quot;solid&quot;` for primary actions and
            lower-emphasis variants for secondary actions.
          </li>
          <li>
            `render` lets you swap the underlying element. When it is not a
            native `&lt;button&gt;` (a link, a router `Link`), also pass{" "}
            {"`nativeButton={false}`"}.
          </li>
        </DocsList>
        <CodeBlock title="Render as a link" code={renderSnippet} />
      </DocsSection>
    </>
  );
}
