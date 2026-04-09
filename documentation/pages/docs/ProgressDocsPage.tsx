import { Flex, Heading, Link, Progress, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import {
  DocsDemoGrid,
  DocsDemoRow,
  DocsList,
} from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { DemoCard } from "./DemoCard";

export function ProgressDocsPage() {
  const usageSnippet = [
    "import { Progress } from 'base-ic';",
    "",
    '<Progress value={0.6} aria-label="Upload progress" />',
  ].join("\n");

  const sizesSnippet = [
    '<Progress size="1" value={0.4} aria-label="Size 1" />',
    '<Progress size="2" value={0.6} aria-label="Size 2" />',
    '<Progress size="3" value={0.8} aria-label="Size 3" />',
  ].join("\n");

  const colorsSnippet = [
    '<Progress value={0.7} color="violet" aria-label="Violet" />',
    '<Progress value={0.55} color="green" aria-label="Green" />',
    '<Progress value={0.3} color="red" aria-label="Red" />',
  ].join("\n");

  const indeterminateSnippet = ['<Progress aria-label="Loading" />'].join("\n");

  return (
    <>
      <DocsSection>
        <Heading as="h1">Progress</Heading>
        <Text as="p">
          A horizontal bar that displays completion state. Supports determinate
          (known value) and indeterminate (unknown duration) modes.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading>Built On Base UI</Heading>
        <Text as="p">
          This component wraps the Base UI Progress primitive. Base primitive
          docs:{" "}
          <Link
            href="https://base-ui.com/react/components/progress"
            target="_blank"
            rel="noreferrer"
          >
            base-ui.com/react/components/progress
          </Link>
          .
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading>Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Sizes"
            description="Three track heights from hairline to prominent."
            code={sizesSnippet}
          >
            <Flex direction="column" gap={4} style={{ width: "100%" }}>
              <Progress size="1" value={40} aria-label="Size 1" />
              <Progress size="2" value={60} aria-label="Size 2" />
              <Progress size="3" value={80} aria-label="Size 3" />
            </Flex>
          </DemoCard>
          <DemoCard
            title="Colors"
            description="Override the fill accent hue per instance."
            code={colorsSnippet}
          >
            <Flex direction="column" gap={4} style={{ width: "100%" }}>
              <Progress value={70} color="violet" aria-label="Violet" />
              <Progress value={55} color="green" aria-label="Green" />
              <Progress value={30} color="red" aria-label="Red" />
            </Flex>
          </DemoCard>
          <DemoCard
            title="Indeterminate"
            description="Omit value for an animated indeterminate state."
            code={indeterminateSnippet}
          >
            <Progress aria-label="Loading" style={{ width: "100%" }} />
          </DemoCard>
          <DemoCard
            title="Radius"
            description="Override corner rounding per instance."
            code={
              '<Progress value={0.6} radius="none" />\n<Progress value={0.6} radius="small" />'
            }
          >
            <Flex direction="column" gap={4} style={{ width: "100%" }}>
              <Progress
                value={60}
                radius="none"
                size="3"
                aria-label="No radius"
              />
              <Progress
                value={60}
                radius="small"
                size="3"
                aria-label="Small radius"
              />
            </Flex>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading>Usage</Heading>
        <CodeBlock title="Progress Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Notes</Heading>
        <DocsList>
          <li>
            `value` is a number between `0` and `100`. Omitting `value` triggers
            the indeterminate animated state.
          </li>
          <li>
            Always provide `aria-label` or `aria-labelledby` so screen readers
            can announce progress.
          </li>
          <li>
            Use `color` to match status semantics — e.g. `green` for success,
            `red` for error.
          </li>
        </DocsList>
      </DocsSection>
    </>
  );
}
