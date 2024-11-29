import React, { useState } from 'react';
import { Header } from './components/Header';
import { Login } from './components/Login';
import { LandingPage } from './components/LandingPage';
import { AccountRegistration } from './components/AccountRegistration';
import { Dashboard } from './components/Dashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { EmployeeList } from './components/EmployeeList';
import { EmployeeForm } from './components/EmployeeForm';
import { EmployeePortal } from './components/EmployeePortal';
import { Plans } from './components/Plans';
import { Billing } from './components/Billing';
import { AccountantList } from './components/AccountantList';
import { AccountantForm } from './components/AccountantForm';
import { ClientList } from './components/ClientList';
import { ClientForm } from './components/ClientForm';
import { AccountantRequests } from './components/AccountantRequests';
import { ClientNotifications } from './components/ClientNotifications';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'provider' | 'accountant' | 'admin' | 'employee' | null>(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [userId, setUserId] = useState<string | null>(null);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setCurrentView('dashboard');
    setUserId(null);
    setShowLogin(false);
    setShowRegistration(false);
  };

  if (!isAuthenticated) {
    if (showRegistration) {
      return <AccountRegistration onBack={() => setShowRegistration(false)} />;
    }

    if (showLogin) {
      return (
        <div className="min-h-screen bg-background">
          <Login
            onLogin={(role, id) => {
              setIsAuthenticated(true);
              setUserRole(role);
              setUserId(id);
            }}
          />
          <Plans />
        </div>
      );
    }

    return (
      <LandingPage
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegistration(true)}
      />
    );
  }

  if (userRole === 'employee' && userId) {
    return <EmployeePortal userId={userId} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={userRole} onLogout={handleLogout} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentView === 'dashboard'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-card-foreground hover:bg-muted'
              }`}
            >
              Dashboard
            </button>
            
            {userRole === 'provider' && (
              <>
                <button
                  onClick={() => setCurrentView('accountants')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentView === 'accountants'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-card-foreground hover:bg-muted'
                  }`}
                >
                  Contadores
                </button>
                <button
                  onClick={() => setCurrentView('new-accountant')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentView === 'new-accountant'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-card-foreground hover:bg-muted'
                  }`}
                >
                  Novo Contador
                </button>
              </>
            )}

            {userRole === 'accountant' && (
              <>
                <button
                  onClick={() => setCurrentView('clients')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentView === 'clients'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-card-foreground hover:bg-muted'
                  }`}
                >
                  Clientes
                </button>
                <button
                  onClick={() => setCurrentView('new-client')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentView === 'new-client'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-card-foreground hover:bg-muted'
                  }`}
                >
                  Novo Cliente
                </button>
                <button
                  onClick={() => setCurrentView('requests')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentView === 'requests'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-card-foreground hover:bg-muted'
                  }`}
                >
                  Solicitações
                </button>
              </>
            )}

            {userRole === 'admin' && (
              <>
                <button
                  onClick={() => setCurrentView('employees')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentView === 'employees'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-card-foreground hover:bg-muted'
                  }`}
                >
                  Colaboradores
                </button>
                <button
                  onClick={() => setCurrentView('new-employee')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentView === 'new-employee'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-card-foreground hover:bg-muted'
                  }`}
                >
                  Novo Colaborador
                </button>
                <button
                  onClick={() => setCurrentView('notifications')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentView === 'notifications'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-card-foreground hover:bg-muted'
                  }`}
                >
                  Notificações
                </button>
                <button
                  onClick={() => setCurrentView('profile')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentView === 'profile'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-card-foreground hover:bg-muted'
                  }`}
                >
                  Meu Perfil
                </button>
              </>
            )}

            <button
              onClick={() => setCurrentView('billing')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentView === 'billing'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-card-foreground hover:bg-muted'
              }`}
            >
              Faturamento
            </button>
          </div>
        </div>

        {currentView === 'dashboard' && userRole === 'admin' && (
          <AdminDashboard userId={userId} showProfile={currentView === 'profile'} />
        )}
        {currentView === 'dashboard' && userRole !== 'admin' && (
          <Dashboard userRole={userRole} />
        )}
        {currentView === 'profile' && userRole === 'admin' && (
          <AdminDashboard userId={userId} showProfile={true} />
        )}
        {currentView === 'accountants' && <AccountantList />}
        {currentView === 'new-accountant' && <AccountantForm />}
        {currentView === 'clients' && <ClientList />}
        {currentView === 'new-client' && <ClientForm />}
        {currentView === 'employees' && <EmployeeList />}
        {currentView === 'new-employee' && <EmployeeForm />}
        {currentView === 'billing' && <Billing />}
        {currentView === 'requests' && <AccountantRequests />}
        {currentView === 'notifications' && <ClientNotifications />}
      </main>
    </div>
  );
}