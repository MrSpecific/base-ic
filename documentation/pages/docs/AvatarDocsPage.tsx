import { Avatar, Flex, Heading, Link, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import {
  DocsDemoGrid,
  DocsDemoRow,
  DocsList,
} from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
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
        <Heading>Built On Base UI</Heading>
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
        <Heading>Demo</Heading>
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
            code={'<Avatar\n  src="https://i.pravatar.cc/80?u=1"\n  alt="Alex"\n  fallback="AX"\n  color="blue"\n/>'}
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
        <Heading>Usage</Heading>
        <CodeBlock title="Avatar Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Notes</Heading>
        <DocsList>
          <li>
            Always provide `fallback` — it shows when the image is missing or
            fails to load.
          </li>
          <li>
            For initials, limit to 1–2 characters for best fit across all sizes.
          </li>
          <li>
            `color` tints the fallback background using the accent color scale.
            Without it, the fallback uses a neutral background.
          </li>
          <li>Default `radius` is `full` (circle). Use `radius="large"` for rounded squares.</li>
        </DocsList>
      </DocsSection>
    </>
  );
}
