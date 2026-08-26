import React from 'react';
import { 
  AlertCircle, 
  BookOpen, 
  FlaskConical, 
  GraduationCap, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Sparkles, 
  UserCheck, 
  Users 
} from 'lucide-react';
import { PageTab } from '../../types';

interface TeachersPageProps {
  onNavigate: (tab: PageTab) => void;
}

export const TeachersPage: React.FC<TeachersPageProps> = ({ onNavigate }) => {
  const facultyCategories = [
    {
      title: "School Administration",
      desc: "Principal, Vice-Principals (Administration & Academics), and Dean of Studies.",
      icon: <ShieldCheck className="w-5 h-5 text-blue-900" />,
      members: [
        { role: "Principal / Head of School", dept: "Administration", status: "Official Profile to be confirmed by school" },
        { role: "Vice-Principal (Academics)", dept: "Academic Planning", status: "Official Profile to be confirmed by school" },
        { role: "Vice-Principal (Administration)", dept: "Student Welfare", status: "Official Profile to be confirmed by school" },
      ]
    },
    {
      title: "Science & Mathematics Faculty",
      desc: "Physics, Chemistry, Biology, Agricultural Science, Further Mathematics, and Basic Science.",
      icon: <FlaskConical className="w-5 h-5 text-emerald-700" />,
      members: [
        { role: "Head of Science Department", dept: "Science Faculty", status: "Faculty roster to be updated by school" },
        { role: "Physics & Science Lab Instructor", dept: "Physics / Lab Complex", status: "Faculty roster to be updated by school" },
        { role: "Chemistry & Biology Specialist", dept: "Life Sciences", status: "Faculty roster to be updated by school" },
        { role: "Mathematics & Further Maths Lead", dept: "Mathematics", status: "Faculty roster to be updated by school" },
      ]
    },
    {
      title: "Arts, Humanities & Languages Faculty",
      desc: "English Language, Literature in English, Government, Civic Education, and History.",
      icon: <BookOpen className="w-5 h-5 text-amber-700" />,
      members: [
        { role: "Head of Arts Department", dept: "Humanities & Languages", status: "Faculty roster to be updated by school" },
        { role: "English Language & Literature Master", dept: "Languages", status: "Faculty roster to be updated by school" },
        { role: "Government & Civic Studies Master", dept: "Social Sciences", status: "Faculty roster to be updated by school" },
      ]
    },
    {
      title: "Commercial & Vocational Faculty",
      desc: "Economics, Commerce, Financial Accounting, and Business Studies.",
      icon: <GraduationCap className="w-5 h-5 text-purple-700" />,
      members: [
        { role: "Head of Commercial Department", dept: "Business Studies", status: "Faculty roster to be updated by school" },
        { role: "Economics & Accounting Master", dept: "Financial Studies", status: "Faculty roster to be updated by school" },
      ]
    },
  ];

  return (
    <div className="space-y-12">
      {/* Header Banner */}
      <section className="rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white p-6 sm:p-12 border border-blue-800 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Academic Staff & Faculty</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Our Dedicated Educators & Staff
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
            Committed teachers, laboratory instructors, and administrators guiding students with expertise, discipline, and mentorship.
          </p>
        </div>
      </section>

      {/* Mandatory Official Disclaimer */}
      <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex items-start gap-3 shadow-sm">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm">
          <span className="font-bold">Staff Directory Notice:</span> Official staff profiles and current teacher assignments are subject to administrative confirmation. Contact the school directly for specific teacher enquiries.
        </div>
      </div>

      {/* Faculty Departments Grid */}
      <div className="space-y-10">
        {facultyCategories.map((cat, idx) => (
          <div key={idx} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="p-2.5 rounded-xl bg-slate-100">
                {cat.icon}
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">{cat.title}</h3>
                <p className="text-xs text-slate-500">{cat.desc}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.members.map((member, mIdx) => (
                <div 
                  key={mIdx}
                  className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3 relative overflow-hidden group hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-900/10 text-blue-900 flex items-center justify-center font-black">
                      <UserCheck className="w-6 h-6 text-blue-900" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{member.role}</h4>
                      <span className="text-xs font-medium text-amber-700">{member.dept}</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-dashed border-slate-300 text-[11px] text-slate-500">
                    <span className="font-semibold block text-slate-600">• {member.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Contact Notice */}
      <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-white">Need to Reach a Specific Department?</h4>
          <p className="text-xs text-slate-300">Contact the principal’s office or administrative secretary via official phone or WhatsApp.</p>
        </div>
        <button
          onClick={() => onNavigate('contact')}
          className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs cursor-pointer shrink-0"
        >
          View Contact Details
        </button>
      </div>
    </div>
  );
};
