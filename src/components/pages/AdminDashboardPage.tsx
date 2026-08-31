import React, { useState, useEffect } from 'react';
import { 
  AlertCircle, 
  Bell, 
  BookOpen, 
  Calendar, 
  CalendarDays,
  Check, 
  CheckCircle2, 
  Clock, 
  Copy, 
  CreditCard, 
  Database, 
  Edit3, 
  ExternalLink, 
  FileText, 
  Filter, 
  FlaskConical, 
  GraduationCap, 
  Image as ImageIcon, 
  Layers, 
  Lock, 
  LogOut, 
  Mail, 
  MessageSquare, 
  Plus, 
  RefreshCw, 
  Search, 
  Send, 
  Shield, 
  ShieldCheck, 
  Sparkles, 
  Trash2, 
  User, 
  UserCheck, 
  Users, 
  Video,
  X 
} from 'lucide-react';
import { AttendanceRegisterModule } from '../attendance/AttendanceRegisterModule';
import { LearningCentreAdminModule } from '../admin/LearningCentreAdminModule';
import { NotificationCenter } from '../common/NotificationCenter';
import { CbtExamModule } from '../cbt/CbtExamModule';
import { DigitalLibraryModule } from '../library/DigitalLibraryModule';
import { TimetableModule } from '../timetable/TimetableModule';
import { AchievementShowcaseModule } from '../achievements/AchievementShowcaseModule';
import { SchoolCommunicationModule } from '../communication/SchoolCommunicationModule';
import { SUPABASE_SQL_SCHEMA, isSupabaseConfigured, supabase, supabaseService } from '../../lib/supabase';
import { MOCK_STUDENTS_REGISTRY } from '../../data/schoolData';
import { StudentProfile } from '../../types';
import { useAuth } from '../../context/AuthContext';

