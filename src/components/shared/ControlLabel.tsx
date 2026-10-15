import * as React from 'react';
import { cx } from '../Layout/layout.utils';
import styles from './control-label.module.css';

type ControlLabelSize = '1' | '2' | '3';

const sizeClass: Record<ControlLabelSize, string> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
};

/**
 * Wraps a checkbox/switch/radio control in a native <label> with its text,
 * so clicking the text toggles the control and names it for assistive tech.
 * Renders the control alone when there is no label text.
 */
export function ControlLabel({
  label,
  size,
  children,
}: {
  label: React.ReactNode;
  size: ControlLabelSize;
  children: React.ReactElement;
}) {
  if (label == null || label === false) return children;
  return (
    <label className={cx(styles.root, sizeClass[size])}>
      {children}
      <span className={styles.text}>{label}</span>
    </label>
  );
}
