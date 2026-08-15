import { Heading, Link, NavigationMenu, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import { DocsDemoGrid, DocsList } from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { PropsTable } from "../../components/PropsTable";
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
        <Heading as="h2">Props</Heading>
        <Text as="p">
          <code>NavigationMenu</code> is a compound component:{" "}
          <code>NavigationMenu</code> (root), <code>NavigationMenu.List</code>
          , <code>NavigationMenu.Item</code>,{" "}
          <code>NavigationMenu.Trigger</code>,{" "}
          <code>NavigationMenu.Content</code>, and{" "}
          <code>NavigationMenu.Link</code>.
        </Text>
        <Text as="p" mt="4">
          <code>NavigationMenu</code> (root)
        </Text>
        <PropsTable
          rows={[
            {
              name: "children",
              type: "React.ReactNode",
              required: true,
              description: "NavigationMenu.List and its items.",
            },
            {
              name: "orientation",
              type: "'horizontal' | 'vertical'",
              default: "'horizontal'",
              description: "Orientation of the top-level item list.",
            },
            {
              name: "size",
              type: "'1' | '2' | '3'",
              default: "'2'",
              description: "Size scale for triggers.",
            },
            {
              name: "value",
              type: "any | null",
              description:
                "Value of the item whose content is currently open (controlled usage). Non-nullish opens the menu; nullish closes it.",
            },
            {
              name: "defaultValue",
              type: "any | null",
              default: "null",
              description: "Initial open item value (uncontrolled usage).",
            },
            {
              name: "onValueChange",
              type: "(value, eventDetails: NavigationMenuRoot.ChangeEventDetails) => void",
              description: "Called when the open item value changes.",
            },
            {
              name: "delay",
              type: "number",
              default: "50",
              description: "Milliseconds to wait before opening the popup on trigger hover.",
            },
            {
              name: "closeDelay",
              type: "number",
              default: "50",
              description: "Milliseconds to wait before closing the popup.",
            },
            {
              name: "onOpenChangeComplete",
              type: "(open: boolean) => void",
              description: "Called after any open/close animation finishes.",
            },
            {
              name: "actionsRef",
              type: "React.RefObject<NavigationMenuRoot.Actions | null>",
              description: "Imperative ref exposing `unmount()`.",
            },
            {
              name: "className",
              type: "string",
              description: "CSS class applied to the root element.",
            },
            {
              name: "style",
              type: "React.CSSProperties",
              description: "Inline style applied to the root element.",
            },
          ]}
        />
        <Text as="p" mt="4">
          <code>NavigationMenu.List</code>
        </Text>
        <PropsTable
          rows={[
            {
              name: "children",
              type: "React.ReactNode",
              required: true,
              description: "One or more NavigationMenu.Item elements.",
            },
            {
              name: "className",
              type: "string",
              description: "CSS class applied to the list element.",
            },
          ]}
        />
        <Text as="p" mt="4">
          <code>NavigationMenu.Item</code>
        </Text>
        <PropsTable
          rows={[
            {
              name: "children",
              type: "React.ReactNode",
              required: true,
              description: "A NavigationMenu.Trigger + NavigationMenu.Content pair, or a NavigationMenu.Link.",
            },
            {
              name: "value",
              type: "any",
              description:
                "Unique value identifying this item. Auto-generated if omitted; set explicitly to control the menu programmatically.",
            },
            {
              name: "className",
              type: "string",
              description: "CSS class applied to the item element.",
            },
          ]}
        />
        <Text as="p" mt="4">
          <code>NavigationMenu.Trigger</code>
        </Text>
        <PropsTable
          rows={[
            {
              name: "children",
              type: "React.ReactNode",
              required: true,
              description: "Trigger label content.",
            },
            {
              name: "className",
              type: "string",
              description: "CSS class applied to the trigger element.",
            },
          ]}
        />
        <Text as="p" mt="4">
          <code>NavigationMenu.Content</code>
        </Text>
        <PropsTable
          rows={[
            {
              name: "children",
              type: "React.ReactNode",
              required: true,
              description: "Rich panel content shown in the shared floating popup when this item is active.",
            },
            {
              name: "keepMounted",
              type: "boolean",
              default: "false",
              description:
                "Keeps the content mounted in the DOM while its popup is closed. Useful for SSR/crawlers.",
            },
            {
              name: "className",
              type: "string",
              description: "CSS class applied to the content element.",
            },
          ]}
        />
        <Text as="p" mt="4">
          <code>NavigationMenu.Link</code>
        </Text>
        <PropsTable
          rows={[
            {
              name: "children",
              type: "React.ReactNode",
              required: true,
              description: "Link label content.",
            },
            {
              name: "active",
              type: "boolean",
              default: "false",
              description: "Marks the link as the current page.",
            },
            {
              name: "closeOnClick",
              type: "boolean",
              default: "false",
              description: "Closes the navigation menu when the link is clicked.",
            },
            {
              name: "className",
              type: "string",
              description: "CSS class applied to the link element.",
            },
          ]}
        />
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
