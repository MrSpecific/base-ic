import * as React from 'react';
import { Dialog as BaseDialog } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
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
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
  const hasHeader = title || showClose;

  return (
    <BaseDialog.Root {...rootProps}>
      <BaseDialog.Trigger render={children} />
      <BaseDialog.Portal>
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
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}

export { BaseDialog as DialogPrimitive };
