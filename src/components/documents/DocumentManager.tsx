import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { DocumentUpload } from './DocumentUpload';
import { DocumentList } from './DocumentList';
import { DocumentApproval } from './DocumentApproval';

type DocumentManagerProps = {
  userRole: 'employee' | 'accountant' | 'admin';
  userId: string;
};

export function DocumentManager({ userRole, userId }: DocumentManagerProps) {
  const [activeTab, setActiveTab] = useState('upload');

  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-card-foreground mb-6">
          Gerenciamento de Documentos
        </h2>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            {userRole === 'employee' && (
              <TabsTrigger value="upload">Upload</TabsTrigger>
            )}
            <TabsTrigger value="list">Meus Documentos</TabsTrigger>
            {(userRole === 'accountant' || userRole === 'admin') && (
              <TabsTrigger value="approval">Aprovações</TabsTrigger>
            )}
          </TabsList>

          {userRole === 'employee' && (
            <TabsContent value="upload">
              <DocumentUpload employeeId={userId} />
            </TabsContent>
          )}

          <TabsContent value="list">
            <DocumentList userId={userId} userRole={userRole} />
          </TabsContent>

          {(userRole === 'accountant' || userRole === 'admin') && (
            <TabsContent value="approval">
              <DocumentApproval userRole={userRole} userId={userId} />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}