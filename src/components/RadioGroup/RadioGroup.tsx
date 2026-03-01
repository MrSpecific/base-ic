import * as React from 'react';
import { RadioGroup as BaseRadioGroup, Radio as BaseRadio } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
import styles from './radio-group.module.css';

type RadioSize = '1' | '2' | '3';

const sizeClass: Record<RadioSize, string> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
};

/* ---------------------------------------------------------------------------
 * RadioGroup
 * --------------------------------------------------------------------------- */

export interface RadioGroupProps
  extends Omit<BaseRadioGroup.Props, 'render' | 'className' | 'style'> {
  /** Layout direction. Default: 'vertical' */
  orientation?: 'horizontal' | 'vertical';
  /** Custom className. */
  className?: string;
  /** Custom style. */
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup({ orientation = 'vertical', className, style, children, ...rest }, ref) {
    return (
      <BaseRadioGroup
        ref={ref}
        className={cx(
          styles.group,
          orientation === 'horizontal' && styles.horizontal,
          className,
        )}
        style={style}
        {...rest}
      >
        {children}
      </BaseRadioGroup>
    );
  },
);

/* ---------------------------------------------------------------------------
 * Radio
 * --------------------------------------------------------------------------- */

export interface RadioProps
  extends Omit<BaseRadio.Root.Props, 'render' | 'className' | 'style'> {
  /** The value this radio represents (required). */
  value: string;
  /** Visual size. Default: '2' */
  size?: RadioSize;
  /** Override the accent color. */
  color?: string;
  /** Custom className. */
  className?: string;
  /** Custom style. */
  style?: React.CSSProperties;
  /** Base UI render prop. */
  render?: React.ReactElement;
}

export const Radio = React.forwardRef<HTMLButtonElement, RadioProps>(
  function Radio({ size = '2', color, className, style, render, ...rest }, ref) {
    const colorVars = color
      ? ({
          '--radio-accent-9': `var(--color-${color}-9)`,
          '--radio-accent-10': `var(--color-${color}-10)`,
          '--radio-contrast': `var(--color-${color}-contrast)`,
        } as React.CSSProperties)
      : undefined;

    return (
      <BaseRadio.Root
        ref={ref}
        render={render}
        className={cx(styles.radio, sizeClass[size], className)}
        style={{ ...colorVars, ...style }}
        {...rest}
      >
        <BaseRadio.Indicator className={styles.indicator} />
      </BaseRadio.Root>
    );
  },
);
