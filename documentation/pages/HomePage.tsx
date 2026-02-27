import { Box, Container, Flex, Grid, Section } from '../../src';
import type { Page } from '../types';

export function HomePage({ goTo }: { goTo: (page: Page) => void }) {
  return (
    <Container as="main" className="site-page">
      <Section className="hero" py={0}>
        <p className="hero-kicker">base-ic</p>
        <h1>Build fast, theme deeply.</h1>
        <p className="hero-copy">
          Base-ic gives you an ergonomic component API with a token system designed to be extended,
          not fought. Ship brand-aligned interfaces with predictable semantics and production-ready primitives.
        </p>
        <Flex className="hero-actions" gap={2}>
          <button className="site-button site-button-solid" onClick={() => goTo('docs')}>Read Docs</button>
          <button className="site-button site-button-ghost" onClick={() => goTo('playground')}>Open Playground</button>
        </Flex>
      </Section>

      <Grid className="marketing-grid" columns="repeat(auto-fit, minmax(220px, 1fr))" gap={3}>
        {[
          ['Token-first architecture', 'Semantic tokens separate intent from implementation so your design changes propagate predictably.'],
          ['Composable theme runtime', 'Accent, neutral, radius, and scale are runtime knobs, all exposed through strongly typed props.'],
          ['Base UI foundation', 'Built on modern accessible primitives so behavior and interaction quality stay high by default.'],
        ].map(([title, body]) => (
          <article key={title} className="marketing-card">
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </Grid>

      <Section className="marketing-band" py={0}>
        <Box>
          <h2>From prototype to product system</h2>
          <p>
            Start with out-of-the-box primitives, then progressively codify your brand, status patterns,
            and scaling model without rewriting component internals.
          </p>
        </Box>
      </Section>
    </Container>
  );
}
