/**
 * Palette builder logic: read the built-in scales from the token CSS, apply
 * hue / saturation / lightness adjustments, and emit override CSS.
 *
 * Light scales declare all 12 steps in OKLCH. Dark chromatic scales declare
 * only step 9; the other steps are color-mix()es of it in dark.css, so
 * overriding step 9 carries them along. Dark grays declare every step.
 */

export type Oklch = { l: number; c: number; h: number | null };
export type Scale = Record<number, Oklch>;
export type Scales = Record<string, Scale>;

/** hue: degrees added. sat: chroma, % of original. light: lightness points added at mid-tones. */
export type Adjust = { hue: number; sat: number; light: number };
export type PaletteSettings = {
  global: Adjust;
  /** Apply the global adjustments to the gray scales (and black) too. */
  grays: boolean;
  /** Per-color adjustments, applied on top of the global ones. */
  colors: Record<string, Adjust>;
};

export const IDENTITY: Adjust = { hue: 0, sat: 100, light: 0 };
export const RANGES = {
  hue: { min: -180, max: 180, step: 1 },
  sat: { min: 0, max: 200, step: 1 },
  light: { min: -20, max: 20, step: 0.5 },
} as const;
export const NEUTRALS = ['gray', 'mauve', 'slate', 'sage', 'olive', 'sand', 'black'];
export const EMPTY_SETTINGS: PaletteSettings = { global: IDENTITY, grays: false, colors: {} };

const DECL = /--color-([a-z]+)-(\d+):\s*oklch\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+|none)\s*\)/g;

export function parseScales(css: string): Scales {
  const scales: Scales = {};
  for (const [, name, step, l, c, h] of css.matchAll(DECL)) {
    (scales[name] ??= {})[Number(step)] ??= { l: Number(l), c: Number(c), h: h === 'none' ? null : Number(h) };
  }
  return scales;
}

export function isIdentity(a: Adjust) {
  return a.hue === 0 && a.sat === 100 && a.light === 0;
}

