import { CodeEditor } from '@/components/code-editor';
import { CodeEditorRender } from '@/components/code-editor/render';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import CSSLogo from '@/components/logo/css-logo';
import TailwindCSSLogo from '@/components/logo/tailwindcss-logo';
import { Playground } from '@/components/playground';
import { Plus } from '@/components/plus';
import { Section } from '@/components/section';
import { Globe, Paintbrush } from 'lucide-react';

export default function Home() {
  return (
    <main>
      <Header />

      <Section>
        <div className="relative w-full h-[80px] border-b">
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
            <p className="text-foreground/40 text-center text-xs sm:text-[13px] font-mono">
              <span className="whitespace-nowrap">
                --squircle-border-radius: 40px;
              </span>{' '}
              <span className="whitespace-nowrap">
                --squircle-background-color:{' '}
                <span className="relative px-1 py-0.5">
                  <span className="text-white">#2dd4bf</span>
                  <span className="absolute -z-1 inset-0 squircle squircle-sm squircle-teal-400" />
                </span>
              </span>
              ;
            </p>
          </div>
        </div>

        <div className="flex flex-row w-full">
          <div className="flex-1 h-auto md:block hidden bg-pattern" />

          <div className="relative lg:max-w-3xl md:max-w-xl md:border-x mx-auto py-10 md:px-4 px-6 text-center">
            <div className="flex flex-col items-center justify-center gap-4">
              <h1 className="text-3xl sm:text-[38px] font-semibold">
                Make Squircles simply on the web
              </h1>

              <p className="text-foreground/60 text-lg">
                Finally, a simple, modular way to create beautiful squircles in
                CSS, offering full customization and seamless integration as
                well as Tailwind CSS integration.
              </p>

              <p className="text-sm text-foreground/40 italic mt-3">
                Inspired by{' '}
                <a
                  href="https://github.com/PavelLaptev/css-houdini-squircle"
                  className="text-foreground/60 hover:text-foreground underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pavel Laptev
                </a>
                &apos;s work
              </p>
            </div>

            <Plus className="absolute stroke-[2] text-neutral-400 dark:text-neutral-600 z-10 top-[-7.5px] left-[-7.5px] size-3.5" />
            <Plus className="absolute stroke-[2] text-neutral-400 dark:text-neutral-600 z-10 bottom-[-7.5px] left-[-7.5px] size-3.5" />
            <Plus className="absolute stroke-[2] text-neutral-400 dark:text-neutral-600 z-10 top-[-7.5px] right-[-7.5px] size-3.5" />
            <Plus className="absolute stroke-[2] text-neutral-400 dark:text-neutral-600 z-10 bottom-[-7.5px] right-[-7.5px] size-3.5" />
          </div>
          <div className="flex-1 h-auto md:block hidden bg-pattern" />
        </div>
      </Section>

      <div className="relative w-full h-[40px] border-y bg-neutral-50 dark:bg-neutral-900" />

      <Section>
        <div className="w-full lg:h-[500px] flex flex-col lg:flex-row">
          <div className="flex-1 overflow-hidden sm:p-10 p-5">
            <CodeEditor className="h-[425px]" />
          </div>
          <div className="relative lg:h-full sm:h-[500px] h-[450px] shrink-0 w-full lg:w-[500px] bg-pattern lg:border-l lg:border-t-0 border-t">
            <CodeEditorRender />
          </div>
        </div>
      </Section>

      <div className="relative w-full h-[40px] border-y bg-neutral-50 dark:bg-neutral-900" />

      <Section>
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1">
          <div className="p-7 space-y-3 h-[250px]">
            <div className="dark:squircle-teal-500/20 squircle-teal-500/10 squircle squircle-lg w-fit p-2">
              <CSSLogo className="size-6 text-teal-500" />
            </div>
            <h3 className="text-2xl font-semibold">Handling with CSS</h3>
            <p className="text-foreground/60 text-base">
              Modify your squircles directly in CSS via various combinable
              variables to give a result close to what a native squircle might
              be.
            </p>
          </div>
          <div className="p-7 space-y-3 min-h-[250px] sm:border-l sm:border-t-0 border-t">
            <div className="dark:squircle-teal-500/20 squircle-teal-500/10 squircle squircle-lg w-fit p-2">
              <TailwindCSSLogo className="size-6 text-teal-500" />
            </div>
            <h3 className="text-2xl font-semibold">Tailwind CSS Plugin</h3>
            <p className="text-foreground/60 text-base">
              Easily customize your squircles with our comprehensive tailwind
              plugin, which lets you play around with css variables.
            </p>
          </div>
          <div className="p-7 space-y-3 min-h-[250px] lg:border-l lg:border-t-0 border-t">
            <div className="dark:squircle-teal-500/20 squircle-teal-500/10 squircle squircle-lg w-fit p-2">
              <Paintbrush className="size-6 text-teal-500" />
            </div>
            <h3 className="text-2xl font-semibold">Highly customizable</h3>
            <p className="text-foreground/60 text-base">
              Choose between mask or background mode and customize radius,
              smoothing, background color and border size and color.
            </p>
          </div>
          <div className="p-7 space-y-3 min-h-[250px] sm:border-l lg:border-t-0 border-t">
            <div className="dark:squircle-teal-500/20 squircle-teal-500/10 squircle squircle-lg w-fit p-2">
              <Globe className="size-6 text-teal-500" />
            </div>
            <h3 className="text-2xl font-semibold">High compatibility</h3>
            <p className="text-foreground/60 text-base">
              We use CSS Houdini combined with an improved version of
              css-paint-polyfill to ensure high compatibility with all modern
              browsers.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <Playground />
      </Section>

      <Footer />
    </main>
  );
}
