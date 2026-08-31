import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Phone, 
  MessageCircle, 
  GraduationCap, 
  ShieldCheck, 
  ChevronRight, 
  Sparkles,
  BookOpen,
  Landmark,
  Layers,
  FileCheck,
  MapPin,
  Bell
} from 'lucide-react';
import { SCHOOL_CONTACT } from '../../constants/contactInfo';
import { PageTab } from '../../types';
import { SchoolCrest } from '../common/SchoolCrest';
import { useAuth } from '../../context/AuthContext';
import { MOCK_NOTIFICATIONS } from '../../data/expandedData';

interface HeaderProps {
  activeTab: PageTab;
  onTabChange: (tab: PageTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const { isAuthenticated, profile, role } = useAuth();

  const navItems: { id: PageTab; label: string; icon?: React.ReactNode }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'history', label: 'School History' },
    { id: 'academics', label: 'Academics' },
    { id: 'departments', label: 'Departments' },
    { id: 'activities', label: 'Activities' },
    { id: 'learning-centre', label: 'Learning Centre' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'portal', label: 'Portal' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tab: PageTab) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-900/10 shadow-xs">
      {/* Top Institutional Contact & Verified Heritage Bar */}
      <div id="desktop-top-contact-bar" className="hidden lg:block bg-gradient-to-r from-emerald-950 via-slate-950 to-emerald-950 text-slate-200 text-xs py-2 px-4 sm:px-6 border-b border-emerald-800/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300 font-medium">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              178 Osimen Street, Emaudo, Ekpoma, Edo State, Nigeria
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-amber-300/90 font-medium">Est. 1980 by Prof. Ambrose Alli</span>
          </div>

