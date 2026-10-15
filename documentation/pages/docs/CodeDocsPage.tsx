import { Code, Text } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DocsDemoGrid } from '../../components/DocsPrimitives';
import { DocsSection } from '../../components/DocsSection';
import { PropsTable } from '../../components/PropsTable';
import { DemoCard } from './DemoCard';

export function CodeDocsPage() {
  const usageSnippet = [
    "import { Code } from '@wlcr/base-ic';",
    '',
    '<Code>npm install @wlcr/base-ic</Code>',
  ].join('\n');

  const variantsSnippet = [
    '<div>',
    '  <Code variant="soft">npm install @wlcr/base-ic</Code>',
    '  <Code variant="outline">npm run build</Code>',
    '  <Code variant="ghost">pnpm -C documentation dev</Code>',
    '</div>',
  ].join('\n');

  const inlineSnippet = [
    '<Text>',
    '  Run <Code variant="outline">npm run build</Code> before publishing releases.',
    '</Text>',
  ].join('\n');

  return (
    <>
      <DocsSection>
        <h1>Code</h1>
        <p>
          `Code` is an inline monospace primitive for commands, identifiers, and snippets.
          Use variants to tune emphasis while keeping token consistency.
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Demo</h2>
        <DocsDemoGrid>
          <DemoCard title="Variants" description="Different visual treatments for inline code." code={variantsSnippet}>
            <div>
              <Code variant="soft">npm install @wlcr/base-ic</Code>
              <br />
              <Code variant="outline">npm run build</Code>
              <br />
              <Code variant="ghost">pnpm -C documentation dev</Code>
            </div>
          </DemoCard>
          <DemoCard title="Inline Command" description="Blend code tokens into body text." code={inlineSnippet}>
            <Text>
              Run <Code variant="outline">npm run build</Code> before publishing releases.
            </Text>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <h2>Usage</h2>
        <CodeBlock title="Code Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <h2>Props</h2>
        <PropsTable
          rows={[
            {
              name: 'size',
              type: "'1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'",
              default: "'3'",
              description: 'Text type-scale step; the monospace font renders at 0.9× that size.',
            },
            {
              name: 'variant',
              type: "'ghost' | 'soft' | 'outline'",
              default: "'soft'",
              description: 'Visual style of the code background and border.',
            },
            {
              name: 'weight',
              type: "'regular' | 'medium' | 'bold'",
              description: 'Override the font weight. Defaults to regular for every variant.',
            },
            {
              name: 'color',
              type: 'AccentColor',
              description:
                'Override the text color (step 11 of the chosen scale). The `soft` background tint still uses the theme accent.',
            },
            {
              name: 'highContrast',
              type: 'boolean',
              default: 'false',
              description:
                'Use step 12 instead of 11 for the text color. Only has an effect when `color` is set.',
            },
            {
              name: 'p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml',
              type: 'number | string',
              description:
                'Padding/margin shorthands. Numbers and digit-only strings map to space tokens (`3` and `"3"` → `var(--space-3)`; `0` → `0`); any other string is used as a raw CSS length (e.g. `"0.2em"`). Padding overrides the `soft` / `outline` default of `0.15em 0.4em`.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              description: 'Content to render inside the code span.',
            },
          ]}
        />
      </DocsSection>
    </>
  );
}
