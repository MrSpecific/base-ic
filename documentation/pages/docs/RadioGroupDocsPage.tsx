import { Flex, Heading, Radio, RadioGroup, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import { DocsDemoGrid } from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { PropsTable } from "../../components/PropsTable";
import { DemoCard } from "./DemoCard";

export function RadioGroupDocsPage() {
  const usageSnippet = [
    "import { RadioGroup, Radio } from '@wlcr/base-ic';",
    "",
    "<RadioGroup defaultValue=\"b\">",
    '  <Radio value="a" />',
    '  <Radio value="b" />',
    '  <Radio value="c" />',
    "</RadioGroup>",
  ].join("\n");

  const withLabelsSnippet = [
    "<RadioGroup defaultValue=\"monthly\">",
    '  <Flex gap={2} align="center">',
    '    <Radio value="monthly" id="monthly" />',
    '    <label htmlFor="monthly">Monthly</label>',
    "  </Flex>",
    '  <Flex gap={2} align="center">',
    '    <Radio value="annual" id="annual" />',
    '    <label htmlFor="annual">Annual — save 20%</label>',
    "  </Flex>",
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
              <Flex gap={2} align="center">
                <Radio value="monthly" id="monthly-demo" />
                <label htmlFor="monthly-demo" style={{ cursor: "pointer" }}>Monthly</label>
              </Flex>
              <Flex gap={2} align="center">
                <Radio value="annual" id="annual-demo" />
                <label htmlFor="annual-demo" style={{ cursor: "pointer" }}>Annual — save 20%</label>
              </Flex>
              <Flex gap={2} align="center">
                <Radio value="lifetime" id="lifetime-demo" />
                <label htmlFor="lifetime-demo" style={{ cursor: "pointer" }}>Lifetime</label>
              </Flex>
            </RadioGroup>
          </DemoCard>
          <DemoCard
            title="Horizontal"
            description="Use orientation='horizontal' for inline options."
            code={'<RadioGroup orientation="horizontal" defaultValue="sm">\n  <Radio value="sm" />\n  <Radio value="md" />\n  <Radio value="lg" />\n</RadioGroup>'}
          >
            <RadioGroup orientation="horizontal" defaultValue="md">
              <Flex gap={2} align="center">
                <Radio value="sm" id="size-sm" />
                <label htmlFor="size-sm" style={{ cursor: "pointer" }}>SM</label>
              </Flex>
              <Flex gap={2} align="center">
                <Radio value="md" id="size-md" />
                <label htmlFor="size-md" style={{ cursor: "pointer" }}>MD</label>
              </Flex>
              <Flex gap={2} align="center">
                <Radio value="lg" id="size-lg" />
                <label htmlFor="size-lg" style={{ cursor: "pointer" }}>LG</label>
              </Flex>
            </RadioGroup>
          </DemoCard>
          <DemoCard
            title="Sizes"
            description="Control the control size independently of text."
            code={'<Radio size="1" value="a" />\n<Radio size="2" value="b" />\n<Radio size="3" value="c" />'}
          >
            <RadioGroup defaultValue="b2">
              <Flex gap={2} align="center">
                <Radio value="a2" size="1" id="sz1" />
                <label htmlFor="sz1" style={{ cursor: "pointer" }}>Size 1</label>
              </Flex>
              <Flex gap={2} align="center">
                <Radio value="b2" size="2" id="sz2" />
                <label htmlFor="sz2" style={{ cursor: "pointer" }}>Size 2</label>
              </Flex>
              <Flex gap={2} align="center">
                <Radio value="c2" size="3" id="sz3" />
                <label htmlFor="sz3" style={{ cursor: "pointer" }}>Size 3</label>
              </Flex>
            </RadioGroup>
          </DemoCard>
          <DemoCard
            title="Colors"
            description="Override accent color per Radio."
            code={'<RadioGroup defaultValue="g">\n  <Radio color="green" value="g" />\n  <Radio color="red" value="r" />\n</RadioGroup>'}
          >
            <RadioGroup defaultValue="gv">
              <Flex gap={2} align="center">
                <Radio value="gv" color="green" id="c-green" />
                <label htmlFor="c-green" style={{ cursor: "pointer" }}>Green</label>
              </Flex>
              <Flex gap={2} align="center">
                <Radio value="rv" color="red" id="c-red" />
                <label htmlFor="c-red" style={{ cursor: "pointer" }}>Red</label>
              </Flex>
              <Flex gap={2} align="center">
                <Radio value="ov" color="orange" id="c-orange" />
                <label htmlFor="c-orange" style={{ cursor: "pointer" }}>Orange</label>
              </Flex>
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
              description: "The value this radio represents.",
            },
            {
              name: "size",
              type: "'1' | '2' | '3'",
              default: "'2'",
              description: "Visual size.",
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
