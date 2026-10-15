import * as React from 'react';
import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
import { useThemePortal } from '../shared/useThemePortal';
import styles from './navigation-menu.module.css';

/* ---------------------------------------------------------------------------
 * Types
 * --------------------------------------------------------------------------- */

type NavigationMenuSize = '1' | '2' | '3';
type NavigationMenuOrientation = 'horizontal' | 'vertical';

const sizeClass: Record<NavigationMenuSize, string> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
};

export interface NavigationMenuProps
  extends Omit<BaseNavigationMenu.Root.Props, 'className' | 'style'> {
  /** Orientation of the top-level item list. Default: 'horizontal' */
  orientation?: NavigationMenuOrientation;
  /** Size scale for triggers. Default: '2' */
  size?: NavigationMenuSize;
  /** Side the content panel opens on. Default: 'bottom', or 'inline-end' when vertical */
  side?: BaseNavigationMenu.Positioner.Props['side'];
  /** Alignment of the content panel. Default: 'center', or 'start' when vertical */
  align?: BaseNavigationMenu.Positioner.Props['align'];
  /** Gap between the list and the content panel. Default: 8 */
  sideOffset?: BaseNavigationMenu.Positioner.Props['sideOffset'];
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export interface NavigationMenuListProps
  extends Omit<BaseNavigationMenu.List.Props, 'className' | 'render'> {
  className?: string;
  children: React.ReactNode;
}

export interface NavigationMenuItemProps
  extends Omit<BaseNavigationMenu.Item.Props, 'className' | 'render'> {
  className?: string;
  children: React.ReactNode;
}

export interface NavigationMenuTriggerProps
  extends Omit<BaseNavigationMenu.Trigger.Props, 'className' | 'render'> {
  className?: string;
  children: React.ReactNode;
}

export interface NavigationMenuContentProps
  extends Omit<BaseNavigationMenu.Content.Props, 'className' | 'render'> {
  className?: string;
  children: React.ReactNode;
}

export interface NavigationMenuLinkProps
  extends Omit<BaseNavigationMenu.Link.Props, 'className'> {
  className?: string;
  children: React.ReactNode;
}

/* ---------------------------------------------------------------------------
 * ChevronDownIcon — trigger affordance
 * --------------------------------------------------------------------------- */

function ChevronDownIcon() {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={styles.triggerIcon}
    >
      <path
        d="M2 4L6 8L10 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------------------------------------------------------------------------
 * NavigationMenuContext — carries size + orientation down to sub-components
 * --------------------------------------------------------------------------- */

interface NavigationMenuContextValue {
  size: NavigationMenuSize;
  orientation: NavigationMenuOrientation;
}

const NavigationMenuContext = React.createContext<NavigationMenuContextValue>({
  size: '2',
  orientation: 'horizontal',
});

/* ---------------------------------------------------------------------------
 * NavigationMenu root
 * --------------------------------------------------------------------------- */

export function NavigationMenu({
  orientation = 'horizontal',
  size = '2',
  side = orientation === 'vertical' ? 'inline-end' : 'bottom',
  align = orientation === 'vertical' ? 'start' : 'center',
  sideOffset = 8,
  className,
  style,
  children,
  ...rootProps
}: NavigationMenuProps) {
  const { anchorRef: rootRef, container: portalContainer, forcedAppearance } =
    useThemePortal<HTMLElement>();

  return (
    <NavigationMenuContext.Provider value={{ size, orientation }}>
      <BaseNavigationMenu.Root
        ref={rootRef}
        orientation={orientation}
        className={cx(styles.root, className)}
        style={style}
        {...rootProps}
      >
        {children}
        <BaseNavigationMenu.Portal container={portalContainer}>
          <div data-appearance={forcedAppearance}>
            <BaseNavigationMenu.Backdrop className={styles.backdrop} />
            <BaseNavigationMenu.Positioner
              className={styles.positioner}
              side={side}
              align={align}
              sideOffset={sideOffset}
            >
              <BaseNavigationMenu.Popup className={styles.popup}>
                <BaseNavigationMenu.Viewport className={styles.viewport} />
              </BaseNavigationMenu.Popup>
            </BaseNavigationMenu.Positioner>
          </div>
        </BaseNavigationMenu.Portal>
      </BaseNavigationMenu.Root>
    </NavigationMenuContext.Provider>
  );
}

/* ---------------------------------------------------------------------------
 * NavigationMenu.List
 * --------------------------------------------------------------------------- */

function NavigationMenuList({ className, children, ...rest }: NavigationMenuListProps) {
  const { size, orientation } = React.useContext(NavigationMenuContext);
  return (
    <BaseNavigationMenu.List
      className={cx(
        styles.list,
        sizeClass[size],
        orientation === 'vertical' && styles.listVertical,
        className,
      )}
      {...rest}
    >
      {children}
    </BaseNavigationMenu.List>
  );
}

/* ---------------------------------------------------------------------------
 * NavigationMenu.Item
 * --------------------------------------------------------------------------- */

function NavigationMenuItem({ className, children, ...rest }: NavigationMenuItemProps) {
  return (
    <BaseNavigationMenu.Item className={cx(styles.item, className)} {...rest}>
      {children}
    </BaseNavigationMenu.Item>
  );
}

/* ---------------------------------------------------------------------------
 * NavigationMenu.Trigger
 * --------------------------------------------------------------------------- */

function NavigationMenuTrigger({ className, children, ...rest }: NavigationMenuTriggerProps) {
  const { size } = React.useContext(NavigationMenuContext);
  return (
    <BaseNavigationMenu.Trigger
      className={cx(styles.trigger, sizeClass[size], className)}
      {...rest}
    >
      <span className={styles.triggerLabel}>{children}</span>
      <ChevronDownIcon />
    </BaseNavigationMenu.Trigger>
  );
}

/* ---------------------------------------------------------------------------
 * NavigationMenu.Content
 * --------------------------------------------------------------------------- */

/** True inside NavigationMenu.Content, so links there get panel styling. */
const NavigationMenuContentContext = React.createContext(false);

function NavigationMenuContent({ className, children, ...rest }: NavigationMenuContentProps) {
  return (
    <BaseNavigationMenu.Content className={cx(styles.content, className)} {...rest}>
      <NavigationMenuContentContext.Provider value>{children}</NavigationMenuContentContext.Provider>
    </BaseNavigationMenu.Content>
  );
}

/* ---------------------------------------------------------------------------
 * NavigationMenu.Link
 * --------------------------------------------------------------------------- */

/**
 * A link inside `NavigationMenu.Content` renders as a panel row; a top-level
 * link (directly in an Item) is styled like a Trigger. Pass `render` to use a
 * router link, e.g. `render={<RouterLink to="/about" />}`.
 */
function NavigationMenuLink({ className, children, ...rest }: NavigationMenuLinkProps) {
  const inContent = React.useContext(NavigationMenuContentContext);
  const { size } = React.useContext(NavigationMenuContext);
  return (
    <BaseNavigationMenu.Link
      className={cx(inContent ? styles.link : cx(styles.trigger, sizeClass[size]), className)}
      {...rest}
    >
      {children}
    </BaseNavigationMenu.Link>
  );
}

/* ---------------------------------------------------------------------------
 * Attach sub-components
 * --------------------------------------------------------------------------- */

NavigationMenu.List = NavigationMenuList;
NavigationMenu.Item = NavigationMenuItem;
NavigationMenu.Trigger = NavigationMenuTrigger;
NavigationMenu.Content = NavigationMenuContent;
NavigationMenu.Link = NavigationMenuLink;

export { BaseNavigationMenu as NavigationMenuPrimitive };
