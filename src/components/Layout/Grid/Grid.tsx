import * as React from 'react';
import styles from './grid.module.css';
import { buildSpaceVars, cx, type SpaceProps, toSpaceVar, withVar } from '../layout.utils';

// A bare count (`3` or `"3"`) means N equal tracks, as in Radix Themes.
function toTrackList(value?: string | number): string | undefined {
  if (value == null) return undefined;
  if (typeof value === 'number' || /^\d+$/.test(value)) return `repeat(${value}, minmax(0, 1fr))`;
  return value;
}

export interface GridProps extends React.HTMLAttributes<HTMLElement>, SpaceProps {
  as?: React.ElementType;
  /** Track list, or a count: `3` / `"3"` expands to `repeat(3, minmax(0, 1fr))`. */
  columns?: React.CSSProperties['gridTemplateColumns'] | number;
  /** Track list, or a count: `2` / `"2"` expands to `repeat(2, minmax(0, 1fr))`. */
  rows?: React.CSSProperties['gridTemplateRows'] | number;
  autoFlow?: React.CSSProperties['gridAutoFlow'];
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyItems'];
  gap?: number | string;
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
    p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml,
    ...props
  },
  ref
) {
  const nextStyle = withVar(style, {
    '--grid-columns': toTrackList(columns),
    '--grid-rows': toTrackList(rows),
    '--grid-auto-flow': autoFlow,
    '--grid-align': align,
    '--grid-justify': justify,
    '--grid-gap': toSpaceVar(gap),
    ...buildSpaceVars('grid', { p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml }),
  });

  return <Comp ref={ref} className={cx(styles.grid, className)} style={nextStyle} {...props} />;
}) as React.ForwardRefExoticComponent<GridProps & React.RefAttributes<HTMLElement>>;
