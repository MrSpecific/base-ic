import { Box } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
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

  return (
    <>
      <section className="docs-section">
        <h1>Box</h1>
        <p>
          `Box` is the lowest-level layout primitive. It renders a single element and keeps the API minimal,
          making it ideal for semantic wrappers and utility composition.
        </p>
      </section>
      <section className="docs-section">
        <h2>Live Demos</h2>
        <div className="docs-demo-grid">
          <DemoCard title="Semantic Wrapper" description="Render any semantic element with `as`.">
            <Box as="article" className="docs-layout-sample-box">
              <h4>Product Card</h4>
              <p>Box keeps semantics explicit while inheriting theme tokens.</p>
            </Box>
          </DemoCard>
          <DemoCard title="Composable Surface" description="Compose Box with existing system classes.">
            <Box className="docs-layout-sample-box" style={{ borderColor: 'var(--color-accent-7)' }}>
              <h4>Accent Surface</h4>
              <p>Override details via style or className without changing primitive behavior.</p>
            </Box>
          </DemoCard>
        </div>
      </section>
      <section className="docs-section">
        <h2>Usage</h2>
        <CodeBlock title="Box Usage" code={snippet} />
      </section>
    </>
  );
}
