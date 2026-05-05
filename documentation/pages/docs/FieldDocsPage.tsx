import { Field, Heading, Input, Link, Select, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import {
  DocsDemoGrid,
  DocsDemoRow,
  DocsList,
} from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
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
