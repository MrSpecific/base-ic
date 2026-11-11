import type { Plugin } from 'vite';
import { breakpoints, breakpointSuffix, containerBreakpoints } from '../src/components/Layout/breakpoints.ts';

const DIRECTIVE = /@responsive\s+([\w-]+)\s*:\s*([^;]+);/g;

/**
 * Expands `@responsive <name>: --var-a, --var-b;` in CSS files into one gate
 * class per breakpoint, e.g. at `md`:
 *
 *   @media (min-width: 48rem) { .name-md { --var-a: var(--var-a-md) !important; … } }
 *
 * The runtime (`responsive()` in layout.utils) writes `--var-a-md` inline and
 * adds the `name-md` class. `!important` lets the breakpoint value beat the
 * inline base value, and everything that reads `--var-a` picks it up.
 * Runs before Vite's CSS pipeline so CSS modules hash the generated classes.
 */
export function responsiveCss(): Plugin {
  const queries = [
    ...Object.entries(breakpoints).map(([bp, w]) => [bp, `@media (min-width: ${w})`]),
    ...Object.entries(containerBreakpoints).map(([bp, w]) => [bp, `@container (min-width: ${w})`]),
  ];

  return {
    name: 'base-ic:responsive-css',
    enforce: 'pre',
    transform(code, id) {
      // `?raw` / `?url` imports are already JS by now; leave them alone.
      if (!/\.css($|\?)/.test(id) || /[?&](raw|url|inline)\b/.test(id) || !code.includes('@responsive')) return;
      const rules: Array<[string, string[]]> = [];
      const stripped = code.replace(DIRECTIVE, (_, name: string, vars: string) => {
        rules.push([name, vars.split(',').map((v) => v.trim())]);
        return '';
      });
      // Grouped per breakpoint, smallest first (container queries last), so a
      // larger breakpoint always wins when two gates set the same variable.
      const generated = queries.map(([bp, query]) => {
        const s = breakpointSuffix(bp);
        const body = rules
          .map(([name, vars]) => `  .${name}-${s} { ${vars.map((v) => `${v}: var(${v}-${s}) !important;`).join(' ')} }`)
          .join('\n');
        return `${query} {\n${body}\n}`;
      });
      return { code: `${stripped}\n${generated.join('\n')}\n`, map: null };
    },
  };
}
