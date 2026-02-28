import { Strong, Text } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DocsDemoGrid } from '../../components/DocsPrimitives';
import { DocsSection } from '../../components/DocsSection';
import { DemoCard } from './DemoCard';

export function StrongDocsPage() {
  const usageSnippet = [
    "import { Strong } from 'base-ic';",
    '',
    '<Text><Strong>Important:</Strong> Run tests before release.</Text>',
  ].join('\n');

  const inlineSnippet = [
    '<Text><Strong>Important:</Strong> Run tests before release.</Text>',
  ].join('\n');

  const emphasisSnippet = [
    '<Text>',
    '  Keep <Strong>critical information</Strong> visually distinct in dense documentation.',
    '</Text>',
  ].join('\n');

  return (
    <>
      <DocsSection>
        <h1>Strong</h1>
        <p>
          `Strong` applies semantic strong emphasis for high-importance inline content.
          It should be reserved for truly critical information.
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Demo</h2>
        <DocsDemoGrid>
          <DemoCard title="Important Label" description="Draw attention to must-read context." code={inlineSnippet}>
            <Text>
              <Strong>Important:</Strong> Run tests before release.
            </Text>
          </DemoCard>
          <DemoCard title="Inline Priority" description="Highlight the most critical phrase in a sentence." code={emphasisSnippet}>
            <Text>
              Keep <Strong>critical information</Strong> visually distinct in dense documentation.
            </Text>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <h2>Usage</h2>
        <CodeBlock title="Strong Usage" code={usageSnippet} />
      </DocsSection>
    </>
  );
}
