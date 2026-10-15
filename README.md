# Base-IC
(Intelligent Components)

[![npm version](https://img.shields.io/npm/v/@wlcr/base-ic.svg)](https://www.npmjs.com/package/@wlcr/base-ic)
[![license: MIT](https://img.shields.io/npm/l/@wlcr/base-ic.svg)](https://www.npmjs.com/package/@wlcr/base-ic)

**An opinionated React UI library with the comfort of Radix Themes, built on the modern foundation of Base UI.**

> Radix Themes ergonomics, Base UI primitives, first-class theming.

**Docs, live examples, and a theme playground: [base-ic.vercel.app](https://base-ic.vercel.app)**

---

## What is this?

base-ic gives you the fast, ergonomic developer experience of [Radix UI Themes](https://www.radix-ui.com/themes) — familiar props like `color`, `variant`, `size`, and `radius` — while using [Base UI](https://base-ui.com) primitives under the hood for better composability and a more modern component foundation.

It also fixes what Radix Themes gets wrong: **theming is a first-class feature**. Extending the color palette and adapting components to a brand guide is easy by design, not an exercise in CSS override archaeology.

**No Tailwind.** Styling is done with CSS custom properties and CSS modules.

---

## Why not just use Radix Themes?

Radix Themes is excellent for getting started fast. But it has real limitations:

- **Custom colors are painful.** You get a fixed palette. Matching a brand guide means fighting the system.
- **The component primitives (Radix Primitives) are dated.** Base UI has made significant improvements in composability, the render prop pattern, and `mergeProps`.
- **Theming is shallow.** The `Theme` component exposes a handful of knobs. Deep customization requires CSS variable spelunking.

base-ic keeps everything that's great about the Radix Themes DX while building on a better foundation.

---

## Design Principles

1. **Familiar API.** If you've used Radix Themes, you already know most of base-ic.
2. **Theming is a first-class feature.** Adding a brand color is 2–3 lines.
3. **Base UI patterns win.** When Base UI and Radix diverge, we follow Base UI.
4. **CSS custom properties all the way down.** No Tailwind. No runtime CSS-in-JS. No surprises.
5. **Composable.** Tree-shakeable ESM, one module per component. Import only what you need.
6. **Accessible.** Accessibility is handled by Base UI primitives. We don't re-implement it.

---

## Quick Start

```bash
npm install @wlcr/base-ic @base-ui/react
```

`@base-ui/react` (^1.9.0) is a peer dependency, along with `react` and `react-dom` (17, 18, or 19). The package is ESM-only.

```tsx
import { Theme, Button, Text } from '@wlcr/base-ic';
import '@wlcr/base-ic/tokens';    // CSS custom property token definitions
import '@wlcr/base-ic/style.css'; // component styles

export default function App() {
  return (
    <Theme accentColor="violet" radius="medium">
      <Button variant="solid" size="2">Get started</Button>
      <Text size="3">Shipped with semantic tokens.</Text>
    </Theme>
  );
}
```

---

## Theming

### Basic configuration

```tsx
<Theme
  accentColor="violet"   // Primary brand color
  grayColor="slate"      // Neutral palette
  radius="medium"        // Border radius scale
  appearance="light"     // 'light' | 'dark' | 'inherit'
  scaling="100%"         // Scales component sizes, spacing, and type ('80%'–'150%' in 5% steps)
  fontFamily={{ primary: 'Inter, sans-serif' }} // Optional font slots: primary, secondary, tertiary, display, monospace
>
  <App />
</Theme>
```

### Custom brand colors

Unlike Radix Themes, adding a custom color to the palette is first-class:

```tsx
<Theme
  accentColor="brand"
  customColors={{
    brand: {
      1: 'oklch(98% 0.01 340)',
      2: 'oklch(96% 0.02 340)',
      3: 'oklch(93% 0.04 340)',
      4: 'oklch(89% 0.06 340)',
      5: 'oklch(84% 0.08 340)',
      6: 'oklch(78% 0.10 340)',
      7: 'oklch(70% 0.12 340)',
      8: 'oklch(60% 0.14 340)',
      9: 'oklch(50% 0.16 340)',
      10: 'oklch(44% 0.16 340)',
      11: 'oklch(36% 0.14 340)',
      12: 'oklch(20% 0.10 340)',
      contrast: 'white',
    },
  }}
>
  <App />
</Theme>
```

Or if you prefer to define colors in CSS (works great for SSR and static builds). Primitive color scales like these can live on `:root`; they reach every `Theme`:

```css
/* your-theme.css */
:root {
  --color-brand-1: oklch(98% 0.01 340);
  --color-brand-2: oklch(96% 0.02 340);
  /* ... through --color-brand-12 */
  --color-brand-contrast: white;
}
```

A starter file ships with the package at `@wlcr/base-ic/tokens/custom-color-template.css`. Import your file after the base-ic tokens:

```tsx
import './your-theme.css';

<Theme accentColor="brand">
  <App />
</Theme>
```

---

## Components

### Theming

- `Theme` — provider for accent, neutral palette, radius, scale, appearance, and font slots

### Layout

- `Box` — minimal wrapper with semantic `as` support
- `Flex` — flexbox primitive with direction/align/justify/wrap/gap props
- `Grid` — grid primitive with columns/rows/auto-flow/gap props
- `Container` — centered max-width wrapper with size presets
- `Section` — vertical rhythm primitive for page regions
- `Separator` — horizontal/vertical divider (Base UI-backed)

### Components

- `Button` — action primitive with variant/size/color/loading states (Base UI-backed)
- `Badge` — compact status label with variant/size/color support
- `Card` — surface primitive for grouped content and interactive regions
- `Tooltip` — contextual hint overlay (Base UI-backed)
- `Popover` — anchored content overlay (Base UI-backed)
- `Dialog` — modal dialog with backdrop (Base UI-backed)
- `AlertDialog` — confirmation dialog with required action (Base UI-backed)
- `Drawer` — slide-in panel anchored to a screen edge (Base UI-backed)
- `Toaster` / `toast()` — imperative notification system: render `<Toaster />` once, then call `toast()` anywhere (Base UI-backed)
- `Menu` — dropdown menu with items, checkboxes, radio groups, and submenus (Base UI-backed)
- `Menubar` — horizontal bar of top-level menus, e.g. File/Edit/View (Base UI-backed)
- `Tabs` — tabbed navigation (Base UI-backed)
- `NavigationMenu` — top-level site navigation with floating content panels (Base UI-backed)
- `Accordion` — collapsible content sections (Base UI-backed)
- `Collapsible` — single collapsible region (Base UI-backed)
- `Select` — dropdown select input (Base UI-backed)
- `Autocomplete` — free-text input with filtered suggestions (Base UI-backed)
- `Skeleton` — loading placeholder

### Form Controls

- `Input` — text input field (Base UI-backed)
- `Textarea` — multi-line text input (Base UI-backed)
- `Checkbox` — checkbox toggle (Base UI-backed)
- `Switch` — on/off switch toggle (Base UI-backed)
- `RadioGroup` / `Radio` — radio button group (Base UI-backed)
- `Slider` — range slider (Base UI-backed)
- `NumberField` — numeric input with increment/decrement (Base UI-backed)
- `OTPField` — one-time-code / verification-code input with individual character slots (Base UI-backed)
- `Toggle` / `ToggleGroup` — pressable toggle buttons (Base UI-backed)
- `Field` — form field wrapper with label, description, and error states (Base UI-backed)
- `Fieldset` — groups related form controls under a shared legend (Base UI-backed)
- `Progress` — progress bar indicator (Base UI-backed)
- `Avatar` — user avatar with image and fallback (Base UI-backed)

### Typography

- `Text` — body and UI text primitive
- `Heading` — semantic heading primitive (`h1`-`h6`)
- `Link` — anchor with tokenized states
- `Code` — inline code primitive
- `Kbd` — keyboard keycap primitive
- `Em` — emphasis primitive
- `Strong` — strong emphasis primitive
- `Quote` — blockquote primitive

---

## Component API

base-ic components are exported as ergonomic wrappers with strongly-typed props. Many Base UI-backed components also re-export the raw, unstyled Base UI namespace as `*Primitive` (e.g. `DialogPrimitive`, `MenuPrimitive`, `SliderPrimitive`) for cases the wrapper doesn't cover.

```tsx
<Button size="2" variant="solid">Save</Button>
<Badge variant="soft" color="green">Stable</Badge>
<Card size="3" variant="surface">Content</Card>
<Card p="5" px="6" mt="4">Custom card spacing</Card>
```

### Standard props

Most components accept these props:

| Prop | Values | Description |
|------|--------|-------------|
| `variant` | Component-specific variants | Visual style |
| `size` | Component-specific scale | Size and spacing |
| `color` | `string` | Color ramp override (e.g. `blue`, `green`) |
| `radius` | Named radius values | Border radius override |
| `highContrast` | `boolean` | Increase foreground contrast — `Button`, `Badge`, `Toggle`, and `Text`/`Heading`/`Link`/`Code`/`Quote` only. On typography it only takes effect together with `color` (switches the text from step 11 to step 12). |
| `p` / `px` / `py` / `pt` / `pr` / `pb` / `pl` | `number \| string` | Padding controls (`number` maps to `--space-N`) |
| `m` / `mx` / `my` / `mt` / `mr` / `mb` / `ml` | `number \| string` | Margin controls (`number` maps to `--space-N`) |

---

## Design Token System

base-ic uses a three-layer token architecture:

```
Layer 1: Primitives    --color-blue-9, --space-3, --radius-2
Layer 2: Semantic      --color-accent-9, --color-text-primary, --color-surface-base
Layer 3: Component     --button-2-height, --button-2-px
```

Colors are defined in the OKLCH color space for perceptually uniform lightness across hues.

### Color scale semantics

| Step | Typical use |
|------|-------------|
| 1 | App background |
| 2 | Subtle background |
| 3–5 | UI element backgrounds (normal, hover, active) |
| 6–8 | Borders (subtle, normal, hover) |
| 9–10 | Solid fills (normal, hover) |
| 11 | Low-contrast text |
| 12 | High-contrast text |

### Overriding tokens

Tokens are plain custom properties. Semantic and component tokens (like `--button-2-height`) are declared on `:root` and re-declared on every `Theme` root (the `data-base-ic-theme` element), so a plain `:root` rule doesn't reach content inside a `<Theme>`. Target both for a global override, or scope an override with a class on a `Theme` or any element inside it:

```css
/* Global override — load after the base-ic tokens */
:root,
[data-base-ic-theme] {
  --button-2-height: 36px; /* size="2" controls; also used by Input, Toggle, NumberField */
  --button-2-px: 14px;
}

/* Scoped override — a className on a Theme or any element inside it */
.promo {
  --color-accent-9: oklch(55% 0.18 140);  /* solid fill */
  --color-accent-10: oklch(50% 0.17 140); /* solid fill, hover */
  --color-accent-11: oklch(45% 0.15 140); /* accent text */
}
```

The accent (`--color-accent-1`…`12`, `--color-accent-contrast`) and neutral (`--color-neutral-*`) ramps are written by `Theme` as inline styles on its own element (and on `<body>` for portaled content), so a `:root` override of them has no effect. To change the accent everywhere use `accentColor` / `customColors`; to re-theme a region, a nested `<Theme accentColor="green">` is the simplest option and also updates derived tokens like the focus ring. A nested `Theme` inherits every prop you omit (`grayColor`, `radius`, `scaling`, `appearance`, and individual `fontFamily` slots) from its parent `Theme`.

---

## Dark Mode

Dark mode is supported via:
1. `prefers-color-scheme: dark` — automatic, respects OS setting
2. `.dark` class or `data-appearance="dark"` on an ancestor such as `<body>` or a wrapper outside your `Theme` (not `<html>`, where the `:root` light defaults take precedence) — explicit toggle
3. `<Theme appearance="dark">` — forces dark mode within the theme. To switch a region inside a `Theme`, nest another `<Theme appearance="dark">` rather than a `.dark` wrapper. `appearance="inherit"` (the default) follows the parent `Theme`, or `prefers-color-scheme` on a root `Theme`.

---

## Browser Support

Targets modern browsers that support:
- CSS custom properties (variables)
- OKLCH color space
- `color-mix()`
- `:has()` selector

---

## Contributing

Architecture decisions are documented in [`DESIGN.md`](./DESIGN.md). If you have thoughts on the API design, open an issue or discussion on [GitHub](https://github.com/MrSpecific/base-ic).

---

## License

MIT
