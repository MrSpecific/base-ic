import { Code, Text } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DocsDemoGrid } from '../../components/DocsPrimitives';
import { DocsSection } from '../../components/DocsSection';
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
    </>
  );
}
