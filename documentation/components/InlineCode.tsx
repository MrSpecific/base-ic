import React from 'react';
import { Code } from '../../src';

/**
 * Renders markdown-style `inline code` spans in plain docs copy as <Code>.
 * Text without backtick pairs is returned unchanged.
 */
export function renderInlineCode(text: string): React.ReactNode {
  if (!text.includes('`')) return text;
  const parts = text.split(/`([^`]+)`/);
  if (parts.length === 1) return text;
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <Code key={index} size="2">
        {part}
      </Code>
    ) : (
      part
    ),
  );
}
