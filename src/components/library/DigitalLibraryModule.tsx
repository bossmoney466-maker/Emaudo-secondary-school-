import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Download, 
  FileText, 
  Sparkles, 
  Eye, 
  Bookmark, 
  CheckCircle2, 
  Clock, 
  GraduationCap, 
  Layers, 
  X, 
  Plus, 
  Share2, 
  FileCheck,
  Tag
} from 'lucide-react';
import { DigitalLibraryItem, LibraryCategory } from '../../types';
import { MOCK_DIGITAL_LIBRARY } from '../../data/expandedData';
import { useAuth } from '../../context/AuthContext';
import { supabaseService, isSupabaseConfigured } from '../../lib/supabase';

export const DigitalLibraryModule: React.FC = () => {
  const { role } = useAuth();
  const [resources, setResources] = useState<DigitalLibraryItem[]>(MOCK_DIGITAL_LIBRARY);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Preview modal state
  const [previewResource, setPreviewResource] = useState<DigitalLibraryItem | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  // Upload modal state (admin/teacher)
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newSubject, setNewSubject] = useState('Mathematics');
  const [newClassLevel, setNewClassLevel] = useState<'JSS1' | 'JSS2' | 'JSS3' | 'SS1' | 'SS2' | 'SS3' | 'All Levels'>('SS2');
  const [newCategory, setNewCategory] = useState<LibraryCategory>('textbook');
  const [newSummary, setNewSummary] = useState('');
  const [newTopics, setNewTopics] = useState('');

  // Load resources from Supabase if configured
  useEffect(() => {
    if (isSupabaseConfigured) {
      supabaseService.library.getAll().then((data: any) => {
        if (data && data.length > 0) {
          const mapped: DigitalLibraryItem[] = data.map((d: any) => ({
            id: d.id,
            title: d.title,
            author_or_publisher: d.author_or_publisher || 'Emaudo Academic Board',
            subject: d.subject || 'General',
            class_level: d.class_level || 'All Levels',
            category: d.category || 'textbook',
            file_format: d.file_format || 'PDF',
            file_size: d.file_size || '5.2 MB',
            page_count: d.page_count || 100,
            download_url: d.download_url || '#',
            preview_summary: d.preview_summary || d.description || '',
            topics_covered: d.topics_covered || ['General Topics'],
            downloads_count: d.downloads_count || 50,
            created_at: d.created_at,
          }));
          setResources(prev => {
            const ids = new Set(prev.map(p => p.id));
            const fresh = mapped.filter(m => !ids.has(m.id));
            return [...fresh, ...prev];
          });
        }
      }).catch(() => {});
    }
  }, []);

  // Filter logic
  const filteredResources = resources.filter(res => {
    const matchesSearch = 
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.author_or_publisher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.topics_covered.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSubject = selectedSubject === 'all' || res.subject === selectedSubject;
    const matchesClass = selectedClass === 'all' || res.class_level === selectedClass || res.class_level === 'All Levels';
    const matchesCategory = selectedCategory === 'all' || res.category === selectedCategory;

    return matchesSearch && matchesSubject && matchesClass && matchesCategory;
  });

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleDownload = (res: DigitalLibraryItem) => {
    setResources(prev => prev.map(r => r.id === res.id ? { ...r, downloads_count: r.downloads_count + 1 } : r));
    setDownloadSuccessMessage(`Starting download of "${res.title}" (${res.file_size})...`);
    setTimeout(() => setDownloadSuccessMessage(null), 3500);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const createdItem: DigitalLibraryItem = {
      id: `lib-${Date.now()}`,
      title: newTitle,
      author_or_publisher: newAuthor || 'Emaudo Secondary School Faculty',
      subject: newSubject,
      class_level: newClassLevel,
      category: newCategory,
      file_format: 'PDF',
      file_size: '7.8 MB',
      page_count: 145,
      download_url: '#',
      preview_summary: newSummary,
      topics_covered: newTopics.split(',').map(t => t.trim()).filter(Boolean),
      downloads_count: 0,
      created_at: new Date().toISOString(),
    };

    setResources(prev => [createdItem, ...prev]);
    setShowUploadModal(false);
    setNewTitle('');
    setNewSummary('');
    setNewTopics('');
    setDownloadSuccessMessage('New resource uploaded and added to the Digital Library catalogue!');
    setTimeout(() => setDownloadSuccessMessage(null), 3500);
  };

  const getCategoryLabel = (cat: LibraryCategory) => {
    switch (cat) {
      case 'textbook': return 'PDF Textbook';
      case 'waec_past_question': return 'WAEC Past Questions';
      case 'neco_past_question': return 'NECO Past Questions';
      case 'class_note': return 'Class Note';
      case 'study_guide': return 'Revision Guide';
      case 'science_lab_guide': return 'Science Lab Manual';
      default: return 'Study Material';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-emerald-800/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>Open Educational Resource Centre</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Emaudo Digital Library & Academic Repository
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            Search and download verified PDF textbooks, syllabus class notes, WAEC & NECO past question solutions, and science laboratory guides.
          </p>
        </div>

        {(role === 'admin' || role === 'teacher' || role === 'superadmin') && (
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Resource</span>
          </button>
        )}
      </div>

      {/* Download Alert Toast */}
      {downloadSuccessMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{downloadSuccessMessage}</span>
        </div>
      )}

      {/* Search and Filters Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by book title, topic (e.g. Quadratic Equations, Titration, Concord), or author..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-emerald-600 bg-slate-50/50"
          />
        </div>

        {/* Filter Dropdowns and Category Pills */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 flex-1">
            {[
              { id: 'all', label: 'All Resources' },
              { id: 'textbook', label: 'Textbooks' },
              { id: 'waec_past_question', label: 'WAEC Past Questions' },
              { id: 'neco_past_question', label: 'NECO Past Questions' },
              { id: 'class_note', label: 'Class Notes' },
              { id: 'science_lab_guide', label: 'Lab Manuals' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Subject Dropdown */}
          <select
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}
            className="p-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
          >
            <option value="all">All Subjects</option>
            <option value="Mathematics">Mathematics</option>
            <option value="English Language">English Language</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="Science">Basic Science</option>
            <option value="Computer Studies">Computer Studies / ICT</option>
          </select>

          {/* Class Level Dropdown */}
          <select
            value={selectedClass}
            onChange={e => setSelectedClass(e.target.value)}
            className="p-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
          >
            <option value="all">All Classes</option>
            <option value="JSS1">JSS 1</option>
            <option value="JSS2">JSS 2</option>
            <option value="JSS3">JSS 3</option>
            <option value="SS1">SS 1</option>
            <option value="SS2">SS 2</option>
            <option value="SS3">SS 3</option>
          </select>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400 space-y-3">
            <BookOpen className="w-12 h-12 mx-auto text-slate-300" />
            <p className="text-sm font-medium">No resources match your search and filter criteria.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedSubject('all'); setSelectedCategory('all'); setSelectedClass('all'); }}
              className="text-xs font-bold text-emerald-700 underline cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          filteredResources.map(resource => {
            const isBookmarked = bookmarkedIds[resource.id];

            return (
              <div
                key={resource.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs hover:shadow-md hover:border-emerald-500/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Top Meta Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                      {getCategoryLabel(resource.category)}
                    </span>

                    <button
                      onClick={() => toggleBookmark(resource.id)}
                      className={`p-1.5 rounded-lg text-slate-400 hover:text-amber-500 transition-colors cursor-pointer ${
                        isBookmarked ? 'text-amber-500 fill-amber-500' : ''
                      }`}
                      title="Bookmark Resource"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Title & Author */}
                  <div>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-slate-900 leading-snug">
                      {resource.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1">
                      By <strong className="text-slate-700 font-medium">{resource.author_or_publisher}</strong>
                    </p>
                  </div>

                  {/* Description Summary */}
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {resource.preview_summary}
                  </p>

                  {/* Topics Pills */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {resource.topics_covered.slice(0, 3).map((topic, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium">
                        {topic}
                      </span>
                    ))}
                    {resource.topics_covered.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-400 text-[10px]">
                        +{resource.topics_covered.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Meta & Actions */}
                <div className="pt-4 mt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>{resource.file_format} • {resource.page_count} Pages</span>
                    <span>{resource.file_size}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPreviewResource(resource)}
                      className="flex-1 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>

                    <button
                      onClick={() => handleDownload(resource)}
                      className="flex-1 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* PREVIEW MODAL */}
      {previewResource && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  {getCategoryLabel(previewResource.category)} • {previewResource.subject}
                </span>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 mt-2">
                  {previewResource.title}
                </h3>
                <p className="text-xs text-slate-500">
                  Published by {previewResource.author_or_publisher}
                </p>
              </div>

              <button
                onClick={() => setPreviewResource(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Details & Key Highlights */}
            <div className="space-y-4 text-xs text-slate-700">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>Curriculum Overview & Table of Contents</span>
                </h4>
                <p className="leading-relaxed text-slate-600">
                  {previewResource.preview_summary}
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-slate-800">Key Syllabus Topics Covered:</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {previewResource.topics_covered.map((top, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{top}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 bg-emerald-950 text-white p-4 rounded-2xl text-center">
                <div>
                  <div className="text-[10px] text-emerald-300">File Type</div>
                  <div className="font-mono font-bold text-sm">{previewResource.file_format}</div>
                </div>
                <div>
                  <div className="text-[10px] text-emerald-300">Pages</div>
                  <div className="font-mono font-bold text-sm">{previewResource.page_count}</div>
                </div>
                <div>
                  <div className="text-[10px] text-emerald-300">Downloads</div>
                  <div className="font-mono font-bold text-sm">{previewResource.downloads_count}</div>
                </div>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setPreviewResource(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  handleDownload(previewResource);
                  setPreviewResource(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Document</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD MODAL (TEACHER / ADMIN) */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-base text-slate-900">Upload Digital Library Resource</h3>
              <button onClick={() => setShowUploadModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Document Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. WAEC Further Mathematics Past Papers (2020-2024)"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Subject</label>
                  <select
                    value={newSubject}
                    onChange={e => setNewSubject(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="English Language">English Language</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Computer Studies">Computer Studies / ICT</option>
                    <option value="Economics">Economics</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Resource Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  >
                    <option value="textbook">PDF Textbook</option>
                    <option value="waec_past_question">WAEC Past Questions</option>
                    <option value="neco_past_question">NECO Past Questions</option>
                    <option value="class_note">Teacher Class Note</option>
                    <option value="science_lab_guide">Science Lab Manual</option>
                    <option value="study_guide">Revision Guide</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Author / Publisher</label>
                <input
                  type="text"
                  placeholder="e.g. Science Faculty, Emaudo Secondary School"
                  value={newAuthor}
                  onChange={e => setNewAuthor(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Key Topics (comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Quadratic Equations, Logarithms, Matrices"
                  value={newTopics}
                  onChange={e => setNewTopics(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Summary Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Brief synopsis of topics covered and study objectives..."
                  value={newSummary}
                  onChange={e => setNewSummary(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold"
                >
                  Publish Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
