import { Flex, Heading, Link, Separator, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import { DocsDemoGrid, DocsList } from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { DemoCard } from "./DemoCard";

export function SeparatorDocsPage() {
  const usageSnippet = [
    "import { Separator } from '@wlcr/base-ic';",
    "",
    "<Separator />",
  ].join("\n");

  const horizontalSnippet = [
    "<div>",
    "  <div>Profile</div>",
    '  <Separator size="2" />',
    "  <div>Team</div>",
    "</div>",
  ].join("\n");

  const verticalSnippet = [
    '<Flex align="center" gap={2} style={{ height: 28 }}>',
    "  <span>General</span>",
    '  <Separator orientation="vertical" size="2" />',
    "  <span>Advanced</span>",
    "</Flex>",
  ].join("\n");

  const thicknessSnippet = [
    '<div className="docs-layout-sample-box">',
    "  <div>Size 1</div>",
    '  <Separator size="1" />',
    "  <div>Size 2</div>",
    '  <Separator size="2" />',
    "  <div>Size 3</div>",
    '  <Separator size="3" />',
    "</div>",
  ].join("\n");

  const colorSnippet = [
    '<div className="docs-layout-sample-box">',
    "  <div>Brand grouping</div>",
    '  <Separator size="2" color="blue" />',
    "  <div>Success section</div>",
    '  <Separator size="2" color="green" />',
    "  <div>Warning section</div>",
    '  <Separator size="2" color="orange" />',
    "</div>",
  ].join("\n");

  return (
    <>
      <DocsSection>
        <h1>Separator</h1>
        <p>
          `Separator` provides subtle visual boundaries between content groups
          with horizontal or vertical orientation.
        </p>
      </DocsSection>
      <DocsSection>
        <Heading as="h3">Built On Base-UI</Heading>
        <Text as="p">
          This component wraps the Base UI Separator primitive. Base primitive
          docs:{" "}
          <Link
            href="https://base-ui.com/react/components/separator"
            target="_blank"
            rel="noreferrer"
          >
            base-ui.com/react/components/separator
          </Link>
          .
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h3">Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Horizontal"
            description="Divide stacked content sections."
            code={horizontalSnippet}
          >
            <div className="docs-layout-sample-box">
              <div>Profile</div>
              <Separator size="2" />
              <div>Team</div>
            </div>
          </DemoCard>
          <DemoCard
            title="Thickness Scale"
            description="Use stronger thickness only where hierarchy needs extra separation."
            code={thicknessSnippet}
          >
            <div className="docs-layout-sample-box">
              <div>Size 1</div>
              <Separator size="1" />
              <div>Size 2</div>
              <Separator size="2" />
              <div>Size 3</div>
              <Separator size="3" />
            </div>
          </DemoCard>
          <DemoCard
            title="Vertical"
            description="Split inline controls or labels."
            code={verticalSnippet}
          >
            <Flex align="center" gap={2} style={{ height: 28 }}>
              <span>General</span>
              <Separator orientation="vertical" size="2" />
              <span>Advanced</span>
            </Flex>
          </DemoCard>
          <DemoCard
            title="Color Overrides"
            description="Accent the separator line for semantic groupings."
            code={colorSnippet}
          >
            <div className="docs-layout-sample-box">
              <div>Brand grouping</div>
              <Separator size="2" color="blue" />
              <div>Success section</div>
              <Separator size="2" color="green" />
              <div>Warning section</div>
              <Separator size="2" color="orange" />
            </div>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Usage</Heading>
        <CodeBlock title="Separator Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Notes</Heading>
        <DocsList>
          <li>
            For decorative separators, pass `aria-hidden=&quot;true&quot;` so screen
            readers skip them.
          </li>
          <li>
            Use `orientation=&quot;vertical&quot;` only when the container sets a
            meaningful height.
          </li>
          <li>
            Keep color overrides subtle; they should support hierarchy, not
            compete with content.
          </li>
        </DocsList>
      </DocsSection>
    </>
  );
}
