import type * as React from 'react';

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

export function withVar<T extends React.CSSProperties>(
  style: T | undefined,
  vars: Record<string, string | undefined>
): T {
  const next: Record<string, string> = {};
  for (const [key, value] of Object.entries(vars)) {
    if (value != null) next[key] = value;
  }
  return { ...(style ?? {}), ...next } as T;
}

export function toSpaceVar(value?: string | number): string | undefined {
  if (value == null) return undefined;
  if (typeof value === 'number') return `var(--space-${value})`;
  if (/^\d+$/.test(value)) return `var(--space-${value})`;
  return value;
}

export function toSizeVar(value?: string | number): string | undefined {
  if (value == null) return undefined;
  if (typeof value === 'number') return `var(--size-${value})`;
  if (/^\d+$/.test(value)) return `var(--size-${value})`;
  return value;
}

export function toCssVarValue(value?: string | number): string | undefined {
  if (value == null) return undefined;
  return typeof value === 'number' ? String(value) : value;
}

export type SpaceValue = number | string;

export interface SpaceProps {
  p?: SpaceValue;
  px?: SpaceValue;
  py?: SpaceValue;
  pt?: SpaceValue;
  pr?: SpaceValue;
  pb?: SpaceValue;
  pl?: SpaceValue;
  m?: SpaceValue;
  mx?: SpaceValue;
  my?: SpaceValue;
  mt?: SpaceValue;
  mr?: SpaceValue;
  mb?: SpaceValue;
  ml?: SpaceValue;
}

export function buildSpaceVars(prefix: string, space: SpaceProps): Record<string, string | undefined> {
  return {
    [`--${prefix}-padding`]: toSpaceVar(space.p),
    [`--${prefix}-padding-x`]: toSpaceVar(space.px),
    [`--${prefix}-padding-y`]: toSpaceVar(space.py),
    [`--${prefix}-padding-top`]: toSpaceVar(space.pt),
    [`--${prefix}-padding-right`]: toSpaceVar(space.pr),
    [`--${prefix}-padding-bottom`]: toSpaceVar(space.pb),
    [`--${prefix}-padding-left`]: toSpaceVar(space.pl),
    [`--${prefix}-margin`]: toSpaceVar(space.m),
    [`--${prefix}-margin-x`]: toSpaceVar(space.mx),
    [`--${prefix}-margin-y`]: toSpaceVar(space.my),
    [`--${prefix}-margin-top`]: toSpaceVar(space.mt),
    [`--${prefix}-margin-right`]: toSpaceVar(space.mr),
    [`--${prefix}-margin-bottom`]: toSpaceVar(space.mb),
    [`--${prefix}-margin-left`]: toSpaceVar(space.ml),
  };
}
