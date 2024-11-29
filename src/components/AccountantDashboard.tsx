import React from 'react';
import { Users, Clock, Calendar, AlertTriangle, Building, DollarSign, UserX, UserCheck, FileText, TrendingUp } from 'lucide-react';
import { useRealTimeData } from '../hooks/useRealTimeData';
import { ReportBuilder } from './reports/ReportBuilder';

export function AccountantDashboard() {
  const { data: clients, loading: loadingClients } = useRealTimeData('clients');
  const { data: employees, loading: loadingEmployees } = useRealTimeData('employees');
  const { data: timeRecords, loading: loadingRecords } = useRealTimeData('timeRecords');

  const calculateMetrics = () => {
    if (!clients || !employees || !timeRecords) {
      return {
        totalClients: 0,
        totalEmployees: 0,
        totalOvertime: 0,
        totalAbsences: 0,
        pendingPayroll: {
          overtime: 0,
          deductions: 0,
          byClient: []
        }
      };
    }

    const metrics = {
      totalClients: clients.length,
      totalEmployees: employees.length,
      totalOvertime: timeRecords.reduce((acc: number, record: any) => {
        return acc + (record.overtime || 0);
      }, 0),
      totalAbsences: timeRecords.reduce((acc: number, record: any) => {
        return acc + (record.isAbsent ? 1 : 0);
      }, 0),
      pendingPayroll: {
        overtime: 0,
        deductions: 0,
        byClient: []
      }
    };

    // Calculate payroll data by client
    const payrollByClient = clients.map((client: any) => {
      const clientEmployees = employees.filter((emp: any) => emp.clientId === client.id);
      const clientRecords = timeRecords.filter((record: any) => 
        clientEmployees.some((emp: any) => emp.id === record.employeeId)
      );

      const overtime = clientRecords.reduce((acc: number, record: any) => acc + (record.overtime || 0), 0);
      const deductions = clientRecords.reduce((acc: number, record: any) => acc + (record.deductions || 0), 0);

      return {
        name: client.companyName,
        overtime,
        deductions
      };
    });

    metrics.pendingPayroll = {
      overtime: payrollByClient.reduce((acc, client) => acc + client.overtime, 0),
      deductions: payrollByClient.reduce((acc, client) => acc + client.deductions, 0),
      byClient: payrollByClient
    };

    return metrics;
  };

  if (loadingClients || loadingEmployees || loadingRecords) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const metrics = calculateMetrics();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Building className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total Clientes</p>
              <p className="text-2xl font-semibold text-card-foreground">{metrics.totalClients}</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total Funcionários</p>
              <p className="text-2xl font-semibold text-card-foreground">{metrics.totalEmployees}</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Horas Extras</p>
              <p className="text-2xl font-semibold text-card-foreground">{metrics.totalOvertime}h</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Faltas</p>
              <p className="text-2xl font-semibold text-card-foreground">{metrics.totalAbsences}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Clientes Recentes</h3>
          <div className="space-y-4">
            {clients?.slice(0, 5).map((client: any) => (
              <div key={client.id} className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Building className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-card-foreground">{client.companyName}</p>
                    <p className="text-xs text-muted-foreground">{client.email}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  client.status === 'active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400' 
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                }`}>
                  {client.status === 'active' ? 'Ativo' : 'Inativo'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Pendências de Folha</h3>
          <div className="space-y-4">
            {metrics.pendingPayroll.byClient.map((client: any, index: number) => (
              <div key={index} className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <p className="text-sm font-medium text-card-foreground">{client.name}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-muted-foreground flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {client.overtime}h extras
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {client.deductions} descontos
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Relatórios</h3>
        <ReportBuilder />
      </div>
    </div>
  );
}