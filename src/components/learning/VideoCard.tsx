import React, { useState } from 'react';
import { 
  Play, 
  Clock, 
  Bookmark, 
  BookmarkCheck, 
  ExternalLink,
  Layers,
  GraduationCap,
  Sparkles,
  Youtube,
  AlertCircle
} from 'lucide-react';
import { LearningResource } from '../../types';
import { getYouTubeThumbnailUrl, getYouTubeWatchUrl } from '../../lib/videoValidator';

interface VideoCardProps {
  resource: LearningResource;
  onWatch: (resource: LearningResource) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  resource,
  onWatch,
  isFavorite,
  onToggleFavorite,
}) => {
  const [imgError, setImgError] = useState(false);

  const getSubjectBadgeStyle = (subject: string) => {
    switch (subject) {
      case 'Mathematics':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'English Language':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Science':
        return 'bg-teal-100 text-teal-900 border-teal-300';
      case 'ICT':
        return 'bg-indigo-100 text-indigo-900 border-indigo-300';
      case 'Social Science':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Commercial':
        return 'bg-orange-100 text-orange-900 border-orange-300';
      default:
        return 'bg-slate-100 text-slate-900 border-slate-300';
    }
  };

  const thumbnailSrc = imgError
    ? getYouTubeThumbnailUrl(resource.video_url, 'hq')
    : (resource.thumbnail_url || getYouTubeThumbnailUrl(resource.video_url, 'hq'));

  const watchUrl = getYouTubeWatchUrl(resource.video_url);

  return (
    <div 
      id={`video-card-${resource.id}`}
      className="group rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Thumbnail Section */}
      <div className="relative w-full aspect-video bg-slate-900 overflow-hidden">
        <img
          src={thumbnailSrc}
          alt={resource.title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Dark overlay with Play Action */}
        <div 
          onClick={() => onWatch(resource)}
          className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
            <Play className="w-6 h-6 fill-slate-950 ml-0.5" />
          </div>
        </div>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border shadow-sm ${getSubjectBadgeStyle(resource.subject)}`}>
            {resource.subject}
          </span>

          <span className="px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-bold border border-white/20">
            {resource.class_level}
          </span>
        </div>

        {/* Bottom Platform & Duration Indicators */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] pointer-events-none">
          <span className="px-2 py-0.5 rounded-md bg-black/75 text-amber-300 font-semibold text-[10px] flex items-center gap-1">
            <Youtube className="w-3 h-3 text-red-400" />
            {resource.platform}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-black/75 text-slate-200 font-mono text-[10px] flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-300" />
            {resource.duration || '15 mins'}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span className="font-bold text-emerald-800 tracking-wide uppercase text-[10px]">
              Topic: {resource.topic}
            </span>
            <span className="truncate max-w-[120px] font-medium">{resource.creator}</span>
          </div>

          <h3 
            onClick={() => onWatch(resource)}
            className="font-serif font-bold text-sm sm:text-base text-slate-900 line-clamp-2 leading-snug group-hover:text-emerald-900 transition-colors cursor-pointer"
          >
            {resource.title}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {resource.description}
          </p>
        </div>

        {/* Action Bottom Bar */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onWatch(resource)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Watch Lesson</span>
            </button>

            {watchUrl && (
              <a
                href={watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Watch on YouTube (External Link)"
                className="p-1.5 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 border border-slate-200 transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <button
            onClick={() => onToggleFavorite(resource.id)}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isFavorite
                ? 'bg-amber-100 text-amber-800 border-amber-300'
                : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-slate-800'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            title={isFavorite ? 'Saved to Favorites' : 'Save for later'}
          >
            {isFavorite ? <BookmarkCheck className="w-4 h-4 text-amber-700" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
