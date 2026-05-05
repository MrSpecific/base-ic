import { Flex, Heading, Link, Select, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import { DocsDemoGrid, DocsList } from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { DemoCard } from "./DemoCard";

export function SelectDocsPage() {
  const usageSnippet = [
    "import { Select } from '@wlcr/base-ic';",
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

  const positioningSnippet = [
    '<Select placeholder="Bottom / Start" side="bottom" align="start" sideOffset={4}>',
    '  <Select.Item value="a">Option A</Select.Item>',
    "  <Select.Item value=\"b\">Option B</Select.Item>",
    "</Select>",
    "",
    '<Select placeholder="Top / End" side="top" align="end" sideOffset={10}>',
    '  <Select.Item value="a">Option A</Select.Item>',
    '  <Select.Item value="b">Option B</Select.Item>',
    "</Select>",
  ].join("\n");

  const radiusSnippet = [
    '<Select radius="small" placeholder="Small radius">...</Select>',
    '<Select radius="medium" placeholder="Medium radius">...</Select>',
    '<Select radius="large" placeholder="Large radius">...</Select>',
    '<Select radius="full" placeholder="Full radius">...</Select>',
  ].join("\n");

  return (
    <>
      <DocsSection>
        <Heading as="h1">Select</Heading>
        <Text as="p">
          A dropdown selector with item grouping, keyboard navigation, and
          animated popup. Built on Base UI's Select primitive.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h3">Built On Base-UI</Heading>
        <Text as="p">
          This component wraps the Base UI Select primitive. Base primitive
          docs:{" "}
          <Link
            href="https://base-ui.com/react/components/select"
            target="_blank"
            rel="noreferrer"
          >
            base-ui.com/react/components/select
          </Link>
          .
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
            title="Positioning"
            description="Control popup side, alignment, and offset near constrained layouts."
            code={positioningSnippet}
          >
            <Flex direction="column" gap={2} style={{ width: "100%" }}>
              <Select
                placeholder="Bottom / Start"
                side="bottom"
                align="start"
                sideOffset={4}
              >
                <Select.Item value="a">Option A</Select.Item>
                <Select.Item value="b">Option B</Select.Item>
              </Select>
              <Select
                placeholder="Top / End"
                side="top"
                align="end"
                sideOffset={10}
              >
                <Select.Item value="a">Option A</Select.Item>
                <Select.Item value="b">Option B</Select.Item>
              </Select>
            </Flex>
          </DemoCard>
          <DemoCard
            title="Radius"
            description="Match select corners to surrounding UI density."
            code={radiusSnippet}
          >
            <Flex direction="column" gap={2} style={{ width: "100%" }}>
              <Select radius="small" placeholder="Small radius">
                <Select.Item value="a">Option A</Select.Item>
                <Select.Item value="b">Option B</Select.Item>
              </Select>
              <Select radius="medium" placeholder="Medium radius">
                <Select.Item value="a">Option A</Select.Item>
                <Select.Item value="b">Option B</Select.Item>
              </Select>
              <Select radius="large" placeholder="Large radius">
                <Select.Item value="a">Option A</Select.Item>
                <Select.Item value="b">Option B</Select.Item>
              </Select>
              <Select radius="full" placeholder="Full radius">
                <Select.Item value="a">Option A</Select.Item>
                <Select.Item value="b">Option B</Select.Item>
              </Select>
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
      <DocsSection>
        <Heading as="h2">Notes</Heading>
        <DocsList>
          <li>Use `Select.Group` and `Select.Separator` for long option sets.</li>
          <li>
            Prefer concise trigger labels; long labels can reduce scan speed.
          </li>
          <li>`Select.Item` supports `disabled` for unavailable choices.</li>
        </DocsList>
      </DocsSection>
    </>
  );
}
