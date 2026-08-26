import React from 'react';
import { 
  Award, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  ExternalLink, 
  FlaskConical, 
  GraduationCap, 
  Landmark, 
  MessageCircle, 
  Phone, 
  ShieldCheck, 
  Sparkles, 
  Users 
} from 'lucide-react';
import { SchoolCrest } from '../common/SchoolCrest';
import { FounderSection } from '../common/FounderSection';
import { EssosaSection } from '../common/EssosaSection';
import { SCHOOL_INFO, SAMPLE_NEWS, SAMPLE_EVENTS } from '../../constants/schoolData';
import { PageTab } from '../../types';

interface HomePageProps {
  onNavigate: (tab: PageTab) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section 
        id="hero-section" 
        className="relative rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white p-6 sm:p-12 lg:p-16 border border-blue-800 shadow-2xl overflow-hidden"
      >
        {/* Abstract Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 max-w-4xl space-y-6">
          {/* Heritage Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-bold tracking-wide uppercase">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Founded in 1980 • Ekpoma, Edo State</span>
          </div>

          {/* Main Title & Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Excellence in Education. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400">
              Character for Life.
            </span>
          </h1>

          {/* Core Introduction */}
          <p className="text-base sm:text-xl text-slate-200 leading-relaxed font-normal max-w-3xl">
            Welcome to <strong>Emaudo Secondary School</strong>, Ekpoma, Edo State — an institution with a proud history of secondary education and a commitment to developing students academically and personally.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              id="hero-btn-explore-history"
              onClick={() => onNavigate('history')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-xl transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Landmark className="w-4 h-4" />
              <span>Explore Our History</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              id="hero-btn-admissions"
              onClick={() => onNavigate('admissions')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/30 backdrop-blur-sm transition-colors cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Admission Enquiry</span>
            </button>

            <a
              id="hero-btn-whatsapp"
              href={SCHOOL_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              id="hero-btn-call"
              href={SCHOOL_INFO.phoneTel}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 transition-colors"
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span>Call the School</span>
            </a>
          </div>

          {/* Quick Metrics / Verified Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <span className="block text-2xl sm:text-3xl font-black text-amber-300">1980</span>
              <span className="text-xs text-slate-300 font-medium">Year Established</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <span className="block text-2xl sm:text-3xl font-black text-white">45+</span>
              <span className="text-xs text-slate-300 font-medium">Years of Heritage</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <span className="block text-2xl sm:text-3xl font-black text-amber-300">1986</span>
              <span className="text-xs text-slate-300 font-medium">Grade-One Progress</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <span className="block text-2xl sm:text-3xl font-black text-white">2017</span>
              <span className="text-xs text-slate-300 font-medium">Science Lab Project</span>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section Spotlight */}
      <FounderSection onExploreHistory={() => onNavigate('history')} />

      {/* 4 Pillars of Emaudo Education */}
      <section id="pillars-section" className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase text-amber-600 tracking-wider">
            Our Foundations
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Pillars of Educational Excellence
          </h2>
          <p className="text-sm text-slate-600">
            Built on a legacy of academic rigor, character development, and community support in Ekpoma.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Pillar 1: History & Heritage */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 border border-blue-100 flex items-center justify-center">
                <Landmark className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Founded 1980
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Established under Governor Ambrose Alli’s pioneering educational expansion in former Bendel State.
              </p>
            </div>
            <button
              onClick={() => onNavigate('history')}
              className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-blue-900 hover:text-amber-600 transition-colors cursor-pointer"
            >
              Read History <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pillar 2: Ultra-Modern Science Lab */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center justify-center">
                <FlaskConical className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                2017 Science Lab
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Ultra-modern science laboratory complex constructed with support from Chevron and inaugurated in 2017.
              </p>
            </div>
            <button
              onClick={() => onNavigate('academics')}
              className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer"
            >
              Explore Academics <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pillar 3: Academic Pathways */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 border border-amber-100 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Science & Arts Traditions
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Comprehensive Junior & Senior secondary curricula preparing students for WAEC, NECO, and BECE examinations.
              </p>
            </div>
            <button
              onClick={() => onNavigate('academics')}
              className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-900 transition-colors cursor-pointer"
            >
              Curriculum Details <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pillar 4: ESSOSA Alumni */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-900 border border-purple-100 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                ESSOSA Alumni Network
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Global community of old students supporting mentorship, school infrastructure, and academic excellence.
              </p>
            </div>
            <a
              href={SCHOOL_INFO.essosaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-purple-900 hover:text-purple-700 transition-colors"
            >
              Visit ESSOSA <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Dedicated 2017 Science Lab Spotlight */}
      <section 
        id="science-lab-feature"
        className="rounded-3xl bg-slate-900 text-white p-6 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />
              <span>Modern Science & Technology</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ultra-Modern Science Laboratory Complex (Inaugurated 2017)
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              In 2017, Emaudo Secondary School achieved a major infrastructure milestone with the construction and inauguration of an ultra-modern science laboratory complex, made possible with support from <strong>Chevron and joint-venture partners</strong>.
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              This dedicated laboratory provides specialized facilities for practical experiments in <strong>Physics, Chemistry, Biology, and Integrated Science</strong>, empowering students with the hands-on skills required for national examinations and STEM careers.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onNavigate('academics')}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Learn About Science Programs
              </button>
              <button
                onClick={() => onNavigate('gallery')}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                View Science Lab in Gallery
              </button>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center mx-auto">
                <FlaskConical className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Science Lab Archive</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Chevron Support Project (Inaugurated 2017)
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-300 text-left space-y-1">
                <p className="font-semibold text-amber-300">• Dedicated Physics & Chemistry Benches</p>
                <p className="font-semibold text-amber-300">• Biology Specimens & Practical Gear</p>
                <p className="font-semibold text-amber-300">• Examination Hall Standards</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ESSOSA Alumni Section */}
      <EssosaSection />

      {/* Sample News & Events Previews */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Latest News */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-900" />
              <h3 className="font-extrabold text-lg text-slate-900">Latest School News</h3>
            </div>
            <button
              onClick={() => onNavigate('news')}
              className="text-xs font-bold text-blue-900 hover:text-amber-600 transition-colors cursor-pointer"
            >
              View All News →
            </button>
          </div>

          <div className="space-y-3">
            {SAMPLE_NEWS.slice(0, 2).map((item) => (
              <div key={item.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold">
                    {item.category}
                  </span>
                  <span className="text-slate-500 font-medium">{item.date}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">
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
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-900" />
              <h3 className="font-extrabold text-lg text-slate-900">Upcoming Events</h3>
            </div>
            <button
              onClick={() => onNavigate('events')}
              className="text-xs font-bold text-blue-900 hover:text-amber-600 transition-colors cursor-pointer"
            >
              View All Events →
            </button>
          </div>

          <div className="space-y-3">
            {SAMPLE_EVENTS.slice(0, 2).map((evt) => (
              <div key={evt.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold">
                    {evt.category}
                  </span>
                  <span className="text-slate-500 font-medium">{evt.schedule}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">
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

      {/* Direct Contact Banner */}
      <section className="rounded-2xl bg-gradient-to-r from-blue-900 via-blue-950 to-slate-900 text-white p-6 sm:p-10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Have Questions About Admissions or School Programs?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Reach out directly to the administrative desk via WhatsApp, phone call, or visit the campus at 178 Osimen Street, Emaudo, Ekpoma.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={SCHOOL_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp Direct
          </a>

          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
          >
            Contact Directory
          </button>
        </div>
      </section>
    </div>
  );
};
