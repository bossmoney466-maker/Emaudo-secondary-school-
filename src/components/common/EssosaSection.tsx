import React from 'react';
import { ExternalLink, Globe, HeartHandshake, History, Image as ImageIcon, Users } from 'lucide-react';
import { SCHOOL_INFO } from '../../constants/schoolData';

export const EssosaSection: React.FC = () => {
  return (
    <section id="essosa-alumni-section" className="my-10 rounded-2xl bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white p-6 sm:p-10 border border-blue-800 shadow-xl relative overflow-hidden">
      {/* Decorative background aura */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Users className="w-3.5 h-3.5" /> Alumni Network
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Emaudo Secondary School Old Students Association (ESSOSA)
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Uniting decades of alumni across Nigeria and the global diaspora in support of alma mater excellence.
            </p>
          </div>

          <a
            id="btn-visit-essosa-main"
            href={SCHOOL_INFO.essosaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Globe className="w-4 h-4" />
            Visit ESSOSA Website
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* 3 Verified ESSOSA Portal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <a
            href={SCHOOL_INFO.essosaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 mb-3 group-hover:scale-110 transition-transform">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                Official ESSOSA Portal
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Connect with chapters, register your graduation set, and participate in alumni development forums.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 mt-4 group-hover:underline">
              emaudooldstudents.org <ExternalLink className="w-3 h-3" />
            </span>
          </a>

          <a
            href={SCHOOL_INFO.essosaHistoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-3 group-hover:scale-110 transition-transform">
                <History className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                ESSOSA School History
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Explore archival records, pioneering sets from 1980 onwards, and documented school heritage.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 mt-4 group-hover:underline">
              Alumni History Archive <ExternalLink className="w-3 h-3" />
            </span>
          </a>

          <a
            href={SCHOOL_INFO.essosaGalleryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 mb-3 group-hover:scale-110 transition-transform">
                <ImageIcon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                ESSOSA Photo Gallery
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                View historic photo collections, reunions, campus development, and alumni celebrations.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 mt-4 group-hover:underline">
              Alumni Photo Gallery <ExternalLink className="w-3 h-3" />
            </span>
          </a>
        </div>

        {/* Supporting notice */}
        <div className="mt-6 flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
          <HeartHandshake className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            Are you an alumnus of Emaudo Secondary School? Join ESSOSA to mentor current students and contribute to ongoing school development initiatives.
          </span>
        </div>
      </div>
    </section>
  );
};
