import * as React from 'react';
import { useRender } from '@base-ui/react/use-render';
import { buildSpaceVars, cx, type SpaceProps, withVar } from '../Layout/layout.utils';
import styles from './card.module.css';

type CardSize = '1' | '2' | '3' | '4' | '5';
type CardVariant = 'surface' | 'classic' | 'gradient' | 'ghost';
type CardRadius = 'none' | 'small' | 'medium' | 'large' | 'full';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, SpaceProps {
  /** Padding size preset. Default: '3' */
  size?: CardSize;
  /** Visual variant. Default: 'surface' */
  variant?: CardVariant;
  /**
   * Make the card interactive, rendering it as a real `<button>`.
   * @deprecated Use `render={<button type="button" />}` instead — it gives
   * the card real keyboard semantics (Enter/Space) instead of the `role="button"`
   * + `tabIndex` patch this flag applied, which never wired up key handling.
   * `asButton` will be removed in a future minor version.
   */
  asButton?: boolean;
  /** Override border radius for this card. */
  radius?: CardRadius;
  /** Render as a different element (e.g. a real `<button>` or router `Link`) while keeping Card's styling. */
  render?: useRender.RenderProp;
}

const radiusMap: Record<CardRadius, string> = {
  none: 'var(--surface-radius-none)',
  small: 'var(--surface-radius-small)',
  medium: 'var(--surface-radius-medium)',
  large: 'var(--surface-radius-large)',
  full: 'var(--surface-radius-full)',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  function Card(
    {
      size = '3',
      variant = 'surface',
      asButton = false,
      radius,
      className,
      style,
      render,
      p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml,
      ...rest
    },
    ref,
  ) {
    if (import.meta.env.DEV && asButton) {
      // eslint-disable-next-line no-console
      console.warn(
        '[base-ic] Card `asButton` is deprecated and will be removed in a future minor version. ' +
          'Use `render={<button type="button" />}` instead.',
      );
    }

    // Use size as default padding; explicit `p` overrides it
    const spaceVars = buildSpaceVars('card', {
      p: p ?? size,
      px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml,
    });

    const nextStyle = withVar(style, {
      ...spaceVars,
      '--card-radius': radius ? radiusMap[radius] : undefined,
    });

    return useRender({
      render: render ?? (asButton ? <button type="button" /> : <div />),
      defaultTagName: 'div',
      ref,
      props: {
        ...rest,
        className: cx(
          styles.card,
          styles[variant],
          (asButton || render) && styles.interactive,
          className,
        ),
        style: nextStyle,
      },
    });
  },
);
