import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export type UserRole = 'student' | 'parent' | 'teacher' | 'admin' | 'superadmin' | 'alumni';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  phone?: string;
  avatar_url?: string;
  student_id?: string;
  class_name?: string;
  ward_name?: string;
  department?: string;
  created_at?: string;
}

export interface DemoAccount {
  email: string;
  name: string;
  role: UserRole;
  badge: string;
  description: string;
  profile: UserProfile;
}

export const DEMO_ACCOUNTS: Record<'student' | 'parent' | 'teacher' | 'admin', DemoAccount> = {
  student: {
    email: 'student.osasere@emaudo.edu.ng',
    name: 'Osasere Emmanuel',
    role: 'student',
    badge: 'Senior Secondary 2 (Science)',
    description: 'Enrolled SS 2 student with active terminal examination records and Chevron science lab practicals.',
    profile: {
      id: 'demo-student-uuid-001',
      email: 'student.osasere@emaudo.edu.ng',
      full_name: 'Osasere Emmanuel',
      role: 'student',
      phone: '+234 803 219 4482',
      student_id: 'ESS/2024/0142',
      class_name: 'SS 2 Science A',
      created_at: new Date().toISOString(),
    },
  },
  parent: {
    email: 'parent.emmanuel@gmail.com',
    name: 'Chief & Mrs. O. Emmanuel',
    role: 'parent',
    badge: 'Guardian of Osasere Emmanuel',
    description: 'Registered parent with full access to ward terminal report cards, attendance rates, and fee billing.',
    profile: {
      id: 'demo-parent-uuid-002',
      email: 'parent.emmanuel@gmail.com',
      full_name: 'Chief & Mrs. O. Emmanuel',
      role: 'parent',
      phone: '+234 802 555 0192',
      ward_name: 'Osasere Emmanuel (SS 2 Science)',
      student_id: 'ESS/2024/0142',
      created_at: new Date().toISOString(),
    },
  },
  teacher: {
    email: 'teacher.akhigbe@emaudo.edu.ng',
    name: 'Mr. Akhigbe Christopher',
    role: 'teacher',
    badge: 'Head of Department (Sciences)',
    description: 'Senior physics and mathematics faculty coordinator managing CA continuous assessments and attendance.',
    profile: {
      id: 'demo-teacher-uuid-003',
      email: 'teacher.akhigbe@emaudo.edu.ng',
      full_name: 'Mr. Akhigbe Christopher',
      role: 'teacher',
      phone: '+234 805 112 3901',
      department: 'Sciences & Chevron Lab Complex',
      created_at: new Date().toISOString(),
    },
  },
  admin: {
    email: 'principal.admin@emaudo.edu.ng',
    name: 'Dr. (Mrs.) E. O. Akhigbe',
    role: 'admin',
    badge: 'Principal Administrator',
    description: 'Master institutional control for admissions, announcements, school calendar, and student records.',
    profile: {
      id: 'demo-admin-uuid-004',
      email: 'principal.admin@emaudo.edu.ng',
      full_name: 'Dr. (Mrs.) E. O. Akhigbe',
      role: 'admin',
      phone: '+234 803 345 6789',
      department: 'Executive Administration',
      created_at: new Date().toISOString(),
    },
  },
};

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isDemo: boolean;
  authError: string | null;
  signIn: (email: string, password: string, preferredRole?: UserRole) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, metadata: { full_name: string; role: 'student' | 'parent'; phone?: string }) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  loginAsDemo: (role: UserRole) => void;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDemo, setIsDemo] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Helper to fetch user profile from Supabase profiles table
  const fetchProfile = async (userId: string, userEmail: string): Promise<UserProfile | null> => {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.warn('Profile fetch note:', error.message);
        return null;
      }

      if (data) {
        return {
          id: data.id,
          email: data.email || userEmail,
          full_name: data.full_name || 'School Member',
          role: (data.role as UserRole) || 'student',
          phone: data.phone,
          avatar_url: data.avatar_url,
          created_at: data.created_at,
        };
      }
      return null;
    } catch (e) {
      console.warn('Profile fetch exception:', e);
      return null;
    }
  };

  // Initialize session and listen to Supabase Auth state changes
  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      setIsLoading(true);

      // Check for saved Demo session in localStorage
      const savedDemoRole = localStorage.getItem('emaudo_demo_role') as UserRole | null;
      if (savedDemoRole && DEMO_ACCOUNTS[savedDemoRole]) {
        const demo = DEMO_ACCOUNTS[savedDemoRole];
        setProfile(demo.profile);
        setIsDemo(true);
        setIsLoading(false);
        return;
      }

      if (isSupabaseConfigured && supabase) {
        try {
          const { data: { session: initialSession } } = await supabase.auth.getSession();
          if (mounted && initialSession?.user) {
            setSession(initialSession);
            setUser(initialSession.user);
            setIsDemo(false);

            const userProf = await fetchProfile(initialSession.user.id, initialSession.user.email || '');
            if (userProf) {
              setProfile(userProf);
            } else {
              // Create temporary profile from user metadata if table hasn't populated yet
              const metaRole = (initialSession.user.user_metadata?.role as UserRole) || 'student';
              setProfile({
                id: initialSession.user.id,
                email: initialSession.user.email || '',
                full_name: initialSession.user.user_metadata?.full_name || 'School Member',
                role: metaRole,
                phone: initialSession.user.user_metadata?.phone,
              });
            }
          }
        } catch (err) {
          console.warn('Initial session check error:', err);
        }

        // Listen for realtime auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
          if (!mounted) return;
          if (newSession?.user) {
            setSession(newSession);
            setUser(newSession.user);
            setIsDemo(false);
            localStorage.removeItem('emaudo_demo_role');

            const prof = await fetchProfile(newSession.user.id, newSession.user.email || '');
            if (prof) {
              setProfile(prof);
            } else {
              const metaRole = (newSession.user.user_metadata?.role as UserRole) || 'student';
              setProfile({
                id: newSession.user.id,
                email: newSession.user.email || '',
                full_name: newSession.user.user_metadata?.full_name || 'School Member',
                role: metaRole,
                phone: newSession.user.user_metadata?.phone,
              });
            }
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
            setProfile(null);
            setSession(null);
            setIsDemo(false);
            localStorage.removeItem('emaudo_demo_role');
          }
        });

        if (mounted) setIsLoading(false);

        return () => {
          subscription.unsubscribe();
        };
      } else {
        if (mounted) setIsLoading(false);
      }
    }

    initAuth();

    return () => {
      mounted = false;
    };
  }, []);

  // Sign In method
  const signIn = async (
    email: string,
    password: string,
    preferredRole?: UserRole
  ): Promise<{ success: boolean; error?: string }> => {
    setAuthError(null);
    setIsLoading(true);

    // 1. If Supabase is configured, attempt real authentication
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          // Check if this matches a demo account credentials fallback for testing convenience
          const matchedDemo = Object.values(DEMO_ACCOUNTS).find(
            (d) => d.email.toLowerCase() === email.trim().toLowerCase()
          );

          if (matchedDemo) {
            loginAsDemo(matchedDemo.role);
            setIsLoading(false);
            return { success: true };
          }

          setAuthError(error.message || 'Invalid email or password.');
          setIsLoading(false);
          return { success: false, error: error.message };
        }

        if (data.user) {
          setUser(data.user);
          setSession(data.session);
          setIsDemo(false);
          localStorage.removeItem('emaudo_demo_role');

          const prof = await fetchProfile(data.user.id, data.user.email || '');
          if (prof) {
            setProfile(prof);
          } else {
            const role = (data.user.user_metadata?.role as UserRole) || preferredRole || 'student';
            setProfile({
              id: data.user.id,
              email: data.user.email || '',
              full_name: data.user.user_metadata?.full_name || 'School Member',
              role,
              phone: data.user.user_metadata?.phone,
            });
          }

          setIsLoading(false);
          return { success: true };
        }
      } catch (err: any) {
        const msg = err?.message || 'Authentication error occurred.';
        setAuthError(msg);
        setIsLoading(false);
        return { success: false, error: msg };
      }
    }

    // 2. Demo fallback if Supabase keys not set yet
    const roleToUse = preferredRole || 'student';
    loginAsDemo(roleToUse);
    setIsLoading(false);
    return { success: true };
  };

  // Sign Up method (Only Students and Parents allowed for public registration)
  const signUp = async (
    email: string,
    password: string,
    metadata: { full_name: string; role: 'student' | 'parent'; phone?: string }
  ): Promise<{ success: boolean; error?: string }> => {
    setAuthError(null);
    setIsLoading(true);

    // Guard: Prevent unauthorized admin/teacher registration through public form
    if (metadata.role !== 'student' && metadata.role !== 'parent') {
      const err = 'Security Restriction: Administrative & Staff accounts must be provisioned by school administration.';
      setAuthError(err);
      setIsLoading(false);
      return { success: false, error: err };
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: metadata.full_name,
              role: metadata.role,
              phone: metadata.phone || '',
            },
          },
        });

        if (error) {
          setAuthError(error.message);
          setIsLoading(false);
          return { success: false, error: error.message };
        }

        if (data.user) {
          // If email confirmation is enabled, user session might be null until confirmed
          if (data.session) {
            setUser(data.user);
            setSession(data.session);
            setProfile({
              id: data.user.id,
              email: data.user.email || email,
              full_name: metadata.full_name,
              role: metadata.role,
              phone: metadata.phone,
            });
          }
          setIsLoading(false);
          return { success: true };
        }
      } catch (err: any) {
        const msg = err?.message || 'Sign up failed.';
        setAuthError(msg);
        setIsLoading(false);
        return { success: false, error: msg };
      }
    }

    // Demo fallback for sign up
    const newDemoProfile: UserProfile = {
      id: `demo-user-${Date.now()}`,
      email,
      full_name: metadata.full_name,
      role: metadata.role,
      phone: metadata.phone,
      created_at: new Date().toISOString(),
    };
    setProfile(newDemoProfile);
    setIsDemo(true);
    localStorage.setItem('emaudo_demo_role', metadata.role);
    setIsLoading(false);
    return { success: true };
  };

  // Sign Out
  const signOut = async () => {
    setIsLoading(true);
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Sign out error:', err);
      }
    }
    setUser(null);
    setProfile(null);
    setSession(null);
    setIsDemo(false);
    setAuthError(null);
    localStorage.removeItem('emaudo_demo_role');
    setIsLoading(false);
  };

  // Password Reset
  const resetPassword = async (email: string): Promise<{ success: boolean; message?: string; error?: string }> => {
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please provide a valid registered email address.' };
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: window.location.origin,
        });

        if (error) {
          return { success: false, error: error.message };
        }

        return {
          success: true,
          message: `Password reset instructions have been sent to ${email}. Please check your inbox and spam folders.`,
        };
      } catch (err: any) {
        return { success: false, error: err?.message || 'Password reset request failed.' };
      }
    }

    // Demo response
    return {
      success: true,
      message: `[Demo Mode] Password reset instructions simulated for ${email}. In production with Supabase configured, a secure magic link is dispatched.`,
    };
  };

  // Demo Login Quick Access
  const loginAsDemo = (demoRole: UserRole) => {
    const demo = DEMO_ACCOUNTS[demoRole];
    if (demo) {
      setProfile(demo.profile);
      setUser(null);
      setSession(null);
      setIsDemo(true);
      setAuthError(null);
      localStorage.setItem('emaudo_demo_role', demoRole);
    }
  };

  const clearAuthError = () => {
    setAuthError(null);
  };

  const role = profile?.role || null;
  const isAuthenticated = Boolean(profile !== null);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        role,
        isAuthenticated,
        isLoading,
        isDemo,
        authError,
        signIn,
        signUp,
        signOut,
        resetPassword,
        loginAsDemo,
        clearAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
