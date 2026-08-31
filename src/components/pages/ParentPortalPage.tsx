import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  FileText, 
  Calendar, 
  CreditCard, 
  CheckCircle2, 
  Printer, 
  Download, 
  Clock, 
  AlertCircle, 
  UserCheck, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  Phone, 
  MessageCircle,
  LogOut,
  ChevronDown,
  Cpu,
  Award,
  Bell,
  MessageSquare,
  ChevronRight,
  Receipt
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { LoginPage } from '../auth/LoginPage';
import { MOCK_STUDENT_RESULTS } from '../../data/schoolData';
import { MOCK_STUDENT_EXAM_HISTORY, MOCK_MESSAGES, MOCK_NOTIFICATIONS } from '../../data/expandedData';
import { SCHOOL_CONTACT } from '../../constants/contactInfo';
import { SchoolCommunicationModule } from '../communication/SchoolCommunicationModule';
import { TimetableModule } from '../timetable/TimetableModule';

export const ParentPortalPage: React.FC = () => {
  const { profile, signOut, isDemo, isAuthenticated, role } = useAuth();
  const [activeTab, setActiveTab] = useState<
    'overview' | 'results' | 'cbt' | 'timetable' | 'attendance' | 'fees' | 'messages' | 'notices'
  >('overview');
  
  // Multi-ward switcher
  const [selectedWard, setSelectedWard] = useState<string>('ESS/2024/0142');

  if (!isAuthenticated || (role !== 'parent' && role !== 'admin' && role !== 'superadmin')) {
    return (
      <div className="py-10 px-4 max-w-7xl mx-auto">
        <LoginPage 
          defaultRole="parent"
          title="Parent & Guardian Portal Login"
          subtitle="Sign in with your registered guardian account to monitor your ward's terminal report cards, CBT assessments, attendance, and tuition records."
        />
      </div>
    );
  }

  const wardOptions = [
    { id: 'ESS/2024/0142', name: 'Osasere Emmanuel', class: 'SS 2 Science A' },
    { id: 'ESS/2024/0199', name: 'Eromosele Emmanuel', class: 'JSS 1A' },
  ];

  const currentWardData = wardOptions.find(w => w.id === selectedWard) || wardOptions[0];
  const studentResult = MOCK_STUDENT_RESULTS[selectedWard] || MOCK_STUDENT_RESULTS['ESS/2024/0142'];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-10 py-8 pb-24">
      {/* Parent Header Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-900/60 border border-blue-500/30 text-blue-300 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>Parent & Guardian Portal</span>
              </span>
              {isDemo && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold">
                  Demo Session
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Welcome, {profile?.full_name || 'Dr. & Mrs. Emmanuel'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Monitoring academic progress, terminal scores, and attendance for your registered wards.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Multi-Ward Selector */}
            <div className="bg-slate-800 px-3 py-2 rounded-2xl border border-slate-700 space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400 block">Switch Active Ward:</label>
              <select
                value={selectedWard}
                onChange={e => setSelectedWard(e.target.value)}
                className="bg-slate-900 text-amber-400 font-bold text-xs rounded-lg px-2 py-1 border border-slate-700 focus:outline-none cursor-pointer"
              >
                {wardOptions.map(w => (
                  <option key={w.id} value={w.id}>
                    {w.name} ({w.class})
                  </option>
                ))}
              </select>
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

        {/* Sub-Navigation Tabs */}
        <div className="pt-6 flex flex-wrap items-center gap-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Ward Summary', icon: <GraduationCap className="w-4 h-4" /> },
            { id: 'results', label: 'Terminal Report Card', icon: <FileText className="w-4 h-4" /> },
            { id: 'cbt', label: 'CBT Test Results', icon: <Cpu className="w-4 h-4" /> },
            { id: 'timetable', label: 'Class Timetable', icon: <Calendar className="w-4 h-4" /> },
            { id: 'attendance', label: 'Attendance Record', icon: <UserCheck className="w-4 h-4" /> },
            { id: 'fees', label: 'Tuition & Levies', icon: <CreditCard className="w-4 h-4" /> },
            { id: 'messages', label: 'Teacher Messaging', icon: <MessageSquare className="w-4 h-4" /> },
            { id: 'notices', label: 'School Notices', icon: <Bell className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-900 text-white shadow-xs'
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
        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-emerald-600" /> Overall Terminal Average
                </div>
                <div className="text-3xl font-bold font-mono text-emerald-700">{studentResult.averageScore}%</div>
                <div className="text-[11px] text-slate-500 mt-1">Class Rank: {studentResult.position} in class</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-blue-600" /> Roll Call Attendance
                </div>
                <div className="text-3xl font-bold font-mono text-blue-700">
                  {Math.round((studentResult.attendanceDays / studentResult.totalSchoolDays) * 100)}%
                </div>
                <div className="text-[11px] text-slate-500 mt-1">{studentResult.attendanceDays} of {studentResult.totalSchoolDays} school days</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-teal-600" /> School Fees Clearance
                </div>
                <div className="text-2xl font-bold font-mono text-teal-800">Fully Paid</div>
                <div className="text-[11px] text-emerald-700 font-semibold mt-1">1st Term 2024/2025 Settled</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-600" /> Next Term Resumption
                </div>
                <div className="text-base font-bold font-mono text-slate-900">{studentResult.nextTermBegins}</div>
                <div className="text-[11px] text-slate-500 mt-1">2nd Term 2024/2025</div>
              </div>
            </div>

            {/* Ward Quick Dossier */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4 shadow-2xs">
              <h2 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-700" />
                <span>Ward Academic Dossier • {currentWardData.name}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 font-semibold block uppercase tracking-wider text-[10px]">Student Full Name</span>
                  <span className="text-slate-900 font-bold text-sm">{currentWardData.name}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 font-semibold block uppercase tracking-wider text-[10px]">Academic Class</span>
                  <span className="text-slate-900 font-bold text-sm">{currentWardData.class}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 font-semibold block uppercase tracking-wider text-[10px]">Form Master / Class Teacher</span>
                  <span className="text-slate-900 font-bold text-sm">Mr. E. Akhere</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 text-xs text-blue-900 space-y-1">
                <strong>Class Form Master's Comprehensive Appraisal:</strong>
                <p className="italic text-slate-700 font-serif text-sm">"{studentResult.classTeacherRemark}"</p>
              </div>
            </div>
          </div>
        )}

        {/* 2. RESULTS TAB */}
        {activeTab === 'results' && (
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-xl font-serif font-bold text-slate-900">
                  Official Terminal Examination Report Card
                </h2>
                <p className="text-xs text-slate-500">
                  {studentResult.term} • Session {studentResult.session} • {currentWardData.name} ({selectedWard})
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

        {/* 3. CBT TEST RESULTS */}
        {activeTab === 'cbt' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-serif font-bold text-base text-slate-900">
                  Online CBT Mock Tests & Continuous Assessments
                </h3>
                <p className="text-xs text-slate-500">
                  Real-time Computer-Based Testing records and automated marking transcripts.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th className="p-3">Exam Subject</th>
                    <th className="p-3">Date Completed</th>
                    <th className="p-3">Raw Score</th>
                    <th className="p-3">Percentage</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Teacher Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_STUDENT_EXAM_HISTORY.map(hist => (
                    <tr key={hist.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900">SS 2 Mathematics Mock Examination</td>
                      <td className="p-3 text-slate-500 font-mono">{new Date(hist.submitted_at).toLocaleDateString()}</td>
                      <td className="p-3 font-mono font-bold text-slate-800">{hist.score} / {hist.total_marks}</td>
                      <td className="p-3 font-mono font-bold text-emerald-700">{hist.percentage}%</td>
                      <td className="p-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          Passed
                        </span>
                      </td>
                      <td className="p-3 text-slate-600 italic">{hist.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. TIMETABLE TAB */}
        {activeTab === 'timetable' && (
          <TimetableModule defaultClass="SS 2 Science A" />
        )}

        {/* 5. ATTENDANCE TAB */}
        {activeTab === 'attendance' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h2 className="font-serif font-bold text-xl text-slate-900">
                  Ward Attendance Roll Call & Punctuality Record
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

            {/* Attendance Progress & Metrics */}
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

        {/* 6. FEES TAB */}
        {activeTab === 'fees' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-serif font-bold text-xl text-slate-900">Term Tuition & Levies Ledger</h2>
                <p className="text-xs text-slate-500">Official fee schedule and verified bursary receipts for {currentWardData.name}</p>
              </div>
              <button onClick={handlePrint} className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                <Printer className="w-3.5 h-3.5" />
                <span>Print Statement</span>
              </button>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">1st Term Tuition & Curriculum Material</div>
                  <div className="text-[11px] text-slate-500 font-mono">Receipt #ESS-2024-0891 • Paid via Bank Transfer</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold">₦28,500 (Paid)</span>
              </div>
              <div className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Chevron Science Laboratory Maintenance & Consumables</div>
                  <div className="text-[11px] text-slate-500 font-mono">Receipt #ESS-2024-0914 • Paid</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold">₦6,000 (Paid)</span>
              </div>
              <div className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">PTA Development Levy 2024/2025</div>
                  <div className="text-[11px] text-slate-500 font-mono">Receipt #PTA-2024-0412 • Paid</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold">₦3,500 (Paid)</span>
              </div>
            </div>
          </div>
        )}

        {/* 7. TEACHER MESSAGING TAB */}
        {activeTab === 'messages' && (
          <SchoolCommunicationModule />
        )}

        {/* 8. NOTICES TAB */}
        {activeTab === 'notices' && (
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-900">School Resumption & Examination Announcements</h3>
            <div className="space-y-3">
              {MOCK_NOTIFICATIONS.map(notif => (
                <div key={notif.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold">
                      {notif.category.toUpperCase()}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{new Date(notif.created_at).toLocaleDateString()}</span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-slate-900">{notif.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{notif.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
