import * as React from 'react';
import { AlertDialog as BaseAlertDialog } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
import { Button } from '../Button';
import { useTheme } from '../Theme';
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
  /** Called when the user confirms. Dialog closes automatically. */
  onConfirm?: () => void;
  /** Called when the user cancels. Dialog closes automatically. */
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
  ...rootProps
}: AlertDialogProps) {
  const { appearance } = useTheme();
  const forcedAppearance =
    appearance === 'dark' || appearance === 'light' ? appearance : undefined;
  const triggerAnchorRef = React.useRef<HTMLSpanElement | null>(null);
  const [portalContainer, setPortalContainer] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    const nearestThemeRoot =
      triggerAnchorRef.current?.closest<HTMLElement>('[data-accent-color]') ??
      document.querySelector<HTMLElement>('[data-accent-color]');
    setPortalContainer(nearestThemeRoot ?? null);
  }, []);

  return (
    <BaseAlertDialog.Root {...rootProps}>
      <span ref={triggerAnchorRef} style={{ display: 'contents' }}>
        <BaseAlertDialog.Trigger render={children} />
      </span>
      <BaseAlertDialog.Portal container={portalContainer ?? undefined}>
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
                render={
                  <Button variant="ghost" size="2" onClick={onCancel}>
                    {cancelLabel}
                  </Button>
                }
              />
              <BaseAlertDialog.Close
                render={
                  <Button
                    variant="solid"
                    size="2"
                    color={danger ? 'red' : undefined}
                    onClick={onConfirm}
                  >
                    {confirmLabel}
                  </Button>
                }
              />
            </div>
          </BaseAlertDialog.Popup>
        </div>
      </BaseAlertDialog.Portal>
    </BaseAlertDialog.Root>
  );
}

export { BaseAlertDialog as AlertDialogPrimitive };
