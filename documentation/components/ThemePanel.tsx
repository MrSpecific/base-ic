import { useState } from 'react';
import {
  ACCENT_COLORS,
  ACCENT_SWATCH_COLORS,
  APPEARANCES,
  GRAY_COLORS,
  RADII,
  SCALINGS,
  toDisplayName,
} from '../constants';
import { Button } from '../../src';
import type { AccentColor, Appearance, GrayColor, Radius, Scaling } from '../types';

type ThemePanelProps = {
  accent: AccentColor;
  setAccent: (v: AccentColor) => void;
  gray: GrayColor;
  setGray: (v: GrayColor) => void;
  radius: Radius;
  setRadius: (v: Radius) => void;
  scaling: Scaling;
  setScaling: (v: Scaling) => void;
  appearance: Appearance;
  setAppearance: (v: Appearance) => void;
  defaultOpen: boolean;
};

export function ThemePanel({
  accent,
  setAccent,
  gray,
  setGray,
  radius,
  setRadius,
  scaling,
  setScaling,
  appearance,
  setAppearance,
  defaultOpen,
}: ThemePanelProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const copyTheme = async () => {
    const snippet = [
      '<Theme',
      `  accentColor="${accent}"`,
      `  grayColor="${gray}"`,
      `  radius="${radius}"`,
      `  scaling="${scaling}"`,
      `  appearance="${appearance}"`,
      '>',
      '  <App />',
      '</Theme>',
    ].join('\n');

    try {
      await navigator.clipboard.writeText(snippet);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('error');
    }

    window.setTimeout(() => setCopyStatus('idle'), 1600);
  };

  return (
    <div className="theme-panel-wrapper">
      <div className={open ? 'theme-panel' : 'theme-panel-hidden'}>
        <div className="theme-panel-title">Theme</div>

        <div className="theme-panel-field">
          <span className="theme-panel-label">Accent Color</span>
          <div className="theme-panel-colors">
            {ACCENT_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                className="theme-panel-color-swatch"
                data-active={c === accent}
                style={{ background: ACCENT_SWATCH_COLORS[c] }}
                title={`Set accent color to ${toDisplayName(c)}`}
                aria-label={`Set accent color to ${toDisplayName(c)}`}
                onClick={() => setAccent(c)}
              />
            ))}
          </div>
          <p className="theme-panel-helper">Primary brand color for interactive elements.</p>
        </div>

        <div className="theme-panel-field">
          <label className="theme-panel-label" htmlFor="theme-gray">Neutral Palette</label>
          <div className="theme-panel-select-wrap">
            <select id="theme-gray" className="theme-panel-select" value={gray} onChange={(e) => setGray(e.target.value as GrayColor)}>
              {GRAY_COLORS.map((c) => <option key={c} value={c}>{toDisplayName(c)}</option>)}
            </select>
            <span className="theme-panel-select-caret" aria-hidden="true">▾</span>
          </div>
          <p className="theme-panel-helper">Sets the base gray family for borders and surfaces.</p>
        </div>

        <div className="theme-panel-field">
          <label className="theme-panel-label" htmlFor="theme-radius">Corner Radius</label>
          <div className="theme-panel-select-wrap">
            <select id="theme-radius" className="theme-panel-select" value={radius} onChange={(e) => setRadius(e.target.value as Radius)}>
              {RADII.map((r) => <option key={r} value={r}>{toDisplayName(r)}</option>)}
            </select>
            <span className="theme-panel-select-caret" aria-hidden="true">▾</span>
          </div>
          <p className="theme-panel-helper">Controls rounded corners across components.</p>
        </div>

        <div className="theme-panel-field">
          <label className="theme-panel-label" htmlFor="theme-scaling">Scale</label>
          <div className="theme-panel-select-wrap">
            <select id="theme-scaling" className="theme-panel-select" value={scaling} onChange={(e) => setScaling(e.target.value as Scaling)}>
              {SCALINGS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <span className="theme-panel-select-caret" aria-hidden="true">▾</span>
          </div>
          <p className="theme-panel-helper">Global size multiplier for spacing and typography.</p>
        </div>

        <div className="theme-panel-field">
          <label className="theme-panel-label" htmlFor="theme-appearance">Appearance</label>
          <div className="theme-panel-select-wrap">
            <select id="theme-appearance" className="theme-panel-select" value={appearance} onChange={(e) => setAppearance(e.target.value as Appearance)}>
              {APPEARANCES.map((a) => <option key={a} value={a}>{toDisplayName(a)}</option>)}
            </select>
            <span className="theme-panel-select-caret" aria-hidden="true">▾</span>
          </div>
          <p className="theme-panel-helper">Light or dark rendering mode.</p>
        </div>

        <Button
          className="theme-panel-copy-button"
          variant="solid"
          size="2"
          data-state={copyStatus}
          onClick={copyTheme}
        >
          {copyStatus === 'copied' ? 'Copied Theme' : copyStatus === 'error' ? 'Copy Failed' : 'Copy Theme'}
        </Button>
        <p className="theme-panel-helper">Copies a ready-to-paste <code>{'<Theme />'}</code> snippet.</p>
        <div className="theme-panel-current">
          {`accent: ${accent} • gray: ${gray} • radius: ${radius} • scale: ${scaling} • appearance: ${appearance}`}
        </div>
      </div>

      <Button
        className="theme-panel-toggle"
        variant="surface"
        size="2"
        onClick={() => setOpen(!open)}
        title={open ? 'Close theme panel' : 'Open theme panel'}
        aria-label={open ? 'Close theme panel' : 'Open theme panel'}
      >
        {open ? '\u2715' : '\u2699'}
      </Button>
    </div>
  );
}
