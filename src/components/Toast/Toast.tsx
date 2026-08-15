import * as React from 'react';
import { Toast as BaseToast } from '@base-ui/react';
import type { ToastManagerAddOptions, ToastObject } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
import { useTheme } from '../Theme';
import styles from './toast.module.css';

/**
 * Toast is an imperative notification system (à la Sonner / react-hot-toast),
 * not a per-usage widget: mount a single `<Toaster />` once near the app root,
 * then call `toast(...)` from anywhere — event handlers, effects, non-component
 * utility code — and it renders into that same `Toaster`'s viewport.
 *
 * This works because `toast` is bound to a single module-level manager created
 * via Base UI's `createToastManager()`, which is passed into every `Toaster`'s
 * `Toast.Provider` via the `toastManager` prop. Base UI's own state management
 * (queueing, auto-dismiss timers, swipe-to-dismiss, stacking order) does all
 * the work; this file only supplies the imperative call surface and styling.
 */

type ToastData = Record<string, unknown>;

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

/** Options accepted by `toast(...)`. Mirrors Base UI's `ToastObject` shape. */
export type ToastOptions = ToastManagerAddOptions<ToastData>;

const manager = BaseToast.createToastManager<ToastData>();

function addToast(options: ToastOptions): string {
  return manager.add(options);
}

function withVariant(type: ToastVariant) {
  return (options: Omit<ToastOptions, 'type'> | string): string => {
    const resolved = typeof options === 'string' ? { title: options } : options;
    return addToast({ ...resolved, type });
  };
}

/**
 * The imperative API. `toast({ title, description, type })` adds a toast to
 * whichever `<Toaster />` is mounted; `toast.success(...)` / `toast.error(...)`
 * / `toast.warning(...)` / `toast.info(...)` are shorthands that set `type`.
 * `toast.close`, `toast.update`, and `toast.promise` pass straight through to
 * Base UI's manager for dismissing, updating in place, or resolving a toast
 * from a promise's lifecycle.
 */
export const toast = Object.assign(addToast, {
  success: withVariant('success'),
  error: withVariant('error'),
  warning: withVariant('warning'),
  info: withVariant('info'),
  close: manager.close,
  update: manager.update,
  promise: manager.promise,
});

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
 * Compound parts — thin styled wrappers around Base UI's Toast primitives.
 * `Toaster` uses these for its default per-toast rendering; they're also
 * attached as statics (`Toaster.Title`, etc.) so a consumer passing a custom
 * `renderToast` can still reuse this library's styling instead of reaching
 * all the way down to `ToastPrimitive`.
 * --------------------------------------------------------------------------- */
export interface ToastTitleProps extends Omit<BaseToast.Title.Props, 'className'> {
  className?: string;
}
function ToastTitle({ className, ...props }: ToastTitleProps) {
  return <BaseToast.Title className={cx(styles.title, className)} {...props} />;
}

export interface ToastDescriptionProps extends Omit<BaseToast.Description.Props, 'className'> {
  className?: string;
}
function ToastDescription({ className, ...props }: ToastDescriptionProps) {
  return <BaseToast.Description className={cx(styles.description, className)} {...props} />;
}

export interface ToastActionProps extends Omit<BaseToast.Action.Props, 'className'> {
  className?: string;
}
function ToastAction({ className, ...props }: ToastActionProps) {
  return <BaseToast.Action className={cx(styles.action, className)} {...props} />;
}

export interface ToastCloseProps extends Omit<BaseToast.Close.Props, 'className'> {
  className?: string;
}
function ToastClose({ className, children, ...props }: ToastCloseProps) {
  return (
    <BaseToast.Close className={cx(styles.close, className)} aria-label="Close notification" {...props}>
      {children ?? <CloseIcon />}
    </BaseToast.Close>
  );
}

/** Default per-toast render: title, description, action (if any), close. */
function DefaultToastRender() {
  return (
    <BaseToast.Content className={styles.content}>
      <div className={styles.text}>
        <ToastTitle />
        <ToastDescription />
      </div>
      <ToastAction />
      <ToastClose />
    </BaseToast.Content>
  );
}

