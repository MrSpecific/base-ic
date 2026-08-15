import * as React from 'react';
import { useRender } from '@base-ui/react/use-render';
import { buildSpaceVars, cx, type SpaceProps, withVar } from '../Layout/layout.utils';
import { buildTypoColorVar, buildTypoSizeVars } from './typography.utils';
import type { AccentColor } from '../Theme';
import styles from './link.module.css';

type LinkSize = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type LinkWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
type LinkUnderline = 'auto' | 'always' | 'hover' | 'none';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, SpaceProps {
  size?: LinkSize;
  weight?: LinkWeight;
  color?: AccentColor;
  highContrast?: boolean;
  underline?: LinkUnderline;
  truncate?: boolean;
  /** Render as a different element (e.g. a router `Link`) while keeping Link's styling. */
  render?: useRender.RenderProp;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(
    {
      size,
      weight,
      color,
      highContrast,
      underline = 'auto',
      truncate,
      p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml,
      className,
      style,
      render,
      ...rest
    },
    ref,
  ) {
    const sizeVars = size ? buildTypoSizeVars('text', size) : undefined;
    const colorVars = buildTypoColorVar(color, highContrast);
    const weightVar = weight
      ? { '--typo-weight': `var(--font-weight-${weight})` } as React.CSSProperties
      : undefined;
    const spaceVars = withVar(undefined, buildSpaceVars('link', {
      p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml,
    }));

    return useRender({
      render: render ?? <a />,
      defaultTagName: 'a',
      ref,
      props: {
        ...rest,
        className: cx(
          styles.link,
          styles[`underline${underline[0].toUpperCase()}${underline.slice(1)}` as keyof typeof styles],
          truncate && styles.truncate,
          className,
        ),
        style: {
          ...sizeVars,
          ...colorVars,
          ...weightVar,
          ...spaceVars,
          ...style,
        },
      },
    });
  },
);
