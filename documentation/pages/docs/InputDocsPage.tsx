import { Flex, Heading, Input, Link, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import { DocsDemoGrid, DocsList } from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { DemoCard } from "./DemoCard";

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function InputDocsPage() {
  const usageSnippet = [
    "import { Input } from '@wlcr/base-ic';",
    "",
    '<Input placeholder="Email address" type="email" />',
  ].join("\n");

  const variantsSnippet = [
    '<Input variant="surface" placeholder="Surface" />',
    '<Input variant="outline" placeholder="Outline" />',
    '<Input variant="ghost" placeholder="Ghost" />',
  ].join("\n");

  const sizesSnippet = [
    '<Input size="1" placeholder="Size 1" />',
    '<Input size="2" placeholder="Size 2" />',
    '<Input size="3" placeholder="Size 3" />',
    '<Input size="4" placeholder="Size 4" />',
  ].join("\n");

  const adornmentSnippet = [
    '<Input prefix={<SearchIcon />} placeholder="Search…" />',
    '<Input suffix={<span>kg</span>} type="number" placeholder="0.00" />',
  ].join("\n");

  const radiusSnippet = [
    '<Input radius="small" placeholder="Small radius" />',
    '<Input radius="medium" placeholder="Medium radius" />',
    '<Input radius="large" placeholder="Large radius" />',
    '<Input radius="full" placeholder="Full radius" />',
  ].join("\n");

  const typeSnippet = [
    '<Input type="email" placeholder="Email address" />',
    '<Input type="password" placeholder="Password" />',
    '<Input type="url" placeholder="Website URL" />',
    '<Input type="search" placeholder="Search" />',
  ].join("\n");

  return (
    <>
      <DocsSection>
        <Heading as="h1">Input</Heading>
        <Text as="p">
          A styled text input with size variants, visual styles, and optional
          prefix/suffix adornments. Wraps a native{" "}
          <code>&lt;input&gt;</code> element for full browser compatibility.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h3">Built on Native Input</Heading>
        <Text as="p">
          `Input` keeps standard browser input behavior and form integration.
          Native input reference:{" "}
          <Link
            href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input"
            target="_blank"
            rel="noreferrer"
          >
            developer.mozilla.org/.../Element/input
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
              <Input variant="surface" placeholder="Surface" />
              <Input variant="outline" placeholder="Outline" />
              <Input variant="ghost" placeholder="Ghost" />
            </Flex>
          </DemoCard>
          <DemoCard
            title="Sizes"
            description="Four sizes matching the Button scale."
            code={sizesSnippet}
          >
            <Flex direction="column" gap={2} style={{ width: "100%" }}>
              <Input size="1" placeholder="Size 1" />
              <Input size="2" placeholder="Size 2" />
              <Input size="3" placeholder="Size 3" />
              <Input size="4" placeholder="Size 4" />
            </Flex>
          </DemoCard>
          <DemoCard
            title="Adornments"
            description="Prefix and suffix slots for icons or units."
            code={adornmentSnippet}
          >
            <Flex direction="column" gap={2} style={{ width: "100%" }}>
              <Input
                prefix={<SearchIcon />}
                placeholder="Search…"
              />
              <Input
                suffix={<span style={{ color: "var(--color-neutral-11)", fontSize: "0.8125rem" }}>kg</span>}
                type="number"
                placeholder="0.00"
              />
              <Input
                prefix={<span style={{ color: "var(--color-neutral-11)", fontSize: "0.8125rem" }}>https://</span>}
                suffix={<span style={{ color: "var(--color-neutral-11)", fontSize: "0.8125rem" }}>.com</span>}
                placeholder="domain"
              />
            </Flex>
          </DemoCard>
          <DemoCard
            title="Radius"
            description="Override corner radius per field when needed."
            code={radiusSnippet}
          >
            <Flex direction="column" gap={2} style={{ width: "100%" }}>
              <Input radius="small" placeholder="Small radius" />
              <Input radius="medium" placeholder="Medium radius" />
              <Input radius="large" placeholder="Large radius" />
              <Input radius="full" placeholder="Full radius" />
            </Flex>
          </DemoCard>
          <DemoCard
            title="Common Input Types"
            description="Leverage native HTML input types with consistent styling."
            code={typeSnippet}
          >
            <Flex direction="column" gap={2} style={{ width: "100%" }}>
              <Input type="email" placeholder="Email address" />
              <Input type="password" placeholder="Password" />
              <Input type="url" placeholder="Website URL" />
              <Input type="search" placeholder="Search" />
            </Flex>
          </DemoCard>
          <DemoCard
            title="States"
            description="Disabled and invalid validation states."
            code={'<Input disabled placeholder="Disabled" />\n<Input invalid placeholder="Error state" />'}
          >
            <Flex direction="column" gap={2} style={{ width: "100%" }}>
              <Input disabled placeholder="Disabled" />
              <Input invalid placeholder="Invalid field" defaultValue="bad@" />
            </Flex>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Usage</Heading>
        <CodeBlock title="Input Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Notes</Heading>
        <DocsList>
          <li>
            Use `invalid` to reflect validation state while keeping native input
            semantics.
          </li>
          <li>
            `prefix` and `suffix` are ideal for icons, units, and protocol
            hints.
          </li>
          <li>
            `wrapperClassName` and `wrapperRef` target the outer shell for
            advanced layout control.
          </li>
        </DocsList>
      </DocsSection>
    </>
  );
}
