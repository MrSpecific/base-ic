import * as React from 'react';
import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Table } from '../Table';
import { DataList } from '../DataList';
import { Inset } from '../Inset';
import { Card } from '../Card';

afterEach(() => {
  cleanup();
});

function renderTable(rootProps: React.ComponentProps<typeof Table.Root> = {}) {
  return render(
    <Table.Root data-testid="root" {...rootProps}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell justify="end">Amount</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row align="start">
          <Table.RowHeaderCell>Alice</Table.RowHeaderCell>
          <Table.Cell justify="end">$10</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>,
  );
}

describe('Table', () => {
  it('renders semantic table elements with header scopes', () => {
    renderTable();
    const root = screen.getByTestId('root');
    expect(root.tagName).toBe('DIV');
    const table = within(root).getByRole('table');
    expect(table.tagName).toBe('TABLE');
    expect(table.querySelector(':scope > thead > tr > th')).not.toBeNull();
    expect(table.querySelector(':scope > tbody > tr > td')).not.toBeNull();

    const colHeaders = within(table).getAllByRole('columnheader');
    expect(colHeaders).toHaveLength(2);
    colHeaders.forEach((th) => {
      expect(th.tagName).toBe('TH');
      expect(th).toHaveAttribute('scope', 'col');
    });

    const rowHeader = within(table).getByRole('rowheader', { name: 'Alice' });
    expect(rowHeader.tagName).toBe('TH');
    expect(rowHeader).toHaveAttribute('scope', 'row');
  });

  it('applies justify, align, and cell sizing/padding props', () => {
    render(
      <Table.Root>
        <Table.Body>
          <Table.Row align="baseline" data-testid="row">
            <Table.Cell justify="center" width={120} minWidth="8rem" maxWidth="50%" px="4" pt={0} data-testid="cell">
              x
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>,
    );
    expect(screen.getByTestId('row').style.verticalAlign).toBe('baseline');
    const cell = screen.getByTestId('cell');
    expect(cell.style.textAlign).toBe('center');
    expect(cell.style.width).toBe('120px');
    expect(cell.style.minWidth).toBe('8rem');
    expect(cell.style.maxWidth).toBe('50%');
    expect(cell.style.getPropertyValue('--tbl-cell-padding-x')).toBe('var(--space-4)');
    expect(cell.style.getPropertyValue('--tbl-cell-padding-top')).toBe('0px');
  });

  it('defaults to size 2 / ghost / auto layout', () => {
    renderTable();
    const root = screen.getByTestId('root');
    expect(root.className).toContain('size2');
    expect(root.className).toContain('ghost');
    expect(root.querySelector('table')!.className).not.toContain('fixed');
  });

  it('applies size, variant, and layout classes', () => {
    renderTable({ size: '3', variant: 'surface', layout: 'fixed' });
    const root = screen.getByTestId('root');
    expect(root.className).toContain('size3');
    expect(root.className).toContain('surface');
    expect(root.className).not.toContain('ghost');
    expect(root.querySelector('table')!.className).toContain('fixed');
  });

  it('maps margin props to vars and moves labelling props onto the <table>', () => {
    renderTable({ mt: '4', 'aria-label': 'Invoices', className: 'own' });
    const root = screen.getByTestId('root');
    expect(root.style.getPropertyValue('--tbl-margin-top')).toBe('var(--space-4)');
    expect(root.className).toContain('own');
    expect(root).not.toHaveAttribute('aria-label');
    expect(screen.getByRole('table', { name: 'Invoices' })).toBeInTheDocument();
  });

  it('forwards refs to the rendered elements', () => {
    const rootRef = React.createRef<HTMLDivElement>();
    const headerRef = React.createRef<HTMLTableSectionElement>();
    const bodyRef = React.createRef<HTMLTableSectionElement>();
    const rowRef = React.createRef<HTMLTableRowElement>();
    const cellRef = React.createRef<HTMLTableCellElement>();
    const colRef = React.createRef<HTMLTableCellElement>();
    const rowHeaderRef = React.createRef<HTMLTableCellElement>();
    render(
      <Table.Root ref={rootRef}>
        <Table.Header ref={headerRef}>
          <Table.Row>
            <Table.ColumnHeaderCell ref={colRef}>A</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>B</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body ref={bodyRef}>
          <Table.Row ref={rowRef}>
            <Table.RowHeaderCell ref={rowHeaderRef}>1</Table.RowHeaderCell>
            <Table.Cell ref={cellRef}>2</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>,
    );
    expect(rootRef.current?.tagName).toBe('DIV');
    expect(headerRef.current?.tagName).toBe('THEAD');
    expect(bodyRef.current?.tagName).toBe('TBODY');
    expect(rowRef.current?.tagName).toBe('TR');
    expect(cellRef.current?.tagName).toBe('TD');
    expect(colRef.current?.getAttribute('scope')).toBe('col');
    expect(rowHeaderRef.current?.getAttribute('scope')).toBe('row');
  });
});

