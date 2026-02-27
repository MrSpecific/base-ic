import * as React from 'react';
import { buildSpaceVars, cx, type SpaceProps, withVar } from '../Layout/layout.utils';
import styles from './badge.module.css';

type BadgeSize = '1' | '2' | '3';
type BadgeVariant = 'solid' | 'soft' | 'surface' | 'outline';
type BadgeRadius = 'none' | 'small' | 'medium' | 'large' | 'full';

export interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>, SpaceProps {
  /** Visual size preset. Default: '1' */
  size?: BadgeSize;
  /** Visual variant. Default: 'soft' */
  variant?: BadgeVariant;
  /** Override accent color. */
  color?: string;
  /** Increase contrast against the background. */
  highContrast?: boolean;
  /** Override border-radius. */
  radius?: BadgeRadius;
}

const radiusMap: Record<BadgeRadius, string> = {
  none: '0',
  small: 'var(--radius-2)',
  medium: 'var(--radius-3)',
  large: 'var(--radius-5)',
  full: 'var(--radius-full)',
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge(
    {
      size = '1',
      variant = 'soft',
      color,
      highContrast = false,
      radius,
      className,
      style,
      p,
      px,
      py,
      pt,
      pr,
      pb,
      pl,
      m,
      mx,
      my,
      mt,
      mr,
      mb,
      ml,
      ...rest
    },
    ref,
  ) {
    const sizeVars: Record<string, string> = {
      '--bdg-height': `var(--badge-${size}-height)`,
      '--bdg-px': `var(--badge-${size}-px)`,
      '--bdg-fs': `var(--badge-${size}-font-size)`,
    };

    const colorVars: Record<string, string> = color
      ? {
          '--bdg-accent-3': `var(--color-${color}-3)`,
          '--bdg-accent-4': `var(--color-${color}-4)`,
          '--bdg-accent-7': `var(--color-${color}-7)`,
          '--bdg-accent-8': `var(--color-${color}-8)`,
          '--bdg-accent-9': `var(--color-${color}-9)`,
          '--bdg-accent-11': `var(--color-${color}-${highContrast ? 12 : 11})`,
          '--bdg-accent-12': `var(--color-${color}-12)`,
          '--bdg-accent-contrast': `var(--color-${color}-contrast)`,
        }
      : {};

    const radiusVar: Record<string, string> = radius
      ? { '--bdg-radius': radiusMap[radius] }
      : {};

    const nextStyle = withVar(style, buildSpaceVars('bdg', {
      p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml,
    }));

    return (
      <span
        ref={ref}
        className={cx(
          styles.badge,
          styles[variant],
          highContrast && styles.highContrast,
          className,
        )}
        style={{
          ...sizeVars,
          ...colorVars,
          ...radiusVar,
          ...nextStyle,
        } as React.CSSProperties}
        {...rest}
      />
    );
  },
);
