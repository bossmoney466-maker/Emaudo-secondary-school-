import React, { useState } from 'react';
import { 
  AlertCircle, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  ChevronRight, 
  FileCheck, 
  FlaskConical, 
  GraduationCap, 
  Library, 
  Sparkles, 
  Users 
} from 'lucide-react';
import { PageTab } from '../../types';

interface AcademicsPageProps {
  onNavigate: (tab: PageTab) => void;
}

export const AcademicsPage: React.FC<AcademicsPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'science' | 'arts' | 'exams' | 'extracurricular'>('overview');

  return (
    <div className="space-y-12">
      {/* Header Banner */}
      <section className="rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white p-6 sm:p-12 border border-blue-800 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Academic Excellence</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Academic Rigour & Character Formation
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
            Preparing students in Ekpoma for national examinations, tertiary education, and ethical leadership through comprehensive Junior and Senior secondary programmes.
          </p>
        </div>
      </section>

      {/* Mandatory Curriculum Verification Disclaimer */}
      <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex items-start gap-3 shadow-sm">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm">
          <span className="font-bold">Official Notice:</span> Current curriculum information, subject offerings, and term schedules are to be confirmed directly with the school administration.
        </div>
      </div>

      {/* Academic Division Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {[
          { id: 'overview', label: 'Academic Overview' },
          { id: 'science', label: 'Science & Laboratory' },
          { id: 'arts', label: 'Arts & Commercial' },
          { id: 'exams', label: 'Exam Preparation (WAEC / NECO / BECE)' },
          { id: 'extracurricular', label: 'Clubs & Extracurriculars' },
        ].map((tab) => (
          <button
            key={tab.id}
            id={`tab-academic-${tab.id}`}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'bg-blue-900 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content Display */}
      {activeTab === 'overview' && (
        <section className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Junior Secondary School */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-black">
                  JSS
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Junior Secondary School (JSS 1 – 3)</h3>
                  <p className="text-xs text-slate-500">Foundational Stage & Basic Education</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Foundational curriculum preparing students for the Basic Education Certificate Examination (BECE). Core emphasis on Mathematics, Basic Science, English Studies, Social Studies, and Civic Education.
              </p>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                <span className="font-bold text-slate-900 block">Focus Areas:</span>
                <p>• Mathematical Literacy & Problem Solving</p>
                <p>• Basic Science & Practical Observation</p>
                <p>• English Comprehension, Grammar & Composition</p>
              </div>
            </div>

            {/* Senior Secondary School */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-black">
                  SSS
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Senior Secondary School (SS 1 – 3)</h3>
                  <p className="text-xs text-slate-500">Specialized Tracks for National Exams</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Rigorous multi-discipline pathways equipping students for the West African Senior School Certificate Examination (WASSCE / WAEC), NECO SSCE, and UTME (JAMB).
              </p>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                <span className="font-bold text-slate-900 block">Tracks:</span>
                <p>• Pure Science (Physics, Chemistry, Biology, Further Maths)</p>
                <p>• Arts & Humanities (Literature, Government, CRS/IRS, History)</p>
                <p>• Commercial / Social Sciences (Economics, Commerce, Financial Acctg)</p>
              </div>
            </div>
          </div>

          {/* Historical Progression Note */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase">Accredited Heritage</span>
              <h4 className="text-base font-bold text-white">Grade-One Status Achieved in 1986</h4>
              <p className="text-xs text-slate-300">Maintaining strong academic benchmarks for over four decades in Ekpoma.</p>
            </div>
            <button
              onClick={() => onNavigate('history')}
              className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shrink-0 cursor-pointer"
            >
              Explore History
            </button>
          </div>
        </section>
      )}

      {activeTab === 'science' && (
        <section className="space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              <FlaskConical className="w-3.5 h-3.5" /> Ultra-Modern Science Laboratory Complex
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Science Education & Experimental Practicals
            </h3>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              In 2017, an ultra-modern science laboratory complex was constructed at Emaudo Secondary School with the generous support of <strong>Chevron and joint-venture partners</strong>, and officially inaugurated.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-sm text-blue-900 block">Physics Laboratory</span>
                <p className="text-xs text-slate-600">Optics, mechanics, electronics, and wave experiment workbenches.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-sm text-emerald-900 block">Chemistry Laboratory</span>
                <p className="text-xs text-slate-600">Volumetric and qualitative chemical analysis with safety gear.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-sm text-amber-900 block">Biology Laboratory</span>
                <p className="text-xs text-slate-600">Microscopy, anatomical charts, and botanical study specimens.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'arts' && (
        <section className="space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
              <BookOpen className="w-3.5 h-3.5" /> Arts & Social Sciences
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Arts, Humanities and Commercial Studies
            </h3>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Emaudo Secondary School provides rich humanities and commercial grounding, developing future lawyers, economists, administrators, writers, and public leaders.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-sm text-slate-900 block">Arts & Humanities</span>
                <p className="text-xs text-slate-600">Literature in English, Government, Civic Education, Christian Religious Studies, History.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-sm text-slate-900 block">Commercial Department</span>
                <p className="text-xs text-slate-600">Financial Accounting, Commerce, Economics, Bookkeeping, and Business Methods.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'exams' && (
        <section className="space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs font-bold">
              <FileCheck className="w-3.5 h-3.5" /> National Examination Standards
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Examination Preparation Framework
            </h3>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Continuous mock exams, revision classes, and timed practical sessions ensure students excel across all statutory examinations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-sm text-slate-900 block">WAEC / WASSCE</span>
                <p className="text-xs text-slate-600">West African Examinations Council Senior Certificate examinations.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-sm text-slate-900 block">NECO SSCE</span>
                <p className="text-xs text-slate-600">National Examinations Council Senior Secondary Certificate exams.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-sm text-slate-900 block">BECE / JSCE</span>
                <p className="text-xs text-slate-600">Basic Education Certificate Examination for JSS 3 students.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'extracurricular' && (
        <section className="space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-900 border border-purple-200 text-xs font-bold">
              <Users className="w-3.5 h-3.5" /> Clubs & Sports
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Extracurricular & Character Development
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-sm text-slate-900 block">JETS & Science Club</span>
                <p className="text-xs text-slate-600">Junior Engineers, Technicians, and Scientists innovations & quizzes.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-sm text-slate-900 block">Debating & Literary Society</span>
                <p className="text-xs text-slate-600">Public speaking, essay competitions, and inter-school debates.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-sm text-slate-900 block">Sports & Athletics</span>
                <p className="text-xs text-slate-600">Track and field, football, relay races, and annual inter-house sports.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to action */}
      <div className="rounded-2xl bg-blue-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-lg font-bold text-white">Interested in Admissions for Your Child?</h4>
          <p className="text-xs sm:text-sm text-blue-200">Submit an online enquiry or contact our admissions office.</p>
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
