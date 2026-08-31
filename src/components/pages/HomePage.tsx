import React from 'react';
import { 
  Award, 
  BookOpen, 
  Calendar, 
  ChevronRight, 
  ExternalLink, 
  FlaskConical, 
  GraduationCap, 
  Landmark, 
  MapPin, 
  MessageCircle, 
  Phone, 
  Shield, 
  ShieldCheck, 
  Sparkles, 
  Trophy, 
  Users, 
  CheckCircle2, 
  FileText, 
  Layers, 
  Cpu, 
  Calculator, 
  TrendingUp, 
  Palette, 
  Activity, 
  ArrowRight,
  Clock,
  Briefcase,
  Video,
  Play
} from 'lucide-react';
import { PageTab } from '../../types';
import { SCHOOL_INFO } from '../../constants/schoolData';
import { SCHOOL_CONTACT } from '../../constants/contactInfo';
import { FOUNDER_INFO, ESSOSA_DATA, NEWS_ARTICLES, SCHOOL_EVENTS } from '../../data/schoolData';
import { SchoolCrest } from '../common/SchoolCrest';
import { EssosaSection } from '../common/EssosaSection';

interface HomePageProps {
  onNavigate: (tab: PageTab) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const stats = [
    {
      id: 'stat-heritage',
      number: '45+',
      label: 'Years of Excellence',
      subtext: 'Founded 1980 by Prof. Ambrose Alli',
      icon: <Landmark className="w-5 h-5 text-amber-400" />
    },
    {
      id: 'stat-students',
      number: '1,250+',
      label: 'Total Students',
      subtext: 'Junior & Senior Secondary Arms',
      icon: <GraduationCap className="w-5 h-5 text-emerald-400" />
    },
    {
      id: 'stat-teachers',
      number: '48+',
      label: 'Experienced Teachers',
      subtext: 'Dedicated Subject Specialists',
      icon: <Users className="w-5 h-5 text-blue-400" />
    },
    {
      id: 'stat-subjects',
      number: '24+',
      label: 'Subjects Offered',
      subtext: 'WAEC, NECO & BECE Accredited',
      icon: <BookOpen className="w-5 h-5 text-purple-400" />
    },
    {
      id: 'stat-awards',
      number: '35+',
      label: 'Awards & Honors',
      subtext: 'State & National Competitions',
      icon: <Trophy className="w-5 h-5 text-amber-400" />
    }
  ];

