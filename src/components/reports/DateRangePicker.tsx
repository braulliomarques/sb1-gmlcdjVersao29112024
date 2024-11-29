import React from 'react';
import { Calendar } from 'lucide-react';

type DateRangePickerProps = {
  value: { start: Date; end: Date };
  onChange: (range: { start: Date; end: Date }) => void;
};

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  return (
    <div className="flex space-x-4">
      <div className="relative flex-1">
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <input
          type="date"
          value={value.start.toISOString().split('T')[0]}
          onChange={(e) => onChange({ ...value, start: new Date(e.target.value) })}
          className="input pl-10"
        />
      </div>
      <div className="relative flex-1">
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <input
          type="date"
          value={value.end.toISOString().split('T')[0]}
          onChange={(e) => onChange({ ...value, end: new Date(e.target.value) })}
          className="input pl-10"
        />
      </div>
    </div>
  );
}