import * as React from 'react';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, afterEach } from 'vitest';
import { AlertDialog } from '../AlertDialog/AlertDialog';
import { Select } from '../Select/Select';
import { Popover } from '../Popover/Popover';
import { Theme } from '../Theme/Theme';
import { Menu } from '../Menu/Menu';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('AlertDialog', () => {
  it('calls onCancel when dismissed with Escape', async () => {
    const onCancel = vi.fn();
    render(
      <AlertDialog title="Delete?" onCancel={onCancel} defaultOpen>
        <button>Open</button>
      </AlertDialog>,
    );
    const dialog = await screen.findByRole('alertdialog');
    fireEvent.keyDown(dialog, { key: 'Escape' });
    await waitFor(() => expect(onCancel).toHaveBeenCalledTimes(1));
  });

  it('keeps the dialog open while an async onConfirm is pending', async () => {
    let resolve!: () => void;
    const onConfirm = vi.fn(() => new Promise<void>((r) => (resolve = r)));
    const onOpenChange = vi.fn();
    render(
      <AlertDialog
        title="Delete?"
        confirmLabel="Delete"
        onConfirm={onConfirm}
        onOpenChange={onOpenChange}
        defaultOpen
      >
        <button>Open</button>
      </AlertDialog>,
    );
    fireEvent.click(await screen.findByRole('button', { name: 'Delete' }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    expect(onOpenChange).not.toHaveBeenCalledWith(false, expect.anything());

    await act(async () => resolve());
    await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything()));
  });
});

describe('Select', () => {
  it('shows the label from an explicit items prop with object values', () => {
    const apple = { id: 1 };
    const pear = { id: 2 };
    render(
      <Select
        defaultValue={pear}
        items={[
          { value: apple, label: 'Apple' },
          { value: pear, label: 'Pear' },
        ]}
      >
        <Select.Item value={apple}>Apple</Select.Item>
        <Select.Item value={pear}>Pear</Select.Item>
      </Select>,
    );
    expect(screen.getByRole('combobox')).toHaveTextContent('Pear');
  });

  it('derives the selected label from Select.Item children', () => {
    render(
      <Select defaultValue="b">
        <Select.Item value="a">Alpha</Select.Item>
        <Select.Item value="b">Bravo</Select.Item>
      </Select>,
    );
    expect(screen.getByRole('combobox')).toHaveTextContent('Bravo');
  });
});

describe('Popover', () => {
  it('names the popup from its title', async () => {
    render(
      <Popover title="Settings" content="Body" defaultOpen>
        <button>Open</button>
      </Popover>,
    );
    expect(await screen.findByRole('dialog', { name: 'Settings' })).toBeInTheDocument();
  });
});

describe('theme-aware portals', () => {
  it('portals popovers and submenus into the nearest nested Theme', async () => {
    render(
      <Theme>
        <Theme accentColor="red" appearance="dark">
          <Popover content="Pop" title="Pop title" defaultOpen>
            <button>Open popover</button>
          </Popover>
          <Menu trigger={<button>Open menu</button>} defaultOpen>
            <Menu.Sub trigger="More" defaultOpen>
              <Menu.Item>Nested item</Menu.Item>
            </Menu.Sub>
          </Menu>
        </Theme>
      </Theme>,
    );
    const popover = await screen.findByRole('dialog', { name: 'Pop title' });
    expect(popover.closest('[data-accent-color]')).toHaveAttribute('data-accent-color', 'red');
    const nestedItem = await screen.findByText('Nested item');
    expect(nestedItem.closest('[data-accent-color]')).toHaveAttribute('data-accent-color', 'red');
  });
});

describe('Select placeholder', () => {
  it('shows the placeholder for an empty-string value', () => {
    render(
      <Select value="" placeholder="Pick a fruit">
        <Select.Item value="a">Apple</Select.Item>
      </Select>,
    );
    expect(screen.getByRole('combobox')).toHaveTextContent('Pick a fruit');
  });
});
