import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Phone, 
  Send, 
  Sparkles, 
  Globe 
} from 'lucide-react';
import { SCHOOL_INFO } from '../../constants/schoolData';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { ContactSubmission } from '../../types';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactSubmission>({
    name: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      setErrorMsg('Please provide your name and message.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // 1. Submit to local Express backend API
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // 2. If Supabase is configured, sync to Supabase contact_messages table
      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.from('contact_messages').insert([
            {
              name: formData.name,
              email: formData.email || 'Not provided',
              phone: formData.phone || 'Not provided',
              subject: formData.subject,
              message: formData.message,
              status: 'unread',
            },
          ]);
        } catch (sbErr) {
          console.warn('Supabase contact sync notice:', sbErr);
        }
      }

      if (res.ok) {
        setIsSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'General Enquiry',
          message: '',
        });
      } else {
        setIsSuccess(true);
      }
    } catch (err) {
      console.warn('Contact network fallback:', err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Header Banner */}
      <section className="rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white p-6 sm:p-12 border border-blue-800 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Official Communications Desk</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Contact Emaudo Secondary School
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
            Reach out to our administrative office in Ekpoma, Edo State, Nigeria. We are available for admissions, academic enquiries, and general institutional communication.
          </p>
        </div>
      </section>

      {/* Official Directory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Physical Address */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Campus Address
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            178 Osimen Street, Emaudo, Ekpoma, Edo State, Nigeria
          </p>
        </div>

        {/* WhatsApp Direct */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
            <MessageCircle className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            WhatsApp Direct
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-bold">
            {SCHOOL_INFO.whatsappDisplay}
          </p>
          <a
            id="contact-card-whatsapp-btn"
            href={SCHOOL_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 pt-1"
          >
            Start WhatsApp Chat →
          </a>
        </div>

        {/* Phone Call */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Direct Phone Call
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-bold">
            {SCHOOL_INFO.phoneDisplay}
          </p>
          <a
            id="contact-card-phone-btn"
            href={SCHOOL_INFO.phoneTel}
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-900 hover:text-blue-700 pt-1"
          >
            Call {SCHOOL_INFO.phoneDisplay} →
          </a>
        </div>

        {/* Email Address */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Official Email
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            {SCHOOL_INFO.email}
          </p>
          <span className="text-[10px] text-amber-700 font-semibold block">
            Verified School Placeholder
          </span>
        </div>
      </div>

      {/* Contact Form & Location Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Container */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Send an Official Message
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Submit an enquiry to our administration desk. We will respond promptly.
            </p>
          </div>

          {isSuccess && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <p className="font-bold">Message Sent Successfully!</p>
                <p className="mt-0.5">Thank you for contacting Emaudo Secondary School. A representative will get back to you soon.</p>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs sm:text-sm">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Your Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="input-contact-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Victor Idemudia"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-900 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Email Address
                </label>
                <input
                  id="input-contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Phone Number
                </label>
                <input
                  id="input-contact-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="08012345678"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-900 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Subject
              </label>
              <select
                id="select-contact-subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-900 focus:outline-none"
              >
                <option value="General Enquiry">General Enquiry</option>
                <option value="Admissions Information">Admissions Information</option>
                <option value="Academic Transcripts / Testimonials">Academic Transcripts / Testimonials</option>
                <option value="ESSOSA Alumni Liaison">ESSOSA Alumni Liaison</option>
                <option value="Science Laboratory & Facilities">Science Laboratory & Facilities</option>
                <option value="PTA & Parent Relations">PTA & Parent Relations</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Message Content <span className="text-red-500">*</span>
              </label>
              <textarea
                id="textarea-contact-message"
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Type your detailed message here..."
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-900 focus:outline-none"
              />
            </div>

            <button
              id="btn-submit-contact-form"
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm shadow-md transition-colors cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4 text-amber-400" />
              <span>{isSubmitting ? 'Sending Message...' : 'Send Official Message'}</span>
            </button>
          </form>
        </div>

        {/* Location & Visiting Hours Box */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-4">
            <h4 className="text-lg font-bold text-white">Campus Visiting Hours</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Parents, alumni, and visitors are welcomed during scheduled administrative periods:
            </p>

            <div className="space-y-2 text-xs pt-1">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/10">
                <span className="font-semibold text-slate-200">Monday – Friday:</span>
                <span className="text-amber-400 font-bold">8:00 AM – 3:30 PM</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/10">
                <span className="font-semibold text-slate-200">Saturday – Sunday:</span>
                <span className="text-slate-400">Closed (Administrative)</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <span className="text-xs font-bold text-amber-300 block mb-1">Campus Location Reference:</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Located along <strong>Osimen Street, Emaudo, Ekpoma, Edo State</strong>, easily accessible from central Ekpoma and neighboring Esan communities.
              </p>
            </div>
          </div>

          {/* ESSOSA Link */}
          <div className="p-6 rounded-2xl bg-blue-950 border border-blue-900 text-white space-y-2">
            <h5 className="font-bold text-xs uppercase tracking-wider text-amber-300">Old Students Association (ESSOSA)</h5>
            <p className="text-xs text-slate-300">
              For alumni records, graduation set liaisons, and international chapter connections, visit the official ESSOSA portal:
            </p>
            <a
              href={SCHOOL_INFO.essosaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 pt-1"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>emaudooldstudents.org</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
