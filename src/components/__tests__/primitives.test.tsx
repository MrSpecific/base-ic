import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Section } from '../Layout/Section';
import { Grid } from '../Layout/Grid';
import { Container } from '../Layout/Container';
import { Separator } from '../Separator/Separator';
import { Toggle, ToggleGroup } from '../Toggle/Toggle';
import { Avatar } from '../Avatar/Avatar';
import { Slider } from '../Slider/Slider';
import { Button } from '../Button/Button';

afterEach(() => {
  cleanup();
});

describe('Section', () => {
  it('maps size to the vertical padding var without clobbering it', () => {
    render(<Section size="3" data-testid="s" />);
    const el = screen.getByTestId('s');
    expect(el.style.getPropertyValue('--section-size-padding')).toBe('var(--layout-section-3)');
    // No explicit padding props → no inline overrides that would beat the size.
    expect(el.style.getPropertyValue('--section-padding')).toBe('');
    expect(el.style.getPropertyValue('--section-padding-y')).toBe('');
  });

  it('honors py={0} as an explicit override', () => {
    render(<Section py={0} data-testid="s" />);
    expect(screen.getByTestId('s').style.getPropertyValue('--section-padding-y')).toBe('0px');
  });
});

describe('Separator', () => {
  it('passes orientation through to Base UI so aria-orientation is correct', () => {
    render(<Separator orientation="vertical" data-testid="sep" />);
    expect(screen.getByTestId('sep')).toHaveAttribute('aria-orientation', 'vertical');
  });
});

describe('Toggle', () => {
  it('lets an explicit size/variant beat the ToggleGroup value', () => {
    render(
      <ToggleGroup size="1" variant="ghost">
        <Toggle value="a" data-testid="inherits">A</Toggle>
        <Toggle value="b" size="3" variant="solid" data-testid="explicit">B</Toggle>
      </ToggleGroup>,
    );
    const inherits = screen.getByTestId('inherits');
    const explicit = screen.getByTestId('explicit');
    expect(inherits.style.getPropertyValue('--tgl-height')).toBe('var(--button-1-height)');
    expect(inherits.className).toContain('ghost');
    expect(explicit.style.getPropertyValue('--tgl-height')).toBe('var(--button-3-height)');
    expect(explicit.className).toContain('solid');
    expect(explicit.className).not.toContain('ghost');
  });
});

describe('Grid / Container', () => {
  it('expands a bare column/row count to equal tracks', () => {
    render(<Grid columns="3" rows={2} data-testid="g" />);
    const el = screen.getByTestId('g');
    expect(el.style.getPropertyValue('--grid-columns')).toBe('repeat(3, minmax(0, 1fr))');
    expect(el.style.getPropertyValue('--grid-rows')).toBe('repeat(2, minmax(0, 1fr))');
  });

  it('passes track lists through unchanged', () => {
    render(<Grid columns="200px 1fr" data-testid="g" />);
    expect(screen.getByTestId('g').style.getPropertyValue('--grid-columns')).toBe('200px 1fr');
  });

  it('treats a numeric Container maxWidth as pixels', () => {
    render(<Container maxWidth={600} data-testid="c" />);
    expect(screen.getByTestId('c').style.getPropertyValue('--container-max-width')).toBe('600px');
  });
});

describe('Avatar', () => {
  it('forwards aria-*, data-*, and id to the root', () => {
    render(<Avatar fallback="WC" aria-label="Will Christenson" data-testid="avatar" id="me" />);
    const el = screen.getByTestId('avatar');
    expect(el).toHaveAttribute('aria-label', 'Will Christenson');
    expect(el).toHaveAttribute('id', 'me');
  });
});

describe('Slider', () => {
  it('labels the thumb input, not just the root group', () => {
    render(<Slider aria-label="Volume" defaultValue={40} />);
    expect(screen.getByRole('slider', { name: 'Volume' })).toBeInTheDocument();
  });

  it('names each thumb of a range slider via getAriaLabel', () => {
    render(
      <Slider
        defaultValue={[10, 90]}
        getAriaLabel={(i) => (i === 0 ? 'Minimum' : 'Maximum')}
      />,
    );
    expect(screen.getByRole('slider', { name: 'Minimum' })).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: 'Maximum' })).toBeInTheDocument();
  });
});

describe('Button', () => {
  it('keeps a loading button focusable and marks it busy', () => {
    render(<Button loading>Save</Button>);
    const el = screen.getByRole('button', { name: 'Save' });
    expect(el).toHaveAttribute('aria-busy', 'true');
    expect(el).not.toHaveAttribute('disabled');
    expect(el).toHaveAttribute('aria-disabled', 'true');
    el.focus();
    expect(document.activeElement).toBe(el);
  });

  it('keeps a loading button\'s content in place under the spinner', () => {
    render(
      <Button loading>
        <svg data-testid="icon" /> Save
      </Button>,
    );
    const el = screen.getByRole('button', { name: /save/i });
    // Content still rendered (so the button keeps its width and its name)…
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(el).toHaveTextContent('Save');
    // …with one spinner overlaid, hidden from assistive tech.
    expect(el.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThanOrEqual(1);
  });

  it('renders children directly when not loading', () => {
    render(<Button>Save</Button>);
    const el = screen.getByRole('button', { name: /save/i });
    expect(el.firstChild?.nodeType).toBe(Node.TEXT_NODE);
  });
});
