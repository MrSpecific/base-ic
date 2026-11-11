import { type KeyboardEvent, type PointerEvent, useState } from "react";
import { Flex, Input, Select, SliderPrimitive } from "../../src";
import { type ColorFormat, formatColor, type Hsv, hsvToRgb, type Rgb, rgbToHsv, toHex } from "./palette";

const FORMATS: Array<{ value: ColorFormat; label: string }> = [
  { value: "hex", label: "Hex" },
  { value: "rgb", label: "RGB" },
  { value: "hsl", label: "HSL" },
  { value: "oklch", label: "OKLCH" },
];

let canvasCtx: CanvasRenderingContext2D | null = null;
/** Any CSS color the browser understands → 8-bit sRGB, or null. */
// shortcut: the canvas clips wide-gamut input (oklch, P3) to sRGB; parse oklch() directly if those targets matter.
export function toRgb(value: string): Rgb | null {
  if (!value.trim() || !CSS.supports("color", value)) return null;
  canvasCtx ??= Object.assign(document.createElement("canvas"), { width: 1, height: 1 }).getContext("2d", {
    willReadFrequently: true,
  });
  if (!canvasCtx) return null;
  canvasCtx.clearRect(0, 0, 1, 1);
  canvasCtx.fillStyle = value;
  canvasCtx.fillRect(0, 0, 1, 1);
  const [r, g, b] = canvasCtx.getImageData(0, 0, 1, 1).data;
  return [r, g, b];
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/** Saturation/brightness area, hue strip, and a value field in the chosen color space. Uncontrolled. */
export function ColorPicker({
  label,
  initial,
  onChange,
}: {
  label: string;
  initial: Rgb;
  onChange: (rgb: Rgb) => void;
}) {
  // HSV is the source of truth so hue survives dragging to gray or black.
  const [hsv, setHsv] = useState(() => rgbToHsv(initial));
  const [format, setFormat] = useState<ColorFormat>("hex");
  // null shows the formatted color; a string is what the user is typing.
  const [text, setText] = useState<string | null>(null);
  const rgb = hsvToRgb(hsv);

  const pick = (next: Hsv) => {
    setHsv(next);
    setText(null);
    onChange(hsvToRgb(next));
  };

  const type = (value: string) => {
    setText(value);
    const parsed = toRgb(value);
    if (!parsed) return;
    const next = rgbToHsv(parsed);
    setHsv((prev) => (next.s === 0 || next.v === 0 ? { ...next, h: prev.h } : next));
    onChange(parsed);
  };

  const dragTo = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    pick({ ...hsv, s: clamp01((e.clientX - r.left) / r.width), v: 1 - clamp01((e.clientY - r.top) / r.height) });
  };

  const onAreaKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 0.1 : 0.01;
    const delta = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowDown: [0, -step], ArrowUp: [0, step] }[e.key];
    if (!delta) return;
    e.preventDefault();
    pick({ ...hsv, s: clamp01(hsv.s + delta[0]), v: clamp01(hsv.v + delta[1]) });
  };

  return (
    <Flex direction="column" gap="3">
      <div
        className="color-area"
        role="slider"
        tabIndex={0}
        aria-label={`${label} saturation and brightness`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(hsv.s * 100)}
        aria-valuetext={`Saturation ${Math.round(hsv.s * 100)}%, brightness ${Math.round(hsv.v * 100)}%`}
        style={{ backgroundColor: `hsl(${hsv.h} 100% 50%)` }}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          dragTo(e);
        }}
        onPointerMove={(e) => e.currentTarget.hasPointerCapture(e.pointerId) && dragTo(e)}
        onKeyDown={onAreaKey}
      >
        <div
          className="color-thumb"
          style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%`, background: toHex(rgb) }}
        />
      </div>

      <SliderPrimitive.Root
        className="color-hue"
        min={0}
        max={360}
        value={hsv.h}
        onValueChange={(h) => pick({ ...hsv, h: h as number })}
      >
        <SliderPrimitive.Control className="color-hue-control">
          <SliderPrimitive.Track className="color-hue-track">
            <SliderPrimitive.Thumb
              className="color-thumb"
              aria-label={`${label} hue`}
              style={{ background: `hsl(${hsv.h} 100% 50%)` }}
            />
          </SliderPrimitive.Track>
        </SliderPrimitive.Control>
      </SliderPrimitive.Root>

      <Flex gap="2">
        <Select
          aria-label="Color space"
          size="1"
          triggerClassName="color-space"
          value={format}
          onValueChange={(value) => {
            setFormat(value as ColorFormat);
            setText(null);
          }}
        >
          {FORMATS.map((f) => (
            <Select.Item key={f.value} value={f.value}>
              {f.label}
            </Select.Item>
          ))}
        </Select>
        <Input
          size="1"
          wrapperClassName="color-value"
          aria-label={`${label} color value`}
          value={text ?? formatColor(rgb, format)}
          invalid={text !== null && !toRgb(text)}
          onChange={(e) => type(e.target.value)}
          onBlur={() => text !== null && toRgb(text) && setText(null)}
          spellCheck={false}
        />
      </Flex>
    </Flex>
  );
}
