import { Callout, Heading } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DocsDemoGrid } from '../../components/DocsPrimitives';
import { DocsSection } from '../../components/DocsSection';
import { PropsTable } from '../../components/PropsTable';
import { IconAlert, IconInfo } from '../../icons';
import { DemoCard } from './DemoCard';

export function CalloutDocsPage() {
  const usageSnippet = [
    "import { Callout } from '@wlcr/base-ic';",
    '',
    '<Callout.Root>',
    '  <Callout.Icon>',
    '    <InfoIcon />',
    '  </Callout.Icon>',
    '  <Callout.Text>',
    '    You will need admin privileges to install and access this application.',
    '  </Callout.Text>',
    '</Callout.Root>',
  ].join('\n');

  const variantsSnippet = [
    '<Callout.Root variant="soft">…</Callout.Root>',
    '<Callout.Root variant="surface">…</Callout.Root>',
    '<Callout.Root variant="outline">…</Callout.Root>',
  ].join('\n');

  const sizesSnippet = [
    '<Callout.Root size="1">…</Callout.Root>',
    '<Callout.Root size="2">…</Callout.Root>',
    '<Callout.Root size="3">…</Callout.Root>',
  ].join('\n');

  const colorSnippet = [
    '<Callout.Root color="red" role="alert">',
    '  <Callout.Icon>',
    '    <AlertIcon />',
    '  </Callout.Icon>',
    '  <Callout.Text>Access denied. Please contact the network administrator.</Callout.Text>',
    '</Callout.Root>',
    '<Callout.Root color="gray" variant="soft" highContrast>…</Callout.Root>',
  ].join('\n');

  return (
    <>
      <DocsSection>
        <h1>Callout</h1>
        <p>
          `Callout` draws attention to a short message — a tip, a warning, an error. It's a compound component:
          `Callout.Root` sets the tint, `Callout.Icon` holds an optional icon aligned to the first line of text, and
          `Callout.Text` holds the message.
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Demo</h2>
        <DocsDemoGrid>
          <DemoCard title="Variants" description="`soft` (default), `surface` adds a border, `outline` drops the fill." code={variantsSnippet}>
            {(['soft', 'surface', 'outline'] as const).map((variant) => (
              <Callout.Root key={variant} variant={variant}>
                <Callout.Icon>
                  <IconInfo className="docs-callout-icon" />
                </Callout.Icon>
                <Callout.Text>A {variant} callout.</Callout.Text>
              </Callout.Root>
            ))}
          </DemoCard>
          <DemoCard title="Sizes" description="`size` scales padding, gap and text size." code={sizesSnippet}>
            {(['1', '2', '3'] as const).map((size) => (
              <Callout.Root key={size} size={size}>
                <Callout.Icon>
                  <IconInfo className="docs-callout-icon" />
                </Callout.Icon>
                <Callout.Text>Size {size} callout.</Callout.Text>
              </Callout.Root>
            ))}
          </DemoCard>
          <DemoCard
            title="Color and contrast"
            description="`color` overrides the theme accent; `highContrast` darkens the text."
            code={colorSnippet}
          >
            <Callout.Root color="red" role="alert">
              <Callout.Icon>
                <IconAlert className="docs-callout-icon" />
              </Callout.Icon>
              <Callout.Text>Access denied. Please contact the network administrator.</Callout.Text>
            </Callout.Root>
            <Callout.Root color="gray" highContrast>
              <Callout.Icon>
                <IconInfo className="docs-callout-icon" />
              </Callout.Icon>
              <Callout.Text>A high-contrast gray callout.</Callout.Text>
            </Callout.Root>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Usage</Heading>
        <CodeBlock title="Callout Usage" code={usageSnippet} />
        <p>
          `Callout.Root` renders a plain <code>&lt;div&gt;</code> with no ARIA role. For a message that appears in
          response to user action and should be announced, add <code>role="alert"</code> (urgent) or{' '}
          <code>role="status"</code> (polite) yourself. Icons are decorative — give them{' '}
          <code>aria-hidden</code> or leave the meaning to the text.
        </p>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Props</Heading>
        <h3>Callout.Root</h3>
        <PropsTable
          rows={[
            { name: 'size', type: "'1' | '2' | '3'", default: "'2'", description: 'Padding, gap and text size.' },
            { name: 'variant', type: "'soft' | 'surface' | 'outline'", default: "'soft'", description: 'Visual style.' },
            { name: 'color', type: 'AccentColor', description: 'Override the accent color for this callout.' },
            {
              name: 'highContrast',
              type: 'boolean',
              default: 'false',
              description: 'Use step 12 of the accent for text instead of step 11.',
            },
            {
              name: 'render',
              type: 'React.ReactElement | ((props, state) => React.ReactElement)',
              description: "Render as a different element while keeping Callout's styling.",
            },
            {
              name: 'm, mx, my, mt, mr, mb, ml',
              type: 'Responsive<number | string>',
              description:
                'Margin shorthands. Numbers and digit-only strings map to space tokens (`3` → `var(--space-3)`); any other string is used as a raw CSS length.',
            },
          ]}
        />
        <h3>Callout.Icon</h3>
        <PropsTable
          rows={[{ name: 'children', type: 'React.ReactNode', description: 'Icon, centered on the first line of text.' }]}
        />
        <h3>Callout.Text</h3>
        <PropsTable rows={[{ name: 'children', type: 'React.ReactNode', description: 'Message content (renders a `<p>`).' }]} />
      </DocsSection>
    </>
  );
}
