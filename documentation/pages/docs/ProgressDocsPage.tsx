import { Flex, Heading, Link, Progress, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import {
  DocsDemoGrid,
  DocsDemoRow,
  DocsList,
} from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { PropsTable } from "../../components/PropsTable";
import { DemoCard } from "./DemoCard";

export function ProgressDocsPage() {
  const usageSnippet = [
    "import { Progress } from '@wlcr/base-ic';",
    "",
    '<Progress value={60} aria-label="Upload progress" />',
  ].join("\n");

  const sizesSnippet = [
    '<Progress size="1" value={40} aria-label="Size 1" />',
    '<Progress size="2" value={60} aria-label="Size 2" />',
    '<Progress size="3" value={80} aria-label="Size 3" />',
  ].join("\n");

  const colorsSnippet = [
    '<Progress value={70} color="violet" aria-label="Violet" />',
    '<Progress value={55} color="green" aria-label="Green" />',
    '<Progress value={30} color="red" aria-label="Red" />',
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
        <Heading as="h2">Built On Base UI</Heading>
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
        <Heading as="h2">Demo</Heading>
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
              '<Progress value={60} radius="none" size="3" aria-label="No radius" />\n<Progress value={60} radius="small" size="3" aria-label="Small radius" />'
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
        <Heading as="h2">Usage</Heading>
        <CodeBlock title="Progress Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Props</Heading>
        <PropsTable
          rows={[
            {
              name: "value",
              type: "number | null",
              default: "null",
              description:
                "Current value between min and max. Omit or pass null for the indeterminate mode.",
            },
            {
              name: "size",
              type: "'1' | '2' | '3'",
              default: "'2'",
              description: "Visual size (track height).",
            },
            {
              name: "color",
              type: "AccentColor",
              description: "Override the accent color for the fill.",
            },
            {
              name: "radius",
              type: "'none' | 'small' | 'medium' | 'large' | 'full'",
              description: "Override the border-radius of the track.",
            },
            {
              name: "min",
              type: "number",
              default: "0",
              description: "The minimum value.",
            },
            {
              name: "max",
              type: "number",
              default: "100",
              description: "The maximum value.",
            },
            {
              name: "format",
              type: "Intl.NumberFormatOptions",
              description:
                "Options used to format the value for assistive tech (e.g. `{ style: 'percent' }`). The bar renders no visible value text, so this only affects the announced value.",
            },
            {
              name: "locale",
              type: "Intl.LocalesArgument",
              description:
                "Locale passed to `Intl.NumberFormat` when formatting the value. Defaults to the user's runtime locale.",
            },
            {
              name: "getAriaValueText",
              type: "(formattedValue: string, value: number | null) => string",
              description:
                "Returns a human-readable `aria-valuetext` for the current value (e.g. \"3 of 10 files\").",
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
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Notes</Heading>
        <DocsList>
          <li>
            `value` is a number between `min` and `max` (`0`–`100` by default).
            Omitting `value` (or passing `null`) triggers the indeterminate
            animated state.
          </li>
          <li>
            Always provide <code>aria-label</code> or <code>aria-labelledby</code> so screen readers
            can announce progress.
          </li>
          <li>
            Use <code>color</code> to match status semantics — e.g. <code>green</code> for success,
            `red` for error.
          </li>
        </DocsList>
      </DocsSection>
    </>
  );
}
