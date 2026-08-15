import { Box, Container, Section } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DocsDemoGrid } from '../../components/DocsPrimitives';
import { DocsSection } from '../../components/DocsSection';
import { PropsTable } from '../../components/PropsTable';
import { DemoCard } from './DemoCard';

export function ContainerDocsPage() {
  const snippet = [
    "import { Container } from '@wlcr/base-ic';",
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
      <DocsSection>
        <h1>Container</h1>
        <p>
          `Container` centralizes page content and constrains line length with tokenized widths and gutters.
          Use size presets for docs, dashboards, and marketing sections.
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Demo</h2>
        <DocsDemoGrid>
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
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <h2>Usage</h2>
        <CodeBlock title="Container Usage" code={snippet} />
      </DocsSection>
      <DocsSection>
        <h2>Props</h2>
        <PropsTable
          rows={[
            {
              name: 'as',
              type: 'React.ElementType',
              default: "'div'",
              description: 'Element or component to render Container as.',
            },
            {
              name: 'size',
              type: "'1' | '2' | '3' | '4'",
              default: "'3'",
              description: 'Width preset. Maps to a tokenized max-width when `maxWidth` is not set.',
            },
            {
              name: 'maxWidth',
              type: "React.CSSProperties['maxWidth']",
              description: 'Explicit max-width, overriding the `size` preset.',
            },
            {
              name: 'gutter',
              type: 'number | string',
              description: 'Horizontal inline padding. Numbers map to spacing scale tokens.',
            },
            {
              name: 'p',
              type: 'SpaceValue',
              description: 'Padding on all sides. Numbers map to spacing scale tokens.',
            },
            {
              name: 'px',
              type: 'SpaceValue',
              description: 'Horizontal padding (left and right).',
            },
            {
              name: 'py',
              type: 'SpaceValue',
              description: 'Vertical padding (top and bottom).',
            },
            {
              name: 'pt',
              type: 'SpaceValue',
              description: 'Padding top.',
            },
            {
              name: 'pr',
              type: 'SpaceValue',
              description: 'Padding right.',
            },
            {
              name: 'pb',
              type: 'SpaceValue',
              description: 'Padding bottom.',
            },
            {
              name: 'pl',
              type: 'SpaceValue',
              description: 'Padding left.',
            },
            {
              name: 'm',
              type: 'SpaceValue',
              description: 'Margin on all sides. Falls back to centering behavior on `mx`/`my` when set.',
            },
            {
              name: 'mx',
              type: 'SpaceValue',
              description: 'Horizontal margin (left and right). Falls back to `m` when unset.',
            },
            {
              name: 'my',
              type: 'SpaceValue',
              description: 'Vertical margin (top and bottom). Falls back to `m` when unset.',
            },
            {
              name: 'mt',
              type: 'SpaceValue',
              description: 'Margin top.',
            },
            {
              name: 'mr',
              type: 'SpaceValue',
              description: 'Margin right.',
            },
            {
              name: 'mb',
              type: 'SpaceValue',
              description: 'Margin bottom.',
            },
            {
              name: 'ml',
              type: 'SpaceValue',
              description: 'Margin left.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              description: 'Content rendered inside the Container.',
            },
          ]}
        />
      </DocsSection>
    </>
  );
}
