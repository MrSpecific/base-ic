import * as React from 'react';
import { useRender } from '@base-ui/react/use-render';
import { cx, type SpaceValue, toSpaceVar, withVar } from '../Layout/layout.utils';
import styles from './inset.module.css';

type InsetSide = 'all' | 'x' | 'y' | 'top' | 'bottom' | 'left' | 'right';
type InsetClip = 'border-box' | 'padding-box';
/** A space value, or `'current'` to re-apply the enclosing container's padding on that side. */
type InsetPaddingValue = SpaceValue | 'current';

export interface InsetProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Which edges of the enclosing Card the content bleeds to. Default: 'all' */
  side?: InsetSide;
  /**
   * `border-box` bleeds over the Card's border to its outer edge;
   * `padding-box` stops just inside the border. Default: 'border-box'
   */
  clip?: InsetClip;
  /** Padding inside the inset. `'current'` matches the Card's own padding on each side. */
  p?: InsetPaddingValue;
  px?: InsetPaddingValue;
  py?: InsetPaddingValue;
  pt?: InsetPaddingValue;
  pr?: InsetPaddingValue;
  pb?: InsetPaddingValue;
  pl?: InsetPaddingValue;
  /** Render as a different element while keeping Inset's styling. */
  render?: useRender.RenderProp;
}

type Side = 'top' | 'right' | 'bottom' | 'left';

const sideClass: Record<InsetSide, string> = {
  all: styles.sideAll,
  x: styles.sideX,
  y: styles.sideY,
  top: styles.sideTop,
  bottom: styles.sideBottom,
  left: styles.sideLeft,
  right: styles.sideRight,
};

/**
 * Per-side padding, most specific first (side → axis → `p`), resolved in JS so
 * `'current'` can map to that side's container padding. Unset sides fall back
 * to 0 in CSS.
 */
function buildPaddingVars(
  padding: Pick<InsetProps, 'p' | 'px' | 'py' | 'pt' | 'pr' | 'pb' | 'pl'>,
): Record<string, string | undefined> {
  const { p, px, py, pt, pr, pb, pl } = padding;
  const resolve = (side: Side, value: InsetPaddingValue | undefined) =>
    value === 'current' ? `var(--ins-bleed-${side})` : toSpaceVar(value);
  return {
    '--ins-padding-top': resolve('top', pt ?? py ?? p),
    '--ins-padding-right': resolve('right', pr ?? px ?? p),
    '--ins-padding-bottom': resolve('bottom', pb ?? py ?? p),
    '--ins-padding-left': resolve('left', pl ?? px ?? p),
  };
}

/**
 * Cancels the padding of the enclosing `Card` on the chosen sides so content
 * (images, tables, media) bleeds to the card edge, with corners rounded to
 * match the card where two bled edges meet.
 */
export const Inset = React.forwardRef<HTMLDivElement, InsetProps>(function Inset(
  {
    side = 'all',
    clip = 'border-box',
    p, px, py, pt, pr, pb, pl,
    render,
    className,
    style,
    ...rest
  },
  ref,
) {
  return useRender({
    render: render ?? <div />,
    defaultTagName: 'div',
    ref,
    props: {
      ...rest,
      className: cx(
        styles.inset,
        sideClass[side],
        clip === 'padding-box' ? styles.clipPaddingBox : styles.clipBorderBox,
        className,
      ),
      style: withVar(style, buildPaddingVars({ p, px, py, pt, pr, pb, pl })),
    },
  });
});
