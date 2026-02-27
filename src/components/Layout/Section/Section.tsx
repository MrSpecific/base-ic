import * as React from 'react';
import styles from './section.module.css';
import { cx, toSpaceVar, withVar } from '../layout.utils';

type SectionSize = '1' | '2' | '3';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  size?: SectionSize;
  py?: number | string;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(function Section(
  { as: Comp = 'section', className, style, size = '2', py, ...props },
  ref
) {
  const nextStyle = withVar(style, {
    '--section-padding': py ? toSpaceVar(py) : `var(--layout-section-${size})`,
  });

  return <Comp ref={ref as never} className={cx(styles.section, className)} style={nextStyle} {...props} />;
});
