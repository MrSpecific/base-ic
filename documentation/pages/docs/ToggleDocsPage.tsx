import { Heading, Link, Text, Toggle, ToggleGroup } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import {
  DocsDemoGrid,
  DocsDemoRow,
  DocsList,
} from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { DemoCard } from "./DemoCard";

function BoldIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 2h3.5a2 2 0 0 1 0 4H3V2zm0 4h4a2.5 2.5 0 0 1 0 5H3V6z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
    </svg>
  );
}

function ItalicIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="7" y1="2" x2="5" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4" y1="2" x2="8" y2="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4" y1="10" x2="8" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function UnderlineIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 2v4a3 3 0 0 0 6 0V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="2" y1="11" x2="10" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ToggleDocsPage() {
  const usageSnippet = [
    "import { Toggle } from '@wlcr/base-ic';",
    "",
    "<Toggle>Bold</Toggle>",
  ].join("\n");

  const variantsSnippet = [
    '<Toggle variant="solid">Solid</Toggle>',
    '<Toggle variant="soft">Soft</Toggle>',
    '<Toggle variant="surface">Surface</Toggle>',
    '<Toggle variant="outline">Outline</Toggle>',
    '<Toggle variant="ghost">Ghost</Toggle>',
  ].join("\n");

  const sizesSnippet = [
    '<Toggle size="1">Sm</Toggle>',
    '<Toggle size="2">Md</Toggle>',
    '<Toggle size="3">Lg</Toggle>',
    '<Toggle size="4">Xl</Toggle>',
  ].join("\n");

  const groupSnippet = [
    "import { Toggle, ToggleGroup } from '@wlcr/base-ic';",
    "",
    "<ToggleGroup>",
    "  <Toggle>Bold</Toggle>",
    "  <Toggle>Italic</Toggle>",
    "  <Toggle>Underline</Toggle>",
    "</ToggleGroup>",
  ].join("\n");

  const connectedSnippet = [
    "<ToggleGroup connected>",
    "  <Toggle>Day</Toggle>",
    "  <Toggle>Week</Toggle>",
    "  <Toggle>Month</Toggle>",
    "</ToggleGroup>",
  ].join("\n");

  return (
    <>
      <DocsSection>
        <Heading as="h1">Toggle</Heading>
        <Text as="p">
          A two-state pressable button. Base UI sets <code>data-pressed</code>{" "}
          when active, which drives the visual state. ToggleGroup manages
          selection state across multiple toggles.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading>Built On Base UI</Heading>
        <Text as="p">
          This component wraps the Base UI Toggle and ToggleGroup primitives.
          Base primitive docs:{" "}
          <Link
            href="https://base-ui.com/react/components/toggle"
            target="_blank"
            rel="noreferrer"
          >
            base-ui.com/react/components/toggle
          </Link>
          .
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading>Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Variants"
            description="Five visual variants matching the Button palette."
            code={variantsSnippet}
          >
            <DocsDemoRow>
              {(["solid", "soft", "surface", "outline", "ghost"] as const).map(
                (variant) => (
                  <Toggle key={variant} variant={variant}>
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Toggle>
                )
              )}
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Sizes"
            description="Four sizes matching button/input size tokens."
            code={sizesSnippet}
          >
            <DocsDemoRow>
              {(["1", "2", "3", "4"] as const).map((size) => (
                <Toggle key={size} size={size}>
                  Size {size}
                </Toggle>
              ))}
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Icon toggles"
            description="Compact icon-only toggles for toolbars."
            code={'<Toggle><BoldIcon /></Toggle>'}
          >
            <DocsDemoRow>
              <Toggle><BoldIcon /></Toggle>
              <Toggle><ItalicIcon /></Toggle>
              <Toggle><UnderlineIcon /></Toggle>
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Toggle Group"
            description="ToggleGroup manages multi-select state across toggles."
            code={groupSnippet}
          >
            <DocsDemoRow>
              <ToggleGroup>
                <Toggle><BoldIcon /></Toggle>
                <Toggle><ItalicIcon /></Toggle>
                <Toggle><UnderlineIcon /></Toggle>
              </ToggleGroup>
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Connected (segmented control)"
            description="Use connected on ToggleGroup for a pill-bar layout."
            code={connectedSnippet}
          >
            <DocsDemoRow>
              <ToggleGroup connected>
                <Toggle>Day</Toggle>
                <Toggle>Week</Toggle>
                <Toggle>Month</Toggle>
              </ToggleGroup>
            </DocsDemoRow>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading>Usage</Heading>
        <CodeBlock title="Toggle Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading>Notes</Heading>
        <DocsList>
          <li>
            Use <code>pressed</code> / <code>defaultPressed</code> for
            controlled / uncontrolled state.
          </li>
          <li>
            <code>ToggleGroup</code> accepts a <code>value</code> array for
            controlled multi-selection.
          </li>
          <li>
            The <code>connected</code> prop on ToggleGroup renders a segmented
            control with shared border and no gap.
          </li>
        </DocsList>
      </DocsSection>
    </>
  );
}
