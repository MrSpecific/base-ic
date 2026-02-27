import * as React from 'react';
import { cx, toSpaceVar, withVar } from '../Layout/layout.utils';
import styles from './card.module.css';

type CardSize = '1' | '2' | '3' | '4' | '5';
type CardVariant = 'surface' | 'classic' | 'ghost';
type SpaceValue = number | string;
type CardRadius = 'none' | 'small' | 'medium' | 'large' | 'full';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Padding size preset. Default: '3' */
  size?: CardSize;
  /** Visual variant. Default: 'surface' */
  variant?: CardVariant;
  /** Make the card interactive (adds hover/active states). */
  asButton?: boolean;
  /** Override border radius for this card. */
  radius?: CardRadius;
  /** Padding shorthand */
  p?: SpaceValue;
  /** Padding-inline shorthand */
  px?: SpaceValue;
  /** Padding-block shorthand */
  py?: SpaceValue;
  /** Padding-top */
  pt?: SpaceValue;
  /** Padding-right */
  pr?: SpaceValue;
  /** Padding-bottom */
  pb?: SpaceValue;
  /** Padding-left */
  pl?: SpaceValue;
  /** Margin shorthand */
  m?: SpaceValue;
  /** Margin-inline shorthand */
  mx?: SpaceValue;
  /** Margin-block shorthand */
  my?: SpaceValue;
  /** Margin-top */
  mt?: SpaceValue;
  /** Margin-right */
  mr?: SpaceValue;
  /** Margin-bottom */
  mb?: SpaceValue;
  /** Margin-left */
  ml?: SpaceValue;
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
    const nextStyle = withVar(style, {
      '--card-padding': p != null ? toSpaceVar(p) : `var(--space-${size})`,
      '--card-radius': radius ? radiusMap[radius] : undefined,
      '--card-padding-x': toSpaceVar(px),
      '--card-padding-y': toSpaceVar(py),
      '--card-padding-top': toSpaceVar(pt),
      '--card-padding-right': toSpaceVar(pr),
      '--card-padding-bottom': toSpaceVar(pb),
      '--card-padding-left': toSpaceVar(pl),
      '--card-margin': toSpaceVar(m),
      '--card-margin-x': toSpaceVar(mx),
      '--card-margin-y': toSpaceVar(my),
      '--card-margin-top': toSpaceVar(mt),
      '--card-margin-right': toSpaceVar(mr),
      '--card-margin-bottom': toSpaceVar(mb),
      '--card-margin-left': toSpaceVar(ml),
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
