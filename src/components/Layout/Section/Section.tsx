import * as React from 'react';
import styles from './section.module.css';
import { createResponsive, cx, queryContainerClass, type Responsive, type SpaceProps, withVar } from '../layout.utils';

type SectionSize = '1' | '2' | '3';

export interface SectionProps extends React.HTMLAttributes<HTMLElement>, SpaceProps {
  as?: React.ElementType;
  /** Vertical padding preset. `p`/`py`/`pt`/`pb` override it. Default: '2' */
  size?: Responsive<SectionSize>;
  /** Make this element a query container, so descendants' `@`-breakpoints (e.g. `'@md'`) respond to its width. */
  container?: boolean;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(function Section(
  {
    as: Comp = 'section',
    className,
    style,
    size,
    container,
    p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml,
    ...props
  },
  ref
) {
  const r = createResponsive(styles);
  r.add('size', size, (v) => ({ '--section-size-padding': `var(--layout-section-${v})` }));
  r.space({ p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml });

  return (
    <Comp
      ref={ref}
      className={cx(styles.section, container && queryContainerClass, ...r.classes, className)}
      style={withVar(style, r.vars)}
      {...props}
    />
  );
}) as React.ForwardRefExoticComponent<SectionProps & React.RefAttributes<HTMLElement>>;
