import { Flex, Heading, Link, Textarea, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import { DocsDemoGrid, DocsList } from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { DemoCard } from "./DemoCard";

export function TextareaDocsPage() {
  const usageSnippet = [
    "import { Textarea } from 'base-ic';",
    "",
    '<Textarea placeholder="Enter your message…" rows={4} />',
  ].join("\n");

  const variantsSnippet = [
    '<Textarea variant="surface" placeholder="Surface" />',
    '<Textarea variant="outline" placeholder="Outline" />',
    '<Textarea variant="ghost" placeholder="Ghost" />',
  ].join("\n");

  const sizesSnippet = [
    '<Textarea size="1" placeholder="Size 1" />',
    '<Textarea size="2" placeholder="Size 2" />',
    '<Textarea size="3" placeholder="Size 3" />',
    '<Textarea size="4" placeholder="Size 4" />',
  ].join("\n");

  const radiusSnippet = [
    '<Textarea radius="small" placeholder="Small radius" />',
    '<Textarea radius="medium" placeholder="Medium radius" />',
    '<Textarea radius="large" placeholder="Large radius" />',
    '<Textarea radius="full" placeholder="Full radius" />',
  ].join("\n");

  const stateSnippet = [
    '<Textarea disabled placeholder="Disabled" />',
    '<Textarea invalid placeholder="Validation error" />',
    '<Textarea noResize placeholder="No resize" />',
  ].join("\n");

  return (
    <>
      <DocsSection>
        <Heading as="h1">Textarea</Heading>
        <Text as="p">
          A multiline text input with the same size, variant, and radius API as{" "}
          <code>Input</code>. Wraps a native <code>&lt;textarea&gt;</code> for
          full browser compatibility.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h3">Built on Native Textarea</Heading>
        <Text as="p">
          `Textarea` keeps native multiline editing behavior and form submission
          semantics. Native reference:{" "}
          <Link
            href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea"
            target="_blank"
            rel="noreferrer"
          >
            developer.mozilla.org/.../Element/textarea
          </Link>
          .
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Variants"
            description="Surface, outline, and ghost visual styles."
            code={variantsSnippet}
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
            code={sizesSnippet}
          >
            <Flex direction="column" gap={2} style={{ width: "100%" }}>
              <Textarea size="1" placeholder="Size 1" rows={2} />
              <Textarea size="2" placeholder="Size 2" rows={2} />
              <Textarea size="3" placeholder="Size 3" rows={2} />
              <Textarea size="4" placeholder="Size 4" rows={2} />
            </Flex>
          </DemoCard>
          <DemoCard
            title="Radius"
            description="Override corner radius for looser or denser UI treatments."
            code={radiusSnippet}
          >
            <Flex direction="column" gap={2} style={{ width: "100%" }}>
              <Textarea radius="small" placeholder="Small radius" rows={2} />
              <Textarea radius="medium" placeholder="Medium radius" rows={2} />
              <Textarea radius="large" placeholder="Large radius" rows={2} />
              <Textarea radius="full" placeholder="Full radius" rows={2} />
            </Flex>
          </DemoCard>
          <DemoCard
            title="States"
            description="Disabled, invalid, and no-resize."
            code={stateSnippet}
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
      <DocsSection>
        <Heading as="h2">Notes</Heading>
        <DocsList>
          <li>Use `rows` to define starting height per form context.</li>
          <li>
            Set `noResize` when fixed layouts would break from user resize.
          </li>
          <li>
            Keep long helper copy outside the field so the textarea stays
            focused on content entry.
          </li>
        </DocsList>
      </DocsSection>
    </>
  );
}
