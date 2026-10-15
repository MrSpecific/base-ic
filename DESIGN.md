# base-ic Design Document

> Internal reference for architecture decisions, design philosophy, and patterns.
> Update this as decisions are made and patterns solidify.

---

## Project Overview

**base-ic** is an opinionated, open-source UI component library built on [Base UI](https://base-ui.com) primitives with a high-level API inspired by [Radix UI Themes](https://www.radix-ui.com/themes). It aims to provide the ease-of-use of Radix Themes while offering deeper customization — particularly around color palettes and brand theming.

**Key Goals:**
1. Fast, comfortable DX for people familiar with Radix Themes
2. Deep, first-class theming — easy to extend the color palette and match any brand guide
3. Zero Tailwind — styling is done with CSS custom properties and CSS modules
4. Base UI patterns win over Radix patterns when they diverge
5. Open, collaborative API design — new patterns are discussed and decided together

---

## North Stars

- **No Tailwind.** CSS custom properties + CSS modules only.
- **Base UI patterns win** when Base UI and Radix diverge (e.g., `mergeProps`, render props, compound component naming).
- **Radix Themes DX is the UX north star** — props like `color`, `variant`, `size`, `radius` feel familiar.
- **Theming is a first-class citizen**, not an afterthought. Adding a brand color should be 2-3 lines.
- **Composable, not monolithic.** Users can import only what they need.

---

## Technology Decisions

### Component Primitives: Base UI

Base UI provides unstyled, accessible component primitives. We wrap these with styling and an opinionated API.

- Styled convenience wrappers (`Button`, `Dialog`, `Menu`, …), with sub-parts attached where needed (`Menu.Item`, `Tabs.Tab`, `Field.Label`)
- Raw Base UI namespaces re-exported as `*Primitive` (`DialogPrimitive`, `MenuPrimitive`, …) as an escape hatch
- Components without a Base UI primitive (`Badge`, `Card`, `Link`) use Base UI's `useRender` for `render` prop support; it merges `className`, `style`, event handlers, and refs
- Accessibility is handled by Base UI — we do not re-implement it

### Design Tokens: CSS Custom Properties (with Open Props influence)

We define our own token layer as CSS custom properties. We draw inspiration from [Open Props](https://open-props.style/) for naming conventions and token organization, but we do NOT import Open Props directly as a dependency (avoids coupling and keeps bundle lean).

Token philosophy inspired by Open Props:
- Predictable naming: `--category-scale` (e.g., `--space-3`, `--radius-2`, `--color-accent-9`)
- Low numbers = lighter/smaller, high numbers = darker/larger
- Semantic aliases layer on top of raw tokens (e.g., `--color-text-primary` → `--color-neutral-12` → the selected gray hue)

### Styling: CSS Modules

Each component ships with a CSS module (`.module.css`). No runtime CSS-in-JS. No Tailwind.

Rationale:
- Zero runtime overhead
- Excellent TypeScript support via typed CSS modules
- Scoped by default
- Works with any bundler (Vite, Webpack, Rollup, Parcel, Next.js, etc.)
- CSS custom properties flow through naturally — themes just redefine variables

---

## Token Architecture

### Layer 1: Primitive Tokens

Raw scale values. Color scales live in `tokens/colors/<hue>.css` (dark-mode values in `tokens/dark.css`); spacing, size, radius, type, shadow, and motion live in `tokens/primitives.css`. Users rarely reference these directly.

```css
/* Color primitives — one scale per hue (tokens/colors/blue.css) */
--color-blue-1: oklch(98.5% 0.007 250);
--color-blue-2: oklch(97.0% 0.015 250);
/* ... through --color-blue-12, plus --color-blue-contrast */

/* Spacing primitives */
--space-1: 0.25rem;
--space-2: 0.5rem;
/* ... */

/* Radius primitives */
--radius-1: 2px;
--radius-2: 4px;
/* ... */
```

### Layer 2: Semantic Tokens

Purpose-based aliases. These live in `tokens/semantic.css` and reference primitives. Light/dark variants are defined here via `prefers-color-scheme` or `.dark` / `[data-appearance='dark']`.

The accent is a full 12-step ramp (`--color-accent-1`…`12` + `--color-accent-contrast`), defaulting to blue at `:root`. `Theme` rewires it to the chosen hue with inline styles on its element; `--color-neutral-*` works the same way for `grayColor`.

```css
:root {
  --color-accent-3:        var(--color-blue-3);        /* Subtle accent background */
  --color-accent-9:        var(--color-blue-9);        /* Solid accent fill */
  --color-accent-10:       var(--color-blue-10);       /* Solid accent fill, hover */
  --color-accent-contrast: var(--color-blue-contrast); /* Text on accent fill */

  --color-text-primary:    var(--color-neutral-12);
  --color-text-secondary:  var(--color-neutral-11);
  --color-surface-base:    var(--color-neutral-1);
  --color-border:          var(--color-neutral-7);
}

@media (prefers-color-scheme: dark) {
  :root { /* ... dark overrides ... */ }
}

:where(.dark, [data-appearance='dark']) { /* ... dark overrides (explicit toggle) ... */ }
```

### Layer 3: Component Tokens

Per-size presets are declared in `semantic.css` (`--button-{1-4}-height`, `-px`, `-font-size`, `-gap`, `-icon-size`). The component maps its props to private `--btn-*` variables inline, and the CSS module reads them with the accent ramp as fallback.

```css
/* semantic.css — re-declared on every Theme root so it re-resolves against
   that Theme's scaling; override globally with `:root, [data-base-ic-theme]` */
:root,
:where([data-base-ic-theme]) {
  --button-2-height: var(--size-3);  /* 32px */
  --button-2-px:     var(--space-3); /* 12px */
}

/* button.module.css — Button.tsx sets --btn-height: var(--button-2-height) for size="2",
   and --btn-accent-N only when a `color` prop is passed */
.button {
  min-height: var(--btn-height);
  border-radius: var(--btn-radius, var(--component-radius));
}
.solid {
  background-color: var(--btn-accent-9, var(--color-accent-9));
  color: var(--btn-accent-contrast, var(--color-accent-contrast));
}
```

---

## Theming API

The `Theme` component is the primary way to apply a theme. It sets CSS custom properties on its root element.

```jsx
<Theme accentColor="violet" grayColor="slate" radius="medium" scaling="100%">
  <App />
</Theme>
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `accentColor` | `ColorName` | Primary brand color. Built-in + custom. |
| `grayColor` | `GrayName` | Neutral palette (gray, slate, mauve, sand, olive, sage) |
| `radius` | `'none' \| 'small' \| 'medium' \| 'large' \| 'full'` | Border radius scale |
| `scaling` | `'80%'` – `'150%'` in 5% steps | Overall size scaling |
| `appearance` | `'light' \| 'dark' \| 'inherit'` | Color scheme |
| `fontFamily` | `{ primary?, secondary?, tertiary?, display?, monospace? }` | Font slot overrides (`--font-family-*`); unspecified slots inherit |
| `customColors` | `Record<string, CustomColorScale>` | Define extra 12-step ramps (see below) |
| `style` / `className` | — | Passed to the Theme element; `style` is applied after Theme's vars, so it can override tokens ad hoc |

### Custom Color Extension

Unlike Radix Themes, adding a custom brand color is a first-class feature:

```jsx
<Theme
  accentColor="brand"
  customColors={{
    brand: {
      1: 'oklch(98% 0.01 340)',
      2: 'oklch(96% 0.02 340)',
      /* ... through 12 */
      contrast: 'white',
    }
  }}
>
  <App />
</Theme>
```

Or via CSS (for static builds / SSR):

```css
:root {
  --color-brand-1: oklch(98% 0.01 340);
  /* ... */
}
```

---

## Component API Design

### Standard Props (all applicable components)

Mirroring Radix Themes for familiarity:

| Prop | Values | Notes |
|------|--------|-------|
| `color` | `AccentColor` | Override accent color for this component |
| `variant` | Component-specific (e.g. Button: `'solid' \| 'soft' \| 'surface' \| 'outline' \| 'ghost'`) | Visual style |
| `size` | Numeric strings, usually `'1'`–`'4'` | Numeric scale (string) like Radix |
| `radius` | `'none' \| 'small' \| 'medium' \| 'large' \| 'full'` | Override radius for this component |
| `highContrast` | `boolean` | Button, Badge, Toggle, and Text/Heading/Link/Code/Quote only. On typography it requires `color` (step 11 → 12) |

### Component Structure

Each component is a styled convenience wrapper with Radix-Themes-style props. Where a component has parts, they hang off the wrapper; Base UI-backed components also re-export the raw Base UI namespace as `*Primitive`:

```tsx
// Simple wrapper
<Button size="2" variant="solid" color="violet">Click me</Button>

// Wrapper with attached parts
<Tabs defaultValue="a">
  <Tabs.List>
    <Tabs.Tab value="a">A</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="a">…</Tabs.Panel>
</Tabs>

// Escape hatch: unstyled Base UI namespace
import { DialogPrimitive } from '@wlcr/base-ic';
<DialogPrimitive.Root>…</DialogPrimitive.Root>
```

`*Primitive` exports currently exist for Accordion, AlertDialog, Autocomplete, Avatar, Collapsible, Dialog, Drawer, Field, Fieldset, Menu, Menubar, NavigationMenu, NumberField, OTPField, Popover, Progress, Select, Slider, Tabs, Toast, Toggle/ToggleGroup, and Tooltip.

### The `render` Prop (Base UI pattern)

When users need to change the rendered element, Base UI's `render` prop is used — not `asChild` (Radix pattern).

```tsx
// Base UI pattern (we follow this)
<Link render={<RouterLink to="/page" />}>Go to page</Link>
<Card render={<a href="/page" />}>…</Card>

// Radix pattern (we do NOT use this)
<Button asChild><a href="/page">Go to page</a></Button>
```

---

## File Structure

```
base-ic/
├── src/
│   ├── tokens/
│   │   ├── primitives.css        # Spacing, size, radius, type, shadow, motion
│   │   ├── semantic.css          # Semantic aliases + component size presets (light + dark)
│   │   ├── dark.css              # Dark-mode color primitive overrides
│   │   ├── custom-color-template.css # Starter file for a custom brand ramp
│   │   ├── colors/
│   │   │   ├── blue.css          # One file per hue (32 total)
│   │   │   ├── ...
│   │   │   └── index.css         # Barrel import
│   │   └── index.css             # Barrel import (exported as @wlcr/base-ic/tokens)
│   ├── components/
│   │   ├── Theme/
│   │   │   ├── Theme.tsx         # Theme + useTheme (context hook lives here)
│   │   │   ├── theme.module.css
│   │   │   └── index.ts
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── button.module.css
│   │   │   └── index.ts
│   │   ├── Layout/               # Box, Flex, Grid, Container, Section + layout.utils.ts
│   │   ├── Typography/           # Text, Heading, Link, Code, Kbd, Em, Strong, Quote
│   │   ├── shared/               # Internal helpers (useThemePortal)
│   │   ├── __tests__/
│   │   └── ...                   # One folder per component
│   ├── types.ts                  # Reusable prop value types
│   └── index.ts                  # Main library entry
├── documentation/                # Docs site (base-ic.vercel.app)
├── DESIGN.md                     # This file
├── README.md
├── vite.config.ts                # Library build (ESM, preserveModules, single style.css)
└── package.json
```

---

## Color System Design

### Built-in Hues

The full Radix Themes palette — 31 scales (6 grays + 25 colors) — plus a monochrome `black` accent, one file each in `src/tokens/colors/`:

- Grays (usable as `grayColor` or `accentColor`): `gray`, `mauve`, `slate`, `sage`, `olive`, `sand`
- Colors: `tomato`, `red`, `ruby`, `crimson`, `pink`, `plum`, `purple`, `violet`, `iris`, `indigo`, `blue`, `cyan`, `teal`, `jade`, `green`, `grass`, `bronze`, `gold`, `brown`, `orange`, `amber`, `yellow`, `lime`, `mint`, `sky`
- Extra: `black`

Each hue has 12 lightness steps + a `contrast` value (for text on colored backgrounds).

### Scale Semantics (aligned with Radix convention)

| Step | Use case |
|------|----------|
| 1 | App background |
| 2 | Subtle background |
| 3 | UI element background |
| 4 | Hovered UI element background |
| 5 | Active / selected UI element background |
| 6 | Subtle borders and separators |
| 7 | UI element border and focus rings |
| 8 | Hovered UI element border |
| 9 | Solid backgrounds |
| 10 | Hovered solid backgrounds |
| 11 | Low-contrast text |
| 12 | High-contrast text |

### OKLCH Color Space

We generate colors in OKLCH for perceptually uniform lightness across hues. This is what makes colors like purple and yellow look equally "vivid" at the same step number.

---

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-02-27 | Use CSS Modules over CSS-in-JS | Zero runtime, bundler agnostic, works with SSR |
| 2026-02-27 | Use Base UI `render` prop over Radix `asChild` | Base UI is our component foundation; use its patterns |
| 2026-02-27 | Token names inspired by Open Props but not a direct dep | Keeps bundle lean, we control naming |
| 2026-02-27 | OKLCH color space for all color tokens | Perceptually uniform, better dark mode |
| 2026-02-27 | Numeric size scale as strings ('1', '2', ...) | Familiar to Radix Themes users |
| 2026-02-27 | No Tailwind | Explicit project decision |
| 2026-02-27 | Font customization via `Theme` `fontFamily` prop (primary/secondary/tertiary/display/monospace slots → `--font-family-*`) | Resolves open question; slots map to plain CSS vars |
| 2026-02-27 | `Theme` accepts `style` (applied after its own vars) for ad-hoc token overrides | Resolves open question |
| 2026-02-27 | ThemePanel lives in the docs site (`documentation/components/ThemePanel.tsx`), not the package | Resolves open question; dev/docs tool, not shipped API |
| 2026-02-27 | ESM-only build output (`format: 'es'`, `preserveModules`), single `style.css` | Resolves open question; tree-shakeable, bundler-friendly |
| 2026-10-15 | Nested `Theme` inherits every unset prop (`accentColor`, `grayColor`, `radius`, `scaling`, `appearance`; `fontFamily` slots merge) from the nearest ancestor `Theme`; `appearance="inherit"` means "same as parent" (root: `prefers-color-scheme`) | Resolves open question; a nested Theme should only change what it names |
| 2026-10-15 | Semantic/size tokens are re-declared on every Theme root (`:root, :where([data-base-ic-theme])`); global overrides target `:root, [data-base-ic-theme]` | Aliases must re-resolve against each Theme's inline inputs (accent, neutral, radius, scaling) instead of freezing at `:root` defaults |

---

## Open Questions

- [ ] Should we ship a PostCSS plugin for JIT token loading (like Open Props JIT)?
- [x] ~~How do we handle font customization?~~ — `fontFamily` prop on `Theme` (see Decisions Log)
- [x] ~~Should `Theme` accept a `style` prop for ad-hoc token overrides?~~ — yes (see Decisions Log)
- [x] ~~Do we want a visual ThemeEditor component for development?~~ — ThemePanel in the docs site (see Decisions Log)
- [x] ~~How do nested `Theme` components behave? Full override or inheritance?~~ — inheritance (see Decisions Log)
- [x] ~~What's our build output format — ESM only? CJS too?~~ — ESM only (see Decisions Log)
- [ ] Do we want a CLI to scaffold custom color palettes from a hex/oklch input?
