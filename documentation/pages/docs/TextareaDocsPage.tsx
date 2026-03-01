import { Flex, Heading, Textarea, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import { DocsDemoGrid } from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { DemoCard } from "./DemoCard";

export function TextareaDocsPage() {
  const usageSnippet = [
    "import { Textarea } from 'base-ic';",
    "",
    '<Textarea placeholder="Enter your message…" rows={4} />',
  ].join("\n");

  return (
    <>
      <DocsSection>
        <Heading>Textarea</Heading>
        <Text as="p">
          A multiline text input with the same size, variant, and radius API as{" "}
          <code>Input</code>. Wraps a native <code>&lt;textarea&gt;</code> for
          full browser compatibility.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Variants"
            description="Surface, outline, and ghost visual styles."
            code={'<Textarea variant="surface" placeholder="Surface" />\n<Textarea variant="outline" placeholder="Outline" />\n<Textarea variant="ghost" placeholder="Ghost" />'}
          >
            <Flex direction="column" gap={2} style={{ width: "100%" }}>
              <Textarea variant="surface" placeholder="Surface" rows={3} />
              <Textarea variant="outline" placeholder="Outline" rows={3} />
              <Textarea variant="ghost" placeholder="Ghost" rows={3} />
            </Flex>
          </DemoCard>
          <DemoCard
            title="Sizes"
            description="Four sizes matching Input and Button."
            code={'<Textarea size="1" placeholder="Size 1" />\n<Textarea size="2" placeholder="Size 2" />\n<Textarea size="3" placeholder="Size 3" />'}
          >
            <Flex direction="column" gap={2} style={{ width: "100%" }}>
              <Textarea size="1" placeholder="Size 1" rows={2} />
              <Textarea size="2" placeholder="Size 2" rows={2} />
              <Textarea size="3" placeholder="Size 3" rows={2} />
            </Flex>
          </DemoCard>
          <DemoCard
            title="States"
            description="Disabled, invalid, and no-resize."
            code={'<Textarea disabled placeholder="Disabled" />\n<Textarea invalid placeholder="Validation error" />\n<Textarea noResize placeholder="No resize" />'}
          >
            <Flex direction="column" gap={2} style={{ width: "100%" }}>
              <Textarea disabled placeholder="Disabled" rows={2} />
              <Textarea invalid placeholder="Validation error" rows={2} defaultValue="invalid content" />
              <Textarea noResize placeholder="Resize is disabled" rows={2} />
            </Flex>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Usage</Heading>
        <CodeBlock title="Textarea Usage" code={usageSnippet} />
      </DocsSection>
    </>
  );
}
