import { Badge, Box, Button, Card, Text, Theme } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DocsDemoGrid, DocsDemoRow, DocsEyebrow, DocsList } from '../../components/DocsPrimitives';
import { DocsSection } from '../../components/DocsSection';
import { DemoCard } from './DemoCard';

export function ThemeDocsPage() {
  const themingSnippet = [
    '<Theme',
    '  accentColor="blue"',
    '  grayColor="mauve"',
    '  radius="large"',
    '  scaling="110%"',
    '  appearance="light"',
    '>',
    '  <App />',
    '</Theme>',
  ].join('\n');
  const productThemeDemoSnippet = [
    "import { Button, Theme } from '@wlcr/base-ic';",
    '',
    '<Theme accentColor="blue" grayColor="slate" radius="medium" scaling="100%">',
    '  <p className="docs-demo-eyebrow">Blue + Slate</p>',
    '  <div className="docs-demo-button-row">',
    '    <Button variant="solid" size="3">Primary Action</Button>',
    '    <Button variant="surface" size="3">Secondary Action</Button>',
    '  </div>',
    '</Theme>',
  ].join('\n');

  const marketingThemeDemoSnippet = [
    "import { Button, Theme } from '@wlcr/base-ic';",
    '',
    '<Theme accentColor="orange" grayColor="gray" radius="large" scaling="100%">',
    '  <p className="docs-demo-eyebrow">Orange + Gray</p>',
    '  <div className="docs-demo-button-row">',
    '    <Button variant="solid" size="3">Get Started</Button>',
    '    <Button variant="surface" size="3">Learn More</Button>',
    '  </div>',
    '</Theme>',
  ].join('\n');

  const radiusSnippet = [
    '<Theme radius="none"><Card variant="surface">Card</Card></Theme>',
    '<Theme radius="small"><Card variant="surface">Card</Card></Theme>',
    '<Theme radius="medium"><Card variant="surface">Card</Card></Theme>',
    '<Theme radius="large"><Card variant="surface">Card</Card></Theme>',
    '<Theme radius="full"><Card variant="surface">Card</Card></Theme>',
  ].join('\n');

  const scalingSnippet = [
    '<Theme scaling="90%"><Button size="3">90%</Button></Theme>',
    '<Theme scaling="100%"><Button size="3">100%</Button></Theme>',
    '<Theme scaling="120%"><Button size="3">120%</Button></Theme>',
  ].join('\n');

  const appearanceSnippet = [
    '<Theme appearance="light" accentColor="violet">',
    '  <Card variant="surface">Forced light</Card>',
    '</Theme>',
    '<Theme appearance="dark" accentColor="violet">',
    '  <Card variant="surface">Forced dark</Card>',
    '</Theme>',
  ].join('\n');

  const customColorSnippet = [
    '<Theme',
    '  accentColor="brand"',
    '  customColors={{',
    '    brand: {',
    "      1: 'oklch(98% 0.01 340)', 2: 'oklch(96% 0.02 340)',",
    "      3: 'oklch(93% 0.04 340)', 4: 'oklch(89% 0.06 340)',",
    "      5: 'oklch(84% 0.08 340)', 6: 'oklch(78% 0.10 340)',",
    "      7: 'oklch(70% 0.12 340)', 8: 'oklch(60% 0.14 340)',",
    "      9: 'oklch(50% 0.16 340)', 10: 'oklch(44% 0.16 340)',",
    "      11: 'oklch(36% 0.14 340)', 12: 'oklch(20% 0.10 340)',",
    "      contrast: 'white',",
    '    },',
    '  }}',
    '>',
    '  <Button color="brand">On-brand button</Button>',
    '</Theme>',
  ].join('\n');

  const nestedThemeSnippet = [
    '<Theme accentColor="blue">',
    '  <Button color="blue">Inherits blue</Button>',
    '',
    '  <Theme accentColor="crimson">',
    '    {/* Only this subtree sees the override */}',
    '    <Button color="crimson">Scoped to crimson</Button>',
    '  </Theme>',
    '',
    '  <Button color="blue">Still blue</Button>',
    '</Theme>',
  ].join('\n');

  const useThemeSnippet = [
    "import { useTheme } from '@wlcr/base-ic';",
    '',
    'function ThemeAwareIcon() {',
    '  const { accentColor, appearance } = useTheme();',
    '  return <span>{accentColor} / {appearance}</span>;',
    '}',
  ].join('\n');

  return (
    <>
      <DocsSection>
        <h1>Theme</h1>
        <p>
          `Theme` is the foundation of Base-IC. It controls accent/neutral palettes, radius, scale,
          appearance, and typography slots for every component below it — by rewiring a small set of
          semantic CSS custom properties (`--color-accent-*`, `--color-neutral-*`, `--component-radius`,
          `--component-scaling`, `--font-family-*`), not by re-styling components one at a time.
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Live Examples</h2>
        <DocsDemoGrid>
          <Theme accentColor="blue" grayColor="slate" radius="medium" scaling="100%" appearance="inherit">
            <DemoCard
              title="Product Theme"
              description="Balanced neutral palette for most product surfaces."
              code={productThemeDemoSnippet}
            >
              <DocsEyebrow>Blue + Slate</DocsEyebrow>
              <DocsDemoRow>
                <Button variant="solid" size="3">Primary Action</Button>
                <Button variant="surface" size="3">Secondary Action</Button>
              </DocsDemoRow>
            </DemoCard>
          </Theme>
          <Theme accentColor="orange" grayColor="gray" radius="large" scaling="100%" appearance="inherit">
            <DemoCard
              title="Marketing Theme"
              description="Higher energy accent and softer card shape for campaigns."
              code={marketingThemeDemoSnippet}
            >
              <DocsEyebrow>Orange + Gray</DocsEyebrow>
              <DocsDemoRow>
                <Button variant="solid" size="3">Get Started</Button>
                <Button variant="surface" size="3">Learn More</Button>
              </DocsDemoRow>
            </DemoCard>
          </Theme>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <h2>Radius</h2>
        <p>
          `radius` sets `--component-radius`, which every component's border-radius derives from. Surfaces
          (Card, panels) clamp it into their own scale rather than using it verbatim, so large radii don't
          turn big surfaces into pills.
        </p>
        <DocsDemoGrid>
          <DemoCard title="Radius scale" description="none · small · medium · large · full" code={radiusSnippet}>
            <DocsDemoRow>
              {(['none', 'small', 'medium', 'large', 'full'] as const).map((radius) => (
                <Theme key={radius} radius={radius} appearance="inherit">
                  <Card variant="surface" size="2" style={{ minWidth: '6.5rem', textAlign: 'center' }}>
                    <Text size="1" style={{ color: 'var(--color-text-secondary)' }}>{radius}</Text>
                  </Card>
                </Theme>
              ))}
            </DocsDemoRow>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <h2>Scaling</h2>
        <p>
          `scaling` is a multiplier (80%–150%) applied to every space/size/font-size primitive via
          `calc(base * var(--component-scaling))`. Use it to shrink UI density for a data-heavy admin
          panel, or grow it for a touch-first or presentation surface — without editing individual
          components.
        </p>
        <DocsDemoGrid>
          <DemoCard title="Scaling multiplier" description="Same Button, three scaling factors." code={scalingSnippet}>
            <DocsDemoRow>
              {(['90%', '100%', '120%'] as const).map((scaling) => (
                <Theme key={scaling} scaling={scaling} appearance="inherit">
                  <Button size="3">{scaling}</Button>
                </Theme>
              ))}
            </DocsDemoRow>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <h2>Appearance</h2>
        <p>
          `appearance` forces `light` or `dark` regardless of OS preference, or `inherit` (the default) to
          follow `prefers-color-scheme`. A root `Theme` also syncs its appearance onto `&lt;body&gt;`, so
          portaled content (Tooltip, Popover, Dialog, Menu) that renders outside the Theme's own DOM subtree
          still picks up the right mode.
        </p>
        <DocsDemoGrid>
          <DemoCard title="Forced appearance" description="Independent of the OS/browser setting." code={appearanceSnippet}>
            <DocsDemoRow>
              <Theme appearance="light" accentColor="violet">
                <Card variant="surface" size="3" style={{ minWidth: '10rem' }}>
                  <Text size="2">Forced light</Text>
                </Card>
              </Theme>
              <Theme appearance="dark" accentColor="violet">
                <Card variant="surface" size="3" style={{ minWidth: '10rem' }}>
                  <Text size="2">Forced dark</Text>
                </Card>
              </Theme>
            </DocsDemoRow>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <h2>Custom brand colors</h2>
        <p>
          Unlike a fixed palette, adding a brand hue is first-class: pass a full 12-step
          `CustomColorScale` (plus a `contrast` value for text on solid fills) via `customColors`, then
          reference it by name anywhere a built-in hue would go — including `Theme`'s own `accentColor`.
        </p>
        <DocsDemoGrid>
          <Theme
            accentColor="brand"
            appearance="inherit"
            customColors={{
              brand: {
                1: 'oklch(98% 0.01 340)', 2: 'oklch(96% 0.02 340)',
                3: 'oklch(93% 0.04 340)', 4: 'oklch(89% 0.06 340)',
                5: 'oklch(84% 0.08 340)', 6: 'oklch(78% 0.10 340)',
                7: 'oklch(70% 0.12 340)', 8: 'oklch(60% 0.14 340)',
                9: 'oklch(50% 0.16 340)', 10: 'oklch(44% 0.16 340)',
                11: 'oklch(36% 0.14 340)', 12: 'oklch(20% 0.10 340)',
                contrast: 'white',
              },
            }}
          >
            <DemoCard
              title="Custom hue as accent"
              description="A brand color that isn't in the built-in palette, wired up in one prop."
              code={customColorSnippet}
            >
              <DocsDemoRow>
                <Button color="brand" variant="solid">On-brand button</Button>
                <Badge color="brand" variant="soft">On-brand badge</Badge>
              </DocsDemoRow>
            </DemoCard>
          </Theme>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <h2>Nested themes</h2>
        <p>
          A `Theme` inside another `Theme` overrides tokens only for its own subtree — everything outside
          it keeps inheriting from the nearest ancestor `Theme`. Only the outermost (root) `Theme` syncs its
          appearance/color/scaling onto `&lt;body&gt;` for portaled content; nested themes stay scoped to
          their own DOM.
        </p>
        <DocsDemoGrid>
          <Theme accentColor="blue" appearance="inherit">
            <DemoCard
              title="Scoped override"
              description="An inner Theme changes color for one region only."
              code={nestedThemeSnippet}
            >
              <Box>
                <DocsDemoRow>
                  <Button color="blue">Inherits blue</Button>
                </DocsDemoRow>
                <Theme accentColor="crimson" appearance="inherit">
                  <Box mt="3" p="3" style={{ border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-3)' }}>
                    <DocsEyebrow>Scoped to this box</DocsEyebrow>
                    <DocsDemoRow>
                      <Button color="crimson">Scoped to crimson</Button>
                    </DocsDemoRow>
                  </Box>
                </Theme>
                <DocsDemoRow>
                  <Button color="blue" style={{ marginTop: 'var(--space-3)' }}>Still blue</Button>
                </DocsDemoRow>
              </Box>
            </DemoCard>
          </Theme>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <h2>Reading theme state — `useTheme()`</h2>
        <p>
          Custom components that need to branch on the active theme (rather than just inherit CSS
          variables) can read the current `accentColor`, `grayColor`, `radius`, `scaling`, `appearance`,
          and `fontFamily` via the `useTheme` hook. It returns whatever the nearest ancestor `Theme`
          resolved — or base-ic's defaults if no `Theme` is present.
        </p>
        <CodeBlock title="useTheme" code={useThemeSnippet} />
      </DocsSection>
      <DocsSection>
        <h2>Usage</h2>
        <CodeBlock title="Theme Usage" code={themingSnippet} />
      </DocsSection>
      <DocsSection>
        <h2>Props</h2>
        <DocsList>
          <li>`accentColor` — primary brand hue. Maps to `--color-accent-1..12` and `--color-accent-contrast`. Default `"blue"`.</li>
          <li>`grayColor` — neutral hue (`gray`, `mauve`, `slate`, `sage`, `olive`, `sand`). Maps to `--color-neutral-1..12`. Default `"gray"`.</li>
          <li>`radius` — `"none" | "small" | "medium" | "large" | "full"`. Sets `--component-radius`; surfaces clamp it into their own scale. Default `"medium"`.</li>
          <li>`scaling` — `"80%"` through `"150%"` in 5% steps. Multiplies every space/size/font-size primitive via `--component-scaling`. Default `"100%"`.</li>
          <li>`appearance` — `"light" | "dark" | "inherit"`. `"inherit"` follows `prefers-color-scheme`; the other two force a mode and sync it to `&lt;body&gt;` when this is the root Theme. Default `"inherit"`.</li>
          <li>`fontFamily` — per-slot overrides (`primary`, `secondary`, `tertiary`, `display`, `monospace`). Unspecified slots inherit from `semantic.css` defaults rather than being clobbered.</li>
          <li>`customColors` — `Record&lt;name, CustomColorScale&gt;`, each a full 12-step scale plus `contrast`. Makes brand hues usable anywhere a built-in `AccentColor` is accepted, including as `accentColor` itself.</li>
        </DocsList>
      </DocsSection>
    </>
  );
}
