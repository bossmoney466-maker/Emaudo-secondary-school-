import React from 'react';
import { BookOpen, Flame, Sparkles } from 'lucide-react';

interface SchoolCrestProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'gold';
  showText?: boolean;
}

export const SchoolCrest: React.FC<SchoolCrestProps> = ({
  size = 'md',
  variant = 'light',
  showText = false
}) => {
  const sizeMap = {
    sm: { container: 'w-10 h-10', icon: 'w-5 h-5', text: 'text-xs' },
    md: { container: 'w-14 h-14', icon: 'w-7 h-7', text: 'text-sm' },
    lg: { container: 'w-20 h-20', icon: 'w-10 h-10', text: 'text-base' },
    xl: { container: 'w-28 h-28', icon: 'w-14 h-14', text: 'text-lg' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className="inline-flex items-center gap-3">
      <div 
        className={`relative ${currentSize.container} rounded-xl bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 border-2 border-amber-500/80 shadow-md flex items-center justify-center text-amber-400 select-none overflow-hidden group`}
        title="Emaudo Secondary School Crest (Temporary Insignia)"
      >
        {/* Subtle geometric shield pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.15)_0,transparent_70%)]" />
        <div className="absolute top-0 inset-x-0 h-1 bg-amber-400/60" />
        
        {/* Core Insignia Graphics */}
        <div className="relative flex flex-col items-center justify-center">
          <div className="flex items-center gap-0.5 text-amber-400">
            <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-500 animate-pulse" />
          </div>
          <BookOpen className={`${currentSize.icon} text-amber-300 drop-shadow`} />
          <span className="text-[8px] font-black tracking-widest text-amber-200 mt-0.5 uppercase">
            1980
          </span>
        </div>

        {/* Outer subtle gold ring highlight */}
        <div className="absolute inset-0 rounded-xl border border-amber-400/20 pointer-events-none" />
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-extrabold tracking-tight text-slate-900 leading-tight uppercase text-sm sm:text-base">
            Emaudo Secondary School
          </span>
          <span className="text-xs font-semibold text-amber-700 tracking-wider uppercase">
            Ekpoma, Edo State • Est. 1980
          </span>
        </div>
      )}
    </div>
  );
};
