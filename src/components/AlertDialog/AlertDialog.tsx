import * as React from 'react';
import { AlertDialog as BaseAlertDialog } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
import { Button } from '../Button';
import { useThemePortal } from '../shared/useThemePortal';
import styles from './alert-dialog.module.css';

type AlertDialogSize = 'small' | 'medium' | 'large';

const sizeClass: Record<AlertDialogSize, string> = {
  small: styles.sizeSmall,
  medium: styles.sizeMedium,
  large: styles.sizeLarge,
};

export interface AlertDialogProps extends BaseAlertDialog.Root.Props {
  /** Trigger element that opens the dialog. */
  children: React.ReactElement;
  /** Title shown at the top of the dialog. Required for accessibility. */
  title: React.ReactNode;
  /** Descriptive text below the title. */
  description?: React.ReactNode;
  /** Label for the cancel action. Default: 'Cancel' */
  cancelLabel?: string;
  /** Label for the confirm action. Default: 'Confirm' */
  confirmLabel?: string;
  /**
   * Called when the user confirms. The dialog closes automatically. If this
   * returns a promise, the dialog stays open with the confirm button in a
   * loading state until it resolves (it stays open if the promise rejects).
   */
  onConfirm?: () => void | Promise<unknown>;
  /** Called when the user cancels via the Cancel button or Escape. Dialog closes automatically. */
  onCancel?: () => void;
  /** Style the confirm button as a destructive (red) action. */
  danger?: boolean;
  /** Width preset. Default: 'small' */
  size?: AlertDialogSize;
}

export function AlertDialog({
  children,
  title,
  description,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  onConfirm,
  onCancel,
  danger = false,
  size = 'small',
  actionsRef: actionsRefProp,
  onOpenChange,
  ...rootProps
}: AlertDialogProps) {
  const { anchorRef: triggerAnchorRef, container: portalContainer, forcedAppearance } =
    useThemePortal<HTMLSpanElement>();
  const internalActionsRef = React.useRef<BaseAlertDialog.Root.Actions | null>(null);
  const actionsRef = actionsRefProp ?? internalActionsRef;
  const [pending, setPending] = React.useState(false);
  // Read synchronously by onOpenChange, which can fire before a re-render
  const pendingRef = React.useRef(false);

  const handleOpenChange: AlertDialogProps['onOpenChange'] = (open, eventDetails) => {
    // Don't let Escape dismiss the dialog mid-confirmation
    if (!open && pendingRef.current) {
      eventDetails.cancel();
      return;
    }
    if (!open && eventDetails.reason === 'escape-key') onCancel?.();
    onOpenChange?.(open, eventDetails);
  };

  const handleConfirm = async () => {
    const result = onConfirm?.();
    if (result && typeof (result as Promise<unknown>).then === 'function') {
      pendingRef.current = true;
      setPending(true);
      try {
        await result;
      } finally {
        pendingRef.current = false;
        setPending(false);
      }
    }
    actionsRef.current?.close();
  };

  return (
    <BaseAlertDialog.Root {...rootProps} actionsRef={actionsRef} onOpenChange={handleOpenChange}>
      <span ref={triggerAnchorRef} style={{ display: 'contents' }}>
        <BaseAlertDialog.Trigger render={children} />
      </span>
      <BaseAlertDialog.Portal container={portalContainer}>
        <div data-appearance={forcedAppearance}>
          <BaseAlertDialog.Backdrop className={styles.backdrop} />
          <BaseAlertDialog.Popup className={cx(styles.popup, sizeClass[size])}>
            <div className={styles.header}>
              <BaseAlertDialog.Title className={styles.title}>
                {title}
              </BaseAlertDialog.Title>
            </div>
            {description && (
              <BaseAlertDialog.Description className={styles.description}>
                {description}
              </BaseAlertDialog.Description>
            )}
            <div className={styles.footer}>
              <BaseAlertDialog.Close
                disabled={pending}
                render={
                  <Button variant="ghost" size="2" onClick={onCancel}>
                    {cancelLabel}
                  </Button>
                }
              />
              <Button
                variant="solid"
                size="2"
                color={danger ? 'red' : undefined}
                loading={pending}
                onClick={handleConfirm}
              >
                {confirmLabel}
              </Button>
            </div>
          </BaseAlertDialog.Popup>
        </div>
      </BaseAlertDialog.Portal>
    </BaseAlertDialog.Root>
  );
}

export { BaseAlertDialog as AlertDialogPrimitive };
