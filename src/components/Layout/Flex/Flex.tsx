import * as React from 'react';
import styles from './flex.module.css';
import { buildSpaceVars, cx, type SpaceProps, toSpaceVar, withVar } from '../layout.utils';

export interface FlexProps extends React.HTMLAttributes<HTMLElement>, SpaceProps {
  as?: React.ElementType;
  direction?: React.CSSProperties['flexDirection'];
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
  wrap?: React.CSSProperties['flexWrap'];
  gap?: number | string;
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
    p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml,
    ...props
  },
  ref
) {
  const nextStyle = withVar(style, {
    '--flex-direction': direction,
    '--flex-align': align,
    '--flex-justify': justify,
    '--flex-wrap': wrap,
    '--flex-gap': toSpaceVar(gap),
    ...buildSpaceVars('flex', { p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml }),
  });

  return <Comp ref={ref as never} className={cx(styles.flex, className)} style={nextStyle} {...props} />;
});
