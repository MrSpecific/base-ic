import { useState } from 'react';
import type { ReactNode } from 'react';
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
    <article className="docs-demo-card">
      <div className="docs-demo-header">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="docs-demo-surface">{children}</div>
      <button
        type="button"
        className="docs-demo-toggle"
        onClick={() => setShowCode((prev) => !prev)}
        aria-expanded={showCode}
      >
        {showCode ? 'Hide code' : 'View code'}
      </button>
      {showCode ? <CodeBlock title={codeTitle ?? `${title} Code`} code={code} /> : null}
    </article>
  );
}
