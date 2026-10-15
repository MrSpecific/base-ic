import { Text } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DocsDemoGrid } from '../../components/DocsPrimitives';
import { DocsSection } from '../../components/DocsSection';
import { PropsTable } from '../../components/PropsTable';
import { DemoCard } from './DemoCard';

export function TextDocsPage() {
  const usageSnippet = [
    "import { Text } from '@wlcr/base-ic';",
    '',
    '<Text as="p" size="3" color="gray">Readable body content.</Text>',
  ].join('\n');

  const sizesSnippet = [
    '<div>',
    '  <Text size="2">Small supporting text</Text>',
    '  <Text size="3">Default body text</Text>',
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
              <Text as="p" size="3">Default body text</Text>
              <Text as="p" size="6">Large lead paragraph</Text>
            </div>
          </DemoCard>
          <DemoCard
            title="Color + Contrast"
            description="Adjust text prominence without custom CSS. `highContrast` needs a `color` to act on."
            code={emphasisSnippet}
          >
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
      <DocsSection>
        <h2>Props</h2>
        <PropsTable
          rows={[
            {
              name: 'as',
              type: "'span' | 'div' | 'label' | 'p'",
              default: "'span'",
              description: 'The element to render.',
            },
            {
              name: 'size',
              type: "'1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'",
              default: "'3'",
              description: 'Type scale size.',
            },
            {
              name: 'weight',
              type: "'light' | 'regular' | 'medium' | 'semibold' | 'bold'",
              description: 'Override the font weight.',
            },
            {
              name: 'color',
              type: 'AccentColor',
              description: 'Override the accent color for this text.',
            },
            {
              name: 'highContrast',
              type: 'boolean',
              description:
                'Uses the higher-contrast step (12 instead of 11) of the `color` scale. Only has an effect when `color` is set.',
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
              description: 'Text content.',
            },
            {
              name: 'p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml',
              type: 'number | string',
              description:
                'Padding/margin shorthand props (e.g. `mb={2}`). Numbers map to spacing scale tokens; strings are used as literal CSS values.',
            },
          ]}
        />
      </DocsSection>
    </>
  );
}
