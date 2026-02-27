import * as React from 'react';
import styles from './section.module.css';
import { buildSpaceVars, cx, type SpaceProps, toSpaceVar, withVar } from '../layout.utils';

type SectionSize = '1' | '2' | '3';

export interface SectionProps extends React.HTMLAttributes<HTMLElement>, SpaceProps {
  as?: React.ElementType;
  size?: SectionSize;
  py?: number | string;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(function Section(
  {
    as: Comp = 'section',
    className,
    style,
    size = '2',
    py,
    p, px, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml,
    ...props
  },
  ref
) {
  const nextStyle = withVar(style, {
    '--section-padding': py ? toSpaceVar(py) : `var(--layout-section-${size})`,
    ...buildSpaceVars('section', { p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml }),
  });

  return <Comp ref={ref as never} className={cx(styles.section, className)} style={nextStyle} {...props} />;
});
