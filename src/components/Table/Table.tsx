import * as React from 'react';
import { buildSpaceVars, cx, type SpaceProps, withVar } from '../Layout/layout.utils';
import styles from './table.module.css';

type TableSize = '1' | '2' | '3';
type TableVariant = 'surface' | 'ghost';
type TableLayout = 'auto' | 'fixed';
type TableRowAlign = 'start' | 'center' | 'end' | 'baseline';
type TableCellJustify = 'start' | 'center' | 'end';
type TableCellDimension = string | number;

type MarginProps = Pick<SpaceProps, 'm' | 'mx' | 'my' | 'mt' | 'mr' | 'mb' | 'ml'>;
type PaddingProps = Pick<SpaceProps, 'p' | 'px' | 'py' | 'pt' | 'pr' | 'pb' | 'pl'>;

/* ---------------------------------------------------------------------------
 * Table.Root
 * --------------------------------------------------------------------------- */

export interface TableRootProps extends React.HTMLAttributes<HTMLDivElement>, MarginProps {
  /** Cell padding, row height and font size. Default: '2' */
  size?: TableSize;
  /**
   * `surface` draws a bordered, rounded panel with a tinted header;
   * `ghost` is borderless with row separators only. Default: 'ghost'
   */
  variant?: TableVariant;
  /** CSS `table-layout`. `fixed` sizes columns from the first row / `width` props instead of content. Default: 'auto' */
  layout?: TableLayout;
}

const sizeClass: Record<TableSize, string> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
};

/**
 * Props that label or describe the table itself. They are forwarded to the
 * `<table>` (where assistive tech looks for them) rather than the scroll
 * wrapper that receives every other prop.
 */
const TABLE_LABEL_PROPS = ['aria-label', 'aria-labelledby', 'aria-describedby'] as const;

const TableRoot = React.forwardRef<HTMLDivElement, TableRootProps>(function TableRoot(
  {
    size = '2',
    variant = 'ghost',
    layout = 'auto',
    className,
    style,
    children,
    m, mx, my, mt, mr, mb, ml,
    ...rest
  },
  ref,
) {
  const wrapperProps: React.HTMLAttributes<HTMLDivElement> = { ...rest };
  const tableProps: React.TableHTMLAttributes<HTMLTableElement> = {};
  for (const key of TABLE_LABEL_PROPS) {
    if (wrapperProps[key] !== undefined) {
      tableProps[key] = wrapperProps[key];
      delete wrapperProps[key];
    }
  }

  const nextStyle = withVar(style, buildSpaceVars('tbl', { m, mx, my, mt, mr, mb, ml }));

  return (
    <div
      ref={ref}
      className={cx(styles.root, styles[variant], sizeClass[size], className)}
      style={nextStyle}
      {...wrapperProps}
    >
      <table className={cx(styles.table, layout === 'fixed' && styles.fixed)} {...tableProps}>
        {children}
      </table>
    </div>
  );
});

/* ---------------------------------------------------------------------------
 * Table.Header / Table.Body
 * --------------------------------------------------------------------------- */

export type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement>;
export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  function TableHeader({ className, ...rest }, ref) {
    return <thead ref={ref} className={cx(styles.header, className)} {...rest} />;
  },
);

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  function TableBody({ className, ...rest }, ref) {
    return <tbody ref={ref} className={cx(styles.body, className)} {...rest} />;
  },
);

/* ---------------------------------------------------------------------------
 * Table.Row
 * --------------------------------------------------------------------------- */

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Vertical alignment of the row's cells. Default: browser default (middle). */
  align?: TableRowAlign;
}

const rowAlignMap: Record<TableRowAlign, React.CSSProperties['verticalAlign']> = {
  start: 'top',
  center: 'middle',
  end: 'bottom',
  baseline: 'baseline',
};

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  function TableRow({ align, className, style, ...rest }, ref) {
    return (
      <tr
        ref={ref}
        className={cx(styles.row, className)}
        style={align ? { verticalAlign: rowAlignMap[align], ...style } : style}
        {...rest}
      />
    );
  },
);

