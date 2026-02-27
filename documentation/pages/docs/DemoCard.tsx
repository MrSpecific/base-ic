import type { ReactNode } from 'react';

export function DemoCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <article className="docs-demo-card">
      <div className="docs-demo-header">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="docs-demo-surface">{children}</div>
    </article>
  );
}
