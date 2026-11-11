import * as React from 'react';
import styles from './grid.module.css';
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

// A bare count (`3` or `"3"`) means N equal tracks, as in Radix Themes.
function toTrackList(value: string | number): string {
  if (typeof value === 'number' || /^\d+$/.test(value)) return `repeat(${value}, minmax(0, 1fr))`;
  return value;
}

export interface GridProps extends React.HTMLAttributes<HTMLElement>, SpaceProps, SizeProps {
  as?: React.ElementType;
  /** Track list, or a count: `3` / `"3"` expands to `repeat(3, minmax(0, 1fr))`. */
  columns?: Responsive<NonNullable<React.CSSProperties['gridTemplateColumns']> | number>;
  /** Track list, or a count: `2` / `"2"` expands to `repeat(2, minmax(0, 1fr))`. */
  rows?: Responsive<NonNullable<React.CSSProperties['gridTemplateRows']> | number>;
  autoFlow?: Responsive<NonNullable<React.CSSProperties['gridAutoFlow']>>;
  align?: Responsive<NonNullable<React.CSSProperties['alignItems']>>;
  justify?: Responsive<NonNullable<React.CSSProperties['justifyItems']>>;
  gap?: Responsive<number | string>;
  /** Make this element a query container, so descendants' `@`-breakpoints (e.g. `'@md'`) respond to its width. */
  container?: boolean;
}

export const Grid = React.forwardRef<HTMLElement, GridProps>(function Grid(
  {
    as: Comp = 'div',
    className,
    style,
    columns,
    rows,
    autoFlow,
    align,
    justify,
    gap,
    container,
    p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml,
    width, minWidth, maxWidth, height, minHeight, maxHeight,
    ...props
  },
  ref
) {
  const r = createResponsive(styles);
  r.add('columns', columns, (v) => ({ '--grid-columns': toTrackList(v) }));
  r.add('rows', rows, (v) => ({ '--grid-rows': toTrackList(v) }));
  r.add('autoFlow', autoFlow, (v) => ({ '--grid-auto-flow': v }));
  r.add('align', align, (v) => ({ '--grid-align': v }));
  r.add('justify', justify, (v) => ({ '--grid-justify': v }));
  r.add('gap', gap, (v) => ({ '--grid-gap': toSpaceVar(v) }));
  r.space({ p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml });
  r.size({ width, minWidth, maxWidth, height, minHeight, maxHeight });

  return (
    <Comp
      ref={ref}
      className={cx(styles.grid, container && queryContainerClass, ...r.classes, className)}
      style={withVar(style, r.vars)}
      {...props}
    />
  );
}) as React.ForwardRefExoticComponent<GridProps & React.RefAttributes<HTMLElement>>;
