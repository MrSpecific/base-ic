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

- Compound component pattern: `Button.Root`, `Dialog.Trigger`, etc. (Base UI namespace style)
- Use `mergeProps` from Base UI for prop merging in internal composition
- Use Base UI's `useRender` hook pattern for render prop support
- Accessibility is handled by Base UI — we do not re-implement it

### Design Tokens: CSS Custom Properties (with Open Props influence)

We define our own token layer as CSS custom properties. We draw inspiration from [Open Props](https://open-props.style/) for naming conventions and token organization, but we do NOT import Open Props directly as a dependency (avoids coupling and keeps bundle lean).

Token philosophy inspired by Open Props:
- Predictable naming: `--category-scale` (e.g., `--space-3`, `--radius-2`, `--color-accent-9`)
- Low numbers = lighter/smaller, high numbers = darker/larger
- Semantic aliases layer on top of raw tokens (e.g., `--color-text-primary` → `--color-gray-12`)

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

Raw scale values. These live in `tokens/primitives.css`. Users rarely reference these directly.

```css
/* Color primitives — one scale per hue */
--color-blue-1: oklch(98% 0.01 250);
--color-blue-2: oklch(96% 0.02 250);
/* ... through --color-blue-12 */

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

Purpose-based aliases. These live in `tokens/semantic.css` and reference primitives. Light/dark variants are defined here via `prefers-color-scheme` or a `.dark` class.

```css
:root {
  --color-text-primary: var(--color-gray-12);
  --color-text-secondary: var(--color-gray-11);
  --color-surface-base: var(--color-gray-1);
  --color-surface-raised: var(--color-gray-2);
  --color-border: var(--color-gray-6);
  --color-accent: var(--color-blue-9);       /* Current accent hue */
  --color-accent-hover: var(--color-blue-10);
  --color-accent-subtle: var(--color-blue-3);
  --color-accent-contrast: white;            /* Text on accent background */
}

@media (prefers-color-scheme: dark) {
  :root { /* ... dark overrides ... */ }
}

.dark { /* ... dark overrides (class-based toggle) ... */ }
```

### Layer 3: Component Tokens

Per-component custom properties scoped to the component. These compose semantic tokens.

```css
/* button.module.css */
.button {
  --button-height: var(--size-8);
  --button-padding-x: var(--space-3);
  --button-radius: var(--component-radius);
  background: var(--color-accent);
  color: var(--color-accent-contrast);
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
| `scaling` | `'90%' \| '95%' \| '100%' \| '105%' \| '110%'` | Overall size scaling |
| `appearance` | `'light' \| 'dark' \| 'inherit'` | Color scheme |

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
| `color` | `ColorName \| 'inherit'` | Override accent color for this component |
| `variant` | `'solid' \| 'soft' \| 'outline' \| 'ghost' \| 'surface'` | Visual style |
| `size` | `'1' \| '2' \| '3' \| '4'` | Numeric scale (string) like Radix |
| `radius` | `'none' \| 'small' \| 'medium' \| 'large' \| 'full'` | Override radius for this component |
| `highContrast` | `boolean` | Increase foreground contrast |

### Component Structure

Components follow the Base UI compound pattern. The top-level named export is a namespace:

```tsx
// Usage
<Button.Root size="2" variant="solid" color="accent">
  <Button.Icon><PlusIcon /></Button.Icon>
  Click me
</Button.Root>

// For simple cases, a convenience wrapper may be provided:
<Button size="2" variant="solid">Click me</Button>
```

The convenience wrapper is sugar over the compound components.

### The `render` Prop (Base UI pattern)

When users need to change the rendered element, Base UI's `render` prop is used — not `asChild` (Radix pattern).

```tsx
// Base UI pattern (we follow this)
<Button.Root render={<a href="/page" />}>Go to page</Button.Root>

// Radix pattern (we do NOT use this)
<Button asChild><a href="/page">Go to page</a></Button>
```

---

## File Structure (target)

```
base-ic/
├── src/
│   ├── tokens/
│   │   ├── primitives.css        # Raw scale tokens
│   │   ├── semantic.css          # Semantic aliases (light + dark)
│   │   ├── colors/
│   │   │   ├── gray.css          # Gray scale primitives
│   │   │   ├── blue.css          # Blue scale primitives
│   │   │   └── ...              # One file per hue
│   │   └── index.css             # Barrel import
│   ├── components/
│   │   ├── Theme/
│   │   │   ├── Theme.tsx
│   │   │   ├── theme.module.css
│   │   │   └── index.ts
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── button.module.css
│   │   │   └── index.ts
│   │   └── ...
│   ├── hooks/
│   │   └── useTheme.ts           # Access current theme context
│   ├── utils/
│   │   └── mergeProps.ts         # Re-export from Base UI or wrap
│   └── index.ts                  # Main library entry
├── DESIGN.md                     # This file
├── README.md
└── package.json
```

---

## Color System Design

### Built-in Hues

12 hues to start (matching Radix Themes baseline):
`gray`, `mauve`, `slate`, `sage`, `olive`, `sand`, `tomato`, `red`, `ruby`, `crimson`, `pink`, `plum`, `purple`, `violet`, `iris`, `indigo`, `blue`, `cyan`, `teal`, `jade`, `green`, `grass`, `bronze`, `gold`, `brown`, `orange`, `amber`, `yellow`, `lime`, `mint`, `sky`

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

---

## Open Questions

- [ ] Should we ship a PostCSS plugin for JIT token loading (like Open Props JIT)?
- [ ] How do we handle font customization? (Radix Themes uses a font-family token)
- [ ] Should `Theme` accept a `style` prop for ad-hoc token overrides?
- [ ] Do we want a visual ThemeEditor component (like Radix ThemePanel) for development?
- [ ] How do nested `Theme` components behave? Full override or inheritance?
- [ ] What's our build output format — ESM only? CJS too?
- [ ] Do we want a CLI to scaffold custom color palettes from a hex/oklch input?
