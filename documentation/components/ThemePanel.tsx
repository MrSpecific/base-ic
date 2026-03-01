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
import { Button, Select, Tooltip } from '../../src';
import { IconInfo } from '../icons';
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

function FieldLabel({ label, description }: { label: string; description: string }) {
  return (
    <div className={styles.labelRow}>
      <span className={styles.label}>{label}</span>
      <Tooltip content={description} side="left" align="center">
        <Button
          className={styles.infoButton}
          variant="surface"
          color="gray"
          size="1"
          radius="full"
          aria-label={`${label} information`}
        >
          <IconInfo className={styles.infoIcon} />
        </Button>
      </Tooltip>
    </div>
  );
}

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
          <FieldLabel
            label="Accent Color"
            description="Primary brand color for interactive elements."
          />
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
        </div>

        <div className={styles.field}>
          <FieldLabel
            label="Neutral Palette"
            description="Sets the base gray family for borders and surfaces."
          />
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
        </div>

        <div className={styles.field}>
          <FieldLabel
            label="Corner Radius"
            description="Controls rounded corners across components."
          />
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
        </div>

        <div className={styles.field}>
          <FieldLabel
            label="Scale"
            description="Global size multiplier for spacing and typography."
          />
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
        </div>

        <div className={styles.field}>
          <FieldLabel
            label="Appearance"
            description="Light or dark rendering mode."
          />
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
