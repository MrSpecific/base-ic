import { useEffect, useMemo, useState } from 'react';
import { Box, Button, Flex, Theme } from '../src';
import type { AccentColor, Appearance, GrayColor, Radius, Scaling } from './types';
import { ACCENT_COLORS, APPEARANCES, GRAY_COLORS, NAV_ITEMS, RADII, SCALINGS } from './constants';
import { getRouteFromPath, pageToPath } from './routing';
import { ThemePanel } from './components/ThemePanel';
import { HomePage } from './pages/HomePage';
import { DocsPage } from './pages/DocsPage';
import { CustomizationPage } from './pages/CustomizationPage';
import { ForDesignersPage } from './pages/ForDesignersPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import type { DocsSection, Page } from './types';
import '../src/tokens/index.css';
import './documentation.css';
import './docs.css';
import './playground.css';

const THEME_STORAGE_KEY = 'base-ic:documentation-theme';

type PersistedTheme = {
  accent: AccentColor;
  gray: GrayColor;
  radius: Radius;
  scaling: Scaling;
  appearance: Appearance;
};

function isAccentColor(value: unknown): value is AccentColor {
  return typeof value === 'string' && ACCENT_COLORS.includes(value as AccentColor);
}

function isGrayColor(value: unknown): value is GrayColor {
  return typeof value === 'string' && GRAY_COLORS.includes(value as GrayColor);
}

function isRadius(value: unknown): value is Radius {
  return typeof value === 'string' && RADII.includes(value as Radius);
}

function isScaling(value: unknown): value is Scaling {
  return typeof value === 'string' && SCALINGS.includes(value as Scaling);
}

function isAppearance(value: unknown): value is Appearance {
  return typeof value === 'string' && APPEARANCES.includes(value as Appearance);
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

export default function App() {
  const persistedTheme = useMemo(() => readPersistedTheme(), []);

  const [accent, setAccent] = useState<AccentColor>(persistedTheme?.accent ?? 'blue');
  const [gray, setGray] = useState<GrayColor>(persistedTheme?.gray ?? 'gray');
  const [radius, setRadius] = useState<Radius>(persistedTheme?.radius ?? 'medium');
  const [scaling, setScaling] = useState<Scaling>(persistedTheme?.scaling ?? '100%');
  const [appearance, setAppearance] = useState<Appearance>(persistedTheme?.appearance ?? 'light');
  const route = getRouteFromPath(window.location.pathname);

  useEffect(() => {
    const nextTheme: PersistedTheme = { accent, gray, radius, scaling, appearance };
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(nextTheme));
    } catch {
      // Ignore storage failures (private mode / restricted context).
    }
  }, [accent, gray, radius, scaling, appearance]);

  const goTo = (nextPage: Page, docsSection: DocsSection = route.docsSection) => {
    const nextPath = pageToPath(nextPage, docsSection);
    if (window.location.pathname !== nextPath) {
      window.location.href = nextPath;
    }
  };

  const goToDocsSection = (section: DocsSection) => {
    goTo('docs', section);
  };

  const pageContent = useMemo(() => {
    if (route.page === 'docs') return <DocsPage section={route.docsSection} goToDocsSection={goToDocsSection} />;
    if (route.page === 'customization') return <CustomizationPage goTo={goTo} />;
    if (route.page === 'for-designers') return <ForDesignersPage goTo={goTo} />;
    if (route.page === 'playground') return <PlaygroundPage radius={radius} />;
    return <HomePage goTo={goTo} />;
  }, [route, radius]);

  return (
    <Theme
      accentColor={accent}
      grayColor={gray}
      radius={radius}
      scaling={scaling}
      appearance={appearance}
      fontFamily={{
        primary: '"Figtree", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        secondary: '"Figtree", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        display: '"Figtree", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <Box className="site-shell">
        <Flex as="header" className="site-header" align="center" justify="space-between">
          <Button className="site-logo" variant="ghost" onClick={() => goTo('home')}>base-ic</Button>
          <Flex as="nav" className="site-nav" aria-label="Primary" align="center" gap={1}>
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.page}
                className="site-nav-link"
                data-active={route.page === item.page}
                variant="ghost"
                onClick={() => goTo(item.page)}
              >
                {item.label}
              </Button>
            ))}
          </Flex>
        </Flex>

        {pageContent}
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
        defaultOpen={route.page === 'playground'}
      />
    </Theme>
  );
}
