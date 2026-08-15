import * as React from 'react';
import { Drawer as BaseDrawer } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
import { useTheme } from '../Theme';
import styles from './drawer.module.css';

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';

const sideClass: Record<DrawerSide, string> = {
  left: styles.sideLeft,
  right: styles.sideRight,
  top: styles.sideTop,
  bottom: styles.sideBottom,
};

/**
 * Base UI's `swipeDirection` describes the swipe-to-dismiss gesture axis
 * ('up' | 'down' | 'left' | 'right'), not the CSS-facing edge the panel is
 * anchored to. We derive it from `side` so swipe-to-dismiss naturally
 * matches whichever edge the drawer slides toward.
 */
const swipeDirectionForSide: Record<DrawerSide, 'up' | 'down' | 'left' | 'right'> = {
  left: 'left',
  right: 'right',
  top: 'up',
  bottom: 'down',
};

/* ---------------------------------------------------------------------------
 * CloseIcon SVG
 * --------------------------------------------------------------------------- */
function CloseIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 4L12 12M4 12L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ---------------------------------------------------------------------------
 * Props
 * --------------------------------------------------------------------------- */
export interface DrawerProps extends BaseDrawer.Root.Props {
  /** Trigger element that opens the drawer. */
  children: React.ReactElement;
  /** The drawer's body content (rendered inside the popup). */
  content: React.ReactNode;
  /** Short title shown at the top of the drawer. */
  title?: React.ReactNode;
  /** Descriptive text beneath the title. */
  description?: React.ReactNode;
  /** Footer content (usually action buttons). */
  footer?: React.ReactNode;
  /** Whether to show an X close button in the header. Default: true */
  showClose?: boolean;
  /** Screen edge the drawer slides in from. Default: 'right' */
  side?: DrawerSide;
}

/* ---------------------------------------------------------------------------
 * Drawer
 * --------------------------------------------------------------------------- */
export function Drawer({
  children,
  content,
  title,
  description,
  footer,
  showClose = true,
  side = 'right',
  ...rootProps
}: DrawerProps) {
  const { appearance } = useTheme();
  const hasHeader = title || showClose;
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
    <BaseDrawer.Root swipeDirection={swipeDirectionForSide[side]} {...rootProps}>
      <span ref={triggerAnchorRef} style={{ display: 'contents' }}>
        <BaseDrawer.Trigger render={children} />
      </span>
      <BaseDrawer.Portal container={portalContainer ?? undefined}>
        <div data-appearance={forcedAppearance}>
          <BaseDrawer.Backdrop className={styles.backdrop} />
          <BaseDrawer.Viewport className={styles.viewport}>
            <BaseDrawer.Popup className={cx(styles.popup, sideClass[side])}>
              {hasHeader && (
                <div className={styles.header}>
                  {title && (
                    <BaseDrawer.Title className={styles.title}>{title}</BaseDrawer.Title>
                  )}
                  {showClose && (
                    <BaseDrawer.Close className={styles.closeButton} aria-label="Close drawer">
                      <CloseIcon />
                    </BaseDrawer.Close>
                  )}
                </div>
              )}
              {description && (
                <BaseDrawer.Description className={styles.description}>
                  {description}
                </BaseDrawer.Description>
              )}
              {content}
              {footer && <div className={styles.footer}>{footer}</div>}
            </BaseDrawer.Popup>
          </BaseDrawer.Viewport>
        </div>
      </BaseDrawer.Portal>
    </BaseDrawer.Root>
  );
}

/* ---------------------------------------------------------------------------
 * Drawer.SwipeArea — invisible edge-swipe-to-open gesture catcher.
 * Headless by design (no default visuals); power users position and size it
 * themselves. For anything more advanced (imperative handles, snap points),
 * reach for `DrawerPrimitive` directly.
 * --------------------------------------------------------------------------- */
Drawer.SwipeArea = BaseDrawer.SwipeArea;

export { BaseDrawer as DrawerPrimitive };
