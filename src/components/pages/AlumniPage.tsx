import React, { useState } from 'react';
import { 
  GraduationCap, 
  ExternalLink, 
  Heart, 
  Users, 
  BookOpen, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  MapPin, 
  Globe,
  Award,
  Calendar
} from 'lucide-react';
import { ESSOSA_DATA } from '../../data/schoolData';
import { WhatsAppButton } from '../common/WhatsAppButton';
import { CallButton } from '../common/CallButton';

export const AlumniPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    gradYear: '',
    phone: '',
    email: '',
    city: '',
    profession: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="space-y-16 py-10 pb-24">
      {/* Alumni Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Alumni Network • ESSOSA</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 leading-tight">
            Emaudo Secondary School Old Students Association
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-light">
            Connecting generations of graduates across Nigeria and the global diaspora. Together, we celebrate our shared heritage and support the continuing growth of our alma mater.
          </p>

          {/* Official ESSOSA External Links */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href={ESSOSA_DATA.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold shadow-md transition-all"
            >
              <Globe className="w-4 h-4" />
              <span>Official ESSOSA Portal</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <a
              href={ESSOSA_DATA.historyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-md transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>ESSOSA History</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <a
              href={ESSOSA_DATA.galleryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-sm font-bold shadow-xs transition-all"
            >
              <span>ESSOSA Gallery</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        </div>
      </section>

      {/* Alumni Mission & Impact Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span>The Spirit of Giving Back</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Proud Tradition of Alumni Leadership
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              {ESSOSA_DATA.mission}
            </p>
            <div className="pt-2 flex items-center gap-4">
              <WhatsAppButton id="alumni-whatsapp-contact" size="sm" />
              <CallButton id="alumni-call-contact" size="sm" variant="navy" />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300 mb-2">
              Key Alumni Contributions & Projects
            </h3>
            {ESSOSA_DATA.achievements.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESSOSA Chapters Network */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Active Regional Chapters
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Connect with Emaudo Secondary School old students in your metropolitan area or diaspora branch.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ESSOSA_DATA.chapters.map((ch, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-sm transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">{ch.city}</h3>
              <p className="text-xs text-slate-500 mb-4">{ch.contact}</p>
              <a
                href={ESSOSA_DATA.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
              >
                <span>Connect via ESSOSA</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Alumni Registration Form */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-900">
              Join the Alumni Directory
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Keep in touch with your set, participate in reunions, and mentor current students.
            </p>
          </div>

          {formSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3 animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-900">Registration Received!</h3>
              <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. Your alumni record has been logged. The ESSOSA chapter coordinator will reach out to welcome you.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ fullName: '', gradYear: '', phone: '', email: '', city: '', profession: '', message: '' });
                  }}
                  className="text-xs font-bold text-emerald-700 underline hover:text-emerald-900 cursor-pointer"
                >
                  Register Another Alumnus
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Osahon Okojie"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Graduation Year (Set) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1998, 2005, 2018"
                    value={formData.gradYear}
                    onChange={(e) => setFormData({ ...formData, gradYear: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 08012345678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Current City / Country *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ekpoma / London, UK"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Profession / Occupation
                </label>
                <input
                  type="text"
                  placeholder="e.g. Medical Doctor, Software Engineer, Teacher, Business Executive"
                  value={formData.profession}
                  onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Message or Areas You Wish to Support
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Interested in student career mentorship, science lab sponsorship, reunion planning..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Alumni Registration</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
