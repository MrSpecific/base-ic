import { useEffect, useMemo, useState } from 'react';
import { Theme, Tooltip, Popover } from '../src';
import type { AccentColor, GrayColor, Radius, Scaling, Appearance } from '../src';
import { IconAlert, IconCheck, IconCopy } from './icons';
import '../src/tokens/index.css';
import './playground.css';

type Page = 'home' | 'docs' | 'customization' | 'for-designers' | 'playground';
type DocsSection = 'overview' | 'theme' | 'tooltip' | 'popover';
type RouteState = { page: Page; docsSection: DocsSection };

const NAV_ITEMS: Array<{ page: Page; label: string }> = [
  { page: 'home', label: 'Home' },
  { page: 'docs', label: 'Docs' },
  { page: 'customization', label: 'Customization' },
  { page: 'for-designers', label: 'For Designers' },
  { page: 'playground', label: 'Playground' },
];

const ACCENT_COLORS: AccentColor[] = [
  'blue', 'violet', 'red', 'green', 'orange', 'yellow', 'pink', 'teal', 'cyan', 'black',
];

const GRAY_COLORS: GrayColor[] = ['gray', 'mauve', 'slate'];
const RADII: Radius[] = ['none', 'small', 'medium', 'large', 'full'];
const SCALINGS: Scaling[] = [
  '80%', '85%', '90%', '95%', '100%',
  '105%', '110%', '115%', '120%', '125%',
  '130%', '135%', '140%', '145%', '150%',
];
const APPEARANCES: Appearance[] = ['light', 'dark', 'inherit'];

const ALL_HUES = [
  'gray', 'mauve', 'slate', 'blue', 'violet', 'red',
  'green', 'orange', 'yellow', 'pink', 'teal',
];

const STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const ACCENT_SWATCH_COLORS: Record<string, string> = {
  blue: 'var(--color-blue-9)',
  violet: 'var(--color-violet-9)',
  red: 'var(--color-red-9)',
  green: 'var(--color-green-9)',
  orange: 'var(--color-orange-9)',
  yellow: 'var(--color-yellow-9)',
  pink: 'var(--color-pink-9)',
  teal: 'var(--color-teal-9)',
  cyan: 'var(--color-cyan-9)',
  black: 'var(--color-black-9)',
};

