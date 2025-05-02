import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import XIcon from '@/components/logo/x-icon';
import { ThemeSwitcher } from '@/components/docs/theme-switcher';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      githubUrl="https://github.com/imskyleen/squircle"
      links={[
        {
          icon: <XIcon />,
          url: 'https://x.com/imskyleen',
          text: 'X',
          type: 'icon',
        },
      ]}
      tree={source.pageTree}
      themeSwitch={{
        component: <ThemeSwitcher />,
      }}
      {...baseOptions}
    >
      {children}
    </DocsLayout>
  );
}
