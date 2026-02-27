import * as React from 'react';
import { buildSpaceVars, cx, type SpaceProps, withVar } from '../Layout/layout.utils';
import { buildTypoColorVar } from './typography.utils';
import styles from './quote.module.css';

export interface QuoteProps extends React.BlockquoteHTMLAttributes<HTMLQuoteElement>, SpaceProps {
  color?: string;
  highContrast?: boolean;
}

export const Quote = React.forwardRef<HTMLQuoteElement, QuoteProps>(
  function Quote(
    { color, highContrast, p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml, className, style, ...rest },
    ref,
  ) {
    const colorVars = buildTypoColorVar(color, highContrast);
    const spaceVars = withVar(undefined, buildSpaceVars('quote', {
      p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml,
    }));

    return (
      <blockquote
        ref={ref}
        className={cx(styles.quote, className)}
        style={{ ...colorVars, ...spaceVars, ...style }}
        {...rest}
      />
    );
  },
);
