import * as React from 'react';
import { Accordion as BaseAccordion } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
import styles from './accordion.module.css';

type AccordionSize = '1' | '2' | '3';
type AccordionVariant = 'outline' | 'surface' | 'ghost';

interface AccordionCtx {
  variant: AccordionVariant;
  size: AccordionSize;
}

const AccordionContext = React.createContext<AccordionCtx>({
  variant: 'outline',
  size: '2',
});

export interface AccordionProps extends Omit<BaseAccordion.Root.Props, 'className' | 'style'> {
  /** Visual variant. Default: 'outline' */
  variant?: AccordionVariant;
  /** Size scale. Default: '2' */
  size?: AccordionSize;
  className?: string;
  style?: React.CSSProperties;
}

export interface AccordionItemProps extends Omit<BaseAccordion.Item.Props, 'className' | 'render'> {
  className?: string;
}

export interface AccordionTriggerProps extends Omit<BaseAccordion.Trigger.Props, 'className' | 'render'> {
  className?: string;
  children: React.ReactNode;
}

export interface AccordionContentProps extends Omit<BaseAccordion.Panel.Props, 'className' | 'render'> {
  className?: string;
  children: React.ReactNode;
}

const variantClass: Record<AccordionVariant, string> = {
  outline: styles.variantOutline,
  surface: styles.variantSurface,
  ghost: styles.variantGhost,
};

const sizeClass: Record<AccordionSize, string> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
};

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
 * Accordion root
 * --------------------------------------------------------------------------- */
export function Accordion({
  variant = 'outline',
  size = '2',
  className,
  style,
  children,
  ...rest
}: AccordionProps) {
  return (
    <AccordionContext.Provider value={{ variant, size }}>
      <BaseAccordion.Root
        className={cx(styles.root, variantClass[variant], sizeClass[size], className)}
        style={style}
        {...rest}
      >
        {children}
      </BaseAccordion.Root>
    </AccordionContext.Provider>
  );
}

/* ---------------------------------------------------------------------------
 * Accordion.Item
 * --------------------------------------------------------------------------- */
function AccordionItem({ className, children, ...rest }: AccordionItemProps) {
  return (
    <BaseAccordion.Item
      className={cx(styles.item, className)}
      {...rest}
    >
      {children}
    </BaseAccordion.Item>
  );
}

/* ---------------------------------------------------------------------------
 * Accordion.Trigger
 * --------------------------------------------------------------------------- */
function AccordionTrigger({ className, children, ...rest }: AccordionTriggerProps) {
  return (
    <BaseAccordion.Header className={styles.header}>
      <BaseAccordion.Trigger
        className={cx(styles.trigger, className)}
        {...rest}
      >
        <span className={styles.triggerLabel}>{children}</span>
        <ChevronIcon />
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  );
}

/* ---------------------------------------------------------------------------
 * Accordion.Content
 * --------------------------------------------------------------------------- */
function AccordionContent({ className, children, ...rest }: AccordionContentProps) {
  return (
    <BaseAccordion.Panel
      className={cx(styles.panel, className)}
      {...rest}
    >
      <div className={styles.panelInner}>{children}</div>
    </BaseAccordion.Panel>
  );
}

/* ---------------------------------------------------------------------------
 * Attach sub-components
 * --------------------------------------------------------------------------- */
Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;
