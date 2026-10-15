import * as React from 'react';
import { Field as BaseField } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
import { Input } from '../Input/Input';
import type { InputProps } from '../Input/Input';
import { FieldRequiredContext } from './FieldRequiredContext';
import styles from './field.module.css';

/* ---------------------------------------------------------------------------
 * Types
 * --------------------------------------------------------------------------- */

export interface FieldProps extends Omit<BaseField.Root.Props, 'className' | 'style'> {
  /** Convenience prop: renders a <Field.Label> above the control. */
  label?: React.ReactNode;
  /** Helper text rendered below the control. */
  description?: React.ReactNode;
  /**
   * Error message. Also sets the field as invalid when provided.
   * When omitted, messages from `validate` or native constraint validation
   * (e.g. `required`, `type="email"`) are shown instead.
   */
  error?: React.ReactNode;
  /**
   * Mark the field required. Adds a visual asterisk to the `label` and makes
   * the base-ic control inside (Input, Textarea, Field.Control, NumberField,
   * Checkbox, Switch, RadioGroup) natively `required`, unless that control sets
   * `required` itself. Other controls need their own `required` prop.
   */
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

/** Props for `<Field.Control>` — identical to `<Input>`. */
export type FieldControlProps = InputProps;

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
  const isInvalid = invalid ?? (error ? true : undefined);

  return (
    <FieldRequiredContext.Provider value={required}>
      <BaseField.Root
        invalid={isInvalid}
        className={cx(styles.root, className)}
        style={style}
        {...rest}
      >
        {label && <FieldLabel required={required}>{label}</FieldLabel>}
        {children}
        {description && <FieldDescription>{description}</FieldDescription>}
        {error ? (
          // An explicit `error` is always shown (`match`), independent of
          // computed validity.
          <FieldError match>{error}</FieldError>
        ) : (
          // Renders nothing while valid; shows the `validate()` / native
          // constraint message once the field is invalid.
          <FieldError />
        )}
      </BaseField.Root>
    </FieldRequiredContext.Provider>
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

function FieldError({ className, ...rest }: FieldErrorProps) {
  // Don't pass `children` unless provided: an explicit `children: undefined`
  // would override the message Base UI fills in from validation.
  return <BaseField.Error className={cx(styles.error, className)} {...rest} />;
}

/* ---------------------------------------------------------------------------
 * Attach sub-components
 * --------------------------------------------------------------------------- */

/**
 * Field.Control — the styled, Field-aware text control. Same component and
 * props as `<Input>`; provided so Base UI-style `<Field.Control />` markup
 * gets base-ic styling.
 */
Field.Control = Input;
Field.Label = FieldLabel;
Field.Description = FieldDescription;
Field.Error = FieldError;

export { BaseField as FieldPrimitive };
