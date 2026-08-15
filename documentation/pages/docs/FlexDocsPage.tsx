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
        <Heading>Demo</Heading>
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
              type: "React.CSSProperties['flexDirection']",
              description: "Sets `flex-direction` (e.g. `'row'`, `'column'`).",
            },
            {
              name: "align",
              type: "React.CSSProperties['alignItems']",
              description: "Sets `align-items`.",
            },
            {
              name: "justify",
              type: "React.CSSProperties['justifyContent']",
              description: "Sets `justify-content`.",
            },
            {
              name: "wrap",
              type: "React.CSSProperties['flexWrap']",
              description: "Sets `flex-wrap`.",
            },
            {
              name: "gap",
              type: "number | string",
              description: "Gap between children. Numbers map to spacing scale tokens.",
            },
            {
              name: "p",
              type: "SpaceValue",
              description: "Padding on all sides. Numbers map to spacing scale tokens.",
            },
            {
              name: "px",
              type: "SpaceValue",
              description: "Horizontal padding (left and right).",
            },
            {
              name: "py",
              type: "SpaceValue",
              description: "Vertical padding (top and bottom).",
            },
            {
              name: "pt",
              type: "SpaceValue",
              description: "Padding top.",
            },
            {
              name: "pr",
              type: "SpaceValue",
              description: "Padding right.",
            },
            {
              name: "pb",
              type: "SpaceValue",
              description: "Padding bottom.",
            },
            {
              name: "pl",
              type: "SpaceValue",
              description: "Padding left.",
            },
            {
              name: "m",
              type: "SpaceValue",
              description: "Margin on all sides. Numbers map to spacing scale tokens.",
            },
            {
              name: "mx",
              type: "SpaceValue",
              description: "Horizontal margin (left and right).",
            },
            {
              name: "my",
              type: "SpaceValue",
              description: "Vertical margin (top and bottom).",
            },
            {
              name: "mt",
              type: "SpaceValue",
              description: "Margin top.",
            },
            {
              name: "mr",
              type: "SpaceValue",
              description: "Margin right.",
            },
            {
              name: "mb",
              type: "SpaceValue",
              description: "Margin bottom.",
            },
            {
              name: "ml",
              type: "SpaceValue",
              description: "Margin left.",
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
