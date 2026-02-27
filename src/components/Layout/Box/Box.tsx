import * as React from 'react';
import styles from './box.module.css';
import { cx } from '../layout.utils';

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}

export const Box = React.forwardRef<HTMLElement, BoxProps>(function Box(
  { as: Comp = 'div', className, ...props },
  ref
) {
  return <Comp ref={ref as never} className={cx(styles.box, className)} {...props} />;
});
