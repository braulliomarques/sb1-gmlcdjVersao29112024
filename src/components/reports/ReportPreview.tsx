import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type ReportData = {
  summary: {
    totalEmployees: number;
    totalWorkDays: number;
    averageWorkHours: number;
    totalOvertime: number;
  };
  details: Array<{
    date: string;
    workedHours: number;
    overtime: number;
    absences: number;
    timeBank: number;
  }>;
};

type ReportPreviewProps = {
  data: ReportData;
};

export function ReportPreview({ data }: ReportPreviewProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-muted/20 p-4 rounded-lg">
          <div className="text-sm text-muted-foreground">Total Colaboradores</div>
          <div className="text-2xl font-bold">{data.summary.totalEmployees}</div>
        </div>
        <div className="bg-muted/20 p-4 rounded-lg">
          <div className="text-sm text-muted-foreground">Dias Trabalhados</div>
          <div className="text-2xl font-bold">{data.summary.totalWorkDays}</div>
        </div>
        <div className="bg-muted/20 p-4 rounded-lg">
          <div className="text-sm text-muted-foreground">Média de Horas</div>
          <div className="text-2xl font-bold">
            {data.summary.averageWorkHours.toFixed(1)}h
          </div>
        </div>
        <div className="bg-muted/20 p-4 rounded-lg">
          <div className="text-sm text-muted-foreground">Total Horas Extras</div>
          <div className="text-2xl font-bold">
            {data.summary.totalOvertime.toFixed(1)}h
          </div>
        </div>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.details}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => format(new Date(value), 'dd/MM', { locale: ptBR })}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(value) => format(new Date(value), 'dd/MM/yyyy', { locale: ptBR })}
            />
            <Legend />
            <Bar dataKey="workedHours" name="Horas Trabalhadas" fill="#3b82f6" />
            <Bar dataKey="overtime" name="Horas Extras" fill="#22c55e" />
            <Bar dataKey="absences" name="Faltas" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">Data</th>
              <th className="text-right py-3 px-4">Horas Trabalhadas</th>
              <th className="text-right py-3 px-4">Horas Extras</th>
              <th className="text-right py-3 px-4">Faltas</th>
              <th className="text-right py-3 px-4">Banco de Horas</th>
            </tr>
          </thead>
          <tbody>
            {data.details.map((row) => (
              <tr key={row.date} className="border-b">
                <td className="py-3 px-4">
                  {format(new Date(row.date), 'dd/MM/yyyy', { locale: ptBR })}
                </td>
                <td className="text-right py-3 px-4">{row.workedHours.toFixed(1)}h</td>
                <td className="text-right py-3 px-4">{row.overtime.toFixed(1)}h</td>
                <td className="text-right py-3 px-4">{row.absences}h</td>
                <td className="text-right py-3 px-4">{row.timeBank.toFixed(1)}h</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}