import { Button, Heading, Popover, Text, Link } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import { DocsDemoGrid, DocsList } from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { DemoCard } from "./DemoCard";

export function PopoverDocsPage() {
  const popoverSnippet = [
    "import { Button, Popover } from '@wlcr/base-ic';",
    "",
    "<Popover",
    '  side="bottom"',
    "  content={",
    "    <div>",
    "      <strong>Panel title</strong>",
    "      <p>Detailed actions and context.</p>",
    "    </div>",
    "  }",
    ">",
    '  <Button variant="surface">Open</Button>',
    "</Popover>",
  ].join("\n");

  const actionsDemoSnippet = [
    "<Popover",
    '  side="bottom"',
    '  align="start"',
    "  content={",
    '    <div className="popover-demo-content">',
    '      <div className="popover-demo-title">Quick Actions</div>',
    '      <p className="popover-demo-text">Apply a default configuration preset.</p>',
    '      <div className="popover-demo-actions">',
    '        <Button className="popover-demo-button popover-demo-button-solid" variant="solid" size="1">Apply</Button>',
    '        <Button className="popover-demo-button popover-demo-button-ghost" variant="surface" size="1">Cancel</Button>',
    "      </div>",
    "    </div>",
    "  }",
    ">",
    '  <Button className="tooltip-demo-trigger" variant="surface">Open actions</Button>',
    "</Popover>",
  ].join("\n");

  const placementDemoSnippet = [
    '<div className="popover-demo-row">',
    "  <Popover",
    '    side="right"',
    '    align="start"',
    '    sideOffset={12}',
    "    content={<div className=\"popover-demo-content\"><div className=\"popover-demo-title\">Right / Start</div><p className=\"popover-demo-text\">Pinned to trigger edge for compact menus.</p></div>}",
    "  >",
    '    <Button className="tooltip-demo-trigger" variant="surface">Right start</Button>',
    "  </Popover>",
    "  <Popover",
    '    side="bottom"',
    '    align="end"',
    '    alignOffset={-8}',
    "    content={<div className=\"popover-demo-content\"><div className=\"popover-demo-title\">Bottom / End</div><p className=\"popover-demo-text\">Useful near card edges.</p></div>}",
    "  >",
    '    <Button className="tooltip-demo-trigger" variant="surface">Bottom end</Button>',
    "  </Popover>",
    "</div>",
  ].join("\n");

  const noArrowDemoSnippet = [
    "<Popover",
    '  side="right"',
    '  align="center"',
    "  disableArrow",
    "  content={",
    '    <div className="popover-demo-content">',
    '      <div className="popover-demo-title">Arrow Disabled</div>',
    '      <p className="popover-demo-text">Use this for flat helper panels when the anchor is obvious.</p>',
    "    </div>",
    "  }",
    ">",
    '  <Button className="tooltip-demo-trigger" variant="surface">Open panel</Button>',
    "</Popover>",
  ].join("\n");

  return (
    <>
      <DocsSection>
        <Heading as="h1">Popover</Heading>
        <Text as="p">
          `Popover` provides richer anchored content than tooltip, suitable for
          actions, forms, or contextual controls.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h3">Built On Base-UI</Heading>
        <Text as="p">
          This component wraps the Base UI Popover primitive. Base primitive
          docs:{" "}
          <Link
            href="https://base-ui.com/react/components/popover"
            target="_blank"
            rel="noreferrer"
          >
            base-ui.com/react/components/popover
          </Link>
          .
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h3">Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Actions Popover"
            description="Great for contextual actions that do not need a full modal."
            code={actionsDemoSnippet}
          >
            <div className="popover-demo-row">
              <Popover
                side="bottom"
                align="start"
                content={
                  <div className="popover-demo-content">
                    <div className="popover-demo-title">Quick Actions</div>
                    <Text as="p" className="popover-demo-text">
                      Apply a default configuration preset.
                    </Text>
                    <div className="popover-demo-actions">
                      <Button
                        className="popover-demo-button popover-demo-button-solid"
                        variant="solid"
                        size="1"
                      >
                        Apply
                      </Button>
                      <Button
                        className="popover-demo-button popover-demo-button-ghost"
                        variant="surface"
                        size="1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                }
              >
                <Button
                  className="tooltip-demo-trigger"
                  variant="surface"
                  size="2"
                >
                  Open actions
                </Button>
              </Popover>
            </div>
          </DemoCard>
          <DemoCard
            title="Placement and Offsets"
            description="Fine-tune side, alignment, and offsets for dense UI anchors."
            code={placementDemoSnippet}
          >
            <div className="popover-demo-row">
              <Popover
                side="right"
                align="start"
                sideOffset={12}
                content={
                  <div className="popover-demo-content">
                    <div className="popover-demo-title">Right / Start</div>
                    <Text as="p" className="popover-demo-text">
                      Pinned to trigger edge for compact menus.
                    </Text>
                  </div>
                }
              >
                <Button
                  className="tooltip-demo-trigger"
                  variant="surface"
                  size="2"
                >
                  Right start
                </Button>
              </Popover>
              <Popover
                side="bottom"
                align="end"
                alignOffset={-8}
                content={
                  <div className="popover-demo-content">
                    <div className="popover-demo-title">Bottom / End</div>
                    <Text as="p" className="popover-demo-text">
                      Useful near card edges.
                    </Text>
                  </div>
                }
              >
                <Button
                  className="tooltip-demo-trigger"
                  variant="surface"
                  size="2"
                >
                  Bottom end
                </Button>
              </Popover>
            </div>
          </DemoCard>
          <DemoCard
            title="Arrow Toggle"
            description="Disable the arrow for flatter panel treatments."
            code={noArrowDemoSnippet}
          >
            <div className="popover-demo-row">
              <Popover
                side="right"
                align="center"
                disableArrow
                content={
                  <div className="popover-demo-content">
                    <div className="popover-demo-title">Arrow Disabled</div>
                    <Text as="p" className="popover-demo-text">
                      Use this for flat helper panels when the anchor is
                      obvious.
                    </Text>
                  </div>
                }
              >
                <Button
                  className="tooltip-demo-trigger"
                  variant="surface"
                  size="2"
                >
                  Open panel
                </Button>
              </Popover>
            </div>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Usage</Heading>
        <CodeBlock title="Popover Usage" code={popoverSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Notes</Heading>
        <DocsList>
          <li>
            Use popover for interactive content, tooltip for passive hints.
          </li>
          <li>
            `PopoverPrimitive` is exported for full Base UI part-level control.
          </li>
          <li>Styling comes from semantic popover tokens (`--popover-*`).</li>
        </DocsList>
      </DocsSection>
    </>
  );
}
