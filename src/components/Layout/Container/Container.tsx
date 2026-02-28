import * as React from 'react';
import styles from './container.module.css';
import { buildSpaceVars, cx, type SpaceProps, toCssVarValue, toSpaceVar, withVar } from '../layout.utils';

type ContainerSize = '1' | '2' | '3' | '4';

export interface ContainerProps extends React.HTMLAttributes<HTMLElement>, SpaceProps {
  as?: React.ElementType;
  size?: ContainerSize;
  maxWidth?: React.CSSProperties['maxWidth'];
  gutter?: number | string;
}

export const Container = React.forwardRef<HTMLElement, ContainerProps>(function Container(
  {
    as: Comp = 'div',
    className,
    style,
    size = '3',
    maxWidth,
    gutter,
    p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml,
    ...props
  },
  ref
) {
  const resolvedMarginX = mx != null ? toSpaceVar(mx) : m != null ? toSpaceVar(m) : undefined;
  const resolvedMarginY = my != null ? toSpaceVar(my) : m != null ? toSpaceVar(m) : undefined;

  const nextStyle = withVar(style, {
    '--container-max-width': toCssVarValue(maxWidth) ?? `var(--layout-container-${size})`,
    '--container-gutter': toSpaceVar(gutter),
    ...buildSpaceVars('container', { p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml }),
    '--container-margin-x': resolvedMarginX,
    '--container-margin-y': resolvedMarginY,
  });

  return <Comp ref={ref as never} className={cx(styles.container, className)} style={nextStyle} {...props} />;
});
