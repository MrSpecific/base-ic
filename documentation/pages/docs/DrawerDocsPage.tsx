import {
  Button,
  Drawer,
  DrawerPrimitive,
  Flex,
  Heading,
  Input,
  Link,
  Text,
} from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import { DocsDemoGrid, DocsDemoRow, DocsList } from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { PropsTable } from "../../components/PropsTable";
import { DemoCard } from "./DemoCard";

export function DrawerDocsPage() {
  const usageSnippet = [
    "import { Button, Drawer, DrawerPrimitive, Input } from '@wlcr/base-ic';",
    "",
    "<Drawer",
    '  side="right"',
    '  title="Edit Profile"',
    '  description="Make changes to your account."',
    "  content={",
    "    <Input placeholder=\"Display name\" />",
    "  }",
    "  footer={",
    "    <>",
    "      <DrawerPrimitive.Close",
    '        render={<Button variant="ghost">Cancel</Button>}',
    "      />",
    '      <Button variant="solid">Save</Button>',
    "    </>",
    "  }",
    ">",
    '  <Button>Open</Button>',
    "</Drawer>",
  ].join("\n");

  const sidesSnippet = [
    "<Drawer",
    '  side="left"',
    '  title="Navigation"',
    '  content={<Text as="p">Common for primary navigation on mobile layouts.</Text>}',
    ">",
    '  <Button variant="outline">Left</Button>',
    "</Drawer>",
    "",
    "<Drawer",
    '  side="bottom"',
    '  title="Filters"',
    '  content={<Text as="p">A common pattern for mobile filter/sort sheets.</Text>}',
    ">",
    '  <Button variant="outline">Bottom</Button>',
    "</Drawer>",
  ].join("\n");

  const noCloseSnippet = [
    "<Drawer",
    "  showClose={false}",
    '  title="Session expiring"',
    '  description="Your session will expire in 5 minutes."',
    "  content={null}",
    "  footer={",
    '    <DrawerPrimitive.Close render={<Button variant="solid">Stay signed in</Button>} />',
    "  }",
    ">",
    '  <Button variant="outline">Session Drawer</Button>',
    "</Drawer>",
  ].join("\n");

  const swipeAreaSnippet = [
    "<Drawer",
    '  side="right"',
    "  swipeArea",
    '  title="Inspector"',
    '  content={<Text as="p">Swipe in from the right edge of the window to open.</Text>}',
    ">",
    '  <Button variant="outline">Inspector</Button>',
    "</Drawer>",
    "",
    "// Pass SwipeArea props to size or style the strip",
    "<Drawer swipeArea={{ style: { width: 40 } }} …>",
  ].join("\n");

  const snapPointsSnippet = [
    "<Drawer",
    '  side="bottom"',
    "  snapPoints={[0.5, 1]}",
    '  title="Order details"',
    '  description="Drag the sheet up to expand it, or down to dismiss."',
    "  content={…}",
    ">",
    '  <Button variant="outline">Bottom sheet</Button>',
    "</Drawer>",
  ].join("\n");

  return (
    <>
      <DocsSection>
        <Heading as="h1">Drawer</Heading>
        <Text as="p">
          A panel that slides in from a screen edge, with an animated
          backdrop, accessible focus trapping, and keyboard dismissal. Unlike
          Dialog, which is centered on screen, Drawer anchors to and animates
          from the <code>side</code> you choose — left, right, top, or
          bottom.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h3">Built On Base-UI</Heading>
        <Text as="p">
          This component wraps the Base UI Drawer primitive. Base primitive
          docs:{" "}
          <Link
            href="https://base-ui.com/react/components/drawer"
            target="_blank"
            rel="noreferrer"
          >
            base-ui.com/react/components/drawer
          </Link>
          .
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Basic"
            description="Title, description, body content, and footer actions. Defaults to sliding in from the right."
            code={usageSnippet}
          >
            <DocsDemoRow>
              <Drawer
                title="Edit Profile"
                description="Update your display name and email address."
                content={
                  <Flex direction="column" gap={3}>
                    <Input placeholder="Display name" defaultValue="Jane Smith" />
                    <Input placeholder="Email" type="email" defaultValue="jane@example.com" />
                  </Flex>
                }
                footer={
                  <>
                    <DrawerPrimitive.Close
                      render={<Button variant="ghost">Cancel</Button>}
                    />
                    <Button variant="solid">Save changes</Button>
                  </>
                }
              >
                <Button variant="soft">Edit Profile</Button>
              </Drawer>
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Sides"
            description="Use the side prop to anchor and animate the drawer from left, right, top, or bottom."
            code={sidesSnippet}
          >
            <DocsDemoRow>
              <Drawer
                side="left"
                title="Navigation"
                description="A drawer anchored to the left edge."
                content={
                  <Text as="p">Common for primary navigation on mobile layouts.</Text>
                }
              >
                <Button variant="outline" size="2">Left</Button>
              </Drawer>
              <Drawer
                side="top"
                title="Announcement"
                description="A drawer anchored to the top edge."
                content={
                  <Text as="p">Useful for banners or quick-glance panels.</Text>
                }
              >
                <Button variant="outline" size="2">Top</Button>
              </Drawer>
              <Drawer
                side="bottom"
                title="Filters"
                description="A drawer anchored to the bottom edge."
                content={
                  <Text as="p">A common pattern for mobile filter/sort sheets.</Text>
                }
              >
                <Button variant="outline" size="2">Bottom</Button>
              </Drawer>
              <Drawer
                side="right"
                title="Details"
                description="A drawer anchored to the right edge (default)."
                content={
                  <Text as="p">Useful for inspector panels and contextual detail views.</Text>
                }
              >
                <Button variant="outline" size="2">Right</Button>
              </Drawer>
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="No close button"
            description="Set showClose={false} to hide the built-in X button."
            code={noCloseSnippet}
          >
            <DocsDemoRow>
              <Drawer
                showClose={false}
                title="Session expiring"
                description="Your session will expire in 5 minutes. Do you want to stay signed in?"
                footer={
                  <>
                    <DrawerPrimitive.Close
                      render={<Button variant="ghost">Sign out</Button>}
                    />
                    <DrawerPrimitive.Close
                      render={<Button variant="solid">Stay signed in</Button>}
                    />
                  </>
                }
                content={null}
              >
                <Button variant="outline">Session Drawer</Button>
              </Drawer>
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Swipe to open"
            description="`swipeArea` renders an invisible strip along the `side` edge of the window. Swiping inward from it opens the drawer. Pass an object of SwipeArea props to size or style the strip."
            code={swipeAreaSnippet}
          >
            <DocsDemoRow>
              <Drawer
                side="right"
                swipeArea
                title="Inspector"
                description="Opened from the button or by swiping in from the right edge."
                content={
                  <Text as="p">Swipe in from the right edge of the window to open.</Text>
                }
              >
                <Button variant="outline">Inspector</Button>
              </Drawer>
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Snap points"
            description="On a bottom drawer, `snapPoints` lets the sheet rest at partial heights. Here it opens at half height and can be dragged up to full height or down to dismiss."
            code={snapPointsSnippet}
          >
            <DocsDemoRow>
              <Drawer
                side="bottom"
                snapPoints={[0.5, 1]}
                title="Order details"
                description="Drag the sheet up to expand it, or down to dismiss."
                content={
                  <Flex direction="column" gap={2}>
                    {Array.from({ length: 6 }, (_, i) => (
                      <Text as="p" key={i}>
                        Line item {i + 1}
                      </Text>
                    ))}
                  </Flex>
                }
              >
                <Button variant="outline">Bottom sheet</Button>
              </Drawer>
            </DocsDemoRow>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Usage</Heading>
        <CodeBlock title="Drawer Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Props</Heading>
        <PropsTable
          rows={[
            {
              name: "children",
              type: "React.ReactElement",
              required: true,
              description: "Trigger element that opens the drawer.",
            },
            {
              name: "content",
              type: "React.ReactNode",
              required: true,
              description: "The drawer's body content, rendered inside the popup. Pass `null` for title/description-only drawers.",
            },
            {
              name: "title",
              type: "React.ReactNode",
              description:
                "Short title shown at the top of the drawer. Optional in the type, but it is what gives the drawer its accessible name, so provide one whenever possible.",
            },
            {
              name: "description",
              type: "React.ReactNode",
              description: "Descriptive text beneath the title.",
            },
            {
              name: "footer",
              type: "React.ReactNode",
              description: "Footer content, usually action buttons.",
            },
            {
              name: "showClose",
              type: "boolean",
              default: "true",
              description: "Whether to show an X close button in the header.",
            },
            {
              name: "side",
              type: "'left' | 'right' | 'top' | 'bottom'",
              default: "'right'",
              description:
                "Screen edge the drawer slides in from. Also sets the default swipe-to-dismiss direction and the edge where `swipeArea` renders. The type is exported as `DrawerSide`.",
            },
            {
              name: "swipeArea",
              type: "boolean | DrawerPrimitive.SwipeArea.Props",
              default: "false",
              description:
                "Renders an invisible strip along the `side` edge of the viewport so users can swipe the drawer open. Pass an object of SwipeArea props (`className`, `style`, `disabled`, `swipeDirection`, …) to size or style the strip.",
            },
            {
              name: "open",
              type: "boolean",
              description: "Whether the drawer is currently open (controlled usage).",
            },
            {
              name: "defaultOpen",
              type: "boolean",
              default: "false",
              description: "Whether the drawer is initially open (uncontrolled usage).",
            },
            {
              name: "modal",
              type: "boolean | 'trap-focus'",
              default: "true",
              description:
                "How strongly the drawer isolates interaction from the rest of the page. `true` traps focus and locks scroll; `'trap-focus'` traps focus only; `false` allows outside interaction.",
            },
            {
              name: "onOpenChange",
              type: "(open: boolean, eventDetails: DrawerRoot.ChangeEventDetails) => void",
              description: "Called when the drawer's open state changes, for any reason.",
            },
            {
              name: "onOpenChangeComplete",
              type: "(open: boolean) => void",
              description: "Called after any open/close animation finishes.",
            },
            {
              name: "disablePointerDismissal",
              type: "boolean",
              default: "false",
              description: "Prevents the drawer from closing on outside presses.",
            },
            {
              name: "swipeDirection",
              type: "'up' | 'down' | 'left' | 'right'",
              description:
                "Direction used to dismiss the drawer via swipe. Derived automatically from `side`; only pass this to override that mapping.",
            },
            {
              name: "snapPoints",
              type: "Array<number | string>",
              description:
                "Snap points the drawer can rest at while dragging — numbers from 0 to 1 are fractions of the viewport, numbers above 1 are pixels, and strings must use `px` or `rem` (e.g. `'30rem'`). The styled popup only positions itself at snap points when `side` is `'bottom'`.",
            },
            {
              name: "snapPoint",
              type: "number | string | null",
              description: "The currently active snap point (controlled usage).",
            },
            {
              name: "defaultSnapPoint",
              type: "number | string | null",
              description: "The initial snap point (uncontrolled usage).",
            },
            {
              name: "onSnapPointChange",
              type: "(snapPoint: number | string | null, eventDetails) => void",
              description: "Called when the active snap point changes.",
            },
            {
              name: "snapToSequentialPoints",
              type: "boolean",
              default: "false",
              description:
                "Disables velocity-based snap skipping so drag distance alone determines the next snap point.",
            },
            {
              name: "actionsRef",
              type: "React.RefObject<DrawerRoot.Actions | null>",
              description:
                "Imperative ref exposing `close()` and `unmount()` for externally-controlled closing animations.",
            },
            {
              name: "handle",
              type: "DrawerHandle<Payload>",
              description:
                "Associates the drawer with a detached trigger. Created via `DrawerPrimitive.createHandle()`.",
            },
          ]}
        />
        <Text as="p" mt="4">
          <code>swipeArea</code> object props
        </Text>
        <PropsTable
          rows={[
            {
              name: "className",
              type: "string",
              description:
                "Extra class name for the strip, merged with the built-in edge positioning.",
            },
            {
              name: "style",
              type: "React.CSSProperties",
              description:
                "Inline styles for the strip, e.g. a wider `width` (left/right) or `height` (top/bottom). The default thickness is 24px times the theme's scaling.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables the swipe area.",
            },
            {
              name: "swipeDirection",
              type: "'up' | 'down' | 'left' | 'right'",
              description:
                "The swipe direction that opens the drawer. Defaults to the opposite of the drawer's own `swipeDirection`.",
            },
          ]}
        />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Notes</Heading>
        <DocsList>
          <li>
            `side` controls both which edge the drawer is anchored to and the
            direction it slides in from. Default: `"right"`.
          </li>
          <li>
            Swipe-to-dismiss follows the pointer: the panel tracks the drag and
            either settles back or closes on release. With a mouse, a swipe
            starts from the panel's padding around its content. Everything
            inside (title, body, footer) stays selectable, so dragging over
            text selects it instead of moving the drawer. Touch swipes work
            anywhere on the panel.
          </li>
          <li>
            `swipeArea` is always mounted while the Drawer is, so it catches
            pointer events along that edge of the window. Leave it off for
            drawers that don't need edge-swipe opening.
          </li>
          <li>
            Use `DrawerPrimitive.Close` for footer actions that should dismiss
            the drawer.
          </li>
          <li>
            Root-level Base UI props (`actionsRef`, `snapPoints`,
            `swipeDirection`, `modal`, …) pass straight through `Drawer`. Drop
            down to `DrawerPrimitive` (the raw Base UI Drawer parts) only when
            you need a custom popup structure.
          </li>
        </DocsList>
      </DocsSection>
    </>
  );
}
