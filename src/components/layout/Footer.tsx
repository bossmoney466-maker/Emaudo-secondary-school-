import React from 'react';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Mail, 
  ExternalLink, 
  GraduationCap,
  FlaskConical, 
  ShieldCheck, 
  Globe, 
  Sparkles,
  BookOpen,
  Award,
  Users,
  Clock
} from 'lucide-react';
import { SCHOOL_CONTACT } from '../../constants/contactInfo';
import { ESSOSA_DATA } from '../../data/schoolData';
import { PageTab } from '../../types';
import { SchoolCrest } from '../common/SchoolCrest';

interface FooterProps {
  onTabChange: (tab: PageTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onTabChange }) => {
  return (
    <footer id="main-footer" className="bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-950 text-slate-300 border-t-2 border-amber-500/40 pt-16 pb-24 sm:pb-14 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Highlight Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-emerald-900/40 border border-emerald-500/30 backdrop-blur-md mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Admissions & Enquiries Open</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-serif">
              Begin Your Child’s Journey to Academic Distinction
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Equipping students in Ekpoma, Edo State with disciplined character, hands-on science mastery, and competitive leadership since 1980.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onTabChange('admissions')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-xl transition-all hover:scale-[1.02] cursor-pointer"
            >
              Apply for Admission
            </button>
            <a
              href={SCHOOL_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-emerald-900/40">
          
          {/* Column 1: School Heritage & Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <SchoolCrest size="sm" variant="uniform" imageOnly className="w-12 h-12 border-2 border-amber-400/60" />
              <div>
                <h3 className="font-serif font-black text-base sm:text-lg text-white tracking-tight uppercase">
                  Emaudo Secondary School
                </h3>
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Ekpoma, Edo State • Est. 1980
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Founded in 1980 under the pioneering education policies of <strong>Professor Ambrose Folorunsho Alli</strong>, Governor of Bendel State (1979–1983). Over 45 years of continuous academic excellence, moral discipline, and high-impact alumni mentorship.
            </p>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-2.5">
              <FlaskConical className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Chevron Science Complex:</strong> Ultra-modern physics, chemistry, and biology laboratories commissioned for hands-on STEM inquiry.
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links & Academics */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider border-b border-emerald-900/60 pb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Academics</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onTabChange('home')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('about')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  About Our School
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('history')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  School History & Founder
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('academics')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Curriculum & Syllabi
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onTabChange('learning-centre')} 
                  className="text-amber-400 font-bold hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Free Learning Centre</span>
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('departments')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Academic Departments
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('activities')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Clubs & Extracurriculars
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Institutional Portals & Alumni */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider border-b border-emerald-900/60 pb-2 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
              <span>Portals & Alumni</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onTabChange('portal')} 
                  className="flex items-center gap-2 text-emerald-300 hover:text-white font-bold cursor-pointer transition-colors"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Student & Parent Portal</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onTabChange('admin')} 
                  className="flex items-center gap-2 text-amber-300 hover:text-white font-bold cursor-pointer transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin & Faculty Portal</span>
                </button>
              </li>
              <li className="pt-2">
                <a
                  href={ESSOSA_DATA.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-300 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ESSOSA Alumni Website</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <button onClick={() => onTabChange('gallery')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Campus Photo Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('news')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  News & Term Announcements
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Contact & Location */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider border-b border-emerald-900/60 pb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Contact Information</span>
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  178 Osimen Street, Emaudo, Ekpoma, Edo State, Nigeria
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={SCHOOL_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 hover:underline font-bold"
                >
                  {SCHOOL_CONTACT.whatsappDisplay} (WhatsApp)
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={SCHOOL_CONTACT.phoneTel} className="text-slate-200 hover:text-white hover:underline font-bold">
                  {SCHOOL_CONTACT.phoneDisplay} (Direct Call)
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-slate-400">{SCHOOL_CONTACT.email}</span>
              </div>

              <div className="flex items-center gap-2.5 text-[11px] text-slate-400 pt-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Office Hours: Mon – Fri (7:30 AM – 3:30 PM)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Rights & Attribution Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} EMAUDO SECONDARY SCHOOL, Ekpoma, Edo State. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Grade-One Status (1986)</span>
            <span>•</span>
            <span>Motto: Success Through Education</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