describe('DataList', () => {
  it('renders a <dl> whose items pair each <dt> with its <dd>', () => {
    render(
      <DataList.Root data-testid="dl">
        <DataList.Item>
          <DataList.Label>Status</DataList.Label>
          <DataList.Value>Active</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>ID</DataList.Label>
          <DataList.Value>u_123</DataList.Value>
        </DataList.Item>
      </DataList.Root>,
    );
    const dl = screen.getByTestId('dl');
    expect(dl.tagName).toBe('DL');
    const items = Array.from(dl.children);
    expect(items).toHaveLength(2);
    const pairs = items.map((item) => {
      expect(item.tagName).toBe('DIV');
      const [dt, dd] = Array.from(item.children);
      expect(dt.tagName).toBe('DT');
      expect(dd.tagName).toBe('DD');
      return [dt.textContent, dd.textContent];
    });
    expect(pairs).toEqual([
      ['Status', 'Active'],
      ['ID', 'u_123'],
    ]);
    // Accessible roles: term / definition.
    expect(screen.getAllByRole('term')).toHaveLength(2);
    expect(screen.getAllByRole('definition')).toHaveLength(2);
  });

  it('applies orientation, size, trim, and margin', () => {
    const { rerender } = render(<DataList.Root data-testid="dl" />);
    let dl = screen.getByTestId('dl');
    expect(dl.className).toContain('horizontal');
    expect(dl.className).toContain('size2');
    expect(dl.className).not.toMatch(/trim/);

    rerender(<DataList.Root data-testid="dl" orientation="vertical" size="1" trim="both" mb="3" />);
    dl = screen.getByTestId('dl');
    expect(dl.className).toContain('vertical');
    expect(dl.className).not.toContain('horizontal');
    expect(dl.className).toContain('size1');
    expect(dl.className).toContain('trimBoth');
    expect(dl.style.getPropertyValue('--dl-margin-bottom')).toBe('var(--space-3)');
  });

  it('maps Label color / highContrast and dimensions, and Item align', () => {
    render(
      <DataList.Root>
        <DataList.Item align="center" data-testid="item">
          <DataList.Label color="violet" minWidth={120} data-testid="a">A</DataList.Label>
          <DataList.Value>1</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label color="violet" highContrast width="10rem" data-testid="b">B</DataList.Label>
          <DataList.Value>2</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label highContrast data-testid="c">C</DataList.Label>
          <DataList.Value>3</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label data-testid="d">D</DataList.Label>
          <DataList.Value>4</DataList.Value>
        </DataList.Item>
      </DataList.Root>,
    );
    expect(screen.getByTestId('item').style.getPropertyValue('--dl-item-align')).toBe('center');
    const a = screen.getByTestId('a');
    expect(a.style.getPropertyValue('--dl-label-color')).toBe('var(--color-violet-11)');
    expect(a.style.minWidth).toBe('120px');
    const b = screen.getByTestId('b');
    expect(b.style.getPropertyValue('--dl-label-color')).toBe('var(--color-violet-12)');
    expect(b.style.width).toBe('10rem');
    expect(screen.getByTestId('c').style.getPropertyValue('--dl-label-color')).toBe('var(--color-text-primary)');
    expect(screen.getByTestId('d').style.getPropertyValue('--dl-label-color')).toBe('');
  });

  it('forwards refs', () => {
    const rootRef = React.createRef<HTMLDListElement>();
    const itemRef = React.createRef<HTMLDivElement>();
    const labelRef = React.createRef<HTMLElement>();
    const valueRef = React.createRef<HTMLElement>();
    render(
      <DataList.Root ref={rootRef}>
        <DataList.Item ref={itemRef}>
          <DataList.Label ref={labelRef}>K</DataList.Label>
          <DataList.Value ref={valueRef}>V</DataList.Value>
        </DataList.Item>
      </DataList.Root>,
    );
    expect(rootRef.current?.tagName).toBe('DL');
    expect(itemRef.current?.tagName).toBe('DIV');
    expect(labelRef.current?.tagName).toBe('DT');
    expect(valueRef.current?.tagName).toBe('DD');
  });
});

