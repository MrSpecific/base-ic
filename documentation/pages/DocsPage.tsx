import { lazy, Suspense, useEffect, useId, useRef, useState } from "react";
import type { ComponentType, LazyExoticComponent } from "react";
import { Button, Container, Grid, Input, Separator, Text } from "../../src";
import { ButtonLink } from "../components/RouteLink";
import { DOCS_GROUPS, DOCS_ROUTES, pageToPath } from "../routes";
import type { DocsRoute } from "../routes";
import type { DocsSection } from "../types";

// Each docs section is its own chunk so a page only loads the demos it shows.
const SECTION_PAGES: Record<DocsSection, LazyExoticComponent<ComponentType>> = {
  overview: lazy(() => import("./docs/OverviewDocsPage").then((m) => ({ default: m.OverviewDocsPage }))),
  types: lazy(() => import("./docs/TypesDocsPage").then((m) => ({ default: m.TypesDocsPage }))),
  theme: lazy(() => import("./docs/ThemeDocsPage").then((m) => ({ default: m.ThemeDocsPage }))),
  button: lazy(() => import("./docs/ButtonDocsPage").then((m) => ({ default: m.ButtonDocsPage }))),
  badge: lazy(() => import("./docs/BadgeDocsPage").then((m) => ({ default: m.BadgeDocsPage }))),
  card: lazy(() => import("./docs/CardDocsPage").then((m) => ({ default: m.CardDocsPage }))),
  separator: lazy(() => import("./docs/SeparatorDocsPage").then((m) => ({ default: m.SeparatorDocsPage }))),
  box: lazy(() => import("./docs/BoxDocsPage").then((m) => ({ default: m.BoxDocsPage }))),
  flex: lazy(() => import("./docs/FlexDocsPage").then((m) => ({ default: m.FlexDocsPage }))),
  grid: lazy(() => import("./docs/GridDocsPage").then((m) => ({ default: m.GridDocsPage }))),
  container: lazy(() => import("./docs/ContainerDocsPage").then((m) => ({ default: m.ContainerDocsPage }))),
  section: lazy(() => import("./docs/SectionDocsPage").then((m) => ({ default: m.SectionDocsPage }))),
  tooltip: lazy(() => import("./docs/TooltipDocsPage").then((m) => ({ default: m.TooltipDocsPage }))),
  popover: lazy(() => import("./docs/PopoverDocsPage").then((m) => ({ default: m.PopoverDocsPage }))),
  checkbox: lazy(() => import("./docs/CheckboxDocsPage").then((m) => ({ default: m.CheckboxDocsPage }))),
  switch: lazy(() => import("./docs/SwitchDocsPage").then((m) => ({ default: m.SwitchDocsPage }))),
  "radio-group": lazy(() => import("./docs/RadioGroupDocsPage").then((m) => ({ default: m.RadioGroupDocsPage }))),
  input: lazy(() => import("./docs/InputDocsPage").then((m) => ({ default: m.InputDocsPage }))),
  select: lazy(() => import("./docs/SelectDocsPage").then((m) => ({ default: m.SelectDocsPage }))),
  autocomplete: lazy(() => import("./docs/AutocompleteDocsPage").then((m) => ({ default: m.AutocompleteDocsPage }))),
  textarea: lazy(() => import("./docs/TextareaDocsPage").then((m) => ({ default: m.TextareaDocsPage }))),
  tabs: lazy(() => import("./docs/TabsDocsPage").then((m) => ({ default: m.TabsDocsPage }))),
  "navigation-menu": lazy(() => import("./docs/NavigationMenuDocsPage").then((m) => ({ default: m.NavigationMenuDocsPage }))),
  dialog: lazy(() => import("./docs/DialogDocsPage").then((m) => ({ default: m.DialogDocsPage }))),
  "alert-dialog": lazy(() => import("./docs/AlertDialogDocsPage").then((m) => ({ default: m.AlertDialogDocsPage }))),
  drawer: lazy(() => import("./docs/DrawerDocsPage").then((m) => ({ default: m.DrawerDocsPage }))),
  toast: lazy(() => import("./docs/ToastDocsPage").then((m) => ({ default: m.ToastDocsPage }))),
  accordion: lazy(() => import("./docs/AccordionDocsPage").then((m) => ({ default: m.AccordionDocsPage }))),
  slider: lazy(() => import("./docs/SliderDocsPage").then((m) => ({ default: m.SliderDocsPage }))),
  progress: lazy(() => import("./docs/ProgressDocsPage").then((m) => ({ default: m.ProgressDocsPage }))),
  avatar: lazy(() => import("./docs/AvatarDocsPage").then((m) => ({ default: m.AvatarDocsPage }))),
  field: lazy(() => import("./docs/FieldDocsPage").then((m) => ({ default: m.FieldDocsPage }))),
  fieldset: lazy(() => import("./docs/FieldsetDocsPage").then((m) => ({ default: m.FieldsetDocsPage }))),
  "number-field": lazy(() => import("./docs/NumberFieldDocsPage").then((m) => ({ default: m.NumberFieldDocsPage }))),
  "otp-field": lazy(() => import("./docs/OTPFieldDocsPage").then((m) => ({ default: m.OTPFieldDocsPage }))),
  toggle: lazy(() => import("./docs/ToggleDocsPage").then((m) => ({ default: m.ToggleDocsPage }))),
  table: lazy(() => import("./docs/TableDocsPage").then((m) => ({ default: m.TableDocsPage }))),
  "data-list": lazy(() => import("./docs/DataListDocsPage").then((m) => ({ default: m.DataListDocsPage }))),
  inset: lazy(() => import("./docs/InsetDocsPage").then((m) => ({ default: m.InsetDocsPage }))),
  menu: lazy(() => import("./docs/MenuDocsPage").then((m) => ({ default: m.MenuDocsPage }))),
  menubar: lazy(() => import("./docs/MenubarDocsPage").then((m) => ({ default: m.MenubarDocsPage }))),
  collapsible: lazy(() => import("./docs/CollapsibleDocsPage").then((m) => ({ default: m.CollapsibleDocsPage }))),
  skeleton: lazy(() => import("./docs/SkeletonDocsPage").then((m) => ({ default: m.SkeletonDocsPage }))),
  typography: lazy(() => import("./docs/TypographyDocsPage").then((m) => ({ default: m.TypographyDocsPage }))),
  text: lazy(() => import("./docs/TextDocsPage").then((m) => ({ default: m.TextDocsPage }))),
  heading: lazy(() => import("./docs/HeadingDocsPage").then((m) => ({ default: m.HeadingDocsPage }))),
  link: lazy(() => import("./docs/LinkDocsPage").then((m) => ({ default: m.LinkDocsPage }))),
  code: lazy(() => import("./docs/CodeDocsPage").then((m) => ({ default: m.CodeDocsPage }))),
  kbd: lazy(() => import("./docs/KbdDocsPage").then((m) => ({ default: m.KbdDocsPage }))),
  em: lazy(() => import("./docs/EmDocsPage").then((m) => ({ default: m.EmDocsPage }))),
  strong: lazy(() => import("./docs/StrongDocsPage").then((m) => ({ default: m.StrongDocsPage }))),
  quote: lazy(() => import("./docs/QuoteDocsPage").then((m) => ({ default: m.QuoteDocsPage }))),
};

