import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Box } from '../Layout/Box';
import { Grid } from '../Layout/Grid';
import { Heading } from '../Typography/Heading';
import { Button } from '../Button';
import { toSpaceVar } from '../Layout/layout.utils';

afterEach(() => {
  cleanup();
});

const classes = (el: HTMLElement) => [...el.classList].join(' ');

describe('responsive props', () => {
  it('writes initial to the base var, breakpoints to suffixed vars, and adds gate classes', () => {
    render(<Grid data-testid="g" columns={{ initial: 1, md: 3, '@lg': '1fr 2fr' }} />);
    const el = screen.getByTestId('g');
    expect(el.style.getPropertyValue('--grid-columns')).toBe('repeat(1, minmax(0, 1fr))');
    expect(el.style.getPropertyValue('--grid-columns-md')).toBe('repeat(3, minmax(0, 1fr))');
    expect(el.style.getPropertyValue('--grid-columns-cq-lg')).toBe('1fr 2fr');
    expect(classes(el)).toMatch(/columns-md/);
    expect(classes(el)).toMatch(/columns-cq-lg/);
  });

  it('keeps plain values unchanged, with no gate classes', () => {
    render(<Grid data-testid="g" columns={2} p="3" />);
    const el = screen.getByTestId('g');
    expect(el.style.getPropertyValue('--grid-columns')).toBe('repeat(2, minmax(0, 1fr))');
    expect(el.style.getPropertyValue('--bic-p')).toBe('var(--space-3)');
    expect(classes(el)).not.toMatch(/-(sm|md|lg|xl|2xl|cq-\w+)\b/);
  });

  it('makes space props responsive through the shared vars', () => {
    render(<Box data-testid="b" p={{ initial: '2', sm: '4' }} mt="-1" />);
    const el = screen.getByTestId('b');
    expect(el.style.getPropertyValue('--bic-p')).toBe('var(--space-2)');
    expect(el.style.getPropertyValue('--bic-p-sm')).toBe('var(--space-4)');
    expect(el.style.getPropertyValue('--bic-mt')).toBe('calc(var(--space-1) * -1)');
    expect(classes(el)).toMatch(/p-sm/);
  });

  it('adds the base size class even when only a breakpoint is set', () => {
    render(<Box data-testid="b" height={{ md: 200 }} container />);
    const el = screen.getByTestId('b');
    expect(el.style.getPropertyValue('--bic-height-md')).toBe('200px');
    expect(classes(el)).toMatch(/height-md/);
    expect(classes(el)).toMatch(/(^|[_ ])height(_|\b)/);
    expect(classes(el)).toMatch(/queryContainer/);
  });

  it('fills in the default heading size below the first breakpoint', () => {
    render(<Heading as="h2" size={{ md: '9' }}>Title</Heading>);
    const el = screen.getByRole('heading');
    expect(el.style.getPropertyValue('--typo-font-size')).toBe('var(--heading-6-size)');
    expect(el.style.getPropertyValue('--typo-font-size-md')).toBe('var(--heading-9-size)');
  });
});

describe('toSpaceVar', () => {
  it('maps steps, negatives and zero', () => {
    expect(toSpaceVar(3)).toBe('var(--space-3)');
    expect(toSpaceVar(-2)).toBe('calc(var(--space-2) * -1)');
    expect(toSpaceVar('-2')).toBe('calc(var(--space-2) * -1)');
    expect(toSpaceVar('-0')).toBe('0px');
    expect(toSpaceVar('-10px')).toBe('-10px');
  });
});

describe('Button href', () => {
  it('renders a link with no button role', () => {
    render(<Button href="/docs">Docs</Button>);
    const link = screen.getByRole('link', { name: 'Docs' });
    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe('/docs');
    expect(link.hasAttribute('role')).toBe(false);
  });

  it('passes href to a custom render element', () => {
    render(<Button href="/x" render={<a data-router="" />}>Go</Button>);
    expect(screen.getByRole('link', { name: 'Go' }).hasAttribute('data-router')).toBe(true);
  });

  it('drops href and marks disabled links', () => {
    render(<Button href="/x" disabled>Off</Button>);
    const el = screen.getByText('Off');
    expect(el.hasAttribute('href')).toBe(false);
    expect(el.getAttribute('aria-disabled')).toBe('true');
    expect(el.hasAttribute('data-disabled')).toBe(true);
  });
});

describe('Button iconOnly', () => {
  it('renders a square button with no horizontal padding', () => {
    render(<Button iconOnly aria-label="Close">×</Button>);
    const el = screen.getByRole('button', { name: 'Close' });
    expect(classes(el)).toMatch(/iconOnly/);
    expect(el.style.getPropertyValue('--btn-px')).toBe('0px');
  });
});
