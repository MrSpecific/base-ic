import { Field, Heading, Input, Link, Select, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import {
  DocsDemoGrid,
  DocsDemoRow,
  DocsList,
} from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { PropsTable } from "../../components/PropsTable";
import { DemoCard } from "./DemoCard";

export function FieldDocsPage() {
  const usageSnippet = [
    "import { Field, Input } from '@wlcr/base-ic';",
    "",
    "<Field label=\"Email\" required>",
    "  <Input type=\"email\" placeholder=\"you@example.com\" />",
    "</Field>",
  ].join("\n");

  const withDescriptionSnippet = [
    "<Field label=\"Username\" description=\"3–20 characters, letters and numbers only\">",
    "  <Input placeholder=\"myusername\" />",
    "</Field>",
  ].join("\n");

  const withErrorSnippet = [
    "<Field label=\"Email\" error=\"Please enter a valid email address\">",
    "  <Input type=\"email\" defaultValue=\"not-an-email\" />",
    "</Field>",
  ].join("\n");

  const withSelectSnippet = [
    "<Field label=\"Country\" description=\"Where are you based?\">",
    "  <Select placeholder=\"Choose a country…\">",
    "    <Select.Item value=\"us\">United States</Select.Item>",
    "    <Select.Item value=\"gb\">United Kingdom</Select.Item>",
    "    <Select.Item value=\"ca\">Canada</Select.Item>",
    "  </Select>",
    "</Field>",
  ].join("\n");

  const nativeValidationSnippet = [
    "// No `error` prop: native constraint messages are shown instead.",
    "<Field label=\"Email\" required validationMode=\"onBlur\">",
    "  <Input type=\"email\" placeholder=\"you@example.com\" />",
    "</Field>",
  ].join("\n");

  const compoundSnippet = [
    "import { Field } from '@wlcr/base-ic';",
    "",
    "// <Field> is still the root; compose the parts yourself inside it.",
    "<Field",
    "  required",
    "  validationMode=\"onBlur\"",
    "  validate={(value) =>",
    "    String(value ?? '').length < 8 ? 'Use at least 8 characters' : null",
    "  }",
    ">",
    "  <Field.Label required>Password</Field.Label>",
    "  <Field.Control type=\"password\" />",
    "  <Field.Description>At least 8 characters</Field.Description>",
    "</Field>",
  ].join("\n");

  return (
    <>
      <DocsSection>
        <Heading as="h1">Field</Heading>
        <Text as="p">
          A form field wrapper that associates a label, helper text, and error
          message with a control. Built on Base UI Field for correct
          accessibility wiring (aria-labelledby, aria-describedby,
          aria-errormessage).
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Built On Base UI</Heading>
        <Text as="p">
          This component wraps the Base UI Field primitive. Base primitive docs:{" "}
          <Link
            href="https://base-ui.com/react/components/field"
            target="_blank"
            rel="noreferrer"
          >
            base-ui.com/react/components/field
          </Link>
          .
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Basic usage"
            description="Wrap a form control with a label. `required` adds the asterisk and makes the Input natively required."
            code={usageSnippet}
          >
            <Field label="Email" required style={{ maxWidth: 320 }}>
              <Input type="email" placeholder="you@example.com" />
            </Field>
          </DemoCard>
          <DemoCard
            title="With description"
            description="Add helper text below the control with the description prop."
            code={withDescriptionSnippet}
          >
            <Field
              label="Username"
              description="3–20 characters, letters and numbers only"
              style={{ maxWidth: 320 }}
            >
              <Input placeholder="myusername" />
            </Field>
          </DemoCard>
          <DemoCard
            title="With error"
            description="Pass an error string to mark the field invalid and show an error message."
            code={withErrorSnippet}
          >
            <Field
              label="Email"
              error="Please enter a valid email address"
              style={{ maxWidth: 320 }}
            >
              <Input type="email" defaultValue="not-an-email" />
            </Field>
          </DemoCard>
          <DemoCard
            title="With Select"
            description="Field works with any form control, including Select."
            code={withSelectSnippet}
          >
            <Field
              label="Country"
              description="Where are you based?"
              style={{ maxWidth: 320 }}
            >
              <Select placeholder="Choose a country…">
                <Select.Item value="us">United States</Select.Item>
                <Select.Item value="gb">United Kingdom</Select.Item>
                <Select.Item value="ca">Canada</Select.Item>
              </Select>
            </Field>
          </DemoCard>
          <DemoCard
            title="Native validation"
            description={'Without `error`, the browser\'s constraint message (`required`, `type="email"`) is shown once the field is invalid. Leave it empty or type an invalid address, then blur.'}
            code={nativeValidationSnippet}
          >
            <Field
              label="Email"
              required
              validationMode="onBlur"
              style={{ maxWidth: 320 }}
            >
              <Input type="email" placeholder="you@example.com" />
            </Field>
          </DemoCard>
          <DemoCard
            title="Custom validation"
            description={'`validate` returns an error message (or `null` when valid). `validationMode="onBlur"` checks it when the control loses focus.'}
            code={compoundSnippet}
          >
            <Field
              required
              validationMode="onBlur"
              validate={(value) =>
                String(value ?? "").length < 8 ? "Use at least 8 characters" : null
              }
              style={{ maxWidth: 320 }}
            >
              <Field.Label required>Password</Field.Label>
              <Field.Control type="password" />
              <Field.Description>At least 8 characters</Field.Description>
            </Field>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Usage</Heading>
        <CodeBlock title="Field Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Props</Heading>
        <Text as="p">
          <code>Field</code> (root)
        </Text>
        <PropsTable
          rows={[
            {
              name: "label",
              type: "React.ReactNode",
              description: "Convenience prop: renders a Field.Label above the control.",
            },
            {
              name: "description",
              type: "React.ReactNode",
              description: "Helper text rendered below the control.",
            },
            {
              name: "error",
              type: "React.ReactNode",
              description:
                "Error message. When set, the field is marked invalid and the message is always shown. When omitted, the message from `validate` or native constraint validation (e.g. `required`, `type=\"email\"`) is shown once the field is invalid.",
            },
            {
              name: "required",
              type: "boolean",
              description:
                "Adds an asterisk to the `label` prop and makes the base-ic control inside (Input / `Field.Control`, Textarea, NumberField, Checkbox, Switch, RadioGroup) natively `required`, unless the control sets `required` itself. Other controls need their own `required`.",
            },
            {
              name: "children",
              type: "React.ReactNode",
              required: true,
              description: "Form controls to render inside the field.",
            },
            {
              name: "invalid",
              type: "boolean",
              description:
                "Explicitly control the invalid state (e.g. from an external form library). When omitted, it is `true` if `error` is set; otherwise validity comes from `validate` / native constraints.",
            },
            {
              name: "validate",
              type: "(value: unknown, formValues) => string | string[] | null | Promise<…>",
              description:
                "Custom validation. Return an error message (or messages) when invalid, or `null` / nothing when valid.",
            },
            {
              name: "validationMode",
              type: "'onSubmit' | 'onBlur' | 'onChange'",
              default: "'onSubmit'",
              description: "When the field validates. Takes precedence over `validationMode` on a parent Form.",
            },
            {
              name: "validationDebounceTime",
              type: "number",
              default: "0",
              description: "Milliseconds to debounce `validate` when `validationMode=\"onChange\"`.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description:
                "Whether the component should ignore user interaction. Takes precedence over disabled on the control.",
            },
            {
              name: "name",
              type: "string",
              description: "Identifies the field when a form is submitted.",
            },
            {
              name: "className",
              type: "string",
              description: "Custom className applied to the root.",
            },
            {
              name: "style",
              type: "React.CSSProperties",
              description: "Custom style applied to the root.",
            },
          ]}
        />
        <Text as="p">
          <code>Field.Label</code>
        </Text>
        <PropsTable
          rows={[
            {
              name: "required",
              type: "boolean",
              description: "Renders a visual asterisk (*) after the label text.",
            },
            {
              name: "nativeLabel",
              type: "boolean",
              default: "true",
              description:
                "Whether a native <label> element is rendered when swapped via render. Set false if the rendered element isn't a label.",
            },
            {
              name: "children",
              type: "React.ReactNode",
              description: "Label text/content.",
            },
            {
              name: "render",
              type: "React.ReactElement | ((props, state) => React.ReactElement)",
              description: "Render as a different element (Base UI render prop).",
            },
            {
              name: "className",
              type: "string",
              description: "Custom className.",
            },
          ]}
        />
        <Text as="p">
          <code>Field.Description</code>
        </Text>
        <PropsTable
          rows={[
            {
              name: "children",
              type: "React.ReactNode",
              description: "Helper text content.",
            },
            {
              name: "render",
              type: "React.ReactElement | ((props, state) => React.ReactElement)",
              description: "Render as a different element (Base UI render prop).",
            },
            {
              name: "className",
              type: "string",
              description: "Custom className.",
            },
          ]}
        />
        <Text as="p">
          <code>Field.Control</code>
        </Text>
        <Text as="p">
          The styled, Field-aware text control — the same component and props
          as <code>Input</code> (see the Input page; the props type is exported
          as <code>FieldControlProps</code>). <code>Field.Control</code> and{" "}
          <code>Input</code> are interchangeable inside a <code>Field</code>,
          so Base UI-style <code>{"<Field.Control />"}</code> markup gets
          base-ic styling.
        </Text>
        <Text as="p">
          <code>Field.Error</code>
        </Text>
        <PropsTable
          rows={[
            {
              name: "children",
              type: "React.ReactNode",
              description:
                "Error message content. Omit it to show the message from `validate` / native constraint validation.",
            },
            {
              name: "match",
              type: "boolean | keyof ValidityState",
              description:
                "By default the error shows whenever the field is invalid. Pass a `ValidityState` key (e.g. `\"valueMissing\"`) to show it only for that failure, or `true` to always show it.",
            },
            {
              name: "render",
              type: "React.ReactElement | ((props, state) => React.ReactElement)",
              description: "Render as a different element (Base UI render prop).",
            },
            {
              name: "className",
              type: "string",
              description: "Custom className.",
            },
          ]}
        />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Compound sub-components</Heading>
        <Text as="p">
          Skip the `label` / `description` / `error` props and render
          `Field.Label`, `Field.Control`, and `Field.Description` yourself
          inside a `Field` root for full layout control. `Field.Label`,
          `Field.Description`, and `Field.Error` read the field's context and
          throw outside a `Field`; `Field.Control` also works standalone (like
          `Input`).
        </Text>
        <Text as="p">
          `Field` always renders a `Field.Error` after its children that shows
          the `validate` / native constraint message once the field is invalid,
          so you rarely need your own `Field.Error` — one you add will appear
          alongside it.
        </Text>
        <CodeBlock title="Compound API" code={compoundSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Notes</Heading>
        <DocsList>
          <li>
            Pass <code>error</code> to set the field as invalid and always show
            that message. Without it, messages from <code>validate</code> or
            native constraints appear automatically once the field is invalid.
          </li>
          <li>
            <code>invalid</code> can also be set explicitly without an error
            message.
          </li>
          <li>
            <code>required</code> adds a visual asterisk to the{" "}
            <code>label</code> prop and makes the base-ic control inside (Input
            / <code>Field.Control</code>, Textarea, NumberField, Checkbox,
            Switch, RadioGroup) natively required, so an empty value shows the
            browser's message. A <code>required</code> set on the control
            itself always wins; other controls (e.g. Select, OTPField) need
            their own. With the compound API, put <code>required</code> on{" "}
            <code>Field.Label</code> too for the asterisk.
          </li>
          <li>
            Validation runs according to <code>validationMode</code> (default{" "}
            <code>'onSubmit'</code>, which validates when the owning form is
            submitted). Use <code>'onBlur'</code> or <code>'onChange'</code> to
            show messages as the user edits.
          </li>
          <li>
            Field.Label, Field.Control, Field.Description, and Field.Error are
            wired together via ids and aria attributes (label, described-by,
            invalid state).
          </li>
        </DocsList>
      </DocsSection>
    </>
  );
}
