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
import styles from './ThemePanel.module.css';

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
    <div className={styles.wrapper}>
      <div className={open ? styles.panel : styles.hidden}>
        <div className={styles.title}>Theme</div>

        <div className={styles.field}>
          <span className={styles.label}>Accent Color</span>
          <div className={styles.colors}>
            {ACCENT_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                className={styles.colorSwatch}
                data-active={c === accent}
                style={{ background: ACCENT_SWATCH_COLORS[c] }}
                title={`Set accent color to ${toDisplayName(c)}`}
                aria-label={`Set accent color to ${toDisplayName(c)}`}
                onClick={() => setAccent(c)}
              />
            ))}
          </div>
          <p className={styles.helper}>Primary brand color for interactive elements.</p>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="theme-gray">Neutral Palette</label>
          <div className={styles.selectWrap}>
            <select id="theme-gray" className={styles.select} value={gray} onChange={(e) => setGray(e.target.value as GrayColor)}>
              {GRAY_COLORS.map((c) => <option key={c} value={c}>{toDisplayName(c)}</option>)}
            </select>
            <span className={styles.selectCaret} aria-hidden="true">▾</span>
          </div>
          <p className={styles.helper}>Sets the base gray family for borders and surfaces.</p>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="theme-radius">Corner Radius</label>
          <div className={styles.selectWrap}>
            <select id="theme-radius" className={styles.select} value={radius} onChange={(e) => setRadius(e.target.value as Radius)}>
              {RADII.map((r) => <option key={r} value={r}>{toDisplayName(r)}</option>)}
            </select>
            <span className={styles.selectCaret} aria-hidden="true">▾</span>
          </div>
          <p className={styles.helper}>Controls rounded corners across components.</p>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="theme-scaling">Scale</label>
          <div className={styles.selectWrap}>
            <select id="theme-scaling" className={styles.select} value={scaling} onChange={(e) => setScaling(e.target.value as Scaling)}>
              {SCALINGS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <span className={styles.selectCaret} aria-hidden="true">▾</span>
          </div>
          <p className={styles.helper}>Global size multiplier for spacing and typography.</p>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="theme-appearance">Appearance</label>
          <div className={styles.selectWrap}>
            <select id="theme-appearance" className={styles.select} value={appearance} onChange={(e) => setAppearance(e.target.value as Appearance)}>
              {APPEARANCES.map((a) => <option key={a} value={a}>{toDisplayName(a)}</option>)}
            </select>
            <span className={styles.selectCaret} aria-hidden="true">▾</span>
          </div>
          <p className={styles.helper}>Light or dark rendering mode.</p>
        </div>

        <Button
          className={styles.copyButton}
          variant="solid"
          size="2"
          data-state={copyStatus}
          onClick={copyTheme}
        >
          {copyStatus === 'copied' ? 'Copied Theme' : copyStatus === 'error' ? 'Copy Failed' : 'Copy Theme'}
        </Button>
        <p className={styles.helper}>Copies a ready-to-paste <code>{'<Theme />'}</code> snippet.</p>
        <div className={styles.current}>
          {`accent: ${accent} • gray: ${gray} • radius: ${radius} • scale: ${scaling} • appearance: ${appearance}`}
        </div>
      </div>

      <Button
        className={styles.toggle}
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
