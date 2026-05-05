import { Heading, Skeleton, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import {
  DocsDemoGrid,
  DocsDemoRow,
  DocsList,
} from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { DemoCard } from "./DemoCard";

export function SkeletonDocsPage() {
  const usageSnippet = [
    "import { Skeleton } from '@wlcr/base-ic';",
    "",
    "<Skeleton width={200} height={20} />",
  ].join("\n");

  const shapesSnippet = [
    "// Line of text",
    "<Skeleton height={16} />",
    "",
    "// Heading",
    "<Skeleton width={160} height={28} />",
    "",
    "// Avatar circle",
    '<Skeleton width={40} height={40} radius="full" />',
  ].join("\n");

  const cardSnippet = [
    '<div style={{ display: "flex", gap: 12 }}>',
    '  <Skeleton width={48} height={48} radius="full" style={{ flexShrink: 0 }} />',
    '  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>',
    "    <Skeleton height={14} />",
    '    <Skeleton height={14} width="60%" />',
    "  </div>",
    "</div>",
  ].join("\n");

  const radiusSnippet = [
    '<Skeleton width={80} height={36} radius="none" />',
    '<Skeleton width={80} height={36} radius="small" />',
    '<Skeleton width={80} height={36} radius="medium" />',
    '<Skeleton width={80} height={36} radius="large" />',
    '<Skeleton width={80} height={36} radius="full" />',
  ].join("\n");

  return (
    <>
      <DocsSection>
        <Heading as="h1">Skeleton</Heading>
        <Text as="p">
          A loading placeholder that mimics content shape with a shimmer
          animation. Pure CSS — no Base UI primitive. Renders an{" "}
          <code>aria-hidden</code> span that screen readers skip.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading>Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Common shapes"
            description="Skeletons for text lines, headings, and avatars."
            code={shapesSnippet}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", width: "100%", maxWidth: 300 }}>
              <Skeleton height={16} />
              <Skeleton width={160} height={28} />
              <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center" }}>
                <Skeleton width={40} height={40} radius="full" style={{ flexShrink: 0 }} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                  <Skeleton height={14} />
                  <Skeleton height={14} width="70%" />
                </div>
              </div>
              <Skeleton height={120} />
            </div>
          </DemoCard>
          <DemoCard
            title="Card skeleton"
            description="Compose skeletons to represent loading card layouts."
            code={cardSnippet}
          >
            <div
              style={{
                display: "flex",
                gap: "var(--space-3)",
                alignItems: "center",
                padding: "var(--space-4)",
                border: "1px solid var(--color-border-subtle)",
                borderRadius: "var(--component-radius)",
                width: "100%",
                maxWidth: 360,
              }}
            >
              <Skeleton width={48} height={48} radius="full" style={{ flexShrink: 0 }} />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                <Skeleton height={14} />
                <Skeleton height={14} width="60%" />
                <Skeleton height={14} width="80%" />
              </div>
            </div>
          </DemoCard>
          <DemoCard
            title="Radius variants"
            description="Five border-radius presets from none to full."
            code={radiusSnippet}
          >
            <DocsDemoRow>
              {(["none", "small", "medium", "large", "full"] as const).map((r) => (
                <Skeleton key={r} width={80} height={36} radius={r} />
              ))}
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="No animation"
            description="Disable shimmer with animated={false}."
            code={'<Skeleton width={200} height={20} animated={false} />'}
          >
            <Skeleton width={200} height={20} animated={false} />
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading>Usage</Heading>
        <CodeBlock title="Skeleton Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading>Notes</Heading>
        <DocsList>
          <li>
            Renders <code>aria-hidden="true"</code> — screen readers skip it.
          </li>
          <li>
            Shimmer animation respects{" "}
            <code>prefers-reduced-motion: reduce</code>.
          </li>
          <li>
            Width and height accept numbers (px) or any CSS string value.
          </li>
        </DocsList>
      </DocsSection>
    </>
  );
}
