import React, { useEffect, useState } from 'react';
import { 
  X, 
  ExternalLink, 
  BookOpen, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Clock, 
  Sparkles, 
  Layers, 
  GraduationCap, 
  CheckCircle2,
  Play,
  Youtube,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { LearningResource } from '../../types';
import { 
  getYouTubeEmbedUrl, 
  getYouTubeWatchUrl, 
  extractYouTubeId,
  getSuggestedReplacement
} from '../../lib/videoValidator';

interface LessonPlayerModalProps {
  resource: LearningResource | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectRelated?: (resource: LearningResource) => void;
  relatedResources?: LearningResource[];
}

export const LessonPlayerModal: React.FC<LessonPlayerModalProps> = ({
  resource,
  onClose,
  isFavorite,
  onToggleFavorite,
  onSelectRelated,
  relatedResources = [],
}) => {
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    setLoadError(false);
  }, [resource?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!resource) return null;

  const embedUrl = getYouTubeEmbedUrl(resource.video_url, true);
  const watchUrl = getYouTubeWatchUrl(resource.video_url);
  const isEmbeddable = !loadError && (embedUrl.includes('youtube') || embedUrl.includes('embed') || resource.embed_allowed !== false);
  const suggestedBackup = loadError ? getSuggestedReplacement(resource) : null;

  return (
    <div 
      id="lesson-player-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        id="lesson-player-modal-content"
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border-2 border-emerald-900/30 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-950 to-emerald-950 text-white p-4 sm:p-5 flex items-center justify-between border-b border-emerald-800/40">
          <div className="flex items-center gap-3 min-w-0 pr-4">
            <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs shrink-0">
              {resource.subject}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-800 text-emerald-200 text-xs font-bold shrink-0">
              {resource.class_level}
            </span>
            <h2 className="text-sm sm:text-base font-serif font-bold text-white truncate">
              {resource.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {watchUrl && (
              <a
                href={watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-colors"
                title="Watch on YouTube (Official Link)"
              >
                <Youtube className="w-3.5 h-3.5" />
                <span>Watch on YouTube</span>
              </a>
            )}

            <button
              onClick={() => onToggleFavorite(resource.id)}
              className={`p-2 rounded-xl transition-colors cursor-pointer border ${
                isFavorite 
                  ? 'bg-amber-400 text-slate-950 border-amber-300' 
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
              title={isFavorite ? 'Remove from Saved Lessons' : 'Save to My Favourites'}
            >
              {isFavorite ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors cursor-pointer border border-white/10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Video Player Container */}
          <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-inner border border-slate-800">
            {isEmbeddable ? (
              <iframe
                src={embedUrl}
                title={resource.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onError={() => setLoadError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white space-y-4 relative">
                <img
                  src={resource.thumbnail_url}
                  alt={resource.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-25"
                />
                <div className="relative z-10 space-y-3 max-w-lg bg-slate-950/85 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-300 mx-auto flex items-center justify-center">
                    <Youtube className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{resource.title}</h3>
                  <p className="text-xs text-slate-300">
                    This video is hosted on <strong className="text-white">{resource.platform}</strong>. For the best learning experience with full interactive features, you can play it directly.
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <a
                      href={watchUrl || resource.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg transition-all"
                    >
                      <Youtube className="w-4 h-4" />
                      <span>Watch on YouTube</span>
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>

                    {suggestedBackup && onSelectRelated && (
                      <button
                        onClick={() => {
                          setLoadError(false);
                          onSelectRelated(suggestedBackup);
                        }}
                        className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition-all"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Switch to Alternative Resource</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Lesson Metadata and Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    Topic: {resource.topic}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {resource.duration || '15 mins'}
                  </span>
                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md flex items-center gap-1">
                    <Youtube className="w-3.5 h-3.5 text-red-500" />
                    Platform: {resource.platform}
                  </span>
                </div>
                <h3 className="text-xl font-serif font-black text-slate-900">
                  {resource.title}
                </h3>
                <p className="text-xs font-medium text-slate-500 mt-1">
                  Presented by <span className="text-slate-800 font-bold">{resource.creator}</span>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Lesson Overview & Curriculum Notes</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {resource.description || 'Comprehensive step-by-step tutorial designed to support student mastery of core curriculum topics, assignments, and external examination prep.'}
                </p>
              </div>

              {/* Attribution and Safe Direct Link */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Free open educational content • Official embed</span>
                </div>

                <a
                  href={watchUrl || resource.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
                >
                  <span>Watch on YouTube / Official Platform</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Related Lessons Column */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Related {resource.subject} Lessons</span>
              </h4>

              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {relatedResources.length > 0 ? (
                  relatedResources
                    .filter((r) => r.id !== resource.id)
                    .slice(0, 3)
                    .map((item) => (
                      <div
                        key={item.id}
                        onClick={() => onSelectRelated && onSelectRelated(item)}
                        className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all cursor-pointer flex gap-3 group"
                      >
                        <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-900">
                          <img
                            src={item.thumbnail_url}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <Play className="w-4 h-4 text-white fill-white" />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-emerald-800 block truncate">
                            {item.class_level} • {item.topic}
                          </span>
                          <h5 className="text-xs font-bold text-slate-800 line-clamp-2 leading-tight">
                            {item.title}
                          </h5>
                          <span className="text-[10px] text-slate-500 block mt-0.5">
                            {item.duration}
                          </span>
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="text-xs text-slate-400 italic">No additional related lessons found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
