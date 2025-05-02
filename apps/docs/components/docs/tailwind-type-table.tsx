'use client';

import { Info as InfoIcon } from 'lucide-react';
import { cva } from 'class-variance-authority';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/animate-ui/radix/popover';
import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

export function Info({ children }: { children: ReactNode }): ReactNode {
  return (
    <Popover>
      <PopoverTrigger>
        <InfoIcon className="size-4" />
      </PopoverTrigger>
      <PopoverContent className="prose max-h-[400px] min-w-[220px] max-w-[400px] overflow-auto text-sm prose-no-margin p-2 w-fit">
        {children}
      </PopoverContent>
    </Popover>
  );
}

interface ObjectType {
  class: ReactNode;
  styles: ReactNode;
}

const field = cva('inline-flex flex-row items-center gap-1');
const code = cva(
  'rounded-md bg-fd-secondary p-1 text-fd-secondary-foreground',
  {
    variants: {
      color: {
        primary: 'bg-fd-primary/10 text-fd-primary',
      },
    },
  },
);

export function TypeTable({
  type,
  className,
}: {
  type: Record<string, ObjectType>;
  className?: string;
}) {
  return (
    <div className={cn('prose my-6 overflow-auto prose-no-margin', className)}>
      <table className="whitespace-nowrap text-sm text-fd-muted-foreground">
        <thead>
          <tr>
            <th className="w-[60%]">Class</th>
            <th className="w-[40%]">Styles</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(type).map(([key, value]) => {
            return (
              <tr key={key}>
                <td className="flex items-start">
                  <div className={field()}>
                    <code
                      className={cn(
                        code({
                          color: 'primary',
                        }),
                      )}
                    >
                      {key}
                    </code>
                  </div>
                </td>
                <td>
                  <div className={field()}>
                    <code className={cn(code(), 'whitespace-pre')}>
                      {value.styles}
                    </code>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function TailwindTypeTable({
  type,
}: {
  type: Record<string, ObjectType>;
}) {
  const [isOpened, setIsOpened] = useState(false);

  if (Object.keys(type).length > 10) {
    return (
      <div className="relative overflow-hidden">
        <div
          className={cn(
            isOpened ? 'max-h-full pb-10' : 'max-h-[650px] overflow-hidden',
          )}
        >
          <TypeTable type={type} className="mt-0" />
        </div>

        <div
          className={cn(
            'absolute inset-x-0 bottom-0 h-12 flex items-center justify-center rounded-t-xl to-white p-2',
            isOpened
              ? 'h-14'
              : 'bg-gradient-to-b from-neutral-300/30 dark:from-neutral-700/30 dark:to-neutral-950',
          )}
        >
          <Button
            variant="secondary"
            className="h-8 text-xs"
            onClick={() => setIsOpened((prev) => !prev)}
          >
            {isOpened ? 'Show Less' : 'Show More'}
          </Button>
        </div>
      </div>
    );
  }
  return <TypeTable type={type} />;
}
