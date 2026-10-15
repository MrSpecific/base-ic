import { Button, Code, Heading, Link, Menu, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import {
  DocsDemoGrid,
  DocsDemoRow,
  DocsList,
} from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { PropsTable } from "../../components/PropsTable";
import { DemoCard } from "./DemoCard";

export function MenuDocsPage() {
  const usageSnippet = [
    "import { Button, Menu } from '@wlcr/base-ic';",
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

  const hoverSnippet = [
    "<Menu",
    "  openOnHover",
    "  delay={100}",
    "  closeDelay={200}",
    "  trigger={<Button variant=\"soft\">Hover me</Button>}",
    ">",
    "  <Menu.Item>Edit</Menu.Item>",
    "  <Menu.Item>Duplicate</Menu.Item>",
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
        <Heading as="h2">Built On Base UI</Heading>
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
        <Heading as="h2">Demo</Heading>
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
            title="Open on hover"
            description="`openOnHover` opens the menu when the trigger is hovered, as well as on click. `delay` and `closeDelay` set the hover timing in ms."
            code={hoverSnippet}
          >
            <DocsDemoRow>
              <Menu
                openOnHover
                delay={100}
                closeDelay={200}
                trigger={<Button variant="soft">Hover me</Button>}
              >
                <Menu.Item>Edit</Menu.Item>
                <Menu.Item>Duplicate</Menu.Item>
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
        <Heading as="h2">Usage</Heading>
        <CodeBlock title="Menu Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Props</Heading>
        <Text as="p">Menu (root)</Text>
        <PropsTable
          rows={[
            {
              name: "trigger",
              type: "React.ReactElement",
              required: true,
              description:
                "Element that opens the menu. Receives Base UI's trigger props via the render pattern.",
            },
            {
              name: "children",
              type: "React.ReactNode",
              required: true,
              description:
                "Menu content — Menu.Item, Menu.Group, Menu.Separator, Menu.Sub, etc.",
            },
            {
              name: "size",
              type: "'1' | '2' | '3'",
              default: "'2'",
              description: "Size scale applied to item rows.",
            },
            {
              name: "side",
              type: "'top' | 'bottom' | 'left' | 'right' | 'inline-end' | 'inline-start'",
              default: "'bottom'",
              description: "Side of the trigger the popup appears on.",
            },
            {
              name: "align",
              type: "'start' | 'center' | 'end'",
              default: "'start'",
              description: "Alignment of the popup relative to the trigger.",
            },
            {
              name: "sideOffset",
              type: "number",
              default: "4",
              description: "Gap in pixels between the popup and the trigger.",
            },
            {
              name: "openOnHover",
              type: "boolean",
              default: "false",
              description: "Open the menu when the trigger is hovered, as well as on click.",
            },
            {
              name: "delay",
              type: "number",
              default: "100",
              description: "Hover open delay in ms. Requires `openOnHover`.",
            },
            {
              name: "closeDelay",
              type: "number",
              default: "0",
              description: "Hover close delay in ms. Requires `openOnHover`.",
            },
            {
              name: "open",
              type: "boolean",
              description: "Controlled open state.",
            },
            {
              name: "defaultOpen",
              type: "boolean",
              default: "false",
              description: "Initial open state for uncontrolled usage.",
            },
            {
              name: "onOpenChange",
              type: "(open: boolean, eventDetails) => void",
              description: "Called when the menu is opened or closed.",
            },
            {
              name: "modal",
              type: "boolean",
              default: "true",
              description:
                "Whether interaction is limited to the menu while open (locks page scroll, blocks outside pointer interaction).",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Whether the component should ignore user interaction.",
            },
          ]}
        />
        <Text as="p">Menu.Item</Text>
        <PropsTable
          rows={[
            {
              name: "children",
              type: "React.ReactNode",
              required: true,
              description: "Item label/content.",
            },
            {
              name: "icon",
              type: "React.ReactNode",
              description: "Icon rendered before the label.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Whether the item should ignore user interaction.",
            },
            {
              name: "closeOnClick",
              type: "boolean",
              default: "true",
              description: "Whether to close the menu when the item is clicked.",
            },
            {
              name: "label",
              type: "string",
              description:
                "Overrides the text used when the item is matched during keyboard text navigation.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional class name applied to the item.",
            },
          ]}
        />
        <Text as="p">Menu.CheckboxItem</Text>
        <PropsTable
          rows={[
            {
              name: "children",
              type: "React.ReactNode",
              required: true,
              description: "Item label/content.",
            },
            {
              name: "checked",
              type: "boolean",
              description:
                "Controlled checked state. Use with onCheckedChange for a controlled checkbox item.",
            },
            {
              name: "defaultChecked",
              type: "boolean",
              default: "false",
              description: "Initial checked state for uncontrolled usage.",
            },
            {
              name: "onCheckedChange",
              type: "(checked: boolean, eventDetails) => void",
              description: "Called when the checkbox item is ticked or unticked.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Whether the item should ignore user interaction.",
            },
            {
              name: "closeOnClick",
              type: "boolean",
              default: "false",
              description: "Whether to close the menu when the item is clicked.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional class name applied to the item.",
            },
          ]}
        />
        <Text as="p">Menu.RadioItem</Text>
        <PropsTable
          rows={[
            {
              name: "children",
              type: "React.ReactNode",
              required: true,
              description: "Item label/content.",
            },
            {
              name: "value",
              type: "any",
              required: true,
              description:
                "Value set on the parent Menu.RadioGroup when this item is selected.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Whether the item should ignore user interaction.",
            },
            {
              name: "closeOnClick",
              type: "boolean",
              default: "false",
              description: "Whether to close the menu when the item is clicked.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional class name applied to the item.",
            },
          ]}
        />
        <Text as="p">Menu.RadioGroup</Text>
        <PropsTable
          rows={[
            {
              name: "children",
              type: "React.ReactNode",
              description: "Menu.RadioItem elements.",
            },
            {
              name: "value",
              type: "any",
              description:
                "Controlled value of the selected radio item. Use with onValueChange.",
            },
            {
              name: "defaultValue",
              type: "any",
              description: "Initially selected value for uncontrolled usage.",
            },
            {
              name: "onValueChange",
              type: "(value: any, eventDetails) => void",
              description: "Called when the selected value changes.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Whether the whole group should ignore user interaction.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional class name applied to the group.",
            },
          ]}
        />
        <Text as="p">Menu.Group</Text>
        <PropsTable
          rows={[
            {
              name: "children",
              type: "React.ReactNode",
              required: true,
              description: "Items in the group.",
            },
            {
              name: "label",
              type: "React.ReactNode",
              description:
                "Group label rendered above the items (as Base UI's Menu.GroupLabel, which also labels the group for assistive tech).",
            },
            {
              name: "className",
              type: "string",
              description: "Additional class name applied to the group.",
            },
          ]}
        />
        <Text as="p">Menu.Separator</Text>
        <PropsTable
          rows={[
            {
              name: "className",
              type: "string",
              description: "Additional class name applied to the separator.",
            },
          ]}
        />
        <Text as="p">Menu.Sub</Text>
        <PropsTable
          rows={[
            {
              name: "trigger",
              type: "React.ReactNode",
              required: true,
              description:
                "Label of the submenu trigger item. A chevron is appended automatically.",
            },
            {
              name: "children",
              type: "React.ReactNode",
              required: true,
              description: "Submenu content — Menu.Item, Menu.Group, etc.",
            },
            {
              name: "open",
              type: "boolean",
              description: "Controlled open state of the submenu.",
            },
            {
              name: "defaultOpen",
              type: "boolean",
              default: "false",
              description: "Initial open state for uncontrolled usage.",
            },
            {
              name: "onOpenChange",
              type: "(open: boolean, eventDetails) => void",
              description: "Called when the submenu is opened or closed.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Whether the submenu should ignore user interaction.",
            },
            {
              name: "closeParentOnEsc",
              type: "boolean",
              default: "false",
              description:
                "Whether pressing Escape closes the entire menu instead of only this submenu.",
            },
          ]}
        />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Notes</Heading>
        <DocsList>
          <li>
            The <Code>trigger</Code> prop receives Base UI's trigger props via
            the <Code>render</Code> pattern — pass any interactive element.
          </li>
          <li>
            Menu.CheckboxItem uses <Code>defaultChecked</Code> /{" "}
            <Code>checked</Code> and <Code>onCheckedChange</Code> for state
            control. Menu.RadioItem has no checked state of its own — selection
            lives on the parent Menu.RadioGroup via <Code>defaultValue</Code> /{" "}
            <Code>value</Code> and <Code>onValueChange</Code>; each RadioItem
            just declares its <Code>value</Code>.
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
