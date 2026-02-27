import * as React from 'react';
import { buildSpaceVars, cx, type SpaceProps, withVar } from '../Layout/layout.utils';
import { buildTypoColorVar, buildTypoSizeVars } from './typography.utils';
import styles from './text.module.css';

type TextElement = 'span' | 'div' | 'label' | 'p';
type TextSize = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type TextWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
type TextAlign = 'left' | 'center' | 'right';
type TextWrap = 'wrap' | 'nowrap' | 'pretty' | 'balance';
type TextTrim = 'normal' | 'start' | 'end' | 'both';

export interface TextProps extends React.HTMLAttributes<HTMLElement>, SpaceProps {
  as?: TextElement;
  size?: TextSize;
  weight?: TextWeight;
  color?: string;
  highContrast?: boolean;
  align?: TextAlign;
  wrap?: TextWrap;
  trim?: TextTrim;
  truncate?: boolean;
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  function Text(
    {
      as: Tag = 'span',
      size = '3',
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
    const sizeVars = buildTypoSizeVars('text', size);
    const colorVars = buildTypoColorVar(color, highContrast);
    const weightVar = weight
      ? { '--typo-weight': `var(--font-weight-${weight})` } as React.CSSProperties
      : undefined;
    const spaceVars = withVar(undefined, buildSpaceVars('typo', {
      p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml,
    }));

    return (
      <Tag
        ref={ref as any}
        className={cx(
          styles.text,
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
