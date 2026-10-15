import { Container, Heading } from "../../src";
import { DocsSection } from "../components/DocsSection";
import { DocsList } from "../components/DocsPrimitives";
import { CodeBlock } from "../components/CodeBlock";
import { ButtonLink } from "../components/RouteLink";
import { pageToPath } from "../routes";

export function CustomizationPage() {
  const customColorSnippet = [
    "<Theme",
    '  accentColor="brand"',
    "  customColors={{",
    "    brand: {",
    "      1: 'oklch(98% 0.01 250)',",
    "      2: 'oklch(96% 0.02 250)',",
    "      3: 'oklch(93% 0.04 250)',",
    "      4: 'oklch(89% 0.06 250)',",
    "      5: 'oklch(84% 0.08 250)',",
    "      6: 'oklch(77% 0.10 250)',",
    "      7: 'oklch(69% 0.12 250)',",
    "      8: 'oklch(60% 0.14 250)',",
    "      9: 'oklch(52% 0.15 250)',",
    "      10: 'oklch(46% 0.15 250)',",
    "      11: 'oklch(38% 0.13 250)',",
    "      12: 'oklch(22% 0.08 250)',",
    "      contrast: 'white',",
    "    },",
    "  }}",
    ">",
    "  <App />",
    "</Theme>",
  ].join("\n");

  const fontSnippet = [
    "<Theme",
    "  fontFamily={{",
    "    primary: 'Inter, ui-sans-serif, system-ui, sans-serif',",
    "    display: 'Sora, Inter, ui-sans-serif, system-ui, sans-serif',",
    "    monospace: 'JetBrains Mono, ui-monospace, monospace',",
    "  }}",
    ">",
    "  <App />",
    "</Theme>",
  ].join("\n");

  const semanticSnippet = [
    "/* Scoped: <Theme className=\"app-theme\"> (or any element inside a Theme). */",
    ".app-theme {",
    "  /* Default (size=\"2\") buttons: taller, roomier */",
    "  --button-2-height: 2.75rem;",
    "  --button-2-px: var(--space-4);",
    "  --button-2-font-size: var(--font-size-3);",
    "",
    "  /* Card corners */",
    "  --card-radius: 10px;",
    "",
    "  /* Size 2 badges */",
    "  --badge-2-height: 1.75rem;",
    "}",
    "",
    "/* Global: semantic tokens are re-declared on every Theme root, so a",
    "   plain :root rule is shadowed inside <Theme>. Target both. */",
    ":root,",
    "[data-base-ic-theme] {",
    "  --button-2-height: 2.75rem;",
    "}",
  ].join("\n");

  return (
    <Container as="main" className="site-page docs-page">
      <DocsSection>
        <Heading>Customization</Heading>
        <p>
          Base-ic is designed to be customized through <code>Theme</code> props and
          semantic CSS tokens. Start with runtime props, then promote stable
          patterns into tokens.
        </p>
      </DocsSection>

      <DocsSection>
        <Heading as="h2">1. Extend Color Palettes</Heading>
        <p>
          Add brand palettes with <code>customColors</code>, then point <code>accentColor</code> at
          your custom name. Provide all 12 steps plus a contrast color for solid
          fills.
        </p>
        <CodeBlock title="Custom Color Palette" code={customColorSnippet} />
      </DocsSection>

      <DocsSection>
        <Heading as="h2">2. Override Font Families</Heading>
        <p>
          Set <code>fontFamily</code> slots for primary UI text, display typography, and
          monospace surfaces. Unspecified slots continue to inherit defaults.
        </p>
        <CodeBlock title="Font Family Overrides" code={fontSnippet} />
      </DocsSection>

      <DocsSection>
        <Heading as="h2">3. Tune Semantic Tokens</Heading>
        <p>
          Components read semantic tokens such as <code>--button-2-height</code>,
          <code>--badge-2-height</code> and <code>--card-radius</code>. Redefine them on
          the Theme element (pass it a <code>className</code>) or any element inside it and every
          component below picks them up — no component overrides needed. For a global override,
          target <code>:root, [data-base-ic-theme]</code>: these tokens are re-declared on every Theme
          root so they follow that Theme's accent, gray, radius and scaling, which shadows a plain
          <code>:root</code> rule. The full list lives in{" "}
          <code>@wlcr/base-ic/tokens</code> (<code>semantic.css</code>).
        </p>
        <CodeBlock title="Semantic Token Overrides" code={semanticSnippet} />
      </DocsSection>

      <DocsSection>
        <Heading as="h2">Recommended Workflow</Heading>
        <DocsList>
          <li>1. Pick accent/gray/radius/scaling/appearance in Theme props.</li>
          <li>
            2. Define brand color ramps with <code>customColors</code> when defaults are
            not enough.
          </li>
          <li>3. Set typography with <code>fontFamily</code> slots.</li>
          <li>4. Move shared UI decisions into semantic tokens.</li>
          <li>5. Validate combinations in the playground.</li>
        </DocsList>
        <ButtonLink size="3" href={pageToPath("playground")}>
          Open Playground
        </ButtonLink>
      </DocsSection>
    </Container>
  );
}
