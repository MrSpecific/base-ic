import * as React from 'react';
import { Progress as BaseProgress } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
import styles from './progress.module.css';

type ProgressSize = '1' | '2' | '3';
type ProgressRadius = 'none' | 'small' | 'medium' | 'large' | 'full';

const radiusMap: Record<ProgressRadius, string> = {
  none: '0',
  small: 'var(--radius-2)',
  medium: 'var(--radius-3)',
  large: 'var(--radius-5)',
  full: 'var(--radius-full)',
};

const sizeClass: Record<ProgressSize, string> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
};

export interface ProgressProps extends Omit<BaseProgress.Root.Props, 'className' | 'style' | 'render'> {
  /** Visual size (track height). Default: '2' */
  size?: ProgressSize;
  /** Override the accent color for the fill. */
  color?: string;
  /** Override the border-radius of the track. */
  radius?: ProgressRadius;
  className?: string;
  style?: React.CSSProperties;
}

export function Progress({
  size = '2',
  color,
  radius,
  className,
  style,
  ...rest
}: ProgressProps) {
  const colorVars = color
    ? ({
        '--prog-accent-9': `var(--color-${color}-9)`,
        '--prog-accent-3': `var(--color-${color}-3)`,
      } as React.CSSProperties)
    : undefined;

  const radiusVar = radius
    ? ({ '--prog-radius': radiusMap[radius] } as React.CSSProperties)
    : undefined;

  return (
    <BaseProgress.Root
      className={cx(styles.root, sizeClass[size], className)}
      style={{ ...colorVars, ...radiusVar, ...style }}
      {...rest}
    >
      <BaseProgress.Track className={styles.track}>
        <BaseProgress.Indicator className={styles.indicator} />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}

export { BaseProgress as ProgressPrimitive };
