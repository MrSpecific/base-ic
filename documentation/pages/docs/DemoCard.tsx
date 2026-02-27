import { useState } from 'react';
import type { ReactNode } from 'react';
import { Button, Card } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';

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
    <Card className="docs-demo-card">
      <div className="docs-demo-header">
        <div className="docs-demo-header-row">
          <h3>{title}</h3>
          <Button
            className="docs-demo-toggle"
            variant="surface"
            size="1"
            onClick={() => setShowCode((prev) => !prev)}
            aria-expanded={showCode}
          >
            {showCode ? 'Hide code' : 'View code'}
          </Button>
        </div>
        <p>{description}</p>
      </div>
      <Card className="docs-demo-surface" variant="classic" size="3">{children}</Card>
      {showCode ? (
        <div className="docs-demo-code">
          <CodeBlock title={codeTitle ?? `${title} Code`} code={code} />
        </div>
      ) : null}
    </Card>
  );
}
