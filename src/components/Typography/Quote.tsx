import * as React from 'react';
import { cx } from '../Layout/layout.utils';
import { buildTypoColorVar } from './typography.utils';
import styles from './quote.module.css';

export interface QuoteProps extends React.BlockquoteHTMLAttributes<HTMLQuoteElement> {
  color?: string;
  highContrast?: boolean;
}

export const Quote = React.forwardRef<HTMLQuoteElement, QuoteProps>(
  function Quote({ color, highContrast, className, style, ...rest }, ref) {
    const colorVars = buildTypoColorVar(color, highContrast);

    return (
      <blockquote
        ref={ref}
        className={cx(styles.quote, className)}
        style={{ ...colorVars, ...style }}
        {...rest}
      />
    );
  },
);
