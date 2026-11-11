import * as React from 'react';
import styles from './flex.module.css';
import {
  createResponsive,
  cx,
  queryContainerClass,
  type Responsive,
  type SizeProps,
  type SpaceProps,
  toSpaceVar,
  withVar,
} from '../layout.utils';

export interface FlexProps extends React.HTMLAttributes<HTMLElement>, SpaceProps, SizeProps {
  as?: React.ElementType;
  direction?: Responsive<NonNullable<React.CSSProperties['flexDirection']>>;
  align?: Responsive<NonNullable<React.CSSProperties['alignItems']>>;
  justify?: Responsive<NonNullable<React.CSSProperties['justifyContent']>>;
  wrap?: Responsive<NonNullable<React.CSSProperties['flexWrap']>>;
  gap?: Responsive<number | string>;
  /** Make this element a query container, so descendants' `@`-breakpoints (e.g. `'@md'`) respond to its width. */
  container?: boolean;
}

export const Flex = React.forwardRef<HTMLElement, FlexProps>(function Flex(
  {
    as: Comp = 'div',
    className,
    style,
    direction,
    align,
    justify,
    wrap,
    gap,
    container,
    p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml,
    width, minWidth, maxWidth, height, minHeight, maxHeight,
    ...props
  },
  ref
) {
  const r = createResponsive(styles);
  r.add('direction', direction, (v) => ({ '--flex-direction': v }));
  r.add('align', align, (v) => ({ '--flex-align': v }));
  r.add('justify', justify, (v) => ({ '--flex-justify': v }));
  r.add('wrap', wrap, (v) => ({ '--flex-wrap': v }));
  r.add('gap', gap, (v) => ({ '--flex-gap': toSpaceVar(v) }));
  r.space({ p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml });
  r.size({ width, minWidth, maxWidth, height, minHeight, maxHeight });

  return (
    <Comp
      ref={ref}
      className={cx(styles.flex, container && queryContainerClass, ...r.classes, className)}
      style={withVar(style, r.vars)}
      {...props}
    />
  );
}) as React.ForwardRefExoticComponent<FlexProps & React.RefAttributes<HTMLElement>>;
