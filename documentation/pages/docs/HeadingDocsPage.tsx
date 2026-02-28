import { Heading, Text } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DocsDemoGrid } from '../../components/DocsPrimitives';
import { DocsSection } from '../../components/DocsSection';
import { DemoCard } from './DemoCard';

export function HeadingDocsPage() {
  const usageSnippet = [
    "import { Heading } from 'base-ic';",
    '',
    '<Heading as="h2" size="7">Section title</Heading>',
  ].join('\n');

  const hierarchySnippet = [
    '<div>',
    '  <Heading as="h2" size="7">Section Heading</Heading>',
    '  <Heading as="h3" size="5">Subsection Heading</Heading>',
    '  <Text as="p">Body text beneath headings.</Text>',
    '</div>',
  ].join('\n');

  const wrapSnippet = [
    '<Heading as="h3" size="6" wrap="balance">',
    '  Long titles can balance across lines for cleaner rhythm.',
    '</Heading>',
  ].join('\n');

  return (
    <>
      <DocsSection>
        <h1>Heading</h1>
        <p>
          `Heading` provides semantic heading levels with tokenized size, weight, and wrapping behavior.
          Use it to enforce consistent typographic hierarchy.
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Demo</h2>
        <DocsDemoGrid>
          <DemoCard title="Hierarchy" description="Compose structured heading levels." code={hierarchySnippet}>
            <div>
              <Heading as="h2" size="7">Section Heading</Heading>
              <Heading as="h3" size="5">Subsection Heading</Heading>
              <Text as="p">Body text beneath headings.</Text>
            </div>
          </DemoCard>
          <DemoCard title="Balanced Wrap" description="Improve long title rhythm with balanced wrapping." code={wrapSnippet}>
            <Heading as="h3" size="6" wrap="balance">
              Long titles can balance across lines for cleaner rhythm.
            </Heading>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <h2>Usage</h2>
        <CodeBlock title="Heading Usage" code={usageSnippet} />
      </DocsSection>
    </>
  );
}
