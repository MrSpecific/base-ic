# Base-IC
(Intelligent Components)

**An opinionated React UI library with the comfort of Radix Themes, built on the modern foundation of Base UI.**

> Status: Early development — API is not stable.

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
import 'base-ic/styles.css';

export default function App() {
  return (
    <Theme accentColor="violet" radius="medium">
      <Button.Root size="2" variant="solid">
        Get started
      </Button.Root>
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

### Layout

- `Box` — `div` with layout props
- `Flex` — flexbox container
- `Grid` — CSS grid container
- `Container` — centered max-width wrapper
- `Section` — semantic section with vertical padding
- `Separator` — horizontal or vertical divider

### Typography

- `Text` — inline or block text with size/weight/color props
- `Heading` — semantic headings (h1–h6)
- `Quote` — styled blockquote
- `Code` — inline code
- `Kbd` — keyboard shortcut
- `Link` — anchor with styling

### UI Components

- `Button` — action trigger
- `IconButton` — icon-only button
- `Badge` — status indicator
- `Avatar` — user avatar with fallback
- `Callout` — highlighted message block
- `Card` — surface container

### Form Controls

- `Checkbox` — checkbox input
- `RadioGroup` — radio button group
- `Switch` — toggle switch
- `Select` — dropdown select
- `TextField` — text input
- `TextArea` — multiline text input
- `Slider` — range slider

### Overlay Components

- `Dialog` — modal dialog
- `AlertDialog` — confirmation dialog
- `Popover` — floating content
- `Tooltip` — hover tooltip
- `DropdownMenu` — contextual menu
- `ContextMenu` — right-click menu
- `HoverCard` — hover preview card

### Navigation

- `Tabs` — tabbed interface
- `NavigationMenu` — accessible nav with flyouts

---

## Component API

Components follow the Base UI compound component pattern:

```tsx
// Compound (full control)
<Button.Root size="2" variant="solid" color="accent">
  <Button.Icon><PlusIcon /></Button.Icon>
  Add item
</Button.Root>

// Convenience wrapper (common cases)
<Button size="2" variant="solid">
  Add item
</Button>
```

### Standard props

Most components accept these props:

| Prop | Values | Description |
|------|--------|-------------|
| `color` | `ColorName \| 'inherit'` | Override the current accent color |
| `variant` | `'solid' \| 'soft' \| 'outline' \| 'ghost' \| 'surface'` | Visual style |
| `size` | `'1' \| '2' \| '3' \| '4'` | Size scale |
| `radius` | `'none' \| 'small' \| 'medium' \| 'large' \| 'full'` | Border radius override |
| `highContrast` | `boolean` | Increase foreground contrast |

### Changing the rendered element

We follow the Base UI `render` prop pattern (not Radix's `asChild`):

```tsx
// Render as a link
<Button.Root render={<a href="/dashboard" />} size="2">
  Go to dashboard
</Button.Root>

// Render as a custom component
<Button.Root render={<RouterLink to="/dashboard" />} size="2">
  Go to dashboard
</Button.Root>
```

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

This project is in early development. Architecture decisions are documented in [`DESIGN.md`](./DESIGN.md). If you have thoughts on the API design, open a discussion.

---

## License

MIT
