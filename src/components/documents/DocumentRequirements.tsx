import React from 'react';
import { CheckCircle } from 'lucide-react';

const requiredDocuments = [
  {
    id: 'rg',
    name: 'RG',
    description: 'Documento de identidade (frente e verso)',
    format: 'PDF ou imagem',
  },
  {
    id: 'cpf',
    name: 'CPF',
    description: 'Cadastro de Pessoa Física',
    format: 'PDF ou imagem',
  },
  {
    id: 'address',
    name: 'Comprovante de Residência',
    description: 'Documento recente (últimos 3 meses)',
    format: 'PDF ou imagem',
  },
  {
    id: 'photo',
    name: 'Foto 3x4',
    description: 'Foto recente com fundo branco',
    format: 'JPG ou PNG',
  },
  {
    id: 'qualification',
    name: 'Comprovante de Escolaridade',
    description: 'Diploma ou certificado',
    format: 'PDF',
  },
];

export function DocumentRequirements() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-card-foreground">
        Documentos Necessários
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {requiredDocuments.map(doc => (
          <div
            key={doc.id}
            className="flex items-start space-x-3 p-4 bg-muted/20 rounded-lg"
          >
            <CheckCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <h4 className="font-medium text-card-foreground">{doc.name}</h4>
              <p className="text-sm text-muted-foreground">{doc.description}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Formato: {doc.format}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}