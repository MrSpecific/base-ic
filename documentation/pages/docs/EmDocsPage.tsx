import { Em, Text } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DocsDemoGrid } from '../../components/DocsPrimitives';
import { DocsSection } from '../../components/DocsSection';
import { DemoCard } from './DemoCard';

export function EmDocsPage() {
  const usageSnippet = [
    "import { Em } from 'base-ic';",
    '',
    '<Text>Use <Em>emphasis</Em> for nuanced stress.</Text>',
  ].join('\n');

  const inlineSnippet = [
    '<Text>',
    '  Design systems should be <Em>expressive</Em> and predictable.',
    '</Text>',
  ].join('\n');

  const mixedSnippet = [
    '<Text>',
    '  Use <Em>emphasis</Em> sparingly so it remains meaningful in long-form copy.',
    '</Text>',
  ].join('\n');

  return (
    <>
      <DocsSection>
        <h1>Em</h1>
        <p>
          `Em` is an inline semantic emphasis primitive. Use it for subtle stress within body content.
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Demo</h2>
        <DocsDemoGrid>
          <DemoCard title="Inline Emphasis" description="Use emphasis for nuanced tone in sentences." code={inlineSnippet}>
            <Text>
              Design systems should be <Em>expressive</Em> and predictable.
            </Text>
          </DemoCard>
          <DemoCard title="Long-form Copy" description="Keep emphasis selective to preserve meaning." code={mixedSnippet}>
            <Text>
              Use <Em>emphasis</Em> sparingly so it remains meaningful in long-form copy.
            </Text>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <h2>Usage</h2>
        <CodeBlock title="Em Usage" code={usageSnippet} />
      </DocsSection>
    </>
  );
}