const IS_MAC =
  typeof navigator !== "undefined" &&
  /Mac|iPhone|iPad|iPod/i.test(
    (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform ??
      navigator.platform ??
      navigator.userAgent,
  );

function matchesQuery(route: DocsRoute, query: string): boolean {
  if (!query) return true;
  const haystack = [route.label, route.slug, route.title ?? "", route.group, ...(route.keywords ?? [])]
    .join(" ")
    .toLowerCase();
  return query.split(/\s+/).every((term) => haystack.includes(term));
}

export function DocsPage({ section }: { section: DocsSection }) {
  const [query, setQuery] = useState("");
  // Below 960px the sidebar collapses behind a disclosure button.
  const [navOpen, setNavOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navId = useId();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setNavOpen(true);
        // Wait a frame so the (possibly collapsed) sidebar is visible.
        window.requestAnimationFrame(() => {
          searchInputRef.current?.focus();
          searchInputRef.current?.select();
        });
      } else if (event.key === "Escape" && document.activeElement === searchInputRef.current) {
        setQuery("");
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setNavOpen(false);
  }, [section]);

  const normalizedQuery = query.trim().toLowerCase();
  const navGroups = DOCS_GROUPS.map((group) => ({
    title: group,
    items: DOCS_ROUTES.filter(
      (route) => route.group === group && matchesQuery(route, normalizedQuery),
    ),
  })).filter((group) => group.items.length > 0);

  const currentRoute = DOCS_ROUTES.find((route) => route.slug === section);
  const SectionPage = SECTION_PAGES[section];

  return (
    <Container as="main" className="site-page">
      <Grid className="docs-layout" columns="240px minmax(0, 1fr)" gap={4}>
        <aside className="docs-sidebar" data-open={navOpen || undefined}>
          <Button
            className="docs-sidebar-toggle"
            variant="surface"
            color="gray"
            size="2"
            aria-expanded={navOpen}
            aria-controls={navId}
            onClick={() => setNavOpen((open) => !open)}
          >
            <span>Browse components</span>
            <span className="docs-sidebar-toggle-current">
              {currentRoute?.label}
              <span aria-hidden="true">{navOpen ? " ▴" : " ▾"}</span>
            </span>
          </Button>
          <nav id={navId} className="docs-sidebar-nav" aria-label="Docs sections">
            <Input
              ref={searchInputRef}
              wrapperClassName="docs-sidebar-search"
              size="1"
              type="search"
              placeholder="Search components…"
              aria-label="Search docs sections"
              aria-keyshortcuts={IS_MAC ? "Meta+K" : "Control+K"}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              suffix={
                !query ? (
                  <kbd className="docs-sidebar-search-kbd" aria-hidden="true">
                    {IS_MAC ? "⌘K" : "Ctrl K"}
                  </kbd>
                ) : undefined
              }
            />
            {navGroups.length === 0 ? (
              <Text as="p" size="1" className="docs-sidebar-empty" role="status">
                No matches for “{query}”.
              </Text>
            ) : (
              navGroups.map((group, index) => (
                <div key={group.title}>
                  <div className="docs-sidebar-group">
                    <div className="docs-sidebar-group-title">{group.title}</div>
                    {group.items.map((item) => (
                      <ButtonLink
                        key={item.slug}
                        href={pageToPath("docs", item.slug)}
                        current={section === item.slug}
                        className="docs-sidebar-link"
                        data-active={section === item.slug}
                        variant="ghost"
                        size="1"
                      >
                        {item.label}
                      </ButtonLink>
                    ))}
                  </div>
                  {index < navGroups.length - 1 ? (
                    <Separator className="docs-sidebar-separator" />
                  ) : null}
                </div>
              ))
            )}
          </nav>
        </aside>
        <div className="docs-page">
          <Suspense fallback={<div className="docs-page-loading" aria-busy="true" />}>
            <SectionPage />
          </Suspense>
        </div>
      </Grid>
    </Container>
  );
}
