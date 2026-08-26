import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  UserCheck, 
  FileCheck, 
  Bell, 
  Search, 
  Plus, 
  Check, 
  X, 
  Filter,
  DollarSign,
  Building,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { MOCK_STUDENTS_REGISTRY, MOCK_ADMISSION_APPLICATIONS, NEWS_ARTICLES } from '../../data/schoolData';
import { StudentProfile, AdmissionApplication } from '../../types';

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'students' | 'admissions' | 'announcements'>('students');
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState<StudentProfile[]>(MOCK_STUDENTS_REGISTRY);
  const [admissions, setAdmissions] = useState<AdmissionApplication[]>(MOCK_ADMISSION_APPLICATIONS);
  
  // Quick admission status updater
  const handleUpdateAdmissionStatus = (id: string, status: AdmissionApplication['status']) => {
    setAdmissions((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.className.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 py-10 pb-24">
      {/* Admin Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider mb-2">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>School Administration Portal</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900">
              Emaudo Academic Registry & Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Administrative controls for student enrollment, entrance examinations, and institutional circulars.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold">
              Admin Session Active
            </span>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-600" /> Enrolled Students
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900">854</div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-1">JSS 1 – SSS 3 Classes</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-blue-600" /> Certified Teachers
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900">42</div>
            <div className="text-[11px] text-blue-700 font-semibold mt-1">Science, Arts & Commercial</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-amber-600" /> Pending Admissions
            </div>
            <div className="text-2xl font-bold font-mono text-amber-900">{admissions.filter(a => a.status === 'Pending Review' || a.status === 'Entrance Test Scheduled').length}</div>
            <div className="text-[11px] text-amber-700 font-semibold mt-1">New 2024/2025 Applicants</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-teal-600" /> Avg. Attendance
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900">95.4%</div>
            <div className="text-[11px] text-teal-700 font-semibold mt-1">Active Term Rate</div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'students'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Students Directory ({students.length})
          </button>
          <button
            onClick={() => setActiveTab('admissions')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'admissions'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Admissions Processing ({admissions.length})
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'announcements'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Circulars & Announcements
          </button>
        </div>

        {/* Tab 1: Students Directory */}
        {activeTab === 'students' && (
          <div className="mt-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search name, ID, or class..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Showing {filteredStudents.length} of {students.length} student records
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-800 border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4 font-bold">Student ID</th>
                      <th className="py-3 px-4 font-bold">Full Name</th>
                      <th className="py-3 px-3 font-bold">Class</th>
                      <th className="py-3 px-3 font-bold">Guardian Contact</th>
                      <th className="py-3 px-3 font-bold">Fees Status</th>
                      <th className="py-3 px-3 font-bold">Attendance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-mono font-bold text-emerald-800">{student.studentId}</td>
                        <td className="py-3 px-4 font-semibold text-slate-900">{student.name}</td>
                        <td className="py-3 px-3 text-slate-700">{student.className}</td>
                        <td className="py-3 px-3 text-slate-600">
                          <div>{student.guardianName}</div>
                          <div className="font-mono text-[11px] text-slate-500">{student.guardianPhone}</div>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            student.feesStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {student.feesStatus}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono font-semibold text-slate-800">
                          {student.attendanceRate}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Admissions Processing */}
        {activeTab === 'admissions' && (
          <div className="mt-6 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-800 border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4 font-bold">Applicant Name</th>
                      <th className="py-3 px-3 font-bold">Class Requested</th>
                      <th className="py-3 px-4 font-bold">Parent Contact</th>
                      <th className="py-3 px-4 font-bold">Previous School</th>
                      <th className="py-3 px-3 font-bold">Status</th>
                      <th className="py-3 px-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {admissions.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">{app.applicantName}</td>
                        <td className="py-3 px-3 font-semibold text-emerald-800">{app.proposedClass}</td>
                        <td className="py-3 px-4 text-slate-600">
                          <div>{app.parentName}</div>
                          <div className="font-mono text-[11px] text-slate-500">{app.parentPhone}</div>
                        </td>
                        <td className="py-3 px-4 text-slate-600">{app.previousSchool}</td>
                        <td className="py-3 px-3">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            app.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                            app.status === 'Entrance Test Scheduled' ? 'bg-blue-100 text-blue-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleUpdateAdmissionStatus(app.id, 'Approved')}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleUpdateAdmissionStatus(app.id, 'Entrance Test Scheduled')}
                              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-[11px] font-bold cursor-pointer"
                            >
                              Schedule Test
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Announcements */}
        {activeTab === 'announcements' && (
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {NEWS_ARTICLES.map((article) => (
                <div key={article.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">{article.category}</span>
                    <span>{article.date}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{article.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2">{article.summary}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
