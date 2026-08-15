import * as React from 'react';
import { Fieldset as BaseFieldset } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
import styles from './fieldset.module.css';

/* ---------------------------------------------------------------------------
 * Types
 * --------------------------------------------------------------------------- */

export interface FieldsetProps extends Omit<BaseFieldset.Root.Props, 'className' | 'style'> {
  /** Convenience prop: renders a <Fieldset.Legend> above the children. */
  legend?: React.ReactNode;
  /**
   * Visual style. 'plain' (default) resets the native fieldset border/padding
   * so it composes invisibly as a grouping element. 'bordered' keeps a
   * visible panel around the group.
   */
  variant?: 'plain' | 'bordered';
  /** Form controls (typically Field components) to group together. */
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface FieldsetLegendProps extends Omit<BaseFieldset.Legend.Props, 'className'> {
  className?: string;
}

/* ---------------------------------------------------------------------------
 * Fieldset root — convenience wrapper
 * --------------------------------------------------------------------------- */

export function Fieldset({
  legend,
  variant = 'plain',
  children,
  className,
  style,
  ...rest
}: FieldsetProps) {
  return (
    <BaseFieldset.Root
      className={cx(styles.root, variant === 'bordered' && styles.bordered, className)}
      style={style}
      {...rest}
    >
      {legend && <FieldsetLegend>{legend}</FieldsetLegend>}
      {children}
    </BaseFieldset.Root>
  );
}

/* ---------------------------------------------------------------------------
 * Fieldset.Legend
 * --------------------------------------------------------------------------- */

function FieldsetLegend({ className, children, ...rest }: FieldsetLegendProps) {
  return (
    <BaseFieldset.Legend className={cx(styles.legend, className)} {...rest}>
      {children}
    </BaseFieldset.Legend>
  );
}

/* ---------------------------------------------------------------------------
 * Attach sub-components
 * --------------------------------------------------------------------------- */

Fieldset.Legend = FieldsetLegend;

export { BaseFieldset as FieldsetPrimitive };
