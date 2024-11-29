import React, { useState } from 'react';
import { Upload, File, CheckCircle, AlertCircle, X } from 'lucide-react';
import { uploadDocument } from '../../services/documentService';
import { DocumentRequirements } from './DocumentRequirements';

type DocumentUploadProps = {
  employeeId: string;
  onComplete?: () => void;
};

export function DocumentUpload({ employeeId, onComplete }: DocumentUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleUpload = async () => {
    setUploading(true);
    setError(null);

    try {
      for (const file of files) {
        await uploadDocument(employeeId, file, (progress) => {
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: progress
          }));
        });
      }
      onComplete?.();
      setFiles([]);
      setUploadProgress({});
    } catch (err) {
      setError('Erro ao enviar documentos. Tente novamente.');
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (fileName: string) => {
    setFiles(prev => prev.filter(file => file.name !== fileName));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileName];
      return newProgress;
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-card-foreground mb-4">
          Upload de Documentos
        </h2>

        <DocumentRequirements />

        <div className="mt-6">
          <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="h-12 w-12 text-muted-foreground mb-4" />
              <span className="text-muted-foreground">
                Arraste arquivos ou clique para selecionar
              </span>
              <span className="text-sm text-muted-foreground mt-1">
                PDF, JPG ou PNG até 10MB
              </span>
            </label>
          </div>
        </div>

        {files.length > 0 && (
          <div className="mt-6 space-y-4">
            {files.map(file => (
              <div
                key={file.name}
                className="flex items-center justify-between p-4 bg-muted/20 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <File className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-card-foreground">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {uploadProgress[file.name] !== undefined && (
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress[file.name]}%` }}
                      />
                    </div>
                  )}
                  <button
                    onClick={() => removeFile(file.name)}
                    className="p-1 hover:bg-muted rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-end mt-4">
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="btn btn-primary"
              >
                {uploading ? 'Enviando...' : 'Enviar Documentos'}
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}
      </div>
    </div>
  );
}