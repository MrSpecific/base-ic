import { Heading, Link, Tabs, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import { DocsDemoGrid, DocsList } from "../../components/DocsPrimitives";
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

  const sizeSnippet = [
    '<Tabs size="1" defaultValue="a">...</Tabs>',
    '<Tabs size="2" defaultValue="a">...</Tabs>',
    '<Tabs size="3" defaultValue="a">...</Tabs>',
  ].join("\n");

  const tabContent = (label: string) => (
    <div style={{ padding: "var(--space-3) 0", color: "var(--color-text-secondary)", fontSize: "var(--font-size-2)" }}>
      {label} panel content.
    </div>
  );

  return (
    <>
      <DocsSection>
        <Heading as="h1">Tabs</Heading>
        <Text as="p">
          A tabbed interface with keyboard navigation and three visual variants.
          Built on Base UI's Tabs primitives.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h3">Built On Base-UI</Heading>
        <Text as="p">
          This component wraps Base UI Tabs primitives. Base primitive docs:{" "}
          <Link
            href="https://base-ui.com/react/components/tabs"
            target="_blank"
            rel="noreferrer"
          >
            base-ui.com/react/components/tabs
          </Link>
          .
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
            title="Sizes"
            description="Scale tab density with size 1, 2, and 3."
            code={sizeSnippet}
          >
            <div style={{ display: "grid", gap: "var(--space-3)", width: "100%" }}>
              <Tabs size="1" defaultValue="a" style={{ width: "100%" }}>
                <Tabs.List>
                  <Tabs.Tab value="a">Small</Tabs.Tab>
                  <Tabs.Tab value="b">Compact</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="a">{tabContent("Size 1")}</Tabs.Panel>
                <Tabs.Panel value="b">{tabContent("Size 1 compact")}</Tabs.Panel>
              </Tabs>
              <Tabs size="2" defaultValue="a" style={{ width: "100%" }}>
                <Tabs.List>
                  <Tabs.Tab value="a">Medium</Tabs.Tab>
                  <Tabs.Tab value="b">Default</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="a">{tabContent("Size 2")}</Tabs.Panel>
                <Tabs.Panel value="b">{tabContent("Size 2 default")}</Tabs.Panel>
              </Tabs>
              <Tabs size="3" defaultValue="a" style={{ width: "100%" }}>
                <Tabs.List>
                  <Tabs.Tab value="a">Large</Tabs.Tab>
                  <Tabs.Tab value="b">Comfortable</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="a">{tabContent("Size 3")}</Tabs.Panel>
                <Tabs.Panel value="b">{tabContent("Size 3 comfortable")}</Tabs.Panel>
              </Tabs>
            </div>
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
      <DocsSection>
        <Heading as="h2">Notes</Heading>
        <DocsList>
          <li>
            Keep tab labels short and parallel so users can scan quickly.
          </li>
          <li>
            Use tabs for peers; use accordion/sections for hierarchical content.
          </li>
          <li>Set a sensible `defaultValue` so the initial panel is explicit.</li>
        </DocsList>
      </DocsSection>
    </>
  );
}
