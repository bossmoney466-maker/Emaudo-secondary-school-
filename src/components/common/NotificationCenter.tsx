import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  X, 
  Check, 
  CheckCheck, 
  AlertCircle, 
  Calendar, 
  FileText, 
  CreditCard, 
  GraduationCap, 
  Sparkles, 
  Clock, 
  AlertTriangle,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { SmartNotification, NotificationCategory } from '../../types';
import { MOCK_NOTIFICATIONS } from '../../data/expandedData';
import { useAuth } from '../../context/AuthContext';
import { supabaseService, isSupabaseConfigured } from '../../lib/supabase';

interface NotificationCenterProps {
  onNavigate?: (tab: string) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ onNavigate }) => {
  const { role } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<SmartNotification[]>(() => {
    const saved = localStorage.getItem('emaudo_notifications');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return MOCK_NOTIFICATIONS;
  });
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | NotificationCategory>('all');

  useEffect(() => {
    if (isSupabaseConfigured) {
      supabaseService.notifications.getAll().then((data: any) => {
        if (data && data.length > 0) {
          const mapped: SmartNotification[] = data.map((d: any) => ({
            id: d.id,
            title: d.title,
            message: d.message,
            category: d.category || 'general',
            target_role: d.target_role || 'all',
            priority: d.priority || 'normal',
            created_at: d.created_at,
            is_read: false,
            action_url: d.action_url,
            action_label: d.action_label,
          }));
          setNotifications(prev => {
            const ids = new Set(prev.map(p => p.id));
            const fresh = mapped.filter(m => !ids.has(m.id));
            return [...fresh, ...prev];
          });
        }
      }).catch(() => {});
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('emaudo_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Filter based on user's current role or target audience
  const userNotifications = notifications.filter(n => {
    if (!role || role === 'superadmin' || role === 'admin') return true;
    if (n.target_role === 'all') return true;
    if (role === 'student' && (n.target_role === 'students' || n.target_role === 'SSS' || n.target_role === 'JSS')) return true;
    if (role === 'parent' && n.target_role === 'parents') return true;
    if (role === 'teacher' && n.target_role === 'teachers') return true;
    return false;
  });

  const unreadCount = userNotifications.filter(n => !n.is_read).length;

  const filteredNotifications = userNotifications.filter(n => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !n.is_read;
    return n.category === activeFilter;
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

  const getCategoryBadge = (category: NotificationCategory) => {
    switch (category) {
      case 'resumption':
        return { label: 'Resumption', bg: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30', icon: <Calendar className="w-3.5 h-3.5 text-emerald-600" /> };
      case 'exam':
        return { label: 'Examinations', bg: 'bg-purple-500/10 text-purple-700 border-purple-500/30', icon: <FileText className="w-3.5 h-3.5 text-purple-600" /> };
      case 'assignment':
        return { label: 'Assignment', bg: 'bg-blue-500/10 text-blue-700 border-blue-500/30', icon: <GraduationCap className="w-3.5 h-3.5 text-blue-600" /> };
      case 'fee':
        return { label: 'Tuition & Fees', bg: 'bg-amber-500/10 text-amber-700 border-amber-500/30', icon: <CreditCard className="w-3.5 h-3.5 text-amber-600" /> };
      case 'result':
        return { label: 'Report Cards', bg: 'bg-teal-500/10 text-teal-700 border-teal-500/30', icon: <Sparkles className="w-3.5 h-3.5 text-teal-600" /> };
      case 'emergency':
        return { label: 'Important Alert', bg: 'bg-rose-500/10 text-rose-700 border-rose-500/30', icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> };
      default:
        return { label: 'School Notice', bg: 'bg-slate-500/10 text-slate-700 border-slate-500/30', icon: <Bell className="w-3.5 h-3.5 text-slate-600" /> };
    }
  };

  const handleAction = (notif: SmartNotification) => {
    markAsRead(notif.id);
    if (notif.action_url && onNavigate) {
      onNavigate(notif.action_url);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <button
        id="notification-bell-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200 transition-all cursor-pointer focus:outline-none"
        title="Smart School Notifications"
        aria-label="Smart School Notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-600 text-white font-mono text-[10px] font-black flex items-center justify-center border-2 border-white shadow-xs animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Modal / Dropdown Tray */}
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div 
            className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-xs sm:hidden" 
            onClick={() => setIsOpen(false)}
          />

          <div 
            id="notification-tray"
            className="fixed sm:absolute right-2 sm:right-0 top-16 sm:top-12 z-50 w-[calc(100vw-1rem)] sm:w-[420px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
          >
            {/* Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm text-white">Smart Notifications</h3>
                  <p className="text-[11px] text-slate-300">
                    {unreadCount > 0 ? `${unreadCount} unread update${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer transition-colors"
                    title="Mark all as read"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Mark all</span>
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {[
                { id: 'all', label: 'All' },
                { id: 'unread', label: `Unread (${unreadCount})` },
                { id: 'resumption', label: 'Resumption' },
                { id: 'exam', label: 'Exams' },
                { id: 'assignment', label: 'Assignments' },
                { id: 'fee', label: 'Fees' },
                { id: 'emergency', label: 'Alerts' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activeFilter === f.id
                      ? 'bg-emerald-900 text-white shadow-2xs'
                      : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 max-h-[55vh] p-2 space-y-1">
              {filteredNotifications.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <Bell className="w-8 h-8 mx-auto text-slate-300 stroke-1" />
                  <p className="text-xs font-medium">No notifications in this category.</p>
                </div>
              ) : (
                filteredNotifications.map((notif) => {
                  const badge = getCategoryBadge(notif.category);
                  const isUrgent = notif.priority === 'urgent';

                  return (
                    <div
                      key={notif.id}
                      className={`p-3 rounded-xl transition-all ${
                        notif.is_read 
                          ? 'bg-white hover:bg-slate-50/80 text-slate-700' 
                          : isUrgent 
                            ? 'bg-rose-50/60 border border-rose-200 hover:bg-rose-50' 
                            : 'bg-emerald-50/50 border border-emerald-100 hover:bg-emerald-50/80'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border flex items-center gap-1 ${badge.bg}`}>
                            {badge.icon}
                            <span>{badge.label}</span>
                          </span>
                          {isUrgent && (
                            <span className="px-1.5 py-0.2 rounded bg-rose-600 text-white text-[9px] font-black uppercase tracking-wider">
                              Urgent
                            </span>
                          )}
                          {!notif.is_read && (
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-[10px] text-slate-400">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(notif.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 leading-snug mb-1">
                        {notif.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed mb-2.5">
                        {notif.message}
                      </p>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-1 border-t border-slate-100/80">
                        {notif.action_label && notif.action_url ? (
                          <button
                            onClick={() => handleAction(notif)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 cursor-pointer"
                          >
                            <span>{notif.action_label}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        ) : <div />}

                        {!notif.is_read && (
                          <button
                            onClick={() => markAsRead(notif.id)}
                            className="text-[10px] font-semibold text-slate-400 hover:text-slate-700 cursor-pointer flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" />
                            <span>Mark read</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
              <span className="text-[11px] text-slate-500 font-medium">
                Emaudo Secondary School Smart Notification Engine
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
