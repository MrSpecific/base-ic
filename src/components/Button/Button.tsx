'use client';

import * as React from 'react';
import { Button as BaseButton } from '@base-ui/react';
import { useRender } from '@base-ui/react/use-render';
import { spaceProps, cx, type SpaceProps, withVar } from '../Layout/layout.utils';
import type { AccentColor } from '../Theme';
import styles from './button.module.css';

type ButtonSize = '1' | '2' | '3' | '4';
type ButtonVariant = 'solid' | 'soft' | 'surface' | 'outline' | 'ghost';
type ButtonRadius = 'none' | 'small' | 'medium' | 'large' | 'full';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>, SpaceProps {
  /** Visual size preset. Default: '2' */
  size?: ButtonSize;
  /** Visual variant. Default: 'solid' */
  variant?: ButtonVariant;
  /** Override the accent color for this button. */
  color?: AccentColor;
  /** Increase contrast against the background. */
  highContrast?: boolean;
  /** Override the border-radius for this button. */
  radius?: ButtonRadius;
  /**
   * Square button for a single icon, sized by the button height. Give it an
   * accessible name with `aria-label`. Default: false
   */
  iconOnly?: boolean;
  /**
   * Show a loading spinner and disable interaction. The button stays focusable
   * (so focus isn't dropped mid-action) and is marked `aria-busy`.
   */
  loading?: boolean;
  /** Keep the button in the tab order while `disabled`. Default: false */
  focusableWhenDisabled?: BaseButton.Props['focusableWhenDisabled'];
  /**
   * Whether the `render` element is a native `<button>`. Set to `false` when
   * rendering a `<div>`/`<a>` etc. so Base UI adds button semantics. Default: true
   */
  nativeButton?: BaseButton.Props['nativeButton'];
  /** Replace the rendered element — a React element or a render function (Base UI render prop). */
  render?: BaseButton.Props['render'];
  /**
   * Render a link styled as a button: an `<a>` (or your `render` element, e.g. a
   * router `Link`, which receives the `href`) with no `role="button"`.
   * While `disabled` or `loading`, the `href` is dropped and `aria-disabled` set.
   */
  href?: string;
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  rel?: React.AnchorHTMLAttributes<HTMLAnchorElement>['rel'];
  download?: React.AnchorHTMLAttributes<HTMLAnchorElement>['download'];
}

// A separate component so `useRender` is never called conditionally.
const ButtonLink = React.forwardRef<HTMLAnchorElement, {
  render?: ButtonProps['render'];
  disabled: boolean;
  href: string;
} & React.HTMLAttributes<HTMLElement>>(function ButtonLink({ render, disabled, href, ...props }, ref) {
  return useRender({
    render: (render ?? <a />) as useRender.RenderProp,
    defaultTagName: 'a',
    ref,
    props: {
      ...props,
      href: disabled ? undefined : href,
      'aria-disabled': disabled || undefined,
      'data-disabled': disabled ? '' : undefined,
    },
  });
});

const radiusMap: Record<ButtonRadius, string> = {
  none: '0',
  small: 'var(--radius-2)',
  medium: 'var(--radius-3)',
  large: 'var(--radius-5)',
  full: 'var(--radius-full)',
};

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    {
      size = '2',
      variant = 'solid',
      color,
      highContrast = false,
      radius,
      iconOnly = false,
      loading = false,
      disabled,
      focusableWhenDisabled,
      className,
      style,
      p,
      px,
      py,
      pt,
      pr,
      pb,
      pl,
      m,
      mx,
      my,
      mt,
      mr,
      mb,
      ml,
      children,
      render,
      href,
      nativeButton,
      ...rest
    },
    ref,
  ) {
    const sizeVars: Record<string, string> = {
      '--btn-height': `var(--button-${size}-height)`,
      '--btn-px': iconOnly ? '0px' : `var(--button-${size}-px)`,
      '--btn-fs': `var(--button-${size}-font-size)`,
      '--btn-gap': `var(--button-${size}-gap)`,
      '--btn-icon-size': `var(--button-${size}-icon-size)`,
    };

    // Only wire scale references consumed by CSS (7,9,10,11,12,contrast)
    const colorVars: Record<string, string> = color
      ? {
          '--btn-accent-7': `var(--color-${color}-7)`,
          '--btn-accent-9': `var(--color-${color}-9)`,
          '--btn-accent-10': `var(--color-${color}-10)`,
          '--btn-accent-11': `var(--color-${color}-${highContrast ? 12 : 11})`,
          '--btn-accent-12': `var(--color-${color}-12)`,
          '--btn-accent-contrast': `var(--color-${color}-contrast)`,
        }
      : {};

    const radiusVar: Record<string, string> = radius
      ? { '--btn-radius': radiusMap[radius] }
      : {};

    const space = spaceProps({
      p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml,
    });
    const nextStyle = withVar(style, space.vars);

    const shared = {
      'aria-busy': loading || undefined,
      className: cx(
        styles.button,
        space.className,
        styles[variant],
        highContrast && styles.highContrast,
        iconOnly && styles.iconOnly,
        loading && styles.loading,
        className,
      ),
      style: {
        ...sizeVars,
        ...colorVars,
        ...radiusVar,
        ...nextStyle,
      } as React.CSSProperties,
      children: loading ? (
        <>
          {/* The content keeps its place (transparent, so the button doesn't
              change size and keeps its accessible name) and the spinner is
              centered over it. */}
          <span className={styles.loadingContent}>{children}</span>
          <span className={styles.spinnerOverlay} aria-hidden="true">
            <span className={styles.spinner} />
          </span>
        </>
      ) : (
        children
      ),
    };

    if (href != null) {
      return (
        <ButtonLink
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(rest as React.HTMLAttributes<HTMLElement>)}
          {...shared}
          href={href}
          render={render}
          disabled={Boolean(disabled || loading)}
        />
      );
    }

    return (
      <BaseButton
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={disabled || loading}
        focusableWhenDisabled={focusableWhenDisabled || loading}
        nativeButton={nativeButton}
        render={render}
        {...rest}
        {...shared}
      />
    );
  },
);
