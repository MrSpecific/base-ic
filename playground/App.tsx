import { useState } from 'react';
import { Theme } from '../src';
import type { AccentColor, GrayColor, Radius, Scaling, Appearance } from '../src';
import '../src/tokens/index.css';
import './playground.css';

// ---------------------------------------------------------------------------
// Available options for the toolbar
// ---------------------------------------------------------------------------

const ACCENT_COLORS: AccentColor[] = [
  'blue', 'violet', 'red', 'green', 'orange', 'yellow', 'pink', 'teal',
];

const GRAY_COLORS: GrayColor[] = [
  'gray', 'mauve', 'slate',
];

const RADII: Radius[] = ['none', 'small', 'medium', 'large', 'full'];
const SCALINGS: Scaling[] = ['90%', '95%', '100%', '105%', '110%'];
const APPEARANCES: Appearance[] = ['light', 'dark', 'inherit'];

// All hues with tokens defined (for the color palette grid)
const ALL_HUES = [
  'gray', 'mauve', 'slate', 'blue', 'violet', 'red',
  'green', 'orange', 'yellow', 'pink', 'teal',
];

const STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Color swatch data — maps accent name to its step-9 color for the picker
// ---------------------------------------------------------------------------

const ACCENT_SWATCH_COLORS: Record<string, string> = {
  blue:    'var(--color-blue-9)',
  violet:  'var(--color-violet-9)',
  red:     'var(--color-red-9)',
  green:   'var(--color-green-9)',
  orange:  'var(--color-orange-9)',
  yellow:  'var(--color-yellow-9)',
  pink:    'var(--color-pink-9)',
  teal:    'var(--color-teal-9)',
};

// ---------------------------------------------------------------------------
// ThemePanel — floating control panel
// ---------------------------------------------------------------------------

