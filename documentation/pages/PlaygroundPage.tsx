import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Heading,
  Popover,
  Text,
  Tooltip,
} from "../../src";
import { ALL_HUES, STEPS } from "../constants";
import type { Radius } from "../types";

export function PlaygroundPage({ radius }: { radius: Radius }) {
  return (
    <Container as="main" className="site-page playground-page">
      <Box className="playground">
        <Heading as="h1">Playground</Heading>
        <Text as="p">
          Interactive token and theme exploration. Use the floating panel in the
          bottom-right to tweak theme values.
        </Text>

        <Heading as="h2">Color Palette</Heading>

        <SwatchGrid label="Accent" hue="accent" />

        <SwatchGrid label="Neutral" hue="neutral" />

        <Heading as="h2">All Hues</Heading>
        {ALL_HUES.map((hue) => (
          <SwatchGrid key={hue} label={hue} hue={hue} />
        ))}

        <Heading as="h2">Status Colors</Heading>
        <Grid
          className="surface-grid"
          columns="repeat(auto-fit, minmax(180px, 1fr))"
          gap={3}
        >
          {(["danger", "success", "warning", "info"] as const).map((status) => (
            <Card
              key={status}
              className="surface-card status-card"
              style={{
                background: `var(--color-${status}-bg)`,
                borderColor: `var(--color-${status}-border)`,
              }}
            >
              <div
                className="surface-card-title status-card-title"
                style={{ color: `var(--color-${status}-text)` }}
              >
                {status}
              </div>
              <div
                className="surface-card-body status-card-body"
                style={{ color: `var(--color-${status}-text)` }}
              >
                Sample {status} message
              </div>
              <Badge
                className="status-badge"
                style={{
                  background: `var(--color-${status}-solid)`,
                  color: `var(--color-${status}-contrast)`,
                  borderColor: "transparent",
                }}
              >
                {status} solid
              </Badge>
            </Card>
          ))}
        </Grid>

        <Heading as="h2">Surfaces</Heading>
        <Grid
          className="surface-grid"
          columns="repeat(auto-fit, minmax(180px, 1fr))"
          gap={3}
        >
          {(
            [
              ["base", "--color-surface-base"],
              ["subtle", "--color-surface-subtle"],
              ["raised", "--color-surface-raised"],
              ["overlay", "--color-surface-overlay"],
            ] as const
          ).map(([name, token]) => (
            <Card
              key={name}
              className="surface-card"
              style={{ background: `var(${token})` }}
            >
              <div className="surface-card-title">{name}</div>
              <div className="surface-card-body">{token}</div>
            </Card>
          ))}
        </Grid>

        <Heading as="h2">Text Colors</Heading>
        <div className="section">
          {(
            [
              ["primary", "--color-text-primary"],
              ["secondary", "--color-text-secondary"],
              ["tertiary", "--color-text-tertiary"],
              ["disabled", "--color-text-disabled"],
              ["link", "--color-text-link"],
            ] as const
          ).map(([name, token]) => (
            <div key={name} className="token-row">
              <span
                style={{
                  color: `var(${token})`,
                  fontSize: "var(--font-size-5)",
                  fontWeight: 500,
                  minWidth: 200,
                }}
              >
                {name} text
              </span>
              <span className="token-name">{token}</span>
            </div>
          ))}
        </div>

        <Heading as="h2">Tooltip</Heading>
        <div className="tooltip-demo-row">
          <Tooltip content="Top tooltip" side="top">
            <Button className="tooltip-demo-trigger" variant="surface" size="2">
              Hover top
            </Button>
          </Tooltip>
          <Tooltip content="Right tooltip" side="right">
            <Button className="tooltip-demo-trigger" variant="surface" size="2">
              Hover right
            </Button>
          </Tooltip>
          <Tooltip content="Bottom tooltip" side="bottom">
            <Button className="tooltip-demo-trigger" variant="surface" size="2">
              Hover bottom
            </Button>
          </Tooltip>
        </div>

        <Heading as="h2">Popover</Heading>
        <div className="popover-demo-row">
          <Popover
            side="bottom"
            align="start"
            content={
              <div className="popover-demo-content">
                <div className="popover-demo-title">Theme Preset</div>
                <p className="popover-demo-text">
                  Apply a compact, high-contrast preset for dashboards.
                </p>
                <div className="popover-demo-actions">
                  <Button
                    className="popover-demo-button popover-demo-button-solid"
                    variant="solid"
                    size="1"
                  >
                    Apply
                  </Button>
                  <Button
                    className="popover-demo-button popover-demo-button-ghost"
                    variant="surface"
                    size="1"
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            }
          >
            <Button className="tooltip-demo-trigger" variant="surface" size="2">
              Open popover
            </Button>
          </Popover>

          <Popover
            side="right"
            align="center"
            content={
              <div className="popover-demo-content">
                <div className="popover-demo-title">Token Hint</div>
                <p className="popover-demo-text">
                  Use semantic aliases for surfaces and text before tuning
                  component tokens.
                </p>
              </div>
            }
          >
            <Button className="tooltip-demo-trigger" variant="surface" size="2">
              Open right
            </Button>
          </Popover>
        </div>

        <Heading as="h2">Spacing</Heading>
        <div className="spacing-row">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((step) => (
            <div key={step} className="spacing-block">
              <div
                style={{
                  width: `var(--space-${step})`,
                  height: `var(--space-${step})`,
                  background: "var(--color-accent-9)",
                  borderRadius: "var(--radius-1)",
                }}
              />
              <span>{step}</span>
            </div>
          ))}
        </div>

        <Heading as="h2">Border Radius</Heading>
        <div className="radius-row">
          {[
            ["1", "--radius-1"],
            ["2", "--radius-2"],
            ["3", "--radius-3"],
            ["4", "--radius-4"],
            ["5", "--radius-5"],
            ["6", "--radius-6"],
            ["full", "--radius-full"],
          ].map(([name, token]) => (
            <div key={name} className="spacing-block">
              <div
                className="radius-block"
                style={{ borderRadius: `var(${token})` }}
              >
                {name}
              </div>
              <span>{token.replace("--radius-", "")}</span>
            </div>
          ))}
        </div>

        <Box mt="6">
          <Heading as="h2">Component Radius</Heading>
          <Text as="p">
            Current: <code>{radius}</code>
          </Text>
          <div className="spacing-row">
            <Button>Button</Button>
            <Card>Card</Card>
          </div>
        </Box>
      </Box>
    </Container>
  );
}

const SwatchGrid = ({ label, hue }: { label: string; hue: string }) => {
  return (
    <Box>
      <Heading as="h3">{label}</Heading>
      <div className="swatch-grid">
        {STEPS.map((step) => (
          <div
            key={step}
            className="swatch"
            style={{ background: `var(--color-${hue}-${step})` }}
            title={`--color-${hue}-${step}`}
          />
        ))}
      </div>
      <StepsLabels steps={STEPS} />
    </Box>
  );
};

const StepsLabels = ({ steps }: { steps: string[] | number[] }) => {
  return (
    <Grid columns={`repeat(${steps.length}, 1fr)`} gap={3} mt={1}>
      {steps.map((s) => (
        <Text key={s} size="1" color="gray">
          {s}
        </Text>
      ))}
    </Grid>
  );
};
