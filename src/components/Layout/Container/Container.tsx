import * as React from 'react';
import styles from './container.module.css';
import { cx, toCssVarValue, toSpaceVar, withVar } from '../layout.utils';

type ContainerSize = '1' | '2' | '3' | '4';

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  size?: ContainerSize;
  maxWidth?: React.CSSProperties['maxWidth'];
  gutter?: number | string;
}

export const Container = React.forwardRef<HTMLElement, ContainerProps>(function Container(
  { as: Comp = 'div', className, style, size = '3', maxWidth, gutter, ...props },
  ref
) {
  const nextStyle = withVar(style, {
    '--container-max-width': toCssVarValue(maxWidth) ?? `var(--layout-container-${size})`,
    '--container-gutter': toSpaceVar(gutter),
  });

  return <Comp ref={ref as never} className={cx(styles.container, className)} style={nextStyle} {...props} />;
});
