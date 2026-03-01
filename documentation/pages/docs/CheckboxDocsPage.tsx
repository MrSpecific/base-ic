import { Checkbox, Flex, Heading, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import { DocsDemoGrid, DocsDemoRow } from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { DemoCard } from "./DemoCard";

export function CheckboxDocsPage() {
  const usageSnippet = [
    "import { Checkbox } from 'base-ic';",
    "",
    '<Checkbox defaultChecked aria-label="Accept terms" />',
  ].join("\n");

  const sizesSnippet = [
    '<Checkbox size="1" defaultChecked aria-label="Small" />',
    '<Checkbox size="2" defaultChecked aria-label="Medium" />',
    '<Checkbox size="3" defaultChecked aria-label="Large" />',
  ].join("\n");

  const statesSnippet = [
    '<Checkbox defaultChecked aria-label="Checked" />',
    '<Checkbox aria-label="Unchecked" />',
    '<Checkbox indeterminate aria-label="Indeterminate" />',
    '<Checkbox disabled defaultChecked aria-label="Disabled checked" />',
  ].join("\n");

  return (
    <>
      <DocsSection>
        <Heading>Checkbox</Heading>
        <Text as="p">
          An accessible checkbox with checked, unchecked, and indeterminate
          states. Built on Base UI's Checkbox primitive.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Sizes"
            description="Three sizes to match surrounding content density."
            code={sizesSnippet}
          >
            <DocsDemoRow>
              <Checkbox size="1" defaultChecked aria-label="Small" />
              <Checkbox size="2" defaultChecked aria-label="Medium" />
              <Checkbox size="3" defaultChecked aria-label="Large" />
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="States"
            description="Checked, unchecked, indeterminate, and disabled."
            code={statesSnippet}
          >
            <DocsDemoRow>
              <Checkbox defaultChecked aria-label="Checked" />
              <Checkbox aria-label="Unchecked" />
              <Checkbox indeterminate aria-label="Indeterminate" />
              <Checkbox disabled defaultChecked aria-label="Disabled" />
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Colors"
            description="Override the accent color per instance."
            code={'<Checkbox defaultChecked color="green" />\n<Checkbox defaultChecked color="red" />\n<Checkbox defaultChecked color="orange" />'}
          >
            <DocsDemoRow>
              <Checkbox defaultChecked color="green" aria-label="Green" />
              <Checkbox defaultChecked color="red" aria-label="Red" />
              <Checkbox defaultChecked color="orange" aria-label="Orange" />
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="With Label"
            description="Pair with a label using a flex layout."
            code={'<Flex gap={2} align="center">\n  <Checkbox id="terms" defaultChecked />\n  <label htmlFor="terms">Accept terms</label>\n</Flex>'}
          >
            <Flex gap={2} align="center">
              <Checkbox id="terms-demo" defaultChecked />
              <label htmlFor="terms-demo" style={{ cursor: "pointer" }}>
                Accept terms and conditions
              </label>
            </Flex>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Usage</Heading>
        <CodeBlock title="Checkbox Usage" code={usageSnippet} />
      </DocsSection>
    </>
  );
}
