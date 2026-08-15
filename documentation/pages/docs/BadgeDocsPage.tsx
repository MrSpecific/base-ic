import { Badge, Heading } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import { DocsDemoGrid, DocsDemoRow } from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { PropsTable } from "../../components/PropsTable";
import { DemoCard } from "./DemoCard";

export function BadgeDocsPage() {
  const usageSnippet = [
    "import { Badge } from '@wlcr/base-ic';",
    "",
    '<Badge variant="soft" color="blue">New</Badge>',
  ].join("\n");

  const variantsSnippet = [
    '<div className="docs-demo-button-row">',
    '  <Badge variant="solid">Solid</Badge>',
    '  <Badge variant="soft">Soft</Badge>',
    '  <Badge variant="surface">Surface</Badge>',
    '  <Badge variant="outline">Outline</Badge>',
    "</div>",
  ].join("\n");

  const sizesSnippet = [
    '<div className="docs-demo-button-row">',
    '  <Badge size="1">Size 1</Badge>',
    '  <Badge size="2">Size 2</Badge>',
    '  <Badge size="3">Size 3</Badge>',
    "</div>",
  ].join("\n");

  const interactiveSnippet = [
    '<div className="docs-demo-button-row">',
    '  <Badge render={<button type="button" />} variant="surface" color="blue">',
    '    Framework: React ×',
    '  </Badge>',
    "</div>",
  ].join("\n");

  return (
    <>
      <DocsSection>
        <h1>Badge</h1>
        <p>
          `Badge` is a compact status/pill component with token-based sizing and
          visual variants.
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Demo</h2>
        <DocsDemoGrid>
          <DemoCard
            title="Variants"
            description="Use shape and fill to express emphasis."
            code={variantsSnippet}
          >
            <DocsDemoRow>
              <Badge variant="solid">Solid</Badge>
              <Badge variant="soft">Soft</Badge>
              <Badge variant="surface">Surface</Badge>
              <Badge variant="outline">Outline</Badge>
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Sizes"
            description="Scale badges by context density."
            code={sizesSnippet}
          >
            <DocsDemoRow>
              <Badge size="1">Size 1</Badge>
              <Badge size="2">Size 2</Badge>
              <Badge size="3">Size 3</Badge>
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Interactive chip"
            description="Pass `render` to make a Badge a real, keyboard-accessible button — for filter chips and removable tags."
            code={interactiveSnippet}
          >
            <DocsDemoRow>
              <Badge render={<button type="button" />} variant="surface" color="blue">
                Framework: React ×
              </Badge>
            </DocsDemoRow>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Usage</Heading>
        <CodeBlock title="Badge Usage" code={usageSnippet} />
        <p>
          Badge renders a plain <code>&lt;span&gt;</code> by default. For interactive chips (filters, removable
          tags), pass <code>render=&#123;&lt;button type=&quot;button&quot; /&gt;&#125;</code> instead of reaching
          for raw <code>onClick</code> + <code>cursor: pointer</code> on a span — a screen reader announces the
          latter as plain text, not a control, and it's not reachable by keyboard.
        </p>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Props</Heading>
        <PropsTable
          rows={[
            {
              name: "size",
              type: "'1' | '2' | '3'",
              default: "'1'",
              description: "Visual size preset.",
            },
            {
              name: "variant",
              type: "'solid' | 'soft' | 'surface' | 'outline'",
              default: "'soft'",
              description: "Visual style.",
            },
            {
              name: "color",
              type: "AccentColor",
              description: "Override the accent color for this badge.",
            },
            {
              name: "highContrast",
              type: "boolean",
              default: "false",
              description: "Increase foreground contrast against the background.",
            },
            {
              name: "radius",
              type: "'none' | 'small' | 'medium' | 'large' | 'full'",
              description: "Override the border-radius for this badge.",
            },
            {
              name: "render",
              type: "React.ReactElement",
              description:
                "Render as a different element (e.g. a real <button>) while keeping Badge's styling — use for interactive chips.",
            },
            {
              name: "p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml",
              type: "number | string",
              description:
                "Padding/margin shorthand props (e.g. p={3}). Numbers map to spacing scale tokens; strings are used as literal CSS values.",
            },
            {
              name: "children",
              type: "React.ReactNode",
              description: "Badge label/content.",
            },
          ]}
        />
      </DocsSection>
    </>
  );
}
