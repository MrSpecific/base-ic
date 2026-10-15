import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { version } from "../package.json";
import { Box, Button, Flex, Text, Theme } from "../src";
import type {
  AccentColor,
  Appearance,
  GrayColor,
  Radius,
  Scaling,
} from "./types";
import {
  ACCENT_COLORS,
  APPEARANCES,
  GRAY_COLORS,
  NAV_ITEMS,
  RADII,
  SCALINGS,
} from "./constants";
import { getRouteFromPath, getRouteMeta, pageToPath } from "./routing";
import { GITHUB_URL, NPM_URL } from "./routes";
import { ButtonLink, NavigationContext, RouteLink } from "./components/RouteLink";
import { ThemePanel } from "./components/ThemePanel";
import { HomePage } from "./pages/HomePage";
import { DocsPage } from "./pages/DocsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import type { RouteState } from "./types";
import "../src/tokens/index.css";
import "./documentation.css";
import "./docs.css";
import "./playground.css";

const CustomizationPage = lazy(() =>
  import("./pages/CustomizationPage").then((m) => ({ default: m.CustomizationPage })),
);
const ForDesignersPage = lazy(() =>
  import("./pages/ForDesignersPage").then((m) => ({ default: m.ForDesignersPage })),
);
const PlaygroundPage = lazy(() =>
  import("./pages/PlaygroundPage").then((m) => ({ default: m.PlaygroundPage })),
);

// Keep in sync with the pre-paint appearance script injected by vite.config.ts.
const THEME_STORAGE_KEY = "base-ic:documentation-theme";

type PersistedTheme = {
  accent: AccentColor;
  gray: GrayColor;
  radius: Radius;
  scaling: Scaling;
  appearance: Appearance;
};

function isAccentColor(value: unknown): value is AccentColor {
  return (
    typeof value === "string" && ACCENT_COLORS.includes(value as AccentColor)
  );
}

function isGrayColor(value: unknown): value is GrayColor {
  return typeof value === "string" && GRAY_COLORS.includes(value as GrayColor);
}

function isRadius(value: unknown): value is Radius {
  return typeof value === "string" && RADII.includes(value as Radius);
}

function isScaling(value: unknown): value is Scaling {
  return typeof value === "string" && SCALINGS.includes(value as Scaling);
}

function isAppearance(value: unknown): value is Appearance {
  return typeof value === "string" && APPEARANCES.includes(value as Appearance);
}

function readPersistedTheme(): PersistedTheme | null {
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<PersistedTheme>;
    if (
      isAccentColor(parsed.accent) &&
      isGrayColor(parsed.gray) &&
      isRadius(parsed.radius) &&
      isScaling(parsed.scaling) &&
      isAppearance(parsed.appearance)
    ) {
      return parsed as PersistedTheme;
    }
  } catch {
    return null;
  }

  return null;
}

function setMetaContent(selector: string, value: string) {
  document.querySelector(selector)?.setAttribute("content", value);
}

/** Mirror the per-route head tags (injected at build time) after client-side navigation. */
function applyRouteMeta(route: RouteState) {
  const meta = getRouteMeta(route.page, route.docsSection);
  document.title = meta.title;
  setMetaContent('meta[name="description"]', meta.description);
  setMetaContent('meta[property="og:title"]', meta.title);
  setMetaContent('meta[property="og:description"]', meta.description);
  if (meta.canonical) {
    setMetaContent('meta[property="og:url"]', meta.canonical);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", meta.canonical);
  }
}

/**
 * Move focus to the new page's h1 so keyboard and screen-reader users land at
 * the top of the new content. Docs pages are lazy-loaded, so retry for a few
 * frames until the heading has rendered.
 */
function focusPageHeading(attempt = 0) {
  // Suspense hides (display: none) rather than unmounts the previous page
  // while the next one loads, so only accept a rendered heading.
  const heading = Array.from(document.querySelectorAll<HTMLElement>("main h1")).find(
    (element) => element.getClientRects().length > 0,
  );
  if (heading) {
    if (!heading.hasAttribute("tabindex")) heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
    return;
  }
  if (attempt < 120) {
    window.requestAnimationFrame(() => focusPageHeading(attempt + 1));
  }
}

