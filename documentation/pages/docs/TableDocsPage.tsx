import type { ComponentProps } from 'react';
import { Badge, Heading, Table } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DocsDemoGrid } from '../../components/DocsPrimitives';
import { DocsSection } from '../../components/DocsSection';
import { PropsTable } from '../../components/PropsTable';
import { DemoCard } from './DemoCard';

const people = [
  { name: 'Danilo Sousa', email: 'danilo@example.com', group: 'Developer' },
  { name: 'Zahra Ambessa', email: 'zahra@example.com', group: 'Admin' },
  { name: 'Jasper Eriksson', email: 'jasper@example.com', group: 'Developer' },
];

const invoices = [
  { id: 'INV-2041', client: 'Northwind Traders', issued: '2026-09-02', due: '2026-10-02', status: 'Paid', amount: '$4,250.00' },
  { id: 'INV-2042', client: 'Contoso Pharmaceuticals', issued: '2026-09-09', due: '2026-10-09', status: 'Overdue', amount: '$12,980.50' },
  { id: 'INV-2043', client: 'Fabrikam Residences', issued: '2026-09-16', due: '2026-10-16', status: 'Pending', amount: '$860.00' },
];

const statusColor = { Paid: 'green', Overdue: 'red', Pending: 'amber' } as const;

