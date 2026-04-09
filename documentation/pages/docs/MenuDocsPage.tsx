import { Button, Heading, Link, Menu, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import {
  DocsDemoGrid,
  DocsDemoRow,
  DocsList,
} from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { DemoCard } from "./DemoCard";

export function MenuDocsPage() {
  const usageSnippet = [
    "import { Button, Menu } from 'base-ic';",
    "",
    "<Menu trigger={<Button>Options</Button>}>",
    "  <Menu.Item>Edit</Menu.Item>",
    "  <Menu.Item>Duplicate</Menu.Item>",
    "  <Menu.Separator />",
    "  <Menu.Item>Delete</Menu.Item>",
    "</Menu>",
  ].join("\n");

  const groupsSnippet = [
    "<Menu trigger={<Button>Account</Button>}>",
    "  <Menu.Group label=\"User\">",
    "    <Menu.Item>Profile</Menu.Item>",
    "    <Menu.Item>Settings</Menu.Item>",
    "  </Menu.Group>",
    "  <Menu.Separator />",
    "  <Menu.Item>Sign out</Menu.Item>",
    "</Menu>",
  ].join("\n");

  const checkboxSnippet = [
    "<Menu trigger={<Button>View</Button>}>",
    "  <Menu.CheckboxItem defaultChecked>Show grid</Menu.CheckboxItem>",
    "  <Menu.CheckboxItem>Show rulers</Menu.CheckboxItem>",
    "</Menu>",
  ].join("\n");

  const radioSnippet = [
    "<Menu trigger={<Button>Sort by</Button>}>",
    '  <Menu.RadioGroup defaultValue="name">',
    '    <Menu.RadioItem value="name">Name</Menu.RadioItem>',
    '    <Menu.RadioItem value="date">Date modified</Menu.RadioItem>',
    '    <Menu.RadioItem value="size">Size</Menu.RadioItem>',
    "  </Menu.RadioGroup>",
    "</Menu>",
  ].join("\n");

  const submenuSnippet = [
    "<Menu trigger={<Button>More actions</Button>}>",
    "  <Menu.Item>Cut</Menu.Item>",
    '  <Menu.Sub trigger="Share\u2026">',
    "    <Menu.Item>Copy link</Menu.Item>",
    "    <Menu.Item>Send via email</Menu.Item>",
    "  </Menu.Sub>",
    "  <Menu.Separator />",
    "  <Menu.Item>Delete</Menu.Item>",
    "</Menu>",
  ].join("\n");

  return (
    <>
      <DocsSection>
        <Heading as="h1">Menu</Heading>
        <Text as="p">
          A dropdown menu with items, checkbox items, radio groups, submenus,
          and group labels. Built on Base UI Menu with proper keyboard
          navigation and ARIA roles.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading>Built On Base UI</Heading>
        <Text as="p">
          This component wraps the Base UI Menu primitive. Base primitive docs:{" "}
          <Link
            href="https://base-ui.com/react/components/menu"
            target="_blank"
            rel="noreferrer"
          >
            base-ui.com/react/components/menu
          </Link>
          .
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading>Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Basic menu"
            description="Pass a trigger element and menu items as children."
            code={usageSnippet}
          >
            <DocsDemoRow>
              <Menu trigger={<Button>Options</Button>}>
                <Menu.Item>Edit</Menu.Item>
                <Menu.Item>Duplicate</Menu.Item>
                <Menu.Separator />
                <Menu.Item>Delete</Menu.Item>
              </Menu>
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Groups with labels"
            description="Use Menu.Group to organize items under a label."
            code={groupsSnippet}
          >
            <DocsDemoRow>
              <Menu trigger={<Button>Account</Button>}>
                <Menu.Group label="User">
                  <Menu.Item>Profile</Menu.Item>
                  <Menu.Item>Settings</Menu.Item>
                </Menu.Group>
                <Menu.Separator />
                <Menu.Item>Sign out</Menu.Item>
              </Menu>
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Checkbox items"
            description="Toggle persistent state with Menu.CheckboxItem."
            code={checkboxSnippet}
          >
            <DocsDemoRow>
              <Menu trigger={<Button>View</Button>}>
                <Menu.CheckboxItem defaultChecked>Show grid</Menu.CheckboxItem>
                <Menu.CheckboxItem>Show rulers</Menu.CheckboxItem>
                <Menu.CheckboxItem defaultChecked>Snap to guides</Menu.CheckboxItem>
              </Menu>
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Radio group"
            description="Mutually exclusive selection with Menu.RadioGroup."
            code={radioSnippet}
          >
            <DocsDemoRow>
              <Menu trigger={<Button variant="outline">Sort by</Button>}>
                <Menu.RadioGroup defaultValue="name">
                  <Menu.RadioItem value="name">Name</Menu.RadioItem>
                  <Menu.RadioItem value="date">Date modified</Menu.RadioItem>
                  <Menu.RadioItem value="size">Size</Menu.RadioItem>
                </Menu.RadioGroup>
              </Menu>
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Submenu"
            description="Nest menus with Menu.Sub."
            code={submenuSnippet}
          >
            <DocsDemoRow>
              <Menu trigger={<Button>More actions</Button>}>
                <Menu.Item>Cut</Menu.Item>
                <Menu.Sub trigger="Share\u2026">
                  <Menu.Item>Copy link</Menu.Item>
                  <Menu.Item>Send via email</Menu.Item>
                </Menu.Sub>
                <Menu.Separator />
                <Menu.Item>Delete</Menu.Item>
              </Menu>
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Sizes"
            description="Three size options for the item rows."
            code={'<Menu size="1" trigger={<Button size="1">Small</Button>}>...</Menu>'}
          >
            <DocsDemoRow>
              {(["1", "2", "3"] as const).map((size) => (
                <Menu
                  key={size}
                  size={size}
                  trigger={<Button size={size}>Size {size}</Button>}
                >
                  <Menu.Item>Edit</Menu.Item>
                  <Menu.Item>Duplicate</Menu.Item>
                  <Menu.Separator />
                  <Menu.Item>Delete</Menu.Item>
                </Menu>
              ))}
            </DocsDemoRow>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading>Usage</Heading>
        <CodeBlock title="Menu Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading>Notes</Heading>
        <DocsList>
          <li>
            The <code>trigger</code> prop receives Base UI's trigger props via
            the <code>render</code> pattern — pass any interactive element.
          </li>
          <li>
            Menu.CheckboxItem and Menu.RadioItem use{" "}
            <code>defaultChecked</code> / <code>checked</code> and{" "}
            <code>onCheckedChange</code> for state control.
          </li>
          <li>
            Portals into the nearest Theme root to inherit CSS custom
            properties.
          </li>
        </DocsList>
      </DocsSection>
    </>
  );
}
