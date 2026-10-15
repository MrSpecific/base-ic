import { Field, Flex, Heading, Link, Textarea, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import { DocsDemoGrid, DocsList } from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { PropsTable } from "../../components/PropsTable";
import { DemoCard } from "./DemoCard";

export function TextareaDocsPage() {
  const usageSnippet = [
    "import { Textarea } from '@wlcr/base-ic';",
    "",
    '<Textarea placeholder="Enter your message…" rows={4} />',
  ].join("\n");

  const variantsSnippet = [
    '<Textarea variant="surface" placeholder="Surface" />',
    '<Textarea variant="outline" placeholder="Outline" />',
    '<Textarea variant="ghost" placeholder="Ghost" />',
  ].join("\n");

  const sizesSnippet = [
    '<Textarea size="1" placeholder="Size 1" />',
    '<Textarea size="2" placeholder="Size 2" />',
    '<Textarea size="3" placeholder="Size 3" />',
    '<Textarea size="4" placeholder="Size 4" />',
  ].join("\n");

  const radiusSnippet = [
    '<Textarea radius="small" placeholder="Small radius" />',
    '<Textarea radius="medium" placeholder="Medium radius" />',
    '<Textarea radius="large" placeholder="Large radius" />',
    '<Textarea radius="full" placeholder="Full radius" />',
  ].join("\n");

  const stateSnippet = [
    '<Textarea disabled placeholder="Disabled" />',
    '<Textarea invalid placeholder="Validation error" />',
    '<Textarea noResize placeholder="No resize" />',
  ].join("\n");

  const fieldSnippet = [
    "import { Field, Textarea } from '@wlcr/base-ic';",
    "",
    "<Field",
    "  label=\"Message\"",
    "  description=\"Up to 200 characters\"",
    "  required",
    "  validationMode=\"onBlur\"",
    ">",
    "  <Textarea rows={3} maxLength={200} />",
    "</Field>",
  ].join("\n");

  return (
    <>
      <DocsSection>
        <Heading as="h1">Textarea</Heading>
        <Text as="p">
          A multiline text input with the same size, variant, and radius API as{" "}
          <code>Input</code>. Renders a native <code>&lt;textarea&gt;</code>{" "}
          that wires itself into an enclosing <code>Field</code>.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h3">Built On Base UI</Heading>
        <Text as="p">
          `Textarea` renders the Base UI `Field.Control` primitive as a native{" "}
          {"`<textarea>`"}, so it keeps native multiline editing and form
          submission while being Field-aware: inside a `Field` it picks up the
          label, description, and error ids, takes part in validation, and
          exposes state attributes such as `data-invalid`, `data-touched`, and
          `data-dirty`. Base primitive docs:{" "}
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
            title="Variants"
            description="Surface, outline, and ghost visual styles."
            code={variantsSnippet}
          >
            <Flex direction="column" gap={2} style={{ width: "100%" }}>
              <Textarea variant="surface" placeholder="Surface" rows={3} />
              <Textarea variant="outline" placeholder="Outline" rows={3} />
              <Textarea variant="ghost" placeholder="Ghost" rows={3} />
            </Flex>
          </DemoCard>
          <DemoCard
            title="Sizes"
            description="Four sizes matching Input and Button."
            code={sizesSnippet}
          >
            <Flex direction="column" gap={2} style={{ width: "100%" }}>
              <Textarea size="1" placeholder="Size 1" rows={2} />
              <Textarea size="2" placeholder="Size 2" rows={2} />
              <Textarea size="3" placeholder="Size 3" rows={2} />
              <Textarea size="4" placeholder="Size 4" rows={2} />
            </Flex>
          </DemoCard>
          <DemoCard
            title="Radius"
            description="Override corner radius for looser or denser UI treatments."
            code={radiusSnippet}
          >
            <Flex direction="column" gap={2} style={{ width: "100%" }}>
              <Textarea radius="small" placeholder="Small radius" rows={2} />
              <Textarea radius="medium" placeholder="Medium radius" rows={2} />
              <Textarea radius="large" placeholder="Large radius" rows={2} />
              <Textarea radius="full" placeholder="Full radius" rows={2} />
            </Flex>
          </DemoCard>
          <DemoCard
            title="States"
            description="Disabled, invalid, and no-resize."
            code={stateSnippet}
          >
            <Flex direction="column" gap={2} style={{ width: "100%" }}>
              <Textarea disabled placeholder="Disabled" rows={2} />
              <Textarea invalid placeholder="Validation error" rows={2} defaultValue="invalid content" />
              <Textarea noResize placeholder="Resize is disabled" rows={2} />
            </Flex>
          </DemoCard>
          <DemoCard
            title="Inside a Field"
            description="`<Field required>` makes the Textarea natively required; the native message shows once the field is invalid (here, on blur)."
            code={fieldSnippet}
          >
            <Field
              label="Message"
              description="Up to 200 characters"
              required
              validationMode="onBlur"
              style={{ width: "100%" }}
            >
              <Textarea rows={3} maxLength={200} />
            </Field>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Usage</Heading>
        <CodeBlock title="Textarea Usage" code={usageSnippet} />
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
              description: "Visual variant.",
            },
            {
              name: "radius",
              type: "'none' | 'small' | 'medium' | 'large' | 'full'",
              description: "Override the border-radius.",
            },
            {
              name: "noResize",
              type: "boolean",
              description: "Disable the resize handle.",
            },
            {
              name: "invalid",
              type: "boolean",
              description:
                "Marks the textarea as having a validation error (sets `aria-invalid`). Inside a `Field`, the field's validity is reflected automatically via `data-invalid`, so this is mainly for standalone use.",
            },
            {
              name: "disabled",
              type: "boolean",
              description: "Disables the textarea (native HTML attribute).",
            },
            {
              name: "wrapperRef",
              type: "React.Ref<HTMLDivElement>",
              description: "Ref for the wrapper div (use a standard ref for the textarea element itself).",
            },
            {
              name: "wrapperClassName",
              type: "string",
              description: "CSS class for the outer wrapper div.",
            },
            {
              name: "placeholder",
              type: "string",
              description: "Placeholder shown in the textarea when empty.",
            },
            {
              name: "rows",
              type: "number",
              description: "Number of visible text lines (native HTML attribute).",
            },
            {
              name: "value",
              type: "string",
              description: "Controlled value of the textarea.",
            },
            {
              name: "defaultValue",
              type: "string",
              description: "Uncontrolled initial value of the textarea.",
            },
            {
              name: "onChange",
              type: "React.ChangeEventHandler<HTMLTextAreaElement>",
              description: "Called when the textarea's value changes (native HTML event).",
            },
            {
              name: "onValueChange",
              type: "(value: string, eventDetails) => void",
              description:
                "Called with the new string value when it changes (Base UI). Convenient for controlled textareas.",
            },
            {
              name: "required",
              type: "boolean",
              description:
                "Whether the user must enter a value before submitting a form. Inherited from an enclosing `<Field required>` unless set here.",
            },
            {
              name: "readOnly",
              type: "boolean",
              description: "Whether the user should be unable to change the value.",
            },
            {
              name: "maxLength",
              type: "number",
              description: "Maximum number of characters allowed (native HTML attribute).",
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
          <li>Use `rows` to define starting height per form context.</li>
          <li>
            Set `noResize` when fixed layouts would break from user resize.
          </li>
          <li>
            Put helper copy in a wrapping `Field`'s `description` so it is
            announced with the textarea and the textarea stays focused on
            content entry.
          </li>
        </DocsList>
      </DocsSection>
    </>
  );
}
