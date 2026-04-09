import * as React from 'react';
import { Field as BaseField } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
import styles from './field.module.css';

/* ---------------------------------------------------------------------------
 * Types
 * --------------------------------------------------------------------------- */

export interface FieldProps extends Omit<BaseField.Root.Props, 'className' | 'style'> {
  /** Convenience prop: renders a <Field.Label> above the control. */
  label?: React.ReactNode;
  /** Helper text rendered below the control. */
  description?: React.ReactNode;
  /** Error message. Also sets the field as invalid when provided. */
  error?: React.ReactNode;
  /** Mark the field required (adds visual asterisk when using the label prop). */
  required?: boolean;
  /** Form controls to render inside the field. */
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface FieldLabelProps extends Omit<BaseField.Label.Props, 'className'> {
  required?: boolean;
  className?: string;
}

export interface FieldDescriptionProps extends Omit<BaseField.Description.Props, 'className'> {
  className?: string;
}

export interface FieldErrorProps extends Omit<BaseField.Error.Props, 'className'> {
  className?: string;
}

/* ---------------------------------------------------------------------------
 * Field root — convenience wrapper
 * --------------------------------------------------------------------------- */

export function Field({
  label,
  description,
  error,
  required,
  children,
  className,
  style,
  invalid,
  ...rest
}: FieldProps) {
  // Treat a non-empty `error` prop as an explicit invalid signal.
  const isInvalid = invalid ?? !!error;

  return (
    <BaseField.Root
      invalid={isInvalid}
      className={cx(styles.root, className)}
      style={style}
      {...rest}
    >
      {label && <FieldLabel required={required}>{label}</FieldLabel>}
      {children}
      {description && <FieldDescription>{description}</FieldDescription>}
      {error && <FieldError>{error}</FieldError>}
    </BaseField.Root>
  );
}

/* ---------------------------------------------------------------------------
 * Field.Label
 * --------------------------------------------------------------------------- */

function FieldLabel({ required, className, children, ...rest }: FieldLabelProps) {
  return (
    <BaseField.Label className={cx(styles.label, className)} {...rest}>
      {children}
      {required && (
        <span className={styles.required} aria-hidden="true">
          {' *'}
        </span>
      )}
    </BaseField.Label>
  );
}

/* ---------------------------------------------------------------------------
 * Field.Description
 * --------------------------------------------------------------------------- */

function FieldDescription({ className, children, ...rest }: FieldDescriptionProps) {
  return (
    <BaseField.Description className={cx(styles.description, className)} {...rest}>
      {children}
    </BaseField.Description>
  );
}

/* ---------------------------------------------------------------------------
 * Field.Error
 * --------------------------------------------------------------------------- */

function FieldError({ className, children, ...rest }: FieldErrorProps) {
  return (
    <BaseField.Error className={cx(styles.error, className)} {...rest}>
      {children}
    </BaseField.Error>
  );
}

/* ---------------------------------------------------------------------------
 * Attach sub-components
 * --------------------------------------------------------------------------- */

Field.Label = FieldLabel;
Field.Description = FieldDescription;
Field.Error = FieldError;

export { BaseField as FieldPrimitive };
