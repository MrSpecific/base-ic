import { Flex, Separator } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DemoCard } from './DemoCard';

export function SeparatorDocsPage() {
  const usageSnippet = [
    "import { Separator } from 'base-ic';",
    '',
    '<Separator />',
  ].join('\n');

  const horizontalSnippet = [
    '<div>',
    '  <div>Profile</div>',
    '  <Separator size="2" />',
    '  <div>Team</div>',
    '</div>',
  ].join('\n');

  const verticalSnippet = [
    '<Flex align="center" gap={2} style={{ height: 28 }}>',
    '  <span>General</span>',
    '  <Separator orientation="vertical" size="2" />',
    '  <span>Advanced</span>',
    '</Flex>',
  ].join('\n');

  return (
    <>
      <section className="docs-section">
        <h1>Separator</h1>
        <p>
          `Separator` provides subtle visual boundaries between content groups with horizontal or vertical orientation.
        </p>
      </section>
      <section className="docs-section">
        <h2>Built On Base UI</h2>
        <p>
          This component wraps the Base UI Separator primitive. Base primitive docs:{' '}
          <a href="https://base-ui.com/react/components/separator" target="_blank" rel="noreferrer">
            base-ui.com/react/components/separator
          </a>
          .
        </p>
      </section>
      <section className="docs-section">
        <h2>Demo</h2>
        <div className="docs-demo-grid">
          <DemoCard title="Horizontal" description="Divide stacked content sections." code={horizontalSnippet}>
            <div className="docs-layout-sample-box">
              <div>Profile</div>
              <Separator size="2" />
              <div>Team</div>
            </div>
          </DemoCard>
          <DemoCard title="Vertical" description="Split inline controls or labels." code={verticalSnippet}>
            <Flex align="center" gap={2} style={{ height: 28 }}>
              <span>General</span>
              <Separator orientation="vertical" size="2" />
              <span>Advanced</span>
            </Flex>
          </DemoCard>
        </div>
      </section>
      <section className="docs-section">
        <h2>Usage</h2>
        <CodeBlock title="Separator Usage" code={usageSnippet} />
      </section>
    </>
  );
}
