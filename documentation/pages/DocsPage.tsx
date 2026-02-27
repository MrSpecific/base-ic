import { Container, Grid } from '../../src';
import { OverviewDocsPage } from './docs/OverviewDocsPage';
import { PopoverDocsPage } from './docs/PopoverDocsPage';
import { ThemeDocsPage } from './docs/ThemeDocsPage';
import { TooltipDocsPage } from './docs/TooltipDocsPage';
import { BoxDocsPage } from './docs/BoxDocsPage';
import { FlexDocsPage } from './docs/FlexDocsPage';
import { GridDocsPage } from './docs/GridDocsPage';
import { ContainerDocsPage } from './docs/ContainerDocsPage';
import { SectionDocsPage } from './docs/SectionDocsPage';
import type { DocsSection } from '../types';

export function DocsPage({
  section,
  goToDocsSection,
}: {
  section: DocsSection;
  goToDocsSection: (next: DocsSection) => void;
}) {
  const docsNavGroups: Array<{
    title: string;
    items: Array<{ id: DocsSection; label: string }>;
  }> = [
    {
      title: 'Overview',
      items: [{ id: 'overview', label: 'Getting Started' }],
    },
    {
      title: 'Theming',
      items: [{ id: 'theme', label: 'Theme' }],
    },
    {
      title: 'Layout',
      items: [
        { id: 'box', label: 'Box' },
        { id: 'flex', label: 'Flex' },
        { id: 'grid', label: 'Grid' },
        { id: 'container', label: 'Container' },
        { id: 'section', label: 'Section' },
      ],
    },
    {
      title: 'Overlays',
      items: [
        { id: 'tooltip', label: 'Tooltip' },
        { id: 'popover', label: 'Popover' },
      ],
    },
  ];

  const docsBody = (() => {
    if (section === 'theme') return <ThemeDocsPage />;
    if (section === 'box') return <BoxDocsPage />;
    if (section === 'flex') return <FlexDocsPage />;
    if (section === 'grid') return <GridDocsPage />;
    if (section === 'container') return <ContainerDocsPage />;
    if (section === 'section') return <SectionDocsPage />;
    if (section === 'tooltip') return <TooltipDocsPage />;
    if (section === 'popover') return <PopoverDocsPage />;
    return <OverviewDocsPage />;
  })();

  return (
    <Container as="main" className="site-page">
      <Grid className="docs-layout" columns="240px minmax(0, 1fr)" gap={4}>
      <aside className="docs-sidebar" aria-label="Docs sections">
        <div className="docs-sidebar-title">Documentation</div>
        {docsNavGroups.map((group) => (
          <div key={group.title} className="docs-sidebar-group">
            <div className="docs-sidebar-group-title">{group.title}</div>
            {group.items.map((item) => (
              <button
                key={item.id}
                className="docs-sidebar-link"
                data-active={section === item.id}
                onClick={() => goToDocsSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </aside>
      <div className="docs-page">{docsBody}</div>
      </Grid>
    </Container>
  );
}
