import * as React from 'react';
import { Tooltip as BaseTooltip } from '@base-ui/react';
import styles from './tooltip.module.css';

export interface TooltipProps extends Omit<BaseTooltip.Root.Props<unknown>, 'children'> {
  children: React.ReactElement;
  content: React.ReactNode;
  side?: BaseTooltip.Positioner.Props['side'];
  align?: BaseTooltip.Positioner.Props['align'];
  sideOffset?: BaseTooltip.Positioner.Props['sideOffset'];
  alignOffset?: BaseTooltip.Positioner.Props['alignOffset'];
  delay?: BaseTooltip.Trigger.Props['delay'];
  closeDelay?: BaseTooltip.Trigger.Props['closeDelay'];
  disableArrow?: boolean;
}

/**
 * Tooltip convenience wrapper built on Base UI primitives.
 * For advanced control, use TooltipPrimitive parts directly.
 */
export function Tooltip({
  children,
  content,
  side = 'top',
  align = 'center',
  sideOffset = 8,
  alignOffset,
  delay,
  closeDelay,
  disableArrow = false,
  ...rootProps
}: TooltipProps) {
  return (
    <BaseTooltip.Root {...rootProps}>
      <BaseTooltip.Trigger delay={delay} closeDelay={closeDelay} render={children} />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner side={side} align={align} sideOffset={sideOffset} alignOffset={alignOffset}>
          <BaseTooltip.Popup className={styles.popup}>
            {content}
            {!disableArrow && <BaseTooltip.Arrow className={styles.arrow} />}
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}

export { BaseTooltip as TooltipPrimitive };
