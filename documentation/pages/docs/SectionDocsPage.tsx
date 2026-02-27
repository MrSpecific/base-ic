import { Box, Section } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DocsSection } from '../../components/DocsSection';
import { DemoCard } from './DemoCard';

export function SectionDocsPage() {
  const snippet = [
    "import { Section } from 'base-ic';",
    '',
    '<Section size="2">',
    '  <h2>Roadmap</h2>',
    '  <p>Section manages vertical rhythm.</p>',
    '</Section>',
  ].join('\n');
  const presetSizesDemoSnippet = [
    '<Box className="docs-layout-sample-stack">',
    '  <Section size="1"><Box className="docs-layout-chip">Section 1</Box></Section>',
    '  <Section size="2"><Box className="docs-layout-chip">Section 2</Box></Section>',
    '  <Section size="3"><Box className="docs-layout-chip">Section 3</Box></Section>',
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
        <div className="docs-demo-grid">
          <DemoCard title="Preset Sizes" description="`size` scales spacing with semantic tokens." code={presetSizesDemoSnippet}>
            <Box className="docs-layout-sample-stack">
              <Section size="1"><Box className="docs-layout-chip">Section 1</Box></Section>
              <Section size="2"><Box className="docs-layout-chip">Section 2</Box></Section>
              <Section size="3"><Box className="docs-layout-chip">Section 3</Box></Section>
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
        </div>
      </DocsSection>
      <DocsSection>
        <h2>Usage</h2>
        <CodeBlock title="Section Usage" code={snippet} />
      </DocsSection>
    </>
  );
}
