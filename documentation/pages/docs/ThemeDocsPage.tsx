import { Button, Theme } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DocsDemoGrid, DocsDemoRow, DocsEyebrow, DocsList } from '../../components/DocsPrimitives';
import { DocsSection } from '../../components/DocsSection';
import { DemoCard } from './DemoCard';

export function ThemeDocsPage() {
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
  const productThemeDemoSnippet = [
    "import { Button, Theme } from '@wlcr/base-ic';",
    '',
    '<Theme accentColor="blue" grayColor="slate" radius="medium" scaling="100%">',
    '  <p className="docs-demo-eyebrow">Blue + Slate</p>',
    '  <div className="docs-demo-button-row">',
    '    <Button variant="solid" size="3">Primary Action</Button>',
    '    <Button variant="surface" size="3">Secondary Action</Button>',
    '  </div>',
    '</Theme>',
  ].join('\n');

  const marketingThemeDemoSnippet = [
    "import { Button, Theme } from '@wlcr/base-ic';",
    '',
    '<Theme accentColor="orange" grayColor="gray" radius="large" scaling="100%">',
    '  <p className="docs-demo-eyebrow">Orange + Gray</p>',
    '  <div className="docs-demo-button-row">',
    '    <Button variant="solid" size="3">Get Started</Button>',
    '    <Button variant="surface" size="3">Learn More</Button>',
    '  </div>',
    '</Theme>',
  ].join('\n');

  return (
    <>
      <DocsSection>
        <h1>Theme</h1>
        <p>
          `Theme` is the foundation of Base-IC. It controls accent/neutral palettes, radius, scale,
          appearance, and typography slots for every component below it.
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Demo</h2>
        <DocsDemoGrid>
          <Theme accentColor="blue" grayColor="slate" radius="medium" scaling="100%" appearance="inherit">
            <DemoCard
              title="Product Theme"
              description="Balanced neutral palette for most product surfaces."
              code={productThemeDemoSnippet}
            >
              <DocsEyebrow>Blue + Slate</DocsEyebrow>
              <DocsDemoRow>
                <Button variant="solid" size="3">Primary Action</Button>
                <Button variant="surface" size="3">Secondary Action</Button>
              </DocsDemoRow>
            </DemoCard>
          </Theme>
          <Theme accentColor="orange" grayColor="gray" radius="large" scaling="100%" appearance="inherit">
            <DemoCard
              title="Marketing Theme"
              description="Higher energy accent and softer card shape for campaigns."
              code={marketingThemeDemoSnippet}
            >
              <DocsEyebrow>Orange + Gray</DocsEyebrow>
              <DocsDemoRow>
                <Button variant="solid" size="3">Get Started</Button>
                <Button variant="surface" size="3">Learn More</Button>
              </DocsDemoRow>
            </DemoCard>
          </Theme>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <h2>Usage</h2>
        <CodeBlock title="Theme Usage" code={themingSnippet} />
      </DocsSection>
      <DocsSection>
        <h2>Key Props</h2>
        <DocsList>
          <li>`accentColor` and `grayColor` map semantic aliases to hue scales.</li>
          <li>`radius` sets component curvature via `--component-radius`.</li>
          <li>`scaling` remaps primitive spacing/size/type tokens from 80% to 150%.</li>
          <li>`appearance` supports `light`, `dark`, and `inherit` modes.</li>
          <li>`fontFamily` overrides semantic typography slots.</li>
        </DocsList>
      </DocsSection>
    </>
  );
}
