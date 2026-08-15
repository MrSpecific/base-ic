import * as React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { describe, expect, it, vi, afterEach } from 'vitest';
import { Link } from '../Typography/Link';
import { Card } from '../Card/Card';
import { Badge } from '../Badge/Badge';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('Link render prop', () => {
  it('renders a plain <a> by default', () => {
    render(<Link href="/x">Go</Link>);
    const el = screen.getByText('Go');
    expect(el.tagName).toBe('A');
    expect(el).toHaveAttribute('href', '/x');
  });

  it('merges className, style, and forwards the ref onto a custom render element', () => {
    const ref = React.createRef<HTMLAnchorElement>();
    render(
      <Link
        ref={ref}
        className="link-own"
        style={{ color: 'red' }}
        render={<a data-testid="custom" className="router-own" style={{ fontWeight: 700 }} />}
      >
        Go
      </Link>,
    );
    const el = screen.getByTestId('custom');
    expect(el.className).toContain('link-own');
    expect(el.className).toContain('router-own');
    expect(el.style.color).toBe('red');
    expect(el.style.fontWeight).toBe('700');
    expect(ref.current).toBe(el);
  });

  it('chains onClick between the component and a custom render element', () => {
    const ownClick = vi.fn();
    const renderClick = vi.fn();
    render(
      <Link
        onClick={ownClick}
        render={<a data-testid="custom" onClick={renderClick} />}
      >
        Go
      </Link>,
    );
    screen.getByTestId('custom').click();
    expect(ownClick).toHaveBeenCalledTimes(1);
    expect(renderClick).toHaveBeenCalledTimes(1);
  });
});

describe('Badge render prop', () => {
  it('renders a plain <span> by default', () => {
    render(<Badge>Stable</Badge>);
    expect(screen.getByText('Stable').tagName).toBe('SPAN');
  });

  it('renders as a real, keyboard-native <button> via render, merging className', () => {
    const onClick = vi.fn();
    render(
      <Badge className="badge-own" render={<button type="button" onClick={onClick} />}>
        Filter
      </Badge>,
    );
    const el = screen.getByText('Filter');
    expect(el.tagName).toBe('BUTTON');
    expect(el.className).toContain('badge-own');
    el.focus();
    expect(document.activeElement).toBe(el);
  });
});

describe('Card render prop and asButton migration', () => {
  it('renders a plain <div> by default', () => {
    render(<Card data-testid="card">Content</Card>);
    expect(screen.getByTestId('card').tagName).toBe('DIV');
  });

  it('asButton renders a real <button> (native Enter/Space semantics, no manual role/tabIndex)', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Card asButton data-testid="card">Content</Card>);
    const el = screen.getByTestId('card');
    expect(el.tagName).toBe('BUTTON');
    // A real <button> doesn't need the role="button" patch — it has one natively.
    expect(el).not.toHaveAttribute('role');
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('asButton` is deprecated'));
  });

  it('render prop takes precedence over asButton and does not warn when asButton is unset', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <Card data-testid="card" render={<a href="/x" />}>
        Content
      </Card>,
    );
    const el = screen.getByTestId('card');
    expect(el.tagName).toBe('A');
    expect(warn).not.toHaveBeenCalled();
  });

  it('merges className and style onto the custom render element', () => {
    render(
      <Card
        data-testid="card"
        className="card-own"
        style={{ color: 'red' }}
        render={<button type="button" className="btn-own" style={{ fontWeight: 700 }} />}
      >
        Content
      </Card>,
    );
    const el = screen.getByTestId('card');
    expect(el.className).toContain('card-own');
    expect(el.className).toContain('btn-own');
    expect(el.style.color).toBe('red');
    expect(el.style.fontWeight).toBe('700');
  });
});
