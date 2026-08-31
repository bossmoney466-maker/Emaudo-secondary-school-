import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Trophy, 
  Medal, 
  Sparkles, 
  GraduationCap, 
  Star, 
  Users, 
  Filter, 
  CheckCircle2, 
  ChevronRight, 
  Calendar,
  ExternalLink,
  Plus,
  X
} from 'lucide-react';
import { StudentAchievement, AchievementCategory } from '../../types';
import { MOCK_ACHIEVEMENTS } from '../../data/expandedData';
import { useAuth } from '../../context/AuthContext';
import { supabaseService, isSupabaseConfigured } from '../../lib/supabase';

export const AchievementShowcaseModule: React.FC = () => {
  const { role } = useAuth();
  const [achievements, setAchievements] = useState<StudentAchievement[]>(MOCK_ACHIEVEMENTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  
  // Modal for admin to add new achievement
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newClass, setNewClass] = useState('SS 3 Science');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<AchievementCategory>('academic');
  const [newCompetition, setNewCompetition] = useState('');
  const [newPosition, setNewPosition] = useState('1st Place Gold Medal');
  const [newDescription, setNewDescription] = useState('');
  const [newYear, setNewYear] = useState(2024);

  // Load from Supabase if configured
  useEffect(() => {
    if (isSupabaseConfigured) {
      supabaseService.achievements.getAll().then((data: any) => {
        if (data && data.length > 0) {
          const mapped: StudentAchievement[] = data.map((d: any) => ({
            id: d.id,
            student_name: d.student_name,
            class_name: d.class_name,
            title: d.title,
            category: d.category || 'academic',
            competition_name: d.competition_name || '',
            position: d.position || '',
            description: d.description || '',
            year: d.year || 2024,
            date_awarded: d.date_awarded || new Date().toISOString(),
            badge_color: d.badge_color || 'emerald',
            featured: d.featured ?? false,
          }));
          setAchievements(prev => {
            const ids = new Set(prev.map(p => p.id));
            const fresh = mapped.filter(m => !ids.has(m.id));
            return [...fresh, ...prev];
          });
        }
      }).catch(() => {});
    }
  }, []);

  const filtered = achievements.filter(ach => {
    const matchCat = selectedCategory === 'all' || ach.category === selectedCategory;
    const matchYear = selectedYear === 'all' || ach.year.toString() === selectedYear;
    return matchCat && matchYear;
  });

  const featuredAchievements = achievements.filter(a => a.featured);

  const getCategoryBadge = (cat: AchievementCategory) => {
    switch (cat) {
      case 'academic': return { label: 'Academic Excellence', bg: 'bg-blue-100 text-blue-800 border-blue-200', icon: <GraduationCap className="w-3.5 h-3.5" /> };
      case 'olympiad': return { label: 'STEM & Olympiad', bg: 'bg-purple-100 text-purple-800 border-purple-200', icon: <Sparkles className="w-3.5 h-3.5" /> };
      case 'sports': return { label: 'Sports & Athletics', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: <Trophy className="w-3.5 h-3.5" /> };
      case 'arts_debate': return { label: 'Debate & Literary', bg: 'bg-amber-100 text-amber-800 border-amber-200', icon: <Medal className="w-3.5 h-3.5" /> };
      case 'leadership': return { label: 'Leadership', bg: 'bg-teal-100 text-teal-800 border-teal-200', icon: <Star className="w-3.5 h-3.5" /> };
      default: return { label: 'Honor Award', bg: 'bg-slate-100 text-slate-800 border-slate-200', icon: <Award className="w-3.5 h-3.5" /> };
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created: StudentAchievement = {
      id: `ach-${Date.now()}`,
      student_name: newStudentName,
      class_name: newClass,
      title: newTitle,
      category: newCategory,
      competition_name: newCompetition,
      position: newPosition,
      description: newDescription,
      year: Number(newYear),
      date_awarded: new Date().toISOString(),
      badge_color: 'amber',
      featured: true
    };

    setAchievements(prev => [created, ...prev]);
    setShowAddModal(false);
    setNewStudentName('');
    setNewTitle('');
    setNewDescription('');
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-emerald-800/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Hall of Fame & Honours Roll</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Student Achievements & Laurels
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Celebrating scholastic excellence, state & national Olympiad champions, WAEC distinctions, and athletic trophies of Emaudo students.
          </p>
        </div>

        {(role === 'admin' || role === 'teacher' || role === 'superadmin') && (
          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Record Achievement</span>
          </button>
        )}
      </div>

      {/* Featured Spotlight: Principal's Honours Roll */}
      {featuredAchievements.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="font-serif font-bold text-base text-slate-900">
              Principal's Gold Spotlight & State Champions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredAchievements.map(feat => (
              <div 
                key={feat.id}
                className="bg-gradient-to-br from-amber-500/10 via-white to-emerald-500/5 rounded-3xl p-6 border-2 border-amber-400/40 shadow-sm relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-3 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                      <Trophy className="w-3 h-3 fill-slate-950" />
                      <span>{feat.position}</span>
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500">{feat.year}</span>
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-base text-slate-900">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-emerald-800 font-bold mt-0.5">
                      {feat.student_name} <span className="font-normal text-slate-500 font-mono">({feat.class_name})</span>
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-amber-200/60 flex items-center justify-between text-[11px] text-slate-500 relative z-10">
                  <span className="font-medium text-slate-700">{feat.competition_name}</span>
                  <span className="font-mono text-emerald-700 font-bold">Verified Award</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 flex-1">
          {[
            { id: 'all', label: 'All Honours' },
            { id: 'academic', label: 'Academic / WAEC' },
            { id: 'olympiad', label: 'STEM & Olympiads' },
            { id: 'arts_debate', label: 'Debate & Arts' },
            { id: 'sports', label: 'Sports' },
            { id: 'leadership', label: 'Leadership' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Year Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Year:</span>
          <select
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
            className="p-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
          >
            <option value="all">All Sessions</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>
      </div>

      {/* Achievements Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(ach => {
          const badge = getCategoryBadge(ach.category);

          return (
            <div
              key={ach.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${badge.bg}`}>
                    {badge.icon}
                    <span>{badge.label}</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">{ach.year}</span>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-sm sm:text-base text-slate-900">
                    {ach.title}
                  </h4>
                  <div className="text-xs font-bold text-emerald-800 mt-1">
                    {ach.student_name} <span className="font-normal text-slate-500 font-mono">({ach.class_name})</span>
                  </div>
                </div>

                <div className="inline-block px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-[11px] font-bold text-amber-900">
                  {ach.position} • {ach.competition_name}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {ach.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Awarded: {new Date(ach.date_awarded).toLocaleDateString()}</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* RECORD ACHIEVEMENT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-base text-slate-900">Record Student Achievement</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">Student Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Osasere Emmanuel"
                    value={newStudentName}
                    onChange={e => setNewStudentName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 mt-1"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">Class</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SS 3 Science"
                    value={newClass}
                    onChange={e => setNewClass(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700">Award / Achievement Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 1st Place National Chemistry Olympiad (Edo Zone)"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 mt-1"
                  >
                    <option value="academic">Academic Excellence</option>
                    <option value="olympiad">STEM & Olympiad</option>
                    <option value="arts_debate">Debate & Arts</option>
                    <option value="sports">Sports & Athletics</option>
                    <option value="leadership">Leadership</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700">Position / Medal</label>
                  <input
                    type="text"
                    placeholder="e.g. 1st Place Gold Medal"
                    value={newPosition}
                    onChange={e => setNewPosition(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700">Organising Body / Competition</label>
                <input
                  type="text"
                  placeholder="e.g. Science Teachers Association of Nigeria (STAN)"
                  value={newCompetition}
                  onChange={e => setNewCompetition(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 mt-1"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">Achievement Story & Citation</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Details of the feat, scores, and scholastic recognition..."
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 mt-1"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold"
                >
                  Publish Award
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
