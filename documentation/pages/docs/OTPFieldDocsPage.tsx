import { Field, Heading, Link, OTPField, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import {
  DocsDemoGrid,
  DocsDemoRow,
  DocsList,
} from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { PropsTable } from "../../components/PropsTable";
import { DemoCard } from "./DemoCard";

export function OTPFieldDocsPage() {
  const usageSnippet = [
    "import { Field, OTPField } from '@wlcr/base-ic';",
    "",
    '<Field label="Verification code">',
    "  <OTPField length={6} />",
    "</Field>",
  ].join("\n");

  const groupedSnippet = [
    '<Field label="Verification code">',
    "  <OTPField length={6} groupSize={3} />",
    "</Field>",
  ].join("\n");

  const sizesSnippet = [
    '<OTPField size="1" length={4} />',
    '<OTPField size="2" length={4} />',
    '<OTPField size="3" length={4} />',
    '<OTPField size="4" length={4} />',
  ].join("\n");

  const maskedSnippet = "<OTPField length={6} mask />";

  const compoundSnippet = [
    "// Use sub-components for full manual layout control",
    "<OTPField.Root length={4} size=\"3\">",
    "  <OTPField.Input />",
    "  <OTPField.Input />",
    "  <OTPField.Separator />",
    "  <OTPField.Input />",
    "  <OTPField.Input />",
    "</OTPField.Root>",
  ].join("\n");

  return (
    <>
      <DocsSection>
        <Heading as="h1">OTPField</Heading>
        <Text as="p">
          A one-time-code / verification-code input made of individual
          character slots. Handles paste, keyboard navigation between slots,
          and optional auto-submit when complete.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Built On Base UI</Heading>
        <Text as="p">
          This component wraps the Base UI OTP Field primitive. Base primitive
          docs:{" "}
          <Link
            href="https://base-ui.com/react/components/otp-field"
            target="_blank"
            rel="noreferrer"
          >
            base-ui.com/react/components/otp-field
          </Link>
          .
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Basic usage"
            description="A 6-digit code inside a Field, rendered as six slots."
            code={usageSnippet}
          >
            <Field label="Verification code">
              <OTPField length={6} />
            </Field>
          </DemoCard>
          <DemoCard
            title="Grouped 3+3"
            description="groupSize inserts a separator after every Nth slot."
            code={groupedSnippet}
          >
            <Field label="Verification code">
              <OTPField length={6} groupSize={3} />
            </Field>
          </DemoCard>
          <DemoCard
            title="Sizes"
            description="Four sizes mirroring the Input component's size tokens."
            code={sizesSnippet}
          >
            <DocsDemoRow>
              {(["1", "2", "3", "4"] as const).map((size) => (
                <OTPField key={size} size={size} length={4} />
              ))}
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Masked"
            description="The mask prop hides entered characters, like a password field."
            code={maskedSnippet}
          >
            <OTPField length={6} mask />
          </DemoCard>
          <DemoCard
            title="Compound parts"
            description="`OTPField.Root` takes the same `size` prop; place `OTPField.Input` and `OTPField.Separator` yourself."
            code={compoundSnippet}
          >
            <OTPField.Root length={4} size="3">
              <OTPField.Input />
              <OTPField.Input />
              <OTPField.Separator />
              <OTPField.Input />
              <OTPField.Input />
            </OTPField.Root>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Usage</Heading>
        <CodeBlock title="OTPField Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Props</Heading>
        <h3>OTPField Props</h3>
        <PropsTable
          rows={[
            {
              name: "length",
              type: "number",
              required: true,
              description:
                "The number of OTP input slots. Required so the root can clamp values and detect completion.",
            },
            {
              name: "size",
              type: "'1' | '2' | '3' | '4'",
              default: "'2'",
              description: "Visual size.",
            },
            {
              name: "groupSize",
              type: "number",
              description:
                "Insert a separator after every Nth slot (e.g. `groupSize={3}` on a `length={6}` field renders a dash after the 3rd slot for a 3+3 split).",
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
              type: "string",
              description: "The controlled OTP value.",
            },
            {
              name: "defaultValue",
              type: "string",
              description: "The uncontrolled initial OTP value.",
            },
            {
              name: "onValueChange",
              type: "(value: string, eventDetails) => void",
              description: "Called when the OTP value changes.",
            },
            {
              name: "onValueComplete",
              type: "(value: string, eventDetails) => void",
              description: "Called when the OTP value becomes complete.",
            },
            {
              name: "mask",
              type: "boolean",
              default: "false",
              description: "Whether the slot inputs should mask entered characters.",
            },
            {
              name: "autoSubmit",
              type: "boolean",
              default: "false",
              description: "Whether to submit the owning form when the OTP becomes complete.",
            },
            {
              name: "validationType",
              type: "'numeric' | 'alpha' | 'alphanumeric' | 'none'",
              default: "'numeric'",
              description: "The type of input validation to apply to typed/pasted characters.",
            },
            {
              name: "inputMode",
              type: "React.HTMLAttributes<HTMLInputElement>['inputMode']",
              description:
                "Virtual keyboard hint applied to the slot inputs. Defaults to a sensible value for the current `validationType` (e.g. numeric keypad for `'numeric'`).",
            },
            {
              name: "autoComplete",
              type: "string",
              default: "'one-time-code'",
              description:
                "Native autocomplete hint, letting browsers and OSes offer codes received via SMS/email.",
            },
            {
              name: "normalizeValue",
              type: "(value: string) => string",
              description:
                "Normalizes the value after whitespace and `validationType` filtering (e.g. `(v) => v.toUpperCase()`). Runs on default, controlled, and typed values, so it should be idempotent; the result is re-filtered and clamped to `length`.",
            },
            {
              name: "onValueInvalid",
              type: "(value: string, eventDetails) => void",
              description:
                "Called when typed or pasted text contains characters rejected by validation or normalization.",
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
                "Whether the user must enter a value before submitting a form. Not inherited from `<Field required>` — set it on OTPField itself.",
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
        <h3>OTPField.Root Props</h3>
        <Text as="p">
          For manual composition with individual <code>OTPField.Input</code> and{" "}
          <code>OTPField.Separator</code> parts. Accepts the same value/state
          props as <code>OTPField</code> above, including <code>size</code> —
          only <code>groupSize</code> is specific to the convenience wrapper.
        </Text>
        <PropsTable
          rows={[
            {
              name: "length",
              type: "number",
              required: true,
              description: "The number of OTP input slots.",
            },
            {
              name: "size",
              type: "'1' | '2' | '3' | '4'",
              default: "'2'",
              description: "Visual size.",
            },
            {
              name: "children",
              type: "React.ReactNode",
              description: "The OTPField.Input and OTPField.Separator parts to render.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional className on the root.",
            },
          ]}
        />
        <h3>OTPField.Input Props</h3>
        <PropsTable
          rows={[
            {
              name: "type",
              type: "string",
              description:
                "Override the native input type for this slot (the root's mask prop sets this by default).",
            },
            {
              name: "className",
              type: "string",
              description: "Additional className on the slot input.",
            },
          ]}
        />
        <h3>OTPField.Separator Props</h3>
        <PropsTable
          rows={[
            {
              name: "orientation",
              type: "'horizontal' | 'vertical'",
              default: "'horizontal'",
              description: "The orientation of the separator.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional className on the separator.",
            },
          ]}
        />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Compound sub-components</Heading>
        <Text as="p">
          Use OTPField.Root, OTPField.Input, and OTPField.Separator directly
          for full manual layout control instead of the length / groupSize
          convenience props.
        </Text>
        <CodeBlock title="Compound API" code={compoundSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Notes</Heading>
        <DocsList>
          <li>
            <code>length</code> is required and sets the number of character
            slots.
          </li>
          <li>
            <code>groupSize</code> inserts a separator after every Nth slot
            (e.g. <code>{"groupSize={3}"}</code> on a{" "}
            <code>{"length={6}"}</code> field splits it 3+3).
          </li>
          <li>
            <code>mask</code> hides entered characters; <code>autoSubmit</code>{" "}
            submits the owning form once the code is complete.
          </li>
          <li>
            Composes naturally with <code>Field</code> for label, description,
            and error states. <code>{"<Field required>"}</code> only marks the
            label — pass <code>required</code> to <code>OTPField</code> itself.
          </li>
          <li>
            <code>size</code> works on both the <code>OTPField</code> wrapper
            and <code>OTPField.Root</code> (default <code>'2'</code>).
          </li>
        </DocsList>
      </DocsSection>
    </>
  );
}
