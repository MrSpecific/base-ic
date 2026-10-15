import * as React from 'react';
import { useTheme } from '../Theme';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

/**
 * Keeps portaled popups inside the nearest `Theme` so they pick up its
 * tokens (accent, gray, radius, scaling) instead of the document root's.
 *
 * Attach `anchorRef` to an element rendered next to the trigger (usually a
 * `display: contents` span), pass `container` to the Base UI `Portal`, and
 * put `data-appearance={forcedAppearance}` on the portal's wrapper element.
 */
export function useThemePortal<T extends HTMLElement = HTMLSpanElement>() {
  const { appearance } = useTheme();
  const anchorRef = React.useRef<T | null>(null);
  const [container, setContainer] = React.useState<HTMLElement | null>(null);

  // Layout effect so a popup that is open on first render is portaled into
  // the theme root before paint rather than re-mounting into it afterwards.
  useIsomorphicLayoutEffect(() => {
    const nearestThemeRoot =
      anchorRef.current?.closest<HTMLElement>('[data-accent-color]') ??
      document.querySelector<HTMLElement>('[data-accent-color]');
    setContainer(nearestThemeRoot ?? null);
  }, []);

  const forcedAppearance =
    appearance === 'dark' || appearance === 'light' ? appearance : undefined;

  return { anchorRef, container: container ?? undefined, forcedAppearance };
}
