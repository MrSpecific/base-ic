import { Tooltip } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DemoCard } from './DemoCard';

export function TooltipDocsPage() {
  const tooltipSnippet = [
    "import { Tooltip } from 'base-ic';",
    '',
    '<Tooltip content="Helpful context" side="top">',
    '  <button>Hover me</button>',
    '</Tooltip>',
  ].join('\n');

  return (
    <>
      <section className="docs-section">
        <h1>Tooltip</h1>
        <p>
          `Tooltip` is a convenience wrapper around Base UI tooltip primitives, with system-level token styling.
        </p>
      </section>
      <section className="docs-section">
        <h2>Live Demos</h2>
        <div className="docs-demo-grid">
          <DemoCard
            title="Directional Hints"
            description="Show context near controls while keeping the layout clean."
          >
            <div className="tooltip-demo-row">
              <Tooltip content="Top helper text" side="top">
                <button className="tooltip-demo-trigger">Top</button>
              </Tooltip>
              <Tooltip content="Right helper text" side="right">
                <button className="tooltip-demo-trigger">Right</button>
              </Tooltip>
              <Tooltip content="Bottom helper text" side="bottom">
                <button className="tooltip-demo-trigger">Bottom</button>
              </Tooltip>
            </div>
          </DemoCard>
          <DemoCard
            title="Form Help"
            description="Use tooltips to explain dense controls without adding persistent text."
          >
            <div className="tooltip-demo-row">
              <Tooltip content="Controls visual density and touch target size." side="top">
                <button className="tooltip-demo-trigger">Density</button>
              </Tooltip>
              <Tooltip content="Show helper text only when users need it." side="top">
                <button className="tooltip-demo-trigger">Info</button>
              </Tooltip>
            </div>
          </DemoCard>
        </div>
      </section>
      <section className="docs-section">
        <h2>Usage</h2>
        <CodeBlock title="Tooltip Usage" code={tooltipSnippet} />
      </section>
      <section className="docs-section">
        <h2>Notes</h2>
        <ul className="docs-list">
          <li>Use concise helper content; tooltips are for hints, not long-form UI.</li>
          <li>`TooltipPrimitive` is exported for advanced composition.</li>
          <li>Styling comes from semantic tooltip tokens (`--tooltip-*`).</li>
        </ul>
      </section>
    </>
  );
}
