import { Avatar, Flex, Heading, Link, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import {
  DocsDemoGrid,
  DocsDemoRow,
  DocsList,
} from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { PropsTable } from "../../components/PropsTable";
import { DemoCard } from "./DemoCard";

export function AvatarDocsPage() {
  const usageSnippet = [
    "import { Avatar } from '@wlcr/base-ic';",
    "",
    "// With image",
    '<Avatar src="https://i.pravatar.cc/80" alt="Jane Doe" fallback="JD" />',
    "",
    "// Initials fallback",
    '<Avatar fallback="AB" color="violet" />',
  ].join("\n");

  const sizesSnippet = [
    '<Avatar size="1" fallback="S" />',
    '<Avatar size="2" fallback="M" />',
    '<Avatar size="3" fallback="L" />',
    '<Avatar size="4" fallback="XL" />',
    '<Avatar size="5" fallback="2X" />',
  ].join("\n");

  const colorsSnippet = [
    '<Avatar fallback="AB" color="violet" />',
    '<Avatar fallback="CD" color="green" />',
    '<Avatar fallback="EF" color="orange" />',
    '<Avatar fallback="GH" color="red" />',
    '<Avatar fallback="IJ" color="blue" />',
  ].join("\n");

  const radiusSnippet = [
    '<Avatar fallback="RD" radius="none" />',
    '<Avatar fallback="SM" radius="small" />',
    '<Avatar fallback="MD" radius="medium" />',
    '<Avatar fallback="LG" radius="large" />',
    '<Avatar fallback="CL" radius="full" />',
  ].join("\n");

  return (
    <>
      <DocsSection>
        <Heading as="h1">Avatar</Heading>
        <Text as="p">
          A compact visual identity for a user or entity. Displays a profile
          image with a graceful fallback to initials or an icon.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Built On Base UI</Heading>
        <Text as="p">
          This component wraps the Base UI Avatar primitive. Base primitive
          docs:{" "}
          <Link
            href="https://base-ui.com/react/components/avatar"
            target="_blank"
            rel="noreferrer"
          >
            base-ui.com/react/components/avatar
          </Link>
          .
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Sizes"
            description="Five sizes from 24 to 64px."
            code={sizesSnippet}
          >
            <DocsDemoRow>
              <Avatar size="1" fallback="S" />
              <Avatar size="2" fallback="M" />
              <Avatar size="3" fallback="L" />
              <Avatar size="4" fallback="XL" />
              <Avatar size="5" fallback="2X" />
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Colors"
            description="Tinted fallback backgrounds to distinguish users."
            code={colorsSnippet}
          >
            <DocsDemoRow>
              <Avatar fallback="AB" color="violet" />
              <Avatar fallback="CD" color="green" />
              <Avatar fallback="EF" color="orange" />
              <Avatar fallback="GH" color="red" />
              <Avatar fallback="IJ" color="blue" />
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Radius"
            description="Override corner rounding — default is circle."
            code={radiusSnippet}
          >
            <DocsDemoRow>
              <Avatar fallback="RD" radius="none" />
              <Avatar fallback="SM" radius="small" />
              <Avatar fallback="MD" radius="medium" />
              <Avatar fallback="LG" radius="large" />
              <Avatar fallback="CL" radius="full" />
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Image with fallback"
            description="Gracefully falls back to initials when the image fails."
            code={'<Avatar\n  src="https://i.pravatar.cc/80?u=1"\n  alt="Alex"\n  fallback="AX"\n  size="4"\n/>\n<Avatar\n  src="https://broken-url.invalid/image.jpg"\n  alt="Broken"\n  fallback="BR"\n  color="orange"\n  size="4"\n/>'}
          >
            <DocsDemoRow>
              <Avatar
                src="https://i.pravatar.cc/80?u=1"
                alt="Alex"
                fallback="AX"
                size="4"
              />
              <Avatar
                src="https://broken-url.invalid/image.jpg"
                alt="Broken"
                fallback="BR"
                color="orange"
                size="4"
              />
            </DocsDemoRow>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Usage</Heading>
        <CodeBlock title="Avatar Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Props</Heading>
        <PropsTable
          rows={[
            {
              name: "size",
              type: "'1' | '2' | '3' | '4' | '5'",
              default: "'3'",
              description: "Visual size preset.",
            },
            {
              name: "src",
              type: "string",
              description: "Image source URL.",
            },
            {
              name: "alt",
              type: "string",
              description: "Alt text for the image.",
            },
            {
              name: "fallback",
              type: "React.ReactNode",
              description:
                "Content shown when the image is missing or fails to load — typically initials.",
            },
            {
              name: "color",
              type: "AccentColor",
              description: "Override the fallback background color using the accent color scale.",
            },
            {
              name: "radius",
              type: "'none' | 'small' | 'medium' | 'large' | 'full'",
              default: "'full'",
              description: "Shape override — 'full' renders a circle.",
            },
            {
              name: "fallbackDelay",
              type: "number",
              default: "600",
              description:
                "Milliseconds to wait before showing the fallback while `src` loads, so a fast image doesn't flash initials first. Always `0` when there is no `src`.",
            },
            {
              name: "keepMounted",
              type: "boolean",
              description:
                "Keep the `<img>` mounted and let it load in place instead of preloading (Base UI `Avatar.Image`). Needed for `loading=\"lazy\"` and optimized image components.",
            },
            {
              name: "onLoadingStatusChange",
              type: "(status: 'idle' | 'loading' | 'loaded' | 'error') => void",
              description: "Called when the image loading status changes. Only fires when `src` is set.",
            },
            {
              name: "render",
              type: "React.ReactElement | ((props, state) => React.ReactElement)",
              description: "Replace the root `<span>` with a different element (Base UI render prop).",
            },
            {
              name: "className",
              type: "string",
              description: "Additional class name applied to the root element.",
            },
            {
              name: "style",
              type: "React.CSSProperties",
              description: "Inline styles applied to the root element.",
            },
            {
              name: "...rest",
              type: "Avatar.Root props / HTML span attributes",
              description:
                "Everything else (`id`, `title`, `aria-*`, `data-*`, `onClick`, …) is forwarded to the root `<span>`. `ref` points at the root as well.",
            },
          ]}
        />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Notes</Heading>
        <DocsList>
          <li>
            Provide `fallback` (usually initials) — it shows while the image
            loads, when it fails, or when there is no `src`. Without it, a
            generic user icon is shown instead.
          </li>
          <li>
            For initials, limit to 1–2 characters for best fit across all sizes.
          </li>
          <li>
            `color` tints the fallback background using the accent color scale.
            Without it, the fallback uses a neutral background.
          </li>
          <li>Default `radius` is `full` (circle). Use `radius="large"` for rounded squares.</li>
          <li>
            The fallback waits `fallbackDelay` (600ms) while an image loads so
            fast images don't flash initials; set{" "}
            {"`fallbackDelay={0}`"} to show it immediately.
          </li>
          <li>
            Root HTML and ARIA props are forwarded, so you can add e.g.
            `aria-label`, `title`, or `onClick` directly on `Avatar`.
          </li>
        </DocsList>
      </DocsSection>
    </>
  );
}
