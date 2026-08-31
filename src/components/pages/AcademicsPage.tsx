import React, { useState } from 'react';
import { 
  AlertCircle, 
  Award, 
  BookOpen, 
  Calendar,
  CheckCircle2, 
  ChevronRight, 
  Clock,
  Compass,
  Cpu,
  FileCheck, 
  FlaskConical, 
  GraduationCap, 
  Layers,
  Library, 
  MapPin,
  Megaphone,
  Microscope,
  Music,
  Scale,
  Sparkles, 
  Trophy,
  Users, 
  Video
} from 'lucide-react';
import { PageTab } from '../../types';
import { 
  ACADEMIC_DEPARTMENTS, 
  SCHOOL_CLUBS, 
  SCHOOL_ACTIVITIES, 
  SCHOOL_LIFE_DETAILS, 
  SAMPLE_TIMETABLE_ENTRIES 
} from '../../data/schoolData';

interface AcademicsPageProps {
  onNavigate?: (tab: PageTab) => void;
  initialTab?: 'departments' | 'activities' | 'clubs' | 'school-life' | 'timetable' | 'overview';
}

export const AcademicsPage: React.FC<AcademicsPageProps> = ({ onNavigate, initialTab = 'departments' }) => {
  const [activeTab, setActiveTab] = useState<
    'departments' | 'activities' | 'clubs' | 'school-life' | 'timetable' | 'overview'
  >(initialTab);
  const [selectedDeptId, setSelectedDeptId] = useState<string>(ACADEMIC_DEPARTMENTS[0].id);
  const [selectedTimetableClass, setSelectedTimetableClass] = useState<string>('SSS 2 Science');

  const selectedDepartment = ACADEMIC_DEPARTMENTS.find(d => d.id === selectedDeptId) || ACADEMIC_DEPARTMENTS[0];

  const filteredTimetable = SAMPLE_TIMETABLE_ENTRIES.filter(t => 
    selectedTimetableClass === 'all' || t.className === selectedTimetableClass
  );

  return (
    <div className="space-y-10 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <section className="rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-950 to-emerald-950 text-white p-6 sm:p-12 border-2 border-emerald-700/40 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Academic Rigour & Character Formation</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight font-serif">
            Curriculum, Departments & School Life
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
            Preparing students in Ekpoma, Edo State for excellence in national examinations (WAEC, NECO, BECE, JAMB UTME), higher education, and visionary leadership.
          </p>
        </div>
      </section>

      {/* Mandatory Verification Notice */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex items-start gap-3.5 shadow-sm">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm">
          <span className="font-bold">Accredited Secondary Institution:</span> Emaudo Secondary School was formally upgraded to a Grade-One Secondary School in 1986. For official subject combinations, termly continuous assessment registers, and laboratory access guidelines, consult the academic coordinator or portal.
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {[
          { id: 'departments', label: 'Academic Departments', icon: Layers },
          { id: 'activities', label: 'Academic Activities & Prep', icon: FileCheck },
          { id: 'clubs', label: 'Clubs & Student Societies', icon: Users },
          { id: 'school-life', label: 'School Life & Assembly', icon: Sparkles },
          { id: 'timetable', label: 'Master Timetable', icon: Clock },
          { id: 'overview', label: 'Levels & Overview', icon: GraduationCap },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              id={`tab-academic-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-emerald-900 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: ACADEMIC DEPARTMENTS */}
      {activeTab === 'departments' && (
        <section className="space-y-8">
          {/* Department Selector Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {ACADEMIC_DEPARTMENTS.map((dept) => {
              const isSelected = dept.id === selectedDeptId;
              return (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDeptId(dept.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-emerald-900 text-white border-emerald-900 shadow-md ring-2 ring-emerald-900/30'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-400 hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider block ${isSelected ? 'text-amber-300' : 'text-emerald-900'}`}>
                      Department
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm line-clamp-2 leading-tight">
                      {dept.name}
                    </h4>
                  </div>
                  <span className={`text-[10px] font-semibold mt-2 block ${isSelected ? 'text-blue-200' : 'text-slate-500'}`}>
                    {dept.subjects.length} Subject tracks
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Department Deep Dive */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs font-bold uppercase tracking-wider">
                  {selectedDepartment.name}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
                  {selectedDepartment.name}
                </h3>
                <p className="text-sm font-medium text-slate-600 italic">
                  "{selectedDepartment.tagline}"
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shrink-0">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Head of Department (HOD)</span>
                <span className="font-bold text-sm text-slate-900">{selectedDepartment.headOfDepartment}</span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {selectedDepartment.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Subjects & Core Syllabus */}
              <div className="space-y-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-sm text-blue-950 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-900" />
                  <span>Subjects & Study Pathways</span>
                </h4>
                <ul className="space-y-2">
                  {selectedDepartment.subjects.map((sub, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800 bg-white p-2.5 rounded-xl border border-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{sub}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="font-bold text-sm text-blue-950 flex items-center gap-2 pt-2">
                  <Layers className="w-4 h-4 text-blue-900" />
                  <span>Core Pedagogical Pillars</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedDepartment.features.map((feat, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-white border border-slate-200 font-medium text-slate-700 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-900 mt-1.5 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Competitions & Facilities */}
              <div className="space-y-4 p-5 rounded-2xl bg-blue-50/50 border border-blue-100 flex flex-col justify-between">
                <div className="space-y-4">
                  <h4 className="font-bold text-sm text-blue-950 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-600" />
                    <span>Academic Competitions & Quizzes</span>
                  </h4>
                  <div className="space-y-2">
                    {selectedDepartment.competitions?.map((comp, i) => (
                      <div key={i} className="bg-white p-3 rounded-xl border border-blue-200 text-xs font-semibold text-slate-800 flex items-center gap-2.5">
                        <Award className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>{comp}</span>
                      </div>
                    ))}
                  </div>

                  <h4 className="font-bold text-sm text-blue-950 flex items-center gap-2 pt-2">
                    <Microscope className="w-4 h-4 text-emerald-600" />
                    <span>Laboratories & Departmental Facilities</span>
                  </h4>
                  <div className="space-y-2">
                    {selectedDepartment.labsOrFacilities?.map((lab, i) => (
                      <div key={i} className="bg-white p-3 rounded-xl border border-blue-200 text-xs text-slate-700">
                        <span className="font-bold text-slate-900 block">• {lab}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => onNavigate('teacher-portal')}
                    className="w-full py-2.5 rounded-xl bg-blue-900 text-white font-bold text-xs hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Connect with {selectedDepartment.name} Faculty</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: ACADEMIC ACTIVITIES & EXAM PREP */}
      {activeTab === 'activities' && (
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SCHOOL_ACTIVITIES.map((act) => (
              <div key={act.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-[11px] font-bold uppercase">
                      {act.category}
                    </span>
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {act.frequency}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-serif">
                    {act.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {act.description}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                    <span className="font-bold text-slate-800">Target Cohort:</span>
                    <p className="text-slate-600 font-medium">{act.targetAudience}</p>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <span className="font-bold text-xs text-slate-900 block">Key Highlights:</span>
                    {act.keyHighlights.map((hi, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{hi}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('admissions')}
                  className="w-full mt-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Inquire for Upcoming Session</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 3: CLUBS & SOCIETIES */}
      {activeTab === 'clubs' && (
        <section className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <h3 className="text-xl font-extrabold text-slate-900 font-serif">
              Student Clubs, Societies & Character Building
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Co-curricular participation is mandatory for all students, meeting every Tuesday, Wednesday, or Thursday after school hours (2:15 PM – 3:30 PM).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SCHOOL_CLUBS.map((club) => (
              <div key={club.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between hover:border-blue-400 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-900 border border-purple-200 text-[10px] font-bold uppercase">
                      {club.category} Society
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {club.meetingDay}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-slate-900 font-serif">
                    {club.name}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {club.description}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">Coordinator:</span>
                      <span className="font-semibold text-blue-900">{club.coordinator}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">Time & Venue:</span>
                      <span>{club.venue} ({club.meetingTime})</span>
                    </div>
                  </div>

                  <div className="space-y-1 pt-1">
                    <span className="text-[11px] font-bold text-slate-900 block">Core Activities:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {club.activities.map((a, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-950 flex items-center gap-2">
                  <Trophy className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="text-[11px]">{club.achievements[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 4: SCHOOL LIFE & DAILY ROUTINE */}
      {activeTab === 'school-life' && (
        <section className="space-y-8">
          {/* Morning Assembly Section */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs font-bold uppercase tracking-wider">
                Daily Assembly & Character Formation
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 font-serif mt-2">
                {SCHOOL_LIFE_DETAILS.morningAssembly.title}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                {SCHOOL_LIFE_DETAILS.morningAssembly.schedule}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-900">Standard Assembly Order of Devotion:</h4>
                <div className="space-y-2">
                  {SCHOOL_LIFE_DETAILS.morningAssembly.order.map((ord, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-blue-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{ord}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-blue-950 text-white space-y-3">
                  <div className="flex items-center gap-2 text-amber-400">
                    <Music className="w-4 h-4" />
                    <h5 className="font-bold text-xs uppercase tracking-wider">The Official School Anthem</h5>
                  </div>
                  <pre className="font-serif text-xs sm:text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                    {SCHOOL_LIFE_DETAILS.morningAssembly.schoolAnthem}
                  </pre>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
                  <span className="font-bold block">Punctuality Rule:</span>
                  <p>Assembly gates close strictly at 7:45 AM. Late arrivals are registered in the digital roll call register for administrative follow-up.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Library & Laboratories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center">
                  <Library className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 font-serif">Central Library & Media Resources</h4>
                  <p className="text-xs text-slate-500">{SCHOOL_LIFE_DETAILS.library.hours}</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {SCHOOL_LIFE_DETAILS.library.holdings}
              </p>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between font-semibold">
                <span className="text-slate-600">Seating Capacity:</span>
                <span className="text-blue-900 font-bold">{SCHOOL_LIFE_DETAILS.library.capacity}</span>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 font-serif">Laboratories & Technical Workshops</h4>
                  <p className="text-xs text-slate-500">STEM & Digital Infrastructure</p>
                </div>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                <li className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <strong>Science Complex:</strong> {SCHOOL_LIFE_DETAILS.laboratories.scienceComplex}
                </li>
                <li className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <strong>Digital Lab:</strong> {SCHOOL_LIFE_DETAILS.laboratories.ictCentre}
                </li>
              </ul>
            </div>
          </div>

          {/* Institutional Awards & Milestones */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center gap-2 text-amber-400">
              <Trophy className="w-5 h-5" />
              <h4 className="text-lg font-bold uppercase tracking-wider">Institutional Achievements & Awards</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SCHOOL_LIFE_DETAILS.awardsAndAchievements.map((aw, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                  <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 font-black text-[10px] inline-block">
                    {aw.year}
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-200 pt-1 leading-snug">
                    {aw.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 5: MASTER TIMETABLE */}
      {activeTab === 'timetable' && (
        <section className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 font-serif">
                Master Class Period Schedule
              </h3>
              <p className="text-xs text-slate-500">
                School Hours: 7:45 AM – 2:00 PM (40 minutes per instructional period).
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-600">Select Class:</label>
              <select
                value={selectedTimetableClass}
                onChange={(e) => setSelectedTimetableClass(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900"
              >
                <option value="all">All Classes</option>
                <option value="SSS 2 Science">SSS 2 Science</option>
                <option value="SSS 3 Arts">SSS 3 Arts</option>
                <option value="JSS 2A">JSS 2A</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 uppercase text-[10px]">
                    <th className="py-3.5 px-4">Day</th>
                    <th className="py-3.5 px-4">Period</th>
                    <th className="py-3.5 px-4">Time Slot</th>
                    <th className="py-3.5 px-4">Class</th>
                    <th className="py-3.5 px-4">Subject</th>
                    <th className="py-3.5 px-4">Instructor</th>
                    <th className="py-3.5 px-4">Room / Lab</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTimetable.map((slot) => (
                    <tr key={slot.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-blue-950">{slot.day}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700">Period {slot.period}</td>
                      <td className="py-3.5 px-4 text-slate-500 font-mono">{slot.time}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">{slot.className}</td>
                      <td className="py-3.5 px-4 font-bold text-blue-900">{slot.subject}</td>
                      <td className="py-3.5 px-4 text-slate-700">{slot.teacherName}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                          {slot.room}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Daily Schedule Structure */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-500">Morning Assembly</span>
              <p className="font-bold text-slate-900">7:45 AM – 8:15 AM</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-500">Periods 1–4</span>
              <p className="font-bold text-slate-900">8:15 AM – 10:55 AM</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-500">Long Lunch Break</span>
              <p className="font-bold text-slate-900">11:45 AM – 12:25 PM</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-500">Dismissal / Clubs</span>
              <p className="font-bold text-slate-900">2:00 PM / 3:30 PM</p>
            </div>
          </div>
        </section>
      )}

      {/* TAB 6: ACADEMIC OVERVIEW & LEVELS */}
      {activeTab === 'overview' && (
        <section className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Junior Secondary School */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-black">
                  JSS
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-serif">Junior Secondary School (JSS 1 – 3)</h3>
                  <p className="text-xs text-slate-500">Foundational Stage & Basic Education</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Foundational curriculum preparing students for the Basic Education Certificate Examination (BECE). Core emphasis on Mathematics, Basic Science & Technology, English Studies, Social Studies, and Civic Education.
              </p>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5">
                <span className="font-bold text-slate-900 block">Focus Areas:</span>
                <p>• Mathematical Literacy & Quantitative Reasoning</p>
                <p>• Basic Science & Practical Observation in Lab</p>
                <p>• English Comprehension, Grammar & Composition</p>
              </div>
            </div>

            {/* Senior Secondary School */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-black">
                  SSS
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-serif">Senior Secondary School (SS 1 – 3)</h3>
                  <p className="text-xs text-slate-500">Specialized Tracks for National Exams</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Rigorous multi-discipline pathways equipping students for the West African Senior School Certificate Examination (WASSCE / WAEC), NECO SSCE, and UTME (JAMB).
              </p>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5">
                <span className="font-bold text-slate-900 block">Tracks:</span>
                <p>• Pure Science (Physics, Chemistry, Biology, Further Maths)</p>
                <p>• Arts & Humanities (Literature, Government, CRS/IRS, History)</p>
                <p>• Commercial / Social Sciences (Economics, Commerce, Financial Acctg)</p>
              </div>
            </div>
          </div>

          {/* Historical Progression Note */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Accredited Heritage</span>
              <h4 className="text-lg font-bold text-white font-serif">Grade-One Status Achieved in 1986</h4>
              <p className="text-xs sm:text-sm text-slate-300">Maintaining strong academic benchmarks for over four decades in Ekpoma, Edo State.</p>
            </div>
            <button
              onClick={() => onNavigate('history')}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 transition-colors cursor-pointer"
            >
              Explore School History
            </button>
          </div>
        </section>
      )}

      {/* Call to action */}
      <div className="rounded-3xl bg-blue-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div>
          <h4 className="text-lg font-bold text-white font-serif">Interested in Admissions for Your Child?</h4>
          <p className="text-xs sm:text-sm text-blue-200">Submit an online enquiry or contact our admissions office in Ekpoma.</p>
        </div>
        <button
          onClick={() => onNavigate('admissions')}
          className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer shrink-0"
        >
          Go to Admissions Enquiry
        </button>
      </div>
    </div>
  );
};
