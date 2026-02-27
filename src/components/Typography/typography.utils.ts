import type * as React from 'react';

/**
 * Build inline style for the `color` prop override.
 * Sets --typo-color to the chosen hue's step 11 (or 12 for highContrast).
 */
export function buildTypoColorVar(
  color?: string,
  highContrast?: boolean,
): React.CSSProperties | undefined {
  if (!color) return undefined;
  const step = highContrast ? 12 : 11;
  return { '--typo-color': `var(--color-${color}-${step})` } as React.CSSProperties;
}

/**
 * Build inline style for size-based typography presets.
 */
export function buildTypoSizeVars(
  prefix: 'text' | 'heading',
  size: string,
): React.CSSProperties {
  return {
    '--typo-font-size': `var(--${prefix}-${size}-size)`,
    '--typo-line-height': `var(--${prefix}-${size}-lh)`,
    '--typo-letter-spacing': `var(--${prefix}-${size}-ls)`,
  } as React.CSSProperties;
}
