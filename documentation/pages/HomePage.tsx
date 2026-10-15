import { useId } from "react";
import {
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Code,
  Container,
  Dialog,
  DialogPrimitive,
  Flex,
  Grid,
  Heading,
  Input,
  Section,
  Select,
  Switch,
  Text,
} from "../../src";
import { CodeBlock } from "../components/CodeBlock";
import { ButtonLink } from "../components/RouteLink";
import { GITHUB_URL, pageToPath } from "../routes";

const installSnippet = "npm install @wlcr/base-ic @base-ui/react";

const quickStartSnippet = [
  "import { Theme, Button, Flex, Text } from '@wlcr/base-ic';",
  "import '@wlcr/base-ic/tokens';",
  "import '@wlcr/base-ic/style.css';",
  "",
  "export default function App() {",
  "  return (",
  '    <Theme accentColor="iris" grayColor="slate" radius="large">',
  '      <Flex direction="column" gap={3}>',
  '        <Text size="4">Hello from base-ic</Text>',
  '        <Button variant="soft">Get started</Button>',
  "      </Flex>",
  "    </Theme>",
  "  );",
  "}",
].join("\n");

const brandColorSnippet = [
  "<Theme",
  '  accentColor="brand"',
  "  customColors={{",
  "    brand: {",
  "      1: 'oklch(99% 0.01 300)', 2: 'oklch(97% 0.02 300)',",
  "      // …steps 3–11",
  "      12: 'oklch(25% 0.09 300)',",
  "      contrast: 'white',",
  "    },",
  "  }}",
  ">",
  "  <App />",
  "</Theme>",
].join("\n");

const WHY_POINTS: Array<[string, string]> = [
  [
    "Custom colors without the fight",
    "Radix Themes gives you a fixed palette. In base-ic, a brand color is one customColors entry — every component picks it up through the accent tokens.",
  ],
  [
    "A modern primitive layer",
    "Components are built on Base UI, with its render prop, composable parts and accessible behavior. Need the raw parts? Every wrapper re-exports its *Primitive.",
  ],
  [
    "Theming that goes all the way down",
    "Accent, gray, radius, scaling, appearance and font slots are Theme props; everything else is a documented CSS custom property you can override.",
  ],
];

const SHOWCASE_COLORS = ["iris", "grass", "tomato", "amber", "cyan", "plum"] as const;

