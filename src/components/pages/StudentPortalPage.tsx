import React, { useState } from 'react';
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
  UserCheck 
} from 'lucide-react';
import { SchoolCrest } from '../common/SchoolCrest';

export const StudentPortalPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginId, setLoginId] = useState('ESS/2024/042');
  const [password, setPassword] = useState('••••••••');
  const [activeTab, setActiveTab] = useState<'overview' | 'results' | 'attendance' | 'timetable' | 'assignments' | 'fees'>('overview');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleDemoLogin = () => {
    setLoginId('ESS/2024/042');
    setPassword('demo-student');
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto my-12 space-y-6">
        <div className="text-center space-y-3">
          <SchoolCrest size="lg" />
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Student & Parent Portal
          </h1>
          <p className="text-xs text-slate-600">
            Sign in with your Student ID or Registered Parent Email to access term results, attendance, assignments, and school fee records.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            <strong>Portal Demonstration Mode:</strong> You can click the "Quick Demo Login" button below to explore the student dashboard interface.
          </span>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Student ID / Parent Email
              </label>
              <input
                id="input-portal-login-id"
                type="text"
                required
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                placeholder="e.g. ESS/2024/042"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Access Password
              </label>
              <input
                id="input-portal-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-900 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-blue-900" />
                <span>Remember ID</span>
              </label>
              <button type="button" className="text-blue-900 font-semibold hover:underline">
                Forgot Password?
              </button>
            </div>

            <button
              id="btn-submit-portal-login"
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
            >
              Sign In to Portal
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100">
            <button
              id="btn-demo-portal-login"
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore as Demo Student (SS 2 Science)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Logged-in Student Dashboard View
  return (
    <div className="space-y-8">
      {/* Student Profile Card Header */}
      <section className="bg-slate-950 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400/60 flex items-center justify-center text-amber-400 font-black text-xl">
            OE
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Osasere Emmanuel
              </h2>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold uppercase">
                Active Student
              </span>
            </div>
            <p className="text-xs text-amber-400 font-semibold mt-0.5">
              Class: SS 2 Science (Gold) • Student ID: ESS/2024/042
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Academic Session: 2024/2025 • Term: Second Term
            </p>
          </div>
        </div>

        <button
          id="btn-portal-logout"
          onClick={() => setIsLoggedIn(false)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </section>

      {/* Demonstration Banner */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
          <strong>Demonstration Portal View:</strong> Displays live sample student academic records, continuous assessments, and timetable.
        </span>
        <span className="text-[11px] font-bold text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded">
          Staging Mode
        </span>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {[
          { id: 'overview', label: 'Dashboard Overview' },
          { id: 'results', label: 'Term Results & Report Card' },
          { id: 'attendance', label: 'Attendance Record' },
          { id: 'timetable', label: 'Class Timetable' },
          { id: 'assignments', label: 'Assignments' },
          { id: 'fees', label: 'School Fees' },
        ].map((tab) => (
          <button
            key={tab.id}
            id={`tab-portal-${tab.id}`}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'bg-blue-900 text-white shadow'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-500 uppercase">Average Score</span>
              <p className="text-2xl font-black text-blue-900 mt-1">84.6%</p>
              <span className="text-[11px] text-emerald-700 font-semibold">Grade A (Distinction)</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-500 uppercase">Attendance Rate</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">96.4%</p>
              <span className="text-[11px] text-slate-500">54 / 56 School Days</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-500 uppercase">Pending Tasks</span>
              <p className="text-2xl font-black text-amber-600 mt-1">2</p>
              <span className="text-[11px] text-amber-700 font-semibold">Physics & Biology</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-500 uppercase">Fee Status</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">Cleared</p>
              <span className="text-[11px] text-emerald-700 font-semibold">Second Term Paid</span>
            </div>
          </div>

          {/* Current Subjects & Science Laboratory Practicals */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">Registered Subjects & Continuous Assessment</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { subject: 'Physics (Theory & Practical)', score: '88% (A1)', lab: 'Lab Session Mon 10:00' },
                { subject: 'Chemistry (Volumetric Lab)', score: '82% (B2)', lab: 'Lab Session Wed 11:30' },
                { subject: 'Biology (Specimen Study)', score: '86% (A1)', lab: 'Lab Session Thu 09:00' },
                { subject: 'Mathematics & Further Maths', score: '91% (A1)', lab: 'Classroom Tutorial' },
                { subject: 'English Language & Essay', score: '79% (B3)', lab: 'Literary Session' },
                { subject: 'Agricultural Science', score: '85% (A1)', lab: 'School Farm Practical' },
              ].map((sub, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{sub.subject}</span>
                    <span className="font-extrabold text-blue-900">{sub.score}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <FlaskConical className="w-3 h-3 text-emerald-700" />
                    {sub.lab}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Results & Report Card */}
      {activeTab === 'results' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Official Term Report Sheet (Sample Record)</h3>
              <p className="text-xs text-slate-500">Second Term Examination Results • Session 2024/2025</p>
            </div>
            <button
              onClick={() => alert('Report Card download format is ready. Connected to school print template.')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-900 text-white font-bold text-xs shadow cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Result</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-800 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">CA (40%)</th>
                  <th className="py-3 px-4">Exam (60%)</th>
                  <th className="py-3 px-4">Total (100%)</th>
                  <th className="py-3 px-4">Grade</th>
                  <th className="py-3 px-4">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: 'Mathematics', ca: 38, exam: 53, total: 91, grade: 'A1', rem: 'Outstanding analytical skills' },
                  { name: 'Physics', ca: 36, exam: 52, total: 88, grade: 'A1', rem: 'Excellent lab practicals' },
                  { name: 'Chemistry', ca: 34, exam: 48, total: 82, grade: 'B2', rem: 'Very Good performance' },
                  { name: 'Biology', ca: 35, exam: 51, total: 86, grade: 'A1', rem: 'Comprehensive understanding' },
                  { name: 'English Language', ca: 31, exam: 48, total: 79, grade: 'B3', rem: 'Good comprehension' },
                  { name: 'Agricultural Science', ca: 35, exam: 50, total: 85, grade: 'A1', rem: 'Commendable diligence' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900">{row.name}</td>
                    <td className="py-3 px-4">{row.ca}</td>
                    <td className="py-3 px-4">{row.exam}</td>
                    <td className="py-3 px-4 font-bold text-blue-900">{row.total}</td>
                    <td className="py-3 px-4 font-extrabold text-emerald-700">{row.grade}</td>
                    <td className="py-3 px-4 text-slate-600">{row.rem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Attendance */}
      {activeTab === 'attendance' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Term Attendance Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="text-xs font-bold text-emerald-900">Days Present</span>
              <p className="text-2xl font-black text-emerald-700 mt-1">54 Days</p>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <span className="text-xs font-bold text-amber-900">Excused Absence</span>
              <p className="text-2xl font-black text-amber-700 mt-1">2 Days</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-900">Unexcused</span>
              <p className="text-2xl font-black text-slate-700 mt-1">0 Days</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Timetable */}
      {activeTab === 'timetable' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Weekly Class Timetable (SS 2 Science)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, i) => (
              <div key={day} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-blue-900 block border-b border-slate-200 pb-1">{day}</span>
                <p className="text-[11px] text-slate-700">08:00 - Devotion</p>
                <p className="text-[11px] font-semibold text-slate-900">08:30 - Mathematics</p>
                <p className="text-[11px] font-semibold text-emerald-800">10:00 - Science Lab</p>
                <p className="text-[11px] font-semibold text-slate-900">11:45 - English</p>
                <p className="text-[11px] text-slate-600">13:30 - Biology / Chem</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Assignments */}
      {activeTab === 'assignments' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Current Homework & Assignments</h3>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 text-sm block">Physics: Reflection and Refraction in Glass Prisms</span>
                <span className="text-xs text-slate-500">Laboratory Practical write-up • Due Friday</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs">
                Pending Submission
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 text-sm block">Chemistry: Periodic Trends & Ionization Energies</span>
                <span className="text-xs text-slate-500">Chapter 4 Review questions • Due Next Monday</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs">
                Completed
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: School Fees */}
      {activeTab === 'fees' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Fee Payment History & Breakdown</h3>
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center justify-between">
            <div>
              <span className="font-bold text-sm block">Second Term Tuition & Levies (2024/2025)</span>
              <span className="text-xs text-emerald-800">Receipt Ref: ESS/REC/2024/8892 • Status: Cleared</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-bold text-xs">
              Paid in Full
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
