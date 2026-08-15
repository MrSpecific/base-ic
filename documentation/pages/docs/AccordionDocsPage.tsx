import { Accordion, Heading, Link, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import {
  DocsDemoGrid,
  DocsDemoRow,
  DocsList,
} from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { PropsTable } from "../../components/PropsTable";
import { DemoCard } from "./DemoCard";

export function AccordionDocsPage() {
  const usageSnippet = [
    "import { Accordion } from '@wlcr/base-ic';",
    "",
    "<Accordion>",
    '  <Accordion.Item value="one">',
    '    <Accordion.Trigger>What is base-ic?</Accordion.Trigger>',
    "    <Accordion.Content>",
    "      An opinionated React UI library built on Base UI primitives.",
    "    </Accordion.Content>",
    "  </Accordion.Item>",
    "</Accordion>",
  ].join("\n");

  const variantsSnippet = [
    '<Accordion variant="outline">',
    '  <Accordion.Item value="a">',
    "    <Accordion.Trigger>Outline</Accordion.Trigger>",
    "    <Accordion.Content>Default variant with bordered container.</Accordion.Content>",
    "  </Accordion.Item>",
    "</Accordion>",
    "",
    '<Accordion variant="surface">',
    '  <Accordion.Item value="a">',
    "    <Accordion.Trigger>Surface</Accordion.Trigger>",
    "    <Accordion.Content>Tinted background container.</Accordion.Content>",
    "  </Accordion.Item>",
    "</Accordion>",
    "",
    '<Accordion variant="ghost">',
    '  <Accordion.Item value="a">',
    "    <Accordion.Trigger>Ghost</Accordion.Trigger>",
    "    <Accordion.Content>No container chrome — items only.</Accordion.Content>",
    "  </Accordion.Item>",
    "</Accordion>",
  ].join("\n");

  const sizesSnippet = [
    '<Accordion size="1">',
    '  <Accordion.Item value="a">',
    '    <Accordion.Trigger>Size 1 — compact</Accordion.Trigger>',
    "    <Accordion.Content>Tight padding for dense UIs.</Accordion.Content>",
    "  </Accordion.Item>",
    "</Accordion>",
    '<Accordion size="3">',
    '  <Accordion.Item value="a">',
    '    <Accordion.Trigger>Size 3 — spacious</Accordion.Trigger>',
    "    <Accordion.Content>More breathing room for content-heavy panels.</Accordion.Content>",
    "  </Accordion.Item>",
    "</Accordion>",
  ].join("\n");

  const multipleSnippet = [
    '<Accordion multiple>',
    '  <Accordion.Item value="billing">',
    "    <Accordion.Trigger>Billing</Accordion.Trigger>",
    "    <Accordion.Content>Manage your plan and payment methods.</Accordion.Content>",
    "  </Accordion.Item>",
    '  <Accordion.Item value="security">',
    "    <Accordion.Trigger>Security</Accordion.Trigger>",
    "    <Accordion.Content>Two-factor auth and session management.</Accordion.Content>",
    "  </Accordion.Item>",
    '  <Accordion.Item value="notifications">',
    "    <Accordion.Trigger>Notifications</Accordion.Trigger>",
    "    <Accordion.Content>Choose what you want to be notified about.</Accordion.Content>",
    "  </Accordion.Item>",
    "</Accordion>",
  ].join("\n");

  return (
    <>
      <DocsSection>
        <Heading as="h1">Accordion</Heading>
        <Text as="p">
          A vertically stacked set of collapsible sections. Useful for FAQs,
          settings panels, and any content that benefits from progressive
          disclosure.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading>Built On Base UI</Heading>
        <Text as="p">
          This component wraps the Base UI Accordion primitive. Base primitive
          docs:{" "}
          <Link
            href="https://base-ui.com/react/components/accordion"
            target="_blank"
            rel="noreferrer"
          >
            base-ui.com/react/components/accordion
          </Link>
          .
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading>Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Variants"
            description="Choose visual treatment for the container."
            code={variantsSnippet}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
                width: "100%",
              }}
            >
              <Accordion variant="outline">
                <Accordion.Item value="a">
                  <Accordion.Trigger>Outline variant</Accordion.Trigger>
                  <Accordion.Content>
                    Default variant — bordered container with clean lines.
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion>
              <Accordion variant="surface">
                <Accordion.Item value="a">
                  <Accordion.Trigger>Surface variant</Accordion.Trigger>
                  <Accordion.Content>
                    Tinted background sits above the page surface.
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion>
              <Accordion variant="ghost">
                <Accordion.Item value="a">
                  <Accordion.Trigger>Ghost variant</Accordion.Trigger>
                  <Accordion.Content>
                    No container chrome — items use dividers only.
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion>
            </div>
          </DemoCard>
          <DemoCard
            title="Multiple items"
            description="Allow several items open at once with multiple."
            code={multipleSnippet}
          >
            <Accordion multiple style={{ width: "100%" }}>
              <Accordion.Item value="billing">
                <Accordion.Trigger>Billing</Accordion.Trigger>
                <Accordion.Content>
                  Manage your plan and payment methods.
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="security">
                <Accordion.Trigger>Security</Accordion.Trigger>
                <Accordion.Content>
                  Two-factor auth and session management.
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="notifications">
                <Accordion.Trigger>Notifications</Accordion.Trigger>
                <Accordion.Content>
                  Choose what you want to be notified about.
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </DemoCard>
          <DemoCard
            title="Sizes"
            description="Three size presets — compact to spacious."
            code={sizesSnippet}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
                width: "100%",
              }}
            >
              <Accordion size="1">
                <Accordion.Item value="a">
                  <Accordion.Trigger>Size 1 — compact</Accordion.Trigger>
                  <Accordion.Content>
                    Tight padding for dense toolbars and settings lists.
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion>
              <Accordion size="2">
                <Accordion.Item value="a">
                  <Accordion.Trigger>Size 2 — default</Accordion.Trigger>
                  <Accordion.Content>
                    Balanced for most content use-cases.
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion>
              <Accordion size="3">
                <Accordion.Item value="a">
                  <Accordion.Trigger>Size 3 — spacious</Accordion.Trigger>
                  <Accordion.Content>
                    More breathing room for content-heavy panels.
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion>
            </div>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading>Usage</Heading>
        <CodeBlock title="Accordion Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Props</Heading>
        <h3>Root Props</h3>
        <PropsTable
          rows={[
            {
              name: "value",
              type: "Value[]",
              description:
                "Controlled value: array of the item value(s) that should be expanded. Use defaultValue for uncontrolled usage.",
            },
            {
              name: "defaultValue",
              type: "Value[]",
              description:
                "Uncontrolled initial value: array of item value(s) expanded on mount.",
            },
            {
              name: "onValueChange",
              type: "(value: Value[], eventDetails) => void",
              description: "Called when an item is expanded or collapsed.",
            },
            {
              name: "multiple",
              type: "boolean",
              default: "false",
              description: "Allow more than one item to be open at the same time.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables interaction with every item in the accordion.",
            },
            {
              name: "hiddenUntilFound",
              type: "boolean",
              default: "false",
              description:
                'Uses hidden="until-found" so the browser’s built-in page search can find and expand panel contents.',
            },
            {
              name: "keepMounted",
              type: "boolean",
              default: "false",
              description: "Keep closed panels mounted in the DOM instead of removing them.",
            },
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
              description: "Size scale applied to all items.",
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
          ]}
        />
        <h3>Item Props</h3>
        <PropsTable
          rows={[
            {
              name: "value",
              type: "unknown",
              description:
                "Unique value identifying this item. Auto-generated if omitted; provide one to control the accordion or set an initial open state.",
            },
            {
              name: "disabled",
              type: "boolean",
              description: "Disables interaction with this specific item.",
            },
            {
              name: "onOpenChange",
              type: "(open: boolean, eventDetails) => void",
              description: "Called when this item's panel opens or closes.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional class name applied to the item element.",
            },
          ]}
        />
        <h3>Trigger Props</h3>
        <PropsTable
          rows={[
            {
              name: "nativeButton",
              type: "boolean",
              default: "true",
              description:
                "Set to false when using render to swap in a non-button element, so Base UI adjusts ARIA attributes accordingly.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional class name applied to the trigger button.",
            },
            {
              name: "children",
              type: "React.ReactNode",
              required: true,
              description: "Trigger label/content.",
            },
          ]}
        />
        <h3>Content Props</h3>
        <PropsTable
          rows={[
            {
              name: "hiddenUntilFound",
              type: "boolean",
              default: "false",
              description:
                "Inherited from the root: allows browser find-in-page to reveal this panel's contents.",
            },
            {
              name: "keepMounted",
              type: "boolean",
              default: "false",
              description: "Keep this panel mounted in the DOM while closed.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional class name applied to the panel element.",
            },
            {
              name: "children",
              type: "React.ReactNode",
              required: true,
              description: "Panel content.",
            },
          ]}
        />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Notes</Heading>
        <DocsList>
          <li>
            Use `multiple` to allow several items to be open simultaneously.
          </li>
          <li>
            Each `Accordion.Item` requires a unique `value` prop for controlled
            state.
          </li>
          <li>
            Pass `defaultValue` (string or array) to set the initially open
            item(s).
          </li>
          <li>Height animation uses `--accordion-panel-height` set by Base UI.</li>
        </DocsList>
      </DocsSection>
    </>
  );
}
