import { Button, Heading, Tooltip, Text, Link } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import {
  DocsDemoGrid,
  DocsDemoRow,
  DocsList,
} from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { PropsTable } from "../../components/PropsTable";
import { DemoCard } from "./DemoCard";

export function TooltipDocsPage() {
  const tooltipSnippet = [
    "import { Button, Tooltip } from '@wlcr/base-ic';",
    "",
    '<Tooltip content="Helpful context" side="top">',
    '  <Button variant="surface">Hover me</Button>',
    "</Tooltip>",
  ].join("\n");
  const directionalDemoSnippet = [
    '<div className="tooltip-demo-row">',
    '  <Tooltip content="Top helper text" side="top"><Button className="tooltip-demo-trigger" variant="surface">Top</Button></Tooltip>',
    '  <Tooltip content="Right helper text" side="right"><Button className="tooltip-demo-trigger" variant="surface">Right</Button></Tooltip>',
    '  <Tooltip content="Bottom helper text" side="bottom"><Button className="tooltip-demo-trigger" variant="surface">Bottom</Button></Tooltip>',
    '  <Tooltip content="Left helper text" side="left"><Button className="tooltip-demo-trigger" variant="surface">Left</Button></Tooltip>',
    "</div>",
  ].join("\n");
  const alignmentDemoSnippet = [
    '<div className="tooltip-demo-row">',
    '  <Tooltip content="Bottom / start" side="bottom" align="start"><Button className="tooltip-demo-trigger" variant="surface">Start</Button></Tooltip>',
    '  <Tooltip content="Bottom / center" side="bottom" align="center"><Button className="tooltip-demo-trigger" variant="surface">Center</Button></Tooltip>',
    '  <Tooltip content="Bottom / end" side="bottom" align="end"><Button className="tooltip-demo-trigger" variant="surface">End</Button></Tooltip>',
    "</div>",
  ].join("\n");
  const behaviorDemoSnippet = [
    '<div className="tooltip-demo-row">',
    '  <Tooltip content="Open after 400ms" delay={400}>',
    '    <Button className="tooltip-demo-trigger" variant="surface">Delayed open</Button>',
    "  </Tooltip>",
    '  <Tooltip content="Stays for 500ms after pointer out" closeDelay={500}>',
    '    <Button className="tooltip-demo-trigger" variant="surface">Delayed close</Button>',
    "  </Tooltip>",
    '  <Tooltip content="Arrow hidden" disableArrow>',
    '    <Button className="tooltip-demo-trigger" variant="surface">No arrow</Button>',
    "  </Tooltip>",
    "</div>",
  ].join("\n");

  return (
    <>
      <DocsSection>
        <Heading as="h1">Tooltip</Heading>
        <Text as="p">
          `Tooltip` is a convenience wrapper around Base UI tooltip primitives,
          with system-level token styling.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h3">Built On Base-UI</Heading>
        <Text as="p">
          This component wraps the Base UI Tooltip primitive. Base primitive
          docs:{" "}
          <Link
            href="https://base-ui.com/react/components/tooltip"
            target="_blank"
            rel="noreferrer"
          >
            base-ui.com/react/components/tooltip
          </Link>
          .
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h3">Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Directional Hints"
            description="Show context near controls while keeping the layout clean."
            code={directionalDemoSnippet}
          >
            <DocsDemoRow>
              <Tooltip content="Top helper text" side="top">
                <Button
                  className="tooltip-demo-trigger"
                  variant="surface"
                  size="2"
                >
                  Top
                </Button>
              </Tooltip>
              <Tooltip content="Right helper text" side="right">
                <Button
                  className="tooltip-demo-trigger"
                  variant="surface"
                  size="2"
                >
                  Right
                </Button>
              </Tooltip>
              <Tooltip content="Bottom helper text" side="bottom">
                <Button
                  className="tooltip-demo-trigger"
                  variant="surface"
                  size="2"
                >
                  Bottom
                </Button>
              </Tooltip>
              <Tooltip content="Left helper text" side="left">
                <Button
                  className="tooltip-demo-trigger"
                  variant="surface"
                  size="2"
                >
                  Left
                </Button>
              </Tooltip>
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Alignment"
            description="Control horizontal placement when multiple triggers sit close together."
            code={alignmentDemoSnippet}
          >
            <DocsDemoRow>
              <Tooltip content="Bottom / start" side="bottom" align="start">
                <Button
                  className="tooltip-demo-trigger"
                  variant="surface"
                  size="2"
                >
                  Start
                </Button>
              </Tooltip>
              <Tooltip content="Bottom / center" side="bottom" align="center">
                <Button
                  className="tooltip-demo-trigger"
                  variant="surface"
                  size="2"
                >
                  Center
                </Button>
              </Tooltip>
              <Tooltip content="Bottom / end" side="bottom" align="end">
                <Button
                  className="tooltip-demo-trigger"
                  variant="surface"
                  size="2"
                >
                  End
                </Button>
              </Tooltip>
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Timing and Arrow"
            description="Tune open/close delay and arrow rendering for different interaction patterns."
            code={behaviorDemoSnippet}
          >
            <DocsDemoRow>
              <Tooltip content="Open after 400ms" delay={400}>
                <Button
                  className="tooltip-demo-trigger"
                  variant="surface"
                  size="2"
                >
                  Delayed open
                </Button>
              </Tooltip>
              <Tooltip
                content="Stays for 500ms after pointer out"
                closeDelay={500}
              >
                <Button
                  className="tooltip-demo-trigger"
                  variant="surface"
                  size="2"
                >
                  Delayed close
                </Button>
              </Tooltip>
              <Tooltip content="Arrow hidden" disableArrow>
                <Button
                  className="tooltip-demo-trigger"
                  variant="surface"
                  size="2"
                >
                  No arrow
                </Button>
              </Tooltip>
            </DocsDemoRow>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <h2>Usage</h2>
        <CodeBlock title="Tooltip Usage" code={tooltipSnippet} />
      </DocsSection>
      <DocsSection>
        <h2>Props</h2>
        <PropsTable
          rows={[
            {
              name: "children",
              type: "React.ReactElement",
              required: true,
              description: "Trigger element the tooltip is anchored to.",
            },
            {
              name: "content",
              type: "React.ReactNode",
              required: true,
              description: "The tooltip's body content, rendered inside the popup.",
            },
            {
              name: "side",
              type: "'top' | 'right' | 'bottom' | 'left'",
              default: "'top'",
              description: "Preferred side of the trigger to render the popup on.",
            },
            {
              name: "align",
              type: "'start' | 'center' | 'end'",
              default: "'center'",
              description: "Alignment of the popup relative to the trigger along the chosen side.",
            },
            {
              name: "sideOffset",
              type: "number",
              default: "8",
              description: "Distance in pixels between the trigger and the popup.",
            },
            {
              name: "alignOffset",
              type: "number",
              description: "Offset in pixels along the alignment axis.",
            },
            {
              name: "delay",
              type: "number",
              default: "150",
              description: "Milliseconds to wait before opening the tooltip on hover/focus.",
            },
            {
              name: "closeDelay",
              type: "number",
              description: "Milliseconds to wait before closing the tooltip after pointer/focus leaves.",
            },
            {
              name: "disableArrow",
              type: "boolean",
              default: "false",
              description: "Hides the pointer arrow connecting the popup to its trigger.",
            },
            {
              name: "open",
              type: "boolean",
              description: "Whether the tooltip is currently open (controlled usage).",
            },
            {
              name: "defaultOpen",
              type: "boolean",
              default: "false",
              description: "Whether the tooltip is initially open (uncontrolled usage).",
            },
            {
              name: "onOpenChange",
              type: "(open: boolean, eventDetails: TooltipRoot.ChangeEventDetails) => void",
              description: "Called when the tooltip's open state changes, for any reason.",
            },
            {
              name: "onOpenChangeComplete",
              type: "(open: boolean) => void",
              description: "Called after any open/close animation finishes.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Prevents the tooltip from opening.",
            },
            {
              name: "disableHoverablePopup",
              type: "boolean",
              default: "false",
              description: "Prevents the tooltip contents themselves from being hovered without closing.",
            },
            {
              name: "trackCursorAxis",
              type: "'none' | 'x' | 'y' | 'both'",
              default: "'none'",
              description: "Which axis (if any) the tooltip should track the cursor on.",
            },
            {
              name: "actionsRef",
              type: "React.RefObject<TooltipRoot.Actions | null>",
              description:
                "Imperative ref exposing `close()` and `unmount()` for externally-controlled closing animations.",
            },
            {
              name: "handle",
              type: "TooltipHandle<Payload>",
              description:
                "Associates the tooltip with a detached trigger. Created via `TooltipPrimitive.createHandle()`.",
            },
          ]}
        />
      </DocsSection>
      <DocsSection>
        <h2>Notes</h2>
        <DocsList>
          <li>
            Use concise helper content; tooltips are for hints, not long-form
            UI.
          </li>
          <li>`TooltipPrimitive` is exported for advanced composition.</li>
          <li>Styling comes from semantic tooltip tokens (`--tooltip-*`).</li>
        </DocsList>
      </DocsSection>
    </>
  );
}
