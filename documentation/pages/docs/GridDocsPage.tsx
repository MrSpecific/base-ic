import { Box, Grid } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DocsDemoGrid } from '../../components/DocsPrimitives';
import { DocsSection } from '../../components/DocsSection';
import { PropsTable } from '../../components/PropsTable';
import { DemoCard } from './DemoCard';

export function GridDocsPage() {
  const snippet = [
    "import { Card, Grid } from '@wlcr/base-ic';",
    '',
    '<Grid columns={3} gap={3}>',
    '  <Card />',
    '  <Card />',
    '  <Card />',
    '</Grid>',
  ].join('\n');
  const threeColDemoSnippet = [
    '// columns={3} (or "3") expands to repeat(3, minmax(0, 1fr))',
    '<Grid columns={3} gap={2}>',
    '  {[1, 2, 3].map((n) => (',
    '    <Box key={n} className="docs-layout-chip">Item {n}</Box>',
    '  ))}',
    '</Grid>',
  ].join('\n');
  const rowsDemoSnippet = [
    '<Grid columns="2fr 1fr" rows={2} autoFlow="column" gap={2}>',
    "  {['A', 'B', 'C', 'D'].map((n) => (",
    '    <Box key={n} className="docs-layout-chip">{n}</Box>',
    '  ))}',
    '</Grid>',
  ].join('\n');
  const responsiveDemoSnippet = [
    '// 1 column on phones, 2 from sm (40rem), 4 from lg (64rem)',
    '<Grid columns={{ initial: 1, sm: 2, lg: 4 }} gap={{ initial: 2, md: 3 }}>',
    "  {['A', 'B', 'C', 'D'].map((n) => (",
    '    <Box key={n} className="docs-layout-chip">{n}</Box>',
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
          Pass a count ({'`columns={3}`'}) for equal tracks, or any CSS track list for full control, and use
          token gaps for predictable spacing.
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Demo</h2>
        <DocsDemoGrid>
          <DemoCard
            title="Three Column Grid"
            description="A number (or digit string) creates that many equal tracks: `columns={3}` → `repeat(3, minmax(0, 1fr))`."
            code={threeColDemoSnippet}
          >
            <Grid columns={3} gap={2}>
              {[1, 2, 3].map((n) => (
                <Box key={n} className="docs-layout-chip">Item {n}</Box>
              ))}
            </Grid>
          </DemoCard>
          <DemoCard
            title="Track Lists and Rows"
            description={'Mix a CSS track list for columns with a row count; `autoFlow="column"` fills each column first.'}
            code={rowsDemoSnippet}
          >
            <Grid columns="2fr 1fr" rows={2} autoFlow="column" gap={2}>
              {['A', 'B', 'C', 'D'].map((n) => (
                <Box key={n} className="docs-layout-chip">{n}</Box>
              ))}
            </Grid>
          </DemoCard>
          <DemoCard
            title="Responsive Columns"
            description="Pass an object of values per breakpoint. Resize the window to see the columns change. See Responsive props for every breakpoint."
            code={responsiveDemoSnippet}
          >
            <Grid columns={{ initial: 1, sm: 2, lg: 4 }} gap={{ initial: 2, md: 3 }}>
              {['A', 'B', 'C', 'D'].map((n) => (
                <Box key={n} className="docs-layout-chip">{n}</Box>
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
              type: "Responsive<React.CSSProperties['gridTemplateColumns'] | number>",
              description:
                "Sets `grid-template-columns`. A number or digit-only string is a track count: `3` / `\"3\"` → `repeat(3, minmax(0, 1fr))`. Any other string is used as-is (e.g. `'200px 1fr'`).",
            },
            {
              name: 'rows',
              type: "Responsive<React.CSSProperties['gridTemplateRows'] | number>",
              description:
                'Sets `grid-template-rows`. Like `columns`, a number or digit-only string expands to `repeat(N, minmax(0, 1fr))`; other strings are used as-is.',
            },
            {
              name: 'autoFlow',
              type: "Responsive<React.CSSProperties['gridAutoFlow']>",
              description: 'Sets `grid-auto-flow`.',
            },
            {
              name: 'align',
              type: "Responsive<React.CSSProperties['alignItems']>",
              description: 'Sets `align-items`.',
            },
            {
              name: 'justify',
              type: "Responsive<React.CSSProperties['justifyItems']>",
              description: 'Sets `justify-items`.',
            },
            {
              name: 'gap',
              type: 'Responsive<number | string>',
              description:
                'Gap between grid cells. Numbers and digit-only strings map to space tokens (`2` → `var(--space-2)`); other strings are raw CSS lengths.',
            },
            {
              name: 'p',
              type: 'Responsive<SpaceValue>',
              description: 'Padding on all sides. Numbers map to spacing scale tokens.',
            },
            {
              name: 'px',
              type: 'Responsive<SpaceValue>',
              description: 'Horizontal padding (left and right).',
            },
            {
              name: 'py',
              type: 'Responsive<SpaceValue>',
              description: 'Vertical padding (top and bottom).',
            },
            {
              name: 'pt',
              type: 'Responsive<SpaceValue>',
              description: 'Padding top.',
            },
            {
              name: 'pr',
              type: 'Responsive<SpaceValue>',
              description: 'Padding right.',
            },
            {
              name: 'pb',
              type: 'Responsive<SpaceValue>',
              description: 'Padding bottom.',
            },
            {
              name: 'pl',
              type: 'Responsive<SpaceValue>',
              description: 'Padding left.',
            },
            {
              name: 'm',
              type: 'Responsive<SpaceValue>',
              description: 'Margin on all sides. Numbers map to spacing scale tokens.',
            },
            {
              name: 'mx',
              type: 'Responsive<SpaceValue>',
              description: 'Horizontal margin (left and right).',
            },
            {
              name: 'my',
              type: 'Responsive<SpaceValue>',
              description: 'Vertical margin (top and bottom).',
            },
            {
              name: 'mt',
              type: 'Responsive<SpaceValue>',
              description: 'Margin top.',
            },
            {
              name: 'mr',
              type: 'Responsive<SpaceValue>',
              description: 'Margin right.',
            },
            {
              name: 'mb',
              type: 'Responsive<SpaceValue>',
              description: 'Margin bottom.',
            },
            {
              name: 'ml',
              type: 'Responsive<SpaceValue>',
              description: 'Margin left.',
            },
            {
              name: 'width, minWidth, maxWidth, height, minHeight, maxHeight',
              type: 'Responsive<number | string>',
              description:
                'Sizing shorthands. Numbers are pixels (`320` → `320px`, as in React `style`); strings are any CSS length (`"50%"`, `"20rem"`). Only applied when passed.',
            },
            {
              name: 'container',
              type: 'boolean',
              default: 'false',
              description:
                'Makes this element a query container (`container-type: inline-size`), so `@` breakpoints on descendants respond to its width. See Responsive props.',
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
