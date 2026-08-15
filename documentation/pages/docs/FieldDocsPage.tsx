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
    "  <Select",
    "    placeholder=\"Choose a country…\"",
    "    items={[",
    "      { value: 'us', label: 'United States' },",
    "      { value: 'gb', label: 'United Kingdom' },",
    "    ]}",
    "  />",
    "</Field>",
  ].join("\n");

  const compoundSnippet = [
    "// Use sub-components for full control",
    "<Field.Label required>Password</Field.Label>",
    "<Input type=\"password\" />",
    "<Field.Description>At least 8 characters</Field.Description>",
    "<Field.Error>Password is required</Field.Error>",
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
        <Heading>Built On Base UI</Heading>
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
        <Heading>Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Basic usage"
            description="Wrap any form control with a label and optional required marker."
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
              <Select
                placeholder="Choose a country…"
                items={[
                  { value: "us", label: "United States" },
                  { value: "gb", label: "United Kingdom" },
                  { value: "ca", label: "Canada" },
                ]}
              >
                {""}
              </Select>
            </Field>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading>Usage</Heading>
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
              description: "Error message. Also sets the field as invalid when provided.",
            },
            {
              name: "required",
              type: "boolean",
              description:
                "Mark the field required (adds visual asterisk when using the label prop).",
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
                "Explicitly control the invalid state. Falls back to !!error when omitted.",
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
              type: "React.ReactElement",
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
              type: "React.ReactElement",
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
          <code>Field.Error</code>
        </Text>
        <PropsTable
          rows={[
            {
              name: "children",
              type: "React.ReactNode",
              description: "Error message content.",
            },
            {
              name: "match",
              type: "boolean | keyof ValidityState",
              description:
                "Determines whether to show the error message according to the field's ValidityState. Pass true to always show it.",
            },
            {
              name: "render",
              type: "React.ReactElement",
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
        <Heading>Compound sub-components</Heading>
        <Text as="p">
          Use Field.Label, Field.Description, and Field.Error directly for full
          layout control.
        </Text>
        <CodeBlock title="Compound API" code={compoundSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading>Notes</Heading>
        <DocsList>
          <li>
            Pass <code>error</code> to automatically set the field as invalid
            and show an error message.
          </li>
          <li>
            <code>invalid</code> can also be set explicitly without an error
            message.
          </li>
          <li>
            <code>required</code> adds a visual asterisk; use the native{" "}
            <code>required</code> attribute on the control for form validation.
          </li>
          <li>
            Sub-components Field.Label, Field.Description, and Field.Error are
            properly wired via aria attributes.
          </li>
        </DocsList>
      </DocsSection>
    </>
  );
}
