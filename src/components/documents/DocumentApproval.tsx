import React from 'react';
import { File, CheckCircle, XCircle, User, Building } from 'lucide-react';
import { useRealTimeData } from '../../hooks/useRealTimeData';
import { approveDocument, rejectDocument } from '../../services/documentService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type DocumentApprovalProps = {
  userRole: 'accountant' | 'admin';
  userId: string;
};

export function DocumentApproval({ userRole, userId }: DocumentApprovalProps) {
  const { data: documents, loading } = useRealTimeData(
    'documents',
    (doc) => doc.status === 'pending'
  );

  const { data: employees } = useRealTimeData('employees');
  const { data: clients } = useRealTimeData('clients');

  const handleApprove = async (documentId: string) => {
    try {
      await approveDocument(documentId);
    } catch (error) {
      console.error('Error approving document:', error);
    }
  };

  const handleReject = async (documentId: string) => {
    try {
      await rejectDocument(documentId);
    } catch (error) {
      console.error('Error rejecting document:', error);
    }
  };

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
      {documents?.map((doc: any) => {
        const employee = employees?.find((emp: any) => emp.id === doc.employeeId);
        const client = clients?.find((c: any) => c.id === employee?.clientId);

        return (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 bg-muted/20 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <File className="h-6 w-6 text-muted-foreground" />
              <div>
                <p className="font-medium text-card-foreground">{doc.fileName}</p>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-sm text-muted-foreground flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {employee?.name}
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Building className="h-4 w-4 mr-1" />
                    {client?.companyName}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Enviado em {format(new Date(doc.uploadedAt), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleApprove(doc.id)}
                className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                title="Aprovar"
              >
                <CheckCircle className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleReject(doc.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                title="Rejeitar"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
        );
      })}

      {(!documents || documents.length === 0) && (
        <div className="text-center py-8 text-muted-foreground">
          Nenhum documento pendente de aprovação.
        </div>
      )}
    </div>
  );
}