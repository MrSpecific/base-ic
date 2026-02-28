import { Button, Tooltip } from "../../../src";
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
    "</div>",
  ].join("\n");
  const formHelpDemoSnippet = [
    '<div className="tooltip-demo-row">',
    '  <Tooltip content="Controls visual density and touch target size." side="top">',
    '    <Button className="tooltip-demo-trigger" variant="surface">Density</Button>',
    "  </Tooltip>",
    '  <Tooltip content="Show helper text only when users need it." side="top">',
    '    <Button className="tooltip-demo-trigger" variant="surface">Info</Button>',
    "  </Tooltip>",
    "</div>",
  ].join("\n");

  return (
    <>
      <DocsSection>
        <h1>Tooltip</h1>
        <p>
          `Tooltip` is a convenience wrapper around Base UI tooltip primitives,
          with system-level token styling.
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Built On Base-UI</h2>
        <p>
          This component wraps the Base UI Tooltip primitive. Base primitive
          docs:{" "}
          <a
            href="https://base-ui.com/react/components/tooltip"
            target="_blank"
            rel="noreferrer"
          >
            base-ui.com/react/components/tooltip
          </a>
          .
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Demo</h2>
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
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Form Help"
            description="Use tooltips to explain dense controls without adding persistent text."
            code={formHelpDemoSnippet}
          >
            <DocsDemoRow>
              <Tooltip
                content="Controls visual density and touch target size."
                side="top"
              >
                <Button
                  className="tooltip-demo-trigger"
                  variant="surface"
                  size="2"
                >
                  Density
                </Button>
              </Tooltip>
              <Tooltip
                content="Show helper text only when users need it."
                side="top"
              >
                <Button
                  className="tooltip-demo-trigger"
                  variant="surface"
                  size="2"
                >
                  Info
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
