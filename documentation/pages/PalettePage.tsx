import { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Button,
  Callout,
  Card,
  Checkbox,
  Container,
  Flex,
  Grid,
  Heading,
  Select,
  Slider,
  Tabs,
  Text,
  Theme,
  Toggle,
  ToggleGroup,
} from "../../src";
import { CodeBlock } from "../components/CodeBlock";
import { ACCENT_COLORS, GRAY_COLORS, STEPS, toDisplayName } from "../constants";
import {
  type Adjust,
  adjust,
  adjustToTarget,
  effectiveAdjust,
  formatOklch,
  fromSearch,
  generateCss,
  IDENTITY,
  isIdentity,
  NEUTRALS,
  type PaletteSettings,
  RANGES,
  type Rgb,
  srgbToOklch,
  toHex,
  toSearch,
} from "../palette/palette";
import { ColorPicker, toRgb } from "../palette/ColorPicker";
import { DARK_SCALES, LIGHT_SCALES } from "../palette/sources";
import type { AccentColor } from "../types";

// Grays first, then the accent scales in the Theme panel's order.
const NAMES = [...GRAY_COLORS, ...ACCENT_COLORS].filter((name) => LIGHT_SCALES[name]);

const LABELS: Record<keyof Adjust, { label: string; unit: string }> = {
  hue: { label: "Hue shift", unit: "°" },
  sat: { label: "Saturation", unit: "%" },
  light: { label: "Lightness", unit: "" },
};

function AdjustSliders({
  value,
  onChange,
  idPrefix,
}: {
  value: Adjust;
  onChange: (next: Adjust) => void;
  idPrefix: string;
}) {
  return (
    <Flex direction="column" gap="3">
      {(Object.keys(LABELS) as Array<keyof Adjust>).map((key) => (
        <Flex key={key} direction="column" gap="1">
          <Flex justify="between">
            <Text size="2" weight="medium">
              {LABELS[key].label}
            </Text>
            <Text size="2" color="gray">
              {key === "hue" || key === "light" ? (value[key] > 0 ? "+" : "") : ""}
              {value[key]}
              {LABELS[key].unit}
            </Text>
          </Flex>
          <Slider
            aria-label={`${idPrefix} ${LABELS[key].label}`}
            min={RANGES[key].min}
            max={RANGES[key].max}
            step={RANGES[key].step}
            value={value[key]}
            onValueChange={(v) => onChange({ ...value, [key]: v as number })}
          />
        </Flex>
      ))}
    </Flex>
  );
}

/** Sets a color by its step 9: solves for the per-color adjust that lands it on the picked color. */
function StepNinePicker({
  name,
  settings,
  onChange,
}: {
  name: string;
  settings: PaletteSettings;
  onChange: (next: Adjust) => void;
}) {
  const base = LIGHT_SCALES[name][9];
  const current = toRgb(formatOklch(adjust(base, effectiveAdjust(name, settings)))) ?? [0, 0, 0];
  const [target, setTarget] = useState<Rgb>(current);
  const missed = target.some((v, i) => Math.abs(v - current[i]) > 8);

  return (
    <Flex direction="column" gap="2">
      <ColorPicker
        label={`${toDisplayName(name)} step 9`}
        initial={current}
        onChange={(rgb) => {
          setTarget(rgb);
          onChange(adjustToTarget(base, srgbToOklch(...rgb), effectiveAdjust(name, { ...settings, colors: {} })));
        }}
      />
      <Text size="1" color="gray">
        {missed
          ? `Outside the adjustable range; closest is ${toHex(current)}.`
          : "Sets light step 9; the rest of the scale follows."}
      </Text>
    </Flex>
  );
}

function ScaleRows({ names, settings }: { names: string[]; settings: PaletteSettings }) {
  return (
    <Flex direction="column" gap="1">
      {names.map((name) => (
        <Grid key={name} columns="64px repeat(12, minmax(0, 1fr))" gap="1" align="center">
          <Text size="1" color={isIdentity(effectiveAdjust(name, settings)) ? "gray" : undefined} weight="medium">
            {name}
          </Text>
          {STEPS.map((step) => (
            <div
              key={step}
              className="palette-swatch"
              style={{ background: `var(--color-${name}-${step})` }}
              title={`--color-${name}-${step}`}
            />
          ))}
        </Grid>
      ))}
    </Flex>
  );
}

