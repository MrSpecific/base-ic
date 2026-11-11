'use client';

import * as React from 'react';
import { useRender } from '@base-ui/react/use-render';
import { spaceProps, cx, type SpaceProps, withVar } from '../Layout/layout.utils';
import type { AccentColor } from '../Theme';
import styles from './callout.module.css';

type CalloutSize = '1' | '2' | '3';
type CalloutVariant = 'soft' | 'surface' | 'outline';

type MarginProps = Pick<SpaceProps, 'm' | 'mx' | 'my' | 'mt' | 'mr' | 'mb' | 'ml'>;

/* ---------------------------------------------------------------------------
 * Callout.Root
 * --------------------------------------------------------------------------- */

export interface CalloutRootProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>, MarginProps {
  /** Padding, gap and text size. Default: '2' */
  size?: CalloutSize;
  /** Visual variant. Default: 'soft' */
  variant?: CalloutVariant;
  /** Override accent color. */
  color?: AccentColor;
  /** Increase text contrast against the background. */
  highContrast?: boolean;
  /** Render as a different element while keeping Callout's styling. */
  render?: useRender.RenderProp;
}

const sizeClass: Record<CalloutSize, string> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
};

const CalloutRoot = React.forwardRef<HTMLDivElement, CalloutRootProps>(function CalloutRoot(
  {
    size = '2',
    variant = 'soft',
    color,
    highContrast = false,
    className,
    style,
    m, mx, my, mt, mr, mb, ml,
    render,
    ...rest
  },
  ref,
) {
  // Only wire scale references consumed by CSS (7, 9, 11, 12)
  const colorVars = color
    ? {
        '--callout-accent-7': `var(--color-${color}-7)`,
        '--callout-accent-9': `var(--color-${color}-9)`,
        '--callout-accent-11': `var(--color-${color}-11)`,
        '--callout-accent-12': `var(--color-${color}-12)`,
      }
    : {};

  const space = spaceProps({ m, mx, my, mt, mr, mb, ml });

  return useRender({
    render: render ?? <div />,
    defaultTagName: 'div',
    ref,
    props: {
      ...rest,
      className: cx(
        styles.root,
        sizeClass[size],
        styles[variant],
        highContrast && styles.highContrast,
        space.className,
        className,
      ),
      style: withVar(style, {
        ...colorVars,
        ...space.vars,
      }),
    },
  });
});

/* ---------------------------------------------------------------------------
 * Callout.Icon
 * --------------------------------------------------------------------------- */

export type CalloutIconProps = React.HTMLAttributes<HTMLDivElement>;

const CalloutIcon = React.forwardRef<HTMLDivElement, CalloutIconProps>(function CalloutIcon(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} className={cx(styles.icon, className)} {...rest} />;
});

/* ---------------------------------------------------------------------------
 * Callout.Text
 * --------------------------------------------------------------------------- */

export type CalloutTextProps = React.HTMLAttributes<HTMLParagraphElement>;

const CalloutText = React.forwardRef<HTMLParagraphElement, CalloutTextProps>(function CalloutText(
  { className, ...rest },
  ref,
) {
  return <p ref={ref} className={cx(styles.text, className)} {...rest} />;
});

/* ---------------------------------------------------------------------------
 * Namespace
 * --------------------------------------------------------------------------- */

/**
 * Short accent-tinted message: `Callout.Root` → `<div>` (no role; add
 * `role="alert"` or `role="status"` yourself when it's a live message),
 * `Callout.Icon` → `<div>`, `Callout.Text` → `<p>`.
 */
export const Callout = {
  Root: CalloutRoot,
  Icon: CalloutIcon,
  Text: CalloutText,
};
