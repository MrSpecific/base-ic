import { Code, Em, Heading, Kbd, Link, Quote, Strong, Text } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DocsSection } from '../../components/DocsSection';
import { DemoCard } from './DemoCard';

export function TypographyDocsPage() {
  const usageSnippet = [
    "import { Heading, Text, Link, Code, Kbd } from 'base-ic';",
    '',
    '<Heading as="h2" size="7">Typography</Heading>',
    '<Text size="4">Readable body text with semantic tokens.</Text>',
    '<Link href="#" underline="hover">Read docs</Link>',
    '<Code>npm install base-ic</Code>',
    '<Kbd>⌘K</Kbd>',
  ].join('\n');

  const scaleSnippet = [
    '<div>',
    '  <Heading as="h3" size="8">Display Heading</Heading>',
    '  <Text size="5">Body copy tuned for readability.</Text>',
    '</div>',
  ].join('\n');

  const inlineSnippet = [
    '<Text>',
    '  Press <Kbd>⌘K</Kbd> to open search and run <Code>npm run build</Code> before release.',
    '</Text>',
  ].join('\n');

  return (
    <>
      <DocsSection>
        <h1>Typography</h1>
        <p>
          Typography primitives (`Text`, `Heading`, `Link`, `Code`, `Kbd`, `Em`, `Strong`, `Quote`) provide a
          consistent type system with semantic color and size controls.
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Demo</h2>
        <div className="docs-demo-grid">
          <DemoCard title="Scale" description="Compose heading and body levels with tokenized sizes." code={scaleSnippet}>
            <div>
              <Heading as="h3" size="8">Display Heading</Heading>
              <Text size="5">Body copy tuned for readability.</Text>
            </div>
          </DemoCard>
          <DemoCard title="Inline Semantics" description="Use semantic inline primitives in rich copy." code={inlineSnippet}>
            <Text>
              Press <Kbd>⌘K</Kbd> to open search and run <Code>npm run build</Code> before release.
              <br />
              <Em>Emphasis</Em> and <Strong>strong emphasis</Strong> stay readable in both themes.
            </Text>
            <Quote>
              Design systems succeed when language, spacing, and interaction patterns are consistent.
            </Quote>
            <Link href="https://base-ui.com/react" target="_blank" rel="noreferrer" underline="hover">
              Explore Base UI primitives
            </Link>
          </DemoCard>
        </div>
      </DocsSection>
      <DocsSection>
        <h2>Usage</h2>
        <CodeBlock title="Typography Usage" code={usageSnippet} />
      </DocsSection>
    </>
  );
}
