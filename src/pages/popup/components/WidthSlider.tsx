import React from 'react';

import { Card, CardContent, CardTitle } from '../../../components/ui/card';
import { Slider } from '../../../components/ui/slider';
import { Switch } from '../../../components/ui/switch';

interface WidthSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  narrowLabel: string;
  wideLabel: string;
  enabled?: boolean;
  onEnabledChange?: (enabled: boolean) => void;
  valueFormatter?: (value: number) => string;
  onChange: (value: number) => void;
  onChangeComplete?: (value: number) => void;
}

/**
 * Reusable width adjustment slider component
 * Used for chat width and edit input width settings
 */
export default function WidthSlider({
  label,
  value,
  min,
  max,
  step,
  narrowLabel,
  wideLabel,
  enabled,
  onEnabledChange,
  valueFormatter,
  onChange,
  onChangeComplete,
}: WidthSliderProps) {
  const formatValue = valueFormatter ?? ((v: number) => `${v}%`);
  const hasToggle = typeof enabled !== 'undefined' && onEnabledChange;

  return (
    <Card className="p-4 transition-shadow hover:shadow-lg">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-2">
          <CardTitle
            className={`text-xs uppercase transition-opacity ${hasToggle && !enabled ? 'opacity-50' : ''}`}
          >
            {label}
          </CardTitle>
          {hasToggle && (
            <Switch
              checked={enabled}
              onChange={(e) => onEnabledChange(e.target.checked)}
              className="origin-left scale-75"
            />
          )}
        </div>
        <span
          className={`text-primary bg-primary/10 rounded-md px-2.5 py-1 text-sm font-bold shadow-sm transition-opacity ${hasToggle && !enabled ? 'opacity-50' : ''}`}
        >
          {formatValue(value)}
        </span>
      </div>
      <CardContent className="p-0">
        <div className="px-1">
          <Slider
            min={min}
            max={max}
            step={step}
            value={value}
            onValueChange={onChange}
            onValueCommit={onChangeComplete}
          />
          <div className="text-muted-foreground mt-3 flex items-center justify-between text-xs font-medium">
            <span>{narrowLabel}</span>
            <span>{wideLabel}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
