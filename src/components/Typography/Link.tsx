import * as React from 'react';
import { cx } from '../Layout/layout.utils';
import { buildTypoColorVar, buildTypoSizeVars } from './typography.utils';
import styles from './link.module.css';

type LinkSize = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type LinkWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
type LinkUnderline = 'auto' | 'always' | 'hover' | 'none';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: LinkSize;
  weight?: LinkWeight;
  color?: string;
  highContrast?: boolean;
  underline?: LinkUnderline;
  truncate?: boolean;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(
    {
      size,
      weight,
      color,
      highContrast,
      underline = 'auto',
      truncate,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const sizeVars = size ? buildTypoSizeVars('text', size) : undefined;
    const colorVars = buildTypoColorVar(color, highContrast);
    const weightVar = weight
      ? { '--typo-weight': `var(--font-weight-${weight})` } as React.CSSProperties
      : undefined;

    return (
      <a
        ref={ref}
        className={cx(
          styles.link,
          styles[`underline${underline[0].toUpperCase()}${underline.slice(1)}` as keyof typeof styles],
          truncate && styles.truncate,
          className,
        )}
        style={{
          ...sizeVars,
          ...colorVars,
          ...weightVar,
          ...style,
        }}
        {...rest}
      />
    );
  },
);
