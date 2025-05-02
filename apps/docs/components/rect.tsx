import React from 'react';

export const Rect = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M6.6,0 H93.4 A6.6,6.6 0 0 1 100,6.6 V43.4 A6.6,6.6 0 0 1 93.4,50 H6.6 A6.6,6.6 0 0 1 0,43.4 V6.6 A6.6,6.6 0 0 1 6.6,0 Z" />
    </svg>
  );
};
