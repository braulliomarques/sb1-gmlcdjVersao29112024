import { create } from 'zustand';
import { ref, get, query, orderByChild } from 'firebase/database';
import { db } from '../lib/firebase';
import { startOfDay, endOfDay, eachDayOfInterval } from 'date-fns';

type ReportState = {
  dateRange: { start: Date; end: Date };
  selectedEmployees: string[];
  selectedDepartments: string[];
  selectedMetrics: string[];
  reportData: any | null;
  setDateRange: (range: { start: Date; end: Date }) => void;
  setSelectedEmployees: (employees: string[]) => void;
  setSelectedDepartments: (departments: string[]) => void;
  setSelectedMetrics: (metrics: string[]) => void;
  generateReport: () => Promise<void>;
};

export const useReportStore = create<ReportState>((set, get) => ({
  dateRange: {
    start: new Date(),
    end: new Date()
  },
  selectedEmployees: [],
  selectedDepartments: [],
  selectedMetrics: [],
  reportData: null,

  setDateRange: (range) => set({ dateRange: range }),
  setSelectedEmployees: (employees) => set({ selectedEmployees: employees }),
  setSelectedDepartments: (departments) => set({ selectedDepartments: departments }),
  setSelectedMetrics: (metrics) => set({ selectedMetrics: metrics }),

  generateReport: async () => {
    const { dateRange, selectedEmployees, selectedDepartments } = get();

    // Get time records for the selected period
    const timeRecordsRef = ref(db, 'timeRecords');
    const timeRecordsSnapshot = await get(timeRecordsRef);
    const timeRecords = timeRecordsSnapshot.val() || {};

    // Get employees data
    const employeesRef = ref(db, 'employees');
    const employeesSnapshot = await get(employeesRef);
    const employees = employeesSnapshot.val() || {};

    // Filter records by date range and selected employees/departments
    const filteredRecords = Object.values(timeRecords).filter((record: any) => {
      const recordDate = new Date(record.timestamp);
      const isInDateRange = recordDate >= startOfDay(dateRange.start) && 
                           recordDate <= endOfDay(dateRange.end);
      
      const employee = employees[record.employeeId];
      const isSelectedEmployee = selectedEmployees.length === 0 || 
                               selectedEmployees.includes(record.employeeId);
      const isSelectedDepartment = selectedDepartments.length === 0 || 
                                 (employee && selectedDepartments.includes(employee.department));

      return isInDateRange && isSelectedEmployee && isSelectedDepartment;
    });

    // Calculate daily metrics
    const days = eachDayOfInterval({ start: dateRange.start, end: dateRange.end });
    const details = days.map(date => {
      const dayRecords = filteredRecords.filter((record: any) => 
        startOfDay(new Date(record.timestamp)).getTime() === startOfDay(date).getTime()
      );

      return {
        date: date.toISOString(),
        workedHours: calculateWorkedHours(dayRecords),
        overtime: calculateOvertime(dayRecords),
        absences: calculateAbsences(dayRecords),
        timeBank: calculateTimeBank(dayRecords)
      };
    });

    // Calculate summary
    const summary = {
      totalEmployees: new Set(filteredRecords.map((r: any) => r.employeeId)).size,
      totalWorkDays: days.length,
      averageWorkHours: details.reduce((acc, day) => acc + day.workedHours, 0) / days.length,
      totalOvertime: details.reduce((acc, day) => acc + day.overtime, 0)
    };

    set({ reportData: { summary, details } });
  }
}));

// Utility functions for calculations
function calculateWorkedHours(records: any[]): number {
  // Implementation
  return 8;
}

function calculateOvertime(records: any[]): number {
  // Implementation
  return 2;
}

function calculateAbsences(records: any[]): number {
  // Implementation
  return 0;
}

function calculateTimeBank(records: any[]): number {
  // Implementation
  return 1;
}