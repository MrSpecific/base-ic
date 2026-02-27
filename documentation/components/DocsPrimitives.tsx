import type { CSSProperties, PropsWithChildren } from 'react';
import { Box, Card, Flex, Text } from '../../src';

const surfaceBoxStyle: CSSProperties = {
  borderColor: 'var(--color-border)',
  background: 'var(--color-surface-subtle)',
};

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
      style={{ listStyle: 'none', color: 'var(--color-text-secondary)' }}
    >
      {children}
    </Flex>
  );
}

export function DocsEyebrow({ children }: PropsWithChildren) {
  return (
    <Text
      as="p"
      size="1"
      style={{
        margin: 0,
        letterSpacing: 'var(--letter-spacing-5)',
        textTransform: 'uppercase',
        color: 'var(--color-text-tertiary)',
        fontFamily: 'var(--font-family-mono)',
      }}
    >
      {children}
    </Text>
  );
}

export function DocsLayoutSampleBox({ children, style }: PropsWithChildren<{ style?: CSSProperties }>) {
  return (
    <Card variant="classic" size="4" style={{ ...surfaceBoxStyle, ...style }}>
      {children}
    </Card>
  );
}

export function DocsLayoutStack({ children }: PropsWithChildren) {
  return (
    <Card variant="ghost" p={0} style={{ borderColor: 'var(--color-border-subtle)', background: 'var(--color-surface-subtle)' }}>
      {children}
    </Card>
  );
}

export function DocsLayoutChip({ children }: PropsWithChildren) {
  return (
    <Box
      px={3}
      py={2}
      style={{
        borderRadius: 'var(--radius-3)',
        border: '1px solid var(--color-border-subtle)',
        background: 'var(--color-surface-overlay)',
        color: 'var(--color-text-primary)',
        fontSize: 'var(--font-size-2)',
      }}
    >
      {children}
    </Box>
  );
}
