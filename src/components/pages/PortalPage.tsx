import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  FileText, 
  Calendar, 
  CheckCircle2, 
  Printer, 
  Download, 
  Clock, 
  CreditCard, 
  BookOpen, 
  UserCheck,
  AlertCircle,
  Award,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { MOCK_STUDENT_RESULTS } from '../../data/schoolData';
import { StudentResultRecord } from '../../types';
import { WhatsAppButton } from '../common/WhatsAppButton';
import { CallButton } from '../common/CallButton';

export const PortalPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'result' | 'attendance' | 'fees' | 'timetable'>('result');
  const [studentIdInput, setStudentIdInput] = useState<string>('ESS/2024/0142');
  const [termSelect, setTermSelect] = useState<string>('1st Term');
  const [sessionSelect, setSessionSelect] = useState<string>('2024/2025');
  const [pinInput, setPinInput] = useState<string>('4892-7710-3341');
  const [searchedRecord, setSearchedRecord] = useState<StudentResultRecord | null>(MOCK_STUDENT_RESULTS['ESS/2024/0142']);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleCheckResult = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(null);
    const cleanedId = studentIdInput.trim().toUpperCase();
    const result = MOCK_STUDENT_RESULTS[cleanedId];
    if (result) {
      setSearchedRecord(result);
    } else {
      setSearchError(`No examination record found for Student ID "${cleanedId}". Please try demo IDs: ESS/2024/0142, ESS/2024/0088, or ESS/2024/0210.`);
    }
  };

  const handleDemoSelect = (id: string) => {
    setStudentIdInput(id);
    setSearchError(null);
    setSearchedRecord(MOCK_STUDENT_RESULTS[id] || null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-16 py-10 pb-24">
      {/* Portal Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Portal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 leading-tight">
            Student & Parent Digital Portal
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-light">
            Check terminal examination results, review class attendance percentages, download assignments, and view school fee payment status.
          </p>

          {/* Portal Sub-tabs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveTab('result')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'result'
                  ? 'bg-emerald-800 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Result Checker</span>
            </button>

            <button
              onClick={() => setActiveTab('attendance')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'attendance'
                  ? 'bg-emerald-800 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Attendance Tracker</span>
            </button>

            <button
              onClick={() => setActiveTab('fees')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'fees'
                  ? 'bg-emerald-800 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>School Fees Ledger</span>
            </button>

            <button
              onClick={() => setActiveTab('timetable')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'timetable'
                  ? 'bg-emerald-800 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Weekly Timetable</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Tab Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'result' && (
          <div className="space-y-8">
            {/* Search Box */}
            <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between gap-2 mb-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Search className="w-5 h-5 text-emerald-600" />
                  <span>Check Terminal Result</span>
                </h3>
                <span className="text-xs text-slate-500 font-medium">Session: 2024/2025</span>
              </div>

              <form onSubmit={handleCheckResult} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Student ID Number
                    </label>
                    <input
                      type="text"
                      required
                      value={studentIdInput}
                      onChange={(e) => setStudentIdInput(e.target.value)}
                      placeholder="e.g. ESS/2024/0142"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Academic Term
                    </label>
                    <select
                      value={termSelect}
                      onChange={(e) => setTermSelect(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      <option value="1st Term">1st Term</option>
                      <option value="2nd Term">2nd Term</option>
                      <option value="3rd Term">3rd Term</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Result PIN / Card
                    </label>
                    <input
                      type="text"
                      value={pinInput}
                      onChange={(e) => setPinInput(e.target.value)}
                      placeholder="XXXX-XXXX-XXXX"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <span className="font-semibold">Quick Demo IDs:</span>
                    <button
                      type="button"
                      onClick={() => handleDemoSelect('ESS/2024/0142')}
                      className="text-emerald-700 font-mono font-bold hover:underline cursor-pointer px-1"
                    >
                      ESS/2024/0142 (Science)
                    </button>
                    <span>|</span>
                    <button
                      type="button"
                      onClick={() => handleDemoSelect('ESS/2024/0088')}
                      className="text-emerald-700 font-mono font-bold hover:underline cursor-pointer px-1"
                    >
                      ESS/2024/0088 (Arts)
                    </button>
                    <span>|</span>
                    <button
                      type="button"
                      onClick={() => handleDemoSelect('ESS/2024/0210')}
                      className="text-emerald-700 font-mono font-bold hover:underline cursor-pointer px-1"
                    >
                      ESS/2024/0210 (JSS 2)
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Search className="w-4 h-4" />
                    <span>Generate Report Sheet</span>
                  </button>
                </div>
              </form>

              {searchError && (
                <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{searchError}</span>
                </div>
              )}
            </div>

            {/* Official Report Card View */}
            {searchedRecord && (
              <div id="official-report-card" className="max-w-4xl mx-auto bg-white rounded-3xl border-2 border-slate-300 p-6 sm:p-10 shadow-lg relative">
                {/* Print & Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-200 print:hidden">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Verified Official School Record</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrint}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Official Report</span>
                    </button>
                  </div>
                </div>

                {/* School Letterhead */}
                <div className="text-center space-y-1.5 pt-6 pb-6 border-b-2 border-slate-900">
                  <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center mx-auto shadow-sm">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-slate-950 uppercase">
                    Emaudo Secondary School
                  </h2>
                  <p className="text-xs font-bold text-slate-700 tracking-wide">
                    178 Osimen Street, Emaudo, Ekpoma, Edo State, Nigeria
                  </p>
                  <div className="text-[11px] font-mono text-slate-600">
                    Founded in 1980 by Prof. Ambrose Folorunsho Alli • Motto: Discipline & Scholastic Excellence
                  </div>
                  <div className="pt-2">
                    <span className="inline-block bg-slate-900 text-white px-4 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
                      Terminal Student Continuous Assessment & Examination Report
                    </span>
                  </div>
                </div>

                {/* Student Info Table */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 text-xs border-b border-slate-200">
                  <div>
                    <span className="text-slate-500 font-semibold block">Student Name:</span>
                    <strong className="text-slate-900 text-sm">{searchedRecord.studentName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block">Admission No / ID:</span>
                    <strong className="text-emerald-800 font-mono text-sm">{searchedRecord.studentId}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block">Class & Arm:</span>
                    <strong className="text-slate-900 text-sm">{searchedRecord.className}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block">Session & Term:</span>
                    <strong className="text-slate-900 text-sm">{searchedRecord.session} ({searchedRecord.term})</strong>
                  </div>
                </div>

                {/* Scores Matrix */}
                <div className="overflow-x-auto py-6">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-800 border-y border-slate-300">
                        <th className="py-2.5 px-3 font-bold">Subject</th>
                        <th className="py-2.5 px-2 text-center font-bold">CA 1 (20)</th>
                        <th className="py-2.5 px-2 text-center font-bold">CA 2 (20)</th>
                        <th className="py-2.5 px-2 text-center font-bold">Exam (60)</th>
                        <th className="py-2.5 px-2 text-center font-bold">Total (100)</th>
                        <th className="py-2.5 px-2 text-center font-bold">Grade</th>
                        <th className="py-2.5 px-3 font-bold">Remark</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {searchedRecord.scores.map((s, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                          <td className="py-2 px-3 font-semibold text-slate-900">{s.subject}</td>
                          <td className="py-2 px-2 text-center font-mono">{s.ca1}</td>
                          <td className="py-2 px-2 text-center font-mono">{s.ca2}</td>
                          <td className="py-2 px-2 text-center font-mono">{s.exam}</td>
                          <td className="py-2 px-2 text-center font-mono font-bold text-slate-950">{s.total}</td>
                          <td className="py-2 px-2 text-center font-mono font-bold">
                            <span className={`px-2 py-0.5 rounded text-[11px] ${
                              s.grade.startsWith('A') ? 'bg-emerald-100 text-emerald-800' :
                              s.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                              s.grade.startsWith('C') ? 'bg-teal-100 text-teal-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {s.grade}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-slate-600">{s.remark}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Summary Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs mb-6">
                  <div>
                    <span className="text-slate-500 font-semibold block">Total Aggregate:</span>
                    <strong className="text-slate-900 text-sm font-mono">{searchedRecord.totalScore} / {searchedRecord.scores.length * 100}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block">Term Average:</span>
                    <strong className="text-emerald-800 text-sm font-mono">{searchedRecord.averageScore.toFixed(1)}%</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block">Position in Class:</span>
                    <strong className="text-slate-900 text-sm">{searchedRecord.position}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block">Attendance Record:</span>
                    <strong className="text-slate-900 text-sm font-mono">{searchedRecord.attendanceDays} / {searchedRecord.totalSchoolDays} Days</strong>
                  </div>
                </div>

                {/* Teacher Remarks & Digital Stamp */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pt-4 border-t border-slate-200 text-xs">
                  <div className="sm:col-span-8 space-y-3">
                    <div>
                      <span className="font-bold text-slate-700 block">Class Teacher's Remark:</span>
                      <p className="text-slate-800 italic bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        "{searchedRecord.classTeacherRemark}"
                      </p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 block">Principal's Evaluation:</span>
                      <p className="text-slate-800 italic bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        "{searchedRecord.principalRemark}"
                      </p>
                    </div>
                    <div className="text-[11px] font-bold text-emerald-800 pt-1">
                      📅 Next Term Resumption Date: {searchedRecord.nextTermBegins}
                    </div>
                  </div>

                  <div className="sm:col-span-4 flex flex-col items-center justify-center p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-emerald-600 flex items-center justify-center text-emerald-800 font-black text-[9px] uppercase tracking-tighter text-center leading-tight mb-2 rotate-[-5deg]">
                      EMAUDO SEC SCH<br />★ SEAL ★<br />EKPOMA
                    </div>
                    <span className="text-[10px] font-mono text-emerald-900 uppercase font-bold">
                      Official Digital Endorsement
                    </span>
                    <span className="text-[9px] text-slate-500">
                      ID: {searchedRecord.studentId}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Attendance Tracker View */}
        {activeTab === 'attendance' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Term Attendance Overview</h3>
                  <p className="text-xs text-slate-500">Current Academic Term: 1st Term (2024/2025)</p>
                </div>
                <div className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold">
                  Class Attendance Average: 95.2%
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="text-xs text-slate-500 font-semibold mb-1">Total School Days</div>
                  <div className="text-2xl font-bold font-mono text-slate-900">65 Days</div>
                </div>
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
                  <div className="text-xs text-emerald-800 font-semibold mb-1">Days Present</div>
                  <div className="text-2xl font-bold font-mono text-emerald-900">62 Days</div>
                </div>
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
                  <div className="text-xs text-amber-800 font-semibold mb-1">Excused Absence</div>
                  <div className="text-2xl font-bold font-mono text-amber-900">3 Days</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                <strong>School Attendance Policy:</strong> Students must maintain a minimum of 85% attendance across the 65 mandatory instructional days to be eligible to sit for terminal examinations and national assessments.
              </div>
            </div>
          </div>
        )}

        {/* School Fees View */}
        {activeTab === 'fees' && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">School Fees & Levies Status</h3>
                <p className="text-xs text-slate-500">Official Student Account Clearance</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                Status: Fully Cleared
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Student Account:</span>
                <strong className="text-slate-900 font-mono">Osahon Emmanuel Okojie (ESS/2024/0142)</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Term / Session:</span>
                <strong className="text-slate-900">1st Term 2024/2025</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Tuition & PTA Operational Levy:</span>
                <strong className="text-slate-900 font-mono">Paid (Cleared)</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Science Lab & Practical Fees:</span>
                <strong className="text-slate-900 font-mono">Paid (Cleared)</strong>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-900 flex items-center justify-between">
              <div>
                <div className="font-bold">Receipt Reference: ESS-REC-2024-8841</div>
                <div className="text-[11px] text-emerald-700">Bank Ref: Certified Bursary Receipt</div>
              </div>
              <button 
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs"
              >
                Print Receipt
              </button>
            </div>
          </div>
        )}

        {/* Timetable View */}
        {activeTab === 'timetable' && (
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Weekly Class Timetable (SSS 2 Science)</h3>
                <p className="text-xs text-slate-500">Regular Academic Hours: 8:00 AM - 2:00 PM</p>
              </div>
              <span className="text-xs font-mono font-bold bg-slate-100 text-slate-800 px-3 py-1 rounded-lg">
                5 Periods / Day
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                <strong className="block font-bold text-emerald-800 border-b pb-1">Monday</strong>
                <p>08:00 - English Lang</p>
                <p>09:00 - Mathematics</p>
                <p>10:20 - Physics</p>
                <p>11:40 - Biology</p>
                <p>13:00 - Civic Education</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                <strong className="block font-bold text-emerald-800 border-b pb-1">Tuesday</strong>
                <p>08:00 - Chemistry</p>
                <p>09:00 - Physics Lab</p>
                <p>10:20 - English Lang</p>
                <p>11:40 - Further Maths</p>
                <p>13:00 - Agric Science</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                <strong className="block font-bold text-emerald-800 border-b pb-1">Wednesday</strong>
                <p>08:00 - Mathematics</p>
                <p>09:00 - Chemistry Lab</p>
                <p>10:20 - Computer Sci</p>
                <p>11:40 - Biology Lab</p>
                <p>13:00 - Sports / Clubs</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                <strong className="block font-bold text-emerald-800 border-b pb-1">Thursday</strong>
                <p>08:00 - English Lang</p>
                <p>09:00 - Physics</p>
                <p>10:20 - Chemistry</p>
                <p>11:40 - Agric Science</p>
                <p>13:00 - Library Period</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                <strong className="block font-bold text-emerald-800 border-b pb-1">Friday</strong>
                <p>08:00 - Mathematics</p>
                <p>09:00 - Computer Sci</p>
                <p>10:20 - Civic Education</p>
                <p>11:40 - Guidance / Mentoring</p>
                <p>12:45 - Closing Assembly</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
