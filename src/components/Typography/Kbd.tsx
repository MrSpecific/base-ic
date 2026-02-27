import * as React from 'react';
import { cx } from '../Layout/layout.utils';
import { buildTypoSizeVars } from './typography.utils';
import styles from './kbd.module.css';

type KbdSize = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  size?: KbdSize;
}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  function Kbd({ size = '2', className, style, ...rest }, ref) {
    const sizeVars = buildTypoSizeVars('text', size);

    return (
      <kbd
        ref={ref}
        className={cx(styles.kbd, className)}
        style={{ ...sizeVars, ...style }}
        {...rest}
      />
    );
  },
);
