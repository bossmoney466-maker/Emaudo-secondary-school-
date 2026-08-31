import React, { useState } from 'react';
import officialBadgeImg from '../../assets/images/official_emaudo_badge_1787949460001.jpg';

export interface SchoolCrestProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hero';
  variant?: 'light' | 'dark' | 'gold' | 'clean' | 'badge' | 'print' | 'uniform';
  showText?: boolean;
  textSubtitle?: string;
  className?: string;
  imageOnly?: boolean;
  priority?: boolean;
}

/**
 * Official Vector Badge SVG representing the authentic Emaudo Senior Secondary School, Ekpoma pocket badge
 */
export const OfficialEmaudoBadgeSVG: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg 
    viewBox="0 0 200 240" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Emaudo Senior Secondary School Ekpoma Official Crest"
  >
    <defs>
      <filter id="crestGlow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#064e3b" floodOpacity="0.2"/>
      </filter>
    </defs>

    {/* Outer Shield Container */}
    <g filter="url(#crestGlow)">
      <path 
        d="M 24 20 L 176 20 C 184 20 190 26 190 34 L 190 118 C 190 166 100 202 100 202 C 100 202 10 166 10 118 L 10 34 C 10 26 16 20 24 20 Z" 
        fill="#FFFFFF" 
        stroke="#047857" 
        strokeWidth="4" 
      />
      <path 
        d="M 28 24 L 172 24 C 178 24 184 30 184 36 L 184 116 C 184 159 100 194 100 194 C 100 194 16 159 16 116 L 16 36 C 16 30 22 24 28 24 Z" 
        fill="none" 
        stroke="#065f46" 
        strokeWidth="1.5" 
      />
    </g>

    {/* Top Inscription */}
    <text x="100" y="44" fontFamily="system-ui, -apple-system, sans-serif" fontSize="12" fontWeight="900" fill="#047857" textAnchor="middle" letterSpacing="1.2">
      EMAUDO SENIOR
    </text>
    <text x="100" y="58" fontFamily="system-ui, -apple-system, sans-serif" fontSize="9.5" fontWeight="900" fill="#047857" textAnchor="middle" letterSpacing="1.2">
      SEC. SCH. EKPOMA
    </text>

    {/* Divider */}
    <line x1="26" y1="64" x2="174" y2="64" stroke="#047857" strokeWidth="1.5" strokeDasharray="3,2" />

    {/* 4 Quadrant Letters: E - S - S - S */}
    <text x="100" y="82" fontFamily="system-ui, -apple-system, sans-serif" fontSize="16" fontWeight="900" fill="#047857" textAnchor="middle">
      E
    </text>
    <text x="50" y="119" fontFamily="system-ui, -apple-system, sans-serif" fontSize="16" fontWeight="900" fill="#047857" textAnchor="middle">
      S
    </text>
    <text x="150" y="119" fontFamily="system-ui, -apple-system, sans-serif" fontSize="16" fontWeight="900" fill="#047857" textAnchor="middle">
      S
    </text>
    <text x="100" y="156" fontFamily="system-ui, -apple-system, sans-serif" fontSize="16" fontWeight="900" fill="#047857" textAnchor="middle">
      S
    </text>

    {/* Central Green Diamond with Open Book */}
    <polygon points="100,86 136,115 100,144 64,115" fill="#047857" stroke="#065f46" strokeWidth="2" />
    <polygon points="100,89 132,115 100,141 68,115" fill="none" stroke="#A7F3D0" strokeWidth="1" />

    {/* White Open Book Symbol in Diamond */}
    <g fill="#FFFFFF" transform="translate(100, 115) scale(0.92)">
      <path d="M -16 -6 C -10 -8 -4 -5 0 -3 L 0 8 C -4 6 -10 3 -16 5 Z" fill="#FFFFFF" stroke="#047857" strokeWidth="0.8"/>
      <path d="M 16 -6 C 10 -8 4 -5 0 -3 L 0 8 C 4 6 10 3 16 5 Z" fill="#FFFFFF" stroke="#047857" strokeWidth="0.8"/>
      <line x1="0" y1="-3" x2="0" y2="8" stroke="#047857" strokeWidth="1.2"/>
      <line x1="-12" y1="-2" x2="-4" y2="-1" stroke="#047857" strokeWidth="0.7"/>
      <line x1="-12" y1="1" x2="-4" y2="2" stroke="#047857" strokeWidth="0.7"/>
      <line x1="4" y1="-1" x2="12" y2="-2" stroke="#047857" strokeWidth="0.7"/>
      <line x1="4" y1="2" x2="12" y2="1" stroke="#047857" strokeWidth="0.7"/>
    </g>

    {/* Bottom Ribbon Motto Banner */}
    <g transform="translate(0, 166)">
      {/* Ribbon Fold Backs & Tails */}
      <path d="M 16 22 L 4 35 L 28 31 Z" fill="#065f46" stroke="#047857" strokeWidth="1.2" />
      <path d="M 184 22 L 196 35 L 172 31 Z" fill="#065f46" stroke="#047857" strokeWidth="1.2" />
      <path d="M 22 22 L 28 31 L 28 22 Z" fill="#022c22" />
      <path d="M 178 22 L 172 31 L 172 22 Z" fill="#022c22" />

      {/* Main Ribbon Body */}
      <path 
        d="M 20 22 C 60 12 140 12 180 22 L 176 38 C 136 28 64 28 24 38 Z" 
        fill="#FFFFFF" 
        stroke="#047857" 
        strokeWidth="2.2" 
      />

      <path id="bannerPath" d="M 24 33 C 64 23 136 23 176 33" fill="none" />
      <text fill="#047857" fontSize="7.5" fontWeight="900" letterSpacing="0.8" fontFamily="system-ui, -apple-system, sans-serif">
        <textPath href="#bannerPath" startOffset="50%" textAnchor="middle">
          SUCCESS THROUGH EDUCATION
        </textPath>
      </text>
    </g>
  </svg>
);