  // Key Academic Focus Areas
  const academicDepartments = [
    {
      id: 'maths',
      name: 'Mathematics & Numeracy',
      tag: 'Core Analytical Subject',
      icon: <Calculator className="w-6 h-6 text-amber-400" />,
      bgGradient: 'from-amber-950/80 to-slate-900',
      badgeColor: 'bg-amber-400/20 text-amber-300 border-amber-400/30',
      description: 'Building deep logical reasoning, quantitative analysis, and problem-solving mastery.',
      topics: ['Algebra & Number Theory', 'Geometry & Trigonometry', 'Statistics & Probability', 'MAN Olympiad Drills']
    },
    {
      id: 'english',
      name: 'English Language & Literature',
      tag: 'Core Communication Subject',
      icon: <BookOpen className="w-6 h-6 text-emerald-400" />,
      bgGradient: 'from-emerald-950/80 to-slate-900',
      badgeColor: 'bg-emerald-400/20 text-emerald-300 border-emerald-400/30',
      description: 'Mastering grammatical precision, oral elocution, creative writing, and African/world literature.',
      topics: ['Grammar & Syntax', 'Literature in English', 'Comprehension & Summary', 'Elocution & Composition']
    },
    {
      id: 'science',
      name: 'Science & Laboratory STEM',
      tag: 'Hands-on Experimental Practical',
      icon: <FlaskConical className="w-6 h-6 text-cyan-400" />,
      bgGradient: 'from-cyan-950/80 to-slate-900',
      badgeColor: 'bg-cyan-400/20 text-cyan-300 border-cyan-400/30',
      description: 'Empowering students in our 2017 Chevron Ultra-Modern Science Laboratory Complex.',
      topics: ['Physics & Mechanics', 'Chemistry & Titration', 'Biology Specimens & Ecology', 'Introductory Technology']
    },
    {
      id: 'social-sciences',
      name: 'Social Sciences & Humanities',
      tag: 'Civic & Cultural Leadership',
      icon: <Landmark className="w-6 h-6 text-blue-400" />,
      bgGradient: 'from-blue-950/80 to-slate-900',
      badgeColor: 'bg-blue-400/20 text-blue-300 border-blue-400/30',
      description: 'Understanding governance, economic systems, physical geography, and societal development.',
      topics: ['Government & Civics', 'Economics & Development', 'Physical & Human Geography', 'History & Social Studies']
    },
    {
      id: 'commercial',
      name: 'Commercial & Business Studies',
      tag: 'Enterprise & Financial Literacy',
      icon: <TrendingUp className="w-6 h-6 text-emerald-400" />,
      bgGradient: 'from-emerald-950/80 to-slate-900',
      badgeColor: 'bg-emerald-400/20 text-emerald-300 border-emerald-400/30',
      description: 'Equipping future accountants, managers, and entrepreneurs with rigorous financial principles.',
      topics: ['Financial Accounting', 'Commerce & Trade', 'Business Studies', 'Office Practice & Marketing']
    },
    {
      id: 'tech',
      name: 'Technology, ICT & Computer Studies',
      tag: 'Modern Digital Literacy',
      icon: <Cpu className="w-6 h-6 text-violet-400" />,
      bgGradient: 'from-violet-950/80 to-slate-900',
      badgeColor: 'bg-violet-400/20 text-violet-300 border-violet-400/30',
      description: 'Hands-on digital computing, introductory programming, and CBT examination practice.',
      topics: ['Computer Studies', 'JAMB CBT Simulations', 'Introductory Coding', 'Technical Drawing']
    }
  ];

  // School Activities & Extracurriculars
  const schoolActivities = [
    {
      id: 'sports',
      title: 'Sports & Inter-House Athletics',
      category: 'Physical Excellence',
      icon: <Activity className="w-6 h-6 text-emerald-400" />,
      badgeColor: 'bg-emerald-100 text-emerald-900',
      description: 'Inter-house sports championships, school football league, volleyball, table tennis, and physical fitness conditioning.',
      schedule: 'Wednesdays & Fridays • 3:30 PM'
    },
    {
      id: 'debate',
      title: 'Debate & Literary Society',
      category: 'Elocution & Rhetoric',
      icon: <MessageCircle className="w-6 h-6 text-blue-400" />,
      badgeColor: 'bg-blue-100 text-blue-900',
      description: 'Parliamentary debate tournaments, inter-school spelling bees, public speaking, poetry recitations, and creative writing.',
      schedule: 'Thursdays • 3:45 PM'
    },
    {
      id: 'jets',
      title: 'Science Club (JETS)',
      category: 'STEM & Innovation',
      icon: <FlaskConical className="w-6 h-6 text-amber-400" />,
      badgeColor: 'bg-amber-100 text-amber-900',
      description: 'Junior Engineers, Technicians & Scientists club conducting practical experiments, robotics workshops, and science fair models.',
      schedule: 'Tuesdays • 3:30 PM'
    },
    {
      id: 'math-chess',
      title: 'Mathematics & Chess Club',
      category: 'Strategic Problem Solving',
      icon: <Calculator className="w-6 h-6 text-purple-400" />,
      badgeColor: 'bg-purple-100 text-purple-900',
      description: 'Speed mental arithmetic challenges, MAN Olympiad preparations, and tactical chess tournaments to sharpen critical thinking.',
      schedule: 'Mondays • 3:30 PM'
    },
    {
      id: 'cultural',
      title: 'Cultural Events & Heritage Troupe',
      category: 'Arts & Tradition',
      icon: <Palette className="w-6 h-6 text-rose-400" />,
      badgeColor: 'bg-rose-100 text-rose-900',
      description: 'Celebrating rich Esan and Nigerian cultural traditions, traditional choral music, drama productions, and language preservation.',
      schedule: 'Fridays • 2:00 PM'
    },
    {
      id: 'achievements',
      title: 'Student Achievements & Honors',
      category: 'Academic Distinctions',
      icon: <Trophy className="w-6 h-6 text-amber-400" />,
      badgeColor: 'bg-amber-100 text-amber-900',
      description: 'Honoring top scorers in WAEC/NECO, State Olympiad medalists, prefect leaders, and distinguished ESSOSA scholarship winners.',
      schedule: 'Annual Speech & Prize Giving Day'
    }
  ];

