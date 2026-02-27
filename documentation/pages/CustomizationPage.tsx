import { Button, Container } from '../../src';
import type { Page } from '../types';
import { CodeBlock } from '../components/CodeBlock';

export function CustomizationPage({ goTo }: { goTo: (page: Page) => void }) {
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
    <Container as="main" className="site-page docs-page">
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
        <Button size="3" onClick={() => goTo('playground')}>Open Playground</Button>
      </section>
    </Container>
  );
}
