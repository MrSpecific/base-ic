import { Flex, Switch, Heading, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import { DocsDemoGrid, DocsDemoRow } from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { PropsTable } from "../../components/PropsTable";
import { DemoCard } from "./DemoCard";

export function SwitchDocsPage() {
  const usageSnippet = [
    "import { Switch } from '@wlcr/base-ic';",
    "",
    '<Switch defaultChecked aria-label="Enable notifications" />',
  ].join("\n");

  const sizesSnippet = [
    '<Switch size="1" defaultChecked aria-label="Small" />',
    '<Switch size="2" defaultChecked aria-label="Medium" />',
    '<Switch size="3" defaultChecked aria-label="Large" />',
  ].join("\n");

  return (
    <>
      <DocsSection>
        <Heading>Switch</Heading>
        <Text as="p">
          A toggle control for binary on/off settings. Built on Base UI's Switch
          primitive with a sliding thumb and spring animation.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Sizes"
            description="Three sizes for different layout densities."
            code={sizesSnippet}
          >
            <DocsDemoRow>
              <Switch size="1" defaultChecked aria-label="Small" />
              <Switch size="2" defaultChecked aria-label="Medium" />
              <Switch size="3" defaultChecked aria-label="Large" />
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="States"
            description="On, off, and disabled."
            code={'<Switch defaultChecked aria-label="On" />\n<Switch aria-label="Off" />\n<Switch disabled defaultChecked aria-label="Disabled on" />\n<Switch disabled aria-label="Disabled off" />'}
          >
            <DocsDemoRow>
              <Switch defaultChecked aria-label="On" />
              <Switch aria-label="Off" />
              <Switch disabled defaultChecked aria-label="Disabled on" />
              <Switch disabled aria-label="Disabled off" />
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Colors"
            description="Override the accent color."
            code={'<Switch defaultChecked color="green" />\n<Switch defaultChecked color="red" />'}
          >
            <DocsDemoRow>
              <Switch defaultChecked color="green" aria-label="Green" />
              <Switch defaultChecked color="red" aria-label="Red" />
              <Switch defaultChecked color="orange" aria-label="Orange" />
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="With Label"
            description="Pair with a label for a settings row."
            code={'<Flex justify="between" align="center">\n  <label htmlFor="notif">Email notifications</label>\n  <Switch id="notif" defaultChecked />\n</Flex>'}
          >
            <Flex justify="between" align="center" style={{ width: "100%", maxWidth: 280 }}>
              <label htmlFor="notif-demo" style={{ cursor: "pointer" }}>
                Email notifications
              </label>
              <Switch id="notif-demo" defaultChecked />
            </Flex>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Usage</Heading>
        <CodeBlock title="Switch Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Props</Heading>
        <PropsTable
          rows={[
            {
              name: "size",
              type: "'1' | '2' | '3'",
              default: "'2'",
              description: "Visual size.",
            },
            {
              name: "color",
              type: "AccentColor",
              description: "Override the accent color.",
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
            {
              name: "checked",
              type: "boolean",
              description: "The controlled checked state. Use defaultChecked for uncontrolled usage.",
            },
            {
              name: "defaultChecked",
              type: "boolean",
              default: "false",
              description: "Whether the switch is initially active.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Whether the component should ignore user interaction.",
            },
            {
              name: "onCheckedChange",
              type: "(checked: boolean, eventDetails) => void",
              description: "Called when the switch is activated or deactivated.",
            },
            {
              name: "readOnly",
              type: "boolean",
              default: "false",
              description: "Whether the user should be unable to activate or deactivate the switch.",
            },
            {
              name: "required",
              type: "boolean",
              default: "false",
              description: "Whether the user must activate the switch before submitting a form.",
            },
            {
              name: "name",
              type: "string",
              description: "Identifies the field when a form is submitted.",
            },
            {
              name: "value",
              type: "string",
              description: "The value submitted with the form when the switch is on.",
            },
          ]}
        />
      </DocsSection>
    </>
  );
}
