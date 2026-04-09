import * as React from 'react';

export interface StrongProps extends React.HTMLAttributes<HTMLElement> {}

export const Strong = React.forwardRef<HTMLElement, StrongProps>(
  function Strong({ style, ...rest }, ref) {
    return (
      <strong
        ref={ref}
        style={{ fontWeight: 'var(--font-weight-semibold)' as React.CSSProperties['fontWeight'], ...style }}
        {...rest}
      />
    );
  },
);
