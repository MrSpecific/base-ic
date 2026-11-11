import { Box, Grid, Table, breakpoints, containerBreakpoints } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DocsDemoGrid, DocsList } from '../../components/DocsPrimitives';
import { DocsSection } from '../../components/DocsSection';
import { DemoCard } from './DemoCard';

function BreakpointTable({ values, query }: { values: Record<string, string>; query: string }) {
  return (
    <Table.Root size="1" variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Key</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Applies from</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Object.entries(values).map(([key, width]) => (
          <Table.Row key={key}>
            <Table.RowHeaderCell>
              <code>{key}</code>
            </Table.RowHeaderCell>
            <Table.Cell>
              <code>{`${query} (min-width: ${width})`}</code>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

export function ResponsiveDocsPage() {
  const usageSnippet = [
    "import { Grid, Text } from '@wlcr/base-ic';",
    '',
    '// A plain value applies everywhere…',
    '<Grid columns={2} gap={3} />',
    '',
    '// …or pass values per breakpoint, mobile-first.',
    '<Grid columns={{ initial: 1, sm: 2, lg: 4 }} gap={{ initial: 2, md: 4 }} />',
    '<Text size={{ initial: "2", md: "3" }} align={{ initial: "center", md: "left" }} />',
  ].join('\n');

  const viewportDemoSnippet = [
    '<Grid columns={{ initial: 1, sm: 2, lg: 4 }} gap={{ initial: 2, md: 3 }}>',
    "  {['A', 'B', 'C', 'D'].map((n) => (",
    '    <Box key={n} className="docs-layout-chip">{n}</Box>',
    '  ))}',
    '</Grid>',
  ].join('\n');

  const containerDemoSnippet = [
    '// `container` makes the Box a query container; `@` keys inside respond to its width.',
    "<Box container width={320} maxWidth=\"100%\" p=\"3\" style={{ resize: 'horizontal', overflow: 'auto' }}>",
    "  <Grid columns={{ initial: 1, '@sm': 2, '@xl': 3 }} gap=\"2\">",
    "    {['A', 'B', 'C'].map((n) => (",
    '      <Box key={n} className="docs-layout-chip">{n}</Box>',
    '    ))}',
    '  </Grid>',
    '</Box>',
  ].join('\n');

  const precedenceSnippet = [
    '// Larger breakpoints win over smaller ones:',
    '<Box p={{ initial: 2, md: 4, lg: 6 }} />',
    '',
    '// A more specific side wins over a larger breakpoint:',
    '// the top padding stays space-1, even from md up.',
    '<Box pt="1" p={{ md: 4 }} />',
  ].join('\n');

  const constantsSnippet = [
    "import { breakpoints, containerBreakpoints } from '@wlcr/base-ic';",
    "import type { Breakpoint, Responsive } from '@wlcr/base-ic';",
    '',
    "breakpoints.md;            // '48rem'",
    "containerBreakpoints['@sm']; // '24rem'",
    '',
    "type Columns = Responsive<number>; // 3 | { initial?: 3, md?: 4, '@sm'?: 2, … }",
  ].join('\n');

  return (
    <>
      <DocsSection>
        <h1>Responsive props</h1>
        <p>
          Any prop typed `Responsive&lt;T&gt;` takes a plain value or an object of values per breakpoint. Values are
          mobile-first: `initial` applies everywhere, and each breakpoint key applies from that width up.
        </p>
        <p>
          It is pure CSS. Breakpoints compile to media and container queries, so there is no JavaScript at runtime, no
          layout shift, and it works with SSR and React Server Components.
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Usage</h2>
        <CodeBlock title="Responsive props" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <h2>Demo</h2>
        <DocsDemoGrid>
          <DemoCard
            title="Viewport breakpoints"
            description="One column on phones, two from `sm`, four from `lg`. Resize the window to see it change."
            code={viewportDemoSnippet}
          >
            <Grid columns={{ initial: 1, sm: 2, lg: 4 }} gap={{ initial: 2, md: 3 }}>
              {['A', 'B', 'C', 'D'].map((n) => (
                <Box key={n} className="docs-layout-chip">
                  {n}
                </Box>
              ))}
            </Grid>
          </DemoCard>
          <DemoCard
            title="Container breakpoints"
            description="`@` keys follow the width of the nearest `container` ancestor, not the viewport. Drag the corner of the box to resize it."
            code={containerDemoSnippet}
          >
            <Box
              container
              width={320}
              maxWidth="100%"
              p="3"
              style={{ resize: 'horizontal', overflow: 'auto', border: '1px dashed var(--color-border-subtle)' }}
            >
              <Grid columns={{ initial: 1, '@sm': 2, '@xl': 3 }} gap="2">
                {['A', 'B', 'C'].map((n) => (
                  <Box key={n} className="docs-layout-chip">
                    {n}
                  </Box>
                ))}
              </Grid>
            </Box>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <h2>Viewport breakpoints</h2>
        <p>The Tailwind CSS v4 defaults, matched against the viewport width.</p>
        <BreakpointTable values={breakpoints} query="@media" />
      </DocsSection>
      <DocsSection>
        <h2>Container breakpoints</h2>
        <p>
          `@` keys match against the nearest ancestor with the `container` prop. `Box`, `Flex`, `Grid`, `Container` and
          `Section` accept `container`, which sets `container-type: inline-size`.
        </p>
        <DocsList>
          <li>An element can't query itself: put `container` on a parent and the `@` values on its children.</li>
          <li>
            A container's width can't depend on its content. A `container` flex item with no set width can collapse to
            zero, so give it a width or let it stretch.
          </li>
        </DocsList>
        <BreakpointTable values={containerBreakpoints} query="@container" />
      </DocsSection>
      <DocsSection>
        <h2>Precedence</h2>
        <DocsList>
          <li>A larger breakpoint wins over a smaller one.</li>
          <li>When a viewport and a container breakpoint both match, the container breakpoint wins.</li>
          <li>A more specific side wins over a larger breakpoint: `pt` beats `p`, whatever breakpoints they use.</li>
        </DocsList>
        <CodeBlock title="Precedence" code={precedenceSnippet} />
      </DocsSection>
      <DocsSection>
        <h2>Supported props</h2>
        <DocsList>
          <li>Space props (`p`, `px`, `py`, `pt`, `pr`, `pb`, `pl`, `m`, `mx`, `my`, `mt`, `mr`, `mb`, `ml`) on every component that has them.</li>
          <li>`Box`, `Flex`, `Grid`: `width`, `minWidth`, `maxWidth`, `height`, `minHeight`, `maxHeight`.</li>
          <li>`Grid`: `columns`, `rows`, `autoFlow`, `align`, `justify`, `gap`.</li>
          <li>`Flex`: `direction`, `align`, `justify`, `wrap`, `gap`.</li>
          <li>`Container`: `size`, `maxWidth`, `gutter`.</li>
          <li>`Section` and `Card`: `size`.</li>
          <li>`Text` and `Heading`: `size`, `align`.</li>
        </DocsList>
      </DocsSection>
      <DocsSection>
        <h2>Breakpoint values</h2>
        <p>
          Breakpoint widths are fixed when the package is built, because media queries can't read CSS variables. They
          are exported as constants, along with the `Responsive&lt;T&gt;` and `Breakpoint` types.
        </p>
        <CodeBlock title="Constants and types" code={constantsSnippet} />
      </DocsSection>
    </>
  );
}
