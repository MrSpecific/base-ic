import { Box, Grid } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DocsDemoGrid } from '../../components/DocsPrimitives';
import { DocsSection } from '../../components/DocsSection';
import { PropsTable } from '../../components/PropsTable';
import { DemoCard } from './DemoCard';

export function GridDocsPage() {
  const snippet = [
    "import { Grid } from '@wlcr/base-ic';",
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
        <DocsDemoGrid>
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
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <h2>Usage</h2>
        <CodeBlock title="Grid Usage" code={snippet} />
      </DocsSection>
      <DocsSection>
        <h2>Props</h2>
        <PropsTable
          rows={[
            {
              name: 'as',
              type: 'React.ElementType',
              default: "'div'",
              description: 'Element or component to render Grid as.',
            },
            {
              name: 'columns',
              type: "React.CSSProperties['gridTemplateColumns']",
              description: "Sets `grid-template-columns` (e.g. `'repeat(3, minmax(0, 1fr))'`).",
            },
            {
              name: 'rows',
              type: "React.CSSProperties['gridTemplateRows']",
              description: 'Sets `grid-template-rows`.',
            },
            {
              name: 'autoFlow',
              type: "React.CSSProperties['gridAutoFlow']",
              description: 'Sets `grid-auto-flow`.',
            },
            {
              name: 'align',
              type: "React.CSSProperties['alignItems']",
              description: 'Sets `align-items`.',
            },
            {
              name: 'justify',
              type: "React.CSSProperties['justifyItems']",
              description: 'Sets `justify-items`.',
            },
            {
              name: 'gap',
              type: 'number | string',
              description: 'Gap between grid cells. Numbers map to spacing scale tokens.',
            },
            {
              name: 'p',
              type: 'SpaceValue',
              description: 'Padding on all sides. Numbers map to spacing scale tokens.',
            },
            {
              name: 'px',
              type: 'SpaceValue',
              description: 'Horizontal padding (left and right).',
            },
            {
              name: 'py',
              type: 'SpaceValue',
              description: 'Vertical padding (top and bottom).',
            },
            {
              name: 'pt',
              type: 'SpaceValue',
              description: 'Padding top.',
            },
            {
              name: 'pr',
              type: 'SpaceValue',
              description: 'Padding right.',
            },
            {
              name: 'pb',
              type: 'SpaceValue',
              description: 'Padding bottom.',
            },
            {
              name: 'pl',
              type: 'SpaceValue',
              description: 'Padding left.',
            },
            {
              name: 'm',
              type: 'SpaceValue',
              description: 'Margin on all sides. Numbers map to spacing scale tokens.',
            },
            {
              name: 'mx',
              type: 'SpaceValue',
              description: 'Horizontal margin (left and right).',
            },
            {
              name: 'my',
              type: 'SpaceValue',
              description: 'Vertical margin (top and bottom).',
            },
            {
              name: 'mt',
              type: 'SpaceValue',
              description: 'Margin top.',
            },
            {
              name: 'mr',
              type: 'SpaceValue',
              description: 'Margin right.',
            },
            {
              name: 'mb',
              type: 'SpaceValue',
              description: 'Margin bottom.',
            },
            {
              name: 'ml',
              type: 'SpaceValue',
              description: 'Margin left.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              description: 'Content rendered inside the Grid.',
            },
          ]}
        />
      </DocsSection>
    </>
  );
}
