import { Box, Grid } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DocsSection } from '../../components/DocsSection';
import { DemoCard } from './DemoCard';

export function GridDocsPage() {
  const snippet = [
    "import { Grid } from 'base-ic';",
    '',
    '<Grid columns="repeat(3, minmax(0, 1fr))" gap={3}>',
    '  <Card />',
    '  <Card />',
    '  <Card />',
    '</Grid>',
  ].join('\n');
  const threeColDemoSnippet = [
    '<Grid columns="repeat(3, minmax(0, 1fr))" gap={2}>',
    '  {[1, 2, 3].map((n) => (',
    '    <Box key={n} className="docs-layout-chip">Item {n}</Box>',
    '  ))}',
    '</Grid>',
  ].join('\n');
  const autofitDemoSnippet = [
    '<Grid columns="repeat(auto-fit, minmax(110px, 1fr))" gap={2}>',
    "  {['Metrics', 'Events', 'Revenue', 'Growth'].map((n) => (",
    '    <Box key={n} className="docs-layout-chip">{n}</Box>',
    '  ))}',
    '</Grid>',
  ].join('\n');

  return (
    <>
      <DocsSection>
        <h1>Grid</h1>
        <p>
          `Grid` is the responsive grid primitive for equal columns, dashboard tiles, and dense content layouts.
          Use token gaps and explicit template controls for predictable spacing.
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Demo</h2>
        <div className="docs-demo-grid">
          <DemoCard title="Three Column Grid" description="Simple card layout with equal tracks." code={threeColDemoSnippet}>
            <Grid columns="repeat(3, minmax(0, 1fr))" gap={2}>
              {[1, 2, 3].map((n) => (
                <Box key={n} className="docs-layout-chip">Item {n}</Box>
              ))}
            </Grid>
          </DemoCard>
          <DemoCard title="Auto-fit Grid" description="Responsive tracks that collapse gracefully." code={autofitDemoSnippet}>
            <Grid columns="repeat(auto-fit, minmax(110px, 1fr))" gap={2}>
              {['Metrics', 'Events', 'Revenue', 'Growth'].map((n) => (
                <Box key={n} className="docs-layout-chip">{n}</Box>
              ))}
            </Grid>
          </DemoCard>
        </div>
      </DocsSection>
      <DocsSection>
        <h2>Usage</h2>
        <CodeBlock title="Grid Usage" code={snippet} />
      </DocsSection>
    </>
  );
}
