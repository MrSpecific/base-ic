import * as React from 'react';
import { cx } from '../Layout/layout.utils';
import styles from './skeleton.module.css';

/* ---------------------------------------------------------------------------
 * Types
 * --------------------------------------------------------------------------- */

type SkeletonRadius = 'none' | 'small' | 'medium' | 'large' | 'full';

const radiusMap: Record<SkeletonRadius, string> = {
  none: '0',
  small: 'var(--radius-2)',
  medium: 'var(--radius-3)',
  large: 'var(--radius-5)',
  full: 'var(--radius-full)',
};

export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Width of the skeleton. Number = px, string = any CSS value. */
  width?: string | number;
  /** Height of the skeleton. Number = px, string = any CSS value. */
  height?: string | number;
  /** Override border-radius. Default: inherits component-radius. */
  radius?: SkeletonRadius;
  /** Enable the shimmer animation. Default: true */
  animated?: boolean;
}

/* ---------------------------------------------------------------------------
 * Skeleton
 * --------------------------------------------------------------------------- */

export const Skeleton = React.forwardRef<HTMLSpanElement, SkeletonProps>(
  function Skeleton(
    { width, height, radius, animated = true, className, style, ...rest },
    ref,
  ) {
    const cssVars: Record<string, string> = {
      ...(width != null
        ? { '--sk-width': typeof width === 'number' ? `${width}px` : width }
        : {}),
      ...(height != null
        ? { '--sk-height': typeof height === 'number' ? `${height}px` : height }
        : {}),
      ...(radius != null ? { '--sk-radius': radiusMap[radius] } : {}),
    };

    return (
      <span
        ref={ref}
        aria-hidden="true"
        className={cx(styles.skeleton, animated && styles.animated, className)}
        style={{ ...cssVars, ...style } as React.CSSProperties}
        {...rest}
      />
    );
  },
);
