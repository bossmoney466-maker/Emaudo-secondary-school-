import React from 'react';
import { MessageCircle, PhoneCall } from 'lucide-react';
import { SCHOOL_CONTACT } from '../../constants/contactInfo';

export const MobileContactBar: React.FC = () => {
  return (
    <aside
      id="mobile-contact-bar"
      aria-label="Quick contact bar"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-3 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-[max(0.625rem,env(safe-area-inset-bottom))]"
    >
      <div className="max-w-md mx-auto grid grid-cols-2 gap-2.5">
        {/* WhatsApp Button */}
        <a
          id="mobile-contact-bar-whatsapp"
          href={SCHOOL_CONTACT.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2.5 px-2 bg-emerald-600 active:bg-emerald-700 text-white rounded-xl shadow-sm transition-transform active:scale-[0.98]"
        >
          <div className="flex items-center gap-1.5 font-bold text-sm leading-tight">
            <MessageCircle className="w-4 h-4 fill-white stroke-emerald-600" />
            <span>WhatsApp</span>
          </div>
          <span className="text-[11px] font-medium text-emerald-100 mt-0.5 tracking-tight">
            +234 813 911 1765
          </span>
        </a>

        {/* Call School Button */}
        <a
          id="mobile-contact-bar-call"
          href={SCHOOL_CONTACT.phoneTel}
          className="flex flex-col items-center justify-center py-2.5 px-2 bg-slate-900 active:bg-slate-950 text-white rounded-xl shadow-sm transition-transform active:scale-[0.98]"
        >
          <div className="flex items-center gap-1.5 font-bold text-sm leading-tight">
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span>Call School</span>
          </div>
          <span className="text-[11px] font-medium text-slate-300 mt-0.5 tracking-tight">
            +234 813 911 1765
          </span>
        </a>
      </div>
    </aside>
  );
};
