import * as React from 'react';
import styles from './box.module.css';
import { buildSpaceVars, cx, type SpaceProps, withVar } from '../layout.utils';

export interface BoxProps extends React.HTMLAttributes<HTMLElement>, SpaceProps {
  as?: React.ElementType;
}

export const Box = React.forwardRef<HTMLElement, BoxProps>(function Box(
  {
    as: Comp = 'div',
    className,
    style,
    p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml,
    ...props
  },
  ref
) {
  const nextStyle = withVar(style, buildSpaceVars('box', {
    p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml,
  }));
  return <Comp ref={ref} className={cx(styles.box, className)} style={nextStyle} {...props} />;
}) as React.ForwardRefExoticComponent<BoxProps & React.RefAttributes<HTMLElement>>;
