import { Text } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DocsDemoGrid } from '../../components/DocsPrimitives';
import { DocsSection } from '../../components/DocsSection';
import { DemoCard } from './DemoCard';

export function TextDocsPage() {
  const usageSnippet = [
    "import { Text } from 'base-ic';",
    '',
    '<Text as="p" size="4" color="gray">Readable body content.</Text>',
  ].join('\n');

  const sizesSnippet = [
    '<div>',
    '  <Text size="2">Small supporting text</Text>',
    '  <Text size="4">Default body text</Text>',
    '  <Text size="6">Large lead paragraph</Text>',
    '</div>',
  ].join('\n');

  const emphasisSnippet = [
    '<Text as="p" color="gray" highContrast>',
    '  Semantic body copy can tune weight, color, and wrapping behavior.',
    '</Text>',
  ].join('\n');

  return (
    <>
      <DocsSection>
        <h1>Text</h1>
        <p>
          `Text` is the foundational body copy primitive. It supports semantic element rendering,
          type scale sizing, color controls, and spacing props.
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Demo</h2>
        <DocsDemoGrid>
          <DemoCard title="Size Scale" description="Use tokenized sizes for hierarchy in body copy." code={sizesSnippet}>
            <div>
              <Text as="p" size="2">Small supporting text</Text>
              <Text as="p" size="4">Default body text</Text>
              <Text as="p" size="6">Large lead paragraph</Text>
            </div>
          </DemoCard>
          <DemoCard title="Color + Contrast" description="Adjust text prominence without custom CSS." code={emphasisSnippet}>
            <Text as="p" color="gray" highContrast>
              Semantic body copy can tune weight, color, and wrapping behavior.
            </Text>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <h2>Usage</h2>
        <CodeBlock title="Text Usage" code={usageSnippet} />
      </DocsSection>
    </>
  );
}
