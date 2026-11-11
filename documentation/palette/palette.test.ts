import { describe, expect, it } from 'vitest';
import { adjust, EMPTY_SETTINGS, fromSearch, generateCss, toSearch, type PaletteSettings } from './palette';
import { DARK_SCALES, LIGHT_SCALES } from './sources';

describe('palette sources', () => {
  it('reads all 12 light steps for every scale and the dark anchors', () => {
    expect(Object.keys(LIGHT_SCALES).length).toBeGreaterThanOrEqual(32);
    for (const scale of Object.values(LIGHT_SCALES)) expect(Object.keys(scale)).toHaveLength(12);
    expect(Object.keys(DARK_SCALES.blue)).toEqual(['9']);
    expect(Object.keys(DARK_SCALES.gray)).toHaveLength(12);
  });
});

describe('adjust', () => {
  it('shifts hue with wraparound, scales chroma, and leaves 0%/100% lightness alone', () => {
    expect(adjust({ l: 50, c: 0.1, h: 350 }, { hue: 20, sat: 150, light: 10 })).toEqual({ l: 60, c: 0.15, h: 10 });
    expect(adjust({ l: 100, c: 0, h: null }, { hue: 20, sat: 150, light: 10 })).toEqual({ l: 100, c: 0, h: null });
  });
});

describe('generateCss', () => {
  it('emits nothing for untouched scales and skips grays unless included', () => {
    const s: PaletteSettings = { ...EMPTY_SETTINGS, global: { hue: 30, sat: 100, light: 0 } };
    const css = generateCss(s, LIGHT_SCALES, DARK_SCALES, ['gray', 'blue']);
    expect(css).toContain('--color-blue-1: oklch(98.5% 0.007 280)');
    expect(css).not.toContain('--color-gray-');
    // Dark: only the step-9 anchor, in both the class and media blocks.
    expect(css.match(/--color-blue-9: oklch\(54\.0% 0\.200 280\)/g)).toHaveLength(2);
    expect(generateCss(EMPTY_SETTINGS, LIGHT_SCALES, DARK_SCALES, ['blue'])).toMatch(/No changes/);
  });
});

describe('URL state', () => {
  it('round-trips, and clamps or drops bad input', () => {
    const s: PaletteSettings = { global: { hue: -20, sat: 120, light: 2.5 }, grays: true, colors: { blue: { hue: 10, sat: 90, light: 0 } } };
    expect(fromSearch(toSearch(s), ['blue'])).toEqual(s);
    expect(fromSearch('hue=999&sat=abc&evil=1_2_3&red=0_100_0', ['red'])).toEqual({
      global: { hue: 180, sat: 100, light: 0 },
      grays: false,
      colors: {},
    });
  });
});
