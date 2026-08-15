import { Field, Heading, Link, OTPField, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import {
  DocsDemoGrid,
  DocsDemoRow,
  DocsList,
} from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
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
    "<OTPField.Root length={4}>",
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
        <Heading>Built On Base UI</Heading>
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
        <Heading>Demo</Heading>
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
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading>Usage</Heading>
        <CodeBlock title="OTPField Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading>Compound sub-components</Heading>
        <Text as="p">
          Use OTPField.Root, OTPField.Input, and OTPField.Separator directly
          for full manual layout control instead of the length / groupSize
          convenience props.
        </Text>
        <CodeBlock title="Compound API" code={compoundSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading>Notes</Heading>
        <DocsList>
          <li>
            <code>length</code> is required and sets the number of character
            slots.
          </li>
          <li>
            <code>groupSize</code> inserts a separator after every Nth slot
            (e.g. <code>groupSize={3}</code> on a <code>length={6}</code>{" "}
            field splits it 3+3).
          </li>
          <li>
            <code>mask</code> hides entered characters; <code>autoSubmit</code>{" "}
            submits the owning form once the code is complete.
          </li>
          <li>
            Composes naturally with <code>Field</code> for label, description,
            and error states.
          </li>
        </DocsList>
      </DocsSection>
    </>
  );
}
