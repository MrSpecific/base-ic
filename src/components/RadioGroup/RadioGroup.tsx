import * as React from 'react';
import { RadioGroup as BaseRadioGroup, Radio as BaseRadio } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
import type { AccentColor } from '../Theme';
import { useFieldRequired } from '../Field/FieldRequiredContext';
import { ControlLabel } from '../shared/ControlLabel';
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

const RadioGroupRoot = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup(
    { orientation = 'vertical', className, style, children, required: requiredProp, ...rest },
    ref,
  ) {
    const required = useFieldRequired(requiredProp);
    return (
      <BaseRadioGroup
        ref={ref}
        className={cx(
          styles.group,
          orientation === 'horizontal' && styles.horizontal,
          className,
        )}
        style={style}
        required={required}
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
  color?: AccentColor;
  /** Custom className. */
  className?: string;
  /** Custom style. */
  style?: React.CSSProperties;
  /** Base UI render prop. */
  render?: React.ReactElement;
  /**
   * Label text rendered next to the radio. Wraps both in a native <label>,
   * so clicking the text selects the radio.
   */
  children?: React.ReactNode;
}

export const Radio = React.forwardRef<HTMLButtonElement, RadioProps>(
  function Radio({ size = '2', color, className, style, render, children, ...rest }, ref) {
    const colorVars = color
      ? ({
          '--radio-accent-9': `var(--color-${color}-9)`,
          '--radio-accent-10': `var(--color-${color}-10)`,
          '--radio-contrast': `var(--color-${color}-contrast)`,
        } as React.CSSProperties)
      : undefined;

    return (
      <ControlLabel label={children} size={size}>
        <BaseRadio.Root
          ref={ref}
          render={render}
          className={cx(styles.radio, sizeClass[size], className)}
          style={{ ...colorVars, ...style }}
          {...rest}
        >
          {/* keepMounted so the dot's scale transition plays on select/deselect */}
          <BaseRadio.Indicator className={styles.indicator} keepMounted />
        </BaseRadio.Root>
      </ControlLabel>
    );
  },
);

/* ---------------------------------------------------------------------------
 * Attach sub-components
 * --------------------------------------------------------------------------- */

export const RadioGroup = Object.assign(RadioGroupRoot, { Item: Radio });
