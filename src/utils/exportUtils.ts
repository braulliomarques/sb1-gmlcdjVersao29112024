import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export async function exportToPDF(data: any) {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(16);
  doc.text('Relatório de Ponto Eletrônico', 14, 15);

  // Add summary
  doc.setFontSize(12);
  doc.text('Resumo', 14, 25);
  
  const summaryData = [
    ['Total de Colaboradores', data.summary.totalEmployees],
    ['Dias Trabalhados', data.summary.totalWorkDays],
    ['Média de Horas', `${data.summary.averageWorkHours.toFixed(1)}h`],
    ['Total Horas Extras', `${data.summary.totalOvertime.toFixed(1)}h`]
  ];

  (doc as any).autoTable({
    startY: 30,
    head: [['Métrica', 'Valor']],
    body: summaryData,
    theme: 'grid'
  });

  // Add details table
  doc.text('Detalhamento Diário', 14, (doc as any).lastAutoTable.finalY + 10);

  const detailsData = data.details.map((row: any) => [
    format(new Date(row.date), 'dd/MM/yyyy', { locale: ptBR }),
    `${row.workedHours.toFixed(1)}h`,
    `${row.overtime.toFixed(1)}h`,
    `${row.absences}h`,
    `${row.timeBank.toFixed(1)}h`
  ]);

  (doc as any).autoTable({
    startY: (doc as any).lastAutoTable.finalY + 15,
    head: [['Data', 'Horas Trabalhadas', 'Horas Extras', 'Faltas', 'Banco de Horas']],
    body: detailsData,
    theme: 'grid'
  });

  doc.save('relatorio-ponto.pdf');
}

export async function exportToExcel(data: any) {
  const wb = XLSX.utils.book_new();

  // Summary worksheet
  const summaryData = [
    ['Métrica', 'Valor'],
    ['Total de Colaboradores', data.summary.totalEmployees],
    ['Dias Trabalhados', data.summary.totalWorkDays],
    ['Média de Horas', data.summary.averageWorkHours],
    ['Total Horas Extras', data.summary.totalOvertime]
  ];

  const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, summaryWs, 'Resumo');

  // Details worksheet
  const detailsData = [
    ['Data', 'Horas Trabalhadas', 'Horas Extras', 'Faltas', 'Banco de Horas'],
    ...data.details.map((row: any) => [
      format(new Date(row.date), 'dd/MM/yyyy', { locale: ptBR }),
      row.workedHours,
      row.overtime,
      row.absences,
      row.timeBank
    ])
  ];

  const detailsWs = XLSX.utils.aoa_to_sheet(detailsData);
  XLSX.utils.book_append_sheet(wb, detailsWs, 'Detalhamento');

  XLSX.writeFile(wb, 'relatorio-ponto.xlsx');
}

export async function exportToCSV(data: any) {
  const rows = [
    ['Data', 'Horas Trabalhadas', 'Horas Extras', 'Faltas', 'Banco de Horas'],
    ...data.details.map((row: any) => [
      format(new Date(row.date), 'dd/MM/yyyy', { locale: ptBR }),
      row.workedHours,
      row.overtime,
      row.absences,
      row.timeBank
    ])
  ];

  const csvContent = rows
    .map(row => row.join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'relatorio-ponto.csv';
  link.click();
}