import type { CSSProperties, PropsWithChildren } from 'react';
import { Badge, Card, Flex, Text } from '../../src';

export function DocsDemoGrid({ children }: PropsWithChildren) {
  return <Flex direction="column" gap={4}>{children}</Flex>;
}

export function DocsDemoRow({ children }: PropsWithChildren) {
  return <Flex wrap="wrap" gap={2}>{children}</Flex>;
}

export function DocsList({ children }: PropsWithChildren) {
  return (
    <Flex
      as="ul"
      direction="column"
      gap={1}
      mt={2}
      mb={2}
      p={0}
      className="docs-list"
    >
      {children}
    </Flex>
  );
}

export function DocsEyebrow({ children }: PropsWithChildren) {
  return (
    <Text as="p" size="1" className="docs-eyebrow">{children}</Text>
  );
}

export function DocsLayoutSampleBox({ children, style }: PropsWithChildren<{ style?: CSSProperties }>) {
  return (
    <Card variant="surface" size="4" className="docs-layout-sample-box" style={style}>
      {children}
    </Card>
  );
}

export function DocsLayoutStack({ children }: PropsWithChildren) {
  return (
    <Card variant="surface" p={0} className="docs-layout-sample-stack">
      {children}
    </Card>
  );
}

export function DocsLayoutChip({ children }: PropsWithChildren) {
  return <Badge variant="surface" color="gray">{children}</Badge>;
}
