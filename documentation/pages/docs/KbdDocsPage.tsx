import { Kbd, Text } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DocsDemoGrid } from '../../components/DocsPrimitives';
import { DocsSection } from '../../components/DocsSection';
import { DemoCard } from './DemoCard';

export function KbdDocsPage() {
  const usageSnippet = [
    "import { Kbd } from 'base-ic';",
    '',
    '<Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>',
  ].join('\n');

  const shortcutsSnippet = [
    '<div>',
    '  <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> Search',
    '  <Kbd>Shift</Kbd> + <Kbd>P</Kbd> Command Palette',
    '</div>',
  ].join('\n');

  const sizesSnippet = [
    '<div>',
    '  <Kbd size="1">Esc</Kbd>',
    '  <Kbd size="2">Enter</Kbd>',
    '  <Kbd size="3">Shift</Kbd>',
    '</div>',
  ].join('\n');

  return (
    <>
      <DocsSection>
        <h1>Kbd</h1>
        <p>
          `Kbd` renders keyboard keycaps for shortcuts and command hints.
          It aligns with typography and surface tokens automatically.
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Demo</h2>
        <DocsDemoGrid>
          <DemoCard title="Shortcut Labels" description="Represent key combinations clearly in docs and UI." code={shortcutsSnippet}>
            <div>
              <Text><Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> Search</Text>
              <Text><Kbd>Shift</Kbd> + <Kbd>P</Kbd> Command Palette</Text>
            </div>
          </DemoCard>
          <DemoCard title="Sizes" description="Scale keycaps with typography context." code={sizesSnippet}>
            <div>
              <Kbd size="1">Esc</Kbd>{' '}
              <Kbd size="2">Enter</Kbd>{' '}
              <Kbd size="3">Shift</Kbd>
            </div>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <h2>Usage</h2>
        <CodeBlock title="Kbd Usage" code={usageSnippet} />
      </DocsSection>
    </>
  );
}
