import * as React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { describe, expect, it, afterEach } from 'vitest';
import { Theme, useTheme } from '../Theme/Theme';

afterEach(() => {
  cleanup();
});

function snapshotBody() {
  const body = document.body;
  return {
    attributes: [...body.attributes].map((a) => `${a.name}=${a.value}`).sort(),
    style: body.getAttribute('style'),
  };
}

function ThemeProbe() {
  const theme = useTheme();
  return <span data-testid="probe">{JSON.stringify(theme)}</span>;
}

function readProbe() {
  return JSON.parse(screen.getByTestId('probe').textContent ?? '{}');
}

describe('Theme body sync', () => {
  it.each([
    ['inherit', {}],
    ['dark', { appearance: 'dark', accentColor: 'red', grayColor: 'sand' }],
    ['light', { appearance: 'light', radius: 'large', scaling: '90%' }],
  ] as const)('leaves <body> untouched after a root %s Theme unmounts', (_, props) => {
    const before = snapshotBody();
    const { unmount } = render(<Theme {...props}>content</Theme>);

    // While mounted it really does write to <body>.
    expect(document.body.style.getPropertyValue('--color-accent-9')).not.toBe('');

    unmount();
    expect(snapshotBody()).toEqual(before);
  });

  it('restores pre-existing body attributes and inline styles', () => {
    const body = document.body;
    body.className = 'dark app-shell';
    body.setAttribute('data-appearance', 'dark');
    body.style.setProperty('--color-accent-9', 'hotpink');
    body.style.setProperty('overflow', 'hidden');
    const before = snapshotBody();

    try {
      const { rerender, unmount } = render(<Theme appearance="light">content</Theme>);
      expect(body.classList.contains('light')).toBe(true);
      expect(body.classList.contains('dark')).toBe(false);
      expect(body.getAttribute('data-appearance')).toBe('light');

      rerender(<Theme appearance="light" accentColor="violet">content</Theme>);
      expect(body.style.getPropertyValue('--color-accent-9')).toBe('var(--color-violet-9)');

      unmount();
      expect(snapshotBody()).toEqual(before);
      expect(body.style.getPropertyValue('--color-accent-9')).toBe('hotpink');
    } finally {
      body.removeAttribute('class');
      body.removeAttribute('data-appearance');
      body.removeAttribute('style');
    }
  });

  it('does not write to <body> from a nested Theme', () => {
    const { container } = render(
      <Theme accentColor="blue">
        <Theme accentColor="crimson">content</Theme>
      </Theme>,
    );
    expect(container.querySelectorAll('[data-accent-color][data-base-ic-theme]')).toHaveLength(2);
    expect(document.body.style.getPropertyValue('--color-accent-9')).toBe('var(--color-blue-9)');
  });
});

describe('Nested Theme inheritance', () => {
  it('uses the defaults for a root Theme', () => {
    render(
      <Theme>
        <ThemeProbe />
      </Theme>,
    );
    expect(readProbe()).toEqual({
      accentColor: 'blue',
      grayColor: 'gray',
      radius: 'medium',
      scaling: '100%',
      appearance: 'inherit',
      fontFamily: {},
    });
  });

  it('inherits unspecified props from the parent Theme', () => {
    render(
      <Theme
        accentColor="violet"
        grayColor="sand"
        radius="large"
        scaling="90%"
        appearance="dark"
        fontFamily={{ primary: 'Parent Sans', monospace: 'Parent Mono' }}
      >
        <Theme accentColor="red" fontFamily={{ primary: 'Child Sans' }}>
          <ThemeProbe />
        </Theme>
      </Theme>,
    );
    expect(readProbe()).toEqual({
      accentColor: 'red',
      grayColor: 'sand',
      radius: 'large',
      scaling: '90%',
      appearance: 'dark',
      fontFamily: { primary: 'Child Sans', monospace: 'Parent Mono' },
    });

    const nested = screen.getByTestId('probe').closest('[data-accent-color]') as HTMLElement;
    expect(nested.dataset.accentColor).toBe('red');
    expect(nested.dataset.grayColor).toBe('sand');
    expect(nested.dataset.radius).toBe('large');
    expect(nested.dataset.scaling).toBe('90%');
    expect(nested.dataset.appearance).toBe('dark');
    expect(nested.style.getPropertyValue('--color-neutral-6')).toBe('var(--color-sand-6)');
    expect(nested.style.getPropertyValue('--component-scaling')).toBe('0.9');
  });

  it('treats appearance="inherit" on a nested Theme as "same as parent"', () => {
    render(
      <Theme appearance="dark">
        <Theme appearance="inherit">
          <ThemeProbe />
        </Theme>
      </Theme>,
    );
    expect(readProbe().appearance).toBe('dark');
  });

  it('lets a nested Theme override any prop', () => {
    render(
      <Theme accentColor="violet" grayColor="sand" radius="large" scaling="90%" appearance="dark">
        <Theme accentColor="red" grayColor="slate" radius="none" scaling="110%" appearance="light">
          <ThemeProbe />
        </Theme>
      </Theme>,
    );
    expect(readProbe()).toMatchObject({
      accentColor: 'red',
      grayColor: 'slate',
      radius: 'none',
      scaling: '110%',
      appearance: 'light',
    });
  });

  it('resolves inheritance through multiple levels', () => {
    render(
      <Theme grayColor="olive" radius="small">
        <Theme accentColor="green">
          <Theme scaling="120%">
            <ThemeProbe />
          </Theme>
        </Theme>
      </Theme>,
    );
    expect(readProbe()).toMatchObject({
      accentColor: 'green',
      grayColor: 'olive',
      radius: 'small',
      scaling: '120%',
    });
  });
});
