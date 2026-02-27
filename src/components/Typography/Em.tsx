import * as React from 'react';

export interface EmProps extends React.HTMLAttributes<HTMLElement> {}

export const Em = React.forwardRef<HTMLElement, EmProps>(
  function Em({ style, ...rest }, ref) {
    return <em ref={ref} style={{ fontStyle: 'italic', ...style }} {...rest} />;
  },
);
