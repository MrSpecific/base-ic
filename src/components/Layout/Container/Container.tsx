import * as React from 'react';
import styles from './container.module.css';
import { buildSpaceVars, cx, type SpaceProps, toSpaceVar, withVar } from '../layout.utils';

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
    // Numbers are pixels, matching React's `style={{ maxWidth: 600 }}`.
    '--container-max-width':
      (typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth) ?? `var(--layout-container-${size})`,
    '--container-gutter': toSpaceVar(gutter),
    ...buildSpaceVars('container', { p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml }),
    '--container-margin-x': resolvedMarginX,
    '--container-margin-y': resolvedMarginY,
  });

  return <Comp ref={ref} className={cx(styles.container, className)} style={nextStyle} {...props} />;
}) as React.ForwardRefExoticComponent<ContainerProps & React.RefAttributes<HTMLElement>>;
