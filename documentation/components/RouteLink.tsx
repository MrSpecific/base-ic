import { createContext, useContext } from 'react';
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { Button } from '../../src';
import type { ButtonProps } from '../../src';

type Navigate = (path: string) => void;

/**
 * Client-side navigation for the docs site. App provides the real
 * pushState-based implementation; the default falls back to a full page load.
 */
export const NavigationContext = createContext<Navigate>((path) => {
  window.location.assign(path);
});

export function useNavigate(): Navigate {
  return useContext(NavigationContext);
}

/**
 * True for a plain primary-button click with no modifier keys — the only case
 * we intercept. Cmd/Ctrl/Shift/Alt/middle clicks keep native link behavior
 * (new tab, new window, download…).
 */
function isPlainLeftClick(event: MouseEvent<HTMLElement>): boolean {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

function useRouteClickHandler(
  href: string,
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void,
) {
  const navigate = useNavigate();
  return (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (!isPlainLeftClick(event)) return;
    const target = event.currentTarget.getAttribute('target');
    if (target && target !== '_self') return;
    event.preventDefault();
    navigate(href);
  };
}

type RouteLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  /** Site-internal path, e.g. `/docs/button/`. */
  href: string;
  /** Marks the link as the current page (`aria-current="page"`). */
  current?: boolean;
};

/** A plain `<a>` that routes client-side on plain left-clicks. */
export function RouteLink({ href, current, onClick, ...rest }: RouteLinkProps) {
  const handleClick = useRouteClickHandler(href, onClick);
  return (
    <a
      {...rest}
      href={href}
      aria-current={current ? 'page' : undefined}
      onClick={handleClick}
    />
  );
}

type ButtonLinkProps = Omit<ButtonProps, 'render' | 'onClick' | 'type' | 'nativeButton'> & {
  /** Site-internal path (routed client-side) or an external URL. */
  href: string;
  /** Open in a new tab (for external links). */
  external?: boolean;
  /** Marks the link as the current page (`aria-current="page"`). */
  current?: boolean;
  children?: ReactNode;
};

/**
 * A real link (`<a href>`) styled as a Button. Internal links route
 * client-side on plain left-clicks; modified clicks open natively.
 */
export function ButtonLink({ href, external, current, children, ...buttonProps }: ButtonLinkProps) {
  const handleClick = useRouteClickHandler(href);
  return (
    <Button
      {...buttonProps}
      // The rendered element is an <a>, not a <button>.
      nativeButton={false}
      // Base UI gives non-native buttons role="button"; keep native link
      // semantics so assistive tech announces these as links.
      role={undefined}
      aria-current={current ? 'page' : undefined}
      onClick={external ? undefined : (handleClick as unknown as ButtonProps['onClick'])}
      render={
        external ? (
          <a href={href} target="_blank" rel="noreferrer" />
        ) : (
          <a href={href} />
        )
      }
    >
      {children}
    </Button>
  );
}
