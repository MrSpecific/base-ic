import * as React from 'react';
import styles from './container.module.css';
import {
  createResponsive,
  cx,
  queryContainerClass,
  type Responsive,
  type SpaceProps,
  toSpaceVar,
  withVar,
} from '../layout.utils';

type ContainerSize = '1' | '2' | '3' | '4';

export interface ContainerProps extends React.HTMLAttributes<HTMLElement>, SpaceProps {
  as?: React.ElementType;
  size?: Responsive<ContainerSize>;
  maxWidth?: Responsive<NonNullable<React.CSSProperties['maxWidth']>>;
  gutter?: Responsive<number | string>;
  /** Make this element a query container, so descendants' `@`-breakpoints (e.g. `'@md'`) respond to its width. */
  container?: boolean;
}

export const Container = React.forwardRef<HTMLElement, ContainerProps>(function Container(
  {
    as: Comp = 'div',
    className,
    style,
    size,
    maxWidth,
    gutter,
    container,
    p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml,
    ...props
  },
  ref
) {
  const r = createResponsive(styles);
  r.add('size', size, (v) => ({ '--container-max-width': `var(--layout-container-${v})` }));
  // Numbers are pixels, matching React's `style={{ maxWidth: 600 }}`. Added after
  // `size` so it wins when both are set.
  r.add('maxWidth', maxWidth, (v) => ({ '--container-max-width': typeof v === 'number' ? `${v}px` : v }));
  r.add('gutter', gutter, (v) => ({ '--container-gutter': toSpaceVar(v) }));
  r.space({ p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml });

  return (
    <Comp
      ref={ref}
      className={cx(styles.container, container && queryContainerClass, ...r.classes, className)}
      style={withVar(style, r.vars)}
      {...props}
    />
  );
}) as React.ForwardRefExoticComponent<ContainerProps & React.RefAttributes<HTMLElement>>;
