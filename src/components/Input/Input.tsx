import * as React from 'react';
import { cx } from '../Layout/layout.utils';
import styles from './input.module.css';

type InputSize = '1' | '2' | '3' | '4';
type InputVariant = 'surface' | 'outline' | 'ghost';
type InputRadius = 'none' | 'small' | 'medium' | 'large' | 'full';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visual size. Default: '2' */
  size?: InputSize;
  /** Visual variant. Default: 'surface' */
  variant?: InputVariant;
  /** Override the border-radius. */
  radius?: InputRadius;
  /** Content placed before the input (icon, label-like). */
  prefix?: React.ReactNode;
  /** Content placed after the input (icon, button, unit). */
  suffix?: React.ReactNode;
  /** Marks the input as having a validation error. */
  invalid?: boolean;
  /** Ref for the wrapper div (use standard ref for the input element). */
  wrapperRef?: React.Ref<HTMLDivElement>;
  /** CSS class for the outer wrapper div. */
  wrapperClassName?: string;
}

const sizeClass: Record<InputSize, string> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
  '4': styles.size4,
};

const variantClass: Record<InputVariant, string> = {
  surface: '',
  outline: styles.outline,
  ghost: styles.ghost,
};

const radiusMap: Record<InputRadius, string> = {
  none: '0',
  small: 'var(--radius-2)',
  medium: 'var(--radius-3)',
  large: 'var(--radius-5)',
  full: 'var(--radius-full)',
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      size = '2',
      variant = 'surface',
      radius,
      prefix,
      suffix,
      invalid,
      wrapperRef,
      wrapperClassName,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const radiusVar = radius
      ? ({ '--inp-radius': radiusMap[radius] } as React.CSSProperties)
      : undefined;

    // Pad input away from prefix/suffix
    const adornmentVars: React.CSSProperties = {};
    if (prefix) adornmentVars['--inp-pl' as string] = '0px';
    if (suffix) adornmentVars['--inp-pr' as string] = '0px';

    return (
      <div
        ref={wrapperRef}
        className={cx(
          styles.wrapper,
          sizeClass[size],
          variantClass[variant],
          prefix ? styles.hasPrefix : undefined,
          suffix ? styles.hasSuffix : undefined,
          invalid ? styles.invalid : undefined,
          wrapperClassName,
        )}
        style={{ ...radiusVar, ...adornmentVars }}
      >
        {prefix && <div className={styles.prefix}>{prefix}</div>}
        <input
          ref={ref}
          className={cx(styles.input, className)}
          aria-invalid={invalid ? 'true' : undefined}
          style={style}
          {...rest}
        />
        {suffix && <div className={styles.suffix}>{suffix}</div>}
      </div>
    );
  },
);
