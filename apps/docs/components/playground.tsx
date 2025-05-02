'use client';

import { useState } from 'react';
import { Slider } from './slider';
import { ColorPicker } from './color-picker';
import { useColor } from 'react-color-palette';

export const Playground = () => {
  const [radius, setRadius] = useState(40);
  const [smooth, setSmooth] = useState(0.8);
  const [borderSize, setBorderSize] = useState(10);
  const [backgroundColor, setBackgroundColor] = useColor('#2dd4bf');
  const [borderColor, setBorderColor] = useColor('#99f6e4');

  return (
    <div className="bg-dots border-t flex flex-col lg:flex-row sm:justify-evenly items-center">
      <div className="p-6 sm:p-8 md:p-12 w-full lg:w-fit">
        <div className="size-full lg:w-[500px] max-w-[500px] mx-auto flex flex-col gap-6 sm:p-8 p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-900">
          <h2 className="text-2xl font-semibold">Try it out</h2>

          <Slider
            label="Border Radius"
            min={0}
            max={100}
            value={radius}
            onValueChange={(v) => setRadius(v)}
          />
          <Slider
            label="Border Smoothing"
            min={0.2}
            max={1}
            step={0.01}
            decimalPlaces={2}
            value={smooth}
            onValueChange={(v) => setSmooth(v)}
          />
          <Slider
            label="Border Width"
            min={0}
            max={50}
            value={borderSize}
            onValueChange={(v) => setBorderSize(v)}
          />
          <ColorPicker
            label="Background Color"
            color={backgroundColor}
            setColor={setBackgroundColor}
          />
          <ColorPicker
            label="Border Color"
            color={borderColor}
            setColor={setBorderColor}
          />
        </div>
      </div>

      <div className="h-full p-10 lg:pb-10 sm:pb-20 pb-16 flex items-center justify-center">
        <div
          className="sm:size-65 size-55 squircle"
          style={
            {
              '--squircle-background-color': backgroundColor.hex,
              '--squircle-border-radius': radius,
              '--squircle-border-top-left-radius': radius,
              '--squircle-border-top-right-radius': radius,
              '--squircle-border-bottom-left-radius': radius,
              '--squircle-border-bottom-right-radius': radius,
              '--squircle-border-smoothing': smooth,
              '--squircle-border-top-left-smoothing': smooth,
              '--squircle-border-top-right-smoothing': smooth,
              '--squircle-border-bottom-left-smoothing': smooth,
              '--squircle-border-bottom-right-smoothing': smooth,
              '--squircle-border-width': borderSize,
              '--squircle-border-color': borderColor.hex,
              '--squircle-mode': 'background',
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
};
