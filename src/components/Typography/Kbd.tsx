import * as React from 'react';
import { spaceProps, cx, type SpaceProps } from '../Layout/layout.utils';
import { buildTypoSizeVars } from './typography.utils';
import styles from './kbd.module.css';

type KbdSize = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export interface KbdProps extends React.HTMLAttributes<HTMLElement>, SpaceProps {
  size?: KbdSize;
}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  function Kbd({ size = '2', p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml, className, style, ...rest }, ref) {
    const sizeVars = buildTypoSizeVars('text', size);
    const space = spaceProps({
      p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml,
    });
    const spaceVars = space.vars;

    return (
      <kbd
        ref={ref}
        className={cx(styles.kbd, space.className, className)}
        style={{ ...sizeVars, ...spaceVars, ...style }}
        {...rest}
      />
    );
  },
);
