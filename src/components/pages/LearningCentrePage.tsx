import React, { useState, useMemo, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Sparkles, 
  Play, 
  Bookmark, 
  Clock, 
  Layers, 
  GraduationCap, 
  ChevronRight, 
  CheckCircle2, 
  ExternalLink,
  Calculator,
  FlaskConical,
  Cpu,
  Landmark,
  TrendingUp,
  RotateCcw,
  Video,
  Award
} from 'lucide-react';
import { LearningResource, LearningSubjectType, ClassLevelType } from '../../types';
import { 
  INITIAL_LEARNING_RESOURCES, 
  LEARNING_SUBJECTS_METADATA, 
  CLASS_LEVELS, 
  TRUSTED_LEARNING_PLATFORMS 
} from '../../data/learningData';
import { VideoCard } from '../learning/VideoCard';
import { LessonPlayerModal } from '../learning/LessonPlayerModal';
import { dbService } from '../../lib/supabase';

interface LearningCentrePageProps {
  onNavigate?: (tab: any) => void;
  initialSubject?: string;
  initialClass?: string;
}

export const LearningCentrePage: React.FC<LearningCentrePageProps> = ({
  onNavigate,
  initialSubject = 'All',
  initialClass = 'All',
}) => {
  const [resources, setResources] = useState<LearningResource[]>(INITIAL_LEARNING_RESOURCES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>(initialSubject);
  const [selectedClass, setSelectedClass] = useState<string>(initialClass);
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'all' | 'favorites' | 'recent'>('all');
  
  // Local storage state for favorites and recently watched
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('emaudo_learning_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [recentlyWatched, setRecentlyWatched] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('emaudo_learning_recent');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active playing video modal
  const [activeResource, setActiveResource] = useState<LearningResource | null>(null);

  // Sync Supabase resources if available
  useEffect(() => {
    let isMounted = true;
    async function fetchFromSupabase() {
      try {
        const remote = await dbService.learningResources?.getAll();
        if (remote && remote.length > 0 && isMounted) {
          // Merge remote with initial
          const merged = [...remote, ...INITIAL_LEARNING_RESOURCES.filter(i => !remote.some(r => r.id === i.id))];
          setResources(merged);
        }
      } catch (err) {
        console.log('Using local learning resources cache');
      }
    }
    fetchFromSupabase();
    return () => { isMounted = false; };
  }, []);

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('emaudo_learning_favorites', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleWatchLesson = (resource: LearningResource) => {
    setActiveResource(resource);
    // Add to recently watched
    setRecentlyWatched((prev) => {
      const filtered = prev.filter((id) => id !== resource.id);
      const updated = [resource.id, ...filtered].slice(0, 15);
      try {
        localStorage.setItem('emaudo_learning_recent', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Extract all unique topics for selected subject
  const availableTopics = useMemo(() => {
    const relevant = selectedSubject === 'All' 
      ? resources 
      : resources.filter((r) => r.subject === selectedSubject);
    const topicsSet = new Set<string>();
    relevant.forEach((r) => {
      if (r.topic) topicsSet.add(r.topic);
    });
    return Array.from(topicsSet);
  }, [resources, selectedSubject]);

  // Filtered resources calculation
  const filteredResources = useMemo(() => {
    return resources.filter((r) => {
      // Must be approved and available
      if (r.approved === false || r.is_available === false) return false;

      // View mode filters
      if (viewMode === 'favorites' && !favorites.includes(r.id)) return false;
      if (viewMode === 'recent' && !recentlyWatched.includes(r.id)) return false;

      // Subject filter
      if (selectedSubject !== 'All' && r.subject !== selectedSubject) return false;

      // Class level filter
      if (selectedClass !== 'All' && r.class_level !== selectedClass && r.class_level !== 'All Levels') return false;

      // Topic filter
      if (selectedTopic !== 'All' && r.topic !== selectedTopic) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = r.title.toLowerCase().includes(q);
        const matchTopic = r.topic.toLowerCase().includes(q);
        const matchSubject = r.subject.toLowerCase().includes(q);
        const matchCreator = r.creator.toLowerCase().includes(q);
        const matchDesc = (r.description || '').toLowerCase().includes(q);
        if (!matchTitle && !matchTopic && !matchSubject && !matchCreator && !matchDesc) {
          return false;
        }
      }

      return true;
    });
  }, [resources, viewMode, favorites, recentlyWatched, selectedSubject, selectedClass, selectedTopic, searchQuery]);

  const getSubjectIcon = (subjectId: string) => {
    switch (subjectId) {
      case 'Mathematics':
        return Calculator;
      case 'English Language':
        return BookOpen;
      case 'Science':
        return FlaskConical;
      case 'ICT':
        return Cpu;
      case 'Social Science':
        return Landmark;
      case 'Commercial':
        return TrendingUp;
      default:
        return BookOpen;
    }
  };

  return (
    <div className="space-y-8 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. HERO BANNER */}
      <section className="rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-950 to-emerald-950 text-white p-6 sm:p-10 lg:p-12 border-2 border-emerald-700/50 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Video className="w-4 h-4 text-amber-400" />
            <span>100% Free Online Learning Centre</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white">
            Emaudo Digital Classroom & Video Library
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl">
            Empowering students of Emaudo Secondary School with curated video lessons, syllabus breakdowns, and practical demonstrations from <strong>Khan Academy, BBC Bitesize, YouTube Educational, CK-12, and MIT OpenCourseWare</strong>.
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-3 pt-2 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-emerald-300 font-bold">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>WAEC & NECO Aligned</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-emerald-300 font-bold">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>JSS 1 to SSS 3 Covered</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-emerald-300 font-bold">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Free & Accessible 24/7</span>
            </div>
          </div>
        </div>

        {/* Decorative corner icon */}
        <div className="absolute right-6 -bottom-6 opacity-10 pointer-events-none hidden md:block">
          <GraduationCap className="w-64 h-64 text-amber-300" />
        </div>
      </section>

      {/* 2. SEARCH & FILTER TOOLBAR */}
      <section className="space-y-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Box */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="learning-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, lesson title (e.g. Algebra, Titration, Grammar)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Class Level Dropdown */}
            <div className="md:col-span-3">
              <select
                id="learning-class-filter"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white"
              >
                <option value="All">All Classes (JSS 1 – SSS 3)</option>
                {CLASS_LEVELS.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Buttons (All / Saved / Recent) */}
            <div className="md:col-span-3 flex items-center justify-between sm:justify-end gap-1.5">
              <button
                onClick={() => setViewMode('all')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'all'
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Lessons
              </button>

              <button
                onClick={() => setViewMode('favorites')}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'favorites'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Saved ({favorites.length})</span>
              </button>

              <button
                onClick={() => setViewMode('recent')}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'recent'
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Recent</span>
              </button>
            </div>
          </div>

          {/* Subject Pills Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            <button
              onClick={() => {
                setSelectedSubject('All');
                setSelectedTopic('All');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                selectedSubject === 'All'
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Subjects ({resources.length})
            </button>

            {LEARNING_SUBJECTS_METADATA.map((subj) => {
              const Icon = getSubjectIcon(subj.id);
              const count = resources.filter((r) => r.subject === subj.id).length;
              return (
                <button
                  key={subj.id}
                  onClick={() => {
                    setSelectedSubject(subj.id);
                    setSelectedTopic('All');
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                    selectedSubject === subj.id
                      ? 'bg-emerald-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{subj.name}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 ml-0.5">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sub-Topics Pills if specific subject is active */}
          {availableTopics.length > 0 && selectedSubject !== 'All' && (
            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
              <span className="text-[11px] font-bold uppercase text-slate-400 shrink-0">Topics:</span>
              <button
                onClick={() => setSelectedTopic('All')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  selectedTopic === 'All'
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Topics
              </button>
              {availableTopics.map((top) => (
                <button
                  key={top}
                  onClick={() => setSelectedTopic(top)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                    selectedTopic === top
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {top}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. VIDEO CARDS GRID */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-serif font-black text-lg sm:text-xl text-slate-900">
              {viewMode === 'favorites' 
                ? 'Your Saved Lessons' 
                : viewMode === 'recent' 
                ? 'Recently Watched Lessons' 
                : selectedSubject === 'All' 
                ? 'Available Video Lessons' 
                : `${selectedSubject} Video Library`}
            </h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
              {filteredResources.length} {filteredResources.length === 1 ? 'lesson' : 'lessons'}
            </span>
          </div>

          {(searchQuery || selectedSubject !== 'All' || selectedClass !== 'All' || selectedTopic !== 'All' || viewMode !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSubject('All');
                setSelectedClass('All');
                setSelectedTopic('All');
                setViewMode('all');
              }}
              className="text-xs font-bold text-emerald-800 hover:text-amber-600 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>

        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((item) => (
              <VideoCard
                key={item.id}
                resource={item}
                onWatch={handleWatchLesson}
                isFavorite={favorites.includes(item.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200/90 space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 border border-amber-200 flex items-center justify-center mx-auto">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="font-serif font-bold text-base text-slate-900">No Lessons Found</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              No educational videos matched your current filter criteria. Try adjusting your search query or choosing "All Subjects".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSubject('All');
                setSelectedClass('All');
                setSelectedTopic('All');
                setViewMode('all');
              }}
              className="px-4 py-2 rounded-xl bg-emerald-900 text-white text-xs font-bold hover:bg-emerald-800 transition-colors cursor-pointer"
            >
              View Full Video Library
            </button>
          </div>
        )}
      </section>

      {/* 4. TRUSTED EDUCATIONAL SOURCES BANNER */}
      <section className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Open Educational Content Verification</span>
          </div>
          <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
            Curated from World-Class Educational Platforms
          </h3>
          <p className="text-xs text-slate-300 max-w-3xl">
            In full compliance with open educational guidelines, our learning center provides direct video embeds and links from verified global institutions. All intellectual property remains with the respective content creators.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {TRUSTED_LEARNING_PLATFORMS.map((platform) => (
            <a
              key={platform.name}
              href={platform.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-center space-y-1.5 transition-all group cursor-pointer"
            >
              <span className="text-xs font-bold text-white block group-hover:text-amber-300 transition-colors">
                {platform.name}
              </span>
              <span className="text-[10px] text-slate-400 block line-clamp-2 leading-tight">
                {platform.description}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* 5. LESSON PLAYER MODAL */}
      <LessonPlayerModal
        resource={activeResource}
        onClose={() => setActiveResource(null)}
        isFavorite={activeResource ? favorites.includes(activeResource.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onSelectRelated={(r) => handleWatchLesson(r)}
        relatedResources={
          activeResource
            ? resources.filter((r) => r.subject === activeResource.subject && r.id !== activeResource.id)
            : []
        }
      />
    </div>
  );
};