function ThemePanel({
  accent, setAccent,
  gray, setGray,
  radius, setRadius,
  scaling, setScaling,
  appearance, setAppearance,
}: {
  accent: AccentColor;    setAccent: (v: AccentColor) => void;
  gray: GrayColor;        setGray: (v: GrayColor) => void;
  radius: Radius;         setRadius: (v: Radius) => void;
  scaling: Scaling;       setScaling: (v: Scaling) => void;
  appearance: Appearance; setAppearance: (v: Appearance) => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="theme-panel-wrapper">
      <div className={open ? 'theme-panel' : 'theme-panel-hidden'}>
        <div className="theme-panel-title">Theme</div>

        {/* Accent — color swatch picker */}
        <div className="theme-panel-field">
          <span className="theme-panel-label">Accent</span>
          <div className="theme-panel-colors">
            {ACCENT_COLORS.map((c) => (
              <div
                key={c}
                className="theme-panel-color-swatch"
                data-active={c === accent}
                style={{ background: ACCENT_SWATCH_COLORS[c] }}
                title={c}
                onClick={() => setAccent(c)}
              />
            ))}
          </div>
        </div>

        {/* Gray */}
        <div className="theme-panel-field">
          <span className="theme-panel-label">Gray</span>
          <select className="theme-panel-select" value={gray} onChange={(e) => setGray(e.target.value as GrayColor)}>
            {GRAY_COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Radius */}
        <div className="theme-panel-field">
          <span className="theme-panel-label">Radius</span>
          <select className="theme-panel-select" value={radius} onChange={(e) => setRadius(e.target.value as Radius)}>
            {RADII.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        {/* Scaling */}
        <div className="theme-panel-field">
          <span className="theme-panel-label">Scaling</span>
          <select className="theme-panel-select" value={scaling} onChange={(e) => setScaling(e.target.value as Scaling)}>
            {SCALINGS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Appearance */}
        <div className="theme-panel-field">
          <span className="theme-panel-label">Appearance</span>
          <select className="theme-panel-select" value={appearance} onChange={(e) => setAppearance(e.target.value as Appearance)}>
            {APPEARANCES.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
      </div>

      <button
        className="theme-panel-toggle"
        onClick={() => setOpen(!open)}
        title={open ? 'Close theme panel' : 'Open theme panel'}
        aria-label={open ? 'Close theme panel' : 'Open theme panel'}
      >
        {open ? '\u2715' : '\u2699'}
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

export default function App() {
  const [accent, setAccent] = useState<AccentColor>('blue');
  const [gray, setGray] = useState<GrayColor>('gray');
  const [radius, setRadius] = useState<Radius>('medium');
  const [scaling, setScaling] = useState<Scaling>('100%');
  const [appearance, setAppearance] = useState<Appearance>('light');

  return (
    <Theme
      accentColor={accent}
      grayColor={gray}
      radius={radius}
      scaling={scaling}
      appearance={appearance}
    >
      <ThemePanel
        accent={accent} setAccent={setAccent}
        gray={gray} setGray={setGray}
        radius={radius} setRadius={setRadius}
        scaling={scaling} setScaling={setScaling}
        appearance={appearance} setAppearance={setAppearance}
      />

      <div className="playground">
        <h1>base-ic playground</h1>
        <p>
          Interactive token and theme exploration.
          Use the floating panel in the bottom-right to tweak the theme.
        </p>

        {/* ----------------------------------------------------------------
         * Color palette
         * ---------------------------------------------------------------- */}
        <h2>Color Palette</h2>

        <h3>Accent (mapped to <code>{accent}</code>)</h3>
        <div className="swatch-grid">
          {STEPS.map((step) => (
            <div
              key={step}
              className="swatch"
              style={{ background: `var(--color-accent-${step})` }}
              title={`--color-accent-${step}`}
            />
          ))}
        </div>
        <div className="swatch-label">
          {STEPS.map((s) => s).join('   ')}
        </div>

        <h3>Neutral (mapped to <code>{gray}</code>)</h3>
        <div className="swatch-grid">
          {STEPS.map((step) => (
            <div
              key={step}
              className="swatch"
              style={{ background: `var(--color-neutral-${step})` }}
              title={`--color-neutral-${step}`}
            />
          ))}
        </div>

        <h3>All Hues</h3>
        {ALL_HUES.map((hue) => (
          <div key={hue} style={{ marginBottom: 'var(--space-2)' }}>
            <div className="swatch-label">{hue}</div>
            <div className="swatch-grid">
              {STEPS.map((step) => (
                <div
                  key={step}
                  className="swatch"
                  style={{ background: `var(--color-${hue}-${step})` }}
                  title={`--color-${hue}-${step}`}
                />
              ))}
            </div>
          </div>
        ))}

        {/* ----------------------------------------------------------------
         * Status colors
         * ---------------------------------------------------------------- */}
        <h2>Status Colors</h2>
        <div className="surface-grid">
          {(['danger', 'success', 'warning', 'info'] as const).map((status) => (
            <div
              key={status}
              className="surface-card"
              style={{
                background: `var(--color-${status}-bg)`,
                borderColor: `var(--color-${status}-border)`,
              }}
            >
              <div className="surface-card-title" style={{ color: `var(--color-${status}-text)` }}>
                {status}
              </div>
              <div className="surface-card-body" style={{ color: `var(--color-${status}-text)` }}>
                Sample {status} message
              </div>
              <div
                style={{
                  marginTop: 'var(--space-2)',
                  padding: 'var(--space-1) var(--space-3)',
                  borderRadius: 'var(--component-radius)',
                  background: `var(--color-${status}-solid)`,
                  color: `var(--color-${status}-contrast)`,
                  display: 'inline-block',
                  fontSize: 'var(--font-size-2)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                {status} solid
              </div>
            </div>
          ))}
        </div>

        {/* ----------------------------------------------------------------
         * Surfaces
         * ---------------------------------------------------------------- */}
        <h2>Surfaces</h2>
        <div className="surface-grid">
          {([
            ['base', '--color-surface-base'],
            ['subtle', '--color-surface-subtle'],
            ['raised', '--color-surface-raised'],
            ['overlay', '--color-surface-overlay'],
          ] as const).map(([name, token]) => (
            <div
              key={name}
              className="surface-card"
              style={{ background: `var(${token})` }}
            >
              <div className="surface-card-title">{name}</div>
              <div className="surface-card-body">{token}</div>
            </div>
          ))}
        </div>

        {/* ----------------------------------------------------------------
         * Text colors
         * ---------------------------------------------------------------- */}
        <h2>Text Colors</h2>
        <div className="section">
          {([
            ['primary', '--color-text-primary'],
            ['secondary', '--color-text-secondary'],
            ['tertiary', '--color-text-tertiary'],
            ['disabled', '--color-text-disabled'],
            ['link', '--color-text-link'],
          ] as const).map(([name, token]) => (
            <div key={name} className="token-row">
              <span style={{ color: `var(${token})`, fontSize: 'var(--font-size-5)', fontWeight: 500, minWidth: 200 }}>
                {name} text
              </span>
              <span className="token-name">{token}</span>
            </div>
          ))}
        </div>

        {/* ----------------------------------------------------------------
         * Font families
         * ---------------------------------------------------------------- */}
        <h2>Font Families</h2>
        <div className="section">
          {([
            ['primary', '--font-family-primary', 'Body text, UI labels, inputs'],
            ['secondary', '--font-family-secondary', 'Supporting text, captions'],
            ['tertiary', '--font-family-tertiary', 'De-emphasized, footnotes'],
            ['display', '--font-family-display', 'Large headings, hero text'],
            ['mono', '--font-family-mono', 'Code, kbd, technical content'],
          ] as const).map(([name, token, desc]) => (
            <div key={name} className="font-demo">
              <div className="font-demo-label">{token} — {desc}</div>
              <div className="font-demo-sample" style={{ fontFamily: `var(${token})` }}>
                The quick brown fox jumps over the lazy dog
              </div>
            </div>
          ))}
        </div>

        {/* ----------------------------------------------------------------
         * Spacing scale
         * ---------------------------------------------------------------- */}
        <h2>Spacing</h2>
        <div className="spacing-row">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((step) => (
            <div key={step} className="spacing-block">
              <div
                style={{
                  width: `var(--space-${step})`,
                  height: `var(--space-${step})`,
                  background: 'var(--color-accent-9)',
                  borderRadius: 'var(--radius-1)',
                }}
              />
              <span>{step}</span>
            </div>
          ))}
        </div>

        {/* ----------------------------------------------------------------
         * Radius
         * ---------------------------------------------------------------- */}
        <h2>Border Radius</h2>
        <div className="radius-row">
          {[
            ['1', '--radius-1'],
            ['2', '--radius-2'],
            ['3', '--radius-3'],
            ['4', '--radius-4'],
            ['5', '--radius-5'],
            ['6', '--radius-6'],
            ['full', '--radius-full'],
          ].map(([name, token]) => (
            <div key={name} className="spacing-block">
              <div className="radius-block" style={{ borderRadius: `var(${token})` }}>
                {name}
              </div>
              <span>{token.replace('--radius-', '')}</span>
            </div>
          ))}
        </div>

        {/* ----------------------------------------------------------------
         * Shadows
         * ---------------------------------------------------------------- */}
        <h2>Shadows</h2>
        <div className="spacing-row" style={{ gap: 'var(--space-5)', paddingBottom: 'var(--space-6)' }}>
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <div key={step} className="spacing-block">
              <div
                style={{
                  width: 80,
                  height: 80,
                  background: 'var(--color-surface-raised)',
                  borderRadius: 'var(--component-radius)',
                  boxShadow: `var(--shadow-${step})`,
                }}
              />
              <span>{step}</span>
            </div>
          ))}
        </div>

        {/* ----------------------------------------------------------------
         * Component radius (set by Theme)
         * ---------------------------------------------------------------- */}
        <h2>Component Radius (via Theme)</h2>
        <p>Current: <code>{radius}</code></p>
        <div className="spacing-row">
          <div
            style={{
              width: 120,
              height: 44,
              background: 'var(--color-accent-9)',
              borderRadius: 'var(--component-radius)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-accent-contrast)',
              fontSize: 'var(--font-size-3)',
              fontWeight: 'var(--font-weight-medium)',
            }}
          >
            Button-ish
          </div>
          <div
            style={{
              width: 200,
              height: 100,
              background: 'var(--color-surface-raised)',
              borderRadius: 'var(--component-radius)',
              border: '1px solid var(--color-border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--font-size-3)',
              color: 'var(--color-text-secondary)',
            }}
          >
            Card-ish
          </div>
        </div>
      </div>
    </Theme>
  );
}
