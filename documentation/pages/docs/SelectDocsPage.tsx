import { Flex, Heading, Select, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import { DocsDemoGrid, DocsDemoRow } from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { DemoCard } from "./DemoCard";

export function SelectDocsPage() {
  const usageSnippet = [
    "import { Select } from 'base-ic';",
    "",
    "<Select placeholder=\"Choose a color\">",
    '  <Select.Item value="red">Red</Select.Item>',
    '  <Select.Item value="green">Green</Select.Item>',
    '  <Select.Item value="blue">Blue</Select.Item>',
    "</Select>",
  ].join("\n");

  const groupsSnippet = [
    "<Select placeholder=\"Select fruit\">",
    '  <Select.Group label="Citrus">',
    '    <Select.Item value="orange">Orange</Select.Item>',
    '    <Select.Item value="lemon">Lemon</Select.Item>',
    "  </Select.Group>",
    "  <Select.Separator />",
    '  <Select.Group label="Berries">',
    '    <Select.Item value="strawberry">Strawberry</Select.Item>',
    '    <Select.Item value="blueberry">Blueberry</Select.Item>',
    "  </Select.Group>",
    "</Select>",
  ].join("\n");

  return (
    <>
      <DocsSection>
        <Heading>Select</Heading>
        <Text as="p">
          A dropdown selector with item grouping, keyboard navigation, and
          animated popup. Built on Base UI's Select primitive.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Basic"
            description="Simple list of options."
            code={usageSnippet}
          >
            <Select placeholder="Choose a color">
              <Select.Item value="red">Red</Select.Item>
              <Select.Item value="green">Green</Select.Item>
              <Select.Item value="blue">Blue</Select.Item>
              <Select.Item value="purple">Purple</Select.Item>
            </Select>
          </DemoCard>
          <DemoCard
            title="Groups & Separator"
            description="Organize items into labeled groups."
            code={groupsSnippet}
          >
            <Select placeholder="Select fruit">
              <Select.Group label="Citrus">
                <Select.Item value="orange">Orange</Select.Item>
                <Select.Item value="lemon">Lemon</Select.Item>
                <Select.Item value="lime">Lime</Select.Item>
              </Select.Group>
              <Select.Separator />
              <Select.Group label="Berries">
                <Select.Item value="strawberry">Strawberry</Select.Item>
                <Select.Item value="blueberry">Blueberry</Select.Item>
                <Select.Item value="raspberry">Raspberry</Select.Item>
              </Select.Group>
            </Select>
          </DemoCard>
          <DemoCard
            title="Sizes"
            description="Four sizes matching the Button and Input scale."
            code={'<Select size="1" placeholder="Size 1">...</Select>\n<Select size="2" placeholder="Size 2">...</Select>\n<Select size="3" placeholder="Size 3">...</Select>'}
          >
            <Flex direction="column" gap={2} style={{ width: "100%" }}>
              {(["1", "2", "3", "4"] as const).map((size) => (
                <Select key={size} size={size} placeholder={`Size ${size}`}>
                  <Select.Item value="a">Option A</Select.Item>
                  <Select.Item value="b">Option B</Select.Item>
                </Select>
              ))}
            </Flex>
          </DemoCard>
          <DemoCard
            title="Disabled Items"
            description="Mark individual items as disabled."
            code={'<Select.Item value="pro" disabled>Pro (unavailable)</Select.Item>'}
          >
            <Select placeholder="Select plan">
              <Select.Item value="free">Free</Select.Item>
              <Select.Item value="starter">Starter</Select.Item>
              <Select.Item value="pro" disabled>Pro (unavailable)</Select.Item>
              <Select.Item value="enterprise">Enterprise</Select.Item>
            </Select>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Usage</Heading>
        <CodeBlock title="Select Usage" code={usageSnippet} />
      </DocsSection>
    </>
  );
}
