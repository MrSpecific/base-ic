import { CodeBlock } from '../components/CodeBlock';
import type { DocsSection } from '../types';

export function DocsPage({
  section,
  goToDocsSection,
}: {
  section: DocsSection;
  goToDocsSection: (next: DocsSection) => void;
}) {
  const docsNavItems: Array<{ id: DocsSection; label: string }> = [
    { id: 'overview', label: 'Overview' },
    { id: 'theme', label: 'Theme' },
    { id: 'tooltip', label: 'Tooltip' },
    { id: 'popover', label: 'Popover' },
  ];

  const installSnippet = 'npm install base-ic';
  const usageSnippet = [
    "import { Theme } from 'base-ic';",
    "import 'base-ic/tokens';",
    '',
    'export default function App() {',
    '  return (',
    '    <Theme accentColor="violet" grayColor="slate" radius="medium" scaling="100%">',
    '      <YourApp />',
    '    </Theme>',
    '  );',
    '}',
  ].join('\n');

  const themingSnippet = [
    '<Theme',
    '  accentColor="blue"',
    '  grayColor="mauve"',
    '  radius="large"',
    '  scaling="110%"',
    '  appearance="light"',
    '>',
    '  <App />',
    '</Theme>',
  ].join('\n');

  const tooltipSnippet = [
    "import { Tooltip } from 'base-ic';",
    '',
    '<Tooltip content="Helpful context" side="top">',
    '  <button>Hover me</button>',
    '</Tooltip>',
  ].join('\n');

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

  const docsBody = (() => {
    if (section === 'theme') {
      return (
        <>
          <section className="docs-section">
            <h1>Theme</h1>
            <p>
              `Theme` is the foundation of Base-IC. It controls accent/neutral palettes, radius, scale,
              appearance, and typography slots for every component below it.
            </p>
          </section>
          <section className="docs-section">
            <h2>Usage</h2>
            <CodeBlock title="Theme Usage" code={themingSnippet} />
          </section>
          <section className="docs-section">
            <h2>Key Props</h2>
            <ul className="docs-list">
              <li>`accentColor` and `grayColor` map semantic aliases to hue scales.</li>
              <li>`radius` sets component curvature via `--component-radius`.</li>
              <li>`scaling` remaps primitive spacing/size/type tokens from 80% to 150%.</li>
              <li>`appearance` supports `light`, `dark`, and `inherit` modes.</li>
              <li>`fontFamily` overrides semantic typography slots.</li>
            </ul>
          </section>
        </>
      );
    }

    if (section === 'tooltip') {
      return (
        <>
          <section className="docs-section">
            <h1>Tooltip</h1>
            <p>
              `Tooltip` is a convenience wrapper around Base UI tooltip primitives, with system-level token styling.
            </p>
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

    if (section === 'popover') {
      return (
        <>
          <section className="docs-section">
            <h1>Popover</h1>
            <p>
              `Popover` provides richer anchored content than tooltip, suitable for actions, forms, or contextual controls.
            </p>
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

    return (
      <>
        <section className="docs-section">
          <h1>Documentation</h1>
          <p>Everything needed to integrate, theme, and extend base-ic in production.</p>
        </section>
        <section className="docs-section">
          <h2>Install</h2>
          <CodeBlock title="Install" code={installSnippet} />
        </section>
        <section className="docs-section">
          <h2>Quick Start</h2>
          <CodeBlock title="Quick Start" code={usageSnippet} />
        </section>
        <section className="docs-section">
          <h2>Theme API</h2>
          <p>
            `Theme` sets accent, neutral palette, radius, scale, and appearance while keeping token semantics stable.
            Scaling supports `80%` through `150%`.
          </p>
          <CodeBlock title="Theme API Example" code={themingSnippet} />
        </section>
        <section className="docs-section">
          <h2>Status Patterns</h2>
          <p>
            Use semantic tokens like `--status-surface-*`, `--status-badge-*`, `--button-*`, and `--badge-*`
            to keep visual behavior consistent across the product.
          </p>
        </section>
      </>
    );
  })();

  return (
    <main className="site-page docs-layout">
      <aside className="docs-sidebar" aria-label="Docs sections">
        <div className="docs-sidebar-title">Documentation</div>
        {docsNavItems.map((item) => (
          <button
            key={item.id}
            className="docs-sidebar-link"
            data-active={section === item.id}
            onClick={() => goToDocsSection(item.id)}
          >
            {item.label}
          </button>
        ))}
      </aside>
      <div className="docs-page">{docsBody}</div>
    </main>
  );
}
