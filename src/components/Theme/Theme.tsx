import React from 'react';
import styles from './theme.module.css';

// ============================================================================
// Types
// ============================================================================

export type AccentColor =
  | 'gray'
  | 'mauve'
  | 'slate'
  | 'sage'
  | 'olive'
  | 'sand'
  | 'tomato'
  | 'red'
  | 'ruby'
  | 'crimson'
  | 'pink'
  | 'plum'
  | 'purple'
  | 'violet'
  | 'iris'
  | 'indigo'
  | 'blue'
  | 'cyan'
  | 'teal'
  | 'jade'
  | 'green'
  | 'grass'
  | 'bronze'
  | 'gold'
  | 'brown'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'mint'
  | 'sky'
  | 'black'
  | (string & {}); // Allow custom color names

export type GrayColor =
  | 'gray'
  | 'mauve'
  | 'slate'
  | 'sage'
  | 'olive'
  | 'sand';

export type Radius = 'none' | 'small' | 'medium' | 'large' | 'full';
export type Scaling =
  | '80%'
  | '85%'
  | '90%'
  | '95%'
  | '100%'
  | '105%'
  | '110%'
  | '115%'
  | '120%'
  | '125%'
  | '130%'
  | '135%'
  | '140%'
  | '145%'
  | '150%';
export type Appearance = 'light' | 'dark' | 'inherit';

/**
 * Named font-family slots. Each slot maps to a CSS custom property.
 * All slots are optional — unspecified slots fall back to semantic.css defaults.
 *
 * - primary:   Body text, UI labels, form inputs (`--font-family-primary`)
 * - secondary: Supporting text, captions, metadata (`--font-family-secondary`)
 * - tertiary:  De-emphasized text, fine print, footnotes (`--font-family-tertiary`)
 * - display:   Large headings, hero text, decorative typefaces (`--font-family-display`)
 * - monospace: Code blocks, kbd, pre, technical content (`--font-family-mono`)
 */
export interface FontFamilies {
  primary?: string;
  secondary?: string;
  tertiary?: string;
  display?: string;
  monospace?: string;
}

/** A complete 12-step color scale for custom colors */
export interface CustomColorScale {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
  contrast: string;
}

