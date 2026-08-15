import { Field, Fieldset, Heading, Input, Link, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import { DocsDemoGrid, DocsList } from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { PropsTable } from "../../components/PropsTable";
import { DemoCard } from "./DemoCard";

export function FieldsetDocsPage() {
  const usageSnippet = [
    "import { Fieldset, Field, Input } from '@wlcr/base-ic';",
    "",
    "<Fieldset legend=\"Shipping address\">",
    "  <Field label=\"Street address\">",
    "    <Input placeholder=\"123 Main St\" />",
    "  </Field>",
    "  <Field label=\"City\">",
    "    <Input placeholder=\"Springfield\" />",
    "  </Field>",
    "  <Field label=\"Postal code\">",
    "    <Input placeholder=\"12345\" />",
    "  </Field>",
    "</Fieldset>",
  ].join("\n");

  const borderedSnippet = [
    "<Fieldset legend=\"Payment details\" variant=\"bordered\">",
    "  <Field label=\"Card number\">",
    "    <Input placeholder=\"4242 4242 4242 4242\" />",
    "  </Field>",
    "  <Field label=\"Expiry\">",
    "    <Input placeholder=\"MM/YY\" />",
    "  </Field>",
    "</Fieldset>",
  ].join("\n");

  const disabledSnippet = [
    "<Fieldset legend=\"Billing address\" disabled>",
    "  <Field label=\"Street address\">",
    "    <Input placeholder=\"Same as shipping\" />",
    "  </Field>",
    "</Fieldset>",
  ].join("\n");

  const compoundSnippet = [
    "// Use Fieldset.Legend directly for full control",
    "<Fieldset>",
    "  <Fieldset.Legend>Shipping address</Fieldset.Legend>",
    "  <Field label=\"Street address\">",
    "    <Input placeholder=\"123 Main St\" />",
    "  </Field>",
    "</Fieldset>",
  ].join("\n");

  return (
    <>
      <DocsSection>
        <Heading as="h1">Fieldset</Heading>
        <Text as="p">
          Groups a set of related form controls — typically several Field
          components — under a shared, accessible legend. It&apos;s the
          native <code>&lt;fieldset&gt;</code>/<code>&lt;legend&gt;</code>{" "}
          pair, done accessibly via Base UI.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading>Built on Base UI</Heading>
        <Text as="p">
          This component wraps the Base UI Fieldset primitive. Base primitive
          docs:{" "}
          <Link
            href="https://base-ui.com/react/components/fieldset"
            target="_blank"
            rel="noreferrer"
          >
            base-ui.com/react/components/fieldset
          </Link>
          .
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading>Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Basic usage"
            description="Group related Field components under a shared legend."
            code={usageSnippet}
          >
            <Fieldset legend="Shipping address" style={{ maxWidth: 320 }}>
              <Field label="Street address">
                <Input placeholder="123 Main St" />
              </Field>
              <Field label="City">
                <Input placeholder="Springfield" />
              </Field>
              <Field label="Postal code">
                <Input placeholder="12345" />
              </Field>
            </Fieldset>
          </DemoCard>
          <DemoCard
            title="Bordered variant"
            description={'Opt into a visible panel around the group with variant="bordered".'}
            code={borderedSnippet}
          >
            <Fieldset
              legend="Payment details"
              variant="bordered"
              style={{ maxWidth: 320 }}
            >
              <Field label="Card number">
                <Input placeholder="4242 4242 4242 4242" />
              </Field>
              <Field label="Expiry">
                <Input placeholder="MM/YY" />
              </Field>
            </Fieldset>
          </DemoCard>
          <DemoCard
            title="Disabled"
            description="Disabling a Fieldset disables all controls it groups."
            code={disabledSnippet}
          >
            <Fieldset
              legend="Billing address"
              disabled
              style={{ maxWidth: 320 }}
            >
              <Field label="Street address">
                <Input placeholder="Same as shipping" />
              </Field>
            </Fieldset>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading>Usage</Heading>
        <CodeBlock title="Fieldset Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Props</Heading>
        <Text as="p">
          <code>Fieldset</code> (root)
        </Text>
        <PropsTable
          rows={[
            {
              name: "legend",
              type: "React.ReactNode",
              description: "Convenience prop: renders a Fieldset.Legend above the children.",
            },
            {
              name: "variant",
              type: "'plain' | 'bordered'",
              default: "'plain'",
              description:
                "'plain' resets the native fieldset border/padding so it composes invisibly as a grouping element. 'bordered' keeps a visible panel around the group.",
            },
            {
              name: "children",
              type: "React.ReactNode",
              required: true,
              description: "Form controls (typically Field components) to group together.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Whether the component should ignore user interaction (propagates to nested controls).",
            },
            {
              name: "name",
              type: "string",
              description: "Identifies the fieldset when a form is submitted (native attribute).",
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
          <code>Fieldset.Legend</code>
        </Text>
        <PropsTable
          rows={[
            {
              name: "children",
              type: "React.ReactNode",
              description: "Legend content.",
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
          Use Fieldset.Legend directly for full layout control.
        </Text>
        <CodeBlock title="Compound API" code={compoundSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading>Notes</Heading>
        <DocsList>
          <li>
            The <code>legend</code> prop renders a{" "}
            <code>Fieldset.Legend</code> above the children automatically.
          </li>
          <li>
            Defaults to a borderless, invisible grouping element (
            <code>variant=&quot;plain&quot;</code>); pass{" "}
            <code>variant=&quot;bordered&quot;</code> for a visible panel.
          </li>
          <li>
            <code>disabled</code> propagates to every control nested inside
            the fieldset.
          </li>
          <li>
            Each control inside a Fieldset is typically itself wrapped in a{" "}
            <code>Field</code> for label/description/error wiring.
          </li>
        </DocsList>
      </DocsSection>
    </>
  );
}
