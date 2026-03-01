import * as React from 'react';
import { Select as BaseSelect } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
import { useTheme } from '../Theme';
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

function collectItemLabels(children: React.ReactNode): Record<string, React.ReactNode> {
  const labels: Record<string, React.ReactNode> = {};

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
      if (value != null) {
        const label =
          itemElement.props.label ??
          inferItemLabel(itemElement.props.children) ??
          itemElement.props.children;
        labels[String(value)] = label;
      }
      return;
    }

    if (node.props.children) {
      walk(node.props.children);
    }
  };

  walk(children);
  return labels;
}

function renderSelectedValue(
  value: unknown,
  labels: Record<string, React.ReactNode>,
  placeholder: string,
): React.ReactNode {
  if (value == null) return placeholder;

  if (Array.isArray(value)) {
    if (value.length === 0) return placeholder;
    return value.map((entry, index) => (
      <React.Fragment key={`${String(entry)}-${index}`}>
        {index > 0 ? ', ' : null}
        {labels[String(entry)] ?? String(entry)}
      </React.Fragment>
    ));
  }

  return labels[String(value)] ?? String(value);
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
  const { appearance } = useTheme();
  const triggerRadiusVar = radius
    ? ({ '--sel-radius': radiusMap[radius] } as React.CSSProperties)
    : undefined;
  const popupRadiusVar = radius
    ? ({ '--sel-popup-radius': popupRadiusMap[radius] } as React.CSSProperties)
    : undefined;
  const triggerAnchorRef = React.useRef<HTMLSpanElement | null>(null);
  const [portalContainer, setPortalContainer] = React.useState<HTMLElement | null>(null);
  const derivedItems = React.useMemo(() => collectItemLabels(children), [children]);
  const resolvedItems =
    items ??
    (Object.keys(derivedItems).length > 0 ? derivedItems : undefined);
  const forcedAppearance =
    appearance === 'dark' || appearance === 'light' ? appearance : undefined;

  React.useEffect(() => {
    const nearestThemeRoot =
      triggerAnchorRef.current?.closest<HTMLElement>('[data-accent-color]') ??
      document.querySelector<HTMLElement>('[data-accent-color]');
    setPortalContainer(nearestThemeRoot ?? null);
  }, []);

  return (
    <BaseSelect.Root items={resolvedItems} {...rootProps}>
      <span ref={triggerAnchorRef} style={{ display: 'contents' }}>
        <BaseSelect.Trigger
          className={cx(styles.trigger, sizeClass[size], triggerClassName)}
          style={triggerRadiusVar}
        >
          {triggerContent ?? (
            <BaseSelect.Value className={styles.value} placeholder={placeholder}>
              {(value) => renderSelectedValue(value, derivedItems, placeholder)}
            </BaseSelect.Value>
          )}
          <BaseSelect.Icon className={styles.icon}>
            <CaretIcon />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>
      </span>

      <BaseSelect.Portal container={portalContainer ?? undefined}>
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
  /** Item value (required). */
  value: string;
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
  return <BaseSelect.Separator className={styles.separator} />;
}

/* ---------------------------------------------------------------------------
 * Attach sub-components
 * --------------------------------------------------------------------------- */

Select.Item = SelectItem;
Select.Group = SelectGroup;
Select.Separator = SelectSeparator;
