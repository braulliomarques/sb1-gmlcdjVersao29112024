import React, { useState } from 'react';
import { Filter, Calendar, Users, FileText, Download } from 'lucide-react';
import { DateRangePicker } from './DateRangePicker';
import { EmployeeSelector } from './EmployeeSelector';
import { DepartmentSelector } from './DepartmentSelector';
import { MetricsSelector } from './MetricsSelector';
import { ReportPreview } from './ReportPreview';
import { useReportStore } from '../../stores/reportStore';
import { exportToExcel, exportToPDF, exportToCSV } from '../../utils/exportUtils';

export function ReportBuilder() {
  const [showPreview, setShowPreview] = useState(false);
  const {
    dateRange,
    selectedEmployees,
    selectedDepartments,
    selectedMetrics,
    reportData,
    setDateRange,
    setSelectedEmployees,
    setSelectedDepartments,
    setSelectedMetrics,
    generateReport
  } = useReportStore();

  const handleGenerateReport = async () => {
    await generateReport();
    setShowPreview(true);
  };

  const handleExport = async (format: 'pdf' | 'excel' | 'csv') => {
    if (!reportData) return;

    switch (format) {
      case 'pdf':
        await exportToPDF(reportData);
        break;
      case 'excel':
        await exportToExcel(reportData);
        break;
      case 'csv':
        await exportToCSV(reportData);
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-card-foreground mb-6">
          Gerador de Relatórios
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Período
              </label>
              <DateRangePicker
                value={dateRange}
                onChange={setDateRange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Colaboradores
              </label>
              <EmployeeSelector
                value={selectedEmployees}
                onChange={setSelectedEmployees}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Departamentos
              </label>
              <DepartmentSelector
                value={selectedDepartments}
                onChange={setSelectedDepartments}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Métricas
            </label>
            <MetricsSelector
              value={selectedMetrics}
              onChange={setSelectedMetrics}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={handleGenerateReport}
            className="btn btn-primary flex items-center"
          >
            <Filter className="h-4 w-4 mr-2" />
            Gerar Relatório
          </button>
        </div>
      </div>

      {showPreview && reportData && (
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-card-foreground">
              Prévia do Relatório
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => handleExport('pdf')}
                className="btn bg-red-600 text-white hover:bg-red-700 flex items-center"
              >
                <FileText className="h-4 w-4 mr-2" />
                PDF
              </button>
              <button
                onClick={() => handleExport('excel')}
                className="btn bg-green-600 text-white hover:bg-green-700 flex items-center"
              >
                <FileText className="h-4 w-4 mr-2" />
                Excel
              </button>
              <button
                onClick={() => handleExport('csv')}
                className="btn bg-blue-600 text-white hover:bg-blue-700 flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                CSV
              </button>
            </div>
          </div>

          <ReportPreview data={reportData} />
        </div>
      )}
    </div>
  );
}