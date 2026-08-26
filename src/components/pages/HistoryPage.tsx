import React from 'react';
import { 
  Award, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  ExternalLink, 
  FileText, 
  FlaskConical, 
  GraduationCap, 
  History, 
  Landmark, 
  Sparkles, 
  Users 
} from 'lucide-react';
import { FounderSection } from '../common/FounderSection';
import { HistoryTimeline } from '../common/HistoryTimeline';
import { EssosaSection } from '../common/EssosaSection';
import { SCHOOL_INFO } from '../../constants/schoolData';
import { PageTab } from '../../types';

interface HistoryPageProps {
  onNavigate: (tab: PageTab) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12">
      {/* Header Banner */}
      <section className="rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white p-6 sm:p-12 border border-blue-800 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <History className="w-3.5 h-3.5 text-amber-400" />
            <span>Documented Institutional Heritage</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            A Legacy of Education in Ekpoma
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
            Established in 1980, Emaudo Secondary School represents over four decades of academic rigour, discipline, community leadership, and character formation in the heart of Edo State.
          </p>
        </div>
      </section>

      {/* Founder Profile & Historical Context */}
      <FounderSection />

      {/* Detailed Chronological History Narrative */}
      <section className="space-y-8 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            Verified Archives & Milestones
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Four Decades of Educational Evolution
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            The history of Emaudo Secondary School is deeply intertwined with the educational history of Bendel State and Edo State. Below is the documented trajectory of the school from 1980 to the present day.
          </p>
        </div>

        {/* Story Section 1: 1980 Foundation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="lg:col-span-3">
            <div className="p-4 rounded-xl bg-blue-900 text-amber-300 text-center font-black">
              <span className="text-2xl block">1980</span>
              <span className="text-[11px] font-semibold text-white uppercase tracking-wider">
                Foundation Year
              </span>
            </div>
          </div>
          <div className="lg:col-span-9 space-y-2">
            <h3 className="text-lg font-bold text-slate-900">
              Establishment under the Administration of Professor Ambrose Folorunsho Alli
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Emaudo Secondary School was established in 1980 in Emaudo, Ekpoma, in the former Bendel State of Nigeria. The school was founded during the administration of Professor Ambrose Folorunsho Alli, who served as Governor of Bendel State from 1979 to 1983, as part of the visionary expansion of secondary education associated with his educational policies and free-education programme.
            </p>
          </div>
        </div>

        {/* Story Section 2: 1985 Pioneer Graduation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="lg:col-span-3">
            <div className="p-4 rounded-xl bg-amber-500 text-slate-950 text-center font-black">
              <span className="text-2xl block">1985</span>
              <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                Pioneer Graduates
              </span>
            </div>
          </div>
          <div className="lg:col-span-9 space-y-2">
            <h3 className="text-lg font-bold text-slate-900">
              The First Graduating Students
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Five years after its inaugural intake, the school celebrated a monumental milestone in 1985 as its pioneer students successfully completed their secondary school curriculum and graduated, stepping into higher institutions and the workforce.
            </p>
          </div>
        </div>

        {/* Story Section 3: 1986 Grade-One Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="lg:col-span-3">
            <div className="p-4 rounded-xl bg-blue-900 text-amber-300 text-center font-black">
              <span className="text-2xl block">1986</span>
              <span className="text-[11px] font-semibold text-white uppercase tracking-wider">
                Grade 1 Elevation
              </span>
            </div>
          </div>
          <div className="lg:col-span-9 space-y-2">
            <h3 className="text-lg font-bold text-slate-900">
              Progression from Grade-Three to Grade-One School
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              By 1986, through rapid academic achievement, qualified instructional leadership, and disciplined examination performance, Emaudo Secondary School progressed from a grade-three school to a premier grade-one school.
            </p>
          </div>
        </div>

        {/* Story Section 4: 2017 Science Lab Complex */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 rounded-2xl bg-emerald-50 border border-emerald-200">
          <div className="lg:col-span-3">
            <div className="p-4 rounded-xl bg-emerald-700 text-white text-center font-black">
              <span className="text-2xl block">2017</span>
              <span className="text-[11px] font-semibold text-emerald-100 uppercase tracking-wider">
                Science Lab
              </span>
            </div>
          </div>
          <div className="lg:col-span-9 space-y-2">
            <h3 className="text-lg font-bold text-emerald-950">
              Ultra-Modern Science Laboratory Complex Supported by Chevron & Partners
            </h3>
            <p className="text-sm text-emerald-900 leading-relaxed">
              In 2017, an ultra-modern science laboratory complex was constructed at Emaudo Secondary School with the generous support of Chevron and its joint-venture partners, and officially inaugurated. The laboratory complex upgraded experimental learning for biology, chemistry, and physics.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive History Timeline Component */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            Interactive Chronology
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Explore Key Historical Milestones
          </h2>
          <p className="text-sm text-slate-600">
            Click on any milestone to view archival details and historical records.
          </p>
        </div>

        <HistoryTimeline />
      </section>

      {/* ESSOSA Alumni Connection */}
      <EssosaSection />
    </div>
  );
};
