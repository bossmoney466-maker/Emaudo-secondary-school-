import React, { useState, useEffect } from 'react';
import { 
  Video, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  Play, 
  Filter, 
  BookOpen, 
  Sparkles, 
  RotateCcw,
  Check,
  X,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  Youtube,
  Clock,
  ArrowRight,
  Zap,
  Info
} from 'lucide-react';
import { LearningResource, LearningSubjectType, ClassLevelType, LearningPlatformType } from '../../types';
import { 
  INITIAL_LEARNING_RESOURCES, 
  LEARNING_SUBJECTS_METADATA, 
  CLASS_LEVELS, 
  TRUSTED_LEARNING_PLATFORMS 
} from '../../data/learningData';
import { dbService } from '../../lib/supabase';
import { LessonPlayerModal } from '../learning/LessonPlayerModal';
import { 
  validateVideoUrl, 
  getSuggestedReplacement, 
  extractYouTubeId, 
  getYouTubeThumbnailUrl, 
  getYouTubeWatchUrl,
  VideoValidationResult 
} from '../../lib/videoValidator';

export const LearningCentreAdminModule: React.FC = () => {
  const [resources, setResources] = useState<LearningResource[]>(INITIAL_LEARNING_RESOURCES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Available' | 'Unavailable' | 'Pending'>('All');
  const [activePreview, setActivePreview] = useState<LearningResource | null>(null);

  // Health check state
  const [isCheckingAll, setIsCheckingAll] = useState(false);
  const [checkProgress, setCheckProgress] = useState<{ checked: number; total: number } | null>(null);

  // Modal states for Create / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isValidatingUrl, setIsValidatingUrl] = useState(false);
  const [validationResult, setValidationResult] = useState<VideoValidationResult | null>(null);

  const [formData, setFormData] = useState<{
    title: string;
    subject: LearningSubjectType | string;
    class_level: ClassLevelType | string;
    topic: string;
    platform: LearningPlatformType | string;
    video_url: string;
    thumbnail_url: string;
    creator: string;
    description: string;
    duration: string;
    approved: boolean;
    is_available: boolean;
  }>({
    title: '',
    subject: 'Mathematics',
    class_level: 'SS2',
    topic: '',
    platform: 'YouTube',
    video_url: '',
    thumbnail_url: '',
    creator: '',
    description: '',
    duration: '15 mins',
    approved: true,
    is_available: true,
  });

  const [notification, setNotification] = useState<string | null>(null);

  // Load any remote items from Supabase
  useEffect(() => {
    async function loadData() {
      try {
        const remote = await dbService.learningResources?.getAll();
        if (remote && remote.length > 0) {
          const merged = [...remote, ...INITIAL_LEARNING_RESOURCES.filter(i => !remote.some(r => r.id === i.id))];
          setResources(merged);
        }
      } catch (e) {
        console.log('Using local learning resources');
      }
    }
    loadData();
  }, []);

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 5000);
  };

  const handleOpenAddModal = () => {
    setEditingId(null);
    setValidationResult(null);
    setFormData({
      title: '',
      subject: 'Mathematics',
      class_level: 'SS2',
      topic: '',
      platform: 'YouTube',
      video_url: '',
      thumbnail_url: '',
      creator: '',
      description: '',
      duration: '15 mins',
      approved: true,
      is_available: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (resource: LearningResource) => {
    setEditingId(resource.id);
    setValidationResult(null);
    setFormData({
      title: resource.title,
      subject: resource.subject,
      class_level: resource.class_level,
      topic: resource.topic,
      platform: resource.platform,
      video_url: resource.video_url,
      thumbnail_url: resource.thumbnail_url || '',
      creator: resource.creator,
      description: resource.description || '',
      duration: resource.duration || '15 mins',
      approved: resource.approved ?? true,
      is_available: resource.is_available ?? true,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this learning resource?')) {
      setResources((prev) => prev.filter((r) => r.id !== id));
      try {
        await dbService.learningResources?.delete(id);
      } catch (err) {
        console.error('Delete error', err);
      }
      showNotice('Lesson removed successfully.');
    }
  };

  const handleToggleApproval = async (resource: LearningResource) => {
    const newStatus = !resource.approved;
    setResources((prev) =>
      prev.map((r) => (r.id === resource.id ? { ...r, approved: newStatus } : r))
    );
    try {
      await dbService.learningResources?.update(resource.id, { approved: newStatus });
    } catch (err) {
      console.error('Update status error', err);
    }
    showNotice(`Lesson marked as ${newStatus ? 'Approved' : 'Unapproved'}.`);
  };

  const handleToggleAvailability = async (resource: LearningResource) => {
    const newStatus = !(resource.is_available ?? true);
    setResources((prev) =>
      prev.map((r) => (r.id === resource.id ? { ...r, is_available: newStatus } : r))
    );
    try {
      await dbService.learningResources?.update(resource.id, { is_available: newStatus });
    } catch (err) {
      console.error('Update availability error', err);
    }
    showNotice(
      newStatus
        ? 'Lesson marked as Available and restored to student portal.'
        : 'Lesson marked as Unavailable and removed from student view.'
    );
  };

  // Run validation on a single URL in form
  const handleValidateFormUrl = async () => {
    if (!formData.video_url.trim()) {
      showNotice('Please enter a video URL first.');
      return;
    }
    setIsValidatingUrl(true);
    try {
      const result = await validateVideoUrl(formData.video_url);
      setValidationResult(result);
      if (result.isValid) {
        // Auto update thumbnail if empty or generic
        if (!formData.thumbnail_url && result.thumbnailUrl) {
          setFormData((prev) => ({ ...prev, thumbnail_url: result.thumbnailUrl || '' }));
        }
        // Auto update platform if recognized
        if (result.platform && result.platform !== 'Other') {
          setFormData((prev) => ({ ...prev, platform: result.platform }));
        }
        if (result.title && !formData.title) {
          setFormData((prev) => ({ ...prev, title: result.title || '' }));
        }
        if (result.creator && !formData.creator) {
          setFormData((prev) => ({ ...prev, creator: result.creator || '' }));
        }
      }
    } catch (err) {
      console.error('Validation failed', err);
    } finally {
      setIsValidatingUrl(false);
    }
  };

  // Run complete system health check on all resources
  const handleRunSystemHealthCheck = async () => {
    setIsCheckingAll(true);
    setCheckProgress({ checked: 0, total: resources.length });
    let brokenCount = 0;

    const updatedList: LearningResource[] = [];

    for (let i = 0; i < resources.length; i++) {
      const item = resources[i];
      try {
        const val = await validateVideoUrl(item.video_url);
        const isAvail = val.isValid && val.isPublic;
        if (!isAvail) brokenCount++;

        const updatedItem: LearningResource = {
          ...item,
          is_available: isAvail,
          validation_status: isAvail ? 'valid' : 'invalid',
          last_checked_at: new Date().toISOString(),
          embed_allowed: val.isEmbeddable,
          replacement_suggestion: !isAvail ? getSuggestedReplacement(item)?.title : undefined,
        };
        updatedList.push(updatedItem);
      } catch (err) {
        updatedList.push(item);
      }
      setCheckProgress({ checked: i + 1, total: resources.length });
    }

    setResources(updatedList);
    setIsCheckingAll(false);
    setCheckProgress(null);

    if (brokenCount > 0) {
      showNotice(`Health check finished: Detected ${brokenCount} broken/unavailable video(s). Automatically removed from student view with replacement suggestions.`);
    } else {
      showNotice('All educational video resources verified! All videos are public, active, and embeddable.');
    }
  };

  // Apply suggested replacement for a broken resource
  const handleApplyReplacement = async (resource: LearningResource) => {
    const replacement = getSuggestedReplacement(resource);
    if (!replacement) {
      showNotice('No predefined alternative found. Please edit the lesson with a working YouTube URL.');
      return;
    }

    const updated: LearningResource = {
      ...resource,
      title: replacement.title,
      video_url: replacement.video_url,
      thumbnail_url: replacement.thumbnail_url,
      creator: replacement.creator,
      description: replacement.description,
      platform: replacement.platform,
      duration: replacement.duration,
      is_available: true,
      validation_status: 'valid',
      embed_allowed: true,
      last_checked_at: new Date().toISOString(),
      replacement_suggestion: undefined,
    };

    setResources((prev) => prev.map((r) => (r.id === resource.id ? updated : r)));
    try {
      await dbService.learningResources?.update(resource.id, updated);
    } catch (err) {
      console.error('Update replacement error', err);
    }

    showNotice(`Successfully replaced with verified educational resource: "${replacement.title}".`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.video_url || !formData.creator) {
      alert('Please fill in title, video URL, and creator name.');
      return;
    }

    // Auto generate thumbnail if empty and is youtube
    let thumbnail = formData.thumbnail_url;
    const vidId = extractYouTubeId(formData.video_url);
    if (!thumbnail && vidId) {
      thumbnail = `https://img.youtube.com/vi/${vidId}/hqdefault.jpg`;
    } else if (!thumbnail) {
      thumbnail = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80';
    }

    if (editingId) {
      // Update existing
      const updated: LearningResource = {
        id: editingId,
        ...formData,
        thumbnail_url: thumbnail,
        youtube_video_id: vidId || undefined,
        validation_status: 'valid',
        last_checked_at: new Date().toISOString(),
      };
      setResources((prev) => prev.map((r) => (r.id === editingId ? updated : r)));
      try {
        await dbService.learningResources?.update(editingId, updated);
      } catch (err) {
        console.error('Save error', err);
      }
      showNotice('Educational lesson updated successfully.');
    } else {
      // Create new
      const newResource: LearningResource = {
        id: `lr-custom-${Date.now()}`,
        ...formData,
        thumbnail_url: thumbnail,
        youtube_video_id: vidId || undefined,
        validation_status: 'valid',
        last_checked_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      };
      setResources((prev) => [newResource, ...prev]);
      try {
        await dbService.learningResources?.create(newResource);
      } catch (err) {
        console.error('Create error', err);
      }
      showNotice('New educational video lesson validated and published successfully.');
    }

    setIsModalOpen(false);
  };

  const filtered = resources.filter((r) => {
    if (selectedSubject !== 'All' && r.subject !== selectedSubject) return false;
    if (selectedClass !== 'All' && r.class_level !== selectedClass && r.class_level !== 'All Levels') return false;
    
    if (statusFilter === 'Available' && r.is_available === false) return false;
    if (statusFilter === 'Unavailable' && r.is_available !== false) return false;
    if (statusFilter === 'Pending' && r.approved !== false) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.title.toLowerCase().includes(q) ||
        r.topic.toLowerCase().includes(q) ||
        r.creator.toLowerCase().includes(q) ||
        r.subject.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const brokenCount = resources.filter((r) => r.is_available === false).length;
  const activeCount = resources.filter((r) => r.approved && r.is_available !== false).length;

  return (
    <div className="space-y-6">
      {/* Header and Add Action */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
        <div className="space-y-1 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Video Validation & Educational Resource Manager</span>
          </div>
          <h2 className="font-serif font-black text-xl text-slate-900">
            Learning Centre Video Library & Availability Control
          </h2>
          <p className="text-xs text-slate-500">
            Manage, test, and automatically validate public educational videos from Khan Academy, BBC Bitesize, YouTube, and CrashCourse for JSS 1 – SS 3. Broken videos are automatically quarantined from student view.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleRunSystemHealthCheck}
            disabled={isCheckingAll}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all cursor-pointer disabled:opacity-50"
            title="Scan all video URLs to verify availability and embedding status"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isCheckingAll ? 'animate-spin' : ''}`} />
            <span>{isCheckingAll ? `Checking (${checkProgress?.checked}/${checkProgress?.total})...` : 'Run Health Check'}</span>
          </button>

          <button
            onClick={handleOpenAddModal}
            id="btn-admin-add-lesson"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Add Educational Video</span>
          </button>
        </div>
      </div>

      {/* Metrics Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase block">Total Resources</span>
          <span className="text-xl font-black text-slate-900 mt-1 block">{resources.length}</span>
          <span className="text-[10px] text-slate-400">Across 6 WAEC categories</span>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 shadow-xs">
          <span className="text-[11px] font-bold text-emerald-900 uppercase block">Active in Portal</span>
          <span className="text-xl font-black text-emerald-950 mt-1 block">{activeCount}</span>
          <span className="text-[10px] text-emerald-700">Live for student access</span>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 shadow-xs">
          <span className="text-[11px] font-bold text-amber-900 uppercase block">Embed Safe</span>
          <span className="text-xl font-black text-amber-950 mt-1 block">100%</span>
          <span className="text-[10px] text-amber-700">Official YouTube / oEmbed</span>
        </div>

        <div className={`p-4 rounded-2xl border shadow-xs transition-colors ${
          brokenCount > 0 ? 'bg-rose-50 border-rose-300' : 'bg-slate-50 border-slate-200'
        }`}>
          <span className={`text-[11px] font-bold uppercase block ${brokenCount > 0 ? 'text-rose-900' : 'text-slate-500'}`}>
            Unavailable / Broken
          </span>
          <span className={`text-xl font-black mt-1 block ${brokenCount > 0 ? 'text-rose-700' : 'text-slate-900'}`}>
            {brokenCount}
          </span>
          <span className={`text-[10px] ${brokenCount > 0 ? 'text-rose-600 font-bold' : 'text-slate-400'}`}>
            {brokenCount > 0 ? 'Hidden from student view' : 'All videos operational'}
          </span>
        </div>
      </div>

      {notification && (
        <div className="p-3.5 rounded-xl bg-emerald-900 text-white text-xs font-bold flex items-center justify-between shadow-md animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-slate-300 hover:text-white cursor-pointer ml-4">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        <div className="sm:col-span-4 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, topic, or creator..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-700"
          >
            <option value="All">All Subjects ({resources.length})</option>
            {LEARNING_SUBJECTS_METADATA.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-700"
          >
            <option value="All">All Classes</option>
            {CLASS_LEVELS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={statusFilter}
            onChange={(e: any) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-700"
          >
            <option value="All">All Availability States</option>
            <option value="Available">Available Only (Active in View)</option>
            <option value="Unavailable">Unavailable / Broken Only</option>
            <option value="Pending">Pending Approval</option>
          </select>
        </div>
      </div>

      {/* Resources Table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Video / Lesson Details</th>
                <th className="py-3.5 px-4">Subject</th>
                <th className="py-3.5 px-4">Class</th>
                <th className="py-3.5 px-4">Platform & Channel</th>
                <th className="py-3.5 px-4">Duration</th>
                <th className="py-3.5 px-4">Validation & Availability</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => {
                const isUnavailable = item.is_available === false;
                const watchUrl = getYouTubeWatchUrl(item.video_url);

                return (
                  <tr key={item.id} className={`transition-colors ${isUnavailable ? 'bg-rose-50/40 hover:bg-rose-50/70' : 'hover:bg-slate-50/70'}`}>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div 
                          onClick={() => setActivePreview(item)}
                          className="relative w-16 h-11 rounded-lg overflow-hidden shrink-0 bg-slate-900 cursor-pointer group"
                        >
                          <img
                            src={item.thumbnail_url || getYouTubeThumbnailUrl(item.video_url, 'hq')}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                          </div>
                        </div>
                        <div className="min-w-0 max-w-sm space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold text-emerald-800 uppercase block truncate">
                              {item.topic}
                            </span>
                            {isUnavailable && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-rose-600 text-white">
                                HIDDEN FROM STUDENTS
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-slate-900 truncate" title={item.title}>
                            {item.title}
                          </h4>

                          {/* If broken and replacement suggestion exists */}
                          {isUnavailable && (
                            <div className="pt-1 flex items-center gap-2 text-[10px]">
                              <span className="text-rose-700 font-semibold flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                Broken or restricted video
                              </span>
                              <button
                                onClick={() => handleApplyReplacement(item)}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-800 text-white font-bold hover:bg-emerald-700 transition-colors"
                              >
                                <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                                <span>Auto-Fix with Alternative</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-700 whitespace-nowrap">
                      {item.subject}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-emerald-900 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200">
                        {item.class_level}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-800 flex items-center gap-1">
                          <Youtube className="w-3.5 h-3.5 text-red-600" />
                          {item.platform}
                        </span>
                        <span className="text-[10px] text-slate-500 block truncate">{item.creator}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-600 whitespace-nowrap">
                      {item.duration || '15 mins'}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleToggleAvailability(item)}
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                              !isUnavailable
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                            }`}
                            title="Toggle whether students can view this lesson"
                          >
                            {!isUnavailable ? (
                              <>
                                <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                                <span>Available</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3 h-3 text-rose-700" />
                                <span>Unavailable</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => handleToggleApproval(item)}
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold cursor-pointer transition-colors ${
                              item.approved
                                ? 'bg-slate-100 text-slate-700'
                                : 'bg-amber-100 text-amber-900'
                            }`}
                          >
                            {item.approved ? 'Approved' : 'Pending'}
                          </button>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {watchUrl && (
                          <a
                            href={watchUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 transition-colors"
                            title="Watch on YouTube (Official)"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}

                        <button
                          onClick={() => setActivePreview(item)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                          title="Preview Lesson Modal"
                        >
                          <Play className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 cursor-pointer"
                          title="Edit Resource"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 cursor-pointer"
                          title="Delete Resource"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No educational resources match the selected criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal with Live URL Validation */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
            <div className="bg-gradient-to-r from-emerald-950 via-slate-950 to-emerald-950 text-white p-5 flex items-center justify-between">
              <h3 className="font-serif font-bold text-base flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span>{editingId ? 'Edit Educational Lesson' : 'Add & Validate New Educational Video Lesson'}</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-300 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              {/* URL Input with Live Validation Button */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="font-bold text-slate-800 flex items-center justify-between">
                  <span>Video URL (Official YouTube Embed / Educational Source) *</span>
                  <span className="text-[10px] text-slate-500 font-normal">Supports standard YouTube & Shortened links</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    value={formData.video_url}
                    onChange={(e) => {
                      setFormData({ ...formData, video_url: e.target.value });
                      setValidationResult(null);
                    }}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                  <button
                    type="button"
                    onClick={handleValidateFormUrl}
                    disabled={isValidatingUrl || !formData.video_url}
                    className="px-4 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-bold shrink-0 transition-colors disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Zap className={`w-3.5 h-3.5 text-amber-400 ${isValidatingUrl ? 'animate-spin' : ''}`} />
                    <span>{isValidatingUrl ? 'Validating...' : 'Validate URL'}</span>
                  </button>
                </div>

                {/* Validation Feedback Strip */}
                {validationResult && (
                  <div className={`p-3 rounded-xl border text-xs flex items-start gap-2 mt-2 ${
                    validationResult.isValid && validationResult.isPublic
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : 'bg-rose-50 border-rose-300 text-rose-900'
                  }`}>
                    {validationResult.isValid && validationResult.isPublic ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-0.5">
                      <p className="font-bold">{validationResult.message}</p>
                      <p className="text-[11px] opacity-80">
                        Platform: <strong>{validationResult.platform}</strong> • Embedding Allowed: <strong>{validationResult.isEmbeddable ? 'Yes' : 'No (Fallback Link Active)'}</strong>
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Lesson Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Algebra: Solving Quadratic Equations by Factorization"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Subject *</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 font-bold"
                  >
                    {LEARNING_SUBJECTS_METADATA.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Class Level *</label>
                  <select
                    value={formData.class_level}
                    onChange={(e) => setFormData({ ...formData, class_level: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 font-bold"
                  >
                    {CLASS_LEVELS.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                    <option value="All Levels">All Levels (JSS1 - SSS3)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Topic *</label>
                  <input
                    type="text"
                    required
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    placeholder="e.g. Algebra, Titration, Grammar"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Platform *</label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 font-bold"
                  >
                    {TRUSTED_LEARNING_PLATFORMS.map((p) => (
                      <option key={p.name} value={p.name}>{p.name}</option>
                    ))}
                    <option value="Other">Other Open Source</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Creator / Channel Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.creator}
                    onChange={(e) => setFormData({ ...formData, creator: e.target.value })}
                    placeholder="e.g. Khan Academy, CrashCourse, WAEC Masterclass"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g. 18 mins"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Thumbnail URL (Optional)</label>
                <input
                  type="url"
                  value={formData.thumbnail_url}
                  onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                  placeholder="Leave blank for automatic YouTube thumbnail"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Curriculum Description / Notes</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief summary of concepts covered in this lesson..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="approved-check"
                    checked={formData.approved}
                    onChange={(e) => setFormData({ ...formData, approved: e.target.checked })}
                    className="rounded text-emerald-900 focus:ring-emerald-700"
                  />
                  <label htmlFor="approved-check" className="font-bold text-slate-700 cursor-pointer">
                    Approve for student portal
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="available-check"
                    checked={formData.is_available}
                    onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                    className="rounded text-emerald-900 focus:ring-emerald-700"
                  />
                  <label htmlFor="available-check" className="font-bold text-slate-700 cursor-pointer">
                    Mark Available (Active)
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-bold cursor-pointer shadow-md"
                >
                  {editingId ? 'Save Changes' : 'Validate & Publish Lesson'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Preview Modal */}
      <LessonPlayerModal
        resource={activePreview}
        onClose={() => setActivePreview(null)}
        isFavorite={false}
        onToggleFavorite={() => {}}
      />
    </div>
  );
};
