import React, { type PropsWithChildren } from 'react';
import { Card, Code, Heading, Text } from '../../src';

const headingSizeByElement: Record<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'> = {
  h1: '8',
  h2: '5',
  h3: '3',
  h4: '2',
  h5: '2',
  h6: '1',
};

function mapDocsTypography(node: React.ReactNode, inPre = false): React.ReactNode {
  if (node == null || typeof node === 'boolean') return node;
  if (typeof node === 'string' || typeof node === 'number') return node;
  if (Array.isArray(node)) return node.map((child, index) => <React.Fragment key={index}>{mapDocsTypography(child, inPre)}</React.Fragment>);
  if (!React.isValidElement(node)) return node;

  const { children, className, style, ...rest } = (node.props ?? {}) as {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
  };

  if (typeof node.type === 'string') {
    const tag = node.type;
    if (tag === 'pre') {
      return React.cloneElement(node, undefined, mapDocsTypography(children, true));
    }
    if (!inPre && (tag === 'h1' || tag === 'h2' || tag === 'h3' || tag === 'h4' || tag === 'h5' || tag === 'h6')) {
      return (
        <Heading
          as={tag}
          size={headingSizeByElement[tag]}
          m="0"
          className={className}
          style={style}
          {...rest}
        >
          {mapDocsTypography(children, false)}
        </Heading>
      );
    }
    if (!inPre && tag === 'p') {
      return (
        <Text
          as="p"
          size="3"
          m="0"
          className={className}
          style={{
            color: 'var(--color-text-secondary)',
            lineHeight: 'var(--line-height-5)',
            ...style,
          }}
          {...rest}
        >
          {mapDocsTypography(children, false)}
        </Text>
      );
    }
    if (!inPre && tag === 'code') {
      return (
        <Code
          size="2"
          className={className}
          style={style}
          {...rest}
        >
          {mapDocsTypography(children, false)}
        </Code>
      );
    }
  }

  if (children === undefined) return node;
  return React.cloneElement(node, undefined, mapDocsTypography(children, inPre));
}

export function DocsSection({ children }: PropsWithChildren) {
  return <Card className="docs-section">{mapDocsTypography(children)}</Card>;
}
