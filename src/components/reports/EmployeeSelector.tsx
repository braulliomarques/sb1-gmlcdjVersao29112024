import React from 'react';
import { useRealTimeData } from '../../hooks/useRealTimeData';

type EmployeeSelectorProps = {
  value: string[];
  onChange: (employees: string[]) => void;
};

export function EmployeeSelector({ value, onChange }: EmployeeSelectorProps) {
  const { data: employees, loading } = useRealTimeData('employees');

  if (loading) {
    return <div className="animate-pulse h-10 bg-muted rounded-md" />;
  }

  return (
    <select
      multiple
      value={value}
      onChange={(e) => {
        const selected = Array.from(e.target.selectedOptions, option => option.value);
        onChange(selected);
      }}
      className="input h-32"
    >
      {employees?.map((employee: any) => (
        <option key={employee.id} value={employee.id}>
          {employee.name}
        </option>
      ))}
    </select>
  );
}