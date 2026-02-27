import * as React from 'react';
import { buildSpaceVars, cx, type SpaceProps, withVar } from '../Layout/layout.utils';
import { buildTypoColorVar, buildTypoSizeVars } from './typography.utils';
import styles from './code.module.css';

type CodeSize = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type CodeVariant = 'ghost' | 'soft' | 'outline';
type CodeWeight = 'regular' | 'medium' | 'bold';

export interface CodeProps extends React.HTMLAttributes<HTMLElement>, SpaceProps {
  size?: CodeSize;
  variant?: CodeVariant;
  weight?: CodeWeight;
  color?: string;
  highContrast?: boolean;
}

export const Code = React.forwardRef<HTMLElement, CodeProps>(
  function Code(
    {
      size = '3',
      variant = 'soft',
      weight,
      color,
      highContrast,
      p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const sizeVars = buildTypoSizeVars('text', size);
    const colorVars = buildTypoColorVar(color, highContrast);
    const weightVar = weight
      ? { '--typo-weight': `var(--font-weight-${weight})` } as React.CSSProperties
      : undefined;
    const spaceVars = withVar(undefined, buildSpaceVars('code', {
      p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml,
    }));

    return (
      <code
        ref={ref}
        className={cx(styles.code, styles[variant], className)}
        style={{
          ...sizeVars,
          ...colorVars,
          ...weightVar,
          ...spaceVars,
          ...style,
        }}
        {...rest}
      />
    );
  },
);
