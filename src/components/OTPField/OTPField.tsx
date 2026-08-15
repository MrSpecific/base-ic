import * as React from 'react';
import { OTPField as BaseOTPField } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
import styles from './otp-field.module.css';

/* ---------------------------------------------------------------------------
 * Types
 * --------------------------------------------------------------------------- */

type OTPFieldSize = '1' | '2' | '3' | '4';

const sizeClass: Record<OTPFieldSize, string> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
  '4': styles.size4,
};

export interface OTPFieldProps
  extends Omit<BaseOTPField.Root.Props, 'className' | 'style' | 'children'> {
  /** Visual size. Default: '2' */
  size?: OTPFieldSize;
  /**
   * Insert a separator after every Nth slot (e.g. `groupSize={3}` on a
   * `length={6}` field renders a dash after the 3rd slot for a 3+3 split).
   */
  groupSize?: number;
  /** Additional className on the root. */
  className?: string;
  style?: React.CSSProperties;
}

export interface OTPFieldRootProps extends Omit<BaseOTPField.Root.Props, 'className'> {
  className?: string;
}

export interface OTPFieldInputProps extends Omit<BaseOTPField.Input.Props, 'className'> {
  className?: string;
}

export interface OTPFieldSeparatorProps
  extends Omit<BaseOTPField.Separator.Props, 'className'> {
  className?: string;
}

/* ---------------------------------------------------------------------------
 * OTPField root — convenience wrapper
 * --------------------------------------------------------------------------- */

export function OTPField({
  size = '2',
  groupSize,
  length,
  className,
  style,
  ...rest
}: OTPFieldProps) {
  const slots: React.ReactNode[] = [];
  for (let i = 0; i < length; i += 1) {
    slots.push(<OTPFieldInput key={`input-${i}`} />);
    const isLastSlot = i === length - 1;
    if (groupSize && !isLastSlot && (i + 1) % groupSize === 0) {
      slots.push(<OTPFieldSeparator key={`separator-${i}`} />);
    }
  }

  return (
    <BaseOTPField.Root
      length={length}
      className={cx(styles.root, sizeClass[size], className)}
      style={style}
      {...rest}
    >
      {slots}
    </BaseOTPField.Root>
  );
}

/* ---------------------------------------------------------------------------
 * OTPField.Root — thin styled wrapper for manual composition
 * --------------------------------------------------------------------------- */

function OTPFieldRoot({ className, ...rest }: OTPFieldRootProps) {
  return <BaseOTPField.Root className={cx(styles.root, className)} {...rest} />;
}

/* ---------------------------------------------------------------------------
 * OTPField.Input
 * --------------------------------------------------------------------------- */

function OTPFieldInput({ className, ...rest }: OTPFieldInputProps) {
  return <BaseOTPField.Input className={cx(styles.input, className)} {...rest} />;
}

/* ---------------------------------------------------------------------------
 * OTPField.Separator
 * --------------------------------------------------------------------------- */

function OTPFieldSeparator({ className, ...rest }: OTPFieldSeparatorProps) {
  return <BaseOTPField.Separator className={cx(styles.separator, className)} {...rest} />;
}

/* ---------------------------------------------------------------------------
 * Attach sub-components
 * --------------------------------------------------------------------------- */

OTPField.Root = OTPFieldRoot;
OTPField.Input = OTPFieldInput;
OTPField.Separator = OTPFieldSeparator;

export { BaseOTPField as OTPFieldPrimitive };
