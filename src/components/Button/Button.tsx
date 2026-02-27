import * as React from 'react';
import { Button as BaseButton } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
import styles from './button.module.css';

type ButtonSize = '1' | '2' | '3' | '4';
type ButtonVariant = 'solid' | 'soft' | 'surface' | 'outline' | 'ghost';
type ButtonRadius = 'none' | 'small' | 'medium' | 'large' | 'full';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  /** Visual size preset. Default: '2' */
  size?: ButtonSize;
  /** Visual variant. Default: 'solid' */
  variant?: ButtonVariant;
  /** Override the accent color for this button. */
  color?: string;
  /** Increase contrast against the background. */
  highContrast?: boolean;
  /** Override the border-radius for this button. */
  radius?: ButtonRadius;
  /** Show a loading spinner and disable interaction. */
  loading?: boolean;
  /** The base element to render. Accepts a React element via Base UI render prop. */
  render?: React.ReactElement;
}

const radiusMap: Record<ButtonRadius, string> = {
  none: '0',
  small: 'var(--radius-2)',
  medium: 'var(--radius-3)',
  large: 'var(--radius-5)',
  full: 'var(--radius-full)',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      size = '2',
      variant = 'solid',
      color,
      highContrast = false,
      radius,
      loading = false,
      disabled,
      className,
      style,
      children,
      render,
      ...rest
    },
    ref,
  ) {
    const sizeVars: Record<string, string> = {
      '--btn-height': `var(--button-${size}-height)`,
      '--btn-px': `var(--button-${size}-px)`,
      '--btn-fs': `var(--button-${size}-font-size)`,
      '--btn-gap': `var(--button-${size}-gap)`,
      '--btn-icon-size': `var(--button-${size}-icon-size)`,
    };

    const colorVars: Record<string, string> = color
      ? {
          '--btn-accent-3': `var(--color-${color}-3)`,
          '--btn-accent-4': `var(--color-${color}-4)`,
          '--btn-accent-5': `var(--color-${color}-5)`,
          '--btn-accent-6': `var(--color-${color}-6)`,
          '--btn-accent-7': `var(--color-${color}-7)`,
          '--btn-accent-8': `var(--color-${color}-8)`,
          '--btn-accent-9': `var(--color-${color}-9)`,
          '--btn-accent-10': `var(--color-${color}-10)`,
          '--btn-accent-11': `var(--color-${color}-${highContrast ? 12 : 11})`,
          '--btn-accent-12': `var(--color-${color}-12)`,
          '--btn-accent-contrast': `var(--color-${color}-contrast)`,
        }
      : {};

    const radiusVar: Record<string, string> = radius
      ? { '--btn-radius': radiusMap[radius] }
      : {};

    return (
      <BaseButton
        ref={ref}
        disabled={disabled || loading}
        render={render}
        className={cx(
          styles.button,
          styles[variant],
          highContrast && styles.highContrast,
          loading && styles.loading,
          className,
        )}
        style={{
          ...sizeVars,
          ...colorVars,
          ...radiusVar,
          ...style,
        } as React.CSSProperties}
        {...rest}
      >
        {loading && <span className={styles.spinner} aria-hidden="true" />}
        {children}
      </BaseButton>
    );
  },
);
