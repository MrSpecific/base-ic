import { Accordion, Heading, Link, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import {
  DocsDemoGrid,
  DocsDemoRow,
  DocsList,
} from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { DemoCard } from "./DemoCard";

export function AccordionDocsPage() {
  const usageSnippet = [
    "import { Accordion } from 'base-ic';",
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
    '<Accordion openMultiple>',
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
            description="Allow several items open at once with openMultiple."
            code={multipleSnippet}
          >
            <Accordion openMultiple style={{ width: "100%" }}>
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
        <Heading as="h2">Notes</Heading>
        <DocsList>
          <li>
            Use `openMultiple` to allow several items to be open simultaneously.
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
