import * as React from 'react';
import { Collapsible as BaseCollapsible } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
import styles from './collapsible.module.css';

/* ---------------------------------------------------------------------------
 * Types
 * --------------------------------------------------------------------------- */

type CollapsibleSize = '1' | '2' | '3';
type CollapsibleVariant = 'outline' | 'surface' | 'ghost';

const sizeClass: Record<CollapsibleSize, string> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
};

const variantClass: Record<CollapsibleVariant, string> = {
  outline: styles.variantOutline,
  surface: styles.variantSurface,
  ghost: styles.variantGhost,
};

export interface CollapsibleProps
  extends Omit<BaseCollapsible.Root.Props, 'className' | 'style'> {
  /** Visual variant. Default: 'outline' */
  variant?: CollapsibleVariant;
  /** Size scale. Default: '2' */
  size?: CollapsibleSize;
  className?: string;
  style?: React.CSSProperties;
}

export interface CollapsibleTriggerProps
  extends Omit<BaseCollapsible.Trigger.Props, 'className'> {
  className?: string;
}

export interface CollapsibleContentProps
  extends Omit<BaseCollapsible.Panel.Props, 'className'> {
  className?: string;
  children: React.ReactNode;
}

/* ---------------------------------------------------------------------------
 * Icons
 * --------------------------------------------------------------------------- */

function ChevronIcon() {
  return (
    <svg
      className={styles.chevron}
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
 * Collapsible root
 * --------------------------------------------------------------------------- */

export function Collapsible({
  variant = 'outline',
  size = '2',
  className,
  style,
  children,
  ...rest
}: CollapsibleProps) {
  return (
    <BaseCollapsible.Root
      className={cx(styles.root, variantClass[variant], sizeClass[size], className)}
      style={style}
      {...rest}
    >
      {children}
    </BaseCollapsible.Root>
  );
}

/* ---------------------------------------------------------------------------
 * Collapsible.Trigger
 * --------------------------------------------------------------------------- */

function CollapsibleTrigger({ className, children, ...rest }: CollapsibleTriggerProps) {
  return (
    <BaseCollapsible.Trigger className={cx(styles.trigger, className)} {...rest}>
      <span className={styles.triggerLabel}>{children}</span>
      <ChevronIcon />
    </BaseCollapsible.Trigger>
  );
}

/* ---------------------------------------------------------------------------
 * Collapsible.Content
 * --------------------------------------------------------------------------- */

function CollapsibleContent({ className, children, ...rest }: CollapsibleContentProps) {
  return (
    <BaseCollapsible.Panel className={cx(styles.panel, className)} {...rest}>
      <div className={styles.panelInner}>{children}</div>
    </BaseCollapsible.Panel>
  );
}

/* ---------------------------------------------------------------------------
 * Attach sub-components
 * --------------------------------------------------------------------------- */

Collapsible.Trigger = CollapsibleTrigger;
Collapsible.Content = CollapsibleContent;

export { BaseCollapsible as CollapsiblePrimitive };
