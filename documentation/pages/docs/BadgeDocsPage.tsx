import { Badge } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DemoCard } from './DemoCard';

export function BadgeDocsPage() {
  const usageSnippet = [
    "import { Badge } from 'base-ic';",
    '',
    '<Badge variant="soft" color="blue">New</Badge>',
  ].join('\n');

  const variantsSnippet = [
    '<div className="docs-demo-button-row">',
    '  <Badge variant="solid">Solid</Badge>',
    '  <Badge variant="soft">Soft</Badge>',
    '  <Badge variant="surface">Surface</Badge>',
    '  <Badge variant="outline">Outline</Badge>',
    '</div>',
  ].join('\n');

  const sizesSnippet = [
    '<div className="docs-demo-button-row">',
    '  <Badge size="1">Size 1</Badge>',
    '  <Badge size="2">Size 2</Badge>',
    '  <Badge size="3">Size 3</Badge>',
    '</div>',
  ].join('\n');

  return (
    <>
      <section className="docs-section">
        <h1>Badge</h1>
        <p>
          `Badge` is a compact status/pill component with token-based sizing and visual variants.
        </p>
      </section>
      <section className="docs-section">
        <h2>Demo</h2>
        <div className="docs-demo-grid">
          <DemoCard title="Variants" description="Use shape and fill to express emphasis." code={variantsSnippet}>
            <div className="docs-demo-button-row">
              <Badge variant="solid">Solid</Badge>
              <Badge variant="soft">Soft</Badge>
              <Badge variant="surface">Surface</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </DemoCard>
          <DemoCard title="Sizes" description="Scale badges by context density." code={sizesSnippet}>
            <div className="docs-demo-button-row">
              <Badge size="1">Size 1</Badge>
              <Badge size="2">Size 2</Badge>
              <Badge size="3">Size 3</Badge>
            </div>
          </DemoCard>
        </div>
      </section>
      <section className="docs-section">
        <h2>Usage</h2>
        <CodeBlock title="Badge Usage" code={usageSnippet} />
      </section>
    </>
  );
}
