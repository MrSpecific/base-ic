import * as React from 'react';
import { Field as BaseField } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
import { useFieldRequired } from '../Field/FieldRequiredContext';
import styles from './textarea.module.css';

type TextareaSize = '1' | '2' | '3' | '4';
type TextareaVariant = 'surface' | 'outline' | 'ghost';
type TextareaRadius = 'none' | 'small' | 'medium' | 'large' | 'full';

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /** Visual size. Default: '2' */
  size?: TextareaSize;
  /** Visual variant. Default: 'surface' */
  variant?: TextareaVariant;
  /** Override the border-radius. */
  radius?: TextareaRadius;
  /** Disable the resize handle. */
  noResize?: boolean;
  /**
   * Marks the textarea as having a validation error (sets `aria-invalid`).
   * Inside a `<Field>`, the field's validity is reflected automatically via
   * `data-invalid`, so this is mainly for standalone use.
   */
  invalid?: boolean;
  /** Callback fired when the value changes (Base UI). */
  onValueChange?: BaseField.Control.Props['onValueChange'];
  /** Ref for the wrapper div (use standard ref for the textarea element). */
  wrapperRef?: React.Ref<HTMLDivElement>;
  /** CSS class for the outer wrapper div. */
  wrapperClassName?: string;
}

const sizeClass: Record<TextareaSize, string> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
  '4': styles.size4,
};

const variantClass: Record<TextareaVariant, string> = {
  surface: '',
  outline: styles.outline,
  ghost: styles.ghost,
};

const radiusMap: Record<TextareaRadius, string> = {
  none: '0',
  small: 'var(--radius-2)',
  medium: 'var(--radius-3)',
  large: 'var(--radius-5)',
  // For multiline fields, keep "full" rounded but constrained.
  full: 'var(--surface-radius-full)',
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      size = '2',
      variant = 'surface',
      radius,
      noResize,
      invalid,
      wrapperRef,
      wrapperClassName,
      className,
      style,
      disabled,
      required: requiredProp,
      ...rest
    },
    ref,
  ) {
    const required = useFieldRequired(requiredProp);
    const radiusVar = radius
      ? ({ '--inp-radius': radiusMap[radius] } as React.CSSProperties)
      : undefined;

    return (
      <div
        ref={wrapperRef}
        className={cx(
          styles.wrapper,
          sizeClass[size],
          variantClass[variant],
          noResize ? styles.noResize : undefined,
          invalid ? styles.invalid : undefined,
          disabled ? styles.disabled : undefined,
          wrapperClassName,
        )}
        style={radiusVar}
      >
        {/* Field.Control rendered as a <textarea> so it is Field-aware: label
            and description/error ids, validation, and data-invalid etc. The
            props are textarea attributes; Field.Control is typed for <input>. */}
        <BaseField.Control
          ref={ref as React.Ref<HTMLElement>}
          render={<textarea />}
          className={cx(styles.textarea, className)}
          aria-invalid={invalid ? 'true' : undefined}
          disabled={disabled}
          required={required}
          style={style}
          {...(rest as unknown as BaseField.Control.Props)}
        />
      </div>
    );
  },
);
