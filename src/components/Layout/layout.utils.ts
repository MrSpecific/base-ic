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
