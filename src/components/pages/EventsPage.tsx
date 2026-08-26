import React, { useState } from 'react';
import { 
  AlertCircle, 
  Calendar, 
  Clock, 
  MapPin, 
  Sparkles, 
  Tag, 
  Users 
} from 'lucide-react';
import { SAMPLE_EVENTS } from '../../constants/schoolData';
import { SchoolEvent } from '../../types';

export const EventsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Academic Events',
    'Sports',
    'Cultural Events',
    'Alumni Events',
    'Parent Meetings',
    'School Ceremonies'
  ];

  const filteredEvents = selectedCategory === 'All'
    ? SAMPLE_EVENTS
    : SAMPLE_EVENTS.filter((e) => e.category === selectedCategory);

  return (
    <div className="space-y-12">
      {/* Header Banner */}
      <section className="rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white p-6 sm:p-12 border border-blue-800 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>School Calendar & Activities</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Academic, Sports & Ceremonial Events
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
            Termly academic milestones, parent-teacher forums, sports competitions, and alumni homecoming gatherings.
          </p>
        </div>
      </section>

      {/* Mandatory Official Notice */}
      <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex items-start gap-3 shadow-sm">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm">
          <span className="font-bold">Official Event Schedule Notice:</span> Specific term dates, examination timetables, and PTA meeting times are confirmed directly by the school administration and circulated through official circulars.
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`filter-event-${cat.toLowerCase().replace(/\s+/g, '-')}`}
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

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            id={`event-card-${evt.id}`}
            className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold uppercase text-[10px]">
                  {evt.category}
                </span>
                <span className="text-slate-500 font-medium">{evt.schedule}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {evt.title}
              </h3>

              <div className="space-y-1 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>{evt.location}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                {evt.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Sample Event Format</span>
              <span className="text-blue-900 font-bold">School Calendar</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
