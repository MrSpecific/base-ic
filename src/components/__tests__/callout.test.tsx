import * as React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Callout } from '../Callout';

afterEach(() => {
  cleanup();
});

describe('Callout', () => {
  it('renders a plain div with no role, an icon slot, and a <p> for text', () => {
    render(
      <Callout.Root data-testid="root">
        <Callout.Icon data-testid="icon">i</Callout.Icon>
        <Callout.Text>Heads up</Callout.Text>
      </Callout.Root>,
    );
    const root = screen.getByTestId('root');
    expect(root.tagName).toBe('DIV');
    expect(root.getAttribute('role')).toBeNull();
    expect(screen.getByTestId('icon').tagName).toBe('DIV');
    expect(screen.getByText('Heads up').tagName).toBe('P');
  });

  it('wires color, margin and highContrast onto the root and forwards the ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Callout.Root ref={ref} data-testid="root" color="red" mt="3" highContrast className="own" role="alert">
        <Callout.Text>Denied</Callout.Text>
      </Callout.Root>,
    );
    const root = screen.getByTestId('root');
    expect(ref.current).toBe(root);
    expect(root.className).toContain('own');
    expect(root.getAttribute('role')).toBe('alert');
    expect(root.style.getPropertyValue('--callout-accent-9')).toBe('var(--color-red-9)');
    expect(root.style.getPropertyValue('--bic-mt')).toBe('var(--space-3)');
  });

  it('leaves accent vars unset without a color so the theme accent applies', () => {
    render(<Callout.Root data-testid="root" />);
    expect(screen.getByTestId('root').style.getPropertyValue('--callout-accent-9')).toBe('');
  });
});
