import { Button, Heading, Link, Menu, Menubar, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import {
  DocsDemoGrid,
  DocsDemoRow,
  DocsList,
} from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { PropsTable } from "../../components/PropsTable";
import { DemoCard } from "./DemoCard";

export function MenubarDocsPage() {
  const usageSnippet = [
    "import { Button, Menu, Menubar } from '@wlcr/base-ic';",
    "",
    "<Menubar>",
    "  <Menu trigger={<Button variant=\"ghost\">File</Button>}>",
    "    <Menu.Item>New</Menu.Item>",
    "    <Menu.Item>Open…</Menu.Item>",
    "    <Menu.Separator />",
    "    <Menu.Item>Save</Menu.Item>",
    "  </Menu>",
    "  <Menu trigger={<Button variant=\"ghost\">Edit</Button>}>",
    "    <Menu.Item>Undo</Menu.Item>",
    "    <Menu.Item>Redo</Menu.Item>",
    "  </Menu>",
    "  <Menu trigger={<Button variant=\"ghost\">View</Button>}>",
    "    <Menu.CheckboxItem defaultChecked>Show grid</Menu.CheckboxItem>",
    "    <Menu.CheckboxItem>Show rulers</Menu.CheckboxItem>",
    "  </Menu>",
    "</Menubar>",
  ].join("\n");

  const verticalSnippet = [
    '<Menubar orientation="vertical">',
    "  <Menu trigger={<Button variant=\"ghost\">File</Button>}>",
    "    <Menu.Item>New</Menu.Item>",
    "    <Menu.Item>Open…</Menu.Item>",
    "  </Menu>",
    "  <Menu trigger={<Button variant=\"ghost\">Edit</Button>}>",
    "    <Menu.Item>Undo</Menu.Item>",
    "    <Menu.Item>Redo</Menu.Item>",
    "  </Menu>",
    "</Menubar>",
  ].join("\n");

  return (
    <>
      <DocsSection>
        <Heading as="h1">Menubar</Heading>
        <Text as="p">
          A horizontal (or vertical) bar of top-level menus — e.g. "File",
          "Edit", "View" — where each item opens its own dropdown. Hovering an
          open menu's trigger switches directly to an adjacent menu without
          re-clicking.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading>Built On Base UI</Heading>
        <Text as="p">
          This component wraps the Base UI Menubar primitive. Base primitive
          docs:{" "}
          <Link
            href="https://base-ui.com/react/components/menubar"
            target="_blank"
            rel="noreferrer"
          >
            base-ui.com/react/components/menubar
          </Link>
          .
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading>Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="File / Edit / View"
            description="Each top-level item is this library's own Menu component — no special prop needed to join the menubar."
            code={usageSnippet}
          >
            <DocsDemoRow>
              <Menubar>
                <Menu trigger={<Button variant="ghost">File</Button>}>
                  <Menu.Item>New</Menu.Item>
                  <Menu.Item>Open…</Menu.Item>
                  <Menu.Separator />
                  <Menu.Item>Save</Menu.Item>
                </Menu>
                <Menu trigger={<Button variant="ghost">Edit</Button>}>
                  <Menu.Item>Undo</Menu.Item>
                  <Menu.Item>Redo</Menu.Item>
                </Menu>
                <Menu trigger={<Button variant="ghost">View</Button>}>
                  <Menu.CheckboxItem defaultChecked>
                    Show grid
                  </Menu.CheckboxItem>
                  <Menu.CheckboxItem>Show rulers</Menu.CheckboxItem>
                </Menu>
              </Menubar>
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Vertical orientation"
            description="Set orientation to lay the menubar out as a column."
            code={verticalSnippet}
          >
            <DocsDemoRow>
              <Menubar orientation="vertical">
                <Menu trigger={<Button variant="ghost">File</Button>}>
                  <Menu.Item>New</Menu.Item>
                  <Menu.Item>Open…</Menu.Item>
                </Menu>
                <Menu trigger={<Button variant="ghost">Edit</Button>}>
                  <Menu.Item>Undo</Menu.Item>
                  <Menu.Item>Redo</Menu.Item>
                </Menu>
              </Menubar>
            </DocsDemoRow>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading>Usage</Heading>
        <CodeBlock title="Menubar Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Props</Heading>
        <PropsTable
          rows={[
            {
              name: "children",
              type: "React.ReactNode",
              required: true,
              description:
                "Top-level menus — expected to be this library's own Menu instances.",
            },
            {
              name: "orientation",
              type: "'horizontal' | 'vertical'",
              default: "'horizontal'",
              description: "The orientation of the menubar.",
            },
            {
              name: "modal",
              type: "boolean",
              default: "true",
              description: "Whether the menubar is modal.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Whether the whole menubar is disabled.",
            },
            {
              name: "loopFocus",
              type: "boolean",
              default: "true",
              description:
                "Whether to loop keyboard focus back to the first item when the end of the list is reached with the arrow keys.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional class name applied to the container.",
            },
          ]}
        />
      </DocsSection>
      <DocsSection>
        <Heading>Notes</Heading>
        <DocsList>
          <li>
            Menubar is a thin container — children are expected to be this
            library's own <code>&lt;Menu&gt;</code> instances, each becoming
            one top-level menubar item.
          </li>
          <li>
            No special prop is required on the child <code>Menu</code>{" "}
            components. Base UI's <code>Menu.Root</code> automatically
            detects a <code>Menubar</code> ancestor via context and switches
            to menubar interaction behavior (hover-to-switch between open
            menus, roving tab index, etc).
          </li>
          <li>
            <code>modal</code> defaults to <code>true</code> and{" "}
            <code>orientation</code> defaults to <code>"horizontal"</code>,
            matching the underlying Base UI primitive.
          </li>
        </DocsList>
      </DocsSection>
    </>
  );
}
