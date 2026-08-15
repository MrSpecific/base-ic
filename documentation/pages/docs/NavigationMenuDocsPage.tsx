import { Heading, Link, NavigationMenu, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import { DocsDemoGrid, DocsList } from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { DemoCard } from "./DemoCard";

export function NavigationMenuDocsPage() {
  const usageSnippet = [
    "import { NavigationMenu } from '@wlcr/base-ic';",
    "",
    "<NavigationMenu>",
    "  <NavigationMenu.List>",
    "    <NavigationMenu.Item>",
    "      <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>",
    "      <NavigationMenu.Content>",
    '        <NavigationMenu.Link href="/products/analytics">Analytics</NavigationMenu.Link>',
    '        <NavigationMenu.Link href="/products/billing">Billing</NavigationMenu.Link>',
    "      </NavigationMenu.Content>",
    "    </NavigationMenu.Item>",
    "    <NavigationMenu.Item>",
    '      <NavigationMenu.Link href="/about">About</NavigationMenu.Link>',
    "    </NavigationMenu.Item>",
    "  </NavigationMenu.List>",
    "</NavigationMenu>",
  ].join("\n");

  const sizeSnippet = [
    '<NavigationMenu size="1">...</NavigationMenu>',
    '<NavigationMenu size="2">...</NavigationMenu>',
    '<NavigationMenu size="3">...</NavigationMenu>',
  ].join("\n");

  const linkGroup = (
    title: string,
    links: Array<{ label: string; description: string }>,
  ) => (
    <div style={{ display: "grid", gap: "var(--space-1)", minWidth: 220 }}>
      <Text
        as="p"
        size="1"
        style={{
          color: "var(--color-text-tertiary)",
          textTransform: "uppercase",
          letterSpacing: "var(--letter-spacing-3)",
          margin: "0 0 var(--space-1) var(--space-3)",
        }}
      >
        {title}
      </Text>
      {links.map((item) => (
        <NavigationMenu.Link key={item.label} href="#">
          <Text as="span" size="2" weight="medium">
            {item.label}
          </Text>
          <Text as="span" size="1" style={{ color: "var(--color-text-tertiary)" }}>
            {item.description}
          </Text>
        </NavigationMenu.Link>
      ))}
    </div>
  );

  return (
    <>
      <DocsSection>
        <Heading as="h1">NavigationMenu</Heading>
        <Text as="p">
          Top-level site navigation with a horizontal row of triggers that reveal
          rich content — links, previews, grouped lists — in a shared floating
          panel that animates between differently-sized content. Built on Base
          UI's NavigationMenu primitives.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h3">Built on Base UI</Heading>
        <Text as="p">
          This component wraps Base UI NavigationMenu primitives. Base primitive
          docs:{" "}
          <Link
            href="https://base-ui.com/react/components/navigation-menu"
            target="_blank"
            rel="noreferrer"
          >
            base-ui.com/react/components/navigation-menu
          </Link>
          .
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Marketing nav"
            description="A top-nav with a mega-menu panel for Products, and plain links for the rest."
            code={usageSnippet}
          >
            <NavigationMenu>
              <NavigationMenu.List>
                <NavigationMenu.Item>
                  <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
                  <NavigationMenu.Content>
                    <div style={{ display: "flex", gap: "var(--space-5)" }}>
                      {linkGroup("Platform", [
                        { label: "Analytics", description: "Track usage and growth." },
                        { label: "Billing", description: "Plans, invoices, and usage." },
                      ])}
                      {linkGroup("Resources", [
                        { label: "Docs", description: "Guides and API reference." },
                        { label: "Changelog", description: "What shipped recently." },
                      ])}
                    </div>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                  <NavigationMenu.Trigger>Solutions</NavigationMenu.Trigger>
                  <NavigationMenu.Content>
                    {linkGroup("By team", [
                      { label: "Engineering", description: "Ship faster with fewer bugs." },
                      { label: "Design", description: "Prototype and hand off." },
                      { label: "Support", description: "Resolve tickets quicker." },
                    ])}
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                  <NavigationMenu.Link href="#about">About</NavigationMenu.Link>
                </NavigationMenu.Item>
              </NavigationMenu.List>
            </NavigationMenu>
          </DemoCard>
          <DemoCard
            title="Sizes"
            description="Scale trigger density with size 1, 2, and 3."
            code={sizeSnippet}
          >
            <div style={{ display: "grid", gap: "var(--space-4)" }}>
              <NavigationMenu size="1">
                <NavigationMenu.List>
                  <NavigationMenu.Item>
                    <NavigationMenu.Trigger>Overview</NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                      {linkGroup("Overview", [
                        { label: "Summary", description: "Size 1 — compact." },
                      ])}
                    </NavigationMenu.Content>
                  </NavigationMenu.Item>
                  <NavigationMenu.Item>
                    <NavigationMenu.Link href="#">Pricing</NavigationMenu.Link>
                  </NavigationMenu.Item>
                </NavigationMenu.List>
              </NavigationMenu>
              <NavigationMenu size="3">
                <NavigationMenu.List>
                  <NavigationMenu.Item>
                    <NavigationMenu.Trigger>Overview</NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                      {linkGroup("Overview", [
                        { label: "Summary", description: "Size 3 — comfortable." },
                      ])}
                    </NavigationMenu.Content>
                  </NavigationMenu.Item>
                  <NavigationMenu.Item>
                    <NavigationMenu.Link href="#">Pricing</NavigationMenu.Link>
                  </NavigationMenu.Item>
                </NavigationMenu.List>
              </NavigationMenu>
            </div>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Usage</Heading>
        <CodeBlock title="NavigationMenu Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Notes</Heading>
        <DocsList>
          <li>
            Use <code>NavigationMenu.Content</code> only for items that need a
            rich panel; plain destinations should use{" "}
            <code>NavigationMenu.Link</code> directly inside{" "}
            <code>NavigationMenu.Item</code> instead of a trigger.
          </li>
          <li>
            The floating panel is positioned and sized by Base UI — it
            cross-fades and resizes automatically as the active item changes.
          </li>
          <li>
            Reserve NavigationMenu for top-level site/marketing navigation; use{" "}
            <code>Menu</code> for dropdown actions and <code>Tabs</code> for
            switching between panels without a floating popup.
          </li>
        </DocsList>
      </DocsSection>
    </>
  );
}
