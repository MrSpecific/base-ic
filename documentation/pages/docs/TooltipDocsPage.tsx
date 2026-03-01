import { Button, Heading, Tooltip, Text, Link } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import {
  DocsDemoGrid,
  DocsDemoRow,
  DocsList,
} from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { DemoCard } from "./DemoCard";

export function TooltipDocsPage() {
  const tooltipSnippet = [
    "import { Button, Tooltip } from 'base-ic';",
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
