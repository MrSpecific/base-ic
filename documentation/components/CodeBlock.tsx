import { useState } from 'react';
import { Button } from '../../src';
import { IconAlert, IconCheck, IconCopy } from '../icons';

type CopyStatus = 'idle' | 'copied' | 'error';

export function CodeBlock({ title, code }: { title?: string; code: string }) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle');

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('error');
    }
    window.setTimeout(() => setCopyStatus('idle'), 1400);
  };

  return (
    <div className="docs-code-block">
      <div className="docs-code-header">
        <strong>{title ?? 'Example'}</strong>
        <Button
          className="docs-copy-button"
          variant="ghost"
          size="1"
          data-state={copyStatus}
          onClick={onCopy}
          title={copyStatus === 'copied' ? 'Copied' : copyStatus === 'error' ? 'Copy failed' : 'Copy code'}
          aria-label={copyStatus === 'copied' ? 'Copied' : copyStatus === 'error' ? 'Copy failed' : 'Copy code'}
        >
          {copyStatus === 'copied' ? (
            <IconCheck className="docs-copy-icon" />
          ) : copyStatus === 'error' ? (
            <IconAlert className="docs-copy-icon" />
          ) : (
            <IconCopy className="docs-copy-icon" />
          )}
        </Button>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  );
}
