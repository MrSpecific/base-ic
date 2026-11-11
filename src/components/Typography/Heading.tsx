import * as React from 'react';
import { createResponsive, cx, isResponsiveObject, type Responsive, type SpaceProps } from '../Layout/layout.utils';
import { buildTypoColorVar, buildTypoSizeVars } from './typography.utils';
import type { AccentColor } from '../Theme';
import styles from './heading.module.css';

type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingSize = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type HeadingWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
type HeadingAlign = 'left' | 'center' | 'right';
type HeadingWrap = 'wrap' | 'nowrap' | 'pretty' | 'balance';
type HeadingTrim = 'normal' | 'start' | 'end' | 'both';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, SpaceProps {
  as?: HeadingElement;
  size?: Responsive<HeadingSize>;
  weight?: HeadingWeight;
  color?: AccentColor;
  highContrast?: boolean;
  align?: Responsive<HeadingAlign>;
  wrap?: HeadingWrap;
  trim?: HeadingTrim;
  truncate?: boolean;
}

const defaultSizeByElement: Record<HeadingElement, HeadingSize> = {
  h1: '8',
  h2: '6',
  h3: '5',
  h4: '4',
  h5: '3',
  h6: '2',
};

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading(
    {
      as: Tag = 'h1',
      size,
      weight,
      color,
      highContrast,
      align,
      wrap,
      trim,
      truncate,
      p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const colorVars = buildTypoColorVar(color, highContrast);
    const weightVar = weight
      ? { '--typo-weight': `var(--font-weight-${weight})` } as React.CSSProperties
      : undefined;
    // Fill in the default size below the first breakpoint, so a nested Heading doesn't inherit one
    const defaultSize = defaultSizeByElement[Tag];
    const r = createResponsive(styles);
    r.add('size', isResponsiveObject(size) ? { initial: defaultSize, ...size } : size ?? defaultSize,
      (v) => buildTypoSizeVars('heading', v) as Record<string, string>);
    r.add('align', align, (v) => ({ '--typo-align': v }));
    r.space({ p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml });

    return (
      <Tag
        ref={ref}
        className={cx(
          styles.heading,
          ...r.classes,
          truncate && styles.truncate,
          trim && trim !== 'normal' && styles[`trim${trim[0].toUpperCase()}${trim.slice(1)}` as keyof typeof styles],
          className,
        )}
        style={{
          ...r.vars,
          ...colorVars,
          ...weightVar,
          textWrap: wrap,
          ...style,
        }}
        {...rest}
      />
    );
  },
);
