import type * as React from 'react';
import shared from './responsive.module.css';
import { breakpointSuffix, type Responsive } from './breakpoints';

export type { Breakpoint, Responsive } from './breakpoints';

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
  // There is no `--space-0` token; zero is just zero.
  // '0px' rather than '0' so the value stays valid inside calc()
  if (/^-?0$/.test(String(value))) return '0px';
  // A bare step (`3`, `"3"`, `-1`, `"-1"`) maps to the space scale; negatives flip it.
  const step = /^(-?)(\d+)$/.exec(String(value));
  if (step) return step[1] ? `calc(var(--space-${step[2]}) * -1)` : `var(--space-${step[2]})`;
  return String(value);
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

export function isResponsiveObject<T>(value: Responsive<T> | undefined): value is Exclude<Responsive<T>, T> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

type Vars = Record<string, string | undefined>;
type Styles = Record<string, string>;

/**
 * Collects inline vars and gate classes for responsive props.
 *
 * `add('columns', { initial: 1, md: 3 }, toVars)` writes `toVars(1)` as-is,
 * writes `toVars(3)` with each var suffixed `-md`, and adds the `columns-md`
 * class from `styles`. The class comes from an `@responsive` line in the CSS
 * module (see build/responsive-css.ts). A base class named `columns` is added
 * too whenever the module defines one, for props that only apply when passed.
 */
export function createResponsive(styles: Styles = {}) {
  const vars: Record<string, string> = {};
  const classes: string[] = [];

  function add<T>(name: string, value: Responsive<T> | undefined, toVars: (v: T) => Vars, from: Styles = styles) {
    if (value == null) return;
    const entries = isResponsiveObject(value) ? Object.entries(value) : [['initial', value]];
    for (const [bp, v] of entries as Array<[string, T | undefined]>) {
      if (v == null) continue;
      const suffix = bp === 'initial' ? '' : `-${breakpointSuffix(bp)}`;
      for (const [key, css] of Object.entries(toVars(v))) {
        if (css != null) vars[key + suffix] = css;
      }
      for (const gate of [from[name], suffix && from[name + suffix]]) {
        if (gate && !classes.includes(gate)) classes.push(gate);
      }
    }
  }

  /** Space props, shared by every component (read as `--bic-p` etc. in CSS). */
  function space(props: SpaceProps) {
    for (const key of SPACE_KEYS) {
      add(key, props[key], (v) => ({ [`--bic-${key}`]: toSpaceVar(v) }), shared);
    }
  }

  /** Width/height props (Box, Flex, Grid). Numbers are pixels, as in React's `style`. */
  function size(props: SizeProps) {
    for (const [key, cssName] of SIZE_KEYS) {
      add(key, props[key], (v) => ({ [`--bic-${cssName}`]: typeof v === 'number' ? `${v}px` : v }), shared);
    }
  }

  return { add, space, size, vars, classes };
}

/** Space props alone: inline vars plus the gate classes for any breakpoint values. */
export function spaceProps(space: SpaceProps): { vars: Record<string, string>; className: string | undefined } {
  const r = createResponsive();
  r.space(space);
  return { vars: r.vars, className: r.classes.join(' ') || undefined };
}

/** Class for the `container` prop: makes the element a query container for `@`-breakpoints. */
export const queryContainerClass = shared.queryContainer;

export type SpaceValue = number | string;

const SPACE_KEYS = ['p', 'px', 'py', 'pt', 'pr', 'pb', 'pl', 'm', 'mx', 'my', 'mt', 'mr', 'mb', 'ml'] as const;

export type SpaceProps = { [K in (typeof SPACE_KEYS)[number]]?: Responsive<SpaceValue> };

const SIZE_KEYS = [
  ['width', 'width'],
  ['minWidth', 'min-width'],
  ['maxWidth', 'max-width'],
  ['height', 'height'],
  ['minHeight', 'min-height'],
  ['maxHeight', 'max-height'],
] as const;

export type SizeValue = number | string;

export type SizeProps = { [K in (typeof SIZE_KEYS)[number][0]]?: Responsive<SizeValue> };