/* ---------------------------------------------------------------------------
 * Cells
 * --------------------------------------------------------------------------- */

interface TableCellOwnProps extends PaddingProps {
  /** Horizontal alignment of the cell content. Default: 'start' */
  justify?: TableCellJustify;
  /** Column width. Numbers are pixels; strings are any CSS length. */
  width?: TableCellDimension;
  /** Minimum column width. Numbers are pixels; strings are any CSS length. */
  minWidth?: TableCellDimension;
  /** Maximum column width. Numbers are pixels; strings are any CSS length. */
  maxWidth?: TableCellDimension;
}

export interface TableCellProps
  extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, 'width' | 'align'>,
    TableCellOwnProps {}

export interface TableColumnHeaderCellProps
  extends Omit<React.ThHTMLAttributes<HTMLTableCellElement>, 'width' | 'align'>,
    TableCellOwnProps {}

export interface TableRowHeaderCellProps
  extends Omit<React.ThHTMLAttributes<HTMLTableCellElement>, 'width' | 'align'>,
    TableCellOwnProps {}

function toLength(value?: TableCellDimension): string | undefined {
  if (value == null) return undefined;
  return typeof value === 'number' ? `${value}px` : value;
}

function cellStyle(
  { justify, width, minWidth, maxWidth, p, px, py, pt, pr, pb, pl }: TableCellOwnProps,
  style: React.CSSProperties | undefined,
): React.CSSProperties {
  return withVar(
    {
      textAlign: justify,
      width: toLength(width),
      minWidth: toLength(minWidth),
      maxWidth: toLength(maxWidth),
      ...style,
    },
    buildSpaceVars('tbl-cell', { p, px, py, pt, pr, pb, pl }),
  );
}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { justify, width, minWidth, maxWidth, p, px, py, pt, pr, pb, pl, className, style, ...rest },
  ref,
) {
  return (
    <td
      ref={ref}
      className={cx(styles.cell, className)}
      style={cellStyle({ justify, width, minWidth, maxWidth, p, px, py, pt, pr, pb, pl }, style)}
      {...rest}
    />
  );
});

const TableColumnHeaderCell = React.forwardRef<HTMLTableCellElement, TableColumnHeaderCellProps>(
  function TableColumnHeaderCell(
    { justify, width, minWidth, maxWidth, p, px, py, pt, pr, pb, pl, className, style, scope = 'col', ...rest },
    ref,
  ) {
    return (
      <th
        ref={ref}
        scope={scope}
        className={cx(styles.cell, styles.columnHeaderCell, className)}
        style={cellStyle({ justify, width, minWidth, maxWidth, p, px, py, pt, pr, pb, pl }, style)}
        {...rest}
      />
    );
  },
);

const TableRowHeaderCell = React.forwardRef<HTMLTableCellElement, TableRowHeaderCellProps>(
  function TableRowHeaderCell(
    { justify, width, minWidth, maxWidth, p, px, py, pt, pr, pb, pl, className, style, scope = 'row', ...rest },
    ref,
  ) {
    return (
      <th
        ref={ref}
        scope={scope}
        className={cx(styles.cell, styles.rowHeaderCell, className)}
        style={cellStyle({ justify, width, minWidth, maxWidth, p, px, py, pt, pr, pb, pl }, style)}
        {...rest}
      />
    );
  },
);

/* ---------------------------------------------------------------------------
 * Namespace
 * --------------------------------------------------------------------------- */

/**
 * Semantic data table: `Table.Root` → `<div>` scroll wrapper + `<table>`,
 * `Table.Header` → `<thead>`, `Table.Body` → `<tbody>`, `Table.Row` → `<tr>`,
 * `Table.Cell` → `<td>`, `Table.ColumnHeaderCell` → `<th scope="col">`,
 * `Table.RowHeaderCell` → `<th scope="row">`.
 */
export const Table = {
  Root: TableRoot,
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  ColumnHeaderCell: TableColumnHeaderCell,
  RowHeaderCell: TableRowHeaderCell,
};
