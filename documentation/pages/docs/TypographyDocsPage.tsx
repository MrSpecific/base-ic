import { CodeBlock } from '../../components/CodeBlock';
import { DocsList } from '../../components/DocsPrimitives';
import { DocsSection } from '../../components/DocsSection';

export function TypographyDocsPage() {
  const usageSnippet = [
    "import { Text, Heading, Link, Code, Kbd, Em, Strong, Quote } from 'base-ic';",
    '',
    '<Heading as="h2" size="7">Typography</Heading>',
    '<Text as="p" size="4">Readable body text with semantic tokens.</Text>',
    '<Text as="p">Press <Kbd>⌘K</Kbd> and run <Code>npm run build</Code>.</Text>',
    '<Text as="p"><Em>Emphasis</Em> and <Strong>strong emphasis</Strong> are semantic helpers.</Text>',
    '<Quote>Design systems succeed when language and spacing are consistent.</Quote>',
    '<Link href="https://base-ui.com/react" underline="hover">Explore primitives</Link>',
  ].join('\n');

  const starterSnippet = [
    '<Heading as="h2" size="7">Typography</Heading>',
    '<Text as="p" size="4">Readable body text with semantic tokens.</Text>',
    '<Text as="p">',
    '  Press <Kbd>⌘K</Kbd> and run <Code>npm run build</Code> before release.',
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
        <h2>Component Pages</h2>
        <p>
          Typography is now split into dedicated pages for each primitive. Use the sidebar to explore
          `Text`, `Heading`, `Link`, `Code`, `Kbd`, `Em`, `Strong`, and `Quote`.
        </p>
        <DocsList>
          <li>Text: body copy and semantic text rendering.</li>
          <li>Heading: semantic levels and display scale.</li>
          <li>Link: anchor behavior and underline modes.</li>
          <li>Code and Kbd: inline technical tokens and shortcuts.</li>
          <li>Em, Strong, Quote: semantic emphasis primitives.</li>
        </DocsList>
      </DocsSection>
      <DocsSection>
        <h2>Usage</h2>
        <CodeBlock title="Typography Overview Usage" code={starterSnippet} />
        <CodeBlock title="Typography Full Import" code={usageSnippet} />
      </DocsSection>
    </>
  );
}
