import { useState } from "react";
import type { ReactNode } from "react";
import { Button, Card, Flex, Heading, Text, Box } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";

export function DemoCard({
  title,
  description,
  code,
  codeTitle,
  children,
}: {
  title: string;
  description: string;
  code: string;
  codeTitle?: string;
  children: ReactNode;
}) {
  const [showCode, setShowCode] = useState(false);

  return (
    <Card>
      <Box mb="4">
        <Flex align="center" justify="space-between">
          <Heading as="h3" size="3">
            {title}
          </Heading>
          <Button
            variant="outline"
            size="1"
            onClick={() => setShowCode((prev) => !prev)}
            aria-expanded={showCode}
            color="gray"
          >
            {showCode ? "Hide code" : "View code"}
          </Button>
        </Flex>

        <Text as="p">{description}</Text>
      </Box>
      {!showCode && (
        <Card className="docs-demo-surface" variant="classic" size="3">
          {children}
        </Card>
      )}
      {showCode ? (
        <CodeBlock title={codeTitle ?? `${title} Code`} code={code} />
      ) : null}
    </Card>
  );
}
