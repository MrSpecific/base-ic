import { useEffect, useMemo, useState } from 'react';
import { Theme } from '../src';
import type { AccentColor, Appearance, GrayColor, Radius, Scaling } from './types';
import { NAV_ITEMS } from './constants';
import { getRouteFromPath, pageToPath } from './routing';
import { ThemePanel } from './components/ThemePanel';
import { HomePage } from './pages/HomePage';
import { DocsPage } from './pages/DocsPage';
import { CustomizationPage } from './pages/CustomizationPage';
import { ForDesignersPage } from './pages/ForDesignersPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import '../src/tokens/index.css';
import './documentation.css';

export default function App() {
  const [accent, setAccent] = useState<AccentColor>('blue');
  const [gray, setGray] = useState<GrayColor>('gray');
  const [radius, setRadius] = useState<Radius>('medium');
  const [scaling, setScaling] = useState<Scaling>('100%');
  const [appearance, setAppearance] = useState<Appearance>('light');
  const [route, setRoute] = useState(() => getRouteFromPath(window.location.pathname));

  useEffect(() => {
    const onPopState = () => setRoute(getRouteFromPath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const goTo = (nextPage: typeof route.page, docsSection = route.docsSection) => {
    const nextPath = pageToPath(nextPage, docsSection);
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath);
    }
    setRoute({ page: nextPage, docsSection: nextPage === 'docs' ? docsSection : 'overview' });
  };

  const goToDocsSection = (section: typeof route.docsSection) => {
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
        primary: '"Sen", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        secondary: '"Sen", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        display: '"Sen", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <div className="site-shell">
        <header className="site-header">
          <button className="site-logo" onClick={() => goTo('home')}>base-ic</button>
          <nav className="site-nav" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.page}
                className="site-nav-link"
                data-active={route.page === item.page}
                onClick={() => goTo(item.page)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </header>

        {pageContent}
      </div>

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
