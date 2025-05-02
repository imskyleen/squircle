'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import TailwindCSSLogo from '../logo/tailwindcss-logo';
import CSSLogo from '../logo/css-logo';
import { cn } from '@/lib/utils';

const Editor = ({ code }: { code: string }) => {
  const { resolvedTheme } = useTheme();
  const [highlightedCode, setHighlightedCode] = React.useState('');

  React.useEffect(() => {
    if (!code.length) return;

    const loadHighlightedCode = async () => {
      try {
        const { codeToHtml } = await import('shiki');

        const highlighted = await codeToHtml(code, {
          lang: 'html',
          themes: {
            light: 'github-light',
            dark: 'github-dark',
          },
          defaultColor: resolvedTheme === 'dark' ? 'dark' : 'light',
        });

        setHighlightedCode(highlighted);
      } catch (e) {
        console.error(e);
      }
    };

    loadHighlightedCode();
  }, [resolvedTheme, code]);

  return (
    <div
      className="[&>pre,_&_code]:!bg-transparent [&>pre,_&_code]:[background:transparent_!important] [&>pre,_&_code]:border-none [&_code]:!text-[13px]"
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  );
};

const tailwindCode = `<div class="w-[380px] squircle squircle-3xl squircle-border-neutral-100 dark:squircle-border-neutral-800 squircle-border-10 squircle-background drop-shadow-sm p-5">
  <img src="/ipad-demo.png" alt="iPad Air" class="w-full object-contain" />
  <div class="p-2">
    {...}
    <div className="flex items-center mt-4.5 gap-x-2">
      <button className="relative squircle squircle-5 squircle-[#d0dfe1] size-6">
        <div className="absolute size-7.5 squircle-mask left-1/2 -translate-1/2 top-1/2 squircle-lg z-1 squircle-border-1.5" />
      </button>
      <button className="relative squircle squircle-5 squircle-[#e3dbe5] size-6" />
      <button className="relative squircle squircle-5 squircle-[#dcd5ce] size-6" />
      <button className="relative squircle squircle-5 squircle-[#817f82] size-6" />
    </div>
    <button class="cursor-pointer mt-4 h-10 squircle squircle-lg squircle-primary w-full text-primary-foreground font-medium">
      Add to cart
    </button>
  </div>
</div>
`;

const cssCode = `<style>
  .container {
    width: 380px;
    padding: 1.25rem;
    drop-shadow: 0 1px 2px rgb(0 0 0 / 0.15);
    background: paint(squircle);
    background-repeat: no-repeat;
    --squircle-border-radius: 24px;
    --squircle-border-width: 10px;
    --squircle-border-color: #f5f5f5;
    --squircle-background-color: #ffffff;

    @supports not (background: paint(squircle)) {
      border-radius: 24px;
    }
  }
  .container img {
    width: 100%;
    object-fit: contain;
  }
  .inner {
    padding: 0.5rem;
  }
  .color-row {
    display: flex;
    align-items: center;
    margin-top: 1.125rem;
    gap: 0.5rem;
  }
  .color-button {
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.625rem;
    background: paint(squircle);
    background-repeat: no-repeat;
    --squircle-border-radius: 5px;

    @supports not (background: paint(squircle)) {
      border-radius: 5px;
    }
  }
  .color-button:nth-child(1) {
    --squircle-background-color: #d0dfe1;
  }
  .color-button:nth-child(2) {
    --squircle-background-color: #e3dbe5;
  }
  .color-button:nth-child(3) {
    --squircle-background-color: #dcd5ce;
  }
  .color-button:nth-child(4) {
    --squircle-background-color: #817f82;
  }
  .color-button .inner-mask {
    position: absolute;
    width: 1.875rem;
    height: 1.875rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    mask-image: paint(squircle);
    mask-repeat: no-repeat;
    --squircle-border-radius: 8px;
    --squircle-border-width: 1.5;

    @supports not (mask-image: paint(squircle)) {
      border-radius: 8px;
    }
  }
  .add-to-cart {
    display: block;
    width: 100%;
    height: 2.5rem;
    margin-top: 1rem;
    color: #ffffff;
    font-weight: 500;
    text-align: center;
    line-height: 2.5rem;
    cursor: pointer;
    background: paint(squircle);
    background-repeat: no-repeat;
    --squircle-border-radius: 8px;
    --squircle-background-color: #000000;

    @supports not (background: paint(squircle)) {
      border-radius: 8px;
    }
  }
  @media (prefers-color-scheme: dark) {
    .container {
      --squircle-border-color: #262626;
      --squircle-background-color: #000000;
    }
    .add-to-cart {
      --squircle-background-color: #ffffff;
    }
  }
</style>

<div class="container">
  <img src="/ipad-demo.png" alt="iPad Air" />
  <div class="inner">
    <div class="color-row">
      <button class="color-button">
        <div class="inner-mask"></div>
      </button>
      <button class="color-button"></button>
      <button class="color-button"></button>
      <button class="color-button"></button>
    </div>
    <button class="add-to-cart">Add to cart</button>
  </div>
</div>`;

export const CodeEditor = ({ className }: { className?: string }) => {
  const [mode, setMode] = React.useState<'css' | 'tailwindcss'>('css');

  return (
    <Tabs
      value={mode}
      onValueChange={(value) => setMode(value as 'css' | 'tailwindcss')}
    >
      <div className={cn('size-full rounded-[17px] bg-border p-px', className)}>
        <div className="relative size-full bg-background rounded-2xl overflow-hidden flex flex-col">
          <div className="bg-muted h-11 gap-x-3 border-b border-neutral-200 dark:border-neutral-800 relative flex flex-row items-center gap-y-2 px-5 pt-0.5">
            <div className="sm:flex hidden flex-row gap-x-1.5">
              <div className="size-2.5 rounded-full bg-muted-foreground/30"></div>
              <div className="size-2.5 rounded-full bg-muted-foreground/30"></div>
              <div className="size-2.5 rounded-full bg-muted-foreground/30"></div>
            </div>

            <div className="flex flex-row gap-x-2 h-11 text-sm font-medium">
              <TabsList className="bg-transparent h-10 mt-px">
                <TabsTrigger value="css">
                  <div
                    data-value="css"
                    className="px-2 py-1 flex flex-row gap-x-2 items-center cursor-pointer transition-colors duration-300 h-10"
                  >
                    <CSSLogo className="size-4" />
                    <span>CSS</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="tailwindcss">
                  <div
                    data-value="tailwindcss"
                    className="px-2 py-1 flex flex-row gap-x-2 items-center cursor-pointer transition-colors duration-300 h-10"
                  >
                    <TailwindCSSLogo className="size-4" />
                    <span>Tailwind CSS</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <div className="h-[calc(100%-2.75rem)] w-full text-sm font-mono relative flex-1">
            <TabsContent value="css" className="p-4 overflow-auto h-full">
              <Editor code={cssCode} />
            </TabsContent>
            <TabsContent
              value="tailwindcss"
              className="p-4 overflow-auto h-full"
            >
              <Editor code={tailwindCode} />
            </TabsContent>
          </div>
        </div>
      </div>
    </Tabs>
  );
};
