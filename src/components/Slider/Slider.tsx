import * as React from 'react';
import { Slider as BaseSlider } from '@base-ui/react';
import { cx } from '../Layout/layout.utils';
import styles from './slider.module.css';

type SliderSize = '1' | '2' | '3';
type SliderRadius = 'none' | 'small' | 'medium' | 'large' | 'full';

const radiusMap: Record<SliderRadius, string> = {
  none: '0',
  small: 'var(--radius-2)',
  medium: 'var(--radius-3)',
  large: 'var(--radius-5)',
  full: 'var(--radius-full)',
};

const sizeClass: Record<SliderSize, string> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
};

export interface SliderProps extends Omit<BaseSlider.Root.Props, 'className' | 'style' | 'render'> {
  /** Visual size preset. Default: '2' */
  size?: SliderSize;
  /** Override the accent color. */
  color?: string;
  /** Override the border-radius of the track. */
  radius?: SliderRadius;
  /** Show a value output alongside the thumb. */
  showOutput?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  function Slider(
    { size = '2', color, radius, showOutput = false, className, style, ...rest },
    ref,
  ) {
    const colorVars = color
      ? ({
          '--sld-accent-9': `var(--color-${color}-9)`,
          '--sld-accent-10': `var(--color-${color}-10)`,
        } as React.CSSProperties)
      : undefined;

    const radiusVar = radius
      ? ({ '--sld-radius': radiusMap[radius] } as React.CSSProperties)
      : undefined;

    // Determine how many thumbs to render based on value/defaultValue
    const valueArray = rest.value ?? rest.defaultValue;
    const thumbCount = Array.isArray(valueArray) ? valueArray.length : 1;

    return (
      <BaseSlider.Root
        ref={ref}
        className={cx(styles.root, sizeClass[size], className)}
        style={{ ...colorVars, ...radiusVar, ...style }}
        {...rest}
      >
        <BaseSlider.Control className={styles.control}>
          <BaseSlider.Track className={styles.track}>
            <BaseSlider.Indicator className={styles.indicator} />
            {Array.from({ length: thumbCount }).map((_, i) => (
              <BaseSlider.Thumb key={i} className={styles.thumb} />
            ))}
          </BaseSlider.Track>
        </BaseSlider.Control>
        {showOutput && (
          <BaseSlider.Value className={styles.output} />
        )}
      </BaseSlider.Root>
    );
  },
);

export { BaseSlider as SliderPrimitive };
