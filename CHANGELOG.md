# Changelog

All notable changes to `@wlcr/base-ic` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Palette builder: "All colors" and "Single color" are now tabs in one card,
  with a Reset sliders button once the all-colors sliders move. Single color
  has a Sliders / Color value toggle; Color value is a color picker
  (saturation/brightness area, hue strip, and a Hex / RGB / HSL / OKLCH value
  field that accepts any CSS color) that solves for the adjustment putting the
  scale's step 9 on the picked color.
- Palette builder: Save palette stores one palette in this browser and applies
  it across the docs site. The theme panel shows it with an on/off switch,
  Edit and Clear.

## [3.0.0] - 2026-11-10

Breaking: per-component space variables were replaced by shared `--bic-*`
variables (see Changed). Component props are unchanged.

### Added

- Responsive props: layout, space and typography props take an object of
  values per breakpoint, e.g. `columns={{ initial: 1, md: 3 }}`. Viewport
  breakpoints are Tailwind's (`sm` `md` `lg` `xl` `2xl`); `@`-prefixed keys
  (`@3xs` … `@7xl`) are container queries against the nearest ancestor with the
  new `container` prop (Box, Flex, Grid, Container, Section). Responsive:
  space props on every component, Grid and Flex layout props, Container
  `size`/`maxWidth`/`gutter`, Section and Card `size`, Text and Heading
  `size`/`align`. Exports `Responsive`, `Breakpoint`, `breakpoints` and
  `containerBreakpoints`.
- `width`, `minWidth`, `maxWidth`, `height`, `minHeight` and `maxHeight` props
  on Box, Flex and Grid.
- `Button` `href` (with `target`, `rel`, `download`): renders a link styled as a
  button, without `role="button"`. Combine with `render` for router links.
- `Button` `iconOnly` prop: a square button for a single icon.
- `Callout` component (`Callout.Root` / `Callout.Icon` / `Callout.Text`),
  matching Radix Themes: `size` 1–3, `variant` soft/surface/outline, `color`,
  `highContrast`, margin props and `render`. The root is a plain `<div>` with no
  role; add `role="alert"` or `role="status"` yourself for messages that should
  be announced.
- Alpha color steps `--color-<name>-a1` … `a12` for every color scale, plus
  `--color-accent-a*` and `--color-neutral-a*`. Each is the translucent
  equivalent of its solid step over the page background, so it follows dark
  mode, overridden scales and custom colors.
- Palette builder on the documentation site (`/palette/`): shift hue,
  saturation and lightness across all color scales or individual ones, preview
  them in light and dark, and copy the override CSS. Settings live in the URL,
  so a link reproduces them.
- Components that need the browser (state, context, Base UI) are marked
  `'use client'`, so the package can be imported directly from React Server
  Components (e.g. the Next.js App Router). Static components (`Box`, `Flex`,
  `Grid`, `Container`, `Section`, typography, `Table`, `DataList`, `Skeleton`)
  stay server components.

### Changed

- Space props on every component now use shared, non-inherited custom
  properties (`--bic-p`, `--bic-mt`, …) instead of per-component ones such as
  `--btn-padding` or `--card-margin-top`. If you set those per-component
  variables in your own CSS, switch to the space props or the `--bic-*` names.
- Text and Heading `align` is applied through CSS rather than an inline
  `text-align`.
- `Button`'s ref type is `HTMLButtonElement | HTMLAnchorElement`.

### Fixed

- Negative space values such as `mt="-1"` map to `calc(var(--space-1) * -1)`
  instead of producing invalid CSS.
- Space props on a nested component (e.g. a `Text` inside a `Text`) are no
  longer inherited from the parent.

## [2.3.0] - 2026-10-24

### Fixed

- Accent tints mixed into neutral colors keep the accent's hue. Before, they
  shifted toward the neutral's hue, so a blue accent on the gray neutrals came
  out pink. This affected the gradient `Card`, soft and surface variants of
  `Button`, `Badge` and `Toggle`, and other accent-on-neutral mixes.
  All `color-mix()` calls now interpolate in `oklab` instead of `oklch`.

## [2.2.2] - 2026-10-24

### Fixed

- `Button` no longer changes size while `loading`. The content stays in place
  (invisible, but still in the accessibility tree) and the spinner is centered
  over it.

### Changed

- Public npm access is now set through `publishConfig`.

## [2.2.1] - 2026-10-15

### Added

- MIT license.

## [2.2.0] - 2026-10-15

### Added

- `Table`, `DataList` and `Inset` components.
- `Checkbox`, `Switch` and `Radio` accept `children` as label text, wrapped in a
  native `<label>` so clicking the text toggles the control.
- `Field` passes `required` down to the base-ic control inside it (`Input`,
  `Textarea`, `Field.Control`, `NumberField`, `Checkbox`, `Switch`,
  `RadioGroup`), and shows messages from `validate` or native constraint
  validation when no `error` is given.
- `Field.Control`, the same component as `Input`, plus the `FieldControlProps` type.
- `Input` is now Base UI's Field-aware input and accepts `onValueChange`.
- `Drawer` `swipeArea` prop, which renders an edge swipe-to-open area.
- `Popover` `title`, `description`, `openOnHover`, `delay` and `closeDelay` props.
- `Tooltip.Provider` for sharing open/close delays across a group of tooltips.
- `Button` `focusableWhenDisabled` and `nativeButton` props. `render` now
  accepts a render function as well as an element.
