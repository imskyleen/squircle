'use client';

import * as React from 'react';
import { init } from '@squircle/core';

export function SquircleProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => void init(), []);
  return children;
}
