import { Quote } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DocsDemoGrid } from '../../components/DocsPrimitives';
import { DocsSection } from '../../components/DocsSection';
import { DemoCard } from './DemoCard';

export function QuoteDocsPage() {
  const usageSnippet = [
    "import { Quote } from '@wlcr/base-ic';",
    '',
    '<Quote>Design consistency scales product quality.</Quote>',
  ].join('\n');

  const defaultSnippet = [
    '<Quote>',
    '  Design consistency scales product quality and shipping speed.',
    '</Quote>',
  ].join('\n');

  const contrastSnippet = [
    '<Quote color="blue" highContrast>',
    '  Semantic styling keeps quote components readable in every theme mode.',
    '</Quote>',
  ].join('\n');

  return (
    <>
      <DocsSection>
        <h1>Quote</h1>
        <p>
          `Quote` is a block-level pull-quote primitive with semantic border, spacing,
          and typography defaults.
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Demo</h2>
        <DocsDemoGrid>
          <DemoCard title="Default Quote" description="Use for pull-quotes and highlighted principles." code={defaultSnippet}>
            <Quote>
              Design consistency scales product quality and shipping speed.
            </Quote>
          </DemoCard>
          <DemoCard title="Contrast Variant" description="Tune quote emphasis with semantic color props." code={contrastSnippet}>
            <Quote color="blue" highContrast>
              Semantic styling keeps quote components readable in every theme mode.
            </Quote>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <h2>Usage</h2>
        <CodeBlock title="Quote Usage" code={usageSnippet} />
      </DocsSection>
    </>
  );
}