function PeopleTable(props: Omit<ComponentProps<typeof Table.Root>, 'children'>) {
  return (
    <Table.Root {...props}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {people.map((person) => (
          <Table.Row key={person.email}>
            <Table.RowHeaderCell>{person.name}</Table.RowHeaderCell>
            <Table.Cell>{person.email}</Table.Cell>
            <Table.Cell>{person.group}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

export function TableDocsPage() {
  const usageSnippet = [
    "import { Table } from '@wlcr/base-ic';",
    '',
    '<Table.Root variant="surface">',
    '  <Table.Header>',
    '    <Table.Row>',
    '      <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>',
    '      <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>',
    '      <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>',
    '    </Table.Row>',
    '  </Table.Header>',
    '  <Table.Body>',
    '    <Table.Row>',
    '      <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>',
    '      <Table.Cell>danilo@example.com</Table.Cell>',
    '      <Table.Cell>Developer</Table.Cell>',
    '    </Table.Row>',
    '  </Table.Body>',
    '</Table.Root>',
  ].join('\n');

  const variantsSnippet = [
    '<Table.Root variant="surface">…</Table.Root>',
    '<Table.Root variant="ghost">…</Table.Root>',
  ].join('\n');

  const sizesSnippet = [
    '<Table.Root size="1">…</Table.Root>',
    '<Table.Root size="2">…</Table.Root>',
    '<Table.Root size="3">…</Table.Root>',
  ].join('\n');

  const wideSnippet = [
    '<Table.Root variant="surface" aria-label="Invoices">',
    '  <Table.Header>',
    '    <Table.Row>',
    '      <Table.ColumnHeaderCell minWidth="120px">Invoice</Table.ColumnHeaderCell>',
    '      <Table.ColumnHeaderCell minWidth="220px">Client</Table.ColumnHeaderCell>',
    '      <Table.ColumnHeaderCell minWidth="120px">Issued</Table.ColumnHeaderCell>',
    '      <Table.ColumnHeaderCell minWidth="120px">Due</Table.ColumnHeaderCell>',
    '      <Table.ColumnHeaderCell minWidth="110px">Status</Table.ColumnHeaderCell>',
    '      <Table.ColumnHeaderCell justify="end" minWidth="120px">Amount</Table.ColumnHeaderCell>',
    '    </Table.Row>',
    '  </Table.Header>',
    '  <Table.Body>',
    '    <Table.Row align="center">',
    '      <Table.RowHeaderCell>INV-2041</Table.RowHeaderCell>',
    '      <Table.Cell>Northwind Traders</Table.Cell>',
    '      …',
    '      <Table.Cell><Badge color="green">Paid</Badge></Table.Cell>',
    '      <Table.Cell justify="end">$4,250.00</Table.Cell>',
    '    </Table.Row>',
    '  </Table.Body>',
    '</Table.Root>',
  ].join('\n');

  const layoutSnippet = [
    '<Table.Root variant="surface" layout="fixed">',
    '  <Table.Header>',
    '    <Table.Row>',
    '      <Table.ColumnHeaderCell width="180px">Full name</Table.ColumnHeaderCell>',
    '      <Table.ColumnHeaderCell width="220px">Email</Table.ColumnHeaderCell>',
    '      <Table.ColumnHeaderCell width="120px">Group</Table.ColumnHeaderCell>',
    '    </Table.Row>',
    '  </Table.Header>',
    '  …',
    '</Table.Root>',
  ].join('\n');

  return (
    <>
      <DocsSection>
        <h1>Table</h1>
        <p>
          `Table` lays out tabular data with real table semantics: `Table.Root` renders a `&lt;table&gt;` inside a
          scroll container, and its parts map one-to-one onto `&lt;thead&gt;`, `&lt;tbody&gt;`, `&lt;tr&gt;`,
          `&lt;td&gt;` and `&lt;th&gt;`. Wide tables scroll horizontally inside that container instead of
          overflowing the page.
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Demo</h2>
        <DocsDemoGrid>
          <DemoCard
            title="Variants"
            description="`surface` draws a bordered panel with a tinted header; `ghost` (the default) uses row rules only."
            code={variantsSnippet}
          >
            <PeopleTable variant="surface" />
            <PeopleTable variant="ghost" />
          </DemoCard>
          <DemoCard title="Sizes" description="`size` scales cell padding, row height and font size." code={sizesSnippet}>
            <PeopleTable size="1" variant="surface" />
            <PeopleTable size="2" variant="surface" />
            <PeopleTable size="3" variant="surface" />
          </DemoCard>
          <DemoCard
            title="Wide content"
            description="Columns with a `minWidth` that don't fit scroll horizontally inside the table — the page itself never scrolls sideways. Use `justify` to right-align numbers."
            code={wideSnippet}
          >
            <Table.Root variant="surface" aria-label="Invoices">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell minWidth="120px">Invoice</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell minWidth="220px">Client</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell minWidth="120px">Issued</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell minWidth="120px">Due</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell minWidth="110px">Status</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell justify="end" minWidth="120px">
                    Amount
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {invoices.map((invoice) => (
                  <Table.Row key={invoice.id} align="center">
                    <Table.RowHeaderCell>{invoice.id}</Table.RowHeaderCell>
                    <Table.Cell>{invoice.client}</Table.Cell>
                    <Table.Cell>{invoice.issued}</Table.Cell>
                    <Table.Cell>{invoice.due}</Table.Cell>
                    <Table.Cell>
                      <Badge color={statusColor[invoice.status as keyof typeof statusColor]}>{invoice.status}</Badge>
                    </Table.Cell>
                    <Table.Cell justify="end">{invoice.amount}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </DemoCard>
          <DemoCard
            title="Fixed layout"
            description={'`layout="fixed"` sizes columns from the `width` props on the first row instead of the cell content. Give every column a length so the table scrolls once they no longer fit — a fixed table only grows past its container when its columns add up to more than it.'}
            code={layoutSnippet}
          >
            <Table.Root variant="surface" layout="fixed">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell width="180px">Full name</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell width="220px">Email</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell width="120px">Group</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {people.map((person) => (
                  <Table.Row key={person.email}>
                    <Table.RowHeaderCell>{person.name}</Table.RowHeaderCell>
                    <Table.Cell>{person.email}</Table.Cell>
                    <Table.Cell>{person.group}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Usage</Heading>
        <CodeBlock title="Table Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <h2>Accessibility</h2>
        <p>
          Table renders native table elements, so screen readers announce row/column counts and read header cells
          as you move through the grid. `Table.ColumnHeaderCell` renders `&lt;th scope="col"&gt;` and
          `Table.RowHeaderCell` renders `&lt;th scope="row"&gt;`; use a row header for the cell that identifies
          each row (a name or ID) so it's read alongside every other cell in that row.
        </p>
        <p>
          Give the table an accessible name with `aria-label` or `aria-labelledby` on `Table.Root` — they're
          forwarded to the `&lt;table&gt;` element rather than the scroll wrapper — or render a `&lt;caption&gt;`
          as the first child of `Table.Root`.
        </p>
        <p>
          Table is for data. For page layout use `Grid` or `Flex`, and for a short list of key/value details use
          `DataList`.
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Props</h2>
        <h3>Table.Root</h3>
        <p>Renders a `&lt;div&gt;` scroll container (which receives `ref`, `className`, `style` and other props) wrapping the `&lt;table&gt;`.</p>
        <PropsTable
          rows={[
            { name: 'size', type: "'1' | '2' | '3'", default: "'2'", description: 'Cell padding, row height and font size.' },
            { name: 'variant', type: "'surface' | 'ghost'", default: "'ghost'", description: '`surface` adds a bordered, rounded panel and tinted header; `ghost` shows row rules only.' },
            { name: 'layout', type: "'auto' | 'fixed'", default: "'auto'", description: 'CSS `table-layout`. `fixed` sizes columns from the first row\'s `width` props.' },
            { name: 'aria-label, aria-labelledby, aria-describedby', type: 'string', description: 'Forwarded to the `<table>` element.' },
            {
              name: 'm, mx, my, mt, mr, mb, ml',
              type: 'number | string',
              description: 'Margin shorthands. Numbers and digit-only strings map to space tokens (`3` → `var(--space-3)`); other strings are raw CSS lengths.',
            },
          ]}
        />
        <h3>Table.Header, Table.Body</h3>
        <p>Render `&lt;thead&gt;` and `&lt;tbody&gt;`. Accept all native attributes and `ref`.</p>
        <h3>Table.Row</h3>
        <PropsTable
          rows={[
            { name: 'align', type: "'start' | 'center' | 'end' | 'baseline'", description: 'Vertical alignment of the row\'s cells. Defaults to the browser\'s middle alignment.' },
          ]}
        />
        <h3>Table.Cell, Table.ColumnHeaderCell, Table.RowHeaderCell</h3>
        <p>
          Render `&lt;td&gt;`, `&lt;th scope="col"&gt;` and `&lt;th scope="row"&gt;` respectively (`scope` can be
          overridden).
        </p>
        <PropsTable
          rows={[
            { name: 'justify', type: "'start' | 'center' | 'end'", default: "'start'", description: 'Horizontal alignment of the cell content.' },
            { name: 'width', type: 'string | number', description: 'Column width. Numbers are pixels.' },
            { name: 'minWidth', type: 'string | number', description: 'Minimum column width — set it on wide columns so the table scrolls instead of squeezing them.' },
            { name: 'maxWidth', type: 'string | number', description: 'Maximum column width.' },
            {
              name: 'p, px, py, pt, pr, pb, pl',
              type: 'number | string',
              description: 'Override the size preset\'s cell padding. Numbers and digit-only strings map to space tokens.',
            },
          ]}
        />
      </DocsSection>
    </>
  );
}
