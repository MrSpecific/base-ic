import * as React from 'react';
import { Select as BaseSelect } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
import styles from './select.module.css';

type SelectSize = '1' | '2' | '3' | '4';
type SelectRadius = 'none' | 'small' | 'medium' | 'large' | 'full';

const sizeClass: Record<SelectSize, string> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
  '4': styles.size4,
};

const radiusMap: Record<SelectRadius, string> = {
  none: '0',
  small: 'var(--radius-2)',
  medium: 'var(--radius-3)',
  large: 'var(--radius-5)',
  full: 'var(--radius-full)',
};

/* ---------------------------------------------------------------------------
 * Caret / chevron icon
 * --------------------------------------------------------------------------- */
function CaretIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
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
 * Check icon (for selected item indicator)
 * --------------------------------------------------------------------------- */
function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
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

/* ---------------------------------------------------------------------------
 * SelectRoot — top-level component
 * --------------------------------------------------------------------------- */

export interface SelectProps extends Omit<BaseSelect.Root.Props, 'children'> {
  /** Visual size for trigger + items. Default: '2' */
  size?: SelectSize;
  /** Override the border-radius of trigger and popup. */
  radius?: SelectRadius;
  /** Placeholder shown when no value is selected. */
  placeholder?: string;
  /** Items to render (use Select.Item, Select.Group, etc.). */
  children: React.ReactNode;
  /** Content to display in the trigger (overrides Value rendering). */
  triggerContent?: React.ReactNode;
  /** Additional className on the trigger. */
  triggerClassName?: string;
  /** Additional className on the popup. */
  popupClassName?: string;
  /** Side the popup appears on. Default: 'bottom' */
  side?: BaseSelect.Positioner.Props['side'];
  /** Alignment. Default: 'start' */
  align?: BaseSelect.Positioner.Props['align'];
  /** Offset from trigger. Default: 4 */
  sideOffset?: BaseSelect.Positioner.Props['sideOffset'];
}

export function Select({
  size = '2',
  radius,
  placeholder = 'Select…',
  children,
  triggerContent,
  triggerClassName,
  popupClassName,
  side = 'bottom',
  align = 'start',
  sideOffset = 4,
  ...rootProps
}: SelectProps) {
  const radiusVar = radius
    ? ({ '--sel-radius': radiusMap[radius] } as React.CSSProperties)
    : undefined;

  return (
    <BaseSelect.Root {...rootProps}>
      <BaseSelect.Trigger
        className={cx(styles.trigger, sizeClass[size], triggerClassName)}
        style={radiusVar}
      >
        {triggerContent ?? (
          <BaseSelect.Value className={styles.value} placeholder={placeholder} />
        )}
        <BaseSelect.Icon className={styles.icon}>
          <CaretIcon />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>

      <BaseSelect.Portal>
        <BaseSelect.Positioner
          className={styles.positioner}
          side={side}
          align={align}
          sideOffset={sideOffset}
        >
          <BaseSelect.Popup
            className={cx(styles.popup, sizeClass[size], popupClassName)}
            style={radiusVar}
          >
            {children}
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}

/* ---------------------------------------------------------------------------
 * Select.Item
 * --------------------------------------------------------------------------- */

export interface SelectItemProps extends Omit<BaseSelect.Item.Props, 'render' | 'className'> {
  /** Item value (required). */
  value: string;
  /** Disable this item. */
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

function SelectItem({ value, disabled, className, children, ...rest }: SelectItemProps) {
  return (
    <BaseSelect.Item
      value={value}
      disabled={disabled}
      className={cx(styles.item, className)}
      {...rest}
    >
      <BaseSelect.ItemIndicator className={styles.itemIndicator}>
        <CheckIcon />
      </BaseSelect.ItemIndicator>
      <BaseSelect.ItemText className={styles.itemText}>{children}</BaseSelect.ItemText>
    </BaseSelect.Item>
  );
}

/* ---------------------------------------------------------------------------
 * Select.Group
 * --------------------------------------------------------------------------- */

export interface SelectGroupProps {
  /** Label displayed above the group. */
  label?: React.ReactNode;
  children: React.ReactNode;
}

function SelectGroup({ label, children }: SelectGroupProps) {
  return (
    <BaseSelect.Group>
      {label && <BaseSelect.GroupLabel className={styles.groupLabel}>{label}</BaseSelect.GroupLabel>}
      {children}
    </BaseSelect.Group>
  );
}

/* ---------------------------------------------------------------------------
 * Select.Separator
 * --------------------------------------------------------------------------- */

function SelectSeparator() {
  return <BaseSelect.SeparatorItem className={styles.separator} />;
}

/* ---------------------------------------------------------------------------
 * Attach sub-components
 * --------------------------------------------------------------------------- */

Select.Item = SelectItem;
Select.Group = SelectGroup;
Select.Separator = SelectSeparator;
