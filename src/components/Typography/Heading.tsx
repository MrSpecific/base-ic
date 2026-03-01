import * as React from 'react';
import { buildSpaceVars, cx, type SpaceProps, withVar } from '../Layout/layout.utils';
import { buildTypoColorVar, buildTypoSizeVars } from './typography.utils';
import styles from './heading.module.css';

type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingSize = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type HeadingWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
type HeadingAlign = 'left' | 'center' | 'right';
type HeadingWrap = 'wrap' | 'nowrap' | 'pretty' | 'balance';
type HeadingTrim = 'normal' | 'start' | 'end' | 'both';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, SpaceProps {
  as?: HeadingElement;
  size?: HeadingSize;
  weight?: HeadingWeight;
  color?: string;
  highContrast?: boolean;
  align?: HeadingAlign;
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
    const resolvedSize = size ?? defaultSizeByElement[Tag];
    const sizeVars = buildTypoSizeVars('heading', resolvedSize);
    const colorVars = buildTypoColorVar(color, highContrast);
    const weightVar = weight
      ? { '--typo-weight': `var(--font-weight-${weight})` } as React.CSSProperties
      : undefined;
    const spaceVars = withVar(undefined, buildSpaceVars('typo', {
      p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml,
    }));

    return (
      <Tag
        ref={ref}
        className={cx(
          styles.heading,
          truncate && styles.truncate,
          trim && trim !== 'normal' && styles[`trim${trim[0].toUpperCase()}${trim.slice(1)}` as keyof typeof styles],
          className,
        )}
        style={{
          ...sizeVars,
          ...colorVars,
          ...weightVar,
          ...spaceVars,
          textAlign: align,
          textWrap: wrap,
          ...style,
        }}
        {...rest}
      />
    );
  },
);
