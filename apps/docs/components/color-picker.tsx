import { Label } from './ui/label';
import {
  ColorPicker as ColorPickerPrimitive,
  ColorService,
  type IColor,
} from 'react-color-palette';
import 'react-color-palette/css';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './animate-ui/radix/popover';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export const ColorPicker = ({
  label,
  color,
  setColor,
}: {
  label: string;
  color: IColor;
  setColor: (color: IColor) => void;
}) => {
  const [localColor, setLocalColor] = useState(color.hex);

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={label}>{label}</Label>

      <div className="relative">
        <Input
          id={label}
          value={localColor}
          onChange={(e) => {
            if (e.target.value.startsWith('#')) {
              setLocalColor(e.target.value);
            } else {
              setLocalColor('#');
            }
            setColor(ColorService.convert('hex', e.target.value));
          }}
          onBlur={() => {
            setLocalColor(color.hex);
          }}
          className="h-10 text-lg rounded-lg bg-background shadow-none"
        />
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="absolute shadow-sm size-7 rounded-md right-1.5 top-1/2 -translate-y-1/2"
              style={{
                backgroundColor: color.hex,
              }}
            />
          </PopoverTrigger>
          <PopoverContent
            className={cn(
              'p-0 min-w-0 w-fit',
              '[&_.rcp-body]:!gap-3.5',
              '[&_.rcp-field-input]:!border-border [&_.rcp-field-input]:!border-1 [&_.rcp-field-input]:!rounded-md [&_.rcp-field-input]:!text-foreground',
              '[&_.rcp]:!bg-background [&_.rcp-field-label]:hidden [&_.rcp-body]:!p-3.5 [&_.rcp]:!w-65',
            )}
          >
            <ColorPickerPrimitive
              height={150}
              color={color}
              onChange={(color) => {
                setColor(color);
                setLocalColor(color.hex);
              }}
              hideInput={['rgb', 'hsv']}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