function ToastList({
  swipeDirection,
  renderToast,
}: {
  swipeDirection?: BaseToast.Root.Props['swipeDirection'];
  renderToast?: (toast: ToastObject<ToastData>) => React.ReactNode;
}) {
  const { toasts } = BaseToast.useToastManager();
  return (
    <>
      {toasts.map((t) => (
        <BaseToast.Root key={t.id} toast={t} swipeDirection={swipeDirection} className={styles.root}>
          {renderToast ? renderToast(t) : <DefaultToastRender />}
        </BaseToast.Root>
      ))}
    </>
  );
}

/* ---------------------------------------------------------------------------
 * Props
 * --------------------------------------------------------------------------- */
/**
 * Which screen corner/edge the viewport anchors to. The stack always grows
 * away from that edge (e.g. `bottom-*` toasts stack upward as more arrive;
 * `top-*` toasts stack downward).
 */
export type ToasterPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ToasterProps {
  /**
   * The maximum number of toasts visible at once. Toasts beyond this are
   * marked `limited` (hidden) rather than removed, so they animate back in
   * once room frees up. Default: 3
   */
  limit?: number;
  /**
   * Default time (in ms) before a toast auto-dismisses. A value of `0`
   * prevents auto-dismissal. An individual `toast(...)` call's own `timeout`
   * wins over this default. Default: 5000
   */
  timeout?: number;
  /** Direction(s) a toast can be swiped to dismiss. Default: ['down', 'right'] */
  swipeDirection?: BaseToast.Root.Props['swipeDirection'];
  /**
   * Which corner/edge of the screen the toast stack anchors to.
   * Default: `'bottom-center'` — chosen so it doesn't collide with other
   * bottom-right-anchored fixed UI a host page may already have.
   */
  position?: ToasterPosition;
  /**
   * Fully override the default title/description/action/close rendering for
   * every toast. Receives the toast object; return your own JSX (typically
   * built from the `Toaster.Title` / `Toaster.Description` / `Toaster.Action`
   * / `Toaster.Close` parts, or `ToastPrimitive` directly for full control).
   */
  renderToast?: (toast: ToastObject<ToastData>) => React.ReactNode;
}

/* ---------------------------------------------------------------------------
 * Toaster — mount once, typically inside `Theme`, near the app root.
 * --------------------------------------------------------------------------- */
export function Toaster({
  limit,
  timeout,
  swipeDirection,
  position = 'bottom-center',
  renderToast,
}: ToasterProps) {
  const { appearance } = useTheme();
  const anchorRef = React.useRef<HTMLSpanElement | null>(null);
  const [portalContainer, setPortalContainer] = React.useState<HTMLElement | null>(null);
  const forcedAppearance =
    appearance === 'dark' || appearance === 'light' ? appearance : undefined;

  React.useEffect(() => {
    const nearestThemeRoot =
      anchorRef.current?.closest<HTMLElement>('[data-accent-color]') ??
      document.querySelector<HTMLElement>('[data-accent-color]');
    setPortalContainer(nearestThemeRoot ?? null);
  }, []);

  return (
    <span ref={anchorRef} style={{ display: 'contents' }}>
      <BaseToast.Provider toastManager={manager} limit={limit} timeout={timeout}>
        <BaseToast.Portal container={portalContainer ?? undefined}>
          <div data-appearance={forcedAppearance}>
            <BaseToast.Viewport className={styles.viewport} data-position={position}>
              <ToastList swipeDirection={swipeDirection} renderToast={renderToast} />
            </BaseToast.Viewport>
          </div>
        </BaseToast.Portal>
      </BaseToast.Provider>
    </span>
  );
}

Toaster.Title = ToastTitle;
Toaster.Description = ToastDescription;
Toaster.Action = ToastAction;
Toaster.Close = ToastClose;

export { BaseToast as ToastPrimitive };
