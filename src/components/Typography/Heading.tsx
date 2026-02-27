import * as React from 'react';
import { cx, toSpaceVar, withVar } from '../Layout/layout.utils';
import { buildTypoColorVar, buildTypoSizeVars } from './typography.utils';
import styles from './heading.module.css';

type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingSize = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type HeadingWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
type HeadingAlign = 'left' | 'center' | 'right';
type HeadingWrap = 'wrap' | 'nowrap' | 'pretty' | 'balance';
type HeadingTrim = 'normal' | 'start' | 'end' | 'both';
type SpaceValue = number | string;

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingElement;
  size?: HeadingSize;
  weight?: HeadingWeight;
  color?: string;
  highContrast?: boolean;
  align?: HeadingAlign;
  wrap?: HeadingWrap;
  trim?: HeadingTrim;
  truncate?: boolean;
  /** Padding shorthand */
  p?: SpaceValue;
  /** Padding-inline shorthand */
  px?: SpaceValue;
  /** Padding-block shorthand */
  py?: SpaceValue;
  /** Padding-top */
  pt?: SpaceValue;
  /** Padding-right */
  pr?: SpaceValue;
  /** Padding-bottom */
  pb?: SpaceValue;
  /** Padding-left */
  pl?: SpaceValue;
  /** Margin shorthand */
  m?: SpaceValue;
  /** Margin-inline shorthand */
  mx?: SpaceValue;
  /** Margin-block shorthand */
  my?: SpaceValue;
  /** Margin-top */
  mt?: SpaceValue;
  /** Margin-right */
  mr?: SpaceValue;
  /** Margin-bottom */
  mb?: SpaceValue;
  /** Margin-left */
  ml?: SpaceValue;
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading(
    {
      as: Tag = 'h1',
      size = '6',
      weight,
      color,
      highContrast,
      align,
      wrap,
      trim,
      truncate,
      p,
      px,
      py,
      pt,
      pr,
      pb,
      pl,
      m,
      mx,
      my,
      mt,
      mr,
      mb,
      ml,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const sizeVars = buildTypoSizeVars('heading', size);
    const colorVars = buildTypoColorVar(color, highContrast);
    const weightVar = weight
      ? { '--typo-weight': `var(--font-weight-${weight})` } as React.CSSProperties
      : undefined;
    const spaceVars = withVar(undefined, {
      '--typo-padding': toSpaceVar(p),
      '--typo-padding-x': toSpaceVar(px),
      '--typo-padding-y': toSpaceVar(py),
      '--typo-padding-top': toSpaceVar(pt),
      '--typo-padding-right': toSpaceVar(pr),
      '--typo-padding-bottom': toSpaceVar(pb),
      '--typo-padding-left': toSpaceVar(pl),
      '--typo-margin': toSpaceVar(m),
      '--typo-margin-x': toSpaceVar(mx),
      '--typo-margin-y': toSpaceVar(my),
      '--typo-margin-top': toSpaceVar(mt),
      '--typo-margin-right': toSpaceVar(mr),
      '--typo-margin-bottom': toSpaceVar(mb),
      '--typo-margin-left': toSpaceVar(ml),
    });

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
