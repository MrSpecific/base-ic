import { Card } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DocsDemoGrid } from '../../components/DocsPrimitives';
import { DocsSection } from '../../components/DocsSection';
import { DemoCard } from './DemoCard';

export function CardDocsPage() {
  const usageSnippet = [
    "import { Card } from '@wlcr/base-ic';",
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
    '  <Card variant="gradient">Gradient card</Card>',
    '  <Card variant="ghost">Ghost card</Card>',
    '</div>',
  ].join('\n');

  const interactiveSnippet = [
    '<Card render={<button type="button" />} variant="surface" size="3">',
    '  <h4>Clickable card</h4>',
    '  <p>Useful for dashboards and selection UIs.</p>',
    '</Card>',
  ].join('\n');

  const renderPropSnippet = [
    "import { Link as RouterLink } from 'react-router-dom';",
    '',
    '<Card render={<RouterLink to="/projects/1" />} variant="surface">',
    '  <h4>Whole-card navigation</h4>',
    '  <p>Render as any element — a router Link, an anchor, a real button.</p>',
    '</Card>',
  ].join('\n');
  const spacingSnippet = [
    '<Card',
    '  variant="surface"',
    '  p="5"',
    '  px="6"',
    '  mt="4"',
    '  mb="2"',
    '>',
    '  <h4>Spacing-controlled card</h4>',
    '  <p>Use margin and padding shorthands directly on Card.</p>',
    '</Card>',
  ].join('\n');

  return (
    <>
      <DocsSection>
        <h1>Card</h1>
        <p>
          `Card` is a surface primitive for grouping related content. It supports visual variants and optional
          interactive affordances, including a theme-aware gradient style.
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Making a card interactive</h2>
        <p>
          Pass <code>render</code> to render Card as any element — a real <code>&lt;button&gt;</code>, an anchor,
          or a router <code>Link</code> — while keeping Card's own styling. The rendered element owns real keyboard
          semantics natively (Enter/Space for a button, native navigation for a link), so no ARIA patching is
          needed.
        </p>
        <p>
          The older <code>asButton</code> boolean is deprecated: it renders a real <code>&lt;button&gt;</code> under
          the hood now (sugar for <code>render=&#123;&lt;button type=&quot;button&quot; /&gt;&#125;</code>), but it
          previously set <code>role=&quot;button&quot;</code> on a <code>&lt;div&gt;</code> without wiring up
          Enter/Space — a real keyboard-accessibility bug. Prefer <code>render</code> directly; <code>asButton</code>
          will be removed in a future minor version.
        </p>
        <CodeBlock title="Card render prop" code={renderPropSnippet} />
      </DocsSection>
      <DocsSection>
        <h2>Demo</h2>
        <DocsDemoGrid>
          <DemoCard title="Variants" description="Pick the appropriate surface style." code={variantsSnippet}>
            <DocsDemoGrid>
              <Card variant="surface">Surface card</Card>
              <Card variant="classic">Classic card</Card>
              <Card variant="gradient">Gradient card</Card>
              <Card variant="ghost">Ghost card</Card>
            </DocsDemoGrid>
          </DemoCard>
          <DemoCard title="Interactive" description="Render as a real button via `render` for hover/press/focus + native keyboard support." code={interactiveSnippet}>
            <Card render={<button type="button" />} variant="surface" size="3">
              <h4>Clickable card</h4>
              <p>Useful for dashboards and selection UIs.</p>
            </Card>
          </DemoCard>
          <DemoCard
            title="Spacing Props"
            description="Control card spacing inline with margin/padding props."
            code={spacingSnippet}
          >
            <div>
              <Card variant="classic" p="2">
                <p style={{ margin: 0 }}>Reference card (p=2)</p>
              </Card>
              <Card variant="surface" p="5" px="6" mt="4" mb="2">
                <h4>Spacing-controlled card</h4>
                <p>Use margin and padding shorthands directly on Card.</p>
              </Card>
            </div>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <h2>Usage</h2>
        <CodeBlock title="Card Usage" code={usageSnippet} />
        <CodeBlock title="Card Spacing Props" code={spacingSnippet} />
      </DocsSection>
    </>
  );
}
