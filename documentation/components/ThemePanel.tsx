import { useId, useState } from 'react';
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

function FieldLabel({
  label,
  description,
  htmlFor,
  id,
}: {
  label: string;
  description: string;
  /** Associates the label with a form control. */
  htmlFor?: string;
  /** For groups that aren't a single control (e.g. swatches). */
  id?: string;
}) {
  return (
    <div className={styles.labelRow}>
      {htmlFor ? (
        <label className={styles.label} htmlFor={htmlFor}>{label}</label>
      ) : (
        <span className={styles.label} id={id}>{label}</span>
      )}
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
  const idPrefix = useId();
  const panelId = `${idPrefix}-panel`;
  const accentLabelId = `${idPrefix}-accent`;
  const grayId = `${idPrefix}-gray`;
  const radiusId = `${idPrefix}-radius`;
  const scalingId = `${idPrefix}-scaling`;
  const appearanceId = `${idPrefix}-appearance`;
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
      <div
        id={panelId}
        className={open ? styles.panel : styles.hidden}
        role="region"
        aria-label="Theme settings"
      >
        <div className={styles.title}>Theme</div>

        <div className={styles.field}>
          <FieldLabel
            label="Accent Color"
            description="Primary brand color for interactive elements."
            id={accentLabelId}
          />
          <div className={styles.colors} role="group" aria-labelledby={accentLabelId}>
            {ACCENT_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                className={styles.colorSwatch}
                data-active={c === accent}
                aria-pressed={c === accent}
                style={{ background: ACCENT_SWATCH_COLORS[c] }}
                title={toDisplayName(c)}
                aria-label={toDisplayName(c)}
                onClick={() => setAccent(c)}
              />
            ))}
          </div>
        </div>

        <div className={styles.field}>
          <FieldLabel
            label="Neutral Palette"
            description="Sets the base gray family for borders and surfaces."
            htmlFor={grayId}
          />
          <Select
            id={grayId}
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
            htmlFor={radiusId}
          />
          <Select
            id={radiusId}
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
            htmlFor={scalingId}
          />
          <Select
            id={scalingId}
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
            description="Light, dark, or follow the operating system setting."
            htmlFor={appearanceId}
          />
          <Select
            id={appearanceId}
            value={appearance}
            onValueChange={(value) => {
              if (typeof value === 'string') setAppearance(value as Appearance);
            }}
            size="1"
            triggerClassName={styles.selectControl}
          >
            {APPEARANCES.map((a) => (
              <Select.Item key={a} value={a}>{a === 'inherit' ? 'System' : toDisplayName(a)}</Select.Item>
            ))}
          </Select>
        </div>

        <span className={styles.srOnly} role="status" aria-live="polite">
          {copyStatus === 'copied' ? 'Theme snippet copied' : copyStatus === 'error' ? 'Copy failed' : ''}
        </span>
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
        aria-label="Theme settings"
        aria-expanded={open}
        aria-controls={panelId}
      >
        {open ? '\u2715' : '\u2699'}
      </Button>
    </div>
  );
}
