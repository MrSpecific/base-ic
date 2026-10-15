import { Field, Flex, Heading, Link, Slider, Text } from "../../../src";
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
    "<Slider",
    "  defaultValue={[20, 75]}",
    "  getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}",
    "  getAriaValueText={(formattedValue) => `$${formattedValue}`}",
    "/>",
  ].join("\n");

  const verticalSnippet = [
    "// The vertical slider fills its parent's height.",
    '<Flex gap={5} style={{ height: 160 }}>',
    '  <Slider orientation="vertical" defaultValue={30} aria-label="Bass" />',
    '  <Slider orientation="vertical" defaultValue={60} aria-label="Mid" />',
    '  <Slider orientation="vertical" defaultValue={80} aria-label="Treble" />',
    "</Flex>",
  ].join("\n");

  const fieldSnippet = [
    "import { Field, Slider } from '@wlcr/base-ic';",
    "",
    "// The Field label names the thumb; an invalid Field tints the slider.",
    '<Field label="Brightness" error="Brightness must be at least 50">',
    "  <Slider defaultValue={30} />",
    "</Field>",
  ].join("\n");

  return (
    <>
      <DocsSection>
        <Heading as="h1">Slider</Heading>
        <Text as="p">
          A draggable range input for selecting numeric values. Supports single
          values, ranges, step increments, vertical orientation, and custom
          color accents.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Built On Base UI</Heading>
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
        <Heading as="h2">Demo</Heading>
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
            description="Pass an array to `defaultValue` for a two-thumb range. `getAriaLabel` names each thumb and `getAriaValueText` sets what screen readers announce."
            code={rangeSnippet}
          >
            <Slider
              defaultValue={[20, 75]}
              getAriaLabel={(index) => (index === 0 ? "Minimum price" : "Maximum price")}
              getAriaValueText={(formattedValue) => `$${formattedValue}`}
              style={{ width: "100%" }}
            />
          </DemoCard>
          <DemoCard
            title="Vertical"
            description={'`orientation="vertical"` stands the track upright; give the parent a height to set its length.'}
            code={verticalSnippet}
          >
            <Flex gap={5} style={{ height: 160 }}>
              <Slider orientation="vertical" defaultValue={30} aria-label="Bass" />
              <Slider orientation="vertical" defaultValue={60} aria-label="Mid" />
              <Slider orientation="vertical" defaultValue={80} aria-label="Treble" />
            </Flex>
          </DemoCard>
          <DemoCard
            title="Inside a Field"
            description="A `Field` label names the slider without `aria-label`. When the field is invalid, `[data-invalid]` styles the indicator and thumb in the danger color."
            code={fieldSnippet}
          >
            <Field
              label="Brightness"
              error="Brightness must be at least 50"
              style={{ width: "100%" }}
            >
              <Slider defaultValue={30} />
            </Field>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Usage</Heading>
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
              name: "aria-label",
              type: "string",
              description:
                "Accessible name for the thumb input(s). Forwarded to each thumb, since the focusable `<input>` lives there rather than on the root group. For range sliders prefer `getAriaLabel`.",
            },
            {
              name: "aria-labelledby",
              type: "string",
              description:
                "Id of an element that labels the slider; applied to the thumb input(s) when they have no `aria-label`. Inside a `Field`, the field label is used automatically.",
            },
            {
              name: "getAriaLabel",
              type: "(index: number) => string",
              description:
                "Returns the `aria-label` for the thumb at `index` (e.g. \"Minimum price\"). Takes precedence over `aria-label`.",
            },
            {
              name: "getAriaValueText",
              type: "(formattedValue: string, value: number, index: number) => string",
              description:
                "Returns the `aria-valuetext` for the thumb at `index` (e.g. \"$20\").",
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
              description:
                "The component orientation. Vertical sliders fill their parent's height (minimum six thumb sizes).",
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
          <li>
            Always give the slider an accessible name: `aria-label`,
            `aria-labelledby`, a wrapping `Field` with a `label`, or
            `getAriaLabel` for range sliders. The name is applied to the
            focusable thumb input(s), not the root.
          </li>
          <li>
            Inside an invalid `Field` (via `error`, `invalid`, or failed
            validation), the indicator and thumb switch to the danger color via
            `[data-invalid]`.
          </li>
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
