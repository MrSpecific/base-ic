/// <reference types="vite/client" />

/**
 * CSS Module type declarations.
 * Allows TypeScript to understand `import styles from './foo.module.css'`.
 */
declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}
