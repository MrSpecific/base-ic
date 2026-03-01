import * as React from 'react';
import { Switch as BaseSwitch } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
import styles from './switch.module.css';

type SwitchSize = '1' | '2' | '3';

export interface SwitchProps
  extends Omit<BaseSwitch.Root.Props, 'render' | 'className' | 'style'> {
  /** Visual size. Default: '2' */
  size?: SwitchSize;
  /** Override the accent color. */
  color?: string;
  /** Custom className. */
  className?: string;
  /** Custom style. */
  style?: React.CSSProperties;
  /** Base UI render prop. */
  render?: React.ReactElement;
}

const sizeClass: Record<SwitchSize, string> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
};

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  function Switch({ size = '2', color, className, style, render, ...rest }, ref) {
    const colorVars = color
      ? ({
          '--sw-accent-9': `var(--color-${color}-9)`,
          '--sw-accent-10': `var(--color-${color}-10)`,
        } as React.CSSProperties)
      : undefined;

    return (
      <BaseSwitch.Root
        ref={ref}
        render={render}
        className={cx(styles.root, sizeClass[size], className)}
        style={{ ...colorVars, ...style }}
        {...rest}
      >
        <BaseSwitch.Thumb className={styles.thumb} />
      </BaseSwitch.Root>
    );
  },
);
