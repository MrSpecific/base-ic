import { Heading, Link, NumberField, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import {
  DocsDemoGrid,
  DocsDemoRow,
  DocsList,
} from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { PropsTable } from "../../components/PropsTable";
import { DemoCard } from "./DemoCard";

export function NumberFieldDocsPage() {
  const usageSnippet = [
    "import { NumberField } from '@wlcr/base-ic';",
    "",
    "<NumberField defaultValue={0} min={0} max={100} />",
  ].join("\n");

  const sizesSnippet = [
    '<NumberField size="1" defaultValue={0} />',
    '<NumberField size="2" defaultValue={0} />',
    '<NumberField size="3" defaultValue={0} />',
    '<NumberField size="4" defaultValue={0} />',
  ].join("\n");

  const stepsSnippet = [
    "// Step by 5",
    "<NumberField defaultValue={0} step={5} min={0} max={100} />",
    "",
    "// Step by 0.1",
    "<NumberField defaultValue={0.5} step={0.1} min={0} max={1} />",
  ].join("\n");

  const disabledSnippet = "<NumberField defaultValue={42} disabled />";

  return (
    <>
      <DocsSection>
        <Heading as="h1">NumberField</Heading>
        <Text as="p">
          A numeric input with decrement (−) and increment (+) step buttons.
          Supports keyboard scrubbing (drag on the input to change values)
          via the Base UI NumberField primitive.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading>Built On Base UI</Heading>
        <Text as="p">
          This component wraps the Base UI NumberField primitive. Base primitive
          docs:{" "}
          <Link
            href="https://base-ui.com/react/components/number-field"
            target="_blank"
            rel="noreferrer"
          >
            base-ui.com/react/components/number-field
          </Link>
          .
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading>Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Basic usage"
            description="A numeric input bounded to 0–100."
            code={usageSnippet}
          >
            <NumberField defaultValue={0} min={0} max={100} style={{ maxWidth: 200 }} />
          </DemoCard>
          <DemoCard
            title="Sizes"
            description="Four sizes mirroring button/input size tokens."
            code={sizesSnippet}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", maxWidth: 240 }}>
              {(["1", "2", "3", "4"] as const).map((size) => (
                <NumberField key={size} size={size} defaultValue={0} />
              ))}
            </div>
          </DemoCard>
          <DemoCard
            title="Step controls"
            description="Set step to control how much each click increments."
            code={stepsSnippet}
          >
            <DocsDemoRow>
              <NumberField
                defaultValue={0}
                step={5}
                min={0}
                max={100}
                style={{ maxWidth: 200 }}
              />
              <NumberField
                defaultValue={0.5}
                step={0.1}
                min={0}
                max={1}
                style={{ maxWidth: 200 }}
              />
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Disabled"
            description="The disabled prop prevents all interaction."
            code={disabledSnippet}
          >
            <NumberField defaultValue={42} disabled style={{ maxWidth: 200 }} />
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading>Usage</Heading>
        <CodeBlock title="NumberField Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Props</Heading>
        <PropsTable
          rows={[
            {
              name: "size",
              type: "'1' | '2' | '3' | '4'",
              default: "'2'",
              description: "Visual size preset.",
            },
            {
              name: "radius",
              type: "'none' | 'small' | 'medium' | 'large' | 'full'",
              description: "Override the border-radius. Falls back to the Theme's radius.",
            },
            {
              name: "placeholder",
              type: "string",
              description: "Placeholder shown in the input when empty.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional className on the group wrapper.",
            },
            {
              name: "style",
              type: "React.CSSProperties",
              description: "Inline styles applied to the root element.",
            },
            {
              name: "min",
              type: "number",
              description: "The minimum value of the input element.",
            },
            {
              name: "max",
              type: "number",
              description: "The maximum value of the input element.",
            },
            {
              name: "step",
              type: "number | 'any'",
              default: "1",
              description:
                "Amount to increment/decrement with the buttons, arrow keys, or scrub area.",
            },
            {
              name: "value",
              type: "number | null",
              description: "The controlled numeric value of the field.",
            },
            {
              name: "defaultValue",
              type: "number",
              description: "The uncontrolled initial value of the field.",
            },
            {
              name: "onValueChange",
              type: "(value: number | null, eventDetails) => void",
              description: "Called when the number value changes.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Whether the component should ignore user interaction.",
            },
            {
              name: "required",
              type: "boolean",
              default: "false",
              description: "Whether the user must enter a value before submitting a form.",
            },
            {
              name: "readOnly",
              type: "boolean",
              default: "false",
              description: "Whether the user should be unable to change the field value.",
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
        <Heading>Notes</Heading>
        <DocsList>
          <li>Drag on the input to scrub values (Base UI's scrubbing feature).</li>
          <li>
            <code>min</code> / <code>max</code> clamp keyboard and button
            input; <code>step</code> controls the increment size.
          </li>
          <li>
            Use <code>size</code> to match the surrounding form element sizes.
          </li>
        </DocsList>
      </DocsSection>
    </>
  );
}
