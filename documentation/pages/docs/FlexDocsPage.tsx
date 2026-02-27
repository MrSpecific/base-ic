import { Box, Button, Flex, Heading } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import { DocsDemoGrid } from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { DemoCard } from "./DemoCard";

export function FlexDocsPage() {
  const snippet = [
    "import { Flex } from 'base-ic';",
    "",
    '<Flex align="center" justify="space-between" gap={3}>',
    "  <span>Left</span>",
    "  <span>Right</span>",
    "</Flex>",
  ].join("\n");
  const toolbarDemoSnippet = [
    "import { Button, Flex } from 'base-ic';",
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
    </>
  );
}