describe('Inset', () => {
  it.each([
    ['all', 'sideAll'],
    ['x', 'sideX'],
    ['y', 'sideY'],
    ['top', 'sideTop'],
    ['bottom', 'sideBottom'],
    ['left', 'sideLeft'],
    ['right', 'sideRight'],
  ] as const)('side="%s" applies the %s class', (side, cls) => {
    render(<Inset side={side} data-testid="inset" />);
    const el = screen.getByTestId('inset');
    expect(el.className).toContain(cls);
    // Exactly one side class.
    expect(el.className.match(/side[A-Z]\w*/g)).toHaveLength(1);
  });

  it('defaults to side="all" and clip="border-box"; clip="padding-box" switches the clip class', () => {
    const { rerender } = render(<Inset data-testid="inset" />);
    let el = screen.getByTestId('inset');
    expect(el.className).toContain('sideAll');
    expect(el.className).toContain('clipBorderBox');
    rerender(<Inset data-testid="inset" clip="padding-box" />);
    el = screen.getByTestId('inset');
    expect(el.className).toContain('clipPaddingBox');
    expect(el.className).not.toContain('clipBorderBox');
  });

  it('resolves padding props per side, with "current" mapping to the container padding', () => {
    render(<Inset data-testid="inset" p="current" pt="2" pr={0} />);
    const el = screen.getByTestId('inset');
    expect(el.style.getPropertyValue('--ins-padding-top')).toBe('var(--space-2)');
    expect(el.style.getPropertyValue('--ins-padding-right')).toBe('0px');
    expect(el.style.getPropertyValue('--ins-padding-bottom')).toBe('var(--ins-bleed-bottom)');
    expect(el.style.getPropertyValue('--ins-padding-left')).toBe('var(--ins-bleed-left)');
  });

  it('sets no padding vars when no padding props are passed', () => {
    render(<Inset data-testid="inset" />);
    const el = screen.getByTestId('inset');
    expect(el.style.getPropertyValue('--ins-padding-top')).toBe('');
  });

  it('forwards ref, className, style, and supports render', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Card>
        <Inset ref={ref} className="own" style={{ height: 40 }} data-testid="inset">
          content
        </Inset>
      </Card>,
    );
    const el = screen.getByTestId('inset');
    expect(ref.current).toBe(el);
    expect(el.tagName).toBe('DIV');
    expect(el.className).toContain('own');
    expect(el.style.height).toBe('40px');

    cleanup();
    render(<Inset render={<section />} data-testid="inset" />);
    expect(screen.getByTestId('inset').tagName).toBe('SECTION');
  });
});