          <div id="header-contact-area" className="flex items-center gap-5">
            {/* Desktop Header WhatsApp Contact */}
            <a
              id="header-contact-whatsapp"
              href={SCHOOL_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              title="Chat with Admissions & Desk on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-emerald-400 stroke-slate-950" />
              <span>WhatsApp: <strong className="text-white font-mono tracking-tight">{SCHOOL_CONTACT.whatsappDisplay}</strong></span>
            </a>

            <span className="text-slate-700">|</span>

            {/* Desktop Header Phone Call Contact */}
            <a
              id="header-contact-phone"
              href={SCHOOL_CONTACT.phoneTel}
              className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-medium transition-colors"
              title="Call School Helpdesk"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call: <strong className="text-white font-mono tracking-tight">{SCHOOL_CONTACT.phoneDisplay}</strong></span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* School Logo & Prestigious Identity */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 text-left group cursor-pointer focus:outline-none shrink-0"
            id="header-logo-btn"
          >
            <div className="relative">
              <SchoolCrest 
                size="sm" 
                variant="uniform" 
                imageOnly 
                className="w-11 h-11 sm:w-13 sm:h-13 shadow-sm group-hover:scale-105 transition-transform border-2 border-emerald-700" 
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white" />
            </div>
            <div>
              <div className="font-serif font-black text-base sm:text-xl text-emerald-950 tracking-tight leading-tight group-hover:text-emerald-700 transition-colors uppercase">
                Emaudo Secondary School
              </div>
              <div className="text-[10px] sm:text-xs font-bold text-amber-600 tracking-wider uppercase flex items-center gap-1">
                <span>Ekpoma, Edo State</span>
                <span>•</span>
                <span className="text-emerald-800">Est. 1980</span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id || 
                (item.id === 'academics' && (activeTab === 'departments' || activeTab === 'activities')) ||
                (item.id === 'about' && activeTab === 'history');

              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === item.id
                      ? 'bg-emerald-900 text-white shadow-sm'
                      : 'text-slate-700 hover:text-emerald-900 hover:bg-emerald-50/80'
                  }`}
                >
                  {item.id === 'portal' && isAuthenticated && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                  <span>{item.label}</span>
                  {item.id === 'portal' && isAuthenticated && (
                    <span className="text-[9px] uppercase font-bold text-amber-300 bg-emerald-950 px-1.5 py-0.5 rounded">
                      {role}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Actions: Notifications, Apply Now Button & Instant Contact */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              id="header-notifications-btn"
              onClick={() => setShowNotificationModal(!showNotificationModal)}
              className="relative p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-emerald-100 hover:text-emerald-900 border border-slate-200 transition-colors cursor-pointer"
              title="View Smart Notifications"
              aria-label="View Smart Notifications"
            >
              <Bell className="w-4 h-4 text-emerald-800" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                {MOCK_NOTIFICATIONS.length}
              </span>
            </button>

            <button
              id="header-apply-now-btn"
              onClick={() => handleNavClick('admissions')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-md shadow-amber-500/20 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Apply Now</span>
            </button>

            <a
              id="header-whatsapp-quick"
              href={SCHOOL_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 hover:text-emerald-950 border border-emerald-200 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-600 stroke-transparent" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              id="mobile-notifications-btn"
              onClick={() => setShowNotificationModal(!showNotificationModal)}
              className="relative p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-emerald-100 border border-slate-200"
              title="View Notifications"
            >
              <Bell className="w-4 h-4 text-emerald-800" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-600 text-white text-[8px] font-bold flex items-center justify-center">
                {MOCK_NOTIFICATIONS.length}
              </span>
            </button>

            <button
              id="mobile-apply-now-btn"
              onClick={() => handleNavClick('admissions')}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-sm sm:hidden"
            >
              Apply
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-emerald-950 hover:bg-emerald-50 focus:outline-none cursor-pointer border border-slate-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Dropdown Menu */}
      {mobileMenuOpen && (
        <div id="mobile-nav-menu" className="xl:hidden border-t border-emerald-900/10 bg-white px-4 pt-4 pb-8 shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
          {/* Quick Apply Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 to-emerald-900 text-white mb-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
                2024/2025 Admissions Open
              </span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <h4 className="font-serif font-bold text-sm text-white">Enroll Your Child at Emaudo Secondary School</h4>
            <button
              onClick={() => handleNavClick('admissions')}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Submit Admission Enquiry</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-5">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors cursor-pointer flex items-center justify-between ${
                  activeTab === item.id
                    ? 'bg-emerald-900 text-white'
                    : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-900'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className={`w-4 h-4 ${activeTab === item.id ? 'text-amber-400' : 'text-slate-400'}`} />
              </button>
            ))}
          </div>

          {/* Direct Buttons in Mobile Menu */}
          <div className="pt-4 border-t border-slate-200 space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Official Direct Contacts
            </div>
            <a
              href={SCHOOL_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp ({SCHOOL_CONTACT.whatsappDisplay})</span>
            </a>
            <a
              href={SCHOOL_CONTACT.phoneTel}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Direct Phone Call ({SCHOOL_CONTACT.phoneDisplay})</span>
            </a>
          </div>
        </div>
      )}

      {/* Global Quick Notifications Popover */}
      {showNotificationModal && (
        <div className="absolute right-4 sm:right-8 top-20 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-xs sm:text-sm">Smart Notifications</h3>
            </div>
            <button
              onClick={() => setShowNotificationModal(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 p-2 space-y-1 scrollbar-thin">
            {MOCK_NOTIFICATIONS.slice(0, 5).map((notif) => (
              <div
                key={notif.id}
                onClick={() => {
                  setShowNotificationModal(false);
                  handleNavClick('portal');
                }}
                className="p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    notif.priority === 'urgent' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {notif.category}
                  </span>
                  <span className="text-[10px] text-slate-400">{notif.date}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{notif.title}</h4>
                <p className="text-[11px] text-slate-600 line-clamp-2">{notif.message}</p>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
            <button
              onClick={() => {
                setShowNotificationModal(false);
                handleNavClick('portal');
              }}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-900"
            >
              Open Full Notification Center in Portal →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