- `Avatar` `fallbackDelay`, `keepMounted` and `onLoadingStatusChange` props, and
  it now forwards the other Base UI root props.
- `Select` items accept any value; object values are matched by identity.
  `Select.Group` and `Select.Separator` accept `className`.
- `Slider` forwards `aria-label` to its thumbs and adds `getAriaLabel` for
  range sliders.
- `Grid` `columns` and `rows` accept a count (`3` or `"3"`), which expands to
  equal tracks.
- Exports for `AccordionPrimitive`, `TabsPrimitive` and `SelectPrimitive`.
- More exported types: `TooltipProviderProps`, `DrawerSide`, the Toast option
  and part types, and the size/variant/layout types for the new components.

### Changed

- Requires `@base-ui/react` `^1.9.0` (previously `^1.7.0`).
- A nested `Theme` inherits any prop it doesn't set from the nearest ancestor
  `Theme`. `fontFamily` slots merge with the parent's.
- Semantic tokens are re-declared on every `Theme` root (`[data-base-ic-theme]`),
  so they follow that Theme's accent, neutral, radius and scaling, including
  in content portaled into `<body>`.
- Portaled popups (Select, Drawer and others) render inside the nearest `Theme`
  and pick up its tokens.
- Forced light mode (`.light` / `[data-appearance='light']`) now uses the same
  declarations as the default light palette instead of a separate copy in
  `dark.css`.
- `Button` stays focusable while `loading` and sets `aria-busy`.
- The `Card` `asButton` deprecation warning is logged once per page and is
  now controlled by the consumer's `process.env.NODE_ENV`.

### Removed

- `Drawer.SwipeArea`. Use the `swipeArea` prop instead, or `DrawerPrimitive`
  for full control.

### Fixed

- `Select` shows the placeholder when the value is `''`, unless an item uses
  `''` as its value.

## [2.1.0] - 2026-08-15

### Fixed

- A nested `Theme` with a non-default `accentColor` now gets a focus ring and
  `Card` gradient in its own accent instead of the root's.
- `Input` prefix and suffix segments are clipped to the wrapper's rounded
  corners, so the focus outline renders as one clean shape.

## [2.0.0] - 2026-08-15

### Added

- `Autocomplete`, `Drawer`, `Fieldset`, `Menubar`, `NavigationMenu`, `OTPField`
  and `Toast` (`Toaster` and `toast()`) components.
- `render` prop on `Link`, `Badge` and `Card`, for rendering as another element
  (such as a router link or a `<button>`) with the same styling.
- `Avatar` shows a default user icon when there is no image or `fallback`.
- Dark-mode scales for the remaining palette colors.

### Changed

- **Breaking:** requires `@base-ui/react` `^1.7.0`.
- **Breaking:** color scales were retuned, with lower chroma at steps 9 to 12.
- **Breaking:** only the root `Theme` sets `min-height: 100vh`. Nested Themes
  size to their content.
- `Dialog` z-index now comes from the `--z-4` token.

### Deprecated

- `Card` `asButton`. Use `render={<button type="button" />}`, which gives the
  card real keyboard semantics.

## [1.3.0] - 2026-07-14

### Added

- Exported prop value types (`ButtonSize`, `ButtonVariant`, `Color`, and so on)
  and the `PropValue` helper.
- `ThemeContextValue` type export.

## [1.2.0] - 2026-05-28

### Changed

- `color` props are typed as `AccentColor` instead of `string`.

## [1.1.2] - 2026-05-05

No package changes; publish workflow fix only.

## [1.1.1] - 2026-05-05

### Added

- `@wlcr/base-ic/style.css` export. All component styles are now bundled into
  one stylesheet, so Turbopack and webpack pick them up reliably.

## [1.1.0] - 2026-05-05

### Added

- `RadioGroup.Item`, an alias for `Radio`.
- `sideEffects` in `package.json`, so bundlers keep the CSS imports.

### Changed

- Type declarations are emitted per module instead of rolled into one file.
- Generated CSS module class names include the source file name, such as
  `button.module__root__abc12`.

## [1.0.4] - 2026-05-05

No package changes; adds the GitHub publish workflow.

## [1.0.3] - 2026-05-05

### Added

- Type declarations for the `@wlcr/base-ic/tokens` entry point.

## [1.0.2] - 2026-05-05

### Changed

- Package metadata and README updates.

## [1.0.1] - 2026-05-05

First published release as `@wlcr/base-ic`.

[Unreleased]: https://github.com/MrSpecific/base-ic/compare/v3.0.0...HEAD
[3.0.0]: https://github.com/MrSpecific/base-ic/compare/v2.3.0...v3.0.0
[2.3.0]: https://github.com/MrSpecific/base-ic/compare/v2.2.2...v2.3.0
[2.2.2]: https://github.com/MrSpecific/base-ic/compare/v2.2.1...v2.2.2
[2.2.1]: https://github.com/MrSpecific/base-ic/compare/v2.2.0...v2.2.1
[2.2.0]: https://github.com/MrSpecific/base-ic/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/MrSpecific/base-ic/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/MrSpecific/base-ic/releases/tag/v2.0.0
