import React, { useEffect, useState } from 'react';
import officialBadgeImg from '../../assets/images/official_emaudo_badge_1787949460001.jpg';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
  durationMs?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ 
  onFinish, 
  durationMs = 3200 
}) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'enter' | 'revealed' | 'exiting'>('enter');

  useEffect(() => {
    // Stage 1: Entrance and text reveal
    const revealTimer = setTimeout(() => {
      setStage('revealed');
    }, 600);

    // Progress bar increment over ~3 seconds
    const intervalTime = 40;
    const increment = (100 / (durationMs / intervalTime));
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    // Stage 2: Exit transition
    const exitTimer = setTimeout(() => {
      setStage('exiting');
    }, durationMs - 400);

    // Final finish call
    const finishTimer = setTimeout(() => {
      onFinish();
    }, durationMs);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
      clearInterval(progressInterval);
    };
  }, [onFinish, durationMs]);

  return (
    <div 
      id="emaudo-splash-screen"
      onClick={onFinish}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-10 select-none bg-gradient-to-b from-emerald-950 via-slate-950 to-emerald-950 text-white transition-opacity duration-500 cursor-pointer overflow-hidden ${
        stage === 'exiting' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top subtle brand badge */}
      <div className="w-full flex items-center justify-between max-w-5xl pt-2 animate-in fade-in duration-700">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400/90">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Official Portal</span>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onFinish();
          }}
          className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[11px] font-bold tracking-wider text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer border border-white/10"
        >
          <span>Skip</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Centerpiece: Official Crest & Name Reveal */}
      <div className="flex flex-col items-center text-center max-w-xl mx-auto my-auto space-y-6">
        {/* Logo Container with Smooth Fade-in and Gentle Zoom */}
        <div className="relative">
          {/* Glowing Aura Rings */}
          <div className="absolute -inset-4 rounded-3xl bg-amber-400/20 blur-xl animate-pulse" />
          <div className="absolute -inset-8 rounded-full bg-emerald-500/10 blur-2xl" />

          {/* Official Unmodified Logo */}
          <div className="relative w-36 h-44 sm:w-44 sm:h-52 rounded-2xl bg-white p-2.5 shadow-2xl border-4 border-amber-400/80 transform transition-all duration-1000 ease-out hover:scale-105">
            <img
              src={officialBadgeImg}
              alt="Emaudo Secondary School Official Crest"
              className="w-full h-full object-contain filter drop-shadow-md rounded-xl"
            />
          </div>
        </div>

        {/* Text Reveal Block */}
        <div className="space-y-2.5">
          <h1 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-white drop-shadow-sm transition-all duration-700">
            Emaudo Secondary School
          </h1>

          <p className="text-xs sm:text-base font-semibold tracking-wide text-amber-300 drop-shadow">
            Ekpoma, Edo State, Nigeria
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-[11px] sm:text-xs font-bold text-slate-200 uppercase tracking-widest mt-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Established 1980</span>
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar & Loading Indicator */}
      <div className="w-full max-w-md space-y-3 pb-4 flex flex-col items-center">
        {/* Elegant Golden Progress Bar */}
        <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden border border-white/10 p-0.5">
          <div 
            className="h-full bg-gradient-to-r from-emerald-400 via-amber-400 to-amber-300 rounded-full transition-all duration-75 ease-linear shadow-[0_0_12px_rgba(251,191,36,0.6)]"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-full text-[11px] text-slate-400 font-medium px-1">
          <span className="animate-pulse">Loading school resources...</span>
          <span className="font-mono text-amber-300/90 font-bold">{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
};