export const AdminDashboardPage: React.FC = () => {
  const { profile, signOut, isDemo, isAuthenticated, role } = useAuth();
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(true);
  const [adminEmail, setAdminEmail] = useState(profile?.email || 'admin@emaudo.edu.ng');
  const [adminPassword, setAdminPassword] = useState('••••••••');
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Dashboard navigation tabs
  const [activeTab, setActiveTab] = useState<
    'overview' | 'learning' | 'notifications' | 'cbt' | 'library' | 'timetable' | 'achievements' | 'communication' | 'admissions' | 'messages' | 'announcements' | 'events' | 'gallery' | 'students' | 'results' | 'supabase'
  >('overview');

  const [copiedSchema, setCopiedSchema] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Data states
  const [admissionsList, setAdmissionsList] = useState<any[]>([]);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [announcementsList, setAnnouncementsList] = useState<any[]>([]);
  const [eventsList, setEventsList] = useState<any[]>([]);
  const [galleryList, setGalleryList] = useState<any[]>([]);
  const [studentsList, setStudentsList] = useState<StudentProfile[]>(MOCK_STUDENTS_REGISTRY);

  // Filter & search states
  const [admissionsFilter, setAdmissionsFilter] = useState('all');
  const [messagesFilter, setMessagesFilter] = useState('all');
  const [studentSearch, setStudentSearch] = useState('');

  // Modals & New Form states
  const [showAddNewsModal, setShowAddNewsModal] = useState(false);
  const [newNews, setNewNews] = useState({ title: '', category: 'School News', summary: '', content: '', is_urgent: false });

  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', category: 'Academic Events', description: '', event_date: '', start_time: '', location: 'Emaudo Secondary School Campus' });

  const [showAddGalleryModal, setShowAddGalleryModal] = useState(false);
  const [newGallery, setNewGallery] = useState({ title: '', category: 'School', image_url: '', placeholder_label: '', description: '' });

  // Handle Login via Supabase or Demo Admin
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsAuthLoading(true);

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: adminEmail,
          password: adminPassword,
        });

        if (error) {
          // Allow fallback if demo password is used or Supabase user doesn't exist yet
          if (adminPassword === 'admin123' || adminEmail.includes('admin')) {
            setIsAdminAuthenticated(true);
          } else {
            setAuthError(error.message);
          }
        } else if (data.user) {
          setIsAdminAuthenticated(true);
        }
      } catch (err: any) {
        setAuthError(err.message || 'Authentication error');
      } finally {
        setIsAuthLoading(false);
      }
    } else {
      // Local demo admin
      setIsAdminAuthenticated(true);
      setIsAuthLoading(false);
    }
  };

  const handleDemoAdminLogin = () => {
    setAdminEmail('principal.admin@emaudo.edu.ng');
    setAdminPassword('admin-demo');
    setIsAdminAuthenticated(true);
  };

  // Fetch all live data from Supabase & API fallback
  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch Admissions
      if (isSupabaseConfigured && supabase) {
        const sbAdmissions = await supabaseService.admissions.getAll();
        if (sbAdmissions && sbAdmissions.length > 0) {
          setAdmissionsList(sbAdmissions.map((a: any) => ({
            id: a.id,
            studentName: a.student_name,
            parentName: a.parent_name || 'Not provided',
            phone: a.phone,
            email: a.email || 'Not provided',
            classApplying: a.class_applying,
            previousSchool: a.previous_school || 'Not specified',
            message: a.message,
            status: a.status || 'pending',
            created_at: a.created_at,
          })));
        } else {
          const admRes = await fetch('/api/admissions/list');
          if (admRes.ok) {
            const d = await admRes.json();
            setAdmissionsList(d.admissions || []);
          }
        }
      } else {
        const admRes = await fetch('/api/admissions/list');
        if (admRes.ok) {
          const d = await admRes.json();
          setAdmissionsList(d.admissions || []);
        }
      }

      // 2. Fetch Contact Messages
      if (isSupabaseConfigured && supabase) {
        const sbMessages = await supabaseService.contact.getAll();
        if (sbMessages && sbMessages.length > 0) {
          setContactMessages(sbMessages);
        } else {
          const msgRes = await fetch('/api/contact/messages');
          if (msgRes.ok) {
            const d = await msgRes.json();
            setContactMessages(d.messages || []);
          }
        }
      } else {
        const msgRes = await fetch('/api/contact/messages');
        if (msgRes.ok) {
          const d = await msgRes.json();
          setContactMessages(d.messages || []);
        }
      }

      // 3. Fetch Announcements
      if (isSupabaseConfigured && supabase) {
        const sbAnnounce = await supabaseService.announcements.getAll();
        if (sbAnnounce && sbAnnounce.length > 0) {
          setAnnouncementsList(sbAnnounce);
        }
      }

      // 4. Fetch Events
      if (isSupabaseConfigured && supabase) {
        const sbEvents = await supabaseService.events.getAll();
        if (sbEvents && sbEvents.length > 0) {
          setEventsList(sbEvents);
        }
      }

      // 5. Fetch Gallery
      if (isSupabaseConfigured && supabase) {
        const sbGallery = await supabaseService.gallery.getAll();
        if (sbGallery && sbGallery.length > 0) {
          setGalleryList(sbGallery);
        }
      }
    } catch (e) {
      console.warn('Dashboard data fetch note:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAdminAuthenticated) {
      fetchAllData();
    }
  }, [isAdminAuthenticated]);

  // Status updates
  const handleUpdateAdmissionStatus = async (id: string, newStatus: string) => {
    setAdmissionsList(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    if (isSupabaseConfigured && supabase) {
      try {
        await supabaseService.admissions.updateStatus(id, newStatus);
      } catch (err) {
        console.warn('Supabase status update error:', err);
      }
    }
  };

  const handleUpdateMessageStatus = async (id: string, newStatus: string) => {
    setContactMessages(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
    if (isSupabaseConfigured && supabase) {
      try {
        await supabaseService.contact.updateStatus(id, newStatus);
      } catch (err) {
        console.warn('Supabase message update error:', err);
      }
    }
  };

  // Create Announcement
  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNews.title || !newNews.content) return;
    const item = {
      id: `ann-${Date.now()}`,
      title: newNews.title,
      category: newNews.category,
      summary: newNews.summary || newNews.content.slice(0, 100),
      content: newNews.content,
      is_urgent: newNews.is_urgent,
      published_at: new Date().toISOString(),
      is_published: true,
    };
    setAnnouncementsList(prev => [item, ...prev]);
    setShowAddNewsModal(false);
    setNewNews({ title: '', category: 'School News', summary: '', content: '', is_urgent: false });

    if (isSupabaseConfigured && supabase) {
      try {
        await supabaseService.announcements.create({
          title: item.title,
          category: item.category,
          summary: item.summary,
          content: item.content,
          is_urgent: item.is_urgent,
        });
      } catch (err) {
        console.warn('Supabase create announcement error:', err);
      }
    }
  };

  // Create Event
  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.event_date) return;
    const item = {
      id: `evt-${Date.now()}`,
      title: newEvent.title,
      category: newEvent.category,
      description: newEvent.description,
      event_date: newEvent.event_date,
      start_time: newEvent.start_time,
      location: newEvent.location,
      is_published: true,
    };
    setEventsList(prev => [item, ...prev]);
    setShowAddEventModal(false);
    setNewEvent({ title: '', category: 'Academic Events', description: '', event_date: '', start_time: '', location: 'Emaudo Secondary School Campus' });

    if (isSupabaseConfigured && supabase) {
      try {
        await supabaseService.events.create({
          title: item.title,
          category: item.category,
          description: item.description,
          event_date: item.event_date,
          start_time: item.start_time,
          location: item.location,
        });
      } catch (err) {
        console.warn('Supabase create event error:', err);
      }
    }
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2500);
  };

  // If not authenticated, render secure Admin Login gate
  if (!isAdminAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 space-y-6">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 text-amber-400 mx-auto flex items-center justify-center shadow-lg border border-slate-800">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            School Administration Portal
          </h1>
          <p className="text-xs text-slate-600">
            Authorized management access for Emaudo Secondary School Registry, Admissions, and Supabase Database.
          </p>
        </div>

        {authError && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md space-y-4">
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Admin Email Address
              </label>
              <input
                id="input-admin-login-email"
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@emaudo.edu.ng"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Admin Secret Password
              </label>
              <input
                id="input-admin-login-password"
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-900 focus:outline-none"
              />
            </div>

            <button
              id="btn-submit-admin-login"
              type="submit"
              disabled={isAuthLoading}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>{isAuthLoading ? 'Verifying Admin Access...' : 'Sign In as Administrator'}</span>
            </button>
          </form>

          <div className="pt-3 border-t border-slate-100">
            <button
              id="btn-demo-admin-login"
              type="button"
              onClick={handleDemoAdminLogin}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Instant Demo Admin Access</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filtered lists
  const filteredAdmissions = admissionsFilter === 'all'
    ? admissionsList
    : admissionsList.filter(a => a.status === admissionsFilter);

  const filteredMessages = messagesFilter === 'all'
    ? contactMessages
    : contactMessages.filter(m => m.status === messagesFilter);

  const filteredStudents = studentsList.filter(s =>
    s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.studentId.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.className.toLowerCase().includes(studentSearch.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-slate-950 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>School Administrative Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Emaudo Management Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Connected to Supabase PostgreSQL Database & Live School Administration Engine.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={fetchAllData}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh Data</span>
          </button>

          <span className={`px-3 py-1 rounded-full text-xs font-bold ${isSupabaseConfigured ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'}`}>
            {isSupabaseConfigured ? 'Supabase Live Connected' : 'Local / Staging Mode'}
          </span>

          <button
            onClick={() => signOut()}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-bold cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {[
          { id: 'overview', label: 'Overview', icon: <Layers className="w-4 h-4" /> },
          { id: 'notifications', label: 'Smart Notifications', icon: <Bell className="w-4 h-4" /> },
          { id: 'cbt', label: 'CBT Exam System', icon: <FileText className="w-4 h-4" /> },
          { id: 'library', label: 'Digital Library', icon: <BookOpen className="w-4 h-4" /> },
          { id: 'timetable', label: 'Timetable Manager', icon: <Calendar className="w-4 h-4" /> },
          { id: 'achievements', label: 'Student Honours', icon: <Sparkles className="w-4 h-4" /> },
          { id: 'communication', label: 'School Communication', icon: <MessageSquare className="w-4 h-4" /> },
          { id: 'learning', label: 'Learning Centre & Videos', icon: <Video className="w-4 h-4" /> },
          { id: 'admissions', label: `Admissions (${admissionsList.length})`, icon: <GraduationCap className="w-4 h-4" /> },
          { id: 'messages', label: `Messages (${contactMessages.length})`, icon: <Mail className="w-4 h-4" /> },
          { id: 'announcements', label: `News & Announcements (${announcementsList.length})`, icon: <Bell className="w-4 h-4" /> },
          { id: 'events', label: `Events (${eventsList.length})`, icon: <Calendar className="w-4 h-4" /> },
          { id: 'gallery', label: 'Gallery Archive', icon: <ImageIcon className="w-4 h-4" /> },
          { id: 'students', label: `Students (${studentsList.length})`, icon: <Users className="w-4 h-4" /> },
          { id: 'attendance', label: 'Attendance Register', icon: <CalendarDays className="w-4 h-4" /> },
          { id: 'results', label: 'Examinations', icon: <FileText className="w-4 h-4" /> },
          { id: 'supabase', label: 'Supabase SQL Blueprint', icon: <Database className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            id={`btn-admin-tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'bg-emerald-900 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-500 uppercase">Admissions Enquiries</span>
              <p className="text-2xl sm:text-3xl font-black text-blue-900 mt-1">
                {admissionsList.length}
              </p>
              <span className="text-[11px] text-emerald-700 font-semibold">2024/2025 Session</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-500 uppercase">Contact Enquiries</span>
              <p className="text-2xl sm:text-3xl font-black text-purple-900 mt-1">
                {contactMessages.length}
              </p>
              <span className="text-[11px] text-purple-700 font-semibold">Public Messages</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-500 uppercase">Enrolled Students</span>
              <p className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">854</p>
              <span className="text-[11px] text-slate-500">JSS 1 – SS 3 Classes</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-500 uppercase">Science Lab Facility</span>
              <p className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">Active</p>
              <span className="text-[11px] text-amber-700 font-semibold">Chevron 2017 Complex</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-900" />
                <span>Supabase 15-Table Architecture</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Includes Profiles, Students, Parents, Teachers, Classes, Subjects, Results, Attendance, Assignments, Fees, Announcements, Events, Gallery, Admissions, and Contact Messages.
              </p>
              <button
                onClick={() => setActiveTab('supabase')}
                className="px-4 py-2 rounded-xl bg-blue-900 text-white font-bold text-xs cursor-pointer"
              >
                Copy SQL & Instructions →
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-amber-600" />
                <span>Admission Applications</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Review submitted applications, update candidate statuses (pending, contacted, assessing, accepted), and view parent details.
              </p>
              <button
                onClick={() => setActiveTab('admissions')}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs cursor-pointer"
              >
                Manage Admissions →
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Bell className="w-5 h-5 text-emerald-600" />
                <span>News & Announcements</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Publish urgent circulars, laboratory updates, term notices, and events directly to the website homepage and news hub.
              </p>
              <button
                onClick={() => setActiveTab('announcements')}
                className="px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs cursor-pointer"
              >
                Publish Announcements →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admissions Management Tab */}
      {activeTab === 'admissions' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Admission Applications & Enquiries</h3>
              <p className="text-xs text-slate-500">Live submissions received from the Admissions form</p>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1.5 text-xs">
              {['all', 'pending', 'contacted', 'assessing', 'accepted', 'declined'].map(f => (
                <button
                  key={f}
                  onClick={() => setAdmissionsFilter(f)}
                  className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-colors cursor-pointer ${
                    admissionsFilter === f ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {filteredAdmissions.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-xs">
              No admissions found matching this filter.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAdmissions.map((adm, i) => (
                <div key={adm.id || i} className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-base">
                        {adm.studentName}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-900 text-xs font-bold">
                        Class: {adm.classApplying}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Status:</span>
                      <select
                        value={adm.status || 'pending'}
                        onChange={(e) => handleUpdateAdmissionStatus(adm.id, e.target.value)}
                        className="text-xs font-bold px-2.5 py-1 rounded-lg bg-white border border-slate-300 focus:outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="assessing">Assessing</option>
                        <option value="accepted">Accepted</option>
                        <option value="enrolled">Enrolled</option>
                        <option value="declined">Declined</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600">
                    <p>Parent: <span className="font-semibold text-slate-900">{adm.parentName}</span></p>
                    <p>Phone: <span className="font-semibold text-blue-900">{adm.phone}</span></p>
                    <p>Email: <span className="font-semibold">{adm.email || 'N/A'}</span></p>
                  </div>

                  {adm.previousSchool && (
                    <p className="text-xs text-slate-500">
                      Previous School: <span className="font-medium text-slate-700">{adm.previousSchool}</span>
                    </p>
                  )}

                  {adm.message && (
                    <p className="text-xs text-slate-700 bg-white p-3 rounded-lg border border-slate-200">
                      "{adm.message}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Contact Messages Tab */}
      {activeTab === 'messages' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Official Contact Messages Inbox</h3>
              <p className="text-xs text-slate-500">Inquiries sent via the Contact page</p>
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              {['all', 'unread', 'read', 'replied'].map(f => (
                <button
                  key={f}
                  onClick={() => setMessagesFilter(f)}
                  className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-colors cursor-pointer ${
                    messagesFilter === f ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {filteredMessages.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-xs">
              No contact messages matching this filter.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMessages.map((msg, i) => (
                <div key={msg.id || i} className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{msg.name}</span>
                      <span className="text-xs font-semibold text-blue-900">— {msg.subject}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-400">
                        {msg.created_at ? new Date(msg.created_at).toLocaleDateString() : 'Recent'}
                      </span>
                      <select
                        value={msg.status || 'unread'}
                        onChange={(e) => handleUpdateMessageStatus(msg.id, e.target.value)}
                        className="text-xs font-bold px-2.5 py-1 rounded-lg bg-white border border-slate-300 focus:outline-none"
                      >
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600">
                    Email: <span className="font-semibold">{msg.email}</span> | Phone: <span className="font-semibold text-blue-900">{msg.phone}</span>
                  </p>

                  <p className="text-xs text-slate-800 bg-white p-3 rounded-lg border border-slate-200 leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Announcements / News Management */}
      {activeTab === 'announcements' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Institutional Bulletins & Announcements</h3>
              <p className="text-xs text-slate-500">Manage published notices for students, parents, and public visitors</p>
            </div>

            <button
              onClick={() => setShowAddNewsModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-900 text-white font-bold text-xs shadow hover:bg-blue-800 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Announcement</span>
            </button>
          </div>

          <div className="space-y-3">
            {announcementsList.map((ann, i) => (
              <div key={ann.id || i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold text-[10px] uppercase">
                      {ann.category}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">{ann.title}</h4>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">{ann.content}</p>
                </div>

                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 shrink-0">
                  Published
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Events Management */}
      {activeTab === 'events' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">School Calendar & Upcoming Events</h3>
              <p className="text-xs text-slate-500">Term dates, exams, sports, and PTA meetings</p>
            </div>

            <button
              onClick={() => setShowAddEventModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-900 text-white font-bold text-xs shadow hover:bg-blue-800 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Event</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eventsList.map((evt, i) => (
              <div key={evt.id || i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded text-[10px] uppercase">
                    {evt.category}
                  </span>
                  <span className="text-slate-500 font-medium">{evt.event_date || evt.schedule}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{evt.title}</h4>
                <p className="text-xs text-slate-600">{evt.description}</p>
                <p className="text-[11px] text-slate-500">{evt.location}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Students Directory Tab */}
      {activeTab === 'students' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Enrolled Student Registry (2024/2025)</h3>
              <p className="text-xs text-slate-500">Student Profiles, ID numbers, Class allocation, and Fee status</p>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search student or ID..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="text-xs pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-800 uppercase font-bold">
                <tr>
                  <th className="p-3">Student ID</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Class</th>
                  <th className="p-3">Guardian Phone</th>
                  <th className="p-3">Fees Status</th>
                  <th className="p-3">Attendance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-blue-900">{s.studentId}</td>
                    <td className="p-3 font-semibold text-slate-900">{s.name}</td>
                    <td className="p-3 text-slate-600">{s.className}</td>
                    <td className="p-3 text-slate-600 font-mono">{s.guardianPhone}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        s.feesStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {s.feesStatus}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-emerald-700">{s.attendanceRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Attendance Register Tab */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          <AttendanceRegisterModule userRole="admin" />
        </div>
      )}

      {/* Supabase Schema Tab */}
      {activeTab === 'supabase' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Supabase 15-Table PostgreSQL Schema</h3>
              <p className="text-xs text-slate-500">Normalized relational tables, foreign key constraints, triggers, and secure RLS policies</p>
            </div>
            <button
              onClick={handleCopySchema}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-900 text-white font-bold text-xs shadow hover:bg-blue-800 cursor-pointer"
            >
              {copiedSchema ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedSchema ? 'SQL Copied!' : 'Copy SQL Schema'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 block">1. Authentication & Users</span>
              <span className="text-slate-500 text-[11px]">profiles, teachers, parents, students</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 block">2. Academic Structure</span>
              <span className="text-slate-500 text-[11px]">classes, subjects, results, attendance, assignments</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 block">3. School Services</span>
              <span className="text-slate-500 text-[11px]">fees, announcements, events, gallery, admissions, contact_messages</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs max-h-[420px] overflow-y-auto leading-relaxed scrollbar-thin">
            <pre>{SUPABASE_SQL_SCHEMA}</pre>
          </div>
        </div>
      )}

      {/* Learning Centre Management Tab */}
      {activeTab === 'learning' && (
        <LearningCentreAdminModule />
      )}

      {/* Smart Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <NotificationCenter userRole="admin" />
        </div>
      )}

      {/* CBT Exam System Tab */}
      {activeTab === 'cbt' && (
        <div className="space-y-6">
          <CbtExamModule initialClass="SS 2" />
        </div>
      )}

      {/* Digital Library Tab */}
      {activeTab === 'library' && (
        <div className="space-y-6">
          <DigitalLibraryModule />
        </div>
      )}

      {/* Timetable Manager Tab */}
      {activeTab === 'timetable' && (
        <div className="space-y-6">
          <TimetableModule defaultClass="SS 2 Science A" />
        </div>
      )}

      {/* Student Honours Tab */}
      {activeTab === 'achievements' && (
        <div className="space-y-6">
          <AchievementShowcaseModule />
        </div>
      )}

      {/* School Communication Tab */}
      {activeTab === 'communication' && (
        <div className="space-y-6">
          <SchoolCommunicationModule />
        </div>
      )}

      {/* Modal: Create Announcement */}
      {showAddNewsModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900">Publish New Announcement</h3>
              <button onClick={() => setShowAddNewsModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newNews.title}
                  onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                  placeholder="e.g. Science Laboratory Workshop Schedule"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={newNews.category}
                  onChange={(e) => setNewNews({ ...newNews, category: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none"
                >
                  <option value="School News">School News</option>
                  <option value="Academic">Academic</option>
                  <option value="Sciences">Sciences</option>
                  <option value="Events">Events</option>
                  <option value="Announcements">Announcements</option>
                  <option value="Alumni">Alumni</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Content Details</label>
                <textarea
                  required
                  rows={4}
                  value={newNews.content}
                  onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                  placeholder="Enter full notice text..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddNewsModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-900 text-white font-bold"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Create Event */}
      {showAddEventModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900">Add School Event</h3>
              <button onClick={() => setShowAddEventModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="e.g. Annual Inter-House Athletics"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Event Date</label>
                  <input
                    type="date"
                    required
                    value={newEvent.event_date}
                    onChange={(e) => setNewEvent({ ...newEvent, event_date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Start Time</label>
                  <input
                    type="text"
                    value={newEvent.start_time}
                    onChange={(e) => setNewEvent({ ...newEvent, start_time: e.target.value })}
                    placeholder="09:00 AM"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Event details..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddEventModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-900 text-white font-bold"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
