import * as React from 'react';
import { buildSpaceVars, cx, type SpaceProps, withVar } from '../Layout/layout.utils';
import type { AccentColor } from '../Theme';
import styles from './data-list.module.css';

type DataListSize = '1' | '2' | '3';
type DataListOrientation = 'horizontal' | 'vertical';
type DataListTrim = 'normal' | 'start' | 'end' | 'both';
type DataListItemAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch';
type DataListLabelDimension = string | number;

type MarginProps = Pick<SpaceProps, 'm' | 'mx' | 'my' | 'mt' | 'mr' | 'mb' | 'ml'>;

/* ---------------------------------------------------------------------------
 * DataList.Root
 * --------------------------------------------------------------------------- */

export interface DataListRootProps extends React.HTMLAttributes<HTMLDListElement>, MarginProps {
  /**
   * `horizontal` lays labels and values out in two aligned columns;
   * `vertical` stacks each label above its value. Default: 'horizontal'
   */
  orientation?: DataListOrientation;
  /** Font size and spacing. Default: '2' */
  size?: DataListSize;
  /** Trim the leading above the first item and/or below the last item. Default: 'normal' */
  trim?: DataListTrim;
}

const sizeClass: Record<DataListSize, string> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
};

const trimClass: Record<Exclude<DataListTrim, 'normal'>, string> = {
  start: styles.trimStart,
  end: styles.trimEnd,
  both: styles.trimBoth,
};

const DataListRoot = React.forwardRef<HTMLDListElement, DataListRootProps>(function DataListRoot(
  {
    orientation = 'horizontal',
    size = '2',
    trim = 'normal',
    className,
    style,
    m, mx, my, mt, mr, mb, ml,
    ...rest
  },
  ref,
) {
  return (
    <dl
      ref={ref}
      className={cx(
        styles.root,
        styles[orientation],
        sizeClass[size],
        trim !== 'normal' && trimClass[trim],
        className,
      )}
      style={withVar(style, buildSpaceVars('dl', { m, mx, my, mt, mr, mb, ml }))}
      {...rest}
    />
  );
});

/* ---------------------------------------------------------------------------
 * DataList.Item
 * --------------------------------------------------------------------------- */

export interface DataListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Vertical alignment of the label and value in a horizontal list (no effect when vertical). Default: 'baseline' */
  align?: DataListItemAlign;
}

const DataListItem = React.forwardRef<HTMLDivElement, DataListItemProps>(function DataListItem(
  { align, className, style, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(styles.item, className)}
      style={withVar(style, { '--dl-item-align': align })}
      {...rest}
    />
  );
});

/* ---------------------------------------------------------------------------
 * DataList.Label
 * --------------------------------------------------------------------------- */

export interface DataListLabelProps extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  /** Label column width. Numbers are pixels; strings are any CSS length. */
  width?: DataListLabelDimension;
  /** Minimum label width. Numbers are pixels; strings are any CSS length. Default: scaled 88px (horizontal) */
  minWidth?: DataListLabelDimension;
  /** Maximum label width. Numbers are pixels; strings are any CSS length. */
  maxWidth?: DataListLabelDimension;
  /** Label text color (step 11 of the hue). Default: secondary text color. */
  color?: AccentColor;
  /** Increase contrast: step 12 of `color`, or primary text color when no `color` is set. */
  highContrast?: boolean;
}

function toLength(value?: DataListLabelDimension): string | undefined {
  if (value == null) return undefined;
  return typeof value === 'number' ? `${value}px` : value;
}

const DataListLabel = React.forwardRef<HTMLElement, DataListLabelProps>(function DataListLabel(
  { width, minWidth, maxWidth, color, highContrast = false, className, style, ...rest },
  ref,
) {
  const labelColor = color
    ? `var(--color-${color}-${highContrast ? 12 : 11})`
    : highContrast
      ? 'var(--color-text-primary)'
      : undefined;

  return (
    <dt
      ref={ref}
      className={cx(styles.label, className)}
      style={withVar(
        {
          width: toLength(width),
          minWidth: toLength(minWidth),
          maxWidth: toLength(maxWidth),
          ...style,
        },
        { '--dl-label-color': labelColor },
      )}
      {...rest}
    />
  );
});

/* ---------------------------------------------------------------------------
 * DataList.Value
 * --------------------------------------------------------------------------- */

export type DataListValueProps = React.HTMLAttributes<HTMLElement>;

const DataListValue = React.forwardRef<HTMLElement, DataListValueProps>(function DataListValue(
  { className, ...rest },
  ref,
) {
  return <dd ref={ref} className={cx(styles.value, className)} {...rest} />;
});

/* ---------------------------------------------------------------------------
 * Namespace
 * --------------------------------------------------------------------------- */

/**
 * Key/value metadata list: `DataList.Root` → `<dl>`, `DataList.Item` → `<div>`
 * (a valid name/value group wrapper inside `<dl>`), `DataList.Label` → `<dt>`,
 * `DataList.Value` → `<dd>`.
 */
export const DataList = {
  Root: DataListRoot,
  Item: DataListItem,
  Label: DataListLabel,
  Value: DataListValue,
};
