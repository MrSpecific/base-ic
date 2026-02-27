import * as React from 'react';
import { cx } from '../Layout/layout.utils';
import styles from './card.module.css';

type CardSize = '1' | '2' | '3' | '4' | '5';
type CardVariant = 'surface' | 'classic' | 'ghost';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Padding size preset. Default: '3' */
  size?: CardSize;
  /** Visual variant. Default: 'surface' */
  variant?: CardVariant;
  /** Make the card interactive (adds hover/active states). */
  asButton?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  function Card(
    {
      size = '3',
      variant = 'surface',
      asButton = false,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cx(
          styles.card,
          styles[variant],
          asButton && styles.interactive,
          className,
        )}
        style={{
          '--card-padding': `var(--space-${size})`,
          ...style,
        } as React.CSSProperties}
        role={asButton ? 'button' : undefined}
        tabIndex={asButton ? 0 : undefined}
        {...rest}
      />
    );
  },
);
