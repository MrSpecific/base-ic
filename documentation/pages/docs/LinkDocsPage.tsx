import { Link, Text } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DocsDemoGrid } from '../../components/DocsPrimitives';
import { DocsSection } from '../../components/DocsSection';
import { PropsTable } from '../../components/PropsTable';
import { DemoCard } from './DemoCard';

export function LinkDocsPage() {
  const usageSnippet = [
    "import { Link } from '@wlcr/base-ic';",
    '',
    '<Link href="https://base-ui.com/react" underline="hover">Read docs</Link>',
  ].join('\n');

  const underlineSnippet = [
    '<div>',
    '  <Link href="https://base-ui.com/react" underline="auto">Underline auto</Link>',
    '  <Link href="https://base-ui.com/react" underline="always">Underline always</Link>',
    '  <Link href="https://base-ui.com/react" underline="none">Underline none</Link>',
    '</div>',
  ].join('\n');

  const emphasisSnippet = [
    '<Text>',
    '  Visit the <Link href="https://base-ui.com/react" weight="semibold">component guide</Link> for integration details.',
    '</Text>',
  ].join('\n');

  const renderPropSnippet = [
    "import { Link as RouterLink } from 'react-router-dom';",
    '',
    '<Link render={<RouterLink to="/projects/1" />}>Project overview</Link>',
  ].join('\n');

  return (
    <>
      <DocsSection>
        <h1>Link</h1>
        <p>
          `Link` is an accessible anchor primitive with tokenized typography, color control,
          underline behavior, and spacing props.
        </p>
        <p>
          Pass <code>render</code> to keep Link's styling while swapping in another element — most commonly a
          client-side router's own <code>Link</code>, so navigation stays client-side instead of a full page load:
        </p>
        <CodeBlock title="Link render prop" code={renderPropSnippet} />
      </DocsSection>
      <DocsSection>
        <h2>Demo</h2>
        <DocsDemoGrid>
          <DemoCard title="Underline Modes" description="Control link decoration behavior by context." code={underlineSnippet}>
            <div>
              <Link href="https://base-ui.com/react" target="_blank" rel="noreferrer" underline="auto">Underline auto</Link>
              <br />
              <Link href="https://base-ui.com/react" target="_blank" rel="noreferrer" underline="always">Underline always</Link>
              <br />
              <Link href="https://base-ui.com/react" target="_blank" rel="noreferrer" underline="none">Underline none</Link>
            </div>
          </DemoCard>
          <DemoCard title="Inline Usage" description="Embed links in rich text without custom styles." code={emphasisSnippet}>
            <Text>
              Visit the{' '}
              <Link href="https://base-ui.com/react" target="_blank" rel="noreferrer" weight="semibold" underline="hover">
                component guide
              </Link>{' '}
              for integration details.
            </Text>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <h2>Usage</h2>
        <CodeBlock title="Link Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <h2>Props</h2>
        <PropsTable
          rows={[
            {
              name: 'href',
              type: 'string',
              description: 'The destination URL (native anchor attribute).',
            },
            {
              name: 'size',
              type: "'1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'",
              description: 'Type scale size. Falls back to the surrounding text size when omitted.',
            },
            {
              name: 'weight',
              type: "'light' | 'regular' | 'medium' | 'semibold' | 'bold'",
              description: 'Override the font weight.',
            },
            {
              name: 'color',
              type: 'AccentColor',
              description: 'Override the accent color for this link.',
            },
            {
              name: 'highContrast',
              type: 'boolean',
              description: 'Increase foreground contrast against the background.',
            },
            {
              name: 'underline',
              type: "'auto' | 'always' | 'hover' | 'none'",
              default: "'auto'",
              description: 'Controls when the underline decoration is shown.',
            },
            {
              name: 'truncate',
              type: 'boolean',
              description: 'Truncates overflowing text with an ellipsis on a single line.',
            },
            {
              name: 'render',
              type: 'useRender.RenderProp',
              description:
                "Render as a different element (e.g. a router Link) while keeping Link's styling.",
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              description: 'Link content/label.',
            },
          ]}
        />
      </DocsSection>
    </>
  );
}
