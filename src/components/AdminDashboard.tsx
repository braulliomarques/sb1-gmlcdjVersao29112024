import React from 'react';
import { Users, Clock, Calendar, AlertTriangle, Building, DollarSign, UserX, UserCheck, FileText } from 'lucide-react';
import { useRealTimeData } from '../hooks/useRealTimeData';
import { ReportBuilder } from './reports/ReportBuilder';
import { AdminProfile } from './admin/AdminProfile';

type AdminDashboardProps = {
  userId: string | null;
  showProfile?: boolean;
};

export function AdminDashboard({ userId, showProfile }: AdminDashboardProps) {
  const { data: employees, loading: loadingEmployees } = useRealTimeData('employees');
  const { data: timeRecords, loading: loadingRecords } = useRealTimeData('timeRecords');

  if (showProfile && userId) {
    return <AdminProfile userId={userId} />;
  }

  if (loadingEmployees || loadingRecords) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const metrics = {
    totalEmployees: employees?.length || 0,
    totalPresent: timeRecords?.filter((record: any) => 
      new Date(record.timestamp).toDateString() === new Date().toDateString()
    ).length || 0,
    totalAbsent: (employees?.length || 0) - (timeRecords?.filter((record: any) => 
      new Date(record.timestamp).toDateString() === new Date().toDateString()
    ).length || 0),
    totalLate: timeRecords?.filter((record: any) => record.isLate).length || 0
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total Colaboradores</p>
              <p className="text-2xl font-semibold text-card-foreground">{metrics.totalEmployees}</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Presentes Hoje</p>
              <p className="text-2xl font-semibold text-card-foreground">{metrics.totalPresent}</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
              <UserX className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Ausentes</p>
              <p className="text-2xl font-semibold text-card-foreground">{metrics.totalAbsent}</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Atrasos</p>
              <p className="text-2xl font-semibold text-card-foreground">{metrics.totalLate}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            Registros Recentes
          </h3>
          <div className="space-y-4">
            {timeRecords?.slice(0, 5).map((record: any) => {
              const employee = employees?.find((emp: any) => emp.id === record.employeeId);
              return (
                <div key={record.id} className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-card-foreground">
                        {employee?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(record.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    record.isLate
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-400'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400'
                  }`}>
                    {record.isLate ? 'Atrasado' : 'No horário'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            Relatórios
          </h3>
          <ReportBuilder />
        </div>
      </div>
    </div>
  );
}