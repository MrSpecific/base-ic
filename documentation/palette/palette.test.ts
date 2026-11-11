import { describe, expect, it } from 'vitest';
import {
  adjust,
  adjustToTarget,
  effectiveAdjust,
  EMPTY_SETTINGS,
  formatColor,
  fromSearch,
  generateCss,
  hsvToRgb,
  IDENTITY,
  rgbToHsv,
  type Rgb,
  srgbToOklch,
  toSearch,
  type PaletteSettings,
} from './palette';
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

describe('color picker math', () => {
  it('converts sRGB to OKLCH', () => {
    const red = srgbToOklch(255, 0, 0);
    expect(red.l).toBeCloseTo(62.8, 1);
    expect(red.c).toBeCloseTo(0.2577, 3);
    expect(red.h).toBeCloseTo(29.23, 1);
    expect(srgbToOklch(255, 255, 255)).toMatchObject({ h: null });
  });

  it('round-trips HSV and formats each color space', () => {
    expect(rgbToHsv([255, 0, 0])).toEqual({ h: 0, s: 1, v: 1 });
    for (const rgb of [[62, 99, 221], [0, 0, 0], [128, 128, 128], [10, 200, 90]] as Rgb[]) {
      expect(hsvToRgb(rgbToHsv(rgb))).toEqual(rgb);
    }
    expect(formatColor([62, 99, 221], 'hex')).toBe('#3e63dd');
    expect(formatColor([62, 99, 221], 'rgb')).toBe('rgb(62, 99, 221)');
    expect(formatColor([255, 0, 0], 'hsl')).toBe('hsl(0, 100%, 50%)');
    expect(formatColor([128, 128, 128], 'hsl')).toBe('hsl(0, 0%, 50%)');
    expect(formatColor([255, 0, 0], 'oklch')).toBe('oklch(62.8% 0.258 29.2)');
  });

  it('finds the adjust that lands step 9 on the target, on top of the global one', () => {
    const base = { l: 55, c: 0.2, h: 260 };
    const target = { l: 60, c: 0.1, h: 300 };
    const settings: PaletteSettings = { ...EMPTY_SETTINGS, global: { hue: 10, sat: 80, light: 1 } };
    const own = adjustToTarget(base, target, settings.global);
    const result = adjust(base, effectiveAdjust('blue', { ...settings, colors: { blue: own } }));
    expect(result.l).toBeCloseTo(60, 0);
    expect(result.c).toBeCloseTo(0.1, 2);
    expect(result.h).toBeCloseTo(300, 0);
    // Out of range: clamped to the slider limits.
    expect(adjustToTarget(base, { l: 99, c: 0.4, h: 260 }, IDENTITY)).toEqual({ hue: 0, sat: 200, light: 20 });
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
