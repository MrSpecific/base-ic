import * as React from 'react';
import { Avatar as BaseAvatar } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
import styles from './avatar.module.css';

type AvatarSize = '1' | '2' | '3' | '4' | '5';
type AvatarRadius = 'none' | 'small' | 'medium' | 'large' | 'full';

const radiusMap: Record<AvatarRadius, string> = {
  none: '0',
  small: 'var(--radius-2)',
  medium: 'var(--radius-3)',
  large: 'var(--radius-5)',
  full: 'var(--radius-full)',
};

const sizeClass: Record<AvatarSize, string> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
  '4': styles.size4,
  '5': styles.size5,
};

export interface AvatarProps {
  /** Visual size preset. Default: '3' */
  size?: AvatarSize;
  /** Image source URL. */
  src?: string;
  /** Alt text for the image. */
  alt?: string;
  /** Content shown when image is missing or fails — typically initials. */
  fallback?: React.ReactNode;
  /** Override the fallback background color. */
  color?: string;
  /** Shape override. Default: 'full' (circle) */
  radius?: AvatarRadius;
  className?: string;
  style?: React.CSSProperties;
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  function Avatar(
    {
      size = '3',
      src,
      alt,
      fallback,
      color,
      radius = 'full',
      className,
      style,
    },
    ref,
  ) {
    const colorVars = color
      ? ({
          '--avt-accent-9': `var(--color-${color}-9)`,
          '--avt-accent-3': `var(--color-${color}-3)`,
          '--avt-accent-11': `var(--color-${color}-11)`,
          '--avt-contrast': `var(--color-${color}-contrast)`,
        } as React.CSSProperties)
      : undefined;

    const radiusVar = { '--avt-radius': radiusMap[radius] } as React.CSSProperties;

    return (
      <BaseAvatar.Root
        ref={ref}
        className={cx(styles.root, sizeClass[size], className)}
        style={{ ...colorVars, ...radiusVar, ...style } as React.CSSProperties}
      >
        {src && (
          <BaseAvatar.Image
            src={src}
            alt={alt ?? ''}
            className={styles.image}
          />
        )}
        <BaseAvatar.Fallback
          className={cx(styles.fallback, color && styles.colorFallback)}
          delay={src ? 600 : 0}
        >
          {fallback}
        </BaseAvatar.Fallback>
      </BaseAvatar.Root>
    );
  },
);

export { BaseAvatar as AvatarPrimitive };
