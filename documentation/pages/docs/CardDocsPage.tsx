import { Card } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DemoCard } from './DemoCard';

export function CardDocsPage() {
  const usageSnippet = [
    "import { Card } from 'base-ic';",
    '',
    '<Card variant="surface" size="3">',
    '  <h3>Card title</h3>',
    '  <p>Card body copy.</p>',
    '</Card>',
  ].join('\n');

  const variantsSnippet = [
    '<div className="docs-demo-grid">',
    '  <Card variant="surface">Surface card</Card>',
    '  <Card variant="classic">Classic card</Card>',
    '  <Card variant="ghost">Ghost card</Card>',
    '</div>',
  ].join('\n');

  const interactiveSnippet = [
    '<Card asButton variant="surface" size="3">',
    '  <h4>Clickable card</h4>',
    '  <p>Useful for dashboards and selection UIs.</p>',
    '</Card>',
  ].join('\n');

  return (
    <>
      <section className="docs-section">
        <h1>Card</h1>
        <p>
          `Card` is a surface primitive for grouping related content. It supports visual variants and optional
          interactive affordances.
        </p>
      </section>
      <section className="docs-section">
        <h2>Demo</h2>
        <div className="docs-demo-grid">
          <DemoCard title="Variants" description="Pick the appropriate surface style." code={variantsSnippet}>
            <div className="docs-demo-grid">
              <Card variant="surface">Surface card</Card>
              <Card variant="classic">Classic card</Card>
              <Card variant="ghost">Ghost card</Card>
            </div>
          </DemoCard>
          <DemoCard title="Interactive" description="Enable hover/press/focus styles via `asButton`." code={interactiveSnippet}>
            <Card asButton variant="surface" size="3">
              <h4>Clickable card</h4>
              <p>Useful for dashboards and selection UIs.</p>
            </Card>
          </DemoCard>
        </div>
      </section>
      <section className="docs-section">
        <h2>Usage</h2>
        <CodeBlock title="Card Usage" code={usageSnippet} />
      </section>
    </>
  );
}
