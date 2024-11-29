import React from 'react';
import { User, LogOut } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

type HeaderProps = {
  userRole?: 'provider' | 'accountant' | 'admin' | 'employee' | null;
  onLogout?: () => void;
};

export function Header({ userRole, onLogout }: HeaderProps) {
  const userName = userRole === 'admin' 
    ? 'Administrador' 
    : userRole === 'provider'
    ? 'Fornecedor'
    : userRole === 'accountant'
    ? 'Contador'
    : 'Maria Santos';

  return (
    <header className="bg-primary text-primary-foreground shadow-lg transition-colors duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Ponto Eletrônico</h1>
          </div>
          <div className="flex items-center space-x-6">
            <ThemeToggle />
            <div className="flex items-center space-x-2">
              <User className="h-6 w-6" />
              <span className="text-sm">{userName}</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-1 px-3 py-1 rounded-lg hover:bg-primary/90 transition-colors"
              title="Sair"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-sm">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}