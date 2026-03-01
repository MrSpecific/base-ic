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
import { Button, Select } from '../../src';
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
  const copyButtonColor = copyStatus === 'copied' ? 'green' : copyStatus === 'error' ? 'red' : 'accent';

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
          <span className={styles.label}>Neutral Palette</span>
          <Select
            value={gray}
            onValueChange={(value) => {
              if (typeof value === 'string') setGray(value as GrayColor);
            }}
            size="1"
            triggerClassName={styles.selectControl}
          >
            {GRAY_COLORS.map((c) => (
              <Select.Item key={c} value={c}>{toDisplayName(c)}</Select.Item>
            ))}
          </Select>
          <p className={styles.helper}>Sets the base gray family for borders and surfaces.</p>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Corner Radius</span>
          <Select
            value={radius}
            onValueChange={(value) => {
              if (typeof value === 'string') setRadius(value as Radius);
            }}
            size="1"
            triggerClassName={styles.selectControl}
          >
            {RADII.map((r) => (
              <Select.Item key={r} value={r}>{toDisplayName(r)}</Select.Item>
            ))}
          </Select>
          <p className={styles.helper}>Controls rounded corners across components.</p>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Scale</span>
          <Select
            value={scaling}
            onValueChange={(value) => {
              if (typeof value === 'string') setScaling(value as Scaling);
            }}
            size="1"
            triggerClassName={styles.selectControl}
          >
            {SCALINGS.map((s) => (
              <Select.Item key={s} value={s}>{s}</Select.Item>
            ))}
          </Select>
          <p className={styles.helper}>Global size multiplier for spacing and typography.</p>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Appearance</span>
          <Select
            value={appearance}
            onValueChange={(value) => {
              if (typeof value === 'string') setAppearance(value as Appearance);
            }}
            size="1"
            triggerClassName={styles.selectControl}
          >
            {APPEARANCES.map((a) => (
              <Select.Item key={a} value={a}>{toDisplayName(a)}</Select.Item>
            ))}
          </Select>
          <p className={styles.helper}>Light or dark rendering mode.</p>
        </div>

        <Button
          className={styles.copyButton}
          variant="solid"
          size="2"
          color={copyButtonColor}
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
        radius="full"
        p="0"
        onClick={() => setOpen(!open)}
        title={open ? 'Close theme panel' : 'Open theme panel'}
        aria-label={open ? 'Close theme panel' : 'Open theme panel'}
      >
        {open ? '\u2715' : '\u2699'}
      </Button>
    </div>
  );
}
