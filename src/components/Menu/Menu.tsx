import * as React from 'react';
import { Menu as BaseMenu } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
import { useTheme } from '../Theme';
import styles from './menu.module.css';

/* ---------------------------------------------------------------------------
 * Types
 * --------------------------------------------------------------------------- */

type MenuSize = '1' | '2' | '3';

const sizeClass: Record<MenuSize, string> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
};

export interface MenuProps extends Omit<BaseMenu.Root.Props, 'children'> {
  /** Element that opens the menu — receives Base UI's trigger props. */
  trigger: React.ReactElement;
  /** Menu items (Menu.Item, Menu.Group, Menu.Separator…). */
  children: React.ReactNode;
  /** Size scale for items. Default: '2' */
  size?: MenuSize;
  /** Side the popup appears on. Default: 'bottom' */
  side?: BaseMenu.Positioner.Props['side'];
  /** Alignment relative to the trigger. Default: 'start' */
  align?: BaseMenu.Positioner.Props['align'];
  /** Gap between popup and trigger. Default: 4 */
  sideOffset?: number;
}

export interface MenuItemProps
  extends Omit<BaseMenu.Item.Props, 'className' | 'render'> {
  /** Icon rendered before the label. */
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export interface MenuCheckboxItemProps
  extends Omit<BaseMenu.CheckboxItem.Props, 'className' | 'render'> {
  className?: string;
  children: React.ReactNode;
}

export interface MenuRadioGroupProps
  extends Omit<BaseMenu.RadioGroup.Props, 'className'> {
  className?: string;
}

export interface MenuRadioItemProps
  extends Omit<BaseMenu.RadioItem.Props, 'className' | 'render'> {
  className?: string;
  children: React.ReactNode;
}

export interface MenuGroupProps {
  /** Group label shown above items. */
  label?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

/* ---------------------------------------------------------------------------
 * Icons
 * --------------------------------------------------------------------------- */

function CheckIcon() {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2 6L5 9L10 3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RadioDotIcon() {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="6" cy="6" r="2.5" fill="currentColor" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 2L8 6L4 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------------------------------------------------------------------------
 * MenuContext — carries size down to items
 * --------------------------------------------------------------------------- */

const MenuContext = React.createContext<{ size: MenuSize }>({ size: '2' });

/* ---------------------------------------------------------------------------
 * Menu root
 * --------------------------------------------------------------------------- */

export function Menu({
  trigger,
  children,
  size = '2',
  side = 'bottom',
  align = 'start',
  sideOffset = 4,
  ...rootProps
}: MenuProps) {
  const { appearance } = useTheme();
  const triggerAnchorRef = React.useRef<HTMLSpanElement | null>(null);
  const [portalContainer, setPortalContainer] = React.useState<HTMLElement | null>(null);
  const forcedAppearance =
    appearance === 'dark' || appearance === 'light' ? appearance : undefined;

  React.useEffect(() => {
    const nearestThemeRoot =
      triggerAnchorRef.current?.closest<HTMLElement>('[data-accent-color]') ??
      document.querySelector<HTMLElement>('[data-accent-color]');
    setPortalContainer(nearestThemeRoot ?? null);
  }, []);

  return (
    <MenuContext.Provider value={{ size }}>
      <BaseMenu.Root {...rootProps}>
        <span ref={triggerAnchorRef} style={{ display: 'contents' }}>
          <BaseMenu.Trigger render={trigger} />
        </span>
        <BaseMenu.Portal container={portalContainer ?? undefined}>
          <div data-appearance={forcedAppearance}>
            <BaseMenu.Positioner
              className={styles.positioner}
              side={side}
              align={align}
              sideOffset={sideOffset}
            >
              <BaseMenu.Popup className={cx(styles.popup, sizeClass[size])}>
                {children}
              </BaseMenu.Popup>
            </BaseMenu.Positioner>
          </div>
        </BaseMenu.Portal>
      </BaseMenu.Root>
    </MenuContext.Provider>
  );
}

/* ---------------------------------------------------------------------------
 * Menu.Item
 * --------------------------------------------------------------------------- */

function MenuItem({ icon, className, children, ...rest }: MenuItemProps) {
  const { size } = React.useContext(MenuContext);
  return (
    <BaseMenu.Item className={cx(styles.item, sizeClass[size], className)} {...rest}>
      {icon && <span className={styles.itemIcon}>{icon}</span>}
      <span className={styles.itemLabel}>{children}</span>
    </BaseMenu.Item>
  );
}

/* ---------------------------------------------------------------------------
 * Menu.CheckboxItem
 * --------------------------------------------------------------------------- */

function MenuCheckboxItem({ className, children, ...rest }: MenuCheckboxItemProps) {
  const { size } = React.useContext(MenuContext);
  return (
    <BaseMenu.CheckboxItem
      className={cx(styles.item, styles.checkboxItem, sizeClass[size], className)}
      {...rest}
    >
      <BaseMenu.CheckboxItemIndicator className={styles.itemIndicator}>
        <CheckIcon />
      </BaseMenu.CheckboxItemIndicator>
      <span className={styles.itemLabel}>{children}</span>
    </BaseMenu.CheckboxItem>
  );
}

/* ---------------------------------------------------------------------------
 * Menu.RadioGroup
 * --------------------------------------------------------------------------- */

function MenuRadioGroup({ className, children, ...rest }: MenuRadioGroupProps) {
  return (
    <BaseMenu.RadioGroup className={cx(styles.radioGroup, className)} {...rest}>
      {children}
    </BaseMenu.RadioGroup>
  );
}

/* ---------------------------------------------------------------------------
 * Menu.RadioItem
 * --------------------------------------------------------------------------- */

function MenuRadioItem({ className, children, ...rest }: MenuRadioItemProps) {
  const { size } = React.useContext(MenuContext);
  return (
    <BaseMenu.RadioItem
      className={cx(styles.item, styles.radioItem, sizeClass[size], className)}
      {...rest}
    >
      <BaseMenu.RadioItemIndicator className={styles.itemIndicator}>
        <RadioDotIcon />
      </BaseMenu.RadioItemIndicator>
      <span className={styles.itemLabel}>{children}</span>
    </BaseMenu.RadioItem>
  );
}

/* ---------------------------------------------------------------------------
 * Menu.Group
 * --------------------------------------------------------------------------- */

function MenuGroup({ label, className, children }: MenuGroupProps) {
  return (
    <BaseMenu.Group className={cx(styles.group, className)}>
      {label && (
        <BaseMenu.GroupLabel className={styles.groupLabel}>{label}</BaseMenu.GroupLabel>
      )}
      {children}
    </BaseMenu.Group>
  );
}

/* ---------------------------------------------------------------------------
 * Menu.Separator
 * --------------------------------------------------------------------------- */

function MenuSeparator() {
  return <div className={styles.separator} role="separator" />;
}

/* ---------------------------------------------------------------------------
 * Menu.Sub — submenu
 * --------------------------------------------------------------------------- */

export interface MenuSubProps extends Omit<BaseMenu.SubmenuRoot.Props, 'children'> {
  /** Trigger item that opens the submenu. */
  trigger: React.ReactNode;
  children: React.ReactNode;
}

function MenuSub({ trigger, children, ...rest }: MenuSubProps) {
  const { size } = React.useContext(MenuContext);
  return (
    <BaseMenu.SubmenuRoot {...rest}>
      <BaseMenu.SubmenuTrigger className={cx(styles.item, styles.submenuTrigger, sizeClass[size])}>
        <span className={styles.itemLabel}>{trigger}</span>
        <ChevronRightIcon />
      </BaseMenu.SubmenuTrigger>
      <BaseMenu.Portal>
        <BaseMenu.Positioner className={styles.positioner} sideOffset={4}>
          <BaseMenu.Popup className={cx(styles.popup, sizeClass[size])}>
            {children}
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.SubmenuRoot>
  );
}

/* ---------------------------------------------------------------------------
 * Attach sub-components
 * --------------------------------------------------------------------------- */

Menu.Item = MenuItem;
Menu.CheckboxItem = MenuCheckboxItem;
Menu.RadioGroup = MenuRadioGroup;
Menu.RadioItem = MenuRadioItem;
Menu.Group = MenuGroup;
Menu.Separator = MenuSeparator;
Menu.Sub = MenuSub;

export { BaseMenu as MenuPrimitive };
