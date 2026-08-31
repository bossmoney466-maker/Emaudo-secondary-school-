import React, { useState } from 'react';
import { 
  ShieldCheck, 
  GraduationCap, 
  Users, 
  BookOpen, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  HelpCircle, 
  X, 
  KeyRound, 
  UserCheck, 
  Phone, 
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { useAuth, UserRole, DEMO_ACCOUNTS } from '../../context/AuthContext';
import { isSupabaseConfigured } from '../../lib/supabase';
import { SchoolCrest } from '../common/SchoolCrest';

interface LoginPageProps {
  defaultRole?: UserRole;
  onSuccess?: () => void;
  title?: string;
  subtitle?: string;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  defaultRole = 'student',
  onSuccess,
  title,
  subtitle,
}) => {
  const { signIn, signUp, resetPassword, loginAsDemo, isLoading, authError, clearAuthError } = useAuth();

  const [selectedRole, setSelectedRole] = useState<UserRole>(defaultRole);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Forgot Password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const [resetError, setResetError] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);

  // Role metadata configurations
  const roleConfig: Record<'student' | 'parent' | 'teacher' | 'admin', {
    label: string;
    icon: React.ReactNode;
    color: string;
    badgeBg: string;
    heading: string;
    description: string;
    emailPlaceholder: string;
    allowSignup: boolean;
  }> = {
    student: {
      label: 'Student',
      icon: <GraduationCap className="w-4 h-4" />,
      color: 'text-emerald-700',
      badgeBg: 'bg-emerald-50 text-emerald-900 border-emerald-200',
      heading: 'Student Academic Portal',
      description: 'Access terminal examination results, continuous assessments, attendance percentages, and daily timetable.',
      emailPlaceholder: 'e.g. student.osasere@emaudo.edu.ng or admission number',
      allowSignup: true,
    },
    parent: {
      label: 'Parent / Guardian',
      icon: <Users className="w-4 h-4" />,
      color: 'text-blue-700',
      badgeBg: 'bg-blue-50 text-blue-900 border-blue-200',
      heading: 'Parent & Guardian Portal',
      description: 'Monitor your ward’s academic growth, check terminal report cards, track attendance, and view tuition fee invoices.',
      emailPlaceholder: 'e.g. parent.emmanuel@gmail.com',
      allowSignup: true,
    },
    teacher: {
      label: 'Teacher / Staff',
      icon: <BookOpen className="w-4 h-4" />,
      color: 'text-amber-700',
      badgeBg: 'bg-amber-50 text-amber-900 border-amber-200',
      heading: 'Faculty & Teacher Portal',
      description: 'Score entry for continuous assessments (CA 40%) & exams (60%), roll call attendance marking, and assignment uploads.',
      emailPlaceholder: 'e.g. teacher.akhigbe@emaudo.edu.ng',
      allowSignup: false,
    },
    admin: {
      label: 'Administrator',
      icon: <ShieldCheck className="w-4 h-4" />,
      color: 'text-purple-700',
      badgeBg: 'bg-purple-50 text-purple-900 border-purple-200',
      heading: 'School Administrative Console',
      description: 'Review prospective admissions, manage public inquiries, publish school bulletins, and inspect the PostgreSQL registry.',
      emailPlaceholder: 'e.g. principal.admin@emaudo.edu.ng',
      allowSignup: false,
    },
  };

  const currentRoleConfig = roleConfig[selectedRole];

  // Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAuthError();

    if (authMode === 'signin') {
      const res = await signIn(email, password, selectedRole);
      if (res.success && onSuccess) {
        onSuccess();
      }
    } else {
      if (selectedRole !== 'student' && selectedRole !== 'parent') {
        return;
      }
      const res = await signUp(email, password, {
        full_name: fullName || 'Emaudo Student/Parent',
        role: selectedRole,
        phone,
      });
      if (res.success && onSuccess) {
        onSuccess();
      }
    }
  };

  // Handle Password Reset Request
  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsResetting(true);
    setResetError(null);
    setResetMessage(null);

    const res = await resetPassword(resetEmail);
    setIsResetting(false);
    if (res.success) {
      setResetMessage(res.message || 'Password reset email sent.');
    } else {
      setResetError(res.error || 'Failed to send reset link.');
    }
  };

  // Auto-fill demo credentials for quick preview
  const handleSelectDemo = (role: UserRole) => {
    setSelectedRole(role);
    const demo = DEMO_ACCOUNTS[role];
    setEmail(demo.email);
    setPassword('demo-secure-pass');
    loginAsDemo(role);
    if (onSuccess) onSuccess();
  };

  return (
    <div className="max-w-xl mx-auto my-6 space-y-6">
      {/* Institutional Crest & Heading */}
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <SchoolCrest size="lg" variant="gold" imageOnly className="shadow-lg" />
        </div>
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Emaudo Secondary School • Est. 1980
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-2">
            {title || currentRoleConfig.heading}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-1">
            {subtitle || currentRoleConfig.description}
          </p>
        </div>
      </div>

      {/* Role Selection Tabs */}
      <div className="bg-slate-200/80 p-1.5 rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-1 border border-slate-300">
        {(Object.keys(roleConfig) as UserRole[]).map((r) => {
          const cfg = roleConfig[r];
          const isSelected = selectedRole === r;
          return (
            <button
              key={r}
              type="button"
              id={`btn-role-tab-${r}`}
              onClick={() => {
                setSelectedRole(r);
                clearAuthError();
                // If switching to admin/teacher while in signup mode, switch back to signin
                if (!cfg.allowSignup && authMode === 'signup') {
                  setAuthMode('signin');
                }
              }}
              className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                isSelected
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span className={isSelected ? cfg.color : 'text-slate-400'}>{cfg.icon}</span>
              <span className="whitespace-nowrap">{cfg.label}</span>
            </button>
          );
        })}
      </div>

      {/* Auth Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        {/* Toggle between Sign In & Registration (for Students & Parents only) */}
        {currentRoleConfig.allowSignup && (
          <div className="flex items-center justify-center p-1 bg-slate-100 rounded-xl max-w-xs mx-auto text-xs font-bold">
            <button
              type="button"
              onClick={() => { setAuthMode('signin'); clearAuthError(); }}
              className={`flex-1 py-1.5 rounded-lg transition-colors cursor-pointer ${
                authMode === 'signin' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('signup'); clearAuthError(); }}
              className={`flex-1 py-1.5 rounded-lg transition-colors cursor-pointer ${
                authMode === 'signup' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* Security Notification for Staff/Admin */}
        {!currentRoleConfig.allowSignup && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Security Protocol:</strong> {selectedRole === 'admin' ? 'Administrative' : 'Staff'} accounts are managed by the school ICT Registry. Public registration is prohibited.
            </span>
          </div>
        )}

        {/* Auth Error Banner */}
        {authError && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold">Authentication Notice:</span> {authError}
            </div>
            <button onClick={clearAuthError} className="text-rose-400 hover:text-rose-700">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Main Authentication Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'signup' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  id="input-auth-fullname"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Osasere Emmanuel"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Phone Number (Optional)
                </label>
                <input
                  id="input-auth-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +234 803 123 4567"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              {selectedRole === 'student' ? 'Student Email / ID' : 'Registered Email Address'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="input-auth-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={currentRoleConfig.emailPlaceholder}
                className="w-full text-xs sm:text-sm pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              {authMode === 'signin' && (
                <button
                  type="button"
                  onClick={() => {
                    setResetEmail(email);
                    setShowForgotModal(true);
                  }}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="input-auth-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full text-xs sm:text-sm pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            id="btn-auth-submit"
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                <span>Authenticating with Supabase...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 text-amber-400" />
                <span>{authMode === 'signin' ? `Sign In as ${currentRoleConfig.label}` : 'Complete Registration'}</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Testing & Demonstration Accounts Selector */}
        <div className="pt-4 border-t border-slate-100 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Instant Testing Demo Logins</span>
            </span>
            <span className="text-[10px] text-slate-400">One-click testing</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {(Object.keys(DEMO_ACCOUNTS) as UserRole[]).map((r) => {
              const demo = DEMO_ACCOUNTS[r];
              return (
                <button
                  key={r}
                  type="button"
                  id={`btn-quick-demo-${r}`}
                  onClick={() => handleSelectDemo(r)}
                  className="p-2.5 text-left rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">
                      {demo.name}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                      {r}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {demo.badge}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-slate-900 text-base">Reset Account Password</h3>
                  <p className="text-[11px] text-slate-500">Supabase Secure Recovery Protocol</p>
                </div>
              </div>
              <button
                onClick={() => setShowForgotModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {resetMessage ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Password Reset Dispatched</span>
                </div>
                <p className="text-xs leading-relaxed">{resetMessage}</p>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="mt-2 w-full py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleResetSubmit} className="space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Enter your registered institutional email address. Supabase Auth will transmit a secure password recovery link to your inbox.
                </p>

                {resetError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                    {resetError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Registered Email
                  </label>
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="e.g. student.osasere@emaudo.edu.ng"
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isResetting}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer flex items-center gap-1.5"
                  >
                    {isResetting && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                    <span>{isResetting ? 'Sending...' : 'Send Recovery Link'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
