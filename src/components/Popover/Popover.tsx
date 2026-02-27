import * as React from 'react';
import { Popover as BasePopover } from '@base-ui/react';
import styles from './popover.module.css';

export interface PopoverProps extends Omit<BasePopover.Root.Props<unknown>, 'children'> {
  children: React.ReactElement;
  content: React.ReactNode;
  side?: BasePopover.Positioner.Props['side'];
  align?: BasePopover.Positioner.Props['align'];
  sideOffset?: BasePopover.Positioner.Props['sideOffset'];
  alignOffset?: BasePopover.Positioner.Props['alignOffset'];
  disableArrow?: boolean;
}

/**
 * Popover convenience wrapper built on Base UI primitives.
 * For advanced composition, use PopoverPrimitive parts directly.
 */
export function Popover({
  children,
  content,
  side = 'bottom',
  align = 'center',
  sideOffset = 8,
  alignOffset,
  disableArrow = false,
  ...rootProps
}: PopoverProps) {
  return (
    <BasePopover.Root {...rootProps}>
      <BasePopover.Trigger render={children} />
      <BasePopover.Portal>
        <BasePopover.Positioner side={side} align={align} sideOffset={sideOffset} alignOffset={alignOffset}>
          <BasePopover.Popup className={styles.popup}>
            {content}
            {!disableArrow && <BasePopover.Arrow className={styles.arrow} />}
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}

export { BasePopover as PopoverPrimitive };