export const SchoolCrest: React.FC<SchoolCrestProps> = ({
  size = 'md',
  variant = 'light',
  showText = false,
  textSubtitle,
  className = '',
  imageOnly = false,
  priority = false
}) => {
  const [imageError, setImageError] = useState(false);

  // Size dimensions mapping
  const sizeMap = {
    xs: { container: 'w-7 h-7', img: 'w-7 h-7', text: 'text-[11px]', subtext: 'text-[9px]' },
    sm: { container: 'w-10 h-10', img: 'w-10 h-10', text: 'text-xs', subtext: 'text-[10px]' },
    md: { container: 'w-13 h-13 sm:w-14 sm:h-14', img: 'w-13 h-13 sm:w-14 sm:h-14', text: 'text-sm sm:text-base', subtext: 'text-[11px] sm:text-xs' },
    lg: { container: 'w-20 h-20 sm:w-24 sm:h-24', img: 'w-20 h-20 sm:w-24 sm:h-24', text: 'text-lg sm:text-xl', subtext: 'text-xs sm:text-sm' },
    xl: { container: 'w-28 h-28 sm:w-32 sm:h-32', img: 'w-28 h-28 sm:w-32 sm:h-32', text: 'text-xl sm:text-2xl', subtext: 'text-sm sm:text-base' },
    '2xl': { container: 'w-36 h-36 sm:w-44 sm:h-44', img: 'w-36 h-36 sm:w-44 sm:h-44', text: 'text-2xl sm:text-3xl', subtext: 'text-base sm:text-lg' },
    hero: { container: 'w-40 h-40 sm:w-52 sm:h-52', img: 'w-40 h-40 sm:w-52 sm:h-52', text: 'text-3xl sm:text-4xl', subtext: 'text-lg' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  // Frame and container styling based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'dark':
        return {
          wrapper: 'bg-white border-2 border-emerald-400 shadow-xl shadow-black/40 p-1',
          title: 'text-white',
          subtitle: 'text-emerald-300',
          ring: 'border-emerald-500/30'
        };
      case 'gold':
        return {
          wrapper: 'bg-white border-2 border-emerald-600 shadow-md shadow-emerald-900/10 p-1',
          title: 'text-slate-900',
          subtitle: 'text-emerald-800',
          ring: 'border-emerald-600/40'
        };
      case 'clean':
        return {
          wrapper: 'bg-transparent border-0 shadow-none',
          title: 'text-slate-900',
          subtitle: 'text-slate-500',
          ring: 'border-transparent'
        };
      case 'badge':
      case 'uniform':
        return {
          wrapper: 'bg-white p-1 rounded-2xl border-2 border-emerald-600 shadow-md',
          title: 'text-slate-900',
          subtitle: 'text-emerald-800',
          ring: 'border-emerald-600/50'
        };
      case 'print':
        return {
          wrapper: 'bg-white border-2 border-emerald-900 p-0.5',
          title: 'text-black',
          subtitle: 'text-slate-800',
          ring: 'border-emerald-950'
        };
      case 'light':
      default:
        return {
          wrapper: 'bg-white border border-slate-200/90 shadow-xs hover:border-emerald-600/60 transition-colors p-0.5',
          title: 'text-slate-900',
          subtitle: 'text-emerald-800',
          ring: 'border-emerald-600/20'
        };
    }
  };

  const styles = getVariantStyles();

  const badgeElement = (
    <div 
      className={`relative ${currentSize.container} rounded-2xl overflow-hidden flex items-center justify-center select-none group shrink-0 ${styles.wrapper} ${className}`}
      title="Official Crest — Emaudo Senior Secondary School, Ekpoma (Motto: Success Through Education)"
    >
      {!imageError ? (
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={officialBadgeImg}
            alt="Official Emaudo Senior Secondary School Ekpoma Badge"
            className="w-full h-full object-contain filter drop-shadow-xs group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
            loading={priority ? 'eager' : 'lazy'}
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <OfficialEmaudoBadgeSVG className="w-full h-full p-0.5" />
      )}
    </div>
  );

  if (imageOnly || !showText) {
    return badgeElement;
  }

  return (
    <div className="inline-flex items-center gap-3.5 select-none">
      {badgeElement}
      <div className="flex flex-col text-left">
        <span className={`font-serif font-black tracking-tight leading-tight uppercase ${currentSize.text} ${styles.title}`}>
          Emaudo Senior Sec. School
        </span>
        <span className={`font-bold tracking-wider uppercase ${currentSize.subtext} ${styles.subtitle}`}>
          {textSubtitle || 'Ekpoma, Edo State • Est. 1980'}
        </span>
      </div>
    </div>
  );
};


