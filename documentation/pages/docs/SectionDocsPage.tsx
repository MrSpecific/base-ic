import { Box, Section } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DocsDemoGrid } from '../../components/DocsPrimitives';
import { DocsSection } from '../../components/DocsSection';
import { PropsTable } from '../../components/PropsTable';
import { DemoCard } from './DemoCard';

export function SectionDocsPage() {
  const snippet = [
    "import { Section } from '@wlcr/base-ic';",
    '',
    '<Section size="2">',
    '  <h2>Roadmap</h2>',
    '  <p>Section manages vertical rhythm.</p>',
    '</Section>',
  ].join('\n');
  const presetSizesDemoSnippet = [
    '// Section only changes its own padding, so give it a visible border',
    '// to see the effect — otherwise there\'s nothing to see it against.',
    '<Box className="docs-layout-sample-stack">',
    '  <Section size="1" className="docs-layout-section-demo">',
    '    <Box className="docs-layout-chip">size=&quot;1&quot; · space-5 (20px)</Box>',
    '  </Section>',
    '  <Section size="2" className="docs-layout-section-demo">',
    '    <Box className="docs-layout-chip">size=&quot;2&quot; · space-7 (28px)</Box>',
    '  </Section>',
    '  <Section size="3" className="docs-layout-section-demo">',
    '    <Box className="docs-layout-chip">size=&quot;3&quot; · space-10 (48px)</Box>',
    '  </Section>',
    '</Box>',
  ].join('\n');
  const overridesDemoSnippet = [
    '// No horizontal padding by default — add px when you need it;',
    '// py={0} removes the vertical padding entirely.',
    '<Box className="docs-layout-sample-stack">',
    '  <Section size="1" px={4} className="docs-layout-section-demo">',
    '    <Box className="docs-layout-chip">size=&quot;1&quot; · px 4</Box>',
    '  </Section>',
    '  <Section py={0} className="docs-layout-section-demo">',
    '    <Box className="docs-layout-chip">py 0 · no vertical padding</Box>',
    '  </Section>',
    '</Box>',
  ].join('\n');
  const customPaddingDemoSnippet = [
    '<Section py={3}>',
    '  <Box className="docs-layout-sample-box">',
    '    <h4>Compact Block</h4>',
    '    <p>Set `py` directly for one-off tuning while staying on the spacing scale.</p>',
    '  </Box>',
    '</Section>',
  ].join('\n');

  return (
    <>
      <DocsSection>
        <h1>Section</h1>
        <p>
          `Section` standardizes vertical rhythm across page regions. `size` sets only the vertical
          (top and bottom) padding — there is no horizontal padding by default, so pair it with a
          `Container` or pass `px` / `p`. Use `py` overrides to tune spacing as content density changes.
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Demo</h2>
        <DocsDemoGrid>
          <DemoCard
            title="Preset Sizes"
            description="`size` scales Section's own vertical padding — shown with a visible border so the growing whitespace is legible. The chips touch the sides because there is no horizontal padding."
            code={presetSizesDemoSnippet}
          >
            <Box className="docs-layout-sample-stack">
              <Section size="1" className="docs-layout-section-demo">
                <Box className="docs-layout-chip">size=&quot;1&quot; · space-5 (20px)</Box>
              </Section>
              <Section size="2" className="docs-layout-section-demo">
                <Box className="docs-layout-chip">size=&quot;2&quot; · space-7 (28px)</Box>
              </Section>
              <Section size="3" className="docs-layout-section-demo">
                <Box className="docs-layout-chip">size=&quot;3&quot; · space-10 (48px)</Box>
              </Section>
            </Box>
          </DemoCard>
          <DemoCard
            title="Overrides"
            description="Add horizontal padding with `px` (or `p`); `py={0}` removes the vertical padding."
            code={overridesDemoSnippet}
          >
            <Box className="docs-layout-sample-stack">
              <Section size="1" px={4} className="docs-layout-section-demo">
                <Box className="docs-layout-chip">size=&quot;1&quot; · px 4</Box>
              </Section>
              <Section py={0} className="docs-layout-section-demo">
                <Box className="docs-layout-chip">py 0 · no vertical padding</Box>
              </Section>
            </Box>
          </DemoCard>
          <DemoCard title="Custom Padding" description="Use `py` when a region needs tighter cadence." code={customPaddingDemoSnippet}>
            <Section py={3}>
              <Box className="docs-layout-sample-box">
                <h4>Compact Block</h4>
                <p>Set `py` directly for one-off tuning while staying on the spacing scale.</p>
              </Box>
            </Section>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <h2>Usage</h2>
        <CodeBlock title="Section Usage" code={snippet} />
      </DocsSection>
      <DocsSection>
        <h2>Props</h2>
        <PropsTable
          rows={[
            {
              name: 'as',
              type: 'React.ElementType',
              default: "'section'",
              description: 'Element or component to render Section as.',
            },
            {
              name: 'size',
              type: "'1' | '2' | '3'",
              default: "'2'",
              description:
                "Vertical (top and bottom) padding preset: `--layout-section-1`…`3` (`space-5` / `space-7` / `space-10` by default). Never adds horizontal padding. Overridden by `p`, `py`, `pt`, or `pb`.",
            },
            {
              name: 'py',
              type: 'SpaceValue',
              description:
                'Vertical padding override; takes precedence over `size` and `p`. Numbers and digit-only strings map to space tokens (`0` → `0`, so `py={0}` removes the vertical padding).',
            },
            {
              name: 'p',
              type: 'SpaceValue',
              description:
                'Padding on all sides, replacing the `size` padding. Numbers and digit-only strings map to space tokens; any other string is used as a raw CSS length.',
            },
            {
              name: 'px',
              type: 'SpaceValue',
              default: '0',
              description: 'Horizontal padding (left and right). Section has none by default.',
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
              description: 'Content rendered inside the Section.',
            },
          ]}
        />
      </DocsSection>
    </>
  );
}
