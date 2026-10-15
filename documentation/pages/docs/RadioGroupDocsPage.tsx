import { Heading, Radio, RadioGroup, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import { DocsDemoGrid } from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { PropsTable } from "../../components/PropsTable";
import { DemoCard } from "./DemoCard";

export function RadioGroupDocsPage() {
  const usageSnippet = [
    "import { RadioGroup, Radio } from '@wlcr/base-ic';",
    "",
    "// Children become the radio's label (wrapped in a native <label>).",
    "<RadioGroup defaultValue=\"b\">",
    '  <Radio value="a">Option A</Radio>',
    '  <Radio value="b">Option B</Radio>',
    '  <Radio value="c">Option C</Radio>',
    "</RadioGroup>",
  ].join("\n");

  const withLabelsSnippet = [
    "<RadioGroup defaultValue=\"monthly\">",
    '  <Radio value="monthly">Monthly</Radio>',
    '  <Radio value="annual">Annual — save 20%</Radio>',
    "</RadioGroup>",
  ].join("\n");

  return (
    <>
      <DocsSection>
        <Heading>RadioGroup</Heading>
        <Text as="p">
          A group of mutually exclusive options. Built on Base UI's RadioGroup
          and Radio primitives with keyboard navigation and ARIA roles.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Vertical (default)"
            description="Standard stacked layout for forms."
            code={withLabelsSnippet}
          >
            <RadioGroup defaultValue="monthly">
              <Radio value="monthly">Monthly</Radio>
              <Radio value="annual">Annual — save 20%</Radio>
              <Radio value="lifetime">Lifetime</Radio>
            </RadioGroup>
          </DemoCard>
          <DemoCard
            title="Horizontal"
            description="Use orientation='horizontal' for inline options."
            code={[
              '<RadioGroup orientation="horizontal" defaultValue="md">',
              '  <Radio value="sm">SM</Radio>',
              '  <Radio value="md">MD</Radio>',
              '  <Radio value="lg">LG</Radio>',
              '</RadioGroup>',
            ].join("\n")}
          >
            <RadioGroup orientation="horizontal" defaultValue="md">
              <Radio value="sm">SM</Radio>
              <Radio value="md">MD</Radio>
              <Radio value="lg">LG</Radio>
            </RadioGroup>
          </DemoCard>
          <DemoCard
            title="Sizes"
            description="Control the control size independently of text."
            code={[
              '<RadioGroup defaultValue="b">',
              '  <Radio value="a" size="1">Size 1</Radio>',
              '  <Radio value="b" size="2">Size 2</Radio>',
              '  <Radio value="c" size="3">Size 3</Radio>',
              '</RadioGroup>',
            ].join("\n")}
          >
            <RadioGroup defaultValue="b2">
              <Radio value="a2" size="1">Size 1</Radio>
              <Radio value="b2" size="2">Size 2</Radio>
              <Radio value="c2" size="3">Size 3</Radio>
            </RadioGroup>
          </DemoCard>
          <DemoCard
            title="Colors"
            description="Override accent color per Radio."
            code={[
              '<RadioGroup defaultValue="green">',
              '  <Radio value="green" color="green">Green</Radio>',
              '  <Radio value="red" color="red">Red</Radio>',
              '</RadioGroup>',
            ].join("\n")}
          >
            <RadioGroup defaultValue="gv">
              <Radio value="gv" color="green">Green</Radio>
              <Radio value="rv" color="red">Red</Radio>
              <Radio value="ov" color="orange">Orange</Radio>
            </RadioGroup>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Usage</Heading>
        <CodeBlock title="RadioGroup Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Props</Heading>
        <h3>RadioGroup Props</h3>
        <PropsTable
          rows={[
            {
              name: "orientation",
              type: "'horizontal' | 'vertical'",
              default: "'vertical'",
              description: "Layout direction of the radio items.",
            },
            {
              name: "value",
              type: "Value",
              description:
                "The controlled value of the radio item that should be currently selected.",
            },
            {
              name: "defaultValue",
              type: "Value",
              description: "The uncontrolled value of the radio button initially selected.",
            },
            {
              name: "onValueChange",
              type: "(value: Value, eventDetails) => void",
              description: "Called when the selected value changes.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Whether the component should ignore user interaction.",
            },
            {
              name: "readOnly",
              type: "boolean",
              default: "false",
              description: "Whether the user should be unable to select a different radio button.",
            },
            {
              name: "required",
              type: "boolean",
              default: "false",
              description: "Whether the user must choose a value before submitting a form.",
            },
            {
              name: "name",
              type: "string",
              description: "Identifies the field when a form is submitted.",
            },
            {
              name: "className",
              type: "string",
              description: "Custom className.",
            },
            {
              name: "style",
              type: "React.CSSProperties",
              description: "Custom style.",
            },
            {
              name: "children",
              type: "React.ReactNode",
              required: true,
              description: "The Radio items to render.",
            },
          ]}
        />
        <h3>Radio Props</h3>
        <PropsTable
          rows={[
            {
              name: "value",
              type: "string",
              required: true,
              description:
                "The value this radio represents.",
            },
            {
              name: "size",
              type: "'1' | '2' | '3'",
              default: "'2'",
              description: "Visual size.",
            },
            {
              name: "children",
              type: "ReactNode",
              description: "Label text shown next to the radio. Wraps both in a native `<label>`, so clicking the text selects it and names it for assistive tech.",
            },
            {
              name: "color",
              type: "AccentColor",
              description: "Override the accent color for this radio.",
            },
            {
              name: "disabled",
              type: "boolean",
              description: "Whether the component should ignore user interaction.",
            },
            {
              name: "required",
              type: "boolean",
              description: "Whether the user must choose a value before submitting a form.",
            },
            {
              name: "readOnly",
              type: "boolean",
              description: "Whether the user should be unable to select the radio button.",
            },
            {
              name: "id",
              type: "string",
              description:
                "Id forwarded to the radio's hidden input, so `<label htmlFor={id}>` clicks and names the radio.",
            },
            {
              name: "render",
              type: "React.ReactElement",
              description: "Base UI render prop for swapping the underlying element.",
            },
            {
              name: "className",
              type: "string",
              description: "Custom className.",
            },
            {
              name: "style",
              type: "React.CSSProperties",
              description: "Custom style.",
            },
          ]}
        />
      </DocsSection>
    </>
  );
}
