import { describe, expect, it } from 'vitest';

// Every stylesheet in the library, as raw text.
const stylesheets = import.meta.glob<string>('../../**/*.css', {
  query: '?raw',
  import: 'default',
  eager: true,
});

describe('color-mix interpolation space', () => {
  it('finds the stylesheets', () => {
    expect(Object.keys(stylesheets).length).toBeGreaterThan(10);
  });

  // oklch interpolates hue, so mixing an accent into a neutral (which still
  // carries a hue at zero chroma) shifts the result, e.g. a blue card tint
  // turning pink. See the note at the top of tokens/semantic.css.
  it('never mixes in oklch', () => {
    const offenders = Object.entries(stylesheets).flatMap(([file, css]) =>
      css
        .split('\n')
        .map((line, i) => ({ file, line: i + 1, text: line.trim() }))
        .filter(({ text }) => /\bin\s+oklch\s*,/.test(text)),
    );
    expect(offenders).toEqual([]);
  });
});
