import { Popover } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DemoCard } from './DemoCard';

export function PopoverDocsPage() {
  const popoverSnippet = [
    "import { Popover } from 'base-ic';",
    '',
    '<Popover',
    '  side="bottom"',
    '  content={',
    '    <div>',
    '      <strong>Panel title</strong>',
    '      <p>Detailed actions and context.</p>',
    '    </div>',
    '  }',
    '>',
    '  <button>Open</button>',
    '</Popover>',
  ].join('\n');
  const actionsDemoSnippet = [
    '<Popover',
    '  side="bottom"',
    '  align="start"',
    '  content={',
    '    <div className="popover-demo-content">',
    '      <div className="popover-demo-title">Quick Actions</div>',
    '      <p className="popover-demo-text">Apply a default configuration preset.</p>',
    '      <div className="popover-demo-actions">',
    '        <button className="popover-demo-button popover-demo-button-solid">Apply</button>',
    '        <button className="popover-demo-button popover-demo-button-ghost">Cancel</button>',
    '      </div>',
    '    </div>',
    '  }',
    '>',
    '  <button className="tooltip-demo-trigger">Open actions</button>',
    '</Popover>',
  ].join('\n');
  const settingsDemoSnippet = [
    '<Popover',
    '  side="right"',
    '  align="center"',
    '  content={',
    '    <div className="popover-demo-content">',
    '      <div className="popover-demo-title">Density</div>',
    '      <p className="popover-demo-text">Compact mode increases information density in tables.</p>',
    '    </div>',
    '  }',
    '>',
    '  <button className="tooltip-demo-trigger">Open settings</button>',
    '</Popover>',
  ].join('\n');

  return (
    <>
      <section className="docs-section">
        <h1>Popover</h1>
        <p>
          `Popover` provides richer anchored content than tooltip, suitable for actions, forms, or contextual controls.
        </p>
      </section>
      <section className="docs-section">
        <h2>Built On Base UI</h2>
        <p>
          This component wraps the Base UI Popover primitive. Base primitive docs:
          {' '}
          <a href="https://base-ui.com/react/components/popover" target="_blank" rel="noreferrer">
            base-ui.com/react/components/popover
          </a>
          .
        </p>
      </section>
      <section className="docs-section">
        <h2>Demo</h2>
        <div className="docs-demo-grid">
          <DemoCard
            title="Actions Popover"
            description="Great for contextual actions that do not need a full modal."
            code={actionsDemoSnippet}
          >
            <div className="popover-demo-row">
              <Popover
                side="bottom"
                align="start"
                content={(
                  <div className="popover-demo-content">
                    <div className="popover-demo-title">Quick Actions</div>
                    <p className="popover-demo-text">Apply a default configuration preset.</p>
                    <div className="popover-demo-actions">
                      <button className="popover-demo-button popover-demo-button-solid">Apply</button>
                      <button className="popover-demo-button popover-demo-button-ghost">Cancel</button>
                    </div>
                  </div>
                )}
              >
                <button className="tooltip-demo-trigger">Open actions</button>
              </Popover>
            </div>
          </DemoCard>
          <DemoCard
            title="Settings Popover"
            description="Use a compact panel for secondary settings and toggles."
            code={settingsDemoSnippet}
          >
            <div className="popover-demo-row">
              <Popover
                side="right"
                align="center"
                content={(
                  <div className="popover-demo-content">
                    <div className="popover-demo-title">Density</div>
                    <p className="popover-demo-text">Compact mode increases information density in tables.</p>
                  </div>
                )}
              >
                <button className="tooltip-demo-trigger">Open settings</button>
              </Popover>
            </div>
          </DemoCard>
        </div>
      </section>
      <section className="docs-section">
        <h2>Usage</h2>
        <CodeBlock title="Popover Usage" code={popoverSnippet} />
      </section>
      <section className="docs-section">
        <h2>Notes</h2>
        <ul className="docs-list">
          <li>Use popover for interactive content, tooltip for passive hints.</li>
          <li>`PopoverPrimitive` is exported for full Base UI part-level control.</li>
          <li>Styling comes from semantic popover tokens (`--popover-*`).</li>
        </ul>
      </section>
    </>
  );
}
