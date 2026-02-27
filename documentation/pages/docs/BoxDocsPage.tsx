import { Box } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DocsDemoGrid } from '../../components/DocsPrimitives';
import { DocsSection } from '../../components/DocsSection';
import { DemoCard } from './DemoCard';

export function BoxDocsPage() {
  const snippet = [
    "import { Box } from 'base-ic';",
    '',
    '<Box as="article" className="card">',
    '  <h3>Box is a primitive wrapper</h3>',
    '  <p>Use it as a semantic container for custom layouts.</p>',
    '</Box>',
  ].join('\n');
  const semanticWrapperDemo = [
    '<Box as="article" className="docs-layout-sample-box">',
    '  <h4>Product Card</h4>',
    '  <p>Box keeps semantics explicit while inheriting theme tokens.</p>',
    '</Box>',
  ].join('\n');
  const composableSurfaceDemo = [
    '<Box className="docs-layout-sample-box" style={{ borderColor: "var(--color-accent-7)" }}>',
    '  <h4>Accent Surface</h4>',
    '  <p>Override details via style or className without changing primitive behavior.</p>',
    '</Box>',
  ].join('\n');

  return (
    <>
      <DocsSection>
        <h1>Box</h1>
        <p>
          `Box` is the lowest-level layout primitive. It renders a single element and keeps the API minimal,
          making it ideal for semantic wrappers and utility composition.
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Demo</h2>
        <DocsDemoGrid>
          <DemoCard title="Semantic Wrapper" description="Render any semantic element with `as`." code={semanticWrapperDemo}>
            <Box as="article" className="docs-layout-sample-box">
              <h4>Product Card</h4>
              <p>Box keeps semantics explicit while inheriting theme tokens.</p>
            </Box>
          </DemoCard>
          <DemoCard title="Composable Surface" description="Compose Box with existing system classes." code={composableSurfaceDemo}>
            <Box className="docs-layout-sample-box" style={{ borderColor: 'var(--color-accent-7)' }}>
              <h4>Accent Surface</h4>
              <p>Override details via style or className without changing primitive behavior.</p>
            </Box>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <h2>Usage</h2>
        <CodeBlock title="Box Usage" code={snippet} />
      </DocsSection>
    </>
  );
}
