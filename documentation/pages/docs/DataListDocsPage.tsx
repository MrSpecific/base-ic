import { Badge, Code, DataList, Heading, Link } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DocsDemoGrid } from '../../components/DocsPrimitives';
import { DocsSection } from '../../components/DocsSection';
import { PropsTable } from '../../components/PropsTable';
import { DemoCard } from './DemoCard';

function ProfileList(props: { orientation?: 'horizontal' | 'vertical'; size?: '1' | '2' | '3' }) {
  return (
    <DataList.Root {...props}>
      <DataList.Item align="center">
        <DataList.Label>Status</DataList.Label>
        <DataList.Value>
          <Badge color="jade" variant="soft">
            Authorized
          </Badge>
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>ID</DataList.Label>
        <DataList.Value>
          <Code variant="ghost">u_2J89JSA4GJ</Code>
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Name</DataList.Label>
        <DataList.Value>Vlad Moroz</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Email</DataList.Label>
        <DataList.Value>
          <Link href="mailto:vlad@example.com">vlad@example.com</Link>
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Company</DataList.Label>
        <DataList.Value>
          <Link href="https://example.com" target="_blank" rel="noreferrer">
            Supabase
          </Link>
        </DataList.Value>
      </DataList.Item>
    </DataList.Root>
  );
}

export function DataListDocsPage() {
  const usageSnippet = [
    "import { DataList, Badge } from '@wlcr/base-ic';",
    '',
    '<DataList.Root>',
    '  <DataList.Item align="center">',
    '    <DataList.Label>Status</DataList.Label>',
    '    <DataList.Value>',
    '      <Badge color="jade">Authorized</Badge>',
    '    </DataList.Value>',
    '  </DataList.Item>',
    '  <DataList.Item>',
    '    <DataList.Label>Name</DataList.Label>',
    '    <DataList.Value>Vlad Moroz</DataList.Value>',
    '  </DataList.Item>',
    '</DataList.Root>',
  ].join('\n');

  const orientationSnippet = [
    '<DataList.Root orientation="horizontal">…</DataList.Root>',
    '<DataList.Root orientation="vertical">…</DataList.Root>',
  ].join('\n');

  const sizesSnippet = [
    '<DataList.Root size="1">…</DataList.Root>',
    '<DataList.Root size="2">…</DataList.Root>',
    '<DataList.Root size="3">…</DataList.Root>',
  ].join('\n');

  const colorSnippet = [
    '<DataList.Root>',
    '  <DataList.Item>',
    '    <DataList.Label color="indigo">Plan</DataList.Label>',
    '    <DataList.Value>Team</DataList.Value>',
    '  </DataList.Item>',
    '  <DataList.Item>',
    '    <DataList.Label color="indigo" highContrast>Seats</DataList.Label>',
    '    <DataList.Value>12 of 20</DataList.Value>',
    '  </DataList.Item>',
    '  <DataList.Item>',
    '    <DataList.Label minWidth="160px">Renews</DataList.Label>',
    '    <DataList.Value>November 1, 2026</DataList.Value>',
    '  </DataList.Item>',
    '</DataList.Root>',
  ].join('\n');

  return (
    <>
      <DocsSection>
        <h1>DataList</h1>
        <p>
          `DataList` displays metadata as a list of label/value pairs — profile details, order summaries, settings
          read-outs. It renders a semantic `&lt;dl&gt;`: each `DataList.Item` is a `&lt;div&gt;` grouping one
          `&lt;dt&gt;` label with its `&lt;dd&gt;` value.
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Demo</h2>
        <DocsDemoGrid>
          <DemoCard
            title="Orientation"
            description="`horizontal` (default) aligns every label in one column; `vertical` stacks each label above its value — useful in narrow sidebars."
            code={orientationSnippet}
          >
            <ProfileList orientation="horizontal" />
            <ProfileList orientation="vertical" />
          </DemoCard>
          <DemoCard title="Sizes" description="`size` scales the font size and the spacing between items." code={sizesSnippet}>
            <ProfileList size="1" />
            <ProfileList size="2" />
            <ProfileList size="3" />
          </DemoCard>
          <DemoCard
            title="Label color and width"
            description="Labels take `color` and `highContrast` like `Text`; `width` / `minWidth` / `maxWidth` control the label column."
            code={colorSnippet}
          >
            <DataList.Root>
              <DataList.Item>
                <DataList.Label color="indigo">Plan</DataList.Label>
                <DataList.Value>Team</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label color="indigo" highContrast>
                  Seats
                </DataList.Label>
                <DataList.Value>12 of 20</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="160px">Renews</DataList.Label>
                <DataList.Value>November 1, 2026</DataList.Value>
              </DataList.Item>
            </DataList.Root>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Usage</Heading>
        <CodeBlock title="DataList Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <h2>Accessibility</h2>
        <p>
          The native description list gives assistive tech the term/definition relationship for free: screen
          readers announce the list and its item count, and read each `&lt;dt&gt;` label with its `&lt;dd&gt;` value.
          Keep exactly one `DataList.Label` per `DataList.Item`, followed by its value(s).
        </p>
        <p>
          Long unbroken values (IDs, URLs, email addresses) wrap rather than overflowing, so the list stays
          within narrow containers.
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Props</h2>
        <h3>DataList.Root</h3>
        <PropsTable
          rows={[
            { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Two aligned columns, or each label stacked above its value.' },
            { name: 'size', type: "'1' | '2' | '3'", default: "'2'", description: 'Font size and spacing.' },
            { name: 'trim', type: "'normal' | 'start' | 'end' | 'both'", default: "'normal'", description: 'Trim the leading above the first item and/or below the last item, for tight alignment with surrounding content.' },
            {
              name: 'm, mx, my, mt, mr, mb, ml',
              type: 'number | string',
              description: 'Margin shorthands. Numbers and digit-only strings map to space tokens (`3` → `var(--space-3)`); other strings are raw CSS lengths.',
            },
          ]}
        />
        <h3>DataList.Item</h3>
        <PropsTable
          rows={[
            { name: 'align', type: "'start' | 'center' | 'end' | 'baseline' | 'stretch'", default: "'baseline'", description: 'Vertical alignment of the label and value in a horizontal list (ignored when vertical). Use `center` when the value is a Badge or Button.' },
          ]}
        />
        <h3>DataList.Label</h3>
        <PropsTable
          rows={[
            { name: 'color', type: 'AccentColor', description: 'Label color (step 11 of the hue). Defaults to the secondary text color.' },
            { name: 'highContrast', type: 'boolean', default: 'false', description: 'Step 12 of `color`, or the primary text color when no `color` is set.' },
            { name: 'width', type: 'string | number', description: 'Label width. Numbers are pixels.' },
            { name: 'minWidth', type: 'string | number', description: 'Minimum label width. Horizontal lists default to a scaled 88px so short labels still form a column.' },
            { name: 'maxWidth', type: 'string | number', description: 'Maximum label width.' },
          ]}
        />
        <h3>DataList.Value</h3>
        <p>Renders a `&lt;dd&gt;`. Accepts all native attributes and `ref`.</p>
      </DocsSection>
    </>
  );
}
