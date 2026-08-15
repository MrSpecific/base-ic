import { Collapsible, Heading, Link, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import {
  DocsDemoGrid,
  DocsDemoRow,
  DocsList,
} from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { PropsTable } from "../../components/PropsTable";
import { DemoCard } from "./DemoCard";

export function CollapsibleDocsPage() {
  const usageSnippet = [
    "import { Collapsible } from '@wlcr/base-ic';",
    "",
    "<Collapsible>",
    "  <Collapsible.Trigger>What is base-ic?</Collapsible.Trigger>",
    "  <Collapsible.Content>",
    "    An opinionated React UI library built on Base UI primitives.",
    "  </Collapsible.Content>",
    "</Collapsible>",
  ].join("\n");

  const variantsSnippet = [
    '<Collapsible variant="outline">',
    "  <Collapsible.Trigger>Outline</Collapsible.Trigger>",
    "  <Collapsible.Content>Bordered container.</Collapsible.Content>",
    "</Collapsible>",
    "",
    '<Collapsible variant="surface">',
    "  <Collapsible.Trigger>Surface</Collapsible.Trigger>",
    "  <Collapsible.Content>Tinted background.</Collapsible.Content>",
    "</Collapsible>",
    "",
    '<Collapsible variant="ghost">',
    "  <Collapsible.Trigger>Ghost</Collapsible.Trigger>",
    "  <Collapsible.Content>No container chrome.</Collapsible.Content>",
    "</Collapsible>",
  ].join("\n");

  const defaultOpenSnippet = [
    "<Collapsible defaultOpen>",
    "  <Collapsible.Trigger>Already expanded</Collapsible.Trigger>",
    "  <Collapsible.Content>Visible by default.</Collapsible.Content>",
    "</Collapsible>",
  ].join("\n");

  return (
    <>
      <DocsSection>
        <Heading as="h1">Collapsible</Heading>
        <Text as="p">
          A single expandable/collapsible section. Unlike Accordion, this
          manages one section without Item wrappers. Height animates via{" "}
          <code>--collapsible-panel-height</code> set by Base UI's
          ResizeObserver.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading>Built On Base UI</Heading>
        <Text as="p">
          This component wraps the Base UI Collapsible primitive. Base primitive
          docs:{" "}
          <Link
            href="https://base-ui.com/react/components/collapsible"
            target="_blank"
            rel="noreferrer"
          >
            base-ui.com/react/components/collapsible
          </Link>
          .
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading>Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Basic usage"
            description="A single togglable section with trigger and content."
            code={usageSnippet}
          >
            <div style={{ width: "100%", maxWidth: 480 }}>
              <Collapsible>
                <Collapsible.Trigger>What is base-ic?</Collapsible.Trigger>
                <Collapsible.Content>
                  An opinionated React UI library built on Base UI primitives,
                  styled with CSS Modules and CSS custom properties.
                </Collapsible.Content>
              </Collapsible>
            </div>
          </DemoCard>
          <DemoCard
            title="Variants"
            description="outline (default), surface, and ghost visual treatments."
            code={variantsSnippet}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", width: "100%", maxWidth: 480 }}>
              {(["outline", "surface", "ghost"] as const).map((variant) => (
                <Collapsible key={variant} variant={variant}>
                  <Collapsible.Trigger>
                    {variant.charAt(0).toUpperCase() + variant.slice(1)} variant
                  </Collapsible.Trigger>
                  <Collapsible.Content>
                    Content inside the {variant} collapsible.
                  </Collapsible.Content>
                </Collapsible>
              ))}
            </div>
          </DemoCard>
          <DemoCard
            title="Sizes"
            description="Three sizes control padding and font size."
            code={'<Collapsible size="1">…</Collapsible>'}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", width: "100%", maxWidth: 480 }}>
              {(["1", "2", "3"] as const).map((size) => (
                <Collapsible key={size} size={size}>
                  <Collapsible.Trigger>Size {size}</Collapsible.Trigger>
                  <Collapsible.Content>Content at size {size}.</Collapsible.Content>
                </Collapsible>
              ))}
            </div>
          </DemoCard>
          <DemoCard
            title="Default open"
            description="Use defaultOpen to expand on initial render."
            code={defaultOpenSnippet}
          >
            <div style={{ width: "100%", maxWidth: 480 }}>
              <Collapsible defaultOpen>
                <Collapsible.Trigger>Already expanded</Collapsible.Trigger>
                <Collapsible.Content>
                  This content is visible on first render.
                </Collapsible.Content>
              </Collapsible>
            </div>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading>Usage</Heading>
        <CodeBlock title="Collapsible Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Props</Heading>
        <Text as="p">Collapsible</Text>
        <PropsTable
          rows={[
            {
              name: "variant",
              type: "'outline' | 'surface' | 'ghost'",
              default: "'outline'",
              description: "Visual style of the container.",
            },
            {
              name: "size",
              type: "'1' | '2' | '3'",
              default: "'2'",
              description: "Size preset controlling padding and font size.",
            },
            {
              name: "open",
              type: "boolean",
              description:
                "Controlled open state. Use with onOpenChange for a controlled collapsible.",
            },
            {
              name: "defaultOpen",
              type: "boolean",
              default: "false",
              description: "Initial open state for uncontrolled usage.",
            },
            {
              name: "onOpenChange",
              type: "(open: boolean, eventDetails) => void",
              description: "Called when the panel is opened or closed.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Whether the component should ignore user interaction.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional class name applied to the root element.",
            },
            {
              name: "style",
              type: "React.CSSProperties",
              description: "Inline styles applied to the root element.",
            },
            {
              name: "children",
              type: "React.ReactNode",
              description:
                "Typically a Collapsible.Trigger and Collapsible.Content pair.",
            },
          ]}
        />
        <Text as="p">Collapsible.Trigger</Text>
        <PropsTable
          rows={[
            {
              name: "nativeButton",
              type: "boolean",
              default: "true",
              description:
                "Whether the rendered element is a native `<button>`. Set to false when using `render` with a non-button element.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional class name applied to the trigger.",
            },
            {
              name: "children",
              type: "React.ReactNode",
              description: "Trigger label content.",
            },
          ]}
        />
        <Text as="p">Collapsible.Content</Text>
        <PropsTable
          rows={[
            {
              name: "children",
              type: "React.ReactNode",
              required: true,
              description: "Content shown when the panel is open.",
            },
            {
              name: "hiddenUntilFound",
              type: "boolean",
              default: "false",
              description:
                "Allows the browser's built-in page search to find and expand the panel contents. Overrides keepMounted.",
            },
            {
              name: "keepMounted",
              type: "boolean",
              default: "false",
              description:
                "Whether to keep the element in the DOM while the panel is hidden.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional class name applied to the content wrapper.",
            },
          ]}
        />
      </DocsSection>
      <DocsSection>
        <Heading>Notes</Heading>
        <DocsList>
          <li>
            Height animation uses <code>--collapsible-panel-height</code> set
            dynamically by Base UI via ResizeObserver.
          </li>
          <li>
            Use <code>keepMounted</code> to keep content in the DOM when closed.
          </li>
          <li>
            Use <code>open</code> + <code>onOpenChange</code> for controlled
            state.
          </li>
        </DocsList>
      </DocsSection>
    </>
  );
}
