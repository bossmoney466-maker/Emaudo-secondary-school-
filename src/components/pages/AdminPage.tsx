import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LoginPage } from '../auth/LoginPage';
import { AdminDashboardPage } from './AdminDashboardPage';
import { ShieldCheck, Lock } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { isAuthenticated, role, isDemo } = useAuth();

  // If user is not authenticated as administrator, show the admin login gate
  if (!isAuthenticated || role !== 'admin') {
    return (
      <div className="py-12 px-4 max-w-7xl mx-auto space-y-6">
        <LoginPage 
          defaultRole="admin" 
          title="School Administration Portal"
          subtitle="Restricted to authorized executive management, ICT registry, and verified administrators."
        />
      </div>
    );
  }

  // Authenticated Admin view
  return <AdminDashboardPage />;
};
