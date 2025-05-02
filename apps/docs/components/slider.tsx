import { Slider as ShadcnSlider } from '@/components/ui/slider';
import { Label } from './ui/label';

export const Slider = ({
  label,
  min,
  max,
  step,
  value,
  onValueChange,
  decimalPlaces,
}: {
  label: string;
  min: number;
  max: number;
  step?: number;
  decimalPlaces?: number;
  value: number;
  onValueChange: (value: number) => void;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor={label}>{label}</Label>
      <ShadcnSlider
        id={label}
        min={min}
        max={max}
        step={step}
        decimalPlaces={decimalPlaces}
        value={[value]}
        onValueChange={(v) => onValueChange(v[0])}
      />
    </div>
  );
};
