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
  Globe 
} from 'lucide-react';
import { SCHOOL_CONTACT } from '../../constants/contactInfo';
import { ESSOSA_DATA } from '../../data/schoolData';
import { PageTab } from '../../types';

interface FooterProps {
  onTabChange: (tab: PageTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onTabChange }) => {
  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-300 border-t-2 border-emerald-600/50 pt-12 pb-24 sm:pb-12 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          
          {/* Column 1: School Identity & Heritage */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-sm">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white tracking-tight uppercase">
                  Emaudo Secondary School
                </h3>
                <p className="text-xs font-semibold text-emerald-400">
                  Ekpoma, Edo State • Est. 1980
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Established in 1980 under the landmark education vision of Professor Ambrose Folorunsho Alli, Governor of Bendel State (1979–1983). Over four decades of disciplined scholarship, academic excellence, and character formation.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-emerald-300">
              <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />
              <span>Modern Science, Computer & Technical Laboratories</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onTabChange('home')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('about')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  About & History
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('academics')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Academics & Curricula
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('admissions')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Admissions Enquiry
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('gallery')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Photo Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('news')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  News & Calendar
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: ESSOSA Alumni & Portals */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center gap-1.5">
              <span>ESSOSA & Portals</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={ESSOSA_DATA.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Official ESSOSA Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={ESSOSA_DATA.historyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-slate-300 hover:text-white"
                >
                  <span>ESSOSA History Archive</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={ESSOSA_DATA.galleryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-slate-300 hover:text-white"
                >
                  <span>ESSOSA Photo Gallery</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="pt-2">
                <button 
                  onClick={() => onTabChange('portal')} 
                  className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-bold cursor-pointer"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Student / Parent Portal</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onTabChange('admin')} 
                  className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Management</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Contact Information */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Official Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  178 Osimen Street, Emaudo, Ekpoma, Edo State, Nigeria
                </span>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={SCHOOL_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline font-bold"
                >
                  {SCHOOL_CONTACT.whatsappDisplay} (WhatsApp)
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={SCHOOL_CONTACT.phoneTel} className="text-slate-200 hover:underline font-bold">
                  {SCHOOL_CONTACT.phoneDisplay} (Phone Call)
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-slate-400">{SCHOOL_CONTACT.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Attribution & Verification Notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} EMAUDO SECONDARY SCHOOL, Ekpoma, Edo State. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-[11px]">
            <span>Founded 1980 by Prof. Ambrose Alli • Over 4 Decades of Excellence</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