function toDisplayName(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getRouteFromPath(pathname: string): RouteState {
  const normalized = pathname.trim().replace(/\/+$/, '') || '/';
  if (normalized === '/docs') return { page: 'docs', docsSection: 'overview' };
  if (normalized.startsWith('/docs/')) {
    const slug = normalized.slice('/docs/'.length) as DocsSection;
    if (slug === 'theme' || slug === 'tooltip' || slug === 'popover') {
      return { page: 'docs', docsSection: slug };
    }
    return { page: 'docs', docsSection: 'overview' };
  }
  if (normalized === '/customization') return { page: 'customization', docsSection: 'overview' };
  if (normalized === '/for-designers') return { page: 'for-designers', docsSection: 'overview' };
  if (normalized === '/playground') return { page: 'playground', docsSection: 'overview' };
  return { page: 'home', docsSection: 'overview' };
}

function pageToPath(page: Page, docsSection: DocsSection = 'overview'): string {
  if (page === 'docs') return docsSection === 'overview' ? '/docs' : `/docs/${docsSection}`;
  if (page === 'customization') return '/customization';
  if (page === 'for-designers') return '/for-designers';
  if (page === 'playground') return '/playground';
  return '/';
}

function ThemePanel({
  accent, setAccent,
  gray, setGray,
  radius, setRadius,
  scaling, setScaling,
  appearance, setAppearance,
  defaultOpen,
}: {
  accent: AccentColor;
  setAccent: (v: AccentColor) => void;
  gray: GrayColor;
  setGray: (v: GrayColor) => void;
  radius: Radius;
  setRadius: (v: Radius) => void;
  scaling: Scaling;
  setScaling: (v: Scaling) => void;
  appearance: Appearance;
  setAppearance: (v: Appearance) => void;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const copyTheme = async () => {
    const snippet = [
      '<Theme',
      `  accentColor="${accent}"`,
      `  grayColor="${gray}"`,
      `  radius="${radius}"`,
      `  scaling="${scaling}"`,
      `  appearance="${appearance}"`,
      '>',
      '  <App />',
      '</Theme>',
    ].join('\n');

    try {
      await navigator.clipboard.writeText(snippet);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('error');
    }

    window.setTimeout(() => setCopyStatus('idle'), 1600);
  };

  return (
    <div className="theme-panel-wrapper">
      <div className={open ? 'theme-panel' : 'theme-panel-hidden'}>
        <div className="theme-panel-title">Theme</div>

        <div className="theme-panel-field">
          <span className="theme-panel-label">Accent Color</span>
          <div className="theme-panel-colors">
            {ACCENT_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                className="theme-panel-color-swatch"
                data-active={c === accent}
                style={{ background: ACCENT_SWATCH_COLORS[c] }}
                title={`Set accent color to ${toDisplayName(c)}`}
                aria-label={`Set accent color to ${toDisplayName(c)}`}
                onClick={() => setAccent(c)}
              />
            ))}
          </div>
          <p className="theme-panel-helper">Primary brand color for interactive elements.</p>
        </div>

        <div className="theme-panel-field">
          <label className="theme-panel-label" htmlFor="theme-gray">Neutral Palette</label>
          <div className="theme-panel-select-wrap">
            <select id="theme-gray" className="theme-panel-select" value={gray} onChange={(e) => setGray(e.target.value as GrayColor)}>
              {GRAY_COLORS.map((c) => <option key={c} value={c}>{toDisplayName(c)}</option>)}
            </select>
            <span className="theme-panel-select-caret" aria-hidden="true">▾</span>
          </div>
          <p className="theme-panel-helper">Sets the base gray family for borders and surfaces.</p>
        </div>

        <div className="theme-panel-field">
          <label className="theme-panel-label" htmlFor="theme-radius">Corner Radius</label>
          <div className="theme-panel-select-wrap">
            <select id="theme-radius" className="theme-panel-select" value={radius} onChange={(e) => setRadius(e.target.value as Radius)}>
              {RADII.map((r) => <option key={r} value={r}>{toDisplayName(r)}</option>)}
            </select>
            <span className="theme-panel-select-caret" aria-hidden="true">▾</span>
          </div>
          <p className="theme-panel-helper">Controls rounded corners across components.</p>
        </div>

        <div className="theme-panel-field">
          <label className="theme-panel-label" htmlFor="theme-scaling">Scale</label>
          <div className="theme-panel-select-wrap">
            <select id="theme-scaling" className="theme-panel-select" value={scaling} onChange={(e) => setScaling(e.target.value as Scaling)}>
              {SCALINGS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <span className="theme-panel-select-caret" aria-hidden="true">▾</span>
          </div>
          <p className="theme-panel-helper">Global size multiplier for spacing and typography.</p>
        </div>

        <div className="theme-panel-field">
          <label className="theme-panel-label" htmlFor="theme-appearance">Appearance</label>
          <div className="theme-panel-select-wrap">
            <select id="theme-appearance" className="theme-panel-select" value={appearance} onChange={(e) => setAppearance(e.target.value as Appearance)}>
              {APPEARANCES.map((a) => <option key={a} value={a}>{toDisplayName(a)}</option>)}
            </select>
            <span className="theme-panel-select-caret" aria-hidden="true">▾</span>
          </div>
          <p className="theme-panel-helper">Light or dark rendering mode.</p>
        </div>

        <button
          type="button"
          className="theme-panel-copy-button"
          data-state={copyStatus}
          onClick={copyTheme}
        >
          {copyStatus === 'copied' ? 'Copied Theme' : copyStatus === 'error' ? 'Copy Failed' : 'Copy Theme'}
        </button>
        <p className="theme-panel-helper">Copies a ready-to-paste <code>{'<Theme />'}</code> snippet.</p>
        <div className="theme-panel-current">
          {`accent: ${accent} • gray: ${gray} • radius: ${radius} • scale: ${scaling} • appearance: ${appearance}`}
        </div>
      </div>

      <button
        className="theme-panel-toggle"
        onClick={() => setOpen(!open)}
        title={open ? 'Close theme panel' : 'Open theme panel'}
        aria-label={open ? 'Close theme panel' : 'Open theme panel'}
      >
        {open ? '\u2715' : '\u2699'}
      </button>
    </div>
  );
}

function HomePage({ goTo }: { goTo: (page: Page) => void }) {
  return (
    <main className="site-page">
      <section className="hero">
        <p className="hero-kicker">base-ic</p>
        <h1>Build fast, theme deeply.</h1>
        <p className="hero-copy">
          Base-ic gives you an ergonomic component API with a token system designed to be extended,
          not fought. Ship brand-aligned interfaces with predictable semantics and production-ready primitives.
        </p>
        <div className="hero-actions">
          <button className="site-button site-button-solid" onClick={() => goTo('docs')}>Read Docs</button>
          <button className="site-button site-button-ghost" onClick={() => goTo('playground')}>Open Playground</button>
        </div>
      </section>

      <section className="marketing-grid">
        {[
          ['Token-first architecture', 'Semantic tokens separate intent from implementation so your design changes propagate predictably.'],
          ['Composable theme runtime', 'Accent, neutral, radius, and scale are runtime knobs, all exposed through strongly typed props.'],
          ['Base UI foundation', 'Built on modern accessible primitives so behavior and interaction quality stay high by default.'],
        ].map(([title, body]) => (
          <article key={title} className="marketing-card">
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </section>

      <section className="marketing-band">
        <div>
          <h2>From prototype to product system</h2>
          <p>
            Start with out-of-the-box primitives, then progressively codify your brand, status patterns,
            and scaling model without rewriting component internals.
          </p>
        </div>
      </section>
    </main>
  );
}

function DocsPage({
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

  const installSnippet = "npm install base-ic";
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
    '<Tooltip content=\"Helpful context\" side=\"top\">',
    '  <button>Hover me</button>',
    '</Tooltip>',
  ].join('\n');

  const popoverSnippet = [
    "import { Popover } from 'base-ic';",
    '',
    '<Popover',
    '  side=\"bottom\"',
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

function CustomizationPage({ goTo }: { goTo: (page: Page) => void }) {
  const customColorSnippet = [
    '<Theme',
    '  accentColor="brand"',
    '  customColors={{',
    '    brand: {',
    "      1: 'oklch(98% 0.01 250)',",
    "      2: 'oklch(96% 0.02 250)',",
    "      3: 'oklch(93% 0.04 250)',",
    "      4: 'oklch(89% 0.06 250)',",
    "      5: 'oklch(84% 0.08 250)',",
    "      6: 'oklch(77% 0.10 250)',",
    "      7: 'oklch(69% 0.12 250)',",
    "      8: 'oklch(60% 0.14 250)',",
    "      9: 'oklch(52% 0.15 250)',",
    "      10: 'oklch(46% 0.15 250)',",
    "      11: 'oklch(38% 0.13 250)',",
    "      12: 'oklch(22% 0.08 250)',",
    "      contrast: 'white',",
    '    },',
    '  }}',
    '>',
    '  <App />',
    '</Theme>',
  ].join('\n');

  const fontSnippet = [
    '<Theme',
    '  fontFamily={{',
    "    primary: 'Inter, ui-sans-serif, system-ui, sans-serif',",
    "    display: 'Sora, Inter, ui-sans-serif, system-ui, sans-serif',",
    "    monospace: 'JetBrains Mono, ui-monospace, monospace',",
    '  }}',
    '>',
    '  <App />',
    '</Theme>',
  ].join('\n');

  const semanticSnippet = [
    ':root {',
    '  --button-min-height: 2.75rem;',
    '  --button-padding-x: 1rem;',
    '  --surface-radius: 10px;',
    '  --status-badge-min-height: 1.75rem;',
    '}',
  ].join('\n');

  return (
    <main className="site-page docs-page">
      <section className="docs-section">
        <h1>Customization</h1>
        <p>
          Base-ic is designed to be customized through `Theme` props and semantic CSS tokens.
          Start with runtime props, then promote stable patterns into tokens.
        </p>
      </section>

      <section className="docs-section">
        <h2>1. Extend Color Palettes</h2>
        <p>
          Add brand palettes with `customColors`, then point `accentColor` at your custom name.
          Provide all 12 steps plus a contrast color for solid fills.
        </p>
        <CodeBlock title="Custom Color Palette" code={customColorSnippet} />
      </section>

      <section className="docs-section">
        <h2>2. Override Font Families</h2>
        <p>
          Set `fontFamily` slots for primary UI text, display typography, and monospace surfaces.
          Unspecified slots continue to inherit defaults.
        </p>
        <CodeBlock title="Font Family Overrides" code={fontSnippet} />
      </section>

      <section className="docs-section">
        <h2>3. Tune Semantic Tokens</h2>
        <p>
          Use semantic tokens for reusable patterns like buttons, surfaces, badges, and status components.
          These tokens automatically participate in theme scaling.
        </p>
        <CodeBlock title="Semantic Token Overrides" code={semanticSnippet} />
      </section>

      <section className="docs-section">
        <h2>Recommended Workflow</h2>
        <ul className="docs-list">
          <li>1. Pick accent/gray/radius/scaling/appearance in Theme props.</li>
          <li>2. Define brand color ramps with `customColors` when defaults are not enough.</li>
          <li>3. Set typography with `fontFamily` slots.</li>
          <li>4. Move shared UI decisions into semantic tokens.</li>
          <li>5. Validate combinations in the playground.</li>
        </ul>
        <button className="site-button site-button-solid" onClick={() => goTo('playground')}>
          Open Playground
        </button>
      </section>
    </main>
  );
}

type CopyStatus = 'idle' | 'copied' | 'error';

function CodeBlock({ title, code }: { title?: string; code: string }) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle');

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('error');
    }
    window.setTimeout(() => setCopyStatus('idle'), 1400);
  };

  return (
    <div className="docs-code-block">
      <div className="docs-code-header">
        <strong>{title ?? 'Example'}</strong>
        <button
          type="button"
          className="docs-copy-button"
          data-state={copyStatus}
          onClick={onCopy}
          title={copyStatus === 'copied' ? 'Copied' : copyStatus === 'error' ? 'Copy failed' : 'Copy code'}
          aria-label={copyStatus === 'copied' ? 'Copied' : copyStatus === 'error' ? 'Copy failed' : 'Copy code'}
        >
          {copyStatus === 'copied' ? (
            <IconCheck className="docs-copy-icon" />
          ) : copyStatus === 'error' ? (
            <IconAlert className="docs-copy-icon" />
          ) : (
            <IconCopy className="docs-copy-icon" />
          )}
        </button>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  );
}

function ForDesignersPage({ goTo }: { goTo: (page: Page) => void }) {
  const primitiveTokensJson = JSON.stringify({
    color: {
      blue: {
        1: '{color.blue.1}',
        2: '{color.blue.2}',
        3: '{color.blue.3}',
        4: '{color.blue.4}',
        5: '{color.blue.5}',
        6: '{color.blue.6}',
        7: '{color.blue.7}',
        8: '{color.blue.8}',
        9: '{color.blue.9}',
        10: '{color.blue.10}',
        11: '{color.blue.11}',
        12: '{color.blue.12}',
        contrast: '{color.blue.contrast}',
      },
      gray: {
        1: '{color.gray.1}',
        2: '{color.gray.2}',
        3: '{color.gray.3}',
        4: '{color.gray.4}',
        5: '{color.gray.5}',
        6: '{color.gray.6}',
        7: '{color.gray.7}',
        8: '{color.gray.8}',
        9: '{color.gray.9}',
        10: '{color.gray.10}',
        11: '{color.gray.11}',
        12: '{color.gray.12}',
        contrast: '{color.gray.contrast}',
      },
    },
    space: {
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      9: '40px',
      10: '48px',
      11: '64px',
      12: '80px',
    },
    radius: {
      1: '2px',
      2: '4px',
      3: '6px',
      4: '8px',
      5: '12px',
      6: '16px',
      full: '9999px',
    },
    typography: {
      'font-size': {
        1: '12px',
        2: '13px',
        3: '14px',
        4: '16px',
        5: '18px',
        6: '20px',
        7: '24px',
        8: '30px',
        9: '36px',
      },
      'font-family': {
        primary: 'Inter, ui-sans-serif, system-ui, sans-serif',
        display: 'Sora, Inter, ui-sans-serif, system-ui, sans-serif',
        mono: 'JetBrains Mono, ui-monospace, monospace',
      },
    },
  }, null, 2);

  const semanticTokensJson = JSON.stringify({
    color: {
      accent: {
        1: '{color.blue.1}',
        2: '{color.blue.2}',
        3: '{color.blue.3}',
        4: '{color.blue.4}',
        5: '{color.blue.5}',
        6: '{color.blue.6}',
        7: '{color.blue.7}',
        8: '{color.blue.8}',
        9: '{color.blue.9}',
        10: '{color.blue.10}',
        11: '{color.blue.11}',
        12: '{color.blue.12}',
        contrast: '{color.blue.contrast}',
      },
      neutral: {
        1: '{color.gray.1}',
        2: '{color.gray.2}',
        3: '{color.gray.3}',
        4: '{color.gray.4}',
        5: '{color.gray.5}',
        6: '{color.gray.6}',
        7: '{color.gray.7}',
        8: '{color.gray.8}',
        9: '{color.gray.9}',
        10: '{color.gray.10}',
        11: '{color.gray.11}',
        12: '{color.gray.12}',
      },
      text: {
        primary: '{color.neutral.12}',
        secondary: '{color.neutral.11}',
        tertiary: '{color.neutral.10}',
        disabled: '{color.neutral.8}',
      },
      border: {
        subtle: '{color.neutral.6}',
        default: '{color.neutral.7}',
        strong: '{color.neutral.8}',
      },
      surface: {
        base: '{color.neutral.1}',
        subtle: '{color.neutral.2}',
        raised: '#ffffff',
        overlay: '#ffffff',
      },
      status: {
        danger: {
          bg: '{color.red.3}',
          border: '{color.red.7}',
          text: '{color.red.11}',
          solid: '{color.red.9}',
          contrast: '{color.red.contrast}',
        },
        success: {
          bg: '{color.green.3}',
          border: '{color.green.7}',
          text: '{color.green.11}',
          solid: '{color.green.9}',
          contrast: '{color.green.contrast}',
        },
        warning: {
          bg: '{color.orange.3}',
          border: '{color.orange.7}',
          text: '{color.orange.11}',
          solid: '{color.orange.9}',
          contrast: '{color.orange.contrast}',
        },
        info: {
          bg: '{color.blue.3}',
          border: '{color.blue.7}',
          text: '{color.blue.11}',
          solid: '{color.blue.9}',
          contrast: '{color.blue.contrast}',
        },
      },
    },
  }, null, 2);

  const componentPatternTokensJson = JSON.stringify({
    component: {
      radius: '{radius.3}',
      scale: '1',
      button: {
        'padding-y': '{space.2}',
        'padding-x': '{space.4}',
        'min-height': '40px',
        'font-size': '{typography.font-size.3}',
        radius: '{component.radius}',
      },
      badge: {
        'padding-y': '{space.1}',
        'padding-x': '{space.3}',
        'min-height': '32px',
        'font-size': '{typography.font-size.2}',
        radius: '{radius.full}',
      },
      surface: {
        'padding-y': '{space.4}',
        'padding-x': '{space.4}',
        radius: 'min({component.radius}, {radius.4})',
      },
    },
  }, null, 2);

  return (
    <main className="site-page docs-page">
      <section className="docs-section">
        <h1>For Designers</h1>
        <p>
          Use these token conventions to set up Figma variables quickly and keep your designs aligned with Base-IC semantics.
          Product teams can then swap themes in code without redesigning component structure.
        </p>
      </section>

      <section className="docs-section">
        <h2>Token Scales at a Glance</h2>
        <div className="designer-grid">
          <article className="designer-card">
            <h3>Color Steps</h3>
            <p>Every hue uses a 12-step scale plus contrast.</p>
            <p className="designer-note">1-2 backgrounds, 3-5 subtle surfaces, 6-8 borders, 9-10 solid fills, 11-12 text/icons.</p>
          </article>
          <article className="designer-card">
            <h3>Spacing</h3>
            <p>`space-1` to `space-12` (4px to 80px)</p>
            <p className="designer-note">Use these for padding, gap, section rhythm, and component internals.</p>
          </article>
          <article className="designer-card">
            <h3>Radius</h3>
            <p>`radius-1` to `radius-6` plus `radius-full`</p>
            <p className="designer-note">Component rounding is controlled globally through `component-radius`.</p>
          </article>
          <article className="designer-card">
            <h3>Type Scale</h3>
            <p>`font-size-1` to `font-size-9` (12px to 36px)</p>
            <p className="designer-note">Map to text styles in Figma so docs and UI match in both tools.</p>
          </article>
        </div>
      </section>

      <section className="docs-section">
        <h2>Copyable JSON Token Objects</h2>
        <p>
          These JSON objects are formatted for quick copy/paste into design-token plugins,
          internal scripts, or handoff docs used by your Figma team.
        </p>
        <CodeBlock title="Primitives (colors, spacing, type, radius)" code={primitiveTokensJson} />
        <CodeBlock title="Semantics (accent, neutral, text, surfaces, status)" code={semanticTokensJson} />
        <CodeBlock title="Component Patterns (button, badge, surface)" code={componentPatternTokensJson} />
      </section>

      <section className="docs-section">
        <h2>Figma Variable Naming</h2>
        <p>
          Mirror code token names in Figma variables to reduce translation overhead during handoff.
          Keep aliases (`accent`, `neutral`, `status`) separate from raw hue scales.
        </p>
        <CodeBlock title="Figma Variable Naming" code={[
          'color/blue/1',
          'color/blue/2',
          '...',
          'color/blue/12',
          'color/blue/contrast',
          'color/accent/1',
          '...',
          'color/accent/12',
          'color/neutral/1',
          '...',
          'color/neutral/12',
          'font/family/primary',
          'font/family/display',
          'font/family/mono',
          'radius/1',
          'radius/2',
          '...',
          'radius/full',
        ].join('\n')} />
      </section>

      <section className="docs-section">
        <h2>Recommended Figma Setup Workflow</h2>
        <ul className="docs-list">
          <li>1. Create color collections for each hue with 1-12 + contrast variables.</li>
          <li>2. Create semantic aliases: accent, neutral, text, border, surface, status.</li>
          <li>3. Create primitive collections for spacing, radius, and type scale.</li>
          <li>4. Build component libraries using only semantic variables for fill/stroke/text.</li>
          <li>5. Validate themes in Playground and sync any token changes back to Figma.</li>
        </ul>
        <div className="hero-actions">
          <button className="site-button site-button-solid" onClick={() => goTo('playground')}>
            Open Playground
          </button>
          <button className="site-button site-button-ghost" onClick={() => goTo('customization')}>
            View Customization
          </button>
        </div>
      </section>
    </main>
  );
}

function PlaygroundPage({ radius }: { radius: Radius }) {
  return (
    <main className="site-page playground-page">
      <div className="playground">
        <h1>Playground</h1>
        <p>
          Interactive token and theme exploration. Use the floating panel in the bottom-right to tweak theme values.
        </p>

        <h2>Color Palette</h2>

        <h3>Accent</h3>
        <div className="swatch-grid">
          {STEPS.map((step) => (
            <div
              key={step}
              className="swatch"
              style={{ background: `var(--color-accent-${step})` }}
              title={`--color-accent-${step}`}
            />
          ))}
        </div>
        <div className="swatch-label">{STEPS.map((s) => s).join('   ')}</div>

        <h3>Neutral</h3>
        <div className="swatch-grid">
          {STEPS.map((step) => (
            <div
              key={step}
              className="swatch"
              style={{ background: `var(--color-neutral-${step})` }}
              title={`--color-neutral-${step}`}
            />
          ))}
        </div>

        <h3>All Hues</h3>
        {ALL_HUES.map((hue) => (
          <div key={hue} style={{ marginBottom: 'var(--space-2)' }}>
            <div className="swatch-label">{hue}</div>
            <div className="swatch-grid">
              {STEPS.map((step) => (
                <div
                  key={step}
                  className="swatch"
                  style={{ background: `var(--color-${hue}-${step})` }}
                  title={`--color-${hue}-${step}`}
                />
              ))}
            </div>
          </div>
        ))}

        <h2>Status Colors</h2>
        <div className="surface-grid">
          {(['danger', 'success', 'warning', 'info'] as const).map((status) => (
            <div
              key={status}
              className="surface-card status-card"
              style={{
                background: `var(--color-${status}-bg)`,
                borderColor: `var(--color-${status}-border)`,
              }}
            >
              <div className="surface-card-title status-card-title" style={{ color: `var(--color-${status}-text)` }}>
                {status}
              </div>
              <div className="surface-card-body status-card-body" style={{ color: `var(--color-${status}-text)` }}>
                Sample {status} message
              </div>
              <div
                className="status-badge"
                style={{
                  background: `var(--color-${status}-solid)`,
                  color: `var(--color-${status}-contrast)`,
                }}
              >
                {status} solid
              </div>
            </div>
          ))}
        </div>

        <h2>Surfaces</h2>
        <div className="surface-grid">
          {([
            ['base', '--color-surface-base'],
            ['subtle', '--color-surface-subtle'],
            ['raised', '--color-surface-raised'],
            ['overlay', '--color-surface-overlay'],
          ] as const).map(([name, token]) => (
            <div key={name} className="surface-card" style={{ background: `var(${token})` }}>
              <div className="surface-card-title">{name}</div>
              <div className="surface-card-body">{token}</div>
            </div>
          ))}
        </div>

        <h2>Text Colors</h2>
        <div className="section">
          {([
            ['primary', '--color-text-primary'],
            ['secondary', '--color-text-secondary'],
            ['tertiary', '--color-text-tertiary'],
            ['disabled', '--color-text-disabled'],
            ['link', '--color-text-link'],
          ] as const).map(([name, token]) => (
            <div key={name} className="token-row">
              <span style={{ color: `var(${token})`, fontSize: 'var(--font-size-5)', fontWeight: 500, minWidth: 200 }}>
                {name} text
              </span>
              <span className="token-name">{token}</span>
            </div>
          ))}
        </div>

        <h2>Tooltip</h2>
        <div className="tooltip-demo-row">
          <Tooltip content="Top tooltip" side="top">
            <button className="tooltip-demo-trigger">Hover top</button>
          </Tooltip>
          <Tooltip content="Right tooltip" side="right">
            <button className="tooltip-demo-trigger">Hover right</button>
          </Tooltip>
          <Tooltip content="Bottom tooltip" side="bottom">
            <button className="tooltip-demo-trigger">Hover bottom</button>
          </Tooltip>
        </div>

        <h2>Popover</h2>
        <div className="popover-demo-row">
          <Popover
            side="bottom"
            align="start"
            content={(
              <div className="popover-demo-content">
                <div className="popover-demo-title">Theme Preset</div>
                <p className="popover-demo-text">Apply a compact, high-contrast preset for dashboards.</p>
                <div className="popover-demo-actions">
                  <button className="popover-demo-button popover-demo-button-solid">Apply</button>
                  <button className="popover-demo-button popover-demo-button-ghost">Dismiss</button>
                </div>
              </div>
            )}
          >
            <button className="tooltip-demo-trigger">Open popover</button>
          </Popover>

          <Popover
            side="right"
            align="center"
            content={(
              <div className="popover-demo-content">
                <div className="popover-demo-title">Token Hint</div>
                <p className="popover-demo-text">Use semantic aliases for surfaces and text before tuning component tokens.</p>
              </div>
            )}
          >
            <button className="tooltip-demo-trigger">Open right</button>
          </Popover>
        </div>

        <h2>Spacing</h2>
        <div className="spacing-row">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((step) => (
            <div key={step} className="spacing-block">
              <div
                style={{
                  width: `var(--space-${step})`,
                  height: `var(--space-${step})`,
                  background: 'var(--color-accent-9)',
                  borderRadius: 'var(--radius-1)',
                }}
              />
              <span>{step}</span>
            </div>
          ))}
        </div>

        <h2>Border Radius</h2>
        <div className="radius-row">
          {[
            ['1', '--radius-1'],
            ['2', '--radius-2'],
            ['3', '--radius-3'],
            ['4', '--radius-4'],
            ['5', '--radius-5'],
            ['6', '--radius-6'],
            ['full', '--radius-full'],
          ].map(([name, token]) => (
            <div key={name} className="spacing-block">
              <div className="radius-block" style={{ borderRadius: `var(${token})` }}>{name}</div>
              <span>{token.replace('--radius-', '')}</span>
            </div>
          ))}
        </div>

        <h2>Component Radius (via Theme)</h2>
        <p>Current: <code>{radius}</code></p>
        <div className="spacing-row">
          <div className="demo-button">Button-ish</div>
          <div className="demo-card">Card-ish</div>
        </div>
      </div>
    </main>
  );
}

export default function App() {
  const [accent, setAccent] = useState<AccentColor>('blue');
  const [gray, setGray] = useState<GrayColor>('gray');
  const [radius, setRadius] = useState<Radius>('medium');
  const [scaling, setScaling] = useState<Scaling>('100%');
  const [appearance, setAppearance] = useState<Appearance>('light');
  const [route, setRoute] = useState<RouteState>(() => getRouteFromPath(window.location.pathname));

  useEffect(() => {
    const onPopState = () => setRoute(getRouteFromPath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const goTo = (nextPage: Page, docsSection: DocsSection = route.docsSection) => {
    const nextPath = pageToPath(nextPage, docsSection);
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath);
    }
    setRoute({ page: nextPage, docsSection: nextPage === 'docs' ? docsSection : 'overview' });
  };

  const goToDocsSection = (section: DocsSection) => {
    goTo('docs', section);
  };

  const pageContent = useMemo(() => {
    if (route.page === 'docs') return <DocsPage section={route.docsSection} goToDocsSection={goToDocsSection} />;
    if (route.page === 'customization') return <CustomizationPage goTo={goTo} />;
    if (route.page === 'for-designers') return <ForDesignersPage goTo={goTo} />;
    if (route.page === 'playground') return <PlaygroundPage radius={radius} />;
    return <HomePage goTo={goTo} />;
  }, [route, radius]);

  return (
    <Theme
      accentColor={accent}
      grayColor={gray}
      radius={radius}
      scaling={scaling}
      appearance={appearance}
      fontFamily={{
        primary: '"Sen", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        secondary: '"Sen", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        display: '"Sen", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <div className="site-shell">
        <header className="site-header">
          <button className="site-logo" onClick={() => goTo('home')}>base-ic</button>
          <nav className="site-nav" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.page}
                className="site-nav-link"
                data-active={route.page === item.page}
                onClick={() => goTo(item.page)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </header>

        {pageContent}
      </div>

      <ThemePanel
        accent={accent}
        setAccent={setAccent}
        gray={gray}
        setGray={setGray}
        radius={radius}
        setRadius={setRadius}
        scaling={scaling}
        setScaling={setScaling}
        appearance={appearance}
        setAppearance={setAppearance}
        defaultOpen={route.page === 'playground'}
      />
    </Theme>
  );
}
