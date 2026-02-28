import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Section,
  Text,
} from "../../src";
import type { Page } from "../types";

export function HomePage({ goTo }: { goTo: (page: Page) => void }) {
  return (
    <Container as="main" className="site-page">
      <Section className="hero" py={0} mb={6}>
        <Box>
          <Badge variant="soft" size="2">
            Intelligent Components
          </Badge>
        </Box>
        <Heading size="9">Build fast, theme deeply.</Heading>
        <Text as="p" className="hero-copy">
          Base-ic gives you an ergonomic component API with a token system
          designed to be extended, not fought. Ship brand-aligned interfaces
          with predictable semantics and production-ready primitives.
        </Text>
        <Flex className="hero-actions" gap={2}>
          <Button variant="solid" size="3" onClick={() => goTo("docs")}>
            Read Docs
          </Button>
          <Button variant="surface" size="3" onClick={() => goTo("playground")}>
            Open Playground
          </Button>
        </Flex>
      </Section>

      <Grid columns="repeat(auto-fit, minmax(220px, 1fr))" gap={4}>
        {[
          [
            "Token-first architecture",
            "Semantic tokens separate intent from implementation so your design changes propagate predictably.",
          ],
          [
            "Composable theme runtime",
            "Accent, neutral, radius, and scale are runtime knobs, all exposed through strongly typed props.",
          ],
          [
            "Base UI foundation",
            "Built on modern accessible primitives so behavior and interaction quality stay high by default.",
          ],
        ].map(([title, body]) => (
          <Card key={title} size="5">
            <Heading as="h3" size="3" mb="2">
              {title}
            </Heading>
            <Text as="p">{body}</Text>
          </Card>
        ))}
      </Grid>

      <Card variant="surface" size="5" mt={6}>
        <Box>
          <Heading as="h2">From prototype to product system</Heading>
          <Text as="p">
            Start with out-of-the-box primitives, then progressively codify your
            brand, status patterns, and scaling model without rewriting
            component internals.
          </Text>
        </Box>
      </Card>
    </Container>
  );
}