export function effectiveAdjust(name: string, s: PaletteSettings): Adjust {
  const base = NEUTRALS.includes(name) && !s.grays ? IDENTITY : s.global;
  const own = s.colors[name];
  if (!own) return base;
  return { hue: base.hue + own.hue, sat: (base.sat * own.sat) / 100, light: base.light + own.light };
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export function adjust(v: Oklch, a: Adjust): Oklch {
  // Lightness moves most at mid-tones and not at all at 0% / 100%, so the
  // near-white backgrounds and near-black text steps keep their roles.
  const l = clamp(v.l + a.light * (1 - Math.abs(v.l - 50) / 50), 0, 100);
  // shortcut: chroma capped at 0.4 and left to the browser's gamut mapping; clip per step if out-of-gamut output matters.
  const c = Math.min((v.c * a.sat) / 100, 0.4);
  const h = v.h === null || v.c === 0 ? v.h : (((v.h + a.hue) % 360) + 360) % 360;
  return { l, c, h };
}

/** 8-bit sRGB → OKLCH (Björn Ottosson's OKLab matrices), lightness in %. */
export function srgbToOklch(r: number, g: number, b: number): Oklch {
  const lin = (v: number) => ((v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  const [R, G, B] = [lin(r), lin(g), lin(b)];
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const Bv = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const c = Math.hypot(A, Bv);
  return { l: L * 100, c, h: c < 1e-4 ? null : ((Math.atan2(Bv, A) * 180) / Math.PI + 360) % 360 };
}

export type Rgb = [number, number, number];
/** h in degrees, s and v in 0..1. */
export type Hsv = { h: number; s: number; v: number };
export type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'oklch';

export function hsvToRgb({ h, s, v }: Hsv): Rgb {
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    return Math.round(255 * (v - v * s * Math.max(0, Math.min(k, 4 - k, 1))));
  };
  return [f(5), f(3), f(1)];
}

export function rgbToHsv([r, g, b]: Rgb): Hsv {
  const [R, G, B] = [r / 255, g / 255, b / 255];
  const max = Math.max(R, G, B);
  const d = max - Math.min(R, G, B);
  const h = !d ? 0 : max === R ? ((G - B) / d) % 6 : max === G ? (B - R) / d + 2 : (R - G) / d + 4;
  return { h: (h * 60 + 360) % 360, s: max ? d / max : 0, v: max };
}

export const toHex = (rgb: Rgb) => `#${rgb.map((v) => v.toString(16).padStart(2, '0')).join('')}`;

export function formatColor(rgb: Rgb, format: ColorFormat): string {
  if (format === 'hex') return toHex(rgb);
  if (format === 'rgb') return `rgb(${rgb.join(', ')})`;
  if (format === 'oklch') return formatOklch(srgbToOklch(...rgb));
  const { h, s, v } = rgbToHsv(rgb);
  const l = v * (1 - s / 2);
  const sl = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);
  return `hsl(${Math.round(h)}, ${Math.round(sl * 100)}%, ${Math.round(l * 100)}%)`;
}

/**
 * The per-color Adjust that moves `base` (a scale's step 9) onto `target`,
 * on top of `global`. Clamped to the slider ranges, so it can fall short.
 */
export function adjustToTarget(base: Oklch, target: Oklch, global: Adjust): Adjust {
  const hasHue = base.h !== null && base.c > 0 && target.h !== null;
  const hue = hasHue ? ((((target.h! - base.h! - global.hue) % 360) + 540) % 360) - 180 : 0;
  const baseC = (base.c * global.sat) / 100;
  const sat = baseC > 0 ? (target.c / baseC) * 100 : 100;
  const weight = 1 - Math.abs(base.l - 50) / 50;
  const light = weight > 0 ? (target.l - base.l) / weight - global.light : 0;
  return {
    hue: clamp(Math.round(hue), RANGES.hue.min, RANGES.hue.max),
    sat: clamp(Math.round(sat), RANGES.sat.min, RANGES.sat.max),
    light: clamp(Math.round(light * 2) / 2, RANGES.light.min, RANGES.light.max),
  };
}

const round = (v: number, digits: number) => String(Number(v.toFixed(digits)));

export function formatOklch({ l, c, h }: Oklch) {
  return `oklch(${l.toFixed(1)}% ${c.toFixed(3)} ${h === null ? 'none' : round(h, 1)})`;
}

function block(selector: string, lines: string[], indent = '') {
  return `${indent}${selector} {\n${lines.map((line) => `${indent}  ${line}`).join('\n')}\n${indent}}`;
}

/** Override CSS for every scale the settings change, in `order`. */
export function generateCss(
  settings: PaletteSettings,
  light: Scales,
  dark: Scales,
  order: string[],
  shareUrl?: string,
): string {
  const lightLines: string[] = [];
  const darkLines: string[] = [];
  for (const name of order) {
    const a = effectiveAdjust(name, settings);
    if (isIdentity(a)) continue;
    for (const [step, value] of Object.entries(light[name] ?? {})) {
      lightLines.push(`--color-${name}-${step}: ${formatOklch(adjust(value, a))};`);
    }
    for (const [step, value] of Object.entries(dark[name] ?? {})) {
      darkLines.push(`--color-${name}-${step}: ${formatOklch(adjust(value, a))};`);
    }
  }
  if (lightLines.length === 0) return '/* No changes yet: adjust the palette to generate overrides. */\n';

  const header = [
    '/* base-ic palette overrides.',
    ' * Import after @wlcr/base-ic/style.css. Alpha steps and the dark-mode',
    ' * steps derived from step 9 follow these values automatically.',
    ...(shareUrl ? [` * Edit: ${shareUrl}`] : []),
    ' */',
  ].join('\n');
  // Same selectors as the token files, so these win by source order alone.
  return [
    header,
    block(":root,\n:where(.light, [data-appearance='light'])", lightLines),
    block(":where(.dark, [data-appearance='dark'])", darkLines),
    `@media (prefers-color-scheme: dark) {\n${block(
      ":root:not(.light):not([data-appearance='light'])",
      darkLines,
      '  ',
    )}\n}`,
  ].join('\n\n') + '\n';
}

/* --------------------------------------------------------------------------
 * URL state: ?hue=20&sat=120&light=-2&grays=1&blue=10_90_0
 * -------------------------------------------------------------------------- */

const encodeAdjust = (a: Adjust) => `${a.hue}_${a.sat}_${a.light}`;

export function toSearch(s: PaletteSettings): string {
  const p = new URLSearchParams();
  if (s.global.hue !== 0) p.set('hue', String(s.global.hue));
  if (s.global.sat !== 100) p.set('sat', String(s.global.sat));
  if (s.global.light !== 0) p.set('light', String(s.global.light));
  if (s.grays) p.set('grays', '1');
  for (const [name, a] of Object.entries(s.colors)) {
    if (!isIdentity(a)) p.set(name, encodeAdjust(a));
  }
  return p.toString();
}

function readNumber(raw: string | null | undefined, key: keyof Adjust): number {
  const n = Number(raw);
  if (raw == null || raw === '' || !Number.isFinite(n)) return IDENTITY[key];
  return clamp(n, RANGES[key].min, RANGES[key].max);
}

/** Parses untrusted query params: unknown names are dropped, numbers clamped to the slider ranges. */
export function fromSearch(search: string, names: string[]): PaletteSettings {
  const p = new URLSearchParams(search);
  const colors: Record<string, Adjust> = {};
  for (const name of names) {
    const raw = p.get(name);
    if (!raw) continue;
    const [hue, sat, light] = raw.split('_');
    const a = { hue: readNumber(hue, 'hue'), sat: readNumber(sat, 'sat'), light: readNumber(light, 'light') };
    if (!isIdentity(a)) colors[name] = a;
  }
  return {
    global: { hue: readNumber(p.get('hue'), 'hue'), sat: readNumber(p.get('sat'), 'sat'), light: readNumber(p.get('light'), 'light') },
    grays: p.get('grays') === '1',
    colors,
  };
}
