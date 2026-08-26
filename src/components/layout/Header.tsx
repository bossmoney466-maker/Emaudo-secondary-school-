import React, { useState } from 'react';
import { GraduationCap, Menu, X, Phone, MessageCircle } from 'lucide-react';
import { SCHOOL_CONTACT } from '../../constants/contactInfo';
import { PageTab } from '../../types';
import { WhatsAppButton } from '../common/WhatsAppButton';
import { CallButton } from '../common/CallButton';

interface HeaderProps {
  activeTab: PageTab;
  onTabChange: (tab: PageTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'academics', label: 'Academics' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'alumni', label: 'Alumni (ESSOSA)' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'news', label: 'News' },
    { id: 'portal', label: 'Student Portal' },
    { id: 'admin', label: 'Admin' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tab: PageTab) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Desktop Top Contact Bar */}
      <div id="desktop-top-contact-bar" className="hidden md:block bg-slate-900 text-slate-200 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300 font-medium">
            <span>📍 178 Osimen Street, Emaudo, Ekpoma, Edo State • Est. 1980</span>
          </div>
          <div id="header-contact-area" className="flex items-center gap-5">
            {/* Desktop Header WhatsApp Contact */}
            <a
              id="header-contact-whatsapp"
              href={SCHOOL_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-emerald-400 stroke-slate-900" />
              <span>WhatsApp: <strong className="text-white font-mono tracking-tight">{SCHOOL_CONTACT.whatsappDisplay}</strong></span>
            </a>

            <span className="text-slate-700">|</span>

            {/* Desktop Header Phone Call Contact */}
            <a
              id="header-contact-phone"
              href={SCHOOL_CONTACT.phoneTel}
              className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-medium transition-colors"
              title="Call School"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: <strong className="text-white font-mono tracking-tight">{SCHOOL_CONTACT.phoneDisplay}</strong></span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & School Identity */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none shrink-0"
            id="header-logo-btn"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="font-serif font-bold text-base sm:text-xl text-slate-900 tracking-tight leading-tight group-hover:text-emerald-700 transition-colors">
                Emaudo Secondary School
              </div>
              <div className="text-[10px] sm:text-xs font-semibold text-slate-500 tracking-wide uppercase">
                Ekpoma, Edo State • 1980
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === item.id
                    ? 'bg-emerald-50 text-emerald-800 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Header Direct Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <WhatsAppButton id="header-action-whatsapp" size="sm" />
            <CallButton id="header-action-call" size="sm" variant="navy" />
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <a
              href={SCHOOL_CONTACT.phoneTel}
              className="p-2 rounded-lg bg-slate-100 text-slate-800 sm:hidden"
              title="Call"
              aria-label="Call"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Dropdown Menu */}
      {mobileMenuOpen && (
        <div id="mobile-nav-menu" className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mb-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-emerald-50 text-emerald-800 font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Direct Buttons in Mobile Menu */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Instant Official Contact
            </div>
            <WhatsAppButton id="mobile-menu-whatsapp-btn" size="md" fullWidth showNumber />
            <CallButton id="mobile-menu-call-btn" size="md" variant="navy" fullWidth showNumber />
          </div>
        </div>
      )}
    </header>
  );
};
