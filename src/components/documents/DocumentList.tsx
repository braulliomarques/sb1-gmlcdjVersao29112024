import React from 'react';
import { File, Download, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useRealTimeData } from '../../hooks/useRealTimeData';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type DocumentListProps = {
  userId: string;
  userRole: 'employee' | 'accountant' | 'admin';
};

export function DocumentList({ userId, userRole }: DocumentListProps) {
  const { data: documents, loading } = useRealTimeData(
    'documents',
    userRole === 'employee' 
      ? (doc) => doc.employeeId === userId
      : undefined
  );

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-20 bg-muted rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {documents?.map((doc: any) => (
        <div
          key={doc.id}
          className="flex items-center justify-between p-4 bg-muted/20 rounded-lg"
        >
          <div className="flex items-center space-x-4">
            <File className="h-6 w-6 text-muted-foreground" />
            <div>
              <p className="font-medium text-card-foreground">{doc.fileName}</p>
              <p className="text-sm text-muted-foreground">
                Enviado em {format(new Date(doc.uploadedAt), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className={`flex items-center px-3 py-1 rounded-full text-sm ${
              doc.status === 'approved'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400'
                : doc.status === 'rejected'
                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-400'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-400'
            }`}>
              {doc.status === 'approved' && <CheckCircle className="h-4 w-4 mr-1" />}
              {doc.status === 'rejected' && <XCircle className="h-4 w-4 mr-1" />}
              {doc.status === 'pending' && <Clock className="h-4 w-4 mr-1" />}
              {doc.status === 'approved' ? 'Aprovado' : 
               doc.status === 'rejected' ? 'Rejeitado' : 'Pendente'}
            </span>

            <a
              href={doc.downloadURL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-muted rounded-full transition-colors"
              title="Download"
            >
              <Download className="h-5 w-5" />
            </a>
          </div>
        </div>
      ))}

      {(!documents || documents.length === 0) && (
        <div className="text-center py-8 text-muted-foreground">
          Nenhum documento encontrado.
        </div>
      )}
    </div>
  );
}