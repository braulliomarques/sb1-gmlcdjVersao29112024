import React from 'react';
import { useRealTimeData } from '../../hooks/useRealTimeData';

type DepartmentSelectorProps = {
  value: string[];
  onChange: (departments: string[]) => void;
};

export function DepartmentSelector({ value, onChange }: DepartmentSelectorProps) {
  const { data: employees } = useRealTimeData('employees');
  
  const departments = React.useMemo(() => {
    if (!employees) return [];
    return Array.from(new Set(employees.map((emp: any) => emp.department)))
      .filter(Boolean)
      .sort();
  }, [employees]);

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
      {departments.map((department) => (
        <option key={department} value={department}>
          {department}
        </option>
      ))}
    </select>
  );
}