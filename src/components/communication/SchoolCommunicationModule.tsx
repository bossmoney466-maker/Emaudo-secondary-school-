import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  Search, 
  AlertTriangle, 
  Check, 
  CheckCheck, 
  User, 
  Clock, 
  Sparkles, 
  Plus, 
  X, 
  ShieldAlert,
  ChevronRight,
  Filter
} from 'lucide-react';
import { SchoolMessage } from '../../types';
import { MOCK_MESSAGES } from '../../data/expandedData';
import { useAuth } from '../../context/AuthContext';
import { supabaseService, isSupabaseConfigured } from '../../lib/supabase';

export const SchoolCommunicationModule: React.FC = () => {
  const { profile, role } = useAuth();
  const [messages, setMessages] = useState<SchoolMessage[]>(() => {
    const saved = localStorage.getItem('emaudo_messages');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return MOCK_MESSAGES;
  });

  const [selectedMessage, setSelectedMessage] = useState<SchoolMessage | null>(messages[0] || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');
  const [showComposeModal, setShowComposeModal] = useState(false);

  // Compose Modal state
  const [composeRecipient, setComposeRecipient] = useState('Mr. E. Akhere (Form Master - SS 2)');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeCategory, setComposeCategory] = useState<'academic' | 'behaviour' | 'fee' | 'attendance' | 'general' | 'emergency'>('academic');
  const [composeBody, setComposeBody] = useState('');
  const [isEmergencyBroadcast, setIsEmergencyBroadcast] = useState(false);

  useEffect(() => {
    localStorage.setItem('emaudo_messages', JSON.stringify(messages));
  }, [messages]);

  // Load from Supabase if configured
  useEffect(() => {
    if (isSupabaseConfigured && profile?.id) {
      supabaseService.messages.getForUser(profile.id).then((data: any) => {
        if (data && data.length > 0) {
          const mapped: SchoolMessage[] = data.map((d: any) => ({
            id: d.id,
            sender_id: d.sender_id,
            sender_name: d.sender_name,
            sender_role: d.sender_role,
            recipient_id: d.recipient_id,
            recipient_name: d.recipient_name,
            recipient_role: d.recipient_role,
            subject: d.subject,
            body: d.body,
            category: d.category || 'general',
            created_at: d.created_at,
            is_read: d.is_read ?? false,
          }));
          setMessages(prev => {
            const ids = new Set(prev.map(p => p.id));
            const fresh = mapped.filter(m => !ids.has(m.id));
            return [...fresh, ...prev];
          });
        }
      }).catch(() => {});
    }
  }, [profile]);

  const filteredMessages = messages.filter(m => {
    const matchSearch = 
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.sender_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.recipient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.body.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSearch;
  });

  const handleSelectMessage = (msg: SchoolMessage) => {
    setSelectedMessage(msg);
    if (!msg.is_read) {
      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, is_read: true } : m));
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedMessage) return;

    const replyMsg: SchoolMessage = {
      id: `msg-${Date.now()}`,
      sender_id: profile?.id || 'usr-current',
      sender_name: profile?.full_name || 'Dr. Emmanuel Osagie (Parent)',
      sender_role: (role as any) || 'parent',
      recipient_id: selectedMessage.sender_id,
      recipient_name: selectedMessage.sender_name,
      recipient_role: selectedMessage.sender_role,
      subject: `Re: ${selectedMessage.subject}`,
      message: replyText,
      body: replyText,
      category: selectedMessage.category,
      created_at: new Date().toISOString(),
      is_read: true,
      parent_message_id: selectedMessage.id
    };

    setMessages(prev => [replyMsg, ...prev]);
    setSelectedMessage(replyMsg);
    setReplyText('');
  };

  const handleComposeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMsg: SchoolMessage = {
      id: `msg-${Date.now()}`,
      sender_id: profile?.id || 'usr-current',
      sender_name: profile?.full_name || (role === 'admin' ? 'Principal Academic Board' : 'Dr. Emmanuel Osagie'),
      sender_role: (role as any) || 'parent',
      recipient_id: 'rec-target',
      recipient_name: composeRecipient,
      recipient_role: isEmergencyBroadcast ? 'all' : 'teacher',
      subject: composeSubject,
      message: composeBody,
      body: composeBody,
      category: isEmergencyBroadcast ? 'emergency' : composeCategory,
      created_at: new Date().toISOString(),
      is_read: true,
    };

    setMessages(prev => [newMsg, ...prev]);
    setSelectedMessage(newMsg);
    setShowComposeModal(false);
    setComposeSubject('');
    setComposeBody('');
    setIsEmergencyBroadcast(false);
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'emergency': return { label: 'Emergency Alert', bg: 'bg-rose-100 text-rose-800 border-rose-300' };
      case 'academic': return { label: 'Academic Performance', bg: 'bg-blue-100 text-blue-800 border-blue-200' };
      case 'fee': return { label: 'Tuition & Fees', bg: 'bg-amber-100 text-amber-800 border-amber-200' };
      case 'attendance': return { label: 'Attendance', bg: 'bg-purple-100 text-purple-800 border-purple-200' };
      default: return { label: 'General', bg: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>Encrypted Direct Messaging</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Teacher-Parent School Communication Hub
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Direct communication channel between parents, class form masters, subject teachers, and the school administration.
          </p>
        </div>

        <button
          onClick={() => setShowComposeModal(true)}
          className="px-5 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Message</span>
        </button>
      </div>

      {/* Messaging Layout */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
        {/* Left: Message Threads List */}
        <div className="lg:col-span-5 border-r border-slate-200 flex flex-col">
          {/* Search Box */}
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search conversations, names, subjects..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 bg-slate-50"
              />
            </div>
          </div>

          {/* Threads */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 max-h-[550px]">
            {filteredMessages.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                No messages found.
              </div>
            ) : (
              filteredMessages.map(msg => {
                const isSelected = selectedMessage?.id === msg.id;
                const badge = getCategoryBadge(msg.category);

                return (
                  <button
                    key={msg.id}
                    onClick={() => handleSelectMessage(msg)}
                    className={`w-full text-left p-4 transition-all cursor-pointer flex flex-col gap-1.5 ${
                      isSelected 
                        ? 'bg-emerald-50/70 border-l-4 border-emerald-600' 
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-xs text-slate-900 truncate">
                        {msg.sender_name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono shrink-0">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className={`px-2 py-0.2 rounded text-[9px] font-bold border ${badge.bg}`}>
                        {badge.label}
                      </span>
                      {!msg.is_read && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      )}
                    </div>

                    <div className="font-medium text-xs text-slate-800 truncate">
                      {msg.subject}
                    </div>

                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {msg.body}
                    </p>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Active Conversation View */}
        <div className="lg:col-span-7 flex flex-col bg-slate-50/50">
          {selectedMessage ? (
            <>
              {/* Message Header */}
              <div className="p-6 bg-white border-b border-slate-200 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900">
                      {selectedMessage.subject}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                      <span>From: <strong className="text-slate-800">{selectedMessage.sender_name}</strong></span>
                      <span>•</span>
                      <span>To: <strong className="text-slate-800">{selectedMessage.recipient_name}</strong></span>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${getCategoryBadge(selectedMessage.category).bg}`}>
                    {getCategoryBadge(selectedMessage.category).label}
                  </span>
                </div>
              </div>

              {/* Message Content Body */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 max-h-[400px]">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-100 pb-2">
                    <span className="font-semibold text-emerald-800 uppercase tracking-wider text-[10px]">
                      {selectedMessage.sender_role} Message
                    </span>
                    <span className="font-mono">
                      {new Date(selectedMessage.created_at).toLocaleString()}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {selectedMessage.body}
                  </p>
                </div>
              </div>

              {/* Quick Reply Form */}
              <form onSubmit={handleSendReply} className="p-4 bg-white border-t border-slate-200 flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Type your response to teacher/administration..."
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  className="flex-1 p-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 bg-slate-50"
                />
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-400 text-xs">
              Select a conversation from the left to view messages.
            </div>
          )}
        </div>
      </div>

      {/* COMPOSE MESSAGE MODAL */}
      {showComposeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-base text-slate-900">Compose Direct Message</h3>
              <button onClick={() => setShowComposeModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleComposeSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700">Recipient</label>
                <select
                  value={composeRecipient}
                  onChange={e => setComposeRecipient(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 mt-1"
                >
                  <option value="Mr. E. Akhere (Form Master - SS 2)">Mr. E. Akhere (Form Master - SS 2)</option>
                  <option value="Dr. B. O. Imhansi-Jacob (Principal)">Dr. B. O. Imhansi-Jacob (Principal)</option>
                  <option value="Mrs. A. I. Akhere (Chemistry Teacher)">Mrs. A. I. Akhere (Chemistry Teacher)</option>
                  <option value="Accounts & Bursary Department">Accounts & Bursary Department</option>
                  <option value="Guidance & Counselling Unit">Guidance & Counselling Unit</option>
                  {(role === 'admin' || role === 'superadmin') && (
                    <option value="All Parents & Guardians (Broadcast)">All Parents & Guardians (Broadcast)</option>
                  )}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">Category</label>
                  <select
                    value={composeCategory}
                    onChange={e => setComposeCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 mt-1"
                  >
                    <option value="academic">Academic Query</option>
                    <option value="attendance">Attendance & Punctuality</option>
                    <option value="fee">Tuition & Payments</option>
                    <option value="behaviour">Conduct & Discipline</option>
                    <option value="general">General Notice</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Inquiries on Chemistry Practical Schedule"
                    value={composeSubject}
                    onChange={e => setComposeSubject(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700">Message Body</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Type your message to the educator or administrator here..."
                  value={composeBody}
                  onChange={e => setComposeBody(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 mt-1"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowComposeModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
