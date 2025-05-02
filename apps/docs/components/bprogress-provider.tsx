'use client';

import { ProgressProvider } from '@bprogress/next/app';

const BProgressProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider color="#2dd4bf" options={{ showSpinner: true }}>
      {children}
    </ProgressProvider>
  );
};

export { BProgressProvider };