export interface ThemeProps {
  /** The primary brand/accent color */
  accentColor?: AccentColor;
  /** The neutral/gray palette hue */
  grayColor?: GrayColor;
  /** Border radius scale */
  radius?: Radius;
  /** Overall size scaling multiplier */
  scaling?: Scaling;
  /** Light/dark appearance */
  appearance?: Appearance;
  /**
   * Font family overrides. Each slot maps to a CSS custom property.
   * Unspecified slots inherit from semantic.css defaults.
   */
  fontFamily?: FontFamilies;
  /** Custom color definitions — enables extending the color palette */
  customColors?: Record<string, CustomColorScale>;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// ============================================================================
// Radius mapping
// ============================================================================

const radiusMap: Record<Radius, string> = {
  none:   '0',
  small:  'var(--radius-2)',  /* 4px */
  medium: 'var(--radius-3)',  /* 6px */
  large:  'var(--radius-5)', /* 12px */
  full:   'var(--radius-full)',
};

// ============================================================================
// Scaling mapping
// ============================================================================

const scalingMap: Record<Scaling, string> = {
  '80%':  '0.8',
  '85%':  '0.85',
  '90%':  '0.9',
  '95%':  '0.95',
  '100%': '1',
  '105%': '1.05',
  '110%': '1.1',
  '115%': '1.15',
  '120%': '1.2',
  '125%': '1.25',
  '130%': '1.3',
  '135%': '1.35',
  '140%': '1.4',
  '145%': '1.45',
  '150%': '1.5',
};

const scalableTokenBases: Record<string, string> = {
  '--space-1': '0.25rem',
  '--space-2': '0.5rem',
  '--space-3': '0.75rem',
  '--space-4': '1rem',
  '--space-5': '1.25rem',
  '--space-6': '1.5rem',
  '--space-7': '1.75rem',
  '--space-8': '2rem',
  '--space-9': '2.5rem',
  '--space-10': '3rem',
  '--space-11': '4rem',
  '--space-12': '5rem',
  '--size-1': '1rem',
  '--size-2': '1.5rem',
  '--size-3': '2rem',
  '--size-4': '2.5rem',
  '--size-5': '3rem',
  '--size-6': '3.5rem',
  '--size-7': '4rem',
  '--size-8': '5rem',
  '--size-9': '6rem',
  '--size-10': '7.5rem',
  '--font-size-1': '0.75rem',
  '--font-size-2': '0.8125rem',
  '--font-size-3': '0.875rem',
  '--font-size-4': '1rem',
  '--font-size-5': '1.125rem',
  '--font-size-6': '1.25rem',
  '--font-size-7': '1.5rem',
  '--font-size-8': '1.875rem',
  '--font-size-9': '2.25rem',
  '--font-size-10': '3rem',
  '--font-size-11': '3.75rem',
  '--font-size-12': '4.5rem',
};

// ============================================================================
// Helpers
// ============================================================================

/**
 * Build CSS custom properties that wire --color-accent-N to the chosen hue.
 */
function buildAccentVars(accentColor: AccentColor): Record<string, string> {
  const vars: Record<string, string> = {};
  for (let i = 1; i <= 12; i++) {
    vars[`--color-accent-${i}`] = `var(--color-${accentColor}-${i})`;
  }
  vars['--color-accent-contrast'] = `var(--color-${accentColor}-contrast)`;
  return vars;
}

/**
 * Build CSS custom properties that wire --color-neutral-N to the chosen gray.
 */
function buildNeutralVars(grayColor: GrayColor): Record<string, string> {
  const vars: Record<string, string> = {};
  for (let i = 1; i <= 12; i++) {
    vars[`--color-neutral-${i}`] = `var(--color-${grayColor}-${i})`;
  }
  return vars;
}

/**
 * Build CSS custom properties for font family slot overrides.
 * Only writes properties for slots that are explicitly provided —
 * unspecified slots resolve from semantic.css defaults via the CSS cascade.
 * This avoids clobbering nested Theme overrides for unspecified slots.
 */
function buildFontFamilyVars(fontFamily: FontFamilies): Record<string, string> {
  const vars: Record<string, string> = {};
  if (fontFamily.primary   !== undefined) vars['--font-family-primary']   = fontFamily.primary;
  if (fontFamily.secondary !== undefined) vars['--font-family-secondary'] = fontFamily.secondary;
  if (fontFamily.tertiary  !== undefined) vars['--font-family-tertiary']  = fontFamily.tertiary;
  if (fontFamily.display   !== undefined) vars['--font-family-display']   = fontFamily.display;
  if (fontFamily.monospace !== undefined) vars['--font-family-mono']      = fontFamily.monospace;
  return vars;
}

/**
 * Build CSS custom properties for custom colors.
 * Writes --color-{name}-{1..12} and --color-{name}-contrast.
 */
function buildCustomColorVars(
  customColors: Record<string, CustomColorScale>
): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const [name, scale] of Object.entries(customColors)) {
    for (let i = 1; i <= 12; i++) {
      vars[`--color-${name}-${i}`] = scale[i as keyof CustomColorScale] as string;
    }
    vars[`--color-${name}-contrast`] = scale.contrast;
  }
  return vars;
}

/**
 * Build scaled component tokens.
 * These override primitive size tokens in Theme scope so all components
 * that consume token variables respond to `scaling`.
 */
function buildScaledTokenVars(): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const [token, base] of Object.entries(scalableTokenBases)) {
    vars[token] = `calc(${base} * var(--component-scaling))`;
  }
  return vars;
}

// ============================================================================
// Context
// ============================================================================

