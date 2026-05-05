import { Link, Text } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DocsDemoGrid } from '../../components/DocsPrimitives';
import { DocsSection } from '../../components/DocsSection';
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

  return (
    <>
      <DocsSection>
        <h1>Link</h1>
        <p>
          `Link` is an accessible anchor primitive with tokenized typography, color control,
          underline behavior, and spacing props.
        </p>
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
    </>
  );
}
