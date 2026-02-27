import { Box, Grid } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
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

  return (
    <>
      <section className="docs-section">
        <h1>Grid</h1>
        <p>
          `Grid` is the responsive grid primitive for equal columns, dashboard tiles, and dense content layouts.
          Use token gaps and explicit template controls for predictable spacing.
        </p>
      </section>
      <section className="docs-section">
        <h2>Live Demos</h2>
        <div className="docs-demo-grid">
          <DemoCard title="Three Column Grid" description="Simple card layout with equal tracks.">
            <Grid columns="repeat(3, minmax(0, 1fr))" gap={2}>
              {[1, 2, 3].map((n) => (
                <Box key={n} className="docs-layout-chip">Item {n}</Box>
              ))}
            </Grid>
          </DemoCard>
          <DemoCard title="Auto-fit Grid" description="Responsive tracks that collapse gracefully.">
            <Grid columns="repeat(auto-fit, minmax(110px, 1fr))" gap={2}>
              {['Metrics', 'Events', 'Revenue', 'Growth'].map((n) => (
                <Box key={n} className="docs-layout-chip">{n}</Box>
              ))}
            </Grid>
          </DemoCard>
        </div>
      </section>
      <section className="docs-section">
        <h2>Usage</h2>
        <CodeBlock title="Grid Usage" code={snippet} />
      </section>
    </>
  );
}
