import { CodeBlock } from '../../components/CodeBlock';
import { DocsSection } from '../../components/DocsSection';
export function OverviewDocsPage() {
  const installSnippet = 'npm install @wlcr/base-ic';
  const usageSnippet = [
    "import { Theme } from '@wlcr/base-ic';",
    "import '@wlcr/base-ic/tokens';",
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

  return (
    <>
      <DocsSection>
        <h1>Documentation</h1>
        <p>Everything needed to integrate, theme, and extend base-ic in production.</p>
      </DocsSection>
      <DocsSection>
        <h2>Install</h2>
        <CodeBlock title="Install" code={installSnippet} />
      </DocsSection>
      <DocsSection>
        <h2>Quick Start</h2>
        <CodeBlock title="Quick Start" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <h2>Theme API</h2>
        <p>
          `Theme` sets accent, neutral palette, radius, scale, and appearance while keeping token semantics stable.
          Scaling supports `80%` through `150%`.
        </p>
        <CodeBlock title="Theme API Example" code={themingSnippet} />
      </DocsSection>
      <DocsSection>
        <h2>Status Patterns</h2>
        <p>
          Use semantic tokens like `--status-surface-*`, `--status-badge-*`, `--button-*`, and `--badge-*`
          to keep visual behavior consistent across the product.
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Layout Primitives</h2>
        <p>
          Build structure with `Box`, `Flex`, `Grid`, `Container`, and `Section` before adding visual components.
          This keeps spacing, width constraints, and rhythm aligned with system tokens.
        </p>
      </DocsSection>
    </>
  );
}
