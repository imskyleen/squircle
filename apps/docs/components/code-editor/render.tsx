'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Star } from 'lucide-react';

const COLORS = ['#d0dfe1', '#e3dbe5', '#dcd5ce', '#817f82'];

export const CodeEditorRender = () => {
  const [color, setColor] = React.useState(COLORS[0]);

  return (
    <motion.div className="absolute sm:inset-10 inset-5 flex items-center justify-center">
      <motion.div className="max-w-[380px] w-full squircle squircle-3xl squircle-border-neutral-100 dark:squircle-border-neutral-800 squircle-border-10 squircle-background drop-shadow-sm p-5">
        <Image
          src="/ipad-demo.png"
          alt="iPad Air"
          width={1260}
          height={680}
          className="w-full object-contain"
        />

        <div className="p-2">
          <p className="font-semibold text-lg">
            iPad Apple Air 11&quot; Puce M3 128 Go Wifi 7th generation 2025
          </p>

          <div className="flex items-end gap-x-1 mt-2.5">
            <Star className="size-4 fill-yellow-500 text-yellow-500" />
            <Star className="size-4 fill-yellow-500 text-yellow-500" />
            <Star className="size-4 fill-yellow-500 text-yellow-500" />
            <Star className="size-4 fill-yellow-500 text-yellow-500" />
            <Star className="size-4 fill-neutral-200 text-neutral-200 dark:text-neutral-700 dark:fill-neutral-700" />
            <span className="text-xs leading-3 text-muted-foreground font-medium ml-1">
              4.1 <small>(123)</small>
            </span>
          </div>

          <div className="flex items-center mt-4.5 gap-x-2">
            {COLORS.map((c) => (
              <motion.button
                key={c}
                onClick={() => setColor(c)}
                className="relative squircle squircle-5 size-6"
                style={
                  { '--squircle-background-color': c } as React.CSSProperties
                }
              >
                {color === c && (
                  <motion.div
                    layoutId="color"
                    className="absolute size-7.5 squircle-mask left-1/2 -translate-1/2 top-1/2 squircle-lg z-1 squircle-border-1.5"
                    style={{ backgroundColor: c }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.975 }}
            className="cursor-pointer mt-4 h-10 squircle squircle-lg squircle-primary w-full text-primary-foreground font-medium"
          >
            Add to cart
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
