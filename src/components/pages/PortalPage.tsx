import React, { useState } from 'react';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  ShieldCheck, 
  LogOut, 
  Sparkles, 
  FileText, 
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { useAuth, UserRole } from '../../context/AuthContext';
import { LoginPage } from '../auth/LoginPage';
import { StudentPortalPage } from './StudentPortalPage';
import { ParentPortalPage } from './ParentPortalPage';
import { TeacherPortalPage } from './TeacherPortalPage';
import { AdminDashboardPage } from './AdminDashboardPage';

export const PortalPage: React.FC = () => {
  const { isAuthenticated, role, profile, signOut, isDemo, loginAsDemo } = useAuth();
  const [viewOverride, setViewOverride] = useState<UserRole | null>(null);

  // If user is not authenticated, show institutional login page
  if (!isAuthenticated) {
    return (
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        <LoginPage defaultRole="student" />
      </div>
    );
  }

  // Active view matches role or any testing switch
  const activeRoleView = viewOverride || role || 'student';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Universal Institutional Portal Bar */}
      <section className="bg-slate-900 border-b border-slate-800 text-white py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>
              Signed in as: <strong className="text-amber-400 font-semibold">{profile?.full_name}</strong> ({profile?.email})
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-extrabold uppercase text-[10px]">
              {profile?.role}
            </span>
            {isDemo && (
              <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold">
                Demo
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Testing Switcher */}
            <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
              <span className="text-[10px] uppercase font-bold text-slate-400 px-1.5">Switch View:</span>
              <button
                onClick={() => { loginAsDemo('student'); setViewOverride('student'); }}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                  activeRoleView === 'student' ? 'bg-emerald-700 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => { loginAsDemo('parent'); setViewOverride('parent'); }}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                  activeRoleView === 'parent' ? 'bg-blue-700 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Parent
              </button>
              <button
                onClick={() => { loginAsDemo('teacher'); setViewOverride('teacher'); }}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                  activeRoleView === 'teacher' ? 'bg-amber-700 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Teacher
              </button>
              <button
                onClick={() => { loginAsDemo('admin'); setViewOverride('admin'); }}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                  activeRoleView === 'admin' ? 'bg-purple-700 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Admin
              </button>
            </div>

            <button
              onClick={() => signOut()}
              className="px-3 py-1.5 rounded-xl bg-rose-900/50 hover:bg-rose-900/80 text-rose-200 border border-rose-500/30 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </section>

      {/* Role-Specific Portal View */}
      <div>
        {activeRoleView === 'student' && <StudentPortalPage />}
        {activeRoleView === 'parent' && <ParentPortalPage />}
        {activeRoleView === 'teacher' && <TeacherPortalPage />}
        {activeRoleView === 'admin' && <AdminDashboardPage />}
      </div>
    </div>
  );
};