interface ThemeContextValue {
  accentColor: AccentColor;
  grayColor: GrayColor;
  radius: Radius;
  scaling: Scaling;
  appearance: Appearance;
  fontFamily: FontFamilies;
}

const ThemeContext = React.createContext<ThemeContextValue>({
  accentColor: 'blue',
  grayColor: 'gray',
  radius: 'medium',
  scaling: '100%',
  appearance: 'inherit',
  fontFamily: {},
});
const ThemeNestingContext = React.createContext(0);

export function useTheme(): ThemeContextValue {
  return React.useContext(ThemeContext);
}

// ============================================================================
// Theme component
// ============================================================================

export function Theme({
  accentColor = 'blue',
  grayColor = 'gray',
  radius = 'medium',
  scaling = '100%',
  appearance = 'inherit',
  fontFamily,
  customColors,
  children,
  className,
  style,
}: ThemeProps) {
  const nestingLevel = React.useContext(ThemeNestingContext);
  const isRootTheme = nestingLevel === 0;

  // Sync appearance to <body> so portaled elements (tooltips, popovers, etc.)
  // that render outside this Theme div still inherit dark/light mode CSS vars.
  //
  // Why <body> and not <html>?
  // dark.css uses `:where(.dark, [data-appearance='dark'])` which has zero
  // specificity (0,0,0). The `:root {}` rules in gray.css have (0,1,0), so
  // they beat the dark overrides when both match <html>. <body> is not targeted
  // by :root, so the zero-specificity dark vars apply without conflict.
  React.useEffect(() => {
    if (!isRootTheme) return;
    if (typeof document === 'undefined') return;
    const body = document.body;
    if (appearance === 'dark') {
      body.classList.add('dark');
      body.classList.remove('light');
      body.setAttribute('data-appearance', 'dark');
    } else if (appearance === 'light') {
      body.classList.add('light');
      body.classList.remove('dark');
      body.setAttribute('data-appearance', 'light');
    } else {
      // 'inherit' — rely on @media (prefers-color-scheme)
      body.classList.remove('dark', 'light');
      body.removeAttribute('data-appearance');
    }
    return () => {
      body.classList.remove('dark', 'light');
      body.removeAttribute('data-appearance');
    };
  }, [appearance, isRootTheme]);

  const cssVars: React.CSSProperties = {
    // Component-level scaling
    '--component-scaling': scalingMap[scaling],
    // Scaled primitive aliases (space, size, type)
    ...buildScaledTokenVars(),
    // Accent color wiring
    ...buildAccentVars(accentColor),
    // Neutral color wiring
    ...buildNeutralVars(grayColor),
    // Custom color definitions
    ...(customColors ? buildCustomColorVars(customColors) : {}),
    // Font family overrides (only writes vars for specified slots)
    ...(fontFamily ? buildFontFamilyVars(fontFamily) : {}),
    // Component-level radius
    '--component-radius': radiusMap[radius],
    // Pass-through user styles
    ...style,
  } as React.CSSProperties;

  const contextValue = React.useMemo<ThemeContextValue>(
    () => ({ accentColor, grayColor, radius, scaling, appearance, fontFamily: fontFamily ?? {} }),
    [accentColor, grayColor, radius, scaling, appearance, fontFamily]
  );

  const appearanceClass =
    appearance === 'dark'
      ? styles.dark
      : appearance === 'light'
      ? styles.light
      : undefined;

  return (
    <ThemeNestingContext.Provider value={nestingLevel + 1}>
      <ThemeContext.Provider value={contextValue}>
        <div
          className={[styles.theme, appearanceClass, className]
            .filter(Boolean)
            .join(' ')}
          style={cssVars}
          data-accent-color={accentColor}
          data-gray-color={grayColor}
          data-radius={radius}
          data-scaling={scaling}
          data-appearance={appearance}
        >
          {children}
        </div>
      </ThemeContext.Provider>
    </ThemeNestingContext.Provider>
  );
}
