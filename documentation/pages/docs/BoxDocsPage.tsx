import { Box } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DocsDemoGrid } from '../../components/DocsPrimitives';
import { DocsSection } from '../../components/DocsSection';
import { PropsTable } from '../../components/PropsTable';
import { DemoCard } from './DemoCard';

export function BoxDocsPage() {
  const snippet = [
    "import { Box } from '@wlcr/base-ic';",
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
      <DocsSection>
        <h2>Props</h2>
        <PropsTable
          rows={[
            {
              name: 'as',
              type: 'React.ElementType',
              default: "'div'",
              description: 'Element or component to render Box as.',
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
              description: 'Margin on all sides. Numbers map to spacing scale tokens.',
            },
            {
              name: 'mx',
              type: 'SpaceValue',
              description: 'Horizontal margin (left and right).',
            },
            {
              name: 'my',
              type: 'SpaceValue',
              description: 'Vertical margin (top and bottom).',
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
              description: 'Content rendered inside the Box.',
            },
          ]}
        />
      </DocsSection>
    </>
  );
}
