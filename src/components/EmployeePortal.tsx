import React, { useState } from 'react';
import { Header } from './Header';
import { TimeCard } from './TimeCard';
import { Calendar, Clock, FileText, FolderOpen, User, LogOut } from 'lucide-react';
import { DocumentManager } from './documents/DocumentManager';
import { EmployeeProfile } from './employee/EmployeeProfile';

type EmployeePortalProps = {
  userId: string | null;
};

export function EmployeePortal({ userId }: EmployeePortalProps) {
  const [currentView, setCurrentView] = useState<'timecard' | 'history' | 'requests' | 'documents' | 'profile'>('timecard');

  const handleLogout = () => {
    // Clear auth data from localStorage
    localStorage.removeItem('auth');
    // Force page reload to return to login
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
              <h1 className="text-xl font-bold text-card-foreground">Ponto Eletrônico</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('profile')}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'profile'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-card-foreground hover:bg-muted'
                }`}
              >
                <User className="h-5 w-5 mr-2" />
                Meu Perfil
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentView('timecard')}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                currentView === 'timecard'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-card-foreground hover:bg-muted'
              }`}
            >
              <Clock className="h-5 w-5 mr-2" />
              Registrar Ponto
            </button>
            <button
              onClick={() => setCurrentView('history')}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                currentView === 'history'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-card-foreground hover:bg-muted'
              }`}
            >
              <Calendar className="h-5 w-5 mr-2" />
              Histórico
            </button>
            <button
              onClick={() => setCurrentView('requests')}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                currentView === 'requests'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-card-foreground hover:bg-muted'
              }`}
            >
              <FileText className="h-5 w-5 mr-2" />
              Solicitações
            </button>
            <button
              onClick={() => setCurrentView('documents')}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                currentView === 'documents'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-card-foreground hover:bg-muted'
              }`}
            >
              <FolderOpen className="h-5 w-5 mr-2" />
              Documentos
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          {currentView === 'timecard' && <TimeCard />}
          {currentView === 'history' && (
            <div className="bg-card rounded-lg shadow-sm p-6 w-full max-w-4xl">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">Histórico de Pontos</h2>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="border-b pb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-card-foreground">Segunda-feira, 12 de Março</p>
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Entrada</p>
                            <p className="font-medium">08:00</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Saída Almoço</p>
                            <p className="font-medium">12:00</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Retorno Almoço</p>
                            <p className="font-medium">13:00</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Saída</p>
                            <p className="font-medium">17:00</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-3 py-1 text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400 rounded-full">
                          Regular
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {currentView === 'requests' && (
            <div className="bg-card rounded-lg shadow-sm p-6 w-full max-w-4xl">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">Solicitações</h2>
              <div className="space-y-4">
                <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                  Nova Solicitação
                </button>
                <div className="border-t pt-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="border-b pb-4 mb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-card-foreground">Ajuste de Ponto</p>
                          <p className="text-sm text-muted-foreground">10/03/2024</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Motivo: Esquecimento de registro
                          </p>
                        </div>
                        <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-400 rounded-full">
                          Pendente
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {currentView === 'documents' && userId && (
            <DocumentManager userRole="employee" userId={userId} />
          )}
          {currentView === 'profile' && userId && (
            <div className="bg-card rounded-lg shadow-sm p-6 w-full max-w-4xl">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">Meu Perfil</h2>
              <EmployeeProfile userId={userId} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}