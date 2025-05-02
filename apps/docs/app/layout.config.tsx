import { Logo } from '@/components/logo/logo';
import { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: <Logo className="h-7.5" />,
  },
};
