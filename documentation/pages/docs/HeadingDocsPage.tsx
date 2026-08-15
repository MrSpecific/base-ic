import { Heading, Text } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DocsDemoGrid } from '../../components/DocsPrimitives';
import { DocsSection } from '../../components/DocsSection';
import { PropsTable } from '../../components/PropsTable';
import { DemoCard } from './DemoCard';

export function HeadingDocsPage() {
  const usageSnippet = [
    "import { Heading } from '@wlcr/base-ic';",
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
      <DocsSection>
        <h2>Props</h2>
        <PropsTable
          rows={[
            {
              name: 'as',
              type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'",
              default: "'h1'",
              description: 'The heading element to render.',
            },
            {
              name: 'size',
              type: "'1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'",
              description:
                'Type scale size. Defaults to a preset tied to `as` (h1 → \'8\', h2 → \'6\', h3 → \'5\', h4 → \'4\', h5 → \'3\', h6 → \'2\').',
            },
            {
              name: 'weight',
              type: "'light' | 'regular' | 'medium' | 'semibold' | 'bold'",
              description: 'Override the font weight.',
            },
            {
              name: 'color',
              type: 'AccentColor',
              description: 'Override the accent color for this heading.',
            },
            {
              name: 'highContrast',
              type: 'boolean',
              description: 'Increase foreground contrast against the background.',
            },
            {
              name: 'align',
              type: "'left' | 'center' | 'right'",
              description: 'Text alignment.',
            },
            {
              name: 'wrap',
              type: "'wrap' | 'nowrap' | 'pretty' | 'balance'",
              description: 'Controls the CSS `text-wrap` behavior.',
            },
            {
              name: 'trim',
              type: "'normal' | 'start' | 'end' | 'both'",
              description: 'Trims leading/trailing line-height whitespace.',
            },
            {
              name: 'truncate',
              type: 'boolean',
              description: 'Truncates overflowing text with an ellipsis on a single line.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              description: 'Heading content.',
            },
          ]}
        />
      </DocsSection>
    </>
  );
}
