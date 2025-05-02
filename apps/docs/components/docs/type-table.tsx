'use client';

import { Info as InfoIcon } from 'lucide-react';
import Link from 'fumadocs-core/link';
import { cva } from 'class-variance-authority';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/animate-ui/radix/popover';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

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
  /**
   * Additional description of the field
   */
  description?: ReactNode;
  type: string;
  typeDescription?: ReactNode;
  /**
   * Optional link to the type
   */
  typeDescriptionLink?: string;
  deprecated?: boolean;
}

const field = cva('inline-flex flex-row items-center gap-1');
const code = cva(
  'rounded-md bg-fd-secondary p-1 text-fd-secondary-foreground',
  {
    variants: {
      color: {
        primary: 'bg-fd-primary/10 text-fd-primary',
        deprecated: 'line-through text-fd-primary/50',
      },
    },
  },
);

export function TypeTable({ type }: { type: Record<string, ObjectType> }) {
  return (
    <div className="prose my-6 overflow-auto prose-no-margin">
      <table className="whitespace-nowrap text-sm text-fd-muted-foreground">
        <thead>
          <tr>
            <th className="w-[60%]">Variable</th>
            <th className="w-[40%]">Type</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(type).map(([key, value]) => (
            <tr key={key}>
              <td>
                <div className={field()}>
                  <code
                    className={cn(
                      code({
                        color: value.deprecated ? 'deprecated' : 'primary',
                      }),
                    )}
                  >
                    {key}
                  </code>
                  {value.description ? <Info>{value.description}</Info> : null}
                </div>
              </td>
              <td>
                <div className={field()}>
                  <code className={code()}>{value.type}</code>
                  {value.typeDescription ? (
                    <Info>{value.typeDescription}</Info>
                  ) : null}
                  {value.typeDescriptionLink ? (
                    <Link href={value.typeDescriptionLink}>
                      <InfoIcon className="size-4" />
                    </Link>
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
