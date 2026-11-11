import { Box, Button, Flex, Heading } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import { DocsDemoGrid } from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { PropsTable } from "../../components/PropsTable";
import { DemoCard } from "./DemoCard";

export function FlexDocsPage() {
  const snippet = [
    "import { Flex } from '@wlcr/base-ic';",
    "",
    '<Flex align="center" justify="space-between" gap={3}>',
    "  <span>Left</span>",
    "  <span>Right</span>",
    "</Flex>",
  ].join("\n");
  const toolbarDemoSnippet = [
    "import { Button, Flex } from '@wlcr/base-ic';",
    "",
    '<Flex align="center" justify="space-between" gap={3} className="docs-layout-sample-box">',
    "  <strong>Workspace</strong>",
    "  <Flex gap={2}>",
    '    <Button variant="surface" size="2">Cancel</Button>',
    '    <Button size="2">Save</Button>',
    "  </Flex>",
    "</Flex>",
  ].join("\n");
  const stackedDemoSnippet = [
    '<Flex direction="column" gap={2} className="docs-layout-sample-box">',
    "  {['Alpha', 'Beta', 'Gamma'].map((item) => (",
    '    <Box key={item} className="docs-layout-chip">{item}</Box>',
    "  ))}",
    "</Flex>",
  ].join("\n");

  return (
    <>
      <DocsSection>
        <h1>Flex</h1>
        <p>
          `Flex` is a token-aware flexbox primitive. Configure direction,
          alignment, wrapping, and gap with ergonomic props while preserving
          semantic markup with `as`.
        </p>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Toolbar Row"
            description="Horizontal distribution with centered alignment."
            code={toolbarDemoSnippet}
          >
            <Flex
              align="center"
              justify="space-between"
              gap={3}
              className="docs-layout-sample-box"
            >
              <strong>Workspace</strong>
              <Flex gap={2}>
                <Button variant="surface" size="2">
                  Cancel
                </Button>
                <Button size="2">Save</Button>
              </Flex>
            </Flex>
          </DemoCard>
          <DemoCard
            title="Stacked Blocks"
            description="Vertical flow using direction and gap tokens."
            code={stackedDemoSnippet}
          >
            <Flex direction="column" gap={2} className="docs-layout-sample-box">
              {["Alpha", "Beta", "Gamma"].map((item) => (
                <Box key={item} className="docs-layout-chip">
                  {item}
                </Box>
              ))}
            </Flex>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <h2>Usage</h2>
        <CodeBlock title="Flex Usage" code={snippet} />
      </DocsSection>
      <DocsSection>
        <h2>Props</h2>
        <PropsTable
          rows={[
            {
              name: "as",
              type: "React.ElementType",
              default: "'div'",
              description: "Element or component to render Flex as.",
            },
            {
              name: "direction",
              type: "Responsive<React.CSSProperties['flexDirection']>",
              description: "Sets `flex-direction` (e.g. `'row'`, `'column'`).",
            },
            {
              name: "align",
              type: "Responsive<React.CSSProperties['alignItems']>",
              description: "Sets `align-items`.",
            },
            {
              name: "justify",
              type: "Responsive<React.CSSProperties['justifyContent']>",
              description: "Sets `justify-content`.",
            },
            {
              name: "wrap",
              type: "Responsive<React.CSSProperties['flexWrap']>",
              description: "Sets `flex-wrap`.",
            },
            {
              name: "gap",
              type: "Responsive<number | string>",
              description: "Gap between children. Numbers map to spacing scale tokens.",
            },
            {
              name: "p",
              type: "Responsive<SpaceValue>",
              description: "Padding on all sides. Numbers map to spacing scale tokens.",
            },
            {
              name: "px",
              type: "Responsive<SpaceValue>",
              description: "Horizontal padding (left and right).",
            },
            {
              name: "py",
              type: "Responsive<SpaceValue>",
              description: "Vertical padding (top and bottom).",
            },
            {
              name: "pt",
              type: "Responsive<SpaceValue>",
              description: "Padding top.",
            },
            {
              name: "pr",
              type: "Responsive<SpaceValue>",
              description: "Padding right.",
            },
            {
              name: "pb",
              type: "Responsive<SpaceValue>",
              description: "Padding bottom.",
            },
            {
              name: "pl",
              type: "Responsive<SpaceValue>",
              description: "Padding left.",
            },
            {
              name: "m",
              type: "Responsive<SpaceValue>",
              description: "Margin on all sides. Numbers map to spacing scale tokens.",
            },
            {
              name: "mx",
              type: "Responsive<SpaceValue>",
              description: "Horizontal margin (left and right).",
            },
            {
              name: "my",
              type: "Responsive<SpaceValue>",
              description: "Vertical margin (top and bottom).",
            },
            {
              name: "mt",
              type: "Responsive<SpaceValue>",
              description: "Margin top.",
            },
            {
              name: "mr",
              type: "Responsive<SpaceValue>",
              description: "Margin right.",
            },
            {
              name: "mb",
              type: "Responsive<SpaceValue>",
              description: "Margin bottom.",
            },
            {
              name: "ml",
              type: "Responsive<SpaceValue>",
              description: "Margin left.",
            },
            {
              name: "width, minWidth, maxWidth, height, minHeight, maxHeight",
              type: "Responsive<number | string>",
              description:
                "Sizing shorthands. Numbers are pixels (`320` → `320px`, as in React `style`); strings are any CSS length (`'50%'`, `'20rem'`). Only applied when passed.",
            },
            {
              name: "container",
              type: "boolean",
              default: "false",
              description:
                "Makes this element a query container (`container-type: inline-size`), so `@` breakpoints on descendants respond to its width. See Responsive props.",
            },
            {
              name: "children",
              type: "React.ReactNode",
              description: "Content rendered inside the Flex.",
            },
          ]}
        />
      </DocsSection>
    </>
  );
}
