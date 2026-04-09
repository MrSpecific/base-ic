# Base-IC
(Intelligent Components)

**An opinionated React UI library with the comfort of Radix Themes, built on the modern foundation of Base UI.**

> A stable, production-ready v1 release.

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
5. **Composable.** Import only what you need. No monolithic bundle.
6. **Accessible.** Accessibility is handled by Base UI primitives. We don't re-implement it.

---

## Quick Start

```bash
npm install base-ic
```

```tsx
import { Theme, Button, Text } from 'base-ic';
import 'base-ic/tokens';

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
  scaling="100%"         // Overall size scale
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

Or if you prefer to define colors in CSS (works great for SSR and static builds):

```css
/* your-theme.css */
:root {
  --color-brand-1: oklch(98% 0.01 340);
  --color-brand-2: oklch(96% 0.02 340);
  /* ... through --color-brand-12 */
  --color-brand-contrast: white;
}
```

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
- `Menu` — dropdown menu with items, checkboxes, radio groups, and submenus (Base UI-backed)
- `Tabs` — tabbed navigation (Base UI-backed)
- `Accordion` — collapsible content sections (Base UI-backed)
- `Collapsible` — single collapsible region (Base UI-backed)
- `Select` — dropdown select input (Base UI-backed)
- `Skeleton` — loading placeholder

### Form Controls

- `Input` — text input field
- `Textarea` — multi-line text input
- `Checkbox` — checkbox toggle (Base UI-backed)
- `Switch` — on/off switch toggle (Base UI-backed)
- `RadioGroup` — radio button group (Base UI-backed)
- `Slider` — range slider (Base UI-backed)
- `NumberField` — numeric input with increment/decrement (Base UI-backed)
- `Toggle` / `ToggleGroup` — pressable toggle buttons (Base UI-backed)
- `Field` — form field wrapper with label, description, and error states (Base UI-backed)
- `Progress` — progress bar indicator (Base UI-backed)
- `Avatar` — user avatar with image and fallback

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

base-ic components are exported as ergonomic wrappers with strongly-typed props.

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
| `highContrast` | `boolean` | Increase foreground contrast |
| `p` / `px` / `py` / `pt` / `pr` / `pb` / `pl` | `number \| string` | Padding controls (`number` maps to `--space-N`) |
| `m` / `mx` / `my` / `mt` / `mr` / `mb` / `ml` | `number \| string` | Margin controls (`number` maps to `--space-N`) |

---

## Design Token System

base-ic uses a three-layer token architecture:

```
Layer 1: Primitives    --color-blue-9, --space-3, --radius-2
Layer 2: Semantic      --color-accent, --color-text-primary, --color-surface-base
Layer 3: Component     --button-height, --button-padding-x
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

Any token can be overridden at any level:

```css
/* Global override */
:root {
  --color-accent: oklch(55% 0.18 280);
}

/* Scoped override */
.my-section {
  --color-accent: oklch(55% 0.18 140); /* Green accent in this section */
}
```

---

## Dark Mode

Dark mode is supported via:
1. `prefers-color-scheme: dark` — automatic, respects OS setting
2. `.dark` class on any ancestor element — explicit toggle
3. `<Theme appearance="dark">` — forces dark mode within the theme

---

## Browser Support

Targets modern browsers that support:
- CSS custom properties (variables)
- OKLCH color space
- CSS cascade layers
- `:has()` selector

---

## Contributing

Architecture decisions are documented in [`DESIGN.md`](./DESIGN.md). If you have thoughts on the API design, open a discussion.

---

## License

MIT
