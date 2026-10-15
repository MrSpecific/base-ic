import * as React from 'react';
import { Select as BaseSelect } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
import { useThemePortal } from '../shared/useThemePortal';
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

const popupRadiusMap: Record<SelectRadius, string> = {
  none: '0',
  small: 'var(--radius-2)',
  medium: 'var(--radius-3)',
  large: 'var(--radius-5)',
  // Keep popup radius constrained even when trigger is pill-shaped.
  full: 'var(--card-radius, var(--surface-radius))',
};

/* ---------------------------------------------------------------------------
 * Caret / chevron icon
 * --------------------------------------------------------------------------- */
function CaretIcon() {
  return (
    <svg
      width="1em"
      height="1em"
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
      width="1em"
      height="1em"
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

function inferItemLabel(children: React.ReactNode): string | undefined {
  const parts: string[] = [];
  const walk = (node: React.ReactNode) => {
    if (typeof node === 'string' || typeof node === 'number') {
      parts.push(String(node));
      return;
    }
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
      walk(node.props.children);
    }
  };
  walk(children);
  const label = parts.join('').trim();
  return label.length > 0 ? label : undefined;
}

interface SelectItemEntry {
  value: unknown;
  label: React.ReactNode;
}

/** Collects `{ value, label }` pairs from `Select.Item` children. */
function collectItemEntries(children: React.ReactNode): SelectItemEntry[] {
  const entries: SelectItemEntry[] = [];

  const walk = (node: React.ReactNode) => {
    if (node == null || typeof node === 'boolean') return;
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (!React.isValidElement<{ children?: React.ReactNode }>(node)) return;

    if (node.type === SelectItem) {
      const itemElement = node as React.ReactElement<SelectItemProps>;
      const value = itemElement.props.value;
      if (value !== undefined) {
        const label =
          itemElement.props.label ??
          inferItemLabel(itemElement.props.children) ??
          itemElement.props.children;
        entries.push({ value, label });
      }
      return;
    }

    if (node.props.children) {
      walk(node.props.children);
    }
  };

  walk(children);
  return entries;
}

/**
 * Builds a value → label lookup from any shape Base UI's `items` accepts
 * (record, `{ value, label }[]`, or grouped `{ items }[]`). Keyed by value
 * identity, so object values resolve too.
 */
function buildLabelMap(items: SelectProps['items'] | SelectItemEntry[]): Map<unknown, React.ReactNode> {
  const map = new Map<unknown, React.ReactNode>();
  if (!items) return map;
  if (!Array.isArray(items)) {
    for (const [value, label] of Object.entries(items)) map.set(value, label);
    return map;
  }
  for (const entry of items as ReadonlyArray<SelectItemEntry | { items: SelectItemEntry[] }>) {
    if ('items' in entry && Array.isArray(entry.items)) {
      for (const item of entry.items) map.set(item.value, item.label);
    } else {
      const item = entry as SelectItemEntry;
      map.set(item.value, item.label);
    }
  }
  return map;
}

function labelFor(value: unknown, labels: Map<unknown, React.ReactNode>): React.ReactNode {
  if (labels.has(value)) return labels.get(value);
  // Record-form `items` keys are strings; match numeric values against them
  if (labels.has(String(value))) return labels.get(String(value));
  return String(value);
}

function renderSelectedValue(
  value: unknown,
  labels: Map<unknown, React.ReactNode>,
  placeholder: string,
): React.ReactNode {
  // Treat '' as "nothing chosen" (common with form state) unless an item uses it
  if (value == null || (value === '' && !labels.has(''))) return placeholder;

  if (Array.isArray(value)) {
    if (value.length === 0) return placeholder;
    return value.map((entry, index) => (
      <React.Fragment key={index}>
        {index > 0 ? ', ' : null}
        {labelFor(entry, labels)}
      </React.Fragment>
    ));
  }

  return labelFor(value, labels);
}

/* ---------------------------------------------------------------------------
 * SelectRoot — top-level component
 * --------------------------------------------------------------------------- */

export interface SelectProps extends Omit<BaseSelect.Root.Props<unknown>, 'children'> {
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
  items,
  ...rootProps
}: SelectProps) {
  const triggerRadiusVar = radius
    ? ({ '--sel-radius': radiusMap[radius] } as React.CSSProperties)
    : undefined;
  const popupRadiusVar = radius
    ? ({ '--sel-popup-radius': popupRadiusMap[radius] } as React.CSSProperties)
    : undefined;
  const { anchorRef: triggerAnchorRef, container: portalContainer, forcedAppearance } =
    useThemePortal<HTMLSpanElement>();
  const derivedItems = React.useMemo(() => collectItemEntries(children), [children]);
  const resolvedItems = items ?? (derivedItems.length > 0 ? derivedItems : undefined);
  const labels = React.useMemo(() => buildLabelMap(resolvedItems), [resolvedItems]);

  return (
    <BaseSelect.Root items={resolvedItems} {...rootProps}>
      <span ref={triggerAnchorRef} style={{ display: 'contents' }}>
        <BaseSelect.Trigger
          className={cx(styles.trigger, sizeClass[size], triggerClassName)}
          style={triggerRadiusVar}
        >
          {triggerContent ?? (
            <BaseSelect.Value className={styles.value} placeholder={placeholder}>
              {(value) => renderSelectedValue(value, labels, placeholder)}
            </BaseSelect.Value>
          )}
          <BaseSelect.Icon className={styles.icon}>
            <CaretIcon />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>
      </span>

      <BaseSelect.Portal container={portalContainer}>
        <div data-appearance={forcedAppearance}>
          <BaseSelect.Positioner
            className={styles.positioner}
            alignItemWithTrigger={false}
            side={side}
            align={align}
            sideOffset={sideOffset}
          >
            <BaseSelect.Popup
              className={cx(styles.popup, sizeClass[size], popupClassName)}
              style={popupRadiusVar}
            >
              {children}
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </div>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}

/* ---------------------------------------------------------------------------
 * Select.Item
 * --------------------------------------------------------------------------- */

export interface SelectItemProps extends Omit<BaseSelect.Item.Props, 'render' | 'className'> {
  /** Item value (required). Any value works; objects are matched by identity. */
  value: BaseSelect.Item.Props['value'];
  /** Disable this item. */
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

function SelectItem({ value, disabled, className, children, label, ...rest }: SelectItemProps) {
  const resolvedLabel = label ?? inferItemLabel(children);
  return (
    <BaseSelect.Item
      value={value}
      label={resolvedLabel}
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

export interface SelectGroupProps extends Omit<BaseSelect.Group.Props, 'className' | 'children'> {
  /** Label displayed above the group. */
  label?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

function SelectGroup({ label, className, children, ...rest }: SelectGroupProps) {
  return (
    <BaseSelect.Group className={className} {...rest}>
      {label && <BaseSelect.GroupLabel className={styles.groupLabel}>{label}</BaseSelect.GroupLabel>}
      {children}
    </BaseSelect.Group>
  );
}

/* ---------------------------------------------------------------------------
 * Select.Separator
 * --------------------------------------------------------------------------- */

function SelectSeparator({ className }: { className?: string }) {
  return <BaseSelect.Separator className={cx(styles.separator, className)} />;
}

/* ---------------------------------------------------------------------------
 * Attach sub-components
 * --------------------------------------------------------------------------- */

Select.Item = SelectItem;
Select.Group = SelectGroup;
Select.Separator = SelectSeparator;

export { BaseSelect as SelectPrimitive };
