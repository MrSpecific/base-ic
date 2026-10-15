import * as React from 'react';
import styles from './section.module.css';
import { buildSpaceVars, cx, type SpaceProps, withVar } from '../layout.utils';

type SectionSize = '1' | '2' | '3';

export interface SectionProps extends React.HTMLAttributes<HTMLElement>, SpaceProps {
  as?: React.ElementType;
  /** Vertical padding preset. `p`/`py`/`pt`/`pb` override it. Default: '2' */
  size?: SectionSize;
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
    '--section-size-padding': `var(--layout-section-${size})`,
    ...buildSpaceVars('section', { p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml }),
  });

  return <Comp ref={ref} className={cx(styles.section, className)} style={nextStyle} {...props} />;
}) as React.ForwardRefExoticComponent<SectionProps & React.RefAttributes<HTMLElement>>;
