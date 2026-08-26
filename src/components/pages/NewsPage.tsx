import React, { useState } from 'react';
import { 
  AlertCircle, 
  Bell, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  ExternalLink, 
  Filter, 
  Newspaper, 
  Sparkles, 
  Tag, 
  Users 
} from 'lucide-react';
import { SAMPLE_NEWS, SCHOOL_INFO } from '../../constants/schoolData';
import { NewsItem } from '../../types';

export const NewsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<NewsItem | null>(null);

  const categories = [
    'All',
    'School News',
    'Academic',
    'Events',
    'Announcements',
    'Alumni',
    'Community',
    'Achievements'
  ];

  const filteredNews = selectedCategory === 'All'
    ? SAMPLE_NEWS
    : SAMPLE_NEWS.filter((n) => n.category === selectedCategory);

  return (
    <div className="space-y-12">
      {/* Header Banner */}
      <section className="rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white p-6 sm:p-12 border border-blue-800 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Newspaper className="w-3.5 h-3.5 text-amber-400" />
            <span>School News & Announcements</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            News, Updates & Institutional Bulletins
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
            Stay informed on term notices, academic activities, science laboratory updates, and alumni achievements.
          </p>
        </div>
      </section>

      {/* Notice on Sample Content */}
      <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex items-start gap-3 shadow-sm">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm">
          <span className="font-bold">Sample Content Notice:</span> Bulletins and news articles below reflect illustrative sample formats and ongoing academic programs. Official term calendars and dates should be verified with the school.
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`filter-news-${cat.toLowerCase().replace(/\s+/g, '-')}`}
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

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNews.map((item) => (
          <article
            key={item.id}
            id={`article-${item.id}`}
            className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-900 font-bold uppercase tracking-wider text-[10px]">
                  {item.category}
                </span>
                <span className="text-slate-500 font-medium">{item.date}</span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 leading-snug">
                {item.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.summary}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setActiveArticle(item)}
                className="text-xs font-bold text-blue-900 hover:text-amber-600 transition-colors cursor-pointer"
              >
                Read Full Bulletin →
              </button>

              <span className="text-[10px] text-amber-700 font-bold uppercase bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Sample Bulletin
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Modal Lightbox for Article Full Read */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 font-bold text-xs">
                {activeArticle.category}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 text-xs font-bold cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {activeArticle.title}
            </h3>

            <p className="text-xs text-slate-500 font-medium">
              Posted: {activeArticle.date} • Emaudo Secondary School Archive
            </p>

            <div className="text-sm text-slate-700 leading-relaxed space-y-3 pt-2">
              <p>{activeArticle.content}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Official notice archive template</span>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 rounded-xl bg-blue-900 text-white text-xs font-bold cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
