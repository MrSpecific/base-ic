// Tailwind CSS v4 defaults. Plain keys are viewport (@media) breakpoints;
// `@`-prefixed keys are container-query breakpoints against the nearest
// ancestor with `container` set. Also read at build time by build/responsive-css.ts.
export const breakpoints = {
  sm: '40rem',
  md: '48rem',
  lg: '64rem',
  xl: '80rem',
  '2xl': '96rem',
} as const;

export const containerBreakpoints = {
  '@3xs': '16rem',
  '@2xs': '18rem',
  '@xs': '20rem',
  '@sm': '24rem',
  '@md': '28rem',
  '@lg': '32rem',
  '@xl': '36rem',
  '@2xl': '42rem',
  '@3xl': '48rem',
  '@4xl': '56rem',
  '@5xl': '64rem',
  '@6xl': '72rem',
  '@7xl': '80rem',
} as const;

export type Breakpoint = keyof typeof breakpoints | keyof typeof containerBreakpoints;

/** A single value, or an object of values per breakpoint (mobile-first). */
export type Responsive<T> = T | ({ initial?: T } & { [K in Breakpoint]?: T });

/** CSS-safe suffix used in class and custom-property names: `md` → `md`, `@md` → `cq-md`. */
export function breakpointSuffix(bp: string): string {
  return bp.startsWith('@') ? `cq-${bp.slice(1)}` : bp;
}
