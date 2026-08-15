import { useState } from "react";
import {
  Button,
  Flex,
  Heading,
  Link,
  Text,
  Toaster,
  type ToasterPosition,
  toast,
} from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import { DocsDemoGrid, DocsDemoRow, DocsList } from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { PropsTable } from "../../components/PropsTable";
import { DemoCard } from "./DemoCard";

const POSITIONS: ToasterPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

export function ToastDocsPage() {
  const [position, setPosition] = useState<ToasterPosition>("bottom-center");

  const positionSnippet = [
    "// Mount once; position is fixed for that Toaster instance.",
    `<Toaster position="${position}" />`,
  ].join("\n");

  const usageSnippet = [
    "import { Toaster, toast } from '@wlcr/base-ic';",
    "",
    "// Mount once, near the app root (usually inside <Theme>):",
    "function App() {",
    "  return (",
    "    <Theme>",
    "      <YourApp />",
    "      <Toaster />",
    "    </Theme>",
    "  );",
    "}",
    "",
    "// Then call `toast(...)` from anywhere — event handlers, effects,",
    "// non-component utility code:",
    'toast({ title: "Saved", description: "Your changes were saved." });',
    'toast.success("Profile updated");',
    'toast.error({ title: "Something went wrong", description: "Please try again." });',
  ].join("\n");

  return (
    <>
      <DocsSection>
        <Heading as="h1">Toast</Heading>
        <Text as="p">
          An imperative notification system, not a per-usage widget. Mount a
          single <code>&lt;Toaster /&gt;</code> once near the app root, then
          call <code>toast(...)</code> from anywhere — click handlers, form
          submit callbacks, promise chains, or plain utility functions outside
          of any component — and it renders into that same{" "}
          <code>Toaster</code>'s viewport.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h3">Built On Base-UI</Heading>
        <Text as="p">
          This component wraps the Base UI Toast primitive, including its
          manager for adding, updating, and auto-dismissing toasts outside of
          React state. Base primitive docs:{" "}
          <Link
            href="https://base-ui.com/react/components/toast"
            target="_blank"
            rel="noreferrer"
          >
            base-ui.com/react/components/toast
          </Link>
          .
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Demo</Heading>
        <Toaster position={position} />
        <DocsDemoGrid>
          <DemoCard
            title="Position"
            description="Anchor the stack to any corner or edge with the `position` prop. Toasts always stack away from that edge."
            code={positionSnippet}
          >
            <DocsDemoRow>
              {POSITIONS.map((p) => (
                <Button
                  key={p}
                  size="1"
                  variant={p === position ? "solid" : "surface"}
                  onClick={() => setPosition(p)}
                >
                  {p}
                </Button>
              ))}
            </DocsDemoRow>
            <Flex mt="3">
              <Button
                variant="soft"
                onClick={() =>
                  toast({
                    title: `Now at ${position}`,
                    description: "Pick another position above and try again.",
                  })
                }
              >
                Show toast at this position
              </Button>
            </Flex>
          </DemoCard>
          <DemoCard
            title="Basic"
            description="Call toast(...) with a title and description from any event handler."
            code={'toast({ title: "Saved", description: "Your changes were saved." });'}
          >
            <DocsDemoRow>
              <Button
                variant="soft"
                onClick={() =>
                  toast({
                    title: "Saved",
                    description: "Your changes were saved.",
                  })
                }
              >
                Show toast
              </Button>
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Variants"
            description="toast.success / toast.error / toast.warning / toast.info set `type`, which drives the accent color."
            code={[
              'toast.success("Profile updated");',
              'toast.error("Could not save changes");',
              'toast.warning("Your session is about to expire");',
              'toast.info("A new version is available");',
            ].join("\n")}
          >
            <DocsDemoRow>
              <Flex gap="2" wrap="wrap">
                <Button
                  variant="soft"
                  color="green"
                  onClick={() => toast.success("Profile updated")}
                >
                  Success
                </Button>
                <Button
                  variant="soft"
                  color="red"
                  onClick={() => toast.error("Could not save changes")}
                >
                  Error
                </Button>
                <Button
                  variant="soft"
                  color="amber"
                  onClick={() =>
                    toast.warning("Your session is about to expire")
                  }
                >
                  Warning
                </Button>
                <Button
                  variant="soft"
                  color="blue"
                  onClick={() => toast.info("A new version is available")}
                >
                  Info
                </Button>
              </Flex>
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="With action"
            description="Pass actionProps to render a Toaster.Action button inside the toast (e.g. an Undo action)."
            code={[
              "toast({",
              '  title: "Message deleted",',
              "  actionProps: {",
              '    children: "Undo",',
              "    onClick: () => toast.success(\"Message restored\"),",
              "  },",
              "});",
            ].join("\n")}
          >
            <DocsDemoRow>
              <Button
                variant="outline"
                onClick={() =>
                  toast({
                    title: "Message deleted",
                    actionProps: {
                      children: "Undo",
                      onClick: () => toast.success("Message restored"),
                    },
                  })
                }
              >
                Delete message
              </Button>
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Persistent"
            description="A `timeout` of 0 prevents auto-dismissal; the toast stays until the user closes it."
            code={'toast({ title: "Action required", timeout: 0 });'}
          >
            <DocsDemoRow>
              <Button
                variant="outline"
                onClick={() =>
                  toast({
                    title: "Action required",
                    description: "This toast stays open until dismissed.",
                    timeout: 0,
                  })
                }
              >
                Show persistent toast
              </Button>
            </DocsDemoRow>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Usage</Heading>
        <CodeBlock title="Toast Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Props</Heading>
        <Text as="p">
          <code>Toaster</code> is the only component you mount — its props
          configure the whole notification stack.
        </Text>
        <PropsTable
          rows={[
            {
              name: "limit",
              type: "number",
              default: "3",
              description:
                "Maximum number of toasts visible at once. Toasts beyond the limit are marked limited (hidden) rather than removed, so they animate back in once room frees up.",
            },
            {
              name: "timeout",
              type: "number",
              default: "5000",
              description:
                "Default time in ms before a toast auto-dismisses. `0` prevents auto-dismissal. An individual toast(...) call's own `timeout` wins over this default.",
            },
            {
              name: "swipeDirection",
              type: "('up' | 'down' | 'left' | 'right') | Array<'up' | 'down' | 'left' | 'right'>",
              default: "['down', 'right']",
              description: "Direction(s) a toast can be swiped to dismiss.",
            },
            {
              name: "position",
              type: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'",
              default: "'bottom-center'",
              description:
                "Which corner/edge of the screen the toast stack anchors to. The stack always grows away from that edge.",
            },
            {
              name: "renderToast",
              type: "(toast: ToastObject<Data>) => React.ReactNode",
              description:
                "Fully overrides the default title/description/action/close rendering for every toast. Typically built from Toaster.Title / Toaster.Description / Toaster.Action / Toaster.Close.",
            },
          ]}
        />
        <Text as="p" mt="4">
          <code>toast(...)</code> options (<code>ToastOptions</code>)
        </Text>
        <Text as="p">
          Every <code>toast(...)</code> / <code>toast.success(...)</code> /
          etc. call accepts a <code>ToastOptions</code> object (or, as
          shorthand, a plain string used as the title):
        </Text>
        <PropsTable
          rows={[
            {
              name: "title",
              type: "React.ReactNode",
              description: "The toast's title.",
            },
            {
              name: "description",
              type: "React.ReactNode",
              description: "The toast's description.",
            },
            {
              name: "type",
              type: "string",
              description:
                "Used to conditionally style the toast. Set automatically by toast.success / toast.error / toast.warning / toast.info.",
            },
            {
              name: "timeout",
              type: "number",
              default: "5000",
              description: "Time in ms before this toast auto-dismisses. `0` disables auto-dismissal.",
            },
            {
              name: "priority",
              type: "'low' | 'high'",
              default: "'low'",
              description: "Announcement priority for assistive technology.",
            },
            {
              name: "actionProps",
              type: "React.ComponentPropsWithoutRef<'button'>",
              description: "Props for an action button (e.g. an Undo action) rendered inside the toast.",
            },
            {
              name: "id",
              type: "string",
              description: "Adding a toast with an existing id updates it in place and refreshes its timer.",
            },
            {
              name: "onClose",
              type: "() => void",
              description: "Called when the toast is closed.",
            },
            {
              name: "onRemove",
              type: "() => void",
              description: "Called once the toast is removed from the list after its close animation completes.",
            },
          ]}
        />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Notes</Heading>
        <DocsList>
          <li>
            Mount exactly one <code>&lt;Toaster /&gt;</code> per app, typically
            alongside (not inside) your page content, near the root{" "}
            <code>Theme</code>.
          </li>
          <li>
            <code>toast(...)</code>, <code>toast.success(...)</code>,{" "}
            <code>toast.error(...)</code>, <code>toast.warning(...)</code>, and{" "}
            <code>toast.info(...)</code> all return the new toast's id, which
            can be passed to <code>toast.update(id, ...)</code> or{" "}
            <code>toast.close(id)</code>.
          </li>
          <li>
            <code>toast.promise(promise, &#123; loading, success, error &#125;)</code>{" "}
            turns a single toast into a loading → success/error sequence tied
            to a promise's lifecycle.
          </li>
          <li>
            Pass a custom <code>renderToast</code> prop to <code>Toaster</code>{" "}
            to fully control per-toast markup, built from{" "}
            <code>Toaster.Title</code>, <code>Toaster.Description</code>,{" "}
            <code>Toaster.Action</code>, and <code>Toaster.Close</code>, or
            drop down to <code>ToastPrimitive</code> (the raw Base UI Toast
            parts) directly.
          </li>
          <li>
            <code>position</code> accepts <code>'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'</code>{" "}
            (default <code>'bottom-center'</code>, chosen so it doesn't collide
            with other bottom-right-anchored fixed UI a host page may already
            have). The stack always grows away from the anchored edge — a{" "}
            <code>top-*</code> position stacks new toasts downward instead of
            upward.
          </li>
        </DocsList>
      </DocsSection>
    </>
  );
}
