import { Button, Card, Container, Flex, Grid } from '../../src';
import { DocsSection } from '../components/DocsSection';
import type { Page } from '../types';
import { CodeBlock } from '../components/CodeBlock';

export function ForDesignersPage({ goTo }: { goTo: (page: Page) => void }) {
  const primitiveTokensJson = JSON.stringify({
    color: {
      blue: {
        1: '{color.blue.1}',
        2: '{color.blue.2}',
        3: '{color.blue.3}',
        4: '{color.blue.4}',
        5: '{color.blue.5}',
        6: '{color.blue.6}',
        7: '{color.blue.7}',
        8: '{color.blue.8}',
        9: '{color.blue.9}',
        10: '{color.blue.10}',
        11: '{color.blue.11}',
        12: '{color.blue.12}',
        contrast: '{color.blue.contrast}',
      },
      gray: {
        1: '{color.gray.1}',
        2: '{color.gray.2}',
        3: '{color.gray.3}',
        4: '{color.gray.4}',
        5: '{color.gray.5}',
        6: '{color.gray.6}',
        7: '{color.gray.7}',
        8: '{color.gray.8}',
        9: '{color.gray.9}',
        10: '{color.gray.10}',
        11: '{color.gray.11}',
        12: '{color.gray.12}',
        contrast: '{color.gray.contrast}',
      },
    },
    space: {
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      9: '40px',
      10: '48px',
      11: '64px',
      12: '80px',
    },
    radius: {
      1: '2px',
      2: '4px',
      3: '6px',
      4: '8px',
      5: '12px',
      6: '16px',
      full: '9999px',
    },
    typography: {
      'font-size': {
        1: '12px',
        2: '13px',
        3: '14px',
        4: '16px',
        5: '18px',
        6: '20px',
        7: '24px',
        8: '30px',
        9: '36px',
      },
      'font-family': {
        primary: 'Inter, ui-sans-serif, system-ui, sans-serif',
        display: 'Sora, Inter, ui-sans-serif, system-ui, sans-serif',
        mono: 'JetBrains Mono, ui-monospace, monospace',
      },
    },
  }, null, 2);

  const semanticTokensJson = JSON.stringify({
    color: {
      accent: {
        1: '{color.blue.1}',
        2: '{color.blue.2}',
        3: '{color.blue.3}',
        4: '{color.blue.4}',
        5: '{color.blue.5}',
        6: '{color.blue.6}',
        7: '{color.blue.7}',
        8: '{color.blue.8}',
        9: '{color.blue.9}',
        10: '{color.blue.10}',
        11: '{color.blue.11}',
        12: '{color.blue.12}',
        contrast: '{color.blue.contrast}',
      },
      neutral: {
        1: '{color.gray.1}',
        2: '{color.gray.2}',
        3: '{color.gray.3}',
        4: '{color.gray.4}',
        5: '{color.gray.5}',
        6: '{color.gray.6}',
        7: '{color.gray.7}',
        8: '{color.gray.8}',
        9: '{color.gray.9}',
        10: '{color.gray.10}',
        11: '{color.gray.11}',
        12: '{color.gray.12}',
      },
      text: {
        primary: '{color.neutral.12}',
        secondary: '{color.neutral.11}',
        tertiary: '{color.neutral.10}',
        disabled: '{color.neutral.8}',
      },
      border: {
        subtle: '{color.neutral.6}',
        default: '{color.neutral.7}',
        strong: '{color.neutral.8}',
      },
      surface: {
        base: '{color.neutral.1}',
        subtle: '{color.neutral.2}',
        raised: '#ffffff',
        overlay: '#ffffff',
      },
      status: {
        danger: {
          bg: '{color.red.3}',
          border: '{color.red.7}',
          text: '{color.red.11}',
          solid: '{color.red.9}',
          contrast: '{color.red.contrast}',
        },
        success: {
          bg: '{color.green.3}',
          border: '{color.green.7}',
          text: '{color.green.11}',
          solid: '{color.green.9}',
          contrast: '{color.green.contrast}',
        },
        warning: {
          bg: '{color.orange.3}',
          border: '{color.orange.7}',
          text: '{color.orange.11}',
          solid: '{color.orange.9}',
          contrast: '{color.orange.contrast}',
        },
        info: {
          bg: '{color.blue.3}',
          border: '{color.blue.7}',
          text: '{color.blue.11}',
          solid: '{color.blue.9}',
          contrast: '{color.blue.contrast}',
        },
      },
    },
  }, null, 2);

  const componentPatternTokensJson = JSON.stringify({
    component: {
      radius: '{radius.3}',
      scale: '1',
      button: {
        'padding-y': '{space.2}',
        'padding-x': '{space.4}',
        'min-height': '40px',
        'font-size': '{typography.font-size.3}',
        radius: '{component.radius}',
      },
      badge: {
        'padding-y': '{space.1}',
        'padding-x': '{space.3}',
        'min-height': '32px',
        'font-size': '{typography.font-size.2}',
        radius: '{radius.full}',
      },
      surface: {
        'padding-y': '{space.4}',
        'padding-x': '{space.4}',
        radius: 'min({component.radius}, {radius.4})',
      },
    },
  }, null, 2);

  return (
    <Container as="main" className="site-page docs-page">
      <DocsSection>
        <h1>For Designers</h1>
        <p>
          Use these token conventions to set up Figma variables quickly and keep your designs aligned with Base-IC semantics.
          Product teams can then swap themes in code without redesigning component structure.
        </p>
      </DocsSection>

      <DocsSection>
        <h2>Token Scales at a Glance</h2>
        <Grid className="designer-grid" columns="repeat(auto-fit, minmax(200px, 1fr))" gap={3}>
          <Card className="designer-card">
            <h3>Color Steps</h3>
            <p>Every hue uses a 12-step scale plus contrast.</p>
            <p className="designer-note">1-2 backgrounds, 3-5 subtle surfaces, 6-8 borders, 9-10 solid fills, 11-12 text/icons.</p>
          </Card>
          <Card className="designer-card">
            <h3>Spacing</h3>
            <p>`space-1` to `space-12` (4px to 80px)</p>
            <p className="designer-note">Use these for padding, gap, section rhythm, and component internals.</p>
          </Card>
          <Card className="designer-card">
            <h3>Radius</h3>
            <p>`radius-1` to `radius-6` plus `radius-full`</p>
            <p className="designer-note">Component rounding is controlled globally through `component-radius`.</p>
          </Card>
          <Card className="designer-card">
            <h3>Type Scale</h3>
            <p>`font-size-1` to `font-size-9` (12px to 36px)</p>
            <p className="designer-note">Map to text styles in Figma so docs and UI match in both tools.</p>
          </Card>
        </Grid>
      </DocsSection>

      <DocsSection>
        <h2>Copyable JSON Token Objects</h2>
        <p>
          These JSON objects are formatted for quick copy/paste into design-token plugins,
          internal scripts, or handoff docs used by your Figma team.
        </p>
        <CodeBlock title="Primitives (colors, spacing, type, radius)" code={primitiveTokensJson} />
        <CodeBlock title="Semantics (accent, neutral, text, surfaces, status)" code={semanticTokensJson} />
        <CodeBlock title="Component Patterns (button, badge, surface)" code={componentPatternTokensJson} />
      </DocsSection>

      <DocsSection>
        <h2>Figma Variable Naming</h2>
        <p>
          Mirror code token names in Figma variables to reduce translation overhead during handoff.
          Keep aliases (`accent`, `neutral`, `status`) separate from raw hue scales.
        </p>
        <CodeBlock title="Figma Variable Naming" code={[
          'color/blue/1',
          'color/blue/2',
          '...',
          'color/blue/12',
          'color/blue/contrast',
          'color/accent/1',
          '...',
          'color/accent/12',
          'color/neutral/1',
          '...',
          'color/neutral/12',
          'font/family/primary',
          'font/family/display',
          'font/family/mono',
          'radius/1',
          'radius/2',
          '...',
          'radius/full',
        ].join('\n')} />
      </DocsSection>

      <DocsSection>
        <h2>Recommended Figma Setup Workflow</h2>
        <ul className="docs-list">
          <li>1. Create color collections for each hue with 1-12 + contrast variables.</li>
          <li>2. Create semantic aliases: accent, neutral, text, border, surface, status.</li>
          <li>3. Create primitive collections for spacing, radius, and type scale.</li>
          <li>4. Build component libraries using only semantic variables for fill/stroke/text.</li>
          <li>5. Validate themes in Playground and sync any token changes back to Figma.</li>
        </ul>
        <Flex className="hero-actions" gap={2}>
          <Button size="3" onClick={() => goTo('playground')}>Open Playground</Button>
          <Button size="3" variant="surface" onClick={() => goTo('customization')}>View Customization</Button>
        </Flex>
      </DocsSection>
    </Container>
  );
}
