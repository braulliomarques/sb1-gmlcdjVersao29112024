import React from 'react';
import { AccountantDashboard } from './AccountantDashboard';

type DashboardProps = {
  userRole: 'provider' | 'accountant' | 'admin' | 'employee' | null;
};

export function Dashboard({ userRole }: DashboardProps) {
  if (userRole === 'accountant') {
    return <AccountantDashboard />;
  }

  // Other dashboard views remain the same...
  return null;
}