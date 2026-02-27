import * as React from 'react';
import { Separator as BaseSeparator } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
import styles from './separator.module.css';

type SeparatorSize = '1' | '2' | '3' | '4';

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Orientation. Default: 'horizontal' */
  orientation?: 'horizontal' | 'vertical';
  /** Override accent color for the separator line. */
  color?: string;
  /** Line thickness. Default: '1' */
  size?: SeparatorSize;
}

const sizeMap: Record<SeparatorSize, string> = {
  '1': '1px',
  '2': '2px',
  '3': '3px',
  '4': '4px',
};

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  function Separator(
    {
      orientation = 'horizontal',
      color,
      size = '1',
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const colorVar = color
      ? { '--sep-color': `var(--color-${color}-6)` } as React.CSSProperties
      : undefined;

    return (
      <BaseSeparator
        ref={ref}
        className={cx(
          styles.separator,
          styles[orientation],
          className,
        )}
        style={{
          '--sep-size': sizeMap[size],
          ...colorVar,
          ...style,
        } as React.CSSProperties}
        {...rest}
      />
    );
  },
);
