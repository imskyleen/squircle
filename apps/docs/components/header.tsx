'use client';

import { useTheme } from 'next-themes';
import { Logo } from './logo/logo';
import { MoonIcon, SunIcon } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import Link from 'next/link';

export const Header = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="relative bg-background z-10 h-16 w-full border-b flex items-center">
      <div className="w-full max-w-7xl px-4 md:px-6 mx-auto flex items-center justify-between">
        <Logo className="h-8" />

        <div className="flex items-center gap-3">
          <Button
            size="icon"
            className="!bg-transparent !shadow-none squircle squircle-xl squircle-neutral-100 dark:squircle-neutral-900 hover:squircle-neutral-200 dark:hover:squircle-neutral-800 text-muted-foreground"
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
          >
            {resolvedTheme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </Button>

          <Button
            className="!bg-transparent !shadow-none squircle squircle-xl squircle-teal-400/20 hover:squircle-teal-400/30 text-teal-500 p-0"
            asChild
          >
            <motion.div whileTap={{ scale: 0.95 }}>
              <Link
                className="size-full px-4 py-2"
                href="/docs/getting-started"
              >
                Get Started
              </Link>
            </motion.div>
          </Button>
        </div>
      </div>
    </div>
  );
};
