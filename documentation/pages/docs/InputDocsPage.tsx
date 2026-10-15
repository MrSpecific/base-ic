import { Field, Flex, Heading, Input, Link, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import { DocsDemoGrid, DocsList } from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { PropsTable } from "../../components/PropsTable";
import { DemoCard } from "./DemoCard";

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function InputDocsPage() {
  const usageSnippet = [
    "import { Input } from '@wlcr/base-ic';",
    "",
    '<Input placeholder="Email address" type="email" />',
  ].join("\n");

  const variantsSnippet = [
    '<Input variant="surface" placeholder="Surface" />',
    '<Input variant="outline" placeholder="Outline" />',
    '<Input variant="ghost" placeholder="Ghost" />',
  ].join("\n");

  const sizesSnippet = [
    '<Input size="1" placeholder="Size 1" />',
    '<Input size="2" placeholder="Size 2" />',
    '<Input size="3" placeholder="Size 3" />',
    '<Input size="4" placeholder="Size 4" />',
  ].join("\n");

  const adornmentSnippet = [
    '<Input prefix={<SearchIcon />} placeholder="Search…" />',
    '<Input suffix={<span>kg</span>} type="number" placeholder="0.00" />',
  ].join("\n");

  const radiusSnippet = [
    '<Input radius="small" placeholder="Small radius" />',
    '<Input radius="medium" placeholder="Medium radius" />',
    '<Input radius="large" placeholder="Large radius" />',
    '<Input radius="full" placeholder="Full radius" />',
  ].join("\n");

  const typeSnippet = [
    '<Input type="email" placeholder="Email address" />',
    '<Input type="password" placeholder="Password" />',
    '<Input type="url" placeholder="Website URL" />',
    '<Input type="search" placeholder="Search" />',
  ].join("\n");

  const fieldSnippet = [
    "import { Field, Input } from '@wlcr/base-ic';",
    "",
    "<Field label=\"Email\" required validationMode=\"onBlur\">",
    "  <Input type=\"email\" placeholder=\"you@example.com\" />",
    "</Field>",
  ].join("\n");

  return (
    <>
      <DocsSection>
        <Heading as="h1">Input</Heading>
        <Text as="p">
          A styled text input with size variants, visual styles, and optional
          prefix/suffix adornments. Renders a native{" "}
          <code>&lt;input&gt;</code> via Base UI Input, so it works on its own
          and wires itself into an enclosing <code>Field</code>.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h3">Built On Base UI</Heading>
        <Text as="p">
          `Input` wraps the Base UI Input primitive, a native{" "}
          {"`<input>`"} that is
          Field-aware: inside a `Field` it picks up the label, description, and
          error ids, takes part in validation, and exposes state attributes
          such as `data-invalid`, `data-touched`, and `data-dirty`. Base
          primitive docs:{" "}
          <Link
            href="https://base-ui.com/react/components/input"
            target="_blank"
            rel="noreferrer"
          >
            base-ui.com/react/components/input
          </Link>
          .
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Variants"
            description="Surface, outline, and ghost visual styles."
            code={variantsSnippet}
          >
            <Flex direction="column" gap={2} style={{ width: "100%" }}>
              <Input variant="surface" placeholder="Surface" />
              <Input variant="outline" placeholder="Outline" />
              <Input variant="ghost" placeholder="Ghost" />
            </Flex>
          </DemoCard>
          <DemoCard
            title="Sizes"
            description="Four sizes matching the Button scale."
            code={sizesSnippet}
          >
            <Flex direction="column" gap={2} style={{ width: "100%" }}>
              <Input size="1" placeholder="Size 1" />
              <Input size="2" placeholder="Size 2" />
              <Input size="3" placeholder="Size 3" />
              <Input size="4" placeholder="Size 4" />
            </Flex>
          </DemoCard>
          <DemoCard
            title="Adornments"
            description="Prefix and suffix slots for icons or units."
            code={adornmentSnippet}
          >
            <Flex direction="column" gap={2} style={{ width: "100%" }}>
              <Input
                prefix={<SearchIcon />}
                placeholder="Search…"
              />
              <Input
                suffix={<span style={{ color: "var(--color-neutral-11)", fontSize: "0.8125rem" }}>kg</span>}
                type="number"
                placeholder="0.00"
              />
              <Input
                prefix={<span style={{ color: "var(--color-neutral-11)", fontSize: "0.8125rem" }}>https://</span>}
                suffix={<span style={{ color: "var(--color-neutral-11)", fontSize: "0.8125rem" }}>.com</span>}
                placeholder="domain"
              />
            </Flex>
          </DemoCard>
          <DemoCard
            title="Radius"
            description="Override corner radius per field when needed."
            code={radiusSnippet}
          >
            <Flex direction="column" gap={2} style={{ width: "100%" }}>
              <Input radius="small" placeholder="Small radius" />
              <Input radius="medium" placeholder="Medium radius" />
              <Input radius="large" placeholder="Large radius" />
              <Input radius="full" placeholder="Full radius" />
            </Flex>
          </DemoCard>
          <DemoCard
            title="Common Input Types"
            description="Leverage native HTML input types with consistent styling."
            code={typeSnippet}
          >
            <Flex direction="column" gap={2} style={{ width: "100%" }}>
              <Input type="email" placeholder="Email address" />
              <Input type="password" placeholder="Password" />
              <Input type="url" placeholder="Website URL" />
              <Input type="search" placeholder="Search" />
            </Flex>
          </DemoCard>
          <DemoCard
            title="States"
            description="Disabled and invalid validation states."
            code={'<Input disabled placeholder="Disabled" />\n<Input invalid placeholder="Error state" />'}
          >
            <Flex direction="column" gap={2} style={{ width: "100%" }}>
              <Input disabled placeholder="Disabled" />
              <Input invalid placeholder="Invalid field" defaultValue="bad@" />
            </Flex>
          </DemoCard>
          <DemoCard
            title="Inside a Field"
            description="`<Field required>` makes the Input natively required; the native message shows once the field is invalid (here, on blur)."
            code={fieldSnippet}
          >
            <Field
              label="Email"
              required
              validationMode="onBlur"
              style={{ width: "100%" }}
            >
              <Input type="email" placeholder="you@example.com" />
            </Field>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Usage</Heading>
        <CodeBlock title="Input Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Props</Heading>
        <PropsTable
          rows={[
            {
              name: "size",
              type: "'1' | '2' | '3' | '4'",
              default: "'2'",
              description: "Visual size.",
            },
            {
              name: "variant",
              type: "'surface' | 'outline' | 'ghost'",
              default: "'surface'",
              description: "Visual style.",
            },
            {
              name: "radius",
              type: "'none' | 'small' | 'medium' | 'large' | 'full'",
              description: "Override the border-radius.",
            },
            {
              name: "prefix",
              type: "React.ReactNode",
              description: "Content placed before the input (icon, label-like).",
            },
            {
              name: "suffix",
              type: "React.ReactNode",
              description: "Content placed after the input (icon, button, unit).",
            },
            {
              name: "invalid",
              type: "boolean",
              description:
                "Marks the input as having a validation error (sets `aria-invalid`). Inside a `Field`, the field's validity is reflected automatically via `data-invalid`, so this is mainly for standalone use.",
            },
            {
              name: "wrapperRef",
              type: "React.Ref<HTMLDivElement>",
              description: "Ref for the wrapper div (use standard ref for the input element).",
            },
            {
              name: "wrapperClassName",
              type: "string",
              description: "CSS class for the outer wrapper div.",
            },
            {
              name: "type",
              type: "string",
              description: "Native input type (e.g. 'text', 'email', 'password', 'search').",
            },
            {
              name: "placeholder",
              type: "string",
              description: "Placeholder text shown when the input is empty.",
            },
            {
              name: "disabled",
              type: "boolean",
              description: "Disables the input (native HTML attribute).",
            },
            {
              name: "value",
              type: "string",
              description: "The controlled value of the input.",
            },
            {
              name: "defaultValue",
              type: "string",
              description: "The uncontrolled initial value of the input.",
            },
            {
              name: "onChange",
              type: "React.ChangeEventHandler<HTMLInputElement>",
              description: "Called when the input value changes (native HTML event).",
            },
            {
              name: "onValueChange",
              type: "(value: string, eventDetails) => void",
              description:
                "Called with the new string value when it changes (Base UI). Convenient for controlled inputs.",
            },
            {
              name: "required",
              type: "boolean",
              description:
                "Whether a value is required (native constraint). Inherited from an enclosing `<Field required>` unless set here.",
            },
            {
              name: "name",
              type: "string",
              description: "Identifies the input when a form is submitted.",
            },
          ]}
        />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Notes</Heading>
        <DocsList>
          <li>
            Inside a `Field`, validity, `required`, and the label/description
            wiring come from the field — you rarely need `invalid` there. Use
            `invalid` for standalone inputs.
          </li>
          <li>
            `Field.Control` is the same component as `Input`, so either can be
            used inside a `Field`.
          </li>
          <li>
            `prefix` and `suffix` are ideal for icons, units, and protocol
            hints.
          </li>
          <li>
            `wrapperClassName` and `wrapperRef` target the outer shell for
            advanced layout control.
          </li>
        </DocsList>
      </DocsSection>
    </>
  );
}
