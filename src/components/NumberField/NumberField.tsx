import * as React from 'react';
import { NumberField as BaseNumberField } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
import styles from './number-field.module.css';

/* ---------------------------------------------------------------------------
 * Types
 * --------------------------------------------------------------------------- */

type NumberFieldSize = '1' | '2' | '3' | '4';
type NumberFieldRadius = 'none' | 'small' | 'medium' | 'large' | 'full';

const radiusMap: Record<NumberFieldRadius, string> = {
  none: '0',
  small: 'var(--radius-2)',
  medium: 'var(--radius-3)',
  large: 'var(--radius-5)',
  full: 'var(--radius-full)',
};

const sizeClass: Record<NumberFieldSize, string> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
  '4': styles.size4,
};

export interface NumberFieldProps
  extends Omit<BaseNumberField.Root.Props, 'className' | 'style'> {
  /** Visual size. Default: '2' */
  size?: NumberFieldSize;
  /** Override border-radius. */
  radius?: NumberFieldRadius;
  /** Placeholder shown in the input when empty. */
  placeholder?: string;
  /** Additional className on the group wrapper. */
  className?: string;
  style?: React.CSSProperties;
}

/* ---------------------------------------------------------------------------
 * Icons
 * --------------------------------------------------------------------------- */

function MinusIcon() {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M2.5 6h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 2.5v7M2.5 6h7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ---------------------------------------------------------------------------
 * NumberField
 * --------------------------------------------------------------------------- */

export const NumberField = React.forwardRef<HTMLDivElement, NumberFieldProps>(
  function NumberField(
    { size = '2', radius, placeholder, className, style, ...rest },
    ref,
  ) {
    const radiusVar = radius
      ? ({ '--nf-radius': radiusMap[radius] } as React.CSSProperties)
      : undefined;

    return (
      <BaseNumberField.Root ref={ref} className={styles.root} style={style} {...rest}>
        <BaseNumberField.Group
          className={cx(styles.group, sizeClass[size], className)}
          style={radiusVar}
        >
          <BaseNumberField.Decrement className={styles.button} aria-label="Decrease">
            <MinusIcon />
          </BaseNumberField.Decrement>
          <BaseNumberField.Input
            className={styles.input}
            placeholder={placeholder}
          />
          <BaseNumberField.Increment className={styles.button} aria-label="Increase">
            <PlusIcon />
          </BaseNumberField.Increment>
        </BaseNumberField.Group>
      </BaseNumberField.Root>
    );
  },
);

export { BaseNumberField as NumberFieldPrimitive };
