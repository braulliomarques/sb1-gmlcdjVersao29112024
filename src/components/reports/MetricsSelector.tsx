import React from 'react';
import { Check } from 'lucide-react';

type Metric = {
  id: string;
  label: string;
  description: string;
};

const availableMetrics: Metric[] = [
  {
    id: 'workedHours',
    label: 'Horas Trabalhadas',
    description: 'Total de horas trabalhadas no período'
  },
  {
    id: 'overtime',
    label: 'Horas Extras',
    description: 'Horas extras realizadas (50% e 100%)'
  },
  {
    id: 'absences',
    label: 'Faltas e Atrasos',
    description: 'Registro de ausências e atrasos'
  },
  {
    id: 'timeBank',
    label: 'Banco de Horas',
    description: 'Saldo do banco de horas'
  },
  {
    id: 'location',
    label: 'Localização',
    description: 'Local de registro do ponto'
  }
];

type MetricsSelectorProps = {
  value: string[];
  onChange: (metrics: string[]) => void;
};

export function MetricsSelector({ value, onChange }: MetricsSelectorProps) {
  const toggleMetric = (metricId: string) => {
    if (value.includes(metricId)) {
      onChange(value.filter(id => id !== metricId));
    } else {
      onChange([...value, metricId]);
    }
  };

  return (
    <div className="space-y-2">
      {availableMetrics.map((metric) => (
        <div
          key={metric.id}
          className="flex items-start space-x-3 p-3 rounded-md hover:bg-muted/50 cursor-pointer"
          onClick={() => toggleMetric(metric.id)}
        >
          <div className={`w-5 h-5 rounded border flex items-center justify-center ${
            value.includes(metric.id)
              ? 'bg-primary border-primary'
              : 'border-input'
          }`}>
            {value.includes(metric.id) && (
              <Check className="h-3 w-3 text-primary-foreground" />
            )}
          </div>
          <div>
            <div className="font-medium text-sm">{metric.label}</div>
            <div className="text-xs text-muted-foreground">
              {metric.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}