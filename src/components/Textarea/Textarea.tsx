import * as React from 'react';
import { cx } from '../Layout/layout.utils';
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
  /** Marks the textarea as having a validation error. */
  invalid?: boolean;
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
  full: 'var(--radius-full)',
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
      ...rest
    },
    ref,
  ) {
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
        <textarea
          ref={ref}
          className={cx(styles.textarea, className)}
          aria-invalid={invalid ? 'true' : undefined}
          disabled={disabled}
          style={style}
          {...rest}
        />
      </div>
    );
  },
);
