import * as React from 'react';
import { Toggle as BaseToggle, ToggleGroup as BaseToggleGroup } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
import styles from './toggle.module.css';

/* ---------------------------------------------------------------------------
 * Types
 * --------------------------------------------------------------------------- */

type ToggleSize = '1' | '2' | '3' | '4';
type ToggleVariant = 'solid' | 'soft' | 'surface' | 'outline' | 'ghost';

/* ---------------------------------------------------------------------------
 * ToggleGroupContext — lets ToggleGroup propagate size/variant to children
 * --------------------------------------------------------------------------- */

interface ToggleGroupCtx {
  size?: ToggleSize;
  variant?: ToggleVariant;
}

const ToggleGroupContext = React.createContext<ToggleGroupCtx>({});

const sizeClass: Record<ToggleSize, string> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
  '4': styles.size4,
};

const variantClass: Record<ToggleVariant, string> = {
  solid: styles.solid,
  soft: styles.soft,
  surface: styles.surface,
  outline: styles.outline,
  ghost: styles.ghost,
};

export interface ToggleProps extends Omit<BaseToggle.Props, 'className' | 'style'> {
  /** Visual size. Default: '2' */
  size?: ToggleSize;
  /** Visual variant. Default: 'surface' */
  variant?: ToggleVariant;
  /** Accent color override. */
  color?: string;
  /** Increase text/icon contrast. */
  highContrast?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface ToggleGroupProps
  extends Omit<BaseToggleGroup.Props, 'className' | 'style'> {
  /** Display toggles as a connected segmented group. Default: false */
  connected?: boolean;
  /** Visual size applied to all child Toggles. */
  size?: ToggleSize;
  /** Visual variant applied to all child Toggles. */
  variant?: ToggleVariant;
  className?: string;
  style?: React.CSSProperties;
}

/* ---------------------------------------------------------------------------
 * Toggle
 * --------------------------------------------------------------------------- */

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  function Toggle(
    {
      size: sizeProp = '2',
      variant: variantProp = 'surface',
      color,
      highContrast = false,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const groupCtx = React.useContext(ToggleGroupContext);
    // Group context takes precedence over individual prop defaults
    const size = groupCtx.size ?? sizeProp;
    const variant = groupCtx.variant ?? variantProp;

    const sizeVars: Record<string, string> = {
      '--tgl-height': `var(--button-${size}-height)`,
      '--tgl-px': `var(--button-${size}-px)`,
      '--tgl-fs': `var(--button-${size}-font-size)`,
      '--tgl-gap': `var(--button-${size}-gap)`,
      '--tgl-icon-size': `var(--button-${size}-icon-size)`,
    };

    const colorVars: Record<string, string> = color
      ? {
          '--tgl-accent-3': `var(--color-${color}-3)`,
          '--tgl-accent-7': `var(--color-${color}-7)`,
          '--tgl-accent-9': `var(--color-${color}-9)`,
          '--tgl-accent-10': `var(--color-${color}-10)`,
          '--tgl-accent-11': `var(--color-${color}-${highContrast ? 12 : 11})`,
          '--tgl-accent-contrast': `var(--color-${color}-contrast)`,
        }
      : {};

    return (
      <BaseToggle
        ref={ref}
        className={cx(styles.toggle, variantClass[variant], className)}
        style={{ ...sizeVars, ...colorVars, ...style } as React.CSSProperties}
        {...rest}
      />
    );
  },
);

/* ---------------------------------------------------------------------------
 * ToggleGroup
 * --------------------------------------------------------------------------- */

export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  function ToggleGroup({ connected = false, size, variant, className, style, children, ...rest }, ref) {
    return (
      <ToggleGroupContext.Provider value={{ size, variant }}>
        <BaseToggleGroup
          ref={ref}
          className={cx(styles.group, connected && styles.groupConnected, className)}
          style={style}
          {...rest}
        >
          {children}
        </BaseToggleGroup>
      </ToggleGroupContext.Provider>
    );
  },
);

export { BaseToggle as TogglePrimitive, BaseToggleGroup as ToggleGroupPrimitive };
