import { Box, Container, Section } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DemoCard } from './DemoCard';

export function ContainerDocsPage() {
  const snippet = [
    "import { Container } from 'base-ic';",
    '',
    '<Container size="3">',
    '  <YourContent />',
    '</Container>',
  ].join('\n');
  const sizeDemoSnippet = [
    '<Section py={2}>',
    '  <Container size="1"><Box className="docs-layout-chip">Size 1</Box></Container>',
    '  <Container size="2"><Box className="docs-layout-chip">Size 2</Box></Container>',
    '  <Container size="3"><Box className="docs-layout-chip">Size 3</Box></Container>',
    '</Section>',
  ].join('\n');
  const customWidthDemoSnippet = [
    '<Container maxWidth="48rem" gutter={2}>',
    '  <Box className="docs-layout-sample-box">',
    '    <h4>Custom Container</h4>',
    '    <p>Useful for narrative docs or narrow forms.</p>',
    '  </Box>',
    '</Container>',
  ].join('\n');

  return (
    <>
      <section className="docs-section">
        <h1>Container</h1>
        <p>
          `Container` centralizes page content and constrains line length with tokenized widths and gutters.
          Use size presets for docs, dashboards, and marketing sections.
        </p>
      </section>
      <section className="docs-section">
        <h2>Demo</h2>
        <div className="docs-demo-grid">
          <DemoCard title="Container Sizes" description="Compare width presets side-by-side." code={sizeDemoSnippet}>
            <Section py={2}>
              <Container size="1"><Box className="docs-layout-chip">Size 1</Box></Container>
              <Container size="2"><Box className="docs-layout-chip">Size 2</Box></Container>
              <Container size="3"><Box className="docs-layout-chip">Size 3</Box></Container>
            </Section>
          </DemoCard>
          <DemoCard title="Custom Max Width" description="Override max width for special pages." code={customWidthDemoSnippet}>
            <Container maxWidth="48rem" gutter={2}>
              <Box className="docs-layout-sample-box">
                <h4>Custom Container</h4>
                <p>Useful for narrative docs or narrow forms.</p>
              </Box>
            </Container>
          </DemoCard>
        </div>
      </section>
      <section className="docs-section">
        <h2>Usage</h2>
        <CodeBlock title="Container Usage" code={snippet} />
      </section>
    </>
  );
}
