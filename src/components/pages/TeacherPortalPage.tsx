import React, { useState } from 'react';
import { 
  BookOpen, 
  Users, 
  CheckCircle2, 
  Plus, 
  Save, 
  FileText, 
  Calendar, 
  Sparkles, 
  LogOut, 
  GraduationCap, 
  Check, 
  Clock, 
  Search, 
  Filter, 
  AlertCircle,
  FlaskConical,
  Cpu,
  Library,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AttendanceRegisterModule } from '../attendance/AttendanceRegisterModule';
import { LoginPage } from '../auth/LoginPage';
import { MOCK_STUDENTS_REGISTRY } from '../../data/schoolData';
import { CbtExamModule } from '../cbt/CbtExamModule';
import { DigitalLibraryModule } from '../library/DigitalLibraryModule';
import { TimetableModule } from '../timetable/TimetableModule';
import { SchoolCommunicationModule } from '../communication/SchoolCommunicationModule';

interface StudentGradeEntry {
  id: string;
  studentId: string;
  name: string;
  className: string;
  ca1: number;
  ca2: number;
  exam: number;
  total: number;
  grade: string;
}

export const TeacherPortalPage: React.FC = () => {
  const { profile, signOut, isDemo, isAuthenticated, role } = useAuth();
  const [activeTab, setActiveTab] = useState<
    'gradebook' | 'attendance' | 'cbt' | 'library' | 'timetable' | 'messages' | 'assignments' | 'practicals'
  >('gradebook');
  const [selectedClass, setSelectedClass] = useState<string>('SS 2 Science A');
  const [selectedSubject, setSelectedSubject] = useState<string>('Physics');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  if (!isAuthenticated || (role !== 'teacher' && role !== 'admin' && role !== 'superadmin')) {
    return (
      <div className="py-10 px-4 max-w-7xl mx-auto">
        <LoginPage 
          defaultRole="teacher"
          title="Faculty & Teacher Portal Login"
          subtitle="Sign in with your verified faculty credentials to manage CBT assessments, CA scores, timetable, and parent communications."
        />
      </div>
    );
  }

  // Initial student roster for grading
  const [gradeEntries, setGradeEntries] = useState<StudentGradeEntry[]>([
    { id: '1', studentId: 'ESS/2024/0142', name: 'Osasere Emmanuel', className: 'SS 2 Science A', ca1: 18, ca2: 19, exam: 54, total: 91, grade: 'A1' },
    { id: '2', studentId: 'ESS/2024/0088', name: 'Efeosa Destiny', className: 'SS 2 Science A', ca1: 16, ca2: 17, exam: 51, total: 84, grade: 'A1' },
    { id: '3', studentId: 'ESS/2024/0210', name: 'Blessing Omoruyi', className: 'SS 2 Science A', ca1: 15, ca2: 16, exam: 48, total: 79, grade: 'B2' },
    { id: '4', studentId: 'ESS/2024/0304', name: 'Goodluck Ighodaro', className: 'SS 2 Science A', ca1: 14, ca2: 15, exam: 45, total: 74, grade: 'B3' },
    { id: '5', studentId: 'ESS/2024/0411', name: 'Precious Akhere', className: 'SS 2 Science A', ca1: 17, ca2: 18, exam: 52, total: 87, grade: 'A1' },
  ]);

  const handleScoreChange = (id: string, field: 'ca1' | 'ca2' | 'exam', value: number) => {
    setGradeEntries((prev) =>
      prev.map((entry) => {
        if (entry.id === id) {
          const ca1 = field === 'ca1' ? Math.min(20, Math.max(0, value || 0)) : entry.ca1;
          const ca2 = field === 'ca2' ? Math.min(20, Math.max(0, value || 0)) : entry.ca2;
          const exam = field === 'exam' ? Math.min(60, Math.max(0, value || 0)) : entry.exam;
          const total = ca1 + ca2 + exam;
          let grade = 'F9';
          if (total >= 75) grade = 'A1';
          else if (total >= 70) grade = 'B2';
          else if (total >= 65) grade = 'B3';
          else if (total >= 60) grade = 'C4';
          else if (total >= 55) grade = 'C5';
          else if (total >= 50) grade = 'C6';
          else if (total >= 45) grade = 'D7';
          else if (total >= 40) grade = 'E8';

          return { ...entry, ca1, ca2, exam, total, grade };
        }
        return entry;
      })
    );
  };

  const handleSaveGrades = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  return (
    <div className="space-y-12 py-8 pb-24">
      {/* Teacher Header Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-900/60 border border-amber-500/30 text-amber-300 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Academic Faculty Portal</span>
              </span>
              {isDemo && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold">
                  Demo Session
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Welcome, {profile?.full_name || 'Mr. Akhigbe Christopher'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Department of Sciences & Modern Laboratory Coordinator • Emaudo Secondary School
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-700">
              <div className="text-[10px] uppercase font-bold text-slate-400">Assigned Class</div>
              <div className="text-xs sm:text-sm font-mono font-bold text-emerald-400">SS 2 Science A</div>
            </div>
            <button
              onClick={() => signOut()}
              className="px-4 py-2.5 rounded-xl bg-rose-900/40 hover:bg-rose-900/60 border border-rose-500/30 text-rose-200 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="pt-6 flex flex-wrap items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {[
            { id: 'gradebook', label: 'CA & Terminal Scores', icon: <FileText className="w-4 h-4" /> },
            { id: 'cbt', label: 'CBT Examination System', icon: <Cpu className="w-4 h-4" /> },
            { id: 'library', label: 'Digital Library & E-Books', icon: <Library className="w-4 h-4" /> },
            { id: 'timetable', label: 'Teaching Timetable', icon: <Calendar className="w-4 h-4" /> },
            { id: 'attendance', label: 'Class Roll Call', icon: <Users className="w-4 h-4" /> },
            { id: 'messages', label: 'Parent Communication', icon: <MessageSquare className="w-4 h-4" /> },
            { id: 'assignments', label: 'Homework & Projects', icon: <GraduationCap className="w-4 h-4" /> },
            { id: 'practicals', label: 'Science Lab Schedules', icon: <FlaskConical className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Main Tab Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. GRADEBOOK TAB */}
        {activeTab === 'gradebook' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-xl font-serif font-bold text-slate-900">
                  Continuous Assessment (CA 40%) & Terminal Examination (60%)
                </h2>
                <p className="text-xs text-slate-500">
                  Scores entered here immediately sync to terminal report cards and parent portal view upon publication.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {savedSuccess && (
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Scores Saved Successfully</span>
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleSaveGrades}
                  className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Scores to Database</span>
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-600 uppercase">Class:</span>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-semibold text-slate-800 focus:outline-none"
                >
                  <option>SS 2 Science A</option>
                  <option>SS 2 Science B</option>
                  <option>SS 3 Science Gold</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-600 uppercase">Subject:</span>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-semibold text-slate-800 focus:outline-none"
                >
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Further Mathematics</option>
                  <option>General Science</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-600 uppercase">Term:</span>
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded">1st Term 2024/2025</span>
              </div>
            </div>

            {/* Interactive Grading Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white font-bold uppercase tracking-wider">
                    <th className="py-3 px-4 rounded-l-xl">Student ID</th>
                    <th className="py-3 px-4">Student Name</th>
                    <th className="py-3 px-3 text-center">1st CA (Max 20)</th>
                    <th className="py-3 px-3 text-center">2nd CA (Max 20)</th>
                    <th className="py-3 px-3 text-center">Exam (Max 60)</th>
                    <th className="py-3 px-3 text-center font-mono">Total (100)</th>
                    <th className="py-3 px-3 text-center rounded-r-xl">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {gradeEntries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-slate-600">{entry.studentId}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{entry.name}</td>
                      <td className="py-3 px-3 text-center">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          value={entry.ca1}
                          onChange={(e) => handleScoreChange(entry.id, 'ca1', parseInt(e.target.value) || 0)}
                          className="w-14 text-center font-mono font-bold bg-white border border-slate-300 rounded p-1"
                        />
                      </td>
                      <td className="py-3 px-3 text-center">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          value={entry.ca2}
                          onChange={(e) => handleScoreChange(entry.id, 'ca2', parseInt(e.target.value) || 0)}
                          className="w-14 text-center font-mono font-bold bg-white border border-slate-300 rounded p-1"
                        />
                      </td>
                      <td className="py-3 px-3 text-center">
                        <input
                          type="number"
                          min="0"
                          max="60"
                          value={entry.exam}
                          onChange={(e) => handleScoreChange(entry.id, 'exam', parseInt(e.target.value) || 0)}
                          className="w-14 text-center font-mono font-bold bg-white border border-slate-300 rounded p-1"
                        />
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-emerald-800 text-sm">{entry.total}</td>
                      <td className="py-3 px-3 text-center">
                        <span className="px-2 py-0.5 rounded font-extrabold bg-emerald-100 text-emerald-900">
                          {entry.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. CBT EXAMS TAB */}
        {activeTab === 'cbt' && (
          <CbtExamModule initialClass="SS 2" />
        )}

        {/* 3. DIGITAL LIBRARY TAB */}
        {activeTab === 'library' && (
          <DigitalLibraryModule />
        )}

        {/* 4. TIMETABLE TAB */}
        {activeTab === 'timetable' && (
          <TimetableModule defaultClass="SS 2 Science A" />
        )}

        {/* 5. ATTENDANCE TAB */}
        {activeTab === 'attendance' && (
          <div className="space-y-6">
            <AttendanceRegisterModule />
          </div>
        )}

        {/* 6. PARENT COMMUNICATION TAB */}
        {activeTab === 'messages' && (
          <SchoolCommunicationModule />
        )}

        {/* 7. ASSIGNMENTS TAB */}
        {activeTab === 'assignments' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif font-bold text-xl text-slate-900">Term Assignments & Projects</h2>
              <button className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer">
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Assignment</span>
              </button>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs space-y-1">
              <span className="font-bold text-amber-950">Physics Holiday Project: Laws of Motion & Friction</span>
              <p className="text-slate-600">Due: Friday, 14th September 2024 • Max marks: 20 marks</p>
            </div>
          </div>
        )}

        {/* 8. PRACTICALS TAB */}
        {activeTab === 'practicals' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-emerald-700" />
              <h2 className="font-serif font-bold text-xl text-slate-900">Chevron Science Laboratory Sessions</h2>
            </div>
            <p className="text-xs text-slate-600">
              Hands-on experimental scheduling in the modernized 2017 Science Complex for SS 2 and SS 3 classes.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                <div className="font-bold text-emerald-950 text-sm">Physics Optics & Refraction Lab</div>
                <div className="text-slate-600 mt-1">Wednesday • 10:00 AM – 12:00 PM • Chevron Physics Lab</div>
              </div>
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200">
                <div className="font-bold text-blue-950 text-sm">Volumetric Analysis (Acid-Base Titration)</div>
                <div className="text-slate-600 mt-1">Thursday • 01:00 PM – 03:00 PM • Chevron Chemistry Lab</div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
