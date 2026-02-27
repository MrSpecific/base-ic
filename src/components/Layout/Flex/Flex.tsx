import * as React from 'react';
import styles from './flex.module.css';
import { cx, toSpaceVar, withVar } from '../layout.utils';

export interface FlexProps extends React.HTMLAttributes<HTMLElement> {
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
  });

  return <Comp ref={ref as never} className={cx(styles.flex, className)} style={nextStyle} {...props} />;
});
