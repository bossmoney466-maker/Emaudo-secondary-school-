import React from 'react';
import { 
  Award, 
  BookOpen, 
  Compass, 
  ExternalLink, 
  FlaskConical, 
  GraduationCap, 
  HeartHandshake, 
  History, 
  Landmark, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Target, 
  Users 
} from 'lucide-react';
import { FounderSection } from '../common/FounderSection';
import { EssosaSection } from '../common/EssosaSection';
import { SchoolCrest } from '../common/SchoolCrest';
import { SCHOOL_INFO } from '../../constants/schoolData';
import { PageTab } from '../../types';

interface AboutPageProps {
  onNavigate: (tab: PageTab) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12">
      {/* Banner */}
      <section className="rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white p-6 sm:p-12 border border-blue-800 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>About Emaudo Secondary School</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Nurturing Minds, Building Character Since 1980
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
            Located in Emaudo, Ekpoma, Edo State, Emaudo Secondary School is dedicated to providing quality secondary education grounded in discipline, intellectual inquiry, and community values.
          </p>
        </div>
      </section>

      {/* Mission, Vision & Core Values */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 border border-blue-100 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Institutional Purpose</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            To provide a well-rounded secondary education that equips every student with scientific, literary, and moral competence for lifelong leadership.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 border border-amber-100 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Educational Heritage</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Preserving a rich tradition founded under Bendel State’s free education policy, continuing into the modern era with upgraded science facilities.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Core Principles</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Academic Excellence, Uncompromising Discipline, Integrity, Diligence, Scientific Curiosity, and Civic Responsibility.
          </p>
        </div>
      </section>

      {/* Founder Spotlight */}
      <FounderSection onExploreHistory={() => onNavigate('history')} />

      {/* Science & Arts Heritage */}
      <section className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
            Academic Pathways
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Science, Arts, and Commercial Traditions
          </h2>
          <p className="text-sm text-slate-600">
            Emaudo Secondary School has maintained historical strength in both Science and Arts streams, guiding students toward successful university admissions and professional careers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-blue-900 text-white">
                <FlaskConical className="w-5 h-5 text-amber-300" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                Sciences & Practical Experiments
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Strengthened by the 2017 Chevron-supported science laboratory complex, students engage in Physics, Chemistry, Biology, Agricultural Science, and Mathematics.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-amber-500 text-slate-950">
                <BookOpen className="w-5 h-5 text-slate-950" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                Arts, Humanities & Languages
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Focusing on English Language, Literature in English, Government, Civic Education, History, and Esan cultural heritage.
            </p>
          </div>
        </div>
      </section>

      {/* ESSOSA Alumni Section */}
      <EssosaSection />

      {/* School Location & Community Context */}
      <section className="rounded-2xl bg-slate-900 text-white p-6 sm:p-10 border border-slate-800 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Campus Location</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              178 Osimen Street, Emaudo, Ekpoma, Edo State
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Situated in the historical university and cultural town of Ekpoma, Edo State, Nigeria.
            </p>
          </div>

          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer shrink-0"
          >
            View Contact & Directions
          </button>
        </div>
      </section>
    </div>
  );
};