export default function App() {
  const persistedTheme = useMemo(() => readPersistedTheme(), []);

  const [accent, setAccent] = useState<AccentColor>(
    persistedTheme?.accent ?? "blue",
  );
  const [gray, setGray] = useState<GrayColor>(persistedTheme?.gray ?? "gray");
  const [radius, setRadius] = useState<Radius>(
    persistedTheme?.radius ?? "medium",
  );
  const [scaling, setScaling] = useState<Scaling>(
    persistedTheme?.scaling ?? "100%",
  );
  // "inherit" follows the OS color scheme until the visitor picks one.
  const [appearance, setAppearance] = useState<Appearance>(
    persistedTheme?.appearance ?? "inherit",
  );
  const [route, setRoute] = useState<RouteState>(() =>
    getRouteFromPath(window.location.pathname),
  );
  const [navOpen, setNavOpen] = useState(false);
  // Set when a navigation should move focus to the new page's heading.
  const pendingFocusRef = useRef(false);

  useEffect(() => {
    const syncRouteFromLocation = () => {
      pendingFocusRef.current = true;
      setRoute(getRouteFromPath(window.location.pathname));
    };
    window.addEventListener("popstate", syncRouteFromLocation);
    return () => window.removeEventListener("popstate", syncRouteFromLocation);
  }, []);

  useEffect(() => {
    applyRouteMeta(route);
    setNavOpen(false);
    if (pendingFocusRef.current) {
      pendingFocusRef.current = false;
      focusPageHeading();
    }
  }, [route]);

  useEffect(() => {
    const nextTheme: PersistedTheme = {
      accent,
      gray,
      radius,
      scaling,
      appearance,
    };
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(nextTheme));
    } catch {
      // Ignore storage failures (private mode / restricted context).
    }
  }, [accent, gray, radius, scaling, appearance]);

  const navigate = useCallback((nextPath: string) => {
    const url = new URL(nextPath, window.location.href);
    if (url.origin !== window.location.origin) {
      window.location.assign(url.href);
      return;
    }
    if (url.pathname !== window.location.pathname || url.search !== window.location.search) {
      window.history.pushState(null, "", url.pathname + url.search + url.hash);
    }
    window.scrollTo(0, 0);
    pendingFocusRef.current = true;
    const nextRoute = getRouteFromPath(url.pathname);
    setRoute((current) =>
      current.page === nextRoute.page && current.docsSection === nextRoute.docsSection
        ? { ...nextRoute }
        : nextRoute,
    );
  }, []);

  const pageContent = useMemo(() => {
    if (route.page === "docs") return <DocsPage section={route.docsSection} />;
    if (route.page === "customization") return <CustomizationPage />;
    if (route.page === "for-designers") return <ForDesignersPage />;
    if (route.page === "playground") return <PlaygroundPage radius={radius} />;
    if (route.page === "not-found") return <NotFoundPage />;
    return <HomePage />;
  }, [route, radius]);

  return (
    <NavigationContext.Provider value={navigate}>
      <Theme
        accentColor={accent}
        grayColor={gray}
        radius={radius}
        scaling={scaling}
        appearance={appearance}
        fontFamily={{
          primary:
            '"Figtree", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          secondary:
            '"Figtree", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          display:
            '"Figtree", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <Box className="site-shell">
          <a className="site-skip-link" href="#main-content">
            Skip to content
          </a>
          <Flex
            as="header"
            className="site-header"
            align="center"
            justify="space-between"
            data-nav-open={navOpen || undefined}
          >
            <Box className="site-brand">
              <RouteLink className="site-logo" href={pageToPath("home")}>
                base-ic
              </RouteLink>
              <div className="site-version">v{version}</div>
            </Box>
            <Button
              className="site-nav-toggle"
              variant="soft"
              color="gray"
              size="2"
              aria-expanded={navOpen}
              aria-controls="site-nav"
              onClick={() => setNavOpen((open) => !open)}
            >
              {navOpen ? "Close" : "Menu"}
            </Button>
            <Flex
              as="nav"
              id="site-nav"
              className="site-nav"
              aria-label="Primary"
              align="center"
              gap={1}
            >
              {NAV_ITEMS.map((item) => {
                const active = route.page === item.page;
                return (
                  <ButtonLink
                    key={item.page}
                    href={pageToPath(item.page)}
                    current={active}
                    data-active={active}
                    variant={active ? "solid" : "ghost"}
                    color={active ? "accent" : "gray"}
                  >
                    {item.label}
                  </ButtonLink>
                );
              })}
            </Flex>
          </Flex>

          <div id="main-content" className="site-main" tabIndex={-1}>
            <Suspense fallback={<div className="site-page site-page-loading" aria-busy="true" />}>
              {pageContent}
            </Suspense>
          </div>

          <footer className="site-footer">
            <div className="site-footer-inner">
              <Text as="p" size="2" className="site-footer-brand">
                <strong>base-ic</strong> v{version} — Radix Themes-style components on Base UI.
              </Text>
              <nav aria-label="Footer" className="site-footer-links">
                <RouteLink href={pageToPath("docs")}>Docs</RouteLink>
                <RouteLink href={pageToPath("playground")}>Playground</RouteLink>
                <a href={GITHUB_URL} target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <a href={NPM_URL} target="_blank" rel="noreferrer">
                  npm
                </a>
                <a href={`${GITHUB_URL}/blob/main/LICENSE`} target="_blank" rel="noreferrer">
                  MIT License
                </a>
              </nav>
            </div>
          </footer>
        </Box>

        <ThemePanel
          accent={accent}
          setAccent={setAccent}
          gray={gray}
          setGray={setGray}
          radius={radius}
          setRadius={setRadius}
          scaling={scaling}
          setScaling={setScaling}
          appearance={appearance}
          setAppearance={setAppearance}
          defaultOpen={route.page === "playground"}
        />
      </Theme>
    </NavigationContext.Provider>
  );
}
