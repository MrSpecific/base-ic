import { Card, Code, Container, Flex, Heading, Text } from "../../src";
import { ButtonLink } from "../components/RouteLink";
import { pageToPath } from "../routes";

export function NotFoundPage() {
  return (
    <Container as="main" className="site-page">
      <Card size="5" className="not-found">
        <Text as="p" size="2" className="not-found-code">
          404
        </Text>
        <Heading as="h1" size="8">
          Page not found
        </Heading>
        <Text as="p" size="4" className="not-found-copy">
          There’s nothing at <Code>{window.location.pathname}</Code>. It may have
          moved, or the link may be mistyped.
        </Text>
        <Flex gap={2} wrap="wrap">
          <ButtonLink href={pageToPath("docs")} size="3">
            Browse the docs
          </ButtonLink>
          <ButtonLink href={pageToPath("home")} size="3" variant="surface">
            Go home
          </ButtonLink>
        </Flex>
      </Card>
    </Container>
  );
}
