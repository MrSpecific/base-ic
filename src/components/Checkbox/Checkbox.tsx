import * as React from 'react';
import { Checkbox as BaseCheckbox } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
import styles from './checkbox.module.css';

type CheckboxSize = '1' | '2' | '3';

export interface CheckboxProps
  extends Omit<BaseCheckbox.Root.Props, 'render' | 'className' | 'style'> {
  /** Visual size. Default: '2' */
  size?: CheckboxSize;
  /** Override the accent color for this checkbox. */
  color?: string;
  /** Custom className applied to the root. */
  className?: string;
  /** Custom style applied to the root. */
  style?: React.CSSProperties;
  /** Custom render element (Base UI render prop). */
  render?: React.ReactElement;
}

const sizeClass: Record<CheckboxSize, string> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
};

/** Checkmark for checked state */
function CheckIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2 6L5 9L10 3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Dash for indeterminate state */
function IndeterminateIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2.5 6H9.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  function Checkbox(
    { size = '2', color, className, style, render, ...rest },
    ref,
  ) {
    const colorVars = color
      ? ({
          '--chk-accent-9': `var(--color-${color}-9)`,
          '--chk-accent-10': `var(--color-${color}-10)`,
          '--chk-contrast': `var(--color-${color}-contrast)`,
        } as React.CSSProperties)
      : undefined;

    return (
      <BaseCheckbox.Root
        ref={ref}
        render={render}
        className={cx(styles.root, sizeClass[size], className)}
        style={{ ...colorVars, ...style }}
        {...rest}
      >
        <BaseCheckbox.Indicator className={styles.indicator}>
          {rest.indeterminate ? <IndeterminateIcon /> : <CheckIcon />}
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
    );
  },
);
