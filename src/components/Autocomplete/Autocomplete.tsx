import * as React from 'react';
import { Autocomplete as BaseAutocomplete } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
import { useTheme } from '../Theme';
import styles from './autocomplete.module.css';

type AutocompleteSize = '1' | '2' | '3' | '4';
type AutocompleteRadius = 'none' | 'small' | 'medium' | 'large' | 'full';

const sizeClass: Record<AutocompleteSize, string> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
  '4': styles.size4,
};

const radiusMap: Record<AutocompleteRadius, string> = {
  none: '0',
  small: 'var(--radius-2)',
  medium: 'var(--radius-3)',
  large: 'var(--radius-5)',
  full: 'var(--radius-full)',
};

const popupRadiusMap: Record<AutocompleteRadius, string> = {
  none: '0',
  small: 'var(--radius-2)',
  medium: 'var(--radius-3)',
  large: 'var(--radius-5)',
  // Keep popup radius constrained even when the input is pill-shaped.
  full: 'var(--card-radius, var(--surface-radius))',
};

/* ---------------------------------------------------------------------------
 * Clear ("x") icon
 * --------------------------------------------------------------------------- */
function ClearIcon() {
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
        d="M2.5 2.5L9.5 9.5M9.5 2.5L2.5 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
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

/* ---------------------------------------------------------------------------
 * Public data shapes for the `items` prop
 * --------------------------------------------------------------------------- */

export interface AutocompleteItemData {
  /** Stable identifier used for filtering/selection. */
  value: string;
  /** Display label. Defaults to `value` when omitted. */
  label?: React.ReactNode;
  disabled?: boolean;
}

export interface AutocompleteGroupData {
  label: React.ReactNode;
  items: AutocompleteItemData[];
}

export type AutocompleteItems = AutocompleteItemData[] | AutocompleteGroupData[];

interface ResolvedItemsData {
  labels: Record<string, React.ReactNode>;
  items?: string[];
  groups?: Array<{ label: React.ReactNode; items: string[] }>;
}

function isGroupedItems(list: AutocompleteItems): list is AutocompleteGroupData[] {
  return list.length > 0 && typeof list[0] === 'object' && list[0] !== null && 'items' in list[0];
}

function normalizeExplicitItems(items: AutocompleteItems): ResolvedItemsData {
  const labels: Record<string, React.ReactNode> = {};

  if (isGroupedItems(items)) {
    const groups = items.map((group) => ({
      label: group.label,
      items: group.items.map((item) => {
        labels[item.value] = item.label ?? item.value;
        return item.value;
      }),
    }));
    return { labels, groups };
  }

  const flatItems = items.map((item) => {
    labels[item.value] = item.label ?? item.value;
    return item.value;
  });
  return { labels, items: flatItems };
}

/**
 * Walks `Autocomplete.Item` / `Autocomplete.Group` children (Select-style DX)
 * and derives the same shape `normalizeExplicitItems` produces from an
 * explicit `items` prop. Values/labels are read directly off the elements'
 * props — the elements themselves are never mounted, since Base UI's
 * Autocomplete requires a data-driven `items` array (+ `List` render-prop) to
 * power its input-filtering, unlike `Select`'s always-visible static list.
 */
function collectItemsFromChildren(children: React.ReactNode): ResolvedItemsData {
  const labels: Record<string, React.ReactNode> = {};
  const flatItems: string[] = [];
  const groups: Array<{ label: React.ReactNode; items: string[] }> = [];
  let hasTopLevelGroup = false;

  const recordItem = (node: React.ReactElement<AutocompleteItemProps>): string | undefined => {
    const { value, label, children: itemChildren } = node.props;
    if (value == null) return undefined;
    const key = String(value);
    labels[key] = label ?? inferItemLabel(itemChildren) ?? itemChildren;
    return key;
  };

  const walkForItems = (node: React.ReactNode, into: string[]) => {
    if (node == null || typeof node === 'boolean') return;
    if (Array.isArray(node)) {
      node.forEach((child) => walkForItems(child, into));
      return;
    }
    if (!React.isValidElement<{ children?: React.ReactNode }>(node)) return;
    if (node.type === AutocompleteItem) {
      const key = recordItem(node as React.ReactElement<AutocompleteItemProps>);
      if (key != null) into.push(key);
      return;
    }
    if (node.props.children) walkForItems(node.props.children, into);
  };

  const walkTop = (node: React.ReactNode) => {
    if (node == null || typeof node === 'boolean') return;
    if (Array.isArray(node)) {
      node.forEach(walkTop);
      return;
    }
    if (!React.isValidElement<{ children?: React.ReactNode }>(node)) return;

    if (node.type === AutocompleteGroup) {
      hasTopLevelGroup = true;
      const groupProps = node.props as AutocompleteGroupProps;
      const groupItems: string[] = [];
      walkForItems(groupProps.children, groupItems);
      groups.push({ label: groupProps.label, items: groupItems });
      return;
    }

    if (node.type === AutocompleteItem) {
      const key = recordItem(node as React.ReactElement<AutocompleteItemProps>);
      if (key != null) flatItems.push(key);
      return;
    }

    if (node.props.children) walkTop(node.props.children);
  };

  walkTop(children);

  return {
    labels,
    items: !hasTopLevelGroup && flatItems.length > 0 ? flatItems : undefined,
    groups: hasTopLevelGroup && groups.length > 0 ? groups : undefined,
  };
}

/* ---------------------------------------------------------------------------
 * AutocompleteRoot — top-level component
 * --------------------------------------------------------------------------- */

export interface AutocompleteProps
  extends Omit<
    BaseAutocomplete.Root.Props<string>,
    'children' | 'items' | 'itemToStringValue'
  > {
  /** Visual size for input + items. Default: '2' */
  size?: AutocompleteSize;
  /** Override the border-radius of input and popup. */
  radius?: AutocompleteRadius;
  /** Placeholder shown in the input when empty. */
  placeholder?: string;
  /**
   * Explicit value/label collection. When omitted, items are derived from
   * `Autocomplete.Item` / `Autocomplete.Group` children instead.
   */
  items?: AutocompleteItems;
  /** Items to derive from (use Autocomplete.Item, Autocomplete.Group). Ignored if `items` is provided. */
  children?: React.ReactNode;
  /** Shows a clear ("x") button once the input has text. Default: false */
  clearable?: boolean;
  /** Content shown when no items match the current input. */
  emptyMessage?: React.ReactNode;
  /** Additional className on the input group wrapper. */
  inputGroupClassName?: string;
  /** Additional className on the input element. */
  inputClassName?: string;
  /** Additional className on the popup. */
  popupClassName?: string;
  /** Side the popup appears on. Default: 'bottom' */
  side?: BaseAutocomplete.Positioner.Props['side'];
  /** Alignment. Default: 'start' */
  align?: BaseAutocomplete.Positioner.Props['align'];
  /** Offset from the input. Default: 4 */
  sideOffset?: BaseAutocomplete.Positioner.Props['sideOffset'];
}

export function Autocomplete({
  size = '2',
  radius,
  placeholder = 'Search…',
  items,
  children,
  clearable = false,
  emptyMessage = 'No results found.',
  inputGroupClassName,
  inputClassName,
  popupClassName,
  side = 'bottom',
  align = 'start',
  sideOffset = 4,
  openOnInputClick = true,
  ...rootProps
}: AutocompleteProps) {
  const { appearance } = useTheme();
  const inputRadiusVar = radius
    ? ({ '--auto-radius': radiusMap[radius] } as React.CSSProperties)
    : undefined;
  const popupRadiusVar = radius
    ? ({ '--auto-popup-radius': popupRadiusMap[radius] } as React.CSSProperties)
    : undefined;
  const anchorRef = React.useRef<HTMLSpanElement | null>(null);
  const [portalContainer, setPortalContainer] = React.useState<HTMLElement | null>(null);
  const forcedAppearance =
    appearance === 'dark' || appearance === 'light' ? appearance : undefined;

  const resolved = React.useMemo<ResolvedItemsData>(
    () => (items ? normalizeExplicitItems(items) : collectItemsFromChildren(children)),
    [items, children],
  );
  const { labels, items: flatItems, groups } = resolved;
  const isGrouped = !!groups && groups.length > 0;
  const rootItems = isGrouped ? groups : flatItems ?? [];

  const itemToStringValue = React.useCallback(
    (value: string) => {
      const label = labels[value];
      if (typeof label === 'string') return label;
      return inferItemLabel(label) ?? value;
    },
    [labels],
  );

  React.useEffect(() => {
    const nearestThemeRoot =
      anchorRef.current?.closest<HTMLElement>('[data-accent-color]') ??
      document.querySelector<HTMLElement>('[data-accent-color]');
    setPortalContainer(nearestThemeRoot ?? null);
  }, []);

  return (
    <BaseAutocomplete.Root
      items={rootItems as string[]}
      itemToStringValue={itemToStringValue}
      openOnInputClick={openOnInputClick}
      {...rootProps}
    >
      <span ref={anchorRef} style={{ display: 'contents' }}>
        <BaseAutocomplete.InputGroup
          className={cx(styles.inputGroup, sizeClass[size], inputGroupClassName)}
          style={inputRadiusVar}
        >
          <BaseAutocomplete.Input
            className={cx(styles.input, inputClassName)}
            placeholder={placeholder}
          />
          {clearable && (
            <BaseAutocomplete.Clear className={styles.clear} aria-label="Clear">
              <ClearIcon />
            </BaseAutocomplete.Clear>
          )}
        </BaseAutocomplete.InputGroup>
      </span>

      <BaseAutocomplete.Portal container={portalContainer ?? undefined}>
        <div data-appearance={forcedAppearance}>
          <BaseAutocomplete.Positioner
            className={styles.positioner}
            side={side}
            align={align}
            sideOffset={sideOffset}
          >
            <BaseAutocomplete.Popup
              className={cx(styles.popup, sizeClass[size], popupClassName)}
              style={popupRadiusVar}
            >
              <BaseAutocomplete.Empty className={styles.empty}>{emptyMessage}</BaseAutocomplete.Empty>
              <BaseAutocomplete.List>
                {isGrouped
                  ? (group: { label: React.ReactNode; items: string[] }) => (
                      <BaseAutocomplete.Group
                        key={String(group.label)}
                        items={group.items}
                        className={styles.group}
                      >
                        <BaseAutocomplete.GroupLabel className={styles.groupLabel}>
                          {group.label}
                        </BaseAutocomplete.GroupLabel>
                        <BaseAutocomplete.Collection>
                          {(value: string) => (
                            <AutocompleteItem key={value} value={value}>
                              {labels[value] ?? value}
                            </AutocompleteItem>
                          )}
                        </BaseAutocomplete.Collection>
                      </BaseAutocomplete.Group>
                    )
                  : (value: string) => (
                      <AutocompleteItem key={value} value={value}>
                        {labels[value] ?? value}
                      </AutocompleteItem>
                    )}
              </BaseAutocomplete.List>
            </BaseAutocomplete.Popup>
          </BaseAutocomplete.Positioner>
        </div>
      </BaseAutocomplete.Portal>
    </BaseAutocomplete.Root>
  );
}

/* ---------------------------------------------------------------------------
 * Autocomplete.Item
 * --------------------------------------------------------------------------- */

export interface AutocompleteItemProps
  extends Omit<BaseAutocomplete.Item.Props, 'render' | 'className' | 'value'> {
  /** Item value (required). */
  value: string;
  /** Explicit label override (defaults to inferred text content). */
  label?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

function AutocompleteItem({ value, disabled, className, children, ...rest }: AutocompleteItemProps) {
  return (
    <BaseAutocomplete.Item
      value={value}
      disabled={disabled}
      className={cx(styles.item, className)}
      {...rest}
    >
      {children}
    </BaseAutocomplete.Item>
  );
}

/* ---------------------------------------------------------------------------
 * Autocomplete.Group
 * --------------------------------------------------------------------------- */

export interface AutocompleteGroupProps {
  /** Label displayed above the group. */
  label?: React.ReactNode;
  children: React.ReactNode;
}

function AutocompleteGroup({ label, children }: AutocompleteGroupProps) {
  return (
    <BaseAutocomplete.Group>
      {label && (
        <BaseAutocomplete.GroupLabel className={styles.groupLabel}>{label}</BaseAutocomplete.GroupLabel>
      )}
      {children}
    </BaseAutocomplete.Group>
  );
}

/* ---------------------------------------------------------------------------
 * Autocomplete.Separator
 * --------------------------------------------------------------------------- */

function AutocompleteSeparator() {
  return <BaseAutocomplete.Separator className={styles.separator} />;
}

/* ---------------------------------------------------------------------------
 * Autocomplete.Empty — "no results" state (Combobox's shared Empty part)
 * --------------------------------------------------------------------------- */

function AutocompleteEmpty({
  className,
  ...rest
}: Omit<BaseAutocomplete.Empty.Props, 'className'> & { className?: string }) {
  return <BaseAutocomplete.Empty className={cx(styles.empty, className)} {...rest} />;
}

/* ---------------------------------------------------------------------------
 * Attach sub-components
 * --------------------------------------------------------------------------- */

Autocomplete.Item = AutocompleteItem;
Autocomplete.Group = AutocompleteGroup;
Autocomplete.Separator = AutocompleteSeparator;
Autocomplete.Empty = AutocompleteEmpty;

export { BaseAutocomplete as AutocompletePrimitive };
