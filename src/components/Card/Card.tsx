import * as React from 'react';
import { buildSpaceVars, cx, type SpaceProps, withVar } from '../Layout/layout.utils';
import styles from './card.module.css';

type CardSize = '1' | '2' | '3' | '4' | '5';
type CardVariant = 'surface' | 'classic' | 'gradient' | 'ghost';
type CardRadius = 'none' | 'small' | 'medium' | 'large' | 'full';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, SpaceProps {
  /** Padding size preset. Default: '3' */
  size?: CardSize;
  /** Visual variant. Default: 'surface' */
  variant?: CardVariant;
  /** Make the card interactive (adds hover/active states). */
  asButton?: boolean;
  /** Override border radius for this card. */
  radius?: CardRadius;
}

const radiusMap: Record<CardRadius, string> = {
  none: 'var(--surface-radius-none)',
  small: 'var(--surface-radius-small)',
  medium: 'var(--surface-radius-medium)',
  large: 'var(--surface-radius-large)',
  full: 'var(--surface-radius-full)',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  function Card(
    {
      size = '3',
      variant = 'surface',
      asButton = false,
      radius,
      className,
      style,
      p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml,
      ...rest
    },
    ref,
  ) {
    // Use size as default padding; explicit `p` overrides it
    const spaceVars = buildSpaceVars('card', {
      p: p ?? size,
      px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml,
    });

    const nextStyle = withVar(style, {
      ...spaceVars,
      '--card-radius': radius ? radiusMap[radius] : undefined,
    });

    return (
      <div
        ref={ref}
        className={cx(
          styles.card,
          styles[variant],
          asButton && styles.interactive,
          className,
        )}
        style={nextStyle}
        role={asButton ? 'button' : undefined}
        tabIndex={asButton ? 0 : undefined}
        {...rest}
      />
    );
  },
);
