import * as React from 'react';
import { spaceProps, cx, type SpaceProps } from '../Layout/layout.utils';
import { buildTypoColorVar } from './typography.utils';
import type { AccentColor } from '../Theme';
import styles from './quote.module.css';

export interface QuoteProps extends React.BlockquoteHTMLAttributes<HTMLQuoteElement>, SpaceProps {
  color?: AccentColor;
  highContrast?: boolean;
}

export const Quote = React.forwardRef<HTMLQuoteElement, QuoteProps>(
  function Quote(
    { color, highContrast, p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml, className, style, ...rest },
    ref,
  ) {
    const colorVars = buildTypoColorVar(color, highContrast);
    const space = spaceProps({
      p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml,
    });
    const spaceVars = space.vars;

    return (
      <blockquote
        ref={ref}
        className={cx(styles.quote, space.className, className)}
        style={{ ...colorVars, ...spaceVars, ...style }}
        {...rest}
      />
    );
  },
);
