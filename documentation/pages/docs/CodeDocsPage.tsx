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
              description: 'Type scale size for the inline code text.',
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
              description: 'Override the font weight. Falls back to the variant’s default weight.',
            },
            {
              name: 'color',
              type: 'AccentColor',
              description: 'Override the accent color for this code span.',
            },
            {
              name: 'highContrast',
              type: 'boolean',
              description: 'Increase foreground contrast against the background.',
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
