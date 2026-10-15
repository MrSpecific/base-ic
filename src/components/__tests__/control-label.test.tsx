import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, afterEach } from 'vitest';
import { Checkbox } from '../Checkbox/Checkbox';
import { Switch } from '../Switch/Switch';
import { RadioGroup } from '../RadioGroup/RadioGroup';
import { NavigationMenu } from '../NavigationMenu/NavigationMenu';

afterEach(cleanup);

describe('control label children', () => {
  it('names a Checkbox and toggles it from the label text', () => {
    render(<Checkbox>Accept terms</Checkbox>);
    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
    fireEvent.click(screen.getByText('Accept terms'));
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
  });

  it('names a Switch', () => {
    render(<Switch>Notifications</Switch>);
    expect(screen.getByRole('switch', { name: 'Notifications' })).toBeInTheDocument();
  });

  it('names and selects a Radio from its label text', () => {
    render(
      <RadioGroup defaultValue="a">
        <RadioGroup.Item value="a">Apple</RadioGroup.Item>
        <RadioGroup.Item value="b">Banana</RadioGroup.Item>
      </RadioGroup>,
    );
    const banana = screen.getByRole('radio', { name: 'Banana' });
    fireEvent.click(screen.getByText('Banana'));
    expect(banana).toHaveAttribute('aria-checked', 'true');
  });

  it('renders the bare control without a label wrapper when there are no children', () => {
    const { container } = render(<Checkbox aria-label="Bare" />);
    expect(container.querySelector('label')).toBeNull();
  });
});

describe('NavigationMenu.Link', () => {
  it('supports a render prop and trigger styling at the top level', () => {
    render(
      <NavigationMenu>
        <NavigationMenu.List>
          <NavigationMenu.Item>
            <NavigationMenu.Link render={<a data-router="yes" />} href="/about">
              About
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu>,
    );
    const link = screen.getByRole('link', { name: 'About' });
    expect(link).toHaveAttribute('data-router', 'yes');
    expect(link.className).toMatch(/trigger/);
  });
});
