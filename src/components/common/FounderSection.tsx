import React from 'react';
import { Award, BookOpen, Landmark, Sparkles, UserCheck } from 'lucide-react';

export const FounderSection: React.FC<{ onExploreHistory?: () => void }> = ({ onExploreHistory }) => {
  return (
    <section id="founder-section" className="my-12 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 text-white p-6 sm:p-10 border border-amber-500/30 shadow-xl overflow-hidden relative">
      {/* Decorative background aura */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Founder Portrait Badge */}
        <div className="lg:col-span-4 flex flex-col items-center text-center">
          <div className="w-48 h-56 sm:w-56 sm:h-64 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-amber-500/60 p-2 shadow-2xl flex flex-col items-center justify-center relative group overflow-hidden">
            <div className="w-full h-full rounded-xl bg-slate-950/80 border border-slate-700/60 flex flex-col items-center justify-center p-4 text-center">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 mb-3">
                <Landmark className="w-8 h-8 text-amber-400" />
              </div>
              <span className="text-xs font-bold text-amber-300 tracking-wider uppercase">
                Historical Founder
              </span>
              <span className="text-sm font-semibold text-slate-200 mt-1">
                Prof. Ambrose Alli
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">
                (1929 – 1989)
              </span>
              <div className="mt-3 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-[10px] text-amber-200">
                <UserCheck className="w-3 h-3 text-amber-400" /> Official Portrait Archive
              </div>
            </div>
            {/* Top gold bar */}
            <div className="absolute top-0 inset-x-0 h-1 bg-amber-400" />
          </div>
          <p className="text-xs text-slate-400 mt-3 font-medium">
            Governor of Bendel State (1979 – 1983)
          </p>
        </div>

        {/* Founder History & Vision Content */}
        <div className="lg:col-span-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Founder & Institutional Vision
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Professor Ambrose Folorunsho Alli
          </h2>
          <p className="text-sm font-medium text-amber-400 mt-1">
            Visionary Architect of Mass Secondary Education in Bendel State
          </p>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4">
            Emaudo Secondary School was established in <strong>1980</strong> in Emaudo, Ekpoma, under the visionary administration of <strong>Professor Ambrose Folorunsho Alli</strong>, the first Executive Governor of the former Bendel State of Nigeria (1979–1983).
          </p>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
            Governor Alli championed transformative educational reforms, including the landmark free-education policy that opened secondary and tertiary institutions to hundreds of thousands of youth across the region. Emaudo Secondary School was founded to deliver rigorous academic and character training to the sons and daughters of Ekpoma and beyond.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase">Free Education Heritage</h4>
                <p className="text-xs text-slate-300 mt-0.5">Democratizing secondary education across Bendel State in 1980.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase">Rapid Grade 1 Progress</h4>
                <p className="text-xs text-slate-300 mt-0.5">Advanced from Grade 3 to Grade 1 recognition by 1986.</p>
              </div>
            </div>
          </div>

          {onExploreHistory && (
            <div className="mt-6">
              <button
                id="btn-founder-explore-history"
                onClick={onExploreHistory}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg transition-colors cursor-pointer"
              >
                Read Full School History
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
