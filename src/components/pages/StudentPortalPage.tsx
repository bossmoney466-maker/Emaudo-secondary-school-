import React, { useState, useEffect } from 'react';
import { 
  AlertCircle, 
  Award, 
  Bell, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  Download, 
  FileText, 
  FlaskConical, 
  GraduationCap, 
  Lock, 
  LogOut, 
  Sparkles, 
  User, 
  UserCheck,
  Printer,
  Video,
  Cpu,
  Trophy,
  Library
} from 'lucide-react';
import { SchoolCrest } from '../common/SchoolCrest';
import { useAuth } from '../../context/AuthContext';
import { LoginPage } from '../auth/LoginPage';
import { MOCK_STUDENT_RESULTS } from '../../data/schoolData';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { LearningCentrePage } from './LearningCentrePage';
import { CbtExamModule } from '../cbt/CbtExamModule';
import { DigitalLibraryModule } from '../library/DigitalLibraryModule';
import { TimetableModule } from '../timetable/TimetableModule';
import { AchievementShowcaseModule } from '../achievements/AchievementShowcaseModule';

export const StudentPortalPage: React.FC = () => {
  const { profile, isAuthenticated, isDemo, signOut, role } = useAuth();
  const [activeTab, setActiveTab] = useState<
    'overview' | 'cbt' | 'library' | 'timetable' | 'learning' | 'results' | 'achievements' | 'attendance' | 'assignments' | 'fees'
  >('overview');
  
  const studentResult = MOCK_STUDENT_RESULTS['ESS/2024/0142'];

  if (!isAuthenticated || (role !== 'student' && role !== 'admin' && role !== 'superadmin')) {
    return (
      <div className="py-10 px-4">
        <LoginPage 
          defaultRole="student"
          title="Student Academic Portal Login"
          subtitle="Sign in with your institutional student credentials to access CBT examinations, digital library, timetable, and report cards."
        />
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Student Profile Card Header */}
      <section className="bg-slate-950 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400/60 flex items-center justify-center text-amber-400 font-black text-xl">
            {profile?.full_name?.substring(0, 2).toUpperCase() || 'OE'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {profile?.full_name || 'Osasere Emmanuel'}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-extrabold uppercase">
                Active Student
              </span>
              {isDemo && (
                <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold">
                  Demo
                </span>
              )}
            </div>
            <p className="text-xs text-amber-400 font-semibold mt-0.5">
              Class: {profile?.class_name || 'SS 2 Science A'} • Student ID: {profile?.student_id || 'ESS/2024/0142'}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Academic Session: 2024/2025 • Term: First Term
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
          <button
            id="btn-portal-logout"
            onClick={() => signOut()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-900/40 hover:bg-rose-900/60 border border-rose-500/30 text-rose-200 text-xs font-bold transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {[
          { id: 'overview', label: 'Dashboard Overview', icon: <GraduationCap className="w-4 h-4" /> },
          { id: 'cbt', label: 'Online CBT Exams', icon: <Cpu className="w-4 h-4" /> },
          { id: 'library', label: 'Digital Library', icon: <Library className="w-4 h-4" /> },
          { id: 'timetable', label: 'Class Timetable', icon: <Calendar className="w-4 h-4" /> },
          { id: 'learning', label: 'Video Classroom', icon: <Video className="w-4 h-4" /> },
          { id: 'results', label: 'Term Results & Report Card', icon: <FileText className="w-4 h-4" /> },
          { id: 'achievements', label: 'Student Honours', icon: <Trophy className="w-4 h-4" /> },
          { id: 'attendance', label: 'Attendance Record', icon: <UserCheck className="w-4 h-4" /> },
          { id: 'assignments', label: 'Assignments', icon: <BookOpen className="w-4 h-4" /> },
          { id: 'fees', label: 'School Fees', icon: <CreditCard className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            id={`tab-portal-${tab.id}`}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" /> Terminal Average
              </div>
              <div className="text-3xl font-bold font-mono text-emerald-800">{studentResult.averageScore}%</div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-1">Class Rank: {studentResult.position}</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-blue-600" /> Attendance Rate
              </div>
              <div className="text-3xl font-bold font-mono text-blue-700">96.8%</div>
              <div className="text-[11px] text-slate-500 mt-1">{studentResult.attendanceDays} of {studentResult.totalSchoolDays} days</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-teal-600" /> Fees Status
              </div>
              <div className="text-2xl font-bold font-mono text-teal-800">Clear</div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-1">First Term 2024/2025 Paid</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1.5">
                <FlaskConical className="w-4 h-4 text-purple-600" /> Science Lab Practical
              </div>
              <div className="text-lg font-bold text-slate-900">Physics Optics</div>
              <div className="text-[11px] text-purple-700 font-semibold mt-1">Wednesday • 10:00 AM</div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-900">Upcoming Academic Milestones</h3>
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Chemistry Practical Volumetric Analysis</span>
                  <span className="text-slate-500">Chevron Laboratory Complex</span>
                </div>
                <span className="font-mono font-bold text-emerald-800">Tomorrow • 1:00 PM</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Senior Secondary WAEC CBT Mock</span>
                  <span className="text-slate-500">ICT Examination Center</span>
                </div>
                <button
                  onClick={() => setActiveTab('cbt')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-bold cursor-pointer"
                >
                  Launch CBT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: CBT Exams */}
      {activeTab === 'cbt' && (
        <CbtExamModule initialClass={profile?.class_name || 'SS 2'} />
      )}

      {/* Tab 3: Digital Library */}
      {activeTab === 'library' && (
        <DigitalLibraryModule />
      )}

      {/* Tab 4: Timetable */}
      {activeTab === 'timetable' && (
        <TimetableModule defaultClass={profile?.class_name || 'SS 2 Science A'} />
      )}

      {/* Tab 5: Online Learning Centre */}
      {activeTab === 'learning' && (
        <LearningCentrePage />
      )}

      {/* Tab 6: Results */}
      {activeTab === 'results' && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-xl font-serif font-bold text-slate-900">
                Official Terminal Examination Report Card
              </h2>
              <p className="text-xs text-slate-500">
                {studentResult.term} • Session {studentResult.session} • {studentResult.studentName} ({studentResult.studentId})
              </p>
            </div>
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Slip</span>
            </button>
          </div>

          {/* Results Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-bold uppercase tracking-wider">
                  <th className="py-3 px-4 rounded-l-xl">Subject</th>
                  <th className="py-3 px-3 text-center">1st CA (20%)</th>
                  <th className="py-3 px-3 text-center">2nd CA (20%)</th>
                  <th className="py-3 px-3 text-center">Exam (60%)</th>
                  <th className="py-3 px-3 text-center font-mono">Total (100)</th>
                  <th className="py-3 px-3 text-center">Grade</th>
                  <th className="py-3 px-4 rounded-r-xl">Remark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {studentResult.scores.map((s, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{s.subject}</td>
                    <td className="py-3 px-3 text-center font-mono text-slate-700">{s.ca1}</td>
                    <td className="py-3 px-3 text-center font-mono text-slate-700">{s.ca2}</td>
                    <td className="py-3 px-3 text-center font-mono text-slate-700">{s.exam}</td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-emerald-800 text-sm">{s.total}</td>
                    <td className="py-3 px-3 text-center">
                      <span className="px-2 py-0.5 rounded font-extrabold bg-emerald-100 text-emerald-900 text-[11px]">
                        {s.grade}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-medium">{s.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 7: Achievements */}
      {activeTab === 'achievements' && (
        <AchievementShowcaseModule />
      )}

      {/* Tab 8: Attendance */}
      {activeTab === 'attendance' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h2 className="font-serif font-bold text-xl text-slate-900">
                Student Attendance Roll Call & Punctuality Record
              </h2>
              <p className="text-xs text-slate-500">
                {studentResult.studentName} ({studentResult.studentId}) • {studentResult.className} • 1st Term 2024/2025
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 font-extrabold text-xs flex items-center gap-1.5 self-start">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Excellent Standing (96.8%)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200">
              <span className="text-[11px] font-bold text-emerald-800 uppercase block">Present Days</span>
              <span className="text-2xl font-black text-emerald-900 mt-1 block">62</span>
              <span className="text-[10px] text-emerald-700 font-medium">Out of 65 school days</span>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200">
              <span className="text-[11px] font-bold text-amber-800 uppercase block">Late Arrivals</span>
              <span className="text-2xl font-black text-amber-900 mt-1 block">2</span>
              <span className="text-[10px] text-amber-700 font-medium">Punctual arrival after 08:00 AM</span>
            </div>
            <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200">
              <span className="text-[11px] font-bold text-blue-800 uppercase block">Excused Absences</span>
              <span className="text-2xl font-black text-blue-900 mt-1 block">1</span>
              <span className="text-[10px] text-blue-700 font-medium">Medical note verified</span>
            </div>
            <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200">
              <span className="text-[11px] font-bold text-rose-800 uppercase block">Unexcused</span>
              <span className="text-2xl font-black text-rose-900 mt-1 block">0</span>
              <span className="text-[10px] text-rose-700 font-medium">Zero truant flags</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 9: Assignments */}
      {activeTab === 'assignments' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="font-serif font-bold text-xl text-slate-900">Active Term Assignments</h3>
          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-amber-950 block">Physics: Friction & Momentum Problems #1–15</span>
                <span className="text-slate-600">Submit handwritten solutions in standard notebook</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-amber-200 text-amber-900 font-bold">Due Friday</span>
            </div>
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-blue-950 block">Chemistry: Write-up on Acid-Base Titration Method</span>
                <span className="text-slate-600">Chevron Practical Preparation</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-blue-200 text-blue-900 font-bold">Due Monday</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 10: Fees */}
      {activeTab === 'fees' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="font-serif font-bold text-xl text-slate-900">School Fees & Levies Receipt</h3>
          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-3 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">First Term 2024/2025 Tuition</span>
                <span className="text-slate-500 text-[11px]">Receipt #ESS-2024-0891</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold">₦28,500 (Cleared)</span>
            </div>
            <div className="py-3 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Chevron Science Laboratory Practical Levy</span>
                <span className="text-slate-500 text-[11px]">Receipt #ESS-2024-0914</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold">₦6,000 (Cleared)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
