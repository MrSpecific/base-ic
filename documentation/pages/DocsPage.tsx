import { OverviewDocsPage } from './docs/OverviewDocsPage';
import { PopoverDocsPage } from './docs/PopoverDocsPage';
import { ThemeDocsPage } from './docs/ThemeDocsPage';
import { TooltipDocsPage } from './docs/TooltipDocsPage';
import type { DocsSection } from '../types';

export function DocsPage({
  section,
  goToDocsSection,
}: {
  section: DocsSection;
  goToDocsSection: (next: DocsSection) => void;
}) {
  const docsNavItems: Array<{ id: DocsSection; label: string }> = [
    { id: 'overview', label: 'Overview' },
    { id: 'theme', label: 'Theme' },
    { id: 'tooltip', label: 'Tooltip' },
    { id: 'popover', label: 'Popover' },
  ];

  const docsBody = (() => {
    if (section === 'theme') return <ThemeDocsPage />;
    if (section === 'tooltip') return <TooltipDocsPage />;
    if (section === 'popover') return <PopoverDocsPage />;
    return <OverviewDocsPage />;
  })();

  return (
    <main className="site-page docs-layout">
      <aside className="docs-sidebar" aria-label="Docs sections">
        <div className="docs-sidebar-title">Documentation</div>
        {docsNavItems.map((item) => (
          <button
            key={item.id}
            className="docs-sidebar-link"
            data-active={section === item.id}
            onClick={() => goToDocsSection(item.id)}
          >
            {item.label}
          </button>
        ))}
      </aside>
      <div className="docs-page">{docsBody}</div>
    </main>
  );
}
