import React, { useState } from 'react';
import { 
  AlertCircle, 
  ChevronRight, 
  ExternalLink, 
  FlaskConical, 
  History, 
  Image as ImageIcon, 
  Info, 
  Maximize2, 
  Sparkles, 
  X 
} from 'lucide-react';
import { GALLERY_ITEMS, SCHOOL_INFO } from '../../constants/schoolData';
import { GalleryPhoto } from '../../types';

export const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  const categories = [
    'All',
    'School',
    'Students',
    'Academics',
    'Science Laboratory',
    'Sports',
    'Events',
    'Alumni',
    'Historical Photos'
  ];

  const filteredPhotos = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-12">
      {/* Header Banner */}
      <section className="rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white p-6 sm:p-12 border border-blue-800 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>School Visual Archives</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Campus, Heritage & Activity Gallery
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
            Visual records of academic life, the 2017 ultra-modern science laboratory complex, sports competitions, and historical milestones.
          </p>
        </div>
      </section>

      {/* Mandatory Archive Notice */}
      <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex items-start gap-3 shadow-sm">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm">
          <span className="font-bold">Visual Archive Notice:</span> Authentic placeholders are labeled with verified historical and institutional sources. For additional alumni photos, visit the official ESSOSA gallery at{' '}
          <a
            href={SCHOOL_INFO.essosaGalleryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline text-blue-900 hover:text-amber-700"
          >
            emaudooldstudents.org/gallery/
          </a>.
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`filter-gallery-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-blue-900 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            id={`gallery-item-${photo.id}`}
            onClick={() => setActivePhoto(photo)}
            className="group cursor-pointer rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
          >
            {/* Visual Card / Placeholder Canvas */}
            <div className={`h-48 bg-gradient-to-br ${photo.accentColor || 'from-blue-950 to-slate-900'} p-4 flex flex-col justify-between text-white relative overflow-hidden`}>
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm text-[10px] font-bold text-amber-300 uppercase tracking-wider border border-white/10">
                  {photo.category}
                </span>
                <span className="p-1 rounded-full bg-white/10 text-white group-hover:scale-110 transition-transform">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="text-center my-auto">
                <div className="w-10 h-10 rounded-xl bg-white/10 mx-auto flex items-center justify-center text-amber-400 mb-2">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-100 px-2 line-clamp-2">
                  {photo.placeholderLabel}
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-300 border-t border-white/10 pt-1.5">
                <span>{photo.date}</span>
                <span className="font-semibold text-amber-300">Click to View</span>
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="p-4 space-y-1">
              <h3 className="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-blue-900 transition-colors">
                {photo.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2">
                {photo.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div 
          id="gallery-lightbox-modal"
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActivePhoto(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Visual Header */}
            <div className={`p-8 bg-gradient-to-br ${activePhoto.accentColor || 'from-blue-950 to-slate-900'} text-white relative flex flex-col items-center justify-center min-h-[220px]`}>
              <button
                id="btn-close-lightbox"
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-amber-400 mb-3">
                <ImageIcon className="w-8 h-8" />
              </div>

              <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-bold uppercase tracking-wider mb-2">
                {activePhoto.category}
              </span>

              <h4 className="text-lg sm:text-xl font-bold text-center text-white px-4">
                {activePhoto.placeholderLabel}
              </h4>
            </div>

            {/* Details Content */}
            <div className="p-6 sm:p-8 space-y-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {activePhoto.title}
                </h3>
                <p className="text-xs text-slate-500 font-semibold mt-1">
                  Recorded Date / Era: {activePhoto.date}
                </p>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                {activePhoto.description}
              </p>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">Archive Source:</span>
                  <span>{activePhoto.source}</span>
                </div>
                {activePhoto.category === 'Alumni' && (
                  <a
                    href={SCHOOL_INFO.essosaGalleryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-blue-900 hover:text-amber-700 inline-flex items-center gap-1"
                  >
                    ESSOSA Gallery <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActivePhoto(null)}
                  className="px-5 py-2.5 rounded-xl bg-blue-900 text-white font-bold text-xs cursor-pointer"
                >
                  Close Modal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
