import type { PropsWithChildren } from 'react';
import { Card } from '../../src';

export function DocsSection({ children }: PropsWithChildren) {
  return <Card className="docs-section">{children}</Card>;
}
