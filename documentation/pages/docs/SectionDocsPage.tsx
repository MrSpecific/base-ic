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
          `Section` standardizes vertical rhythm across page regions. Use size presets or `py` overrides to
          keep spacing consistent while content density changes.
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Demo</h2>
        <DocsDemoGrid>
          <DemoCard
            title="Preset Sizes"
            description="`size` scales Section's own padding — shown here with a visible border so the growing whitespace is legible."
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
              description: "Vertical padding preset (`space-5`, `space-7`, `space-10`). Ignored when `py` is set.",
            },
            {
              name: 'py',
              type: 'number | string',
              description: "Vertical padding override. Numbers map to spacing scale tokens; takes precedence over `size`.",
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