function ComponentPreview({ color }: { color: AccentColor }) {
  return (
    <Flex direction="column" gap="3">
      <Flex gap="2" wrap="wrap" align="center">
        {(["solid", "soft", "surface", "outline", "ghost"] as const).map((variant) => (
          <Button key={variant} color={color} variant={variant} size="1">
            {variant}
          </Button>
        ))}
        <Badge color={color}>Badge</Badge>
        <Badge color={color} variant="solid">
          Solid
        </Badge>
      </Flex>
      <Callout.Root color={color} size="1">
        <Callout.Text>A {color} callout with the adjusted scale.</Callout.Text>
      </Callout.Root>
    </Flex>
  );
}

export function PalettePage({
  savedSearch,
  onSave,
}: {
  /** The saved palette's query string, or null when none is saved. */
  savedSearch: string | null;
  onSave: (search: string) => void;
}) {
  const [settings, setSettings] = useState<PaletteSettings>(() =>
    fromSearch(window.location.search, NAMES),
  );
  const [selected, setSelected] = useState<string>(
    () => Object.keys(settings.colors)[0] ?? "blue",
  );
  const [linkStatus, setLinkStatus] = useState<"idle" | "copied" | "error">("idle");
  const [mode, setMode] = useState<"sliders" | "picker">("sliders");
  // Bumped on resets so the picker's text field re-reads the current color.
  const [resets, setResets] = useState(0);

  const search = toSearch(settings);
  const shareUrl = `${window.location.origin}${window.location.pathname}${search ? `?${search}` : ""}`;
  const css = useMemo(
    () => generateCss(settings, LIGHT_SCALES, DARK_SCALES, NAMES, shareUrl),
    [settings, shareUrl],
  );

  // Keep the URL shareable as the settings change (no history entry per drag step).
  useEffect(() => {
    window.history.replaceState(null, "", shareUrl.slice(window.location.origin.length) + window.location.hash);
  }, [shareUrl]);

  // Preview = the exact CSS the user will copy, applied after the token styles.
  useEffect(() => {
    const style = document.createElement("style");
    style.dataset.palettePreview = "";
    style.textContent = css;
    document.head.appendChild(style);
    return () => style.remove();
  }, [css]);

  const selectedAdjust = settings.colors[selected] ?? IDENTITY;
  const setSelectedAdjust = (next: Adjust) =>
    setSettings((s) => {
      const colors = { ...s.colors };
      if (isIdentity(next)) delete colors[selected];
      else colors[selected] = next;
      return { ...s, colors };
    });

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setLinkStatus("copied");
    } catch {
      setLinkStatus("error");
    }
    window.setTimeout(() => setLinkStatus("idle"), 1600);
  };

  const previewColor = (NEUTRALS.includes(selected) ? "blue" : selected) as AccentColor;

  return (
    <Container as="main" className="site-page palette-page">
      <Flex direction="column" gap="2" mb="6">
        <Heading as="h1" size="8">
          Palette builder
        </Heading>
        <Text as="p" color="gray">
          Shift hue, saturation and lightness across every color scale at once, then fine-tune
          individual colors. The page previews the generated CSS live; copy it into your project, or
          share the link to send someone these exact settings.
        </Text>
      </Flex>

      <Grid columns={{ initial: "1", md: "300px minmax(0, 1fr)" }} gap="5" align="start">
        <Flex direction="column" gap="4" className="palette-controls">
          <Card>
            <Tabs defaultValue="all">
              <Tabs.List aria-label="Adjust">
                <Tabs.Tab value="all">All colors</Tabs.Tab>
                <Tabs.Tab value="single">Single color</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="all">
                <Flex direction="column" gap="3" pt="4">
                  <AdjustSliders
                    idPrefix="All colors"
                    value={settings.global}
                    onChange={(global) => setSettings((s) => ({ ...s, global }))}
                  />
                  <Checkbox
                    checked={settings.grays}
                    onCheckedChange={(grays) => setSettings((s) => ({ ...s, grays }))}
                  >
                    Include grays and black
                  </Checkbox>
                  {!isIdentity(settings.global) && (
                    <Button
                      variant="soft"
                      color="gray"
                      size="1"
                      onClick={() => {
                        setSettings((s) => ({ ...s, global: IDENTITY }));
                        setResets((n) => n + 1);
                      }}
                    >
                      Reset sliders
                    </Button>
                  )}
                </Flex>
              </Tabs.Panel>

              <Tabs.Panel value="single">
                <Flex direction="column" gap="3" pt="4">
                  <Text size="2" color="gray">
                    Applied on top of the all-colors adjustment.
                  </Text>
                  <Select
                    aria-label="Color to adjust"
                    value={selected}
                    onValueChange={(value) => setSelected(value as string)}
                  >
                    {NAMES.map((name) => (
                      <Select.Item key={name} value={name}>
                        {toDisplayName(name)}
                        {settings.colors[name] ? " •" : ""}
                      </Select.Item>
                    ))}
                  </Select>
                  <ToggleGroup
                    connected
                    size="1"
                    aria-label="Adjust with"
                    value={[mode]}
                    onValueChange={(value) => value[0] && setMode(value[0] as typeof mode)}
                  >
                    <Toggle value="sliders">Sliders</Toggle>
                    <Toggle value="picker">Color value</Toggle>
                  </ToggleGroup>
                  {mode === "sliders" ? (
                    <AdjustSliders
                      idPrefix={toDisplayName(selected)}
                      value={selectedAdjust}
                      onChange={setSelectedAdjust}
                    />
                  ) : (
                    <StepNinePicker
                      key={`${selected}-${resets}`}
                      name={selected}
                      settings={settings}
                      onChange={setSelectedAdjust}
                    />
                  )}
                  <Button
                    variant="soft"
                    color="gray"
                    size="1"
                    disabled={isIdentity(selectedAdjust)}
                    onClick={() => {
                      setSelectedAdjust(IDENTITY);
                      setResets((n) => n + 1);
                    }}
                  >
                    Reset {selected}
                  </Button>
                  {Object.keys(settings.colors).length > 0 && (
                    <Flex gap="1" wrap="wrap">
                      {Object.keys(settings.colors).map((name) => (
                        <Button key={name} size="1" variant="surface" color="gray" onClick={() => setSelected(name)}>
                          {name}
                        </Button>
                      ))}
                    </Flex>
                  )}
                </Flex>
              </Tabs.Panel>
            </Tabs>
          </Card>

          <Flex gap="2" wrap="wrap">
            <Button onClick={copyLink}>
              {linkStatus === "copied" ? "Link copied" : linkStatus === "error" ? "Copy failed" : "Copy link"}
            </Button>
            <Button variant="soft" disabled={!search || search === savedSearch} onClick={() => onSave(search)}>
              {search && search === savedSearch ? "Saved" : "Save palette"}
            </Button>
            <Button
              variant="soft"
              color="gray"
              disabled={!search}
              onClick={() => {
                setSettings({ global: IDENTITY, grays: false, colors: {} });
                setResets((n) => n + 1);
              }}
            >
              Reset all
            </Button>
          </Flex>
        </Flex>

        <Flex direction="column" gap="5" minWidth="0">
          <Grid columns={{ initial: "1", lg: "2" }} gap="4">
            {(["light", "dark"] as const).map((appearance) => (
              <Theme key={appearance} appearance={appearance} className="palette-preview">
                <Flex direction="column" gap="4" p="4">
                  <Text size="2" weight="medium">
                    {toDisplayName(appearance)}
                  </Text>
                  <ComponentPreview color={previewColor} />
                  <ScaleRows names={NAMES} settings={settings} />
                </Flex>
              </Theme>
            ))}
          </Grid>
          <CodeBlock title="palette.css" code={css} />
          <Text size="2" color="gray">
            Save palette keeps these settings in this browser and applies them across the docs site, so you can
            try them on any component or in the playground. Turn it off or clear it from the theme panel.
          </Text>
        </Flex>
      </Grid>
    </Container>
  );
}
