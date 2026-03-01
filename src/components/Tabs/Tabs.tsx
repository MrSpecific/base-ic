import * as React from 'react';
import { Tabs as BaseTabs } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
import styles from './tabs.module.css';

type TabsSize = '1' | '2' | '3';
type TabsVariant = 'line' | 'soft' | 'solid';

export interface TabsProps extends Omit<BaseTabs.Root.Props, 'className' | 'style'> {
  /** Visual variant. Default: 'line' */
  variant?: TabsVariant;
  /** Size scale. Default: '2' */
  size?: TabsSize;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export interface TabsListProps
  extends Omit<BaseTabs.List.Props, 'className' | 'render'> {
  className?: string;
  children: React.ReactNode;
}

export interface TabProps
  extends Omit<BaseTabs.Tab.Props, 'className' | 'render'> {
  value: string | number;
  className?: string;
  children: React.ReactNode;
}

export interface TabsPanelProps
  extends Omit<BaseTabs.Panel.Props, 'className' | 'render'> {
  value: string | number;
  className?: string;
  children: React.ReactNode;
}

const sizeClass: Record<TabsSize, string> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
};

const variantListClass: Record<TabsVariant, string> = {
  line: styles.listLine,
  soft: styles.listSoft,
  solid: '',
};

const variantTabClass: Record<TabsVariant, string> = {
  line: styles.tabLine,
  soft: styles.tabSoft,
  solid: styles.tabSolid,
};

/* ---------------------------------------------------------------------------
 * Context to pass variant + size down to Tab
 * --------------------------------------------------------------------------- */
interface TabsContext {
  variant: TabsVariant;
  size: TabsSize;
}

const TabsContext = React.createContext<TabsContext>({ variant: 'line', size: '2' });

/* ---------------------------------------------------------------------------
 * Tabs root
 * --------------------------------------------------------------------------- */
export function Tabs({
  variant = 'line',
  size = '2',
  className,
  style,
  children,
  ...rest
}: TabsProps) {
  return (
    <TabsContext.Provider value={{ variant, size }}>
      <BaseTabs.Root
        className={cx(styles.root, className)}
        style={style}
        {...rest}
      >
        {children}
      </BaseTabs.Root>
    </TabsContext.Provider>
  );
}

/* ---------------------------------------------------------------------------
 * Tabs.List
 * --------------------------------------------------------------------------- */
function TabsList({ className, children, ...rest }: TabsListProps) {
  const { variant, size } = React.useContext(TabsContext);
  return (
    <BaseTabs.List
      className={cx(styles.list, variantListClass[variant], sizeClass[size], className)}
      {...rest}
    >
      {children}
      {variant === 'line' && <BaseTabs.Indicator className={styles.indicator} />}
    </BaseTabs.List>
  );
}

/* ---------------------------------------------------------------------------
 * Tabs.Tab
 * --------------------------------------------------------------------------- */
function Tab({ value, className, children, ...rest }: TabProps) {
  const { variant } = React.useContext(TabsContext);
  return (
    <BaseTabs.Tab
      value={value}
      className={cx(styles.tab, variantTabClass[variant], className)}
      {...rest}
    >
      {children}
    </BaseTabs.Tab>
  );
}

/* ---------------------------------------------------------------------------
 * Tabs.Panel
 * --------------------------------------------------------------------------- */
function TabsPanel({ value, className, children, ...rest }: TabsPanelProps) {
  return (
    <BaseTabs.Panel
      value={value}
      className={cx(styles.panel, className)}
      {...rest}
    >
      {children}
    </BaseTabs.Panel>
  );
}

/* ---------------------------------------------------------------------------
 * Attach sub-components
 * --------------------------------------------------------------------------- */
Tabs.List = TabsList;
Tabs.Tab = Tab;
Tabs.Panel = TabsPanel;
