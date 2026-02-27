import { Theme } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
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
        <h2>Live Demos</h2>
        <div className="docs-demo-grid">
          <Theme accentColor="blue" grayColor="slate" radius="medium" scaling="100%" appearance="inherit">
            <DemoCard
              title="Product Theme"
              description="Balanced neutral palette for most product surfaces."
            >
              <p className="docs-demo-eyebrow">Blue + Slate</p>
              <div className="docs-demo-button-row">
                <button className="site-button site-button-solid">Primary Action</button>
                <button className="site-button site-button-ghost">Secondary Action</button>
              </div>
            </DemoCard>
          </Theme>
          <Theme accentColor="orange" grayColor="gray" radius="large" scaling="100%" appearance="inherit">
            <DemoCard
              title="Marketing Theme"
              description="Higher energy accent and softer card shape for campaigns."
            >
              <p className="docs-demo-eyebrow">Orange + Gray</p>
              <div className="docs-demo-button-row">
                <button className="site-button site-button-solid">Get Started</button>
                <button className="site-button site-button-ghost">Learn More</button>
              </div>
            </DemoCard>
          </Theme>
        </div>
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
