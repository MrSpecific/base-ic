import { Heading, Tabs, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import { DocsDemoGrid } from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { DemoCard } from "./DemoCard";

export function TabsDocsPage() {
  const usageSnippet = [
    "import { Tabs } from 'base-ic';",
    "",
    "<Tabs defaultValue=\"account\">",
    "  <Tabs.List>",
    '    <Tabs.Tab value="account">Account</Tabs.Tab>',
    '    <Tabs.Tab value="security">Security</Tabs.Tab>',
    '    <Tabs.Tab value="billing">Billing</Tabs.Tab>',
    "  </Tabs.List>",
    '  <Tabs.Panel value="account">Account settings…</Tabs.Panel>',
    '  <Tabs.Panel value="security">Security settings…</Tabs.Panel>',
    '  <Tabs.Panel value="billing">Billing details…</Tabs.Panel>',
    "</Tabs>",
  ].join("\n");

  const tabContent = (label: string) => (
    <div style={{ padding: "var(--space-3) 0", color: "var(--color-text-secondary)", fontSize: "var(--font-size-2)" }}>
      {label} panel content.
    </div>
  );

  return (
    <>
      <DocsSection>
        <Heading>Tabs</Heading>
        <Text as="p">
          A tabbed interface with keyboard navigation and three visual variants.
          Built on Base UI's Tabs primitives.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Line (default)"
            description="Classic underline indicator."
            code={usageSnippet}
          >
            <Tabs defaultValue="account" style={{ width: "100%" }}>
              <Tabs.List>
                <Tabs.Tab value="account">Account</Tabs.Tab>
                <Tabs.Tab value="security">Security</Tabs.Tab>
                <Tabs.Tab value="billing">Billing</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="account">{tabContent("Account")}</Tabs.Panel>
              <Tabs.Panel value="security">{tabContent("Security")}</Tabs.Panel>
              <Tabs.Panel value="billing">{tabContent("Billing")}</Tabs.Panel>
            </Tabs>
          </DemoCard>
          <DemoCard
            title="Soft"
            description="Pill-style tabs on a sunken background."
            code={'<Tabs variant="soft" defaultValue="a">\n  <Tabs.List>...</Tabs.List>\n</Tabs>'}
          >
            <Tabs variant="soft" defaultValue="overview" style={{ width: "100%" }}>
              <Tabs.List>
                <Tabs.Tab value="overview">Overview</Tabs.Tab>
                <Tabs.Tab value="analytics">Analytics</Tabs.Tab>
                <Tabs.Tab value="reports">Reports</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="overview">{tabContent("Overview")}</Tabs.Panel>
              <Tabs.Panel value="analytics">{tabContent("Analytics")}</Tabs.Panel>
              <Tabs.Panel value="reports">{tabContent("Reports")}</Tabs.Panel>
            </Tabs>
          </DemoCard>
          <DemoCard
            title="Solid"
            description="Active tab fills with accent color."
            code={'<Tabs variant="solid" defaultValue="a">...</Tabs>'}
          >
            <Tabs variant="solid" defaultValue="week" style={{ width: "100%" }}>
              <Tabs.List>
                <Tabs.Tab value="day">Day</Tabs.Tab>
                <Tabs.Tab value="week">Week</Tabs.Tab>
                <Tabs.Tab value="month">Month</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="day">{tabContent("Day")}</Tabs.Panel>
              <Tabs.Panel value="week">{tabContent("Week")}</Tabs.Panel>
              <Tabs.Panel value="month">{tabContent("Month")}</Tabs.Panel>
            </Tabs>
          </DemoCard>
          <DemoCard
            title="Disabled Tab"
            description="Individual tabs can be disabled."
            code={'<Tabs.Tab value="pro" disabled>Pro</Tabs.Tab>'}
          >
            <Tabs defaultValue="free" style={{ width: "100%" }}>
              <Tabs.List>
                <Tabs.Tab value="free">Free</Tabs.Tab>
                <Tabs.Tab value="starter">Starter</Tabs.Tab>
                <Tabs.Tab value="pro" disabled>Pro</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="free">{tabContent("Free tier")}</Tabs.Panel>
              <Tabs.Panel value="starter">{tabContent("Starter tier")}</Tabs.Panel>
              <Tabs.Panel value="pro">{tabContent("Pro tier")}</Tabs.Panel>
            </Tabs>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Usage</Heading>
        <CodeBlock title="Tabs Usage" code={usageSnippet} />
      </DocsSection>
    </>
  );
}
