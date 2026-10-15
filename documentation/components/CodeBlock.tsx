import { useState } from "react";
import { Button, Code } from "../../src";
import { IconAlert, IconCheck, IconCopy } from "../icons";
import styles from "./CodeBlock.module.css";

type CopyStatus = "idle" | "copied" | "error";

export function CodeBlock({ title, code }: { title?: string; code: string }) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
    window.setTimeout(() => setCopyStatus("idle"), 1400);
  };

  return (
    <div className={styles.block}>
      <div className={styles.header}>
        <strong>{title ?? "Example"}</strong>
        <Button
          variant="ghost"
          size="1"
          data-state={copyStatus}
          onClick={onCopy}
          title={
            copyStatus === "copied"
              ? "Copied"
              : copyStatus === "error"
                ? "Copy failed"
                : "Copy code"
          }
          aria-label={title ? `Copy ${title} code` : "Copy code"}
        >
          {copyStatus === "copied" ? (
            <IconCheck className={styles.icon} />
          ) : copyStatus === "error" ? (
            <IconAlert className={styles.icon} />
          ) : (
            <IconCopy className={styles.icon} />
          )}
        </Button>
        <span className={styles.srOnly} role="status" aria-live="polite">
          {copyStatus === "copied"
            ? "Copied to clipboard"
            : copyStatus === "error"
              ? "Copy failed"
              : ""}
        </span>
      </div>
      <pre tabIndex={0}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
