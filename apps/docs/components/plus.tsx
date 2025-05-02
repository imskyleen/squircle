import React from 'react';

export const Plus = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <line y1="12" x2="24" y2="12" />
      <line x1="12" x2="12" y2="24" />
    </svg>
  );
};
