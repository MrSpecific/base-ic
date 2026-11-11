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
              type: 'Responsive<SpaceValue>',
              description:
                'Padding on all sides. Every space prop also takes per-breakpoint values (see Responsive props). `SpaceValue` is `number | string`: numbers and digit-only strings map to space tokens (`3` and `"3"` → `var(--space-3)`; `0` → `0`); any other string is used as a raw CSS length (e.g. `"12px"`, `"auto"`).',
            },
            {
              name: 'px',
              type: 'Responsive<SpaceValue>',
              description: 'Horizontal padding (left and right).',
            },
            {
              name: 'py',
              type: 'Responsive<SpaceValue>',
              description: 'Vertical padding (top and bottom).',
            },
            {
              name: 'pt',
              type: 'Responsive<SpaceValue>',
              description: 'Padding top.',
            },
            {
              name: 'pr',
              type: 'Responsive<SpaceValue>',
              description: 'Padding right.',
            },
            {
              name: 'pb',
              type: 'Responsive<SpaceValue>',
              description: 'Padding bottom.',
            },
            {
              name: 'pl',
              type: 'Responsive<SpaceValue>',
              description: 'Padding left.',
            },
            {
              name: 'm',
              type: 'Responsive<SpaceValue>',
              description:
                'Margin on all sides. Same value mapping as `p`, plus negative steps: `mt="-1"` or `mt={-1}` → `calc(var(--space-1) * -1)`. Applies to every margin prop.',
            },
            {
              name: 'mx',
              type: 'Responsive<SpaceValue>',
              description: 'Horizontal margin (left and right).',
            },
            {
              name: 'my',
              type: 'Responsive<SpaceValue>',
              description: 'Vertical margin (top and bottom).',
            },
            {
              name: 'mt',
              type: 'Responsive<SpaceValue>',
              description: 'Margin top.',
            },
            {
              name: 'mr',
              type: 'Responsive<SpaceValue>',
              description: 'Margin right.',
            },
            {
              name: 'mb',
              type: 'Responsive<SpaceValue>',
              description: 'Margin bottom.',
            },
            {
              name: 'ml',
              type: 'Responsive<SpaceValue>',
              description: 'Margin left.',
            },
            {
              name: 'width, minWidth, maxWidth, height, minHeight, maxHeight',
              type: 'Responsive<number | string>',
              description:
                'Sizing shorthands. Numbers are pixels (`320` → `320px`, as in React `style`); strings are any CSS length (`"50%"`, `"20rem"`). Only applied when passed.',
            },
            {
              name: 'container',
              type: 'boolean',
              default: 'false',
              description:
                'Makes this element a query container (`container-type: inline-size`), so `@` breakpoints on descendants respond to its width. See Responsive props.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              description: 'Content rendered inside the Box.',
            },
            {
              name: 'className / style / ...',
              type: 'React.HTMLAttributes<HTMLElement>',
              description: 'All other HTML attributes are forwarded to the rendered element. `ref` is forwarded too.',
            },
          ]}
        />
      </DocsSection>
    </>
  );
}
