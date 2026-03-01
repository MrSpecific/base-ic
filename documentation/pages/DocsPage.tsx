import { Button, Container, Grid, Separator } from "../../src";
import { OverviewDocsPage } from "./docs/OverviewDocsPage";
import { PopoverDocsPage } from "./docs/PopoverDocsPage";
import { ThemeDocsPage } from "./docs/ThemeDocsPage";
import { TooltipDocsPage } from "./docs/TooltipDocsPage";
import { ButtonDocsPage } from "./docs/ButtonDocsPage";
import { BadgeDocsPage } from "./docs/BadgeDocsPage";
import { CardDocsPage } from "./docs/CardDocsPage";
import { SeparatorDocsPage } from "./docs/SeparatorDocsPage";
import { TypographyDocsPage } from "./docs/TypographyDocsPage";
import { TextDocsPage } from "./docs/TextDocsPage";
import { HeadingDocsPage } from "./docs/HeadingDocsPage";
import { LinkDocsPage } from "./docs/LinkDocsPage";
import { CodeDocsPage } from "./docs/CodeDocsPage";
import { KbdDocsPage } from "./docs/KbdDocsPage";
import { EmDocsPage } from "./docs/EmDocsPage";
import { StrongDocsPage } from "./docs/StrongDocsPage";
import { QuoteDocsPage } from "./docs/QuoteDocsPage";
import { BoxDocsPage } from "./docs/BoxDocsPage";
import { FlexDocsPage } from "./docs/FlexDocsPage";
import { GridDocsPage } from "./docs/GridDocsPage";
import { ContainerDocsPage } from "./docs/ContainerDocsPage";
import { SectionDocsPage } from "./docs/SectionDocsPage";
import { CheckboxDocsPage } from "./docs/CheckboxDocsPage";
import { SwitchDocsPage } from "./docs/SwitchDocsPage";
import { RadioGroupDocsPage } from "./docs/RadioGroupDocsPage";
import { InputDocsPage } from "./docs/InputDocsPage";
import { SelectDocsPage } from "./docs/SelectDocsPage";
import { TextareaDocsPage } from "./docs/TextareaDocsPage";
import { TabsDocsPage } from "./docs/TabsDocsPage";
import { DialogDocsPage } from "./docs/DialogDocsPage";
import type { DocsSection } from "../types";

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
      title: "Overview",
      items: [{ id: "overview", label: "Getting Started" }],
    },
    {
      title: "Theming",
      items: [{ id: "theme", label: "Theme" }],
    },
    {
      title: "Components",
      items: [
        { id: "button", label: "Button" },
        { id: "badge", label: "Badge" },
        { id: "card", label: "Card" },
        { id: "separator", label: "Separator" },
      ],
    },
    {
      title: "Forms",
      items: [
        { id: "input", label: "Input" },
        { id: "textarea", label: "Textarea" },
        { id: "select", label: "Select" },
        { id: "checkbox", label: "Checkbox" },
        { id: "switch", label: "Switch" },
        { id: "radio-group", label: "RadioGroup" },
      ],
    },
    {
      title: "Layout",
      items: [
        { id: "box", label: "Box" },
        { id: "flex", label: "Flex" },
        { id: "grid", label: "Grid" },
        { id: "container", label: "Container" },
        { id: "section", label: "Section" },
      ],
    },
    {
      title: "Overlays",
      items: [
        { id: "tooltip", label: "Tooltip" },
        { id: "popover", label: "Popover" },
        { id: "dialog", label: "Dialog" },
      ],
    },
    {
      title: "Navigation",
      items: [
        { id: "tabs", label: "Tabs" },
      ],
    },
    {
      title: "Typography",
      items: [
        { id: "typography", label: "Overview" },
        { id: "text", label: "Text" },
        { id: "heading", label: "Heading" },
        { id: "link", label: "Link" },
        { id: "code", label: "Code" },
        { id: "kbd", label: "Kbd" },
        { id: "em", label: "Em" },
        { id: "strong", label: "Strong" },
        { id: "quote", label: "Quote" },
      ],
    },
  ];

  const docsBody = (() => {
    if (section === "theme") return <ThemeDocsPage />;
    if (section === "button") return <ButtonDocsPage />;
    if (section === "badge") return <BadgeDocsPage />;
    if (section === "card") return <CardDocsPage />;
    if (section === "separator") return <SeparatorDocsPage />;
    if (section === "box") return <BoxDocsPage />;
    if (section === "flex") return <FlexDocsPage />;
    if (section === "grid") return <GridDocsPage />;
    if (section === "container") return <ContainerDocsPage />;
    if (section === "section") return <SectionDocsPage />;
    if (section === "tooltip") return <TooltipDocsPage />;
    if (section === "popover") return <PopoverDocsPage />;
    if (section === "checkbox") return <CheckboxDocsPage />;
    if (section === "switch") return <SwitchDocsPage />;
    if (section === "radio-group") return <RadioGroupDocsPage />;
    if (section === "input") return <InputDocsPage />;
    if (section === "select") return <SelectDocsPage />;
    if (section === "textarea") return <TextareaDocsPage />;
    if (section === "tabs") return <TabsDocsPage />;
    if (section === "dialog") return <DialogDocsPage />;
    if (section === "typography") return <TypographyDocsPage />;
    if (section === "text") return <TextDocsPage />;
    if (section === "heading") return <HeadingDocsPage />;
    if (section === "link") return <LinkDocsPage />;
    if (section === "code") return <CodeDocsPage />;
    if (section === "kbd") return <KbdDocsPage />;
    if (section === "em") return <EmDocsPage />;
    if (section === "strong") return <StrongDocsPage />;
    if (section === "quote") return <QuoteDocsPage />;
    return <OverviewDocsPage />;
  })();

  return (
    <Container as="main" className="site-page">
      <Grid className="docs-layout" columns="240px minmax(0, 1fr)" gap={4}>
        <aside className="docs-sidebar" aria-label="Docs sections">
          {docsNavGroups.map((group, index) => (
            <div key={group.title}>
              <div className="docs-sidebar-group">
                <div className="docs-sidebar-group-title">{group.title}</div>
                {group.items.map((item) => (
                  <Button
                    key={item.id}
                    className="docs-sidebar-link"
                    data-active={section === item.id}
                    variant="ghost"
                    size="2"
                    onClick={() => goToDocsSection(item.id)}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
              {index < docsNavGroups.length - 1 ? (
                <Separator className="docs-sidebar-separator" />
              ) : null}
            </div>
          ))}
        </aside>
        <div className="docs-page">{docsBody}</div>
      </Grid>
    </Container>
  );
}
