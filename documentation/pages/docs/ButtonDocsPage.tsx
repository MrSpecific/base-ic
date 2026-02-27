import { Button } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DocsSection } from '../../components/DocsSection';
import { DemoCard } from './DemoCard';

export function ButtonDocsPage() {
  const usageSnippet = [
    "import { Button } from 'base-ic';",
    '',
    '<Button size="2" variant="solid">Save changes</Button>',
  ].join('\n');

  const variantsSnippet = [
    '<div className="docs-demo-button-row">',
    '  <Button variant="solid">Solid</Button>',
    '  <Button variant="soft">Soft</Button>',
    '  <Button variant="surface">Surface</Button>',
    '  <Button variant="outline">Outline</Button>',
    '  <Button variant="ghost">Ghost</Button>',
    '</div>',
  ].join('\n');

  const statesSnippet = [
    '<div className="docs-demo-button-row">',
    '  <Button>Default</Button>',
    '  <Button loading>Loading</Button>',
    '  <Button disabled>Disabled</Button>',
    '  <Button highContrast>High Contrast</Button>',
    '</div>',
  ].join('\n');

  return (
    <>
      <DocsSection>
        <h1>Button</h1>
        <p>
          `Button` is a styled action primitive with size, variant, radius, color override, and loading states.
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Built On Base UI</h2>
        <p>
          This component wraps the Base UI Button primitive. Base primitive docs:{' '}
          <a href="https://base-ui.com/react/components/button" target="_blank" rel="noreferrer">
            base-ui.com/react/components/button
          </a>
          .
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Demo</h2>
        <div className="docs-demo-grid">
          <DemoCard
            title="Variants"
            description="Choose visual emphasis per context."
            code={variantsSnippet}
          >
            <div className="docs-demo-button-row">
              <Button variant="solid">Solid</Button>
              <Button variant="soft">Soft</Button>
              <Button variant="surface">Surface</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </DemoCard>
          <DemoCard
            title="States"
            description="Loading, disabled, and contrast behaviors."
            code={statesSnippet}
          >
            <div className="docs-demo-button-row">
              <Button>Default</Button>
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
              <Button highContrast>High Contrast</Button>
            </div>
          </DemoCard>
        </div>
      </DocsSection>
      <DocsSection>
        <h2>Usage</h2>
        <CodeBlock title="Button Usage" code={usageSnippet} />
      </DocsSection>
    </>
  );
}
