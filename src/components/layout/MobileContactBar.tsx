import React from 'react';
import { MessageCircle, Phone, FileText, Globe } from 'lucide-react';
import { SCHOOL_INFO } from '../../constants/schoolData';
import { PageTab } from '../../types';

interface MobileContactBarProps {
  onNavigate: (tab: PageTab) => void;
}

export const MobileContactBar: React.FC<MobileContactBarProps> = ({ onNavigate }) => {
  return (
    <aside 
      id="mobile-quick-contact-bar"
      aria-label="Mobile Quick Contact Actions"
      className="fixed bottom-0 inset-x-0 z-30 sm:hidden bg-slate-900/95 backdrop-blur-md border-t border-amber-500/30 px-3 py-2 flex items-center justify-between gap-2 shadow-2xl"
    >
      {/* WhatsApp Action */}
      <a
        id="mobile-btn-whatsapp"
        href={SCHOOL_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-emerald-600 active:bg-emerald-700 text-white text-xs font-bold shadow-md transition-colors"
      >
        <MessageCircle className="w-4 h-4 fill-white/20" />
        <span>WhatsApp</span>
      </a>

      {/* Direct Call Action */}
      <a
        id="mobile-btn-call"
        href={SCHOOL_INFO.phoneTel}
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-blue-900 active:bg-blue-800 text-white text-xs font-bold border border-blue-700 shadow-md transition-colors"
      >
        <Phone className="w-3.5 h-3.5" />
        <span>Call</span>
      </a>

      {/* Admission Enquiry Navigation */}
      <button
        id="mobile-btn-admissions"
        onClick={() => onNavigate('admissions')}
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-amber-500 active:bg-amber-600 text-slate-950 text-xs font-black shadow-md transition-colors cursor-pointer"
      >
        <FileText className="w-3.5 h-3.5" />
        <span>Admissions</span>
      </button>

      {/* ESSOSA Alumni Link */}
      <a
        id="mobile-btn-essosa"
        href={SCHOOL_INFO.essosaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-white/10 active:bg-white/20 text-amber-300 border border-white/10 flex items-center justify-center"
        title="ESSOSA Alumni"
      >
        <Globe className="w-4 h-4" />
      </a>
    </aside>
  );
};
