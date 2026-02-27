import * as React from 'react';
import styles from './grid.module.css';
import { buildSpaceVars, cx, type SpaceProps, toCssVarValue, toSpaceVar, withVar } from '../layout.utils';

export interface GridProps extends React.HTMLAttributes<HTMLElement>, SpaceProps {
  as?: React.ElementType;
  columns?: React.CSSProperties['gridTemplateColumns'];
  rows?: React.CSSProperties['gridTemplateRows'];
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
    '--grid-columns': toCssVarValue(columns),
    '--grid-rows': toCssVarValue(rows),
    '--grid-auto-flow': autoFlow,
    '--grid-align': align,
    '--grid-justify': justify,
    '--grid-gap': toSpaceVar(gap),
    ...buildSpaceVars('grid', { p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml }),
  });

  return <Comp ref={ref as never} className={cx(styles.grid, className)} style={nextStyle} {...props} />;
});