export function HomePage() {
  const emailId = useId();
  const planId = useId();

  return (
    <Container as="main" className="site-page home-page">
      <Section py={0} mb={6}>
        <Card className="hero" variant="gradient" p="7">
          <Box>
            <Badge variant="surface" size="2">
              Radix Themes-style API · Built on Base UI
            </Badge>
          </Box>
          <Heading as="h1" size="9">
            Build fast, theme deeply.
          </Heading>
          <Text as="p" className="hero-copy">
            base-ic gives you the props you already know from Radix Themes —{" "}
            <Code>color</Code>, <Code>variant</Code>, <Code>size</Code>,{" "}
            <Code>radius</Code> — on accessible Base UI primitives, with a token
            system designed to be extended, not fought. No Tailwind, no runtime
            CSS-in-JS.
          </Text>
          <Flex className="hero-actions" gap={2}>
            <ButtonLink variant="solid" size="3" href={pageToPath("docs")}>
              Get started
            </ButtonLink>
            <ButtonLink variant="surface" size="3" href={pageToPath("playground")}>
              Open Playground
            </ButtonLink>
            <ButtonLink variant="ghost" size="3" href={GITHUB_URL} external>
              View on GitHub
            </ButtonLink>
          </Flex>
        </Card>
      </Section>

      <Section py={0} mb={6} aria-labelledby="home-install">
        <Grid className="home-split" columns="repeat(auto-fit, minmax(280px, 1fr))" gap={4}>
          <Card size="5" className="home-card">
            <Heading as="h2" size="6" id="home-install">
              Install in a minute
            </Heading>
            <Text as="p" className="home-muted">
              Add the package and its Base UI peer dependency, import the tokens
              and component styles once, and wrap your app in <Code>Theme</Code>.
            </Text>
            <CodeBlock title="Install" code={installSnippet} />
          </Card>
          <Card size="5" className="home-card">
            <CodeBlock title="App.tsx" code={quickStartSnippet} />
          </Card>
        </Grid>
      </Section>

      <Section py={0} mb={6} aria-labelledby="home-showcase">
        <Flex direction="column" gap={2} mb={4}>
          <Heading as="h2" size="6" id="home-showcase">
            Live components
          </Heading>
          <Text as="p" className="home-muted">
            Everything below is the real library. Open the theme panel (bottom
            right) to change accent, gray, radius, scaling and appearance.
          </Text>
        </Flex>
        <Grid columns="repeat(auto-fit, minmax(260px, 1fr))" gap={4}>
          <Card size="4" className="home-card">
            <Heading as="h3" size="3">
              Buttons
            </Heading>
            <Flex wrap="wrap" gap={2}>
              <Button variant="solid">Solid</Button>
              <Button variant="soft">Soft</Button>
              <Button variant="surface">Surface</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button loading>Saving</Button>
            </Flex>
          </Card>
          <Card size="4" className="home-card">
            <Heading as="h3" size="3">
              Badges & colors
            </Heading>
            <Flex wrap="wrap" gap={2}>
              {SHOWCASE_COLORS.map((color) => (
                <Badge key={color} color={color} variant="soft">
                  {color}
                </Badge>
              ))}
              <Badge color="grass" variant="solid">
                Shipped
              </Badge>
              <Badge color="tomato" variant="outline">
                Blocked
              </Badge>
            </Flex>
          </Card>
          <Card size="4" className="home-card">
            <Heading as="h3" size="3">
              Form controls
            </Heading>
            <Flex direction="column" gap={3}>
              <Flex direction="column" gap={1}>
                <label className="home-label" htmlFor={emailId}>
                  Email
                </label>
                <Input id={emailId} type="email" placeholder="you@example.com" />
              </Flex>
              <Flex direction="column" gap={1}>
                <label className="home-label" htmlFor={planId}>
                  Plan
                </label>
                <Select id={planId} defaultValue="pro">
                  <Select.Item value="hobby">Hobby</Select.Item>
                  <Select.Item value="pro">Pro</Select.Item>
                  <Select.Item value="team">Team</Select.Item>
                </Select>
              </Flex>
              <Flex gap={4} wrap="wrap">
                <label className="home-inline-label">
                  <Checkbox defaultChecked /> Product updates
                </label>
                <label className="home-inline-label">
                  <Switch defaultChecked /> Dark launch
                </label>
              </Flex>
            </Flex>
          </Card>
          <Card size="4" className="home-card">
            <Heading as="h3" size="3">
              Overlays
            </Heading>
            <Text as="p" className="home-muted">
              Dialogs, popovers, menus and toasts are portaled, focus-managed and
              themed like everything else.
            </Text>
            <Box>
              <Dialog
                title="Invite a teammate"
                description="They’ll get an email with a link to join your workspace."
                content={<Input aria-label="Teammate email" placeholder="teammate@example.com" />}
                footer={
                  <>
                    <DialogPrimitive.Close
                      render={
                        <Button variant="ghost" color="gray">
                          Cancel
                        </Button>
                      }
                    />
                    <DialogPrimitive.Close render={<Button>Send invite</Button>} />
                  </>
                }
              >
                <Button variant="soft">Open a dialog</Button>
              </Dialog>
            </Box>
          </Card>
        </Grid>
      </Section>

      <Section py={0} mb={6} aria-labelledby="home-why">
        <Flex direction="column" gap={2} mb={4}>
          <Heading as="h2" size="6" id="home-why">
            Why not just use Radix Themes?
          </Heading>
          <Text as="p" className="home-muted">
            Radix Themes is excellent for getting started fast. base-ic keeps that
            developer experience and fixes the parts that get in the way once you
            have a brand to match.
          </Text>
        </Flex>
        <Grid columns="repeat(auto-fit, minmax(220px, 1fr))" gap={4}>
          {WHY_POINTS.map(([title, body]) => (
            <Card key={title} size="5">
              <Heading as="h3" size="3" mb="2">
                {title}
              </Heading>
              <Text as="p" className="home-muted">
                {body}
              </Text>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section py={0} aria-labelledby="home-brand">
        <Card variant="surface" size="5">
          <Grid className="home-split" columns="repeat(auto-fit, minmax(280px, 1fr))" gap={5}>
            <Flex direction="column" gap={3}>
              <Heading as="h2" size="6" id="home-brand">
                Bring your own brand color
              </Heading>
              <Text as="p" className="home-muted">
                Ship with over 30 built-in color scales, or register your own 12-step
                scale with <Code>customColors</Code> and use it anywhere a color
                is accepted — as the Theme accent or on a single component.
              </Text>
              <Flex wrap="wrap" gap={2}>
                {SHOWCASE_COLORS.map((color) => (
                  <Button key={color} color={color} size="1" variant="soft">
                    {color}
                  </Button>
                ))}
              </Flex>
              <Box>
                <ButtonLink href={pageToPath("customization")} variant="outline">
                  Read the customization guide
                </ButtonLink>
              </Box>
            </Flex>
            <CodeBlock title="Custom brand color" code={brandColorSnippet} />
          </Grid>
        </Card>
      </Section>
    </Container>
  );
}
