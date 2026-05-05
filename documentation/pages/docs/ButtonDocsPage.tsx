import { Button, Heading, Link, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import {
  DocsDemoGrid,
  DocsDemoRow,
  DocsList,
} from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
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
    '  <Button color="orange" highContrast>Orange HC</Button>',
    '  <Button variant="outline" radius="full">Pill</Button>',
    "</div>",
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
        <Heading>Built On Base-UI</Heading>
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
        <Heading>Demo</Heading>
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
            description="Loading, disabled, and contrast behaviors."
            code={statesSnippet}
          >
            <DocsDemoRow>
              <Button>Default</Button>
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
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
                Orange HC
              </Button>
              <Button variant="outline" radius="full">
                Pill
              </Button>
            </DocsDemoRow>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading>Usage</Heading>
        <CodeBlock title="Button Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Notes</Heading>
        <DocsList>
          <li>Use `loading` for async actions; it also disables interaction.</li>
          <li>
            Prefer `variant=&quot;solid&quot;` for primary actions and lower-emphasis
            variants for secondary actions.
          </li>
          <li>`render` lets you swap the underlying trigger element.</li>
        </DocsList>
      </DocsSection>
    </>
  );
}
