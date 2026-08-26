import React from 'react';
import { 
  Award, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  ExternalLink, 
  Globe, 
  Heart, 
  HeartHandshake, 
  History, 
  Image as ImageIcon, 
  ShieldCheck, 
  Sparkles, 
  Users 
} from 'lucide-react';
import { EssosaSection } from '../common/EssosaSection';
import { SCHOOL_INFO } from '../../constants/schoolData';
import { PageTab } from '../../types';

interface EssosaPageProps {
  onNavigate: (tab: PageTab) => void;
}

export const EssosaPage: React.FC<EssosaPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12">
      {/* Header Banner */}
      <section className="rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white p-6 sm:p-12 border border-blue-800 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Alumni Community</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Emaudo Secondary School Old Students Association
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
            Connecting generations of graduates from the 1980 inaugural class to modern alumni, fostering lifelong camaraderie and institutional advancement.
          </p>

          <div className="pt-2">
            <a
              id="btn-essosa-hero-visit"
              href={SCHOOL_INFO.essosaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-xl transition-all hover:scale-105 cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span>Visit Official ESSOSA Website</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Main ESSOSA Section Card Component */}
      <EssosaSection />

      {/* Pillars of Alumni Collaboration */}
      <section className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            Alumni Impact & Objectives
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How ESSOSA Champions Emaudo Secondary School
          </h2>
          <p className="text-sm text-slate-600">
            From mentoring current students to supporting laboratory equipment and classroom upgrades, old students play a vital role in the school’s enduring legacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Student Mentorship</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Career guidance, university preparation seminars, and motivational interactions led by accomplished alumni across various industries.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Academic Awards</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Annual prizes and scholarships for top-performing students in WAEC/NECO examinations and science laboratory competitions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Infrastructure Support</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Partnering with corporate bodies and donors to maintain school facilities, sports grounds, and educational materials.
            </p>
          </div>
        </div>
      </section>

      {/* Graduation Sets Guidance */}
      <section className="rounded-2xl bg-slate-900 text-white p-6 sm:p-10 border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Graduation Set Registration
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Register Your Set on the Official ESSOSA Portal
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Whether you graduated in the pioneer 1985 set or recent years, join your set coordinator and fellow alumni worldwide.
          </p>
        </div>

        <a
          href={SCHOOL_INFO.essosaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer shrink-0 inline-flex items-center gap-2"
        >
          <Globe className="w-4 h-4" />
          <span>Access ESSOSA Portal</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </section>
    </div>
  );
};
