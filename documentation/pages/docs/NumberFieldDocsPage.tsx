import { Field, Heading, Link, NumberField, Text } from "../../../src";
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

  const fieldSnippet = [
    "import { Field, NumberField } from '@wlcr/base-ic';",
    "",
    "<Field label=\"Quantity\" required validationMode=\"onBlur\">",
    "  <NumberField",
    "    min={1}",
    "    max={10}",
    "    decrementLabel=\"Remove one\"",
    "    incrementLabel=\"Add one\"",
    "  />",
    "</Field>",
  ].join("\n");

  return (
    <>
      <DocsSection>
        <Heading as="h1">NumberField</Heading>
        <Text as="p">
          A numeric input with decrement (−) and increment (+) step buttons.
          Arrow keys step by <code>step</code> (hold Shift for{" "}
          <code>largeStep</code>, Alt for <code>smallStep</code>) via the Base
          UI NumberField primitive.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Built On Base UI</Heading>
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
        <Heading as="h2">Demo</Heading>
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
          <DemoCard
            title="Inside a Field"
            description="The Field label names the input and `<Field required>` makes it natively required. `decrementLabel` / `incrementLabel` name the step buttons."
            code={fieldSnippet}
          >
            <Field
              label="Quantity"
              required
              validationMode="onBlur"
              style={{ maxWidth: 200 }}
            >
              <NumberField
                min={1}
                max={10}
                decrementLabel="Remove one"
                incrementLabel="Add one"
              />
            </Field>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Usage</Heading>
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
              name: "decrementLabel",
              type: "string",
              default: "'Decrease'",
              description: "Accessible label for the decrement (−) button.",
            },
            {
              name: "incrementLabel",
              type: "string",
              default: "'Increase'",
              description: "Accessible label for the increment (+) button.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional className on the root element (alongside the size class).",
            },
            {
              name: "style",
              type: "React.CSSProperties",
              description: "Inline styles applied to the root element (merged over the `radius` variable).",
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
                "Amount to increment/decrement with the buttons and arrow keys.",
            },
            {
              name: "smallStep",
              type: "number",
              default: "0.1",
              description: "Step used when the Alt key is held while incrementing/decrementing.",
            },
            {
              name: "largeStep",
              type: "number",
              default: "10",
              description: "Step used when the Shift key is held while incrementing/decrementing.",
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
              name: "onValueCommitted",
              type: "(value: number | null, eventDetails) => void",
              description:
                "Called when the value is committed — on blur after typing, or on pointer release after pressing the step buttons. Fires together with `onValueChange` for keyboard input.",
            },
            {
              name: "format",
              type: "Intl.NumberFormatOptions",
              description:
                "Options used to format the displayed value (e.g. `{ style: 'currency', currency: 'USD' }`).",
            },
            {
              name: "locale",
              type: "Intl.LocalesArgument",
              description:
                "Locale used for formatting and parsing. Defaults to the user's runtime locale.",
            },
            {
              name: "allowWheelScrub",
              type: "boolean",
              default: "false",
              description:
                "Whether the mouse wheel changes the value while the input is focused and hovered.",
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
              description:
                "Whether the user must enter a value before submitting a form. Inherited from an enclosing `<Field required>` unless set here.",
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
        <Heading as="h2">Notes</Heading>
        <DocsList>
          <li>
            No drag-to-scrub area is rendered. For pointer scrubbing, compose{" "}
            <code>NumberFieldPrimitive.ScrubArea</code> yourself; for wheel
            input, set <code>allowWheelScrub</code>.
          </li>
          <li>
            <code>min</code> / <code>max</code> clamp keyboard and button
            input; <code>step</code> controls the increment size.
          </li>
          <li>
            Use <code>size</code> to match the surrounding form element sizes.
          </li>
          <li>
            The step buttons are labelled “Decrease” / “Increase” by default;
            override with <code>decrementLabel</code> /{" "}
            <code>incrementLabel</code> (e.g. for localization). Wrap the field
            in a <code>Field</code> with a <code>label</code> to name the input
            itself.
          </li>
        </DocsList>
      </DocsSection>
    </>
  );
}
