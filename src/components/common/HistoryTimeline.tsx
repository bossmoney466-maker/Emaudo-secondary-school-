import React, { useState } from 'react';
import { Award, BookOpen, CheckCircle2, Flag, FlaskConical, GraduationCap, Sparkles, ChevronRight } from 'lucide-react';
import { VERIFIED_HISTORY_MILESTONES } from '../../constants/schoolData';
import { TimelineMilestone } from '../../types';

export const HistoryTimeline: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<TimelineMilestone>(VERIFIED_HISTORY_MILESTONES[0]);

  const getIcon = (iconName: TimelineMilestone['iconName']) => {
    switch (iconName) {
      case 'flag':
        return <Flag className="w-5 h-5" />;
      case 'graduation':
        return <GraduationCap className="w-5 h-5" />;
      case 'award':
        return <Award className="w-5 h-5" />;
      case 'microscope':
        return <FlaskConical className="w-5 h-5" />;
      case 'book':
        return <BookOpen className="w-5 h-5" />;
      case 'sparkles':
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="py-6">
      {/* Milestone Selection Tabs (Horizontal Scroll on Mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-300">
        {VERIFIED_HISTORY_MILESTONES.map((m) => {
          const isSelected = selectedMilestone.id === m.id;
          return (
            <button
              key={m.id}
              id={`timeline-tab-${m.id}`}
              onClick={() => setSelectedMilestone(m)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-blue-900 text-white shadow-md border-2 border-amber-400'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span className={`px-2 py-0.5 rounded text-xs ${isSelected ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-100 text-slate-600'}`}>
                {m.year}
              </span>
              <span>{m.tag}</span>
            </button>
          );
        })}
      </div>

      {/* Featured Milestone Detail Card */}
      <div className="mt-4 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-50 text-blue-900 border border-blue-100">
              {getIcon(selectedMilestone.iconName)}
            </div>
            <div>
              <span className="text-xs font-black text-amber-600 uppercase tracking-wider">
                Historical Milestone • {selectedMilestone.year}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {selectedMilestone.title}
              </h3>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Historical Record
          </span>
        </div>

        {selectedMilestone.subtitle && (
          <p className="text-sm font-semibold text-slate-600 mt-4">
            {selectedMilestone.subtitle}
          </p>
        )}

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mt-3">
          {selectedMilestone.description}
        </p>

        {/* Historical Photo Archive Placeholder */}
        {selectedMilestone.photoPlaceholder && (
          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-dashed border-slate-300 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="font-medium text-slate-700">{selectedMilestone.photoPlaceholder}</span>
            </div>
            <span className="text-[11px] font-semibold text-blue-800 uppercase">Archive Record</span>
          </div>
        )}
      </div>

      {/* Complete Vertical History List */}
      <div className="mt-12 space-y-6">
        <h4 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          Chronological Summary of Key Milestones
        </h4>

        <div className="relative border-l-2 border-blue-200 ml-4 pl-6 space-y-8">
          {VERIFIED_HISTORY_MILESTONES.map((milestone) => (
            <div key={`vertical-${milestone.id}`} className="relative group">
              {/* Timeline Marker */}
              <div className="absolute -left-[31px] top-1 w-6 h-6 rounded-full bg-blue-900 border-4 border-white shadow flex items-center justify-center text-white text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-900 text-amber-300 font-extrabold text-xs">
                    {milestone.year}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {milestone.tag}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900 mt-2">
                  {milestone.title}
                </h4>

                <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
