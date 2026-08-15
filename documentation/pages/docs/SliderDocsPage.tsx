import { Flex, Heading, Link, Slider, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import {
  DocsDemoGrid,
  DocsDemoRow,
  DocsList,
} from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { PropsTable } from "../../components/PropsTable";
import { DemoCard } from "./DemoCard";

export function SliderDocsPage() {
  const usageSnippet = [
    "import { Slider } from '@wlcr/base-ic';",
    "",
    '<Slider defaultValue={50} min={0} max={100} aria-label="Volume" />',
  ].join("\n");

  const sizesSnippet = [
    '<Slider size="1" defaultValue={30} aria-label="Size 1" />',
    '<Slider size="2" defaultValue={50} aria-label="Size 2" />',
    '<Slider size="3" defaultValue={70} aria-label="Size 3" />',
  ].join("\n");

  const colorsSnippet = [
    '<Slider defaultValue={60} color="violet" aria-label="Violet" />',
    '<Slider defaultValue={40} color="green" aria-label="Green" />',
    '<Slider defaultValue={80} color="orange" aria-label="Orange" />',
  ].join("\n");

  const outputSnippet = [
    '<Slider defaultValue={50} showOutput aria-label="Volume" />',
  ].join("\n");

  const rangeSnippet = [
    '<Slider defaultValue={[20, 75]} aria-label="Price range" />',
  ].join("\n");

  return (
    <>
      <DocsSection>
        <Heading as="h1">Slider</Heading>
        <Text as="p">
          A draggable range input for selecting numeric values. Supports single
          values, ranges, step increments, and custom color accents.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading>Built On Base UI</Heading>
        <Text as="p">
          This component wraps the Base UI Slider primitive. Base primitive
          docs:{" "}
          <Link
            href="https://base-ui.com/react/components/slider"
            target="_blank"
            rel="noreferrer"
          >
            base-ui.com/react/components/slider
          </Link>
          .
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading>Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Sizes"
            description="Three track/thumb size presets."
            code={sizesSnippet}
          >
            <Flex direction="column" gap={4} style={{ width: "100%" }}>
              <Slider size="1" defaultValue={30} aria-label="Size 1" />
              <Slider size="2" defaultValue={50} aria-label="Size 2" />
              <Slider size="3" defaultValue={70} aria-label="Size 3" />
            </Flex>
          </DemoCard>
          <DemoCard
            title="Colors"
            description="Override the accent hue per instance."
            code={colorsSnippet}
          >
            <Flex direction="column" gap={4} style={{ width: "100%" }}>
              <Slider defaultValue={60} color="violet" aria-label="Violet" />
              <Slider defaultValue={40} color="green" aria-label="Green" />
              <Slider defaultValue={80} color="orange" aria-label="Orange" />
            </Flex>
          </DemoCard>
          <DemoCard
            title="With value output"
            description="showOutput renders the current value alongside the track."
            code={outputSnippet}
          >
            <Slider defaultValue={50} showOutput aria-label="Volume" style={{ width: "100%" }} />
          </DemoCard>
          <DemoCard
            title="Range slider"
            description="Pass an array to defaultValue for a two-thumb range."
            code={rangeSnippet}
          >
            <Slider
              defaultValue={[20, 75]}
              aria-label="Price range"
              style={{ width: "100%" }}
            />
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading>Usage</Heading>
        <CodeBlock title="Slider Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Props</Heading>
        <PropsTable
          rows={[
            {
              name: "size",
              type: "'1' | '2' | '3'",
              default: "'2'",
              description: "Visual size preset.",
            },
            {
              name: "color",
              type: "AccentColor",
              description: "Override the accent color.",
            },
            {
              name: "radius",
              type: "'none' | 'small' | 'medium' | 'large' | 'full'",
              description: "Override the border-radius of the track.",
            },
            {
              name: "showOutput",
              type: "boolean",
              default: "false",
              description: "Show a value output alongside the thumb.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional className on the root.",
            },
            {
              name: "style",
              type: "React.CSSProperties",
              description: "Inline styles applied to the root element.",
            },
            {
              name: "value",
              type: "number | readonly number[]",
              description: "The value of the slider. Pass an array for a range slider.",
            },
            {
              name: "defaultValue",
              type: "number | readonly number[]",
              description: "The uncontrolled initial value; use an array for a range slider.",
            },
            {
              name: "min",
              type: "number",
              default: "0",
              description: "The minimum allowed value of the slider.",
            },
            {
              name: "max",
              type: "number",
              default: "100",
              description: "The maximum allowed value of the slider.",
            },
            {
              name: "step",
              type: "number",
              default: "1",
              description: "The granularity with which the slider can step through values.",
            },
            {
              name: "largeStep",
              type: "number",
              default: "10",
              description: "The step used with Page Up/Down or Shift + Arrow keys.",
            },
            {
              name: "orientation",
              type: "'horizontal' | 'vertical'",
              default: "'horizontal'",
              description: "The component orientation.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Whether the slider should ignore user interaction.",
            },
            {
              name: "onValueChange",
              type: "(value, eventDetails) => void",
              description: "Called when the slider's value changes.",
            },
            {
              name: "onValueCommitted",
              type: "(value, eventDetails) => void",
              description: "Called when a value change is committed (e.g. drag released).",
            },
            {
              name: "name",
              type: "string",
              description: "Identifies the field when a form is submitted.",
            },
          ]}
        />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Notes</Heading>
        <DocsList>
          <li>Always provide `aria-label` or `aria-labelledby` for accessibility.</li>
          <li>
            Pass an array to `defaultValue` (e.g. `[20, 75]`) for a range slider
            with two thumbs.
          </li>
          <li>Use `step` to constrain values to discrete increments.</li>
          <li>`showOutput` adds a live value readout to the right of the track.</li>
        </DocsList>
      </DocsSection>
    </>
  );
}
