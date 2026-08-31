import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  ExternalLink, 
  Heart, 
  Users, 
  BookOpen, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  MapPin, 
  Globe,
  Award,
  Calendar,
  Search,
  Briefcase,
  UserCheck,
  Building2,
  DollarSign,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import { ESSOSA_DATA } from '../../data/schoolData';
import { MOCK_ALUMNI_PROFILES } from '../../data/expandedData';
import { AlumniProfile } from '../../types';
import { WhatsAppButton } from '../common/WhatsAppButton';
import { CallButton } from '../common/CallButton';
import { supabaseService, isSupabaseConfigured } from '../../lib/supabase';

export const AlumniPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'directory' | 'mentorship' | 'projects' | 'register'>('directory');
  const [alumniList, setAlumniList] = useState<AlumniProfile[]>(MOCK_ALUMNI_PROFILES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedSet, setSelectedSet] = useState('all');
  
  // Mentorship request modal
  const [mentorshipModalUser, setMentorshipModalUser] = useState<AlumniProfile | null>(null);
  const [mentorRequestSent, setMentorRequestSent] = useState(false);
  const [studentClassName, setStudentClassName] = useState('SS 3 Science');
  const [mentorshipGoal, setMentorshipGoal] = useState('Career advice on University Medicine admission and JAMB/WAEC prep.');

  const [formData, setFormData] = useState({
    fullName: '',
    gradYear: '',
    phone: '',
    email: '',
    city: '',
    profession: '',
    message: ''
  });

  useEffect(() => {
    if (isSupabaseConfigured) {
      supabaseService.alumni.getAll().then((data: any) => {
        if (data && data.length > 0) {
          const mapped: AlumniProfile[] = data.map((d: any) => ({
            id: d.id,
            full_name: d.full_name,
            graduation_year: d.graduation_year || 2000,
            profession: d.profession || 'Professional',
            organization: d.organization || '',
            industry: d.industry || 'General',
            location: d.location || 'Nigeria',
            email: d.email || '',
            phone: d.phone,
            linkedin_url: d.linkedin_url,
            bio: d.bio || '',
            available_for_mentorship: d.available_for_mentorship ?? true,
            approved: d.approved ?? true,
            created_at: d.created_at,
          }));
          setAlumniList(prev => {
            const ids = new Set(prev.map(p => p.id));
            const fresh = mapped.filter(m => !ids.has(m.id));
            return [...fresh, ...prev];
          });
        }
      }).catch(() => {});
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created: AlumniProfile = {
      id: `alum-${Date.now()}`,
      full_name: formData.fullName,
      grad_year: String(formData.gradYear || '2010'),
      graduation_year: String(formData.gradYear || '2010'),
      set_name: `Class of ${formData.gradYear || '2010'}`,
      profession: formData.profession || 'Alumnus',
      company_or_institution: 'ESSOSA Member',
      city: formData.city || 'Ekpoma',
      country: 'Nigeria',
      email: formData.email,
      phone: formData.phone,
      bio: formData.message || 'Proud alumnus of Emaudo Secondary School.',
      achievements: 'Registered Alumni Member',
      chapter: 'National Chapter',
      mentorship_available: true,
      approved: true,
      created_at: new Date().toISOString()
    };

    setAlumniList(prev => [created, ...prev]);
    setFormSubmitted(true);
  };

  const handleMentorRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setMentorRequestSent(true);
    setTimeout(() => {
      setMentorRequestSent(false);
      setMentorshipModalUser(null);
    }, 2500);
  };

  const filteredAlumni = alumniList.filter(al => {
    const matchSearch = 
      al.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      al.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
      al.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      al.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchInd = selectedIndustry === 'all' || al.industry.toLowerCase().includes(selectedIndustry.toLowerCase());
    const matchSet = selectedSet === 'all' || al.graduation_year.toString() === selectedSet;

    return matchSearch && matchInd && matchSet;
  });

  return (
    <div className="space-y-16 py-10 pb-24">
      {/* Alumni Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Alumni Network • ESSOSA</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 leading-tight">
            Emaudo Secondary School Old Students Association
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-light">
            Connecting generations of graduates (1980 – Present) across Nigeria and the global diaspora. Mentoring future leaders and driving transformative school infrastructure.
          </p>

          {/* Official ESSOSA External Links */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href={ESSOSA_DATA.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold shadow-md transition-all"
            >
              <Globe className="w-4 h-4" />
              <span>Official ESSOSA Portal</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <a
              href={ESSOSA_DATA.historyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-md transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>ESSOSA History</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <a
              href={ESSOSA_DATA.galleryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-sm font-bold shadow-xs transition-all"
            >
              <span>ESSOSA Gallery</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        </div>
      </section>

      {/* Navigation Sub-Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-100 rounded-2xl max-w-2xl mx-auto">
          {[
            { id: 'directory', label: 'Alumni Directory', icon: <Users className="w-4 h-4" /> },
            { id: 'mentorship', label: 'Mentorship Program', icon: <Sparkles className="w-4 h-4" /> },
            { id: 'projects', label: 'Endowment Projects', icon: <Heart className="w-4 h-4" /> },
            { id: 'register', label: 'Join Directory', icon: <UserCheck className="w-4 h-4" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* TAB 1: ALUMNI DIRECTORY */}
      {activeTab === 'directory' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Search & Filters */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search alumni by name, profession, company, or city..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-emerald-600 bg-slate-50"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'all', label: 'All Industries' },
                  { id: 'medicine', label: 'Medicine & Healthcare' },
                  { id: 'tech', label: 'Software & Technology' },
                  { id: 'law', label: 'Law & Judiciary' },
                  { id: 'finance', label: 'Banking & Business' },
                  { id: 'engineering', label: 'Engineering' },
                  { id: 'education', label: 'Academia' },
                ].map(ind => (
                  <button
                    key={ind.id}
                    onClick={() => setSelectedIndustry(ind.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedIndustry === ind.id
                        ? 'bg-emerald-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {ind.label}
                  </button>
                ))}
              </div>

              <select
                value={selectedSet}
                onChange={e => setSelectedSet(e.target.value)}
                className="p-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              >
                <option value="all">All Graduating Sets (1980 - 2024)</option>
                <option value="1992">Set of 1992</option>
                <option value="1998">Set of 1998</option>
                <option value="2005">Set of 2005</option>
                <option value="2009">Set of 2009</option>
                <option value="2012">Set of 2012</option>
                <option value="2016">Set of 2016</option>
                <option value="2018">Set of 2018</option>
              </select>
            </div>
          </div>

          {/* Alumni Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlumni.map(al => (
              <div
                key={al.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                      Class of {al.graduation_year}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{al.location}</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-base text-slate-900">
                      {al.full_name}
                    </h3>
                    <p className="text-xs font-bold text-emerald-800 mt-0.5">
                      {al.profession}
                    </p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      <span>{al.organization}</span>
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {al.bio}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">
                    {al.industry}
                  </span>

                  {al.available_for_mentorship && (
                    <button
                      onClick={() => setMentorshipModalUser(al)}
                      className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Request Mentorship</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 2: MENTORSHIP PROGRAM */}
      {activeTab === 'mentorship' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 text-white p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
                ESSOSA Career Mentorship Bridge
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Connecting Senior Students with Accomplished Alumni
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Are you in SS 2 or SS 3 preparing for university, WAEC, or career decisions? Get 1-on-1 guidance from engineers, medical doctors, lawyers, and tech entrepreneurs who once sat in your classrooms.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alumniList.filter(a => a.available_for_mentorship).map(mentor => (
              <div key={mentor.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
                    Verified Mentor
                  </span>
                  <span className="text-xs font-mono text-slate-400">Class of {mentor.graduation_year}</span>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-base text-slate-900">{mentor.full_name}</h4>
                  <div className="text-xs font-bold text-emerald-800">{mentor.profession}</div>
                  <div className="text-[11px] text-slate-500">{mentor.organization} ({mentor.location})</div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {mentor.bio}
                </p>

                <button
                  onClick={() => setMentorshipModalUser(mentor)}
                  className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Connect with {mentor.full_name.split(' ')[0]}</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 3: ENDOWMENT & CAPITAL PROJECTS */}
      {activeTab === 'projects' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              ESSOSA Capital Projects & Giving
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Transforming our alma mater's classrooms, laboratories, and solar power infrastructure through collective set endowments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Campus Solar Energy & Electrification',
                desc: '10KVA solar inverter installation for continuous power to the ICT laboratory, digital library, and science practical labs.',
                target: '₦7,500,000',
                raised: '₦5,800,000',
                percent: 77,
                leadSet: 'Class of 1998 & 2005'
              },
              {
                title: 'Modern Chemistry & Physics Lab Equipment',
                desc: 'Equipping student workstations with digital microscopes, analytical glassware, Bunsen burners, and reagent stores.',
                target: '₦4,000,000',
                raised: '₦3,650,000',
                percent: 91,
                leadSet: 'Diaspora Chapters (UK/USA)'
              },
              {
                title: 'Library Book Endowment & CBT Hub',
                desc: 'Procurement of 500+ standard WAEC/NECO reference textbooks and 20 additional computer terminals for student CBT testing.',
                target: '₦3,000,000',
                raised: '₦2,400,000',
                percent: 80,
                leadSet: 'National Executive Council'
              },
            ].map((proj, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Active Capital Project
                  </span>
                  <h3 className="font-serif font-bold text-base text-slate-900">{proj.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{proj.desc}</p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Raised: <strong className="text-emerald-700">{proj.raised}</strong></span>
                    <span>Target: {proj.target}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-600 rounded-full" 
                      style={{ width: `${proj.percent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Lead: {proj.leadSet}</span>
                    <span className="font-bold text-emerald-800">{proj.percent}% Funded</span>
                  </div>

                  <div className="pt-2">
                    <WhatsAppButton id={`pledge-btn-${i}`} size="sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 4: JOIN DIRECTORY FORM */}
      {activeTab === 'register' && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-slate-900">
                Join the Alumni Directory
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Keep in touch with your set, participate in reunions, and mentor current students.
              </p>
            </div>

            {formSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-emerald-900">Registration Received!</h3>
                <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                  Thank you, <strong>{formData.fullName}</strong>. Your alumni record has been logged and published to the directory.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ fullName: '', gradYear: '', phone: '', email: '', city: '', profession: '', message: '' });
                      setActiveTab('directory');
                    }}
                    className="text-xs font-bold text-emerald-700 underline hover:text-emerald-900 cursor-pointer"
                  >
                    View Directory
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Osahon Okojie"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Graduation Year (Set) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 1998, 2005, 2018"
                      value={formData.gradYear}
                      onChange={(e) => setFormData({ ...formData, gradYear: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 08012345678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Current City / Country *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ekpoma / London, UK"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Profession / Occupation
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Medical Doctor, Software Engineer, Teacher, Business Executive"
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Message or Areas You Wish to Support
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Interested in student career mentorship, science lab sponsorship, reunion planning..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Alumni Registration</span>
                </button>
              </form>
            )}
          </div>
        </section>
      )}

      {/* MENTORSHIP REQUEST MODAL */}
      {mentorshipModalUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="font-serif font-bold text-base text-slate-900">
              Request Mentorship from {mentorshipModalUser.full_name}
            </h3>
            <p className="text-xs text-slate-500">
              Class of {mentorshipModalUser.graduation_year} • {mentorshipModalUser.profession} ({mentorshipModalUser.organization})
            </p>

            {mentorRequestSent ? (
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Mentorship request sent! The alumnus will be notified by email.</span>
              </div>
            ) : (
              <form onSubmit={handleMentorRequest} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700">Your Current Class</label>
                  <input
                    type="text"
                    value={studentClassName}
                    onChange={e => setStudentClassName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 mt-1"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700">Your Mentorship Goal / Questions</label>
                  <textarea
                    rows={3}
                    required
                    value={mentorshipGoal}
                    onChange={e => setMentorshipGoal(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 mt-1"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setMentorshipModalUser(null)}
                    className="px-4 py-2 rounded-xl border border-slate-300 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold"
                  >
                    Send Mentorship Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
