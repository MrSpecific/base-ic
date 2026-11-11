import * as React from 'react';
import styles from './box.module.css';
import { createResponsive, cx, queryContainerClass, type SizeProps, type SpaceProps, withVar } from '../layout.utils';

export interface BoxProps extends React.HTMLAttributes<HTMLElement>, SpaceProps, SizeProps {
  as?: React.ElementType;
  /** Make this element a query container, so descendants' `@`-breakpoints (e.g. `'@md'`) respond to its width. */
  container?: boolean;
}

export const Box = React.forwardRef<HTMLElement, BoxProps>(function Box(
  {
    as: Comp = 'div',
    className,
    style,
    container,
    p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml,
    width, minWidth, maxWidth, height, minHeight, maxHeight,
    ...props
  },
  ref
) {
  const r = createResponsive(styles);
  r.space({ p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml });
  r.size({ width, minWidth, maxWidth, height, minHeight, maxHeight });

  return (
    <Comp
      ref={ref}
      className={cx(styles.box, container && queryContainerClass, ...r.classes, className)}
      style={withVar(style, r.vars)}
      {...props}
    />
  );
}) as React.ForwardRefExoticComponent<BoxProps & React.RefAttributes<HTMLElement>>;
