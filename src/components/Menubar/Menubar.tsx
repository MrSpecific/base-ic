import * as React from 'react';
import { Menubar as BaseMenubar } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
import styles from './menubar.module.css';

/* ---------------------------------------------------------------------------
 * Types
 * --------------------------------------------------------------------------- */

export interface MenubarProps extends Omit<BaseMenubar.Props, 'className'> {
  /** Additional class name applied to the container. */
  className?: string;
  /** Top-level menus — expected to be this library's own `<Menu>` instances. */
  children: React.ReactNode;
}

/* ---------------------------------------------------------------------------
 * Menubar — a container for top-level Menu instances
 * --------------------------------------------------------------------------- */

/**
 * A horizontal (or vertical) bar of top-level menus, e.g. "File", "Edit",
 * "View" — each opening its own dropdown.
 *
 * Menubar is a thin wrapper: its children are expected to be this library's
 * own `<Menu>` components, e.g.:
 *
 * ```tsx
 * <Menubar>
 *   <Menu trigger={<Button variant="ghost">File</Button>}>
 *     <Menu.Item>New</Menu.Item>
 *     <Menu.Item>Open…</Menu.Item>
 *   </Menu>
 *   <Menu trigger={<Button variant="ghost">Edit</Button>}>
 *     <Menu.Item>Undo</Menu.Item>
 *     <Menu.Item>Redo</Menu.Item>
 *   </Menu>
 * </Menubar>
 * ```
 *
 * No special prop is needed on the child `Menu` components — Base UI's
 * `Menu.Root` automatically detects a `Menubar` ancestor via context and
 * switches to menubar behavior (hovering an open menu's trigger moves
 * directly to an adjacent one without re-clicking, roving tab index, etc).
 */
export function Menubar({
  orientation = 'horizontal',
  modal = true,
  disabled = false,
  className,
  children,
  ...rest
}: MenubarProps) {
  return (
    <BaseMenubar
      orientation={orientation}
      modal={modal}
      disabled={disabled}
      className={cx(styles.menubar, styles[orientation], className)}
      {...rest}
    >
      {children}
    </BaseMenubar>
  );
}

export { BaseMenubar as MenubarPrimitive };