  // Portals
  const portalsList = [
    {
      id: 'student-portal',
      role: 'student',
      title: 'Student Portal',
      subtitle: 'Terminal Reports & Academics',
      icon: <GraduationCap className="w-7 h-7 text-emerald-400" />,
      description: 'Check terminal examination scores (CA 40% + Exam 60%), attendance statistics, daily timetable, and syllabus materials.',
      buttonText: 'Access Student Portal',
      badge: 'Active Term: 2024/2025'
    },
    {
      id: 'parent-portal',
      role: 'parent',
      title: 'Parent Portal',
      subtitle: 'Ward Progress & Tuition',
      icon: <Users className="w-7 h-7 text-blue-400" />,
      description: 'Monitor your child’s academic performance, download certified term report sheets, review attendance, and view tuition invoices.',
      buttonText: 'Access Parent Portal',
      badge: 'Instant SMS & Email Alerts'
    },
    {
      id: 'teacher-portal',
      role: 'teacher',
      title: 'Teacher Portal',
      subtitle: 'Grades & Roll Call',
      icon: <BookOpen className="w-7 h-7 text-amber-400" />,
      description: 'Enter continuous assessments and examination marks, mark daily roll call attendance register, and manage class assignments.',
      buttonText: 'Access Teacher Portal',
      badge: 'Faculty Clearance Required'
    },
    {
      id: 'admin-portal',
      role: 'admin',
      title: 'Admin Management',
      subtitle: 'Institutional Governance',
      icon: <ShieldCheck className="w-7 h-7 text-purple-400" />,
      description: 'Review admissions, manage student registry, publish term announcements, update event calendars, and manage Supabase database.',
      buttonText: 'Access Admin Console',
      badge: 'Principal & Registrar Access'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* 1. HERO SECTION: World-Class International Academy Layout */}
      <section 
        id="hero-section" 
        className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-950 to-emerald-950 text-white border-2 border-emerald-700/40 shadow-2xl"
      >
        {/* Subtle Decorative Background Pattern & Ambient Glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/15 via-emerald-600/10 to-transparent pointer-events-none" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 px-6 sm:px-10 lg:px-14 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Prestigious Heritage Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/60 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Established 1980 • Ekpoma, Edo State, Nigeria</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight leading-[1.15] text-white">
                Building <span className="text-amber-400 underline decoration-amber-400/50 decoration-wavy decoration-2">Excellence</span>, Character & Future Leaders
              </h1>

              {/* Welcome Message */}
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl font-normal">
                Welcome to <strong>Emaudo Secondary School</strong>, Ekpoma — founded in 1980 under the historic educational vision of <strong>Professor Ambrose Alli</strong>. We cultivate disciplined scholarship, hands-on scientific mastery in our ultra-modern laboratories, and prepare students for distinction in WAEC, NECO, and university entrance examinations.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  id="hero-apply-btn"
                  onClick={() => onNavigate('admissions')}
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
                >
                  <GraduationCap className="w-5 h-5 text-slate-950" />
                  <span>Apply for Admission</span>
                </button>

                <button
                  id="hero-explore-btn"
                  onClick={() => onNavigate('academics')}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-emerald-400/30 backdrop-blur-md hover:border-emerald-400/60 transition-all cursor-pointer flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-emerald-300" />
                  <span>Explore Our School</span>
                </button>

                <a
                  href={SCHOOL_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-emerald-600/80 hover:bg-emerald-500 text-white border border-emerald-400/40 transition-colors"
                  title="Direct WhatsApp Desk"
                >
                  <MessageCircle className="w-5 h-5 fill-white stroke-transparent" />
                </a>
              </div>

              {/* Official Motto & Accreditation Notice */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1.5 text-amber-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  Motto: <em>Success Through Education</em>
                </span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-1.5 text-emerald-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Grade-One Status (1986)
                </span>
              </div>
            </div>

            {/* Right Hero Crest & Campus Emblem Pedestal */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative p-7 sm:p-9 rounded-3xl bg-slate-950/80 border-2 border-emerald-500/40 shadow-2xl backdrop-blur-md max-w-sm w-full text-center space-y-5">
                
                <div className="flex justify-center">
                  <SchoolCrest 
                    size="xl" 
                    variant="uniform" 
                    imageOnly 
                    priority
                    className="w-32 h-32 sm:w-36 sm:h-36 border-4 border-amber-400/80 shadow-2xl hover:scale-105 transition-transform" 
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif font-black text-lg text-white uppercase tracking-tight">
                    Emaudo Secondary School
                  </h3>
                  <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Ekpoma, Edo State • Est. 1980
                  </p>
                  <p className="text-[11px] text-slate-400 pt-1">
                    178 Osimen Street, Emaudo
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-left space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-emerald-300 font-bold">
                    <span>2024/2025 Academic Year</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px]">
                      Enrollment Open
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    Junior Secondary (JSS 1–3) & Senior Secondary (SSS 1–3) with specialized Science, Arts, Commercial and Technical departments.
                  </p>
                </div>

                <button
                  onClick={() => onNavigate('portal')}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4 text-amber-300" />
                  <span>Access Institutional Portal</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Hero 5-Pillar Statistics Strip */}
        <div className="bg-slate-950/95 border-t border-emerald-800/40 px-6 sm:px-10 py-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 text-center">
            {stats.map((st) => (
              <div key={st.id} className="space-y-1 p-2 rounded-xl hover:bg-white/5 transition-colors">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  {st.icon}
                  <span className="text-2xl sm:text-3xl font-black text-white font-serif">{st.number}</span>
                </div>
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wide">{st.label}</div>
                <div className="text-[11px] text-slate-400 leading-tight">{st.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. ACADEMICS SECTION: Comprehensive Departments & Subjects */}
      <section id="academics-curriculum" className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-emerald-900/10 pb-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 text-xs font-extrabold uppercase tracking-wider border border-emerald-200">
              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
              <span>Academic Curriculum</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-emerald-950 tracking-tight">
              Rigorous Subjects & Academic Departments
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Accredited by WAEC, NECO, and BECE, our balanced curriculum delivers foundational mastery in Mathematics, English, Sciences, and Commercial disciplines.
            </p>
          </div>

          <button
            onClick={() => onNavigate('academics')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 hover:underline cursor-pointer"
          >
            <span>View Full Curriculum & Timetable</span>
            <ChevronRight className="w-4 h-4 text-amber-600" />
          </button>
        </div>

        {/* 6 Subject & Department Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {academicDepartments.map((dept) => (
            <div 
              key={dept.id} 
              className={`p-6 sm:p-7 rounded-3xl bg-gradient-to-br ${dept.bgGradient} text-white border border-slate-800 shadow-xl flex flex-col justify-between hover:scale-[1.01] transition-transform`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-white/10 border border-white/10">
                    {dept.icon}
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${dept.badgeColor}`}>
                    {dept.tag}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold font-serif text-white">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {dept.description}
                  </p>
                </div>

                <div className="pt-2 space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    Key Curriculum Modules:
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {dept.topics.map((t, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => onNavigate('academics')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
                >
                  <span>Explore Subject Syllabi</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. DEDICATED 2017 CHEVRON SCIENCE LAB SPOTLIGHT */}
      <section 
        id="science-lab-feature"
        className="rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-950 to-emerald-950 text-white p-6 sm:p-10 lg:p-12 border-2 border-emerald-600/50 shadow-2xl relative overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
              <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />
              <span>STEM & Science Innovation Landmark</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-white tracking-tight">
              Ultra-Modern Science Laboratory Complex (Commissioned 2017)
            </h2>

            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
              In 2017, Emaudo Secondary School achieved a major infrastructural leap with the construction and commissioning of a world-standard Science Laboratory Complex, built with support from <strong>Chevron and its joint-venture partners</strong>.
            </p>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Equipped with independent workstations for <strong>Physics, Chemistry, Biology, and Agricultural Science</strong>, the laboratory empowers our students with hands-on practical inquiry required for WAEC/NECO distinctions and competitive university STEM admissions.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onNavigate('academics')}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <FlaskConical className="w-4 h-4 text-slate-950" />
                <span>Science Practical Modules</span>
              </button>
              <button
                onClick={() => onNavigate('gallery')}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-100 font-bold text-xs sm:text-sm border border-emerald-400/30 transition-colors cursor-pointer"
              >
                View Science Lab Gallery
              </button>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-emerald-500/30 text-center space-y-4 shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center mx-auto">
                <FlaskConical className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-white text-base">Chevron Science Landmark</h4>
                <p className="text-xs text-amber-300 font-medium mt-0.5">
                  Commissioned 2017 • Ekpoma Campus
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-slate-300 text-left space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Physics Optics & Electricity Benches</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Chemistry Titration & Fume Desks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Biological Microscopes & Specimen Kits</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3B. FREE ONLINE LEARNING CENTRE SPOTLIGHT */}
      <section id="learning-centre-spotlight" className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 text-white border-2 border-amber-500/30 p-6 sm:p-10 lg:p-12 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
              <Video className="w-3.5 h-3.5 text-amber-400" />
              <span>100% Free Open Educational Resource</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight">
              Emaudo Online Learning Centre & Video Lessons
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Curated syllabus-aligned video lessons from verified global educational platforms (Khan Academy, BBC Bitesize, YouTube Education, CK-12). Covering Mathematics, Science, English, ICT, and Commercial studies for JSS 1 to SSS 3.
            </p>
          </div>

          <button
            onClick={() => onNavigate('learning-centre')}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/20 hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Open Learning Centre</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Mathematics</div>
              <div className="text-[11px] text-slate-400">Algebra, Geometry, WAEC</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-400/20 text-emerald-300">
              <FlaskConical className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Sciences</div>
              <div className="text-[11px] text-slate-400">Physics, Chemistry, Biology</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-400/20 text-blue-300">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">English Studies</div>
              <div className="text-[11px] text-slate-400">Grammar & Literature</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-400/20 text-purple-300">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">ICT & Coding</div>
              <div className="text-[11px] text-slate-400">Hardware & Python Basics</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SCHOOL ACTIVITIES & CLUBS SECTION */}
      <section id="school-activities" className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-emerald-900/10 pb-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-extrabold uppercase tracking-wider border border-amber-200">
              <Activity className="w-3.5 h-3.5 text-amber-700" />
              <span>Extracurricular Life</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-emerald-950 tracking-tight">
              Vibrant School Activities & Student Clubs
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Developing well-rounded students through competitive athletics, elocution, scientific robotics, strategic chess, and cultural preservation.
            </p>
          </div>

          <button
            onClick={() => onNavigate('activities')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 hover:underline cursor-pointer"
          >
            <span>Explore All Clubs & Schedules</span>
            <ChevronRight className="w-4 h-4 text-amber-600" />
          </button>
        </div>

        {/* 6 Modern Activity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schoolActivities.map((act) => (
            <div 
              key={act.id} 
              className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-100">
                    {act.icon}
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${act.badgeColor}`}>
                    {act.category}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold font-serif text-slate-900">
                    {act.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {act.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-800">
                  <Clock className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{act.schedule}</span>
                </div>
                <button
                  onClick={() => onNavigate('activities')}
                  className="font-bold text-amber-600 hover:text-amber-700 cursor-pointer"
                >
                  Join →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. INSTITUTIONAL PORTALS SECTION (Student, Parent, Teacher, Admin) */}
      <section id="portals-section" className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900 text-emerald-200 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Digital School Administration</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-emerald-950 tracking-tight">
            Institutional Portals & Online Access
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Secure digital access for students, parents, teachers, and administrators to track results, continuous assessments, and attendance records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portalsList.map((portal) => (
            <div 
              key={portal.id}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-4 hover:border-emerald-600/40"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-900 border border-emerald-100">
                    {portal.icon}
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                    {portal.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-serif font-bold text-slate-900">
                    {portal.title}
                  </h3>
                  <div className="text-xs font-bold text-amber-600 uppercase tracking-wide">
                    {portal.subtitle}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {portal.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => onNavigate(portal.role === 'admin' ? 'admin' : 'portal')}
                  className="w-full py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <span>{portal.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FOUNDER & HISTORICAL HERITAGE SPOTLIGHT */}
      <section className="p-6 sm:p-10 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Landmark className="w-3.5 h-3.5 text-amber-400" />
              <span>Historic Foundation (1980)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
              Professor Ambrose Folorunsho Alli (1929–1989)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <em>"{FOUNDER_INFO.quote}"</em>
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              As Governor of Bendel State (1979–1983), Prof. Ambrose Alli revolutionized education across Nigeria. He established Emaudo Secondary School in 1980 to ensure children in Ekpoma and surrounding communities had direct access to high-standard secondary schooling, character formation, and scientific literacy.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onNavigate('history')}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Read Full School History
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                About Our Mission & Values
              </button>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center justify-center mx-auto">
                <Landmark className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">{FOUNDER_INFO.name}</h4>
                <p className="text-xs text-amber-400 mt-0.5">Bendel State Governor (1979–1983)</p>
                <p className="text-[11px] text-slate-400 mt-1">Founder of Ambrose Alli University & Emaudo Secondary School</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ESSOSA ALUMNI ASSOCIATION */}
      <EssosaSection />

      {/* 8. LATEST NEWS & EVENTS PREVIEWS */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Latest News */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-900" />
              <h3 className="font-serif font-bold text-lg text-slate-900">Latest School News</h3>
            </div>
            <button
              onClick={() => onNavigate('news')}
              className="text-xs font-bold text-emerald-800 hover:text-amber-600 transition-colors cursor-pointer"
            >
              View All News →
            </button>
          </div>

          <div className="space-y-3">
            {NEWS_ARTICLES.slice(0, 2).map((item) => (
              <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold">
                    {item.category}
                  </span>
                  <span className="text-slate-500 font-medium">{item.date}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm font-serif">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* School Events */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-900" />
              <h3 className="font-serif font-bold text-lg text-slate-900">Upcoming Academic Events</h3>
            </div>
            <button
              onClick={() => onNavigate('events')}
              className="text-xs font-bold text-emerald-800 hover:text-amber-600 transition-colors cursor-pointer"
            >
              View All Events →
            </button>
          </div>

          <div className="space-y-3">
            {SCHOOL_EVENTS.slice(0, 2).map((evt) => (
              <div key={evt.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold">
                    {evt.category}
                  </span>
                  <span className="text-slate-500 font-medium">{evt.date}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm font-serif">
                  {evt.title}
                </h4>
                <p className="text-xs text-slate-600">
                  {evt.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. DIRECT CONTACT & ADMISSIONS BANNER */}
      <section className="rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-950 to-emerald-950 text-white p-6 sm:p-10 lg:p-12 border-2 border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase">
            <span>Direct Enquiries & Campus Visits</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-black text-white">
            Have Questions About Admissions or Curriculum?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Reach out directly to the administrative desk via WhatsApp, phone call, or visit the campus at 178 Osimen Street, Emaudo, Ekpoma.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href={SCHOOL_CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Direct</span>
          </a>

          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
          >
            <span>Contact Directory</span>
          </button>
        </div>
      </section>
    </div>
  );
};
