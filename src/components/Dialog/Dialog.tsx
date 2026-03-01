import * as React from 'react';
import { Dialog as BaseDialog } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
import { useTheme } from '../Theme';
import styles from './dialog.module.css';

type DialogSize = 'small' | 'medium' | 'large' | 'full';

const sizeClass: Record<DialogSize, string> = {
  small: styles.sizeSmall,
  medium: styles.sizeMedium,
  large: styles.sizeLarge,
  full: styles.sizeFull,
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
export interface DialogProps extends BaseDialog.Root.Props {
  /** Trigger element that opens the dialog. */
  children: React.ReactElement;
  /** The dialog's body content (rendered inside the popup). */
  content: React.ReactNode;
  /** Short title shown at the top of the dialog. */
  title?: React.ReactNode;
  /** Descriptive text beneath the title. */
  description?: React.ReactNode;
  /** Footer content (usually action buttons). */
  footer?: React.ReactNode;
  /** Whether to show an X close button in the header. Default: true */
  showClose?: boolean;
  /** Width preset. Default: 'medium' */
  size?: DialogSize;
}

/* ---------------------------------------------------------------------------
 * Dialog
 * --------------------------------------------------------------------------- */
export function Dialog({
  children,
  content,
  title,
  description,
  footer,
  showClose = true,
  size = 'medium',
  ...rootProps
}: DialogProps) {
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
    <BaseDialog.Root {...rootProps}>
      <span ref={triggerAnchorRef} style={{ display: 'contents' }}>
        <BaseDialog.Trigger render={children} />
      </span>
      <BaseDialog.Portal container={portalContainer ?? undefined}>
        <div data-appearance={forcedAppearance}>
          <BaseDialog.Backdrop className={styles.backdrop} />
          <BaseDialog.Popup className={cx(styles.popup, sizeClass[size])}>
            {hasHeader && (
              <div className={styles.header}>
                {title && (
                  <BaseDialog.Title className={styles.title}>{title}</BaseDialog.Title>
                )}
                {showClose && (
                  <BaseDialog.Close className={styles.closeButton} aria-label="Close dialog">
                    <CloseIcon />
                  </BaseDialog.Close>
                )}
              </div>
            )}
            {description && (
              <BaseDialog.Description className={styles.description}>
                {description}
              </BaseDialog.Description>
            )}
            {content}
            {footer && <div className={styles.footer}>{footer}</div>}
          </BaseDialog.Popup>
        </div>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}

export { BaseDialog as DialogPrimitive };
