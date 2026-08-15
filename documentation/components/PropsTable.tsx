import type { ReactNode } from 'react';
import { Code } from '../../src';

export interface PropRow {
  /** Prop name, e.g. `size`. */
  name: string;
  /** Type signature, e.g. `'1' | '2' | '3'` or `React.ReactNode`. */
  type: string;
  /** Default value shown as-is, e.g. `'2'`. Omit for optional props with no default (e.g. `color?`) or required props. */
  default?: string;
  /**
   * Marks the prop as required (no `?` in its TypeScript signature).
   * Only set this for genuinely required props — most props here are
   * optional even when they have no meaningful `default` to show.
   */
  required?: boolean;
  /** One-sentence description of what the prop does. */
  description: ReactNode;
}

/**
 * A consistent, scannable props reference table used across every component
 * doc page. Renders inside a horizontally-scrollable wrapper so wide type
 * signatures never blow out the page on narrow viewports.
 */
export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="props-table-wrap">
      <table className="props-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td>
                <Code size="1">{row.name}</Code>
              </td>
              <td>
                <Code size="1" className="props-table-type">
                  {row.type}
                </Code>
              </td>
              <td>
                {row.default ? (
                  <Code size="1">{row.default}</Code>
                ) : row.required ? (
                  <span className="props-table-required">required</span>
                ) : (
                  <span className="props-table-none">—</span>
                )}
              </td>
              <td>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
