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
      <div className="playground">
        <h1>base-ic playground</h1>
        <p>
          Interactive token and theme exploration.
          Change settings below to see tokens update in real time.
        </p>

        {/* ----------------------------------------------------------------
         * Toolbar
         * ---------------------------------------------------------------- */}
        <div className="toolbar">
          <label>
            Accent
            <select value={accent} onChange={(e) => setAccent(e.target.value as AccentColor)}>
              {ACCENT_COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>

          <label>
            Gray
            <select value={gray} onChange={(e) => setGray(e.target.value as GrayColor)}>
              {GRAY_COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>

          <label>
            Radius
            <select value={radius} onChange={(e) => setRadius(e.target.value as Radius)}>
              {RADII.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </label>

          <label>
            Scaling
            <select value={scaling} onChange={(e) => setScaling(e.target.value as Scaling)}>
              {SCALINGS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>

          <label>
            Appearance
            <select value={appearance} onChange={(e) => setAppearance(e.target.value as Appearance)}>
              {APPEARANCES.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </label>
        </div>

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
