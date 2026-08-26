import React from 'react';
import { MapPin, Mail, MessageCircle, PhoneCall, ArrowUpRight, Copy, Check } from 'lucide-react';
import { SCHOOL_CONTACT } from '../../constants/contactInfo';
import { WhatsAppButton } from './WhatsAppButton';
import { CallButton } from './CallButton';

interface OfficialContactCardProps {
  id?: string;
  className?: string;
  variant?: 'featured' | 'compact' | 'standard';
}

export const OfficialContactCard: React.FC<OfficialContactCardProps> = ({
  id = 'official-contact-card',
  className = '',
  variant = 'standard',
}) => {
  const [copiedField, setCopiedField] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div
      id={id}
      className={`rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">Official Contact Details</div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-1">
            {SCHOOL_CONTACT.schoolName}
          </h3>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-semibold border border-emerald-100">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Verified Channels
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* WhatsApp Official Section */}
        <div
          id="contact-box-whatsapp"
          className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 transition-colors hover:bg-emerald-50"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm">
              <span className="text-lg leading-none" role="img" aria-label="WhatsApp">💬</span>
              <span>WhatsApp</span>
            </div>
            <button
              onClick={() => copyToClipboard(SCHOOL_CONTACT.whatsappDisplay, 'whatsapp')}
              title="Copy WhatsApp number"
              className="text-emerald-700 hover:text-emerald-900 p-1 rounded hover:bg-emerald-100/70 transition-colors text-xs flex items-center gap-1"
            >
              {copiedField === 'whatsapp' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[11px] font-medium text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-medium">Copy</span>
                </>
              )}
            </button>
          </div>
          <div className="mt-2">
            <a
              href={SCHOOL_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg sm:text-xl font-mono font-bold text-slate-900 hover:text-emerald-700 flex items-center gap-1.5 transition-colors group"
            >
              {SCHOOL_CONTACT.whatsappDisplay}
              <ArrowUpRight className="w-4 h-4 text-emerald-600 opacity-70 group-hover:opacity-100 transition-opacity" />
            </a>
            <p className="text-xs text-slate-600 mt-1">
              Click to open WhatsApp chat with pre-filled enquiry message.
            </p>
          </div>
          <div className="mt-3">
            <WhatsAppButton id="card-whatsapp-action" size="sm" fullWidth />
          </div>
        </div>

        {/* Phone Call Official Section */}
        <div
          id="contact-box-phone"
          className="p-4 rounded-xl bg-slate-50 border border-slate-200 transition-colors hover:bg-slate-100/70"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
              <span className="text-lg leading-none" role="img" aria-label="Phone Call">📞</span>
              <span>Phone Call</span>
            </div>
            <button
              onClick={() => copyToClipboard(SCHOOL_CONTACT.phoneDisplay, 'phone')}
              title="Copy phone number"
              className="text-slate-600 hover:text-slate-900 p-1 rounded hover:bg-slate-200/70 transition-colors text-xs flex items-center gap-1"
            >
              {copiedField === 'phone' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[11px] font-medium text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-medium">Copy</span>
                </>
              )}
            </button>
          </div>
          <div className="mt-2">
            <a
              href={SCHOOL_CONTACT.phoneTel}
              className="text-lg sm:text-xl font-mono font-bold text-slate-900 hover:text-blue-700 flex items-center gap-1.5 transition-colors group"
            >
              {SCHOOL_CONTACT.phoneDisplay}
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-600 opacity-70 group-hover:opacity-100 transition-opacity" />
            </a>
            <p className="text-xs text-slate-600 mt-1">
              Direct mobile line for general admissions & school inquiries.
            </p>
          </div>
          <div className="mt-3">
            <CallButton id="card-call-action" size="sm" fullWidth />
          </div>
        </div>
      </div>

      {/* Address & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-sm">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0 mt-0.5">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-slate-900 mb-0.5">Campus Location</div>
            <div className="text-slate-600 leading-relaxed">
              {SCHOOL_CONTACT.addressLines.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-700 shrink-0 mt-0.5">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-slate-900 mb-0.5">Official Email</div>
            <div className="text-slate-600 font-mono text-sm">
              {SCHOOL_CONTACT.email}
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Verified channel placeholder as requested.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
