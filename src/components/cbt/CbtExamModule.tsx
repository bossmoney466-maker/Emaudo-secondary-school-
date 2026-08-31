import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft, 
  Flag, 
  RefreshCw, 
  Play, 
  Check, 
  X, 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  Printer, 
  ChevronRight,
  Calculator,
  FlaskConical,
  Cpu,
  Plus
} from 'lucide-react';
import { Exam, ExamQuestion, StudentExamSubmission } from '../../types';
import { MOCK_EXAMS, MOCK_EXAM_QUESTIONS, MOCK_STUDENT_EXAM_HISTORY } from '../../data/expandedData';
import { useAuth } from '../../context/AuthContext';
import { supabaseService, isSupabaseConfigured } from '../../lib/supabase';

interface CbtExamModuleProps {
  initialClass?: string;
}

export const CbtExamModule: React.FC<CbtExamModuleProps> = ({ initialClass = 'SS 2' }) => {
  const { profile, role } = useAuth();
  const [activeTab, setActiveTab] = useState<'available' | 'taking' | 'result' | 'history' | 'create'>('available');
  const [exams, setExams] = useState<Exam[]>(MOCK_EXAMS);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<ExamQuestion[]>([]);
  
  // Test taking states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [studentAnswers, setStudentAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Completed test result state
  const [lastSubmission, setLastSubmission] = useState<StudentExamSubmission | null>(null);
  const [examHistory, setExamHistory] = useState<StudentExamSubmission[]>(() => {
    const saved = localStorage.getItem('emaudo_exam_history');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return MOCK_STUDENT_EXAM_HISTORY;
  });

  // Admin / Teacher create exam state
  const [newExamTitle, setNewExamTitle] = useState('');
  const [newExamSubject, setNewExamSubject] = useState('Mathematics');
  const [newExamClass, setNewExamClass] = useState('SS 2');
  const [newExamDuration, setNewExamDuration] = useState(15);
  const [newExamPassMark, setNewExamPassMark] = useState(60);
  const [newExamInstructions, setNewExamInstructions] = useState('Answer all questions. Rough calculation sheets allowed.');
  const [newQuestions, setNewQuestions] = useState<Array<{
    question_text: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_option: 'A' | 'B' | 'C' | 'D';
    explanation: string;
    points: number;
  }>>([
    {
      question_text: '',
      option_a: '',
      option_b: '',
      option_c: '',
      option_d: '',
      correct_option: 'A',
      explanation: '',
      points: 2
    }
  ]);
  const [createSuccess, setCreateSuccess] = useState(false);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('emaudo_exam_history', JSON.stringify(examHistory));
  }, [examHistory]);

  // Load live exams from Supabase if configured
  useEffect(() => {
    if (isSupabaseConfigured) {
      supabaseService.exams.getAll().then((data: any) => {
        if (data && data.length > 0) {
          const formatted: Exam[] = data.map((d: any) => ({
            id: d.id,
            title: d.title,
            subject: d.subject,
            class_level: d.class_level,
            term: d.term || '1st Term',
            session: d.session || '2024/2025',
            duration_minutes: d.duration_minutes || 15,
            total_questions: d.questions ? d.questions.length : 5,
            pass_mark_percentage: d.pass_mark_percentage || 60,
            instructions: d.instructions || 'Answer all questions.',
            status: d.status || 'active',
            created_by: d.created_by || 'Academic Board',
            created_at: d.created_at,
            questions: d.questions || []
          }));
          setExams(prev => {
            const ids = new Set(prev.map(p => p.id));
            const fresh = formatted.filter(f => !ids.has(f.id));
            return [...fresh, ...prev];
          });
        }
      }).catch(() => {});
    }
  }, []);

  // Timer countdown engine during active test
  useEffect(() => {
    if (activeTab !== 'taking' || timeRemainingSeconds <= 0) return;

    const timer = setInterval(() => {
      setTimeRemainingSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimeUp(true);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeTab, timeRemainingSeconds]);

  // Start Exam
  const handleStartExam = (exam: Exam) => {
    const questions = exam.questions && exam.questions.length > 0
      ? exam.questions
      : MOCK_EXAM_QUESTIONS[exam.id] || MOCK_EXAM_QUESTIONS['exam-math-ss2'];

    setSelectedExam(exam);
    setCurrentQuestions(questions);
    setCurrentQuestionIndex(0);
    setStudentAnswers({});
    setFlaggedQuestions({});
    setTimeRemainingSeconds(exam.duration_minutes * 60);
    setIsTimeUp(false);
    setShowConfirmSubmit(false);
    setActiveTab('taking');
  };

  // Select Answer
  const handleSelectOption = (questionId: string, option: 'A' | 'B' | 'C' | 'D') => {
    setStudentAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  // Toggle Flag for review
  const handleToggleFlag = (questionId: string) => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  // Automatic marking calculation
  const calculateResult = (): StudentExamSubmission => {
    if (!selectedExam) throw new Error('No exam selected');

    let totalScore = 0;
    let maxMarks = 0;

    currentQuestions.forEach(q => {
      const qPoints = q.points || 2;
      maxMarks += qPoints;
      if (studentAnswers[q.id] === q.correct_option) {
        totalScore += qPoints;
      }
    });

    const percentage = maxMarks > 0 ? Math.round((totalScore / maxMarks) * 100) : 0;
    const passed = percentage >= selectedExam.pass_mark_percentage;
    const timeSpent = (selectedExam.duration_minutes * 60) - timeRemainingSeconds;

    const submission: StudentExamSubmission = {
      id: `sub-${Date.now()}`,
      exam_id: selectedExam.id,
      student_id: profile?.id ? `ESS/2024/${profile.id.substring(0, 4)}` : 'ESS/2024/0142',
      student_name: profile?.full_name || 'Osasere Emmanuel',
      class_name: selectedExam.class_level,
      score: totalScore,
      total_marks: maxMarks,
      percentage,
      passed,
      answers: studentAnswers,
      time_spent_seconds: timeSpent,
      submitted_at: new Date().toISOString(),
      approved: true,
      remarks: passed 
        ? percentage >= 85 
          ? 'Exceptional mastery of syllabus concepts. High Distinction.' 
          : 'Commendable performance. Passed with credit.'
        : 'Below pass mark. Review the explanations below and re-study key topics.'
    };

    return submission;
  };

  const handleSubmitExam = async () => {
    setIsSubmitting(true);
    const submission = calculateResult();
    setLastSubmission(submission);
    setExamHistory(prev => [submission, ...prev]);

    // Save to Supabase if connected
    if (isSupabaseConfigured) {
      try {
        await supabaseService.exams.submitExam({
          exam_id: submission.exam_id,
          student_id: submission.student_id,
          student_name: submission.student_name,
          class_name: submission.class_name,
          score: submission.score,
          total_marks: submission.total_marks,
          percentage: submission.percentage,
          passed: submission.passed,
          answers: submission.answers,
          time_spent_seconds: submission.time_spent_seconds,
          submitted_at: submission.submitted_at,
          approved: true,
        });
      } catch (e) {}
    }

    setIsSubmitting(false);
    setShowConfirmSubmit(false);
    setActiveTab('result');
  };

  const handleAutoSubmit = () => {
    const submission = calculateResult();
    setLastSubmission(submission);
    setExamHistory(prev => [submission, ...prev]);
    setActiveTab('result');
  };

  // Add question row in create form
  const handleAddQuestionRow = () => {
    setNewQuestions(prev => [
      ...prev,
      {
        question_text: '',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        correct_option: 'A',
        explanation: '',
        points: 2
      }
    ]);
  };

  const handleCreateExamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExamId = `exam-${Date.now()}`;
    const formattedQuestions: ExamQuestion[] = newQuestions.map((q, idx) => ({
      id: `q-${newExamId}-${idx + 1}`,
      exam_id: newExamId,
      question_text: q.question_text,
      option_a: q.option_a,
      option_b: q.option_b,
      option_c: q.option_c,
      option_d: q.option_d,
      correct_option: q.correct_option,
      explanation: q.explanation,
      points: q.points || 2
    }));

    const created: Exam = {
      id: newExamId,
      title: newExamTitle,
      subject: newExamSubject,
      class_level: newExamClass,
      term: '1st Term',
      session: '2024/2025',
      duration_minutes: Number(newExamDuration),
      total_questions: formattedQuestions.length,
      pass_mark_percentage: Number(newExamPassMark),
      instructions: newExamInstructions,
      status: 'active',
      created_by: profile?.full_name || 'Faculty Examiner',
      created_at: new Date().toISOString(),
      questions: formattedQuestions
    };

    setExams(prev => [created, ...prev]);
    setCreateSuccess(true);
    setTimeout(() => {
      setCreateSuccess(false);
      setActiveTab('available');
    }, 2000);
  };

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header & Sub-Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-md">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span>Online CBT Examination System</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
            Computer-Based Testing & WAEC Mock Engine
          </h2>
          <p className="text-xs text-slate-300">
            Practice timed multiple-choice assessments with instant automated marking and explanatory answer keys.
          </p>
        </div>

        {activeTab !== 'taking' && (
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'available', label: 'Active Tests', icon: <FileText className="w-4 h-4" /> },
              { id: 'history', label: `My History (${examHistory.length})`, icon: <Award className="w-4 h-4" /> },
              ...(role === 'teacher' || role === 'admin' || role === 'superadmin' ? [
                { id: 'create', label: 'Create Exam', icon: <Plus className="w-4 h-4" /> }
              ] : [])
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 1. AVAILABLE TESTS TAB */}
      {activeTab === 'available' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exams.map(exam => {
              const isUpcoming = exam.status === 'upcoming';
              return (
                <div
                  key={exam.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:border-emerald-500/40 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                        {exam.subject}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 font-semibold">
                        {exam.class_level}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-sm sm:text-base text-slate-900 leading-snug">
                      {exam.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {exam.instructions}
                    </p>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-[11px]">
                      <div className="bg-slate-50 p-2 rounded-xl text-center">
                        <div className="text-slate-400 flex items-center justify-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>Duration</span>
                        </div>
                        <div className="font-bold text-slate-800 font-mono mt-0.5">{exam.duration_minutes} mins</div>
                      </div>

                      <div className="bg-slate-50 p-2 rounded-xl text-center">
                        <div className="text-slate-400 flex items-center justify-center gap-1">
                          <FileText className="w-3 h-3 text-slate-500" />
                          <span>Questions</span>
                        </div>
                        <div className="font-bold text-slate-800 font-mono mt-0.5">{exam.total_questions} Qs</div>
                      </div>

                      <div className="bg-slate-50 p-2 rounded-xl text-center">
                        <div className="text-slate-400 flex items-center justify-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-slate-500" />
                          <span>Pass Mark</span>
                        </div>
                        <div className="font-bold text-emerald-700 font-mono mt-0.5">{exam.pass_mark_percentage}%</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      By {exam.created_by.split(' ')[0]}
                    </span>

                    {isUpcoming ? (
                      <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-500 text-xs font-bold">
                        Opens Soon
                      </span>
                    ) : (
                      <button
                        onClick={() => handleStartExam(exam)}
                        className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs hover:scale-[1.02] cursor-pointer flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Start Test</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. ACTIVE CBT EXAM TAKING INTERFACE */}
      {activeTab === 'taking' && selectedExam && (
        <div className="space-y-6">
          {/* Active Exam Sticky Bar */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-wider font-bold text-amber-400">
                {selectedExam.subject} • {selectedExam.class_level}
              </div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-white">
                {selectedExam.title}
              </h3>
            </div>

            {/* Countdown Timer */}
            <div className="flex items-center gap-4">
              <div className={`px-4 py-2 rounded-xl flex items-center gap-2 border font-mono text-base font-bold ${
                timeRemainingSeconds < 180 
                  ? 'bg-rose-950/80 border-rose-500 text-rose-300 animate-pulse' 
                  : 'bg-slate-800 border-slate-700 text-amber-300'
              }`}>
                <Clock className="w-4 h-4" />
                <span>Time: {formatTime(timeRemainingSeconds)}</span>
              </div>

              <button
                onClick={() => setShowConfirmSubmit(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md cursor-pointer transition-all"
              >
                Submit Exam
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Question Presentation Box */}
            <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              {currentQuestions[currentQuestionIndex] ? (
                <>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-mono font-bold">
                      Question {currentQuestionIndex + 1} of {currentQuestions.length}
                    </span>

                    <button
                      onClick={() => handleToggleFlag(currentQuestions[currentQuestionIndex].id)}
                      className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        flaggedQuestions[currentQuestions[currentQuestionIndex].id]
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <Flag className="w-3.5 h-3.5" />
                      <span>{flaggedQuestions[currentQuestions[currentQuestionIndex].id] ? 'Flagged for Review' : 'Flag Question'}</span>
                    </button>
                  </div>

                  {/* Question Text */}
                  <div className="text-sm sm:text-base font-medium text-slate-900 leading-relaxed">
                    {currentQuestions[currentQuestionIndex].question_text}
                  </div>

                  {/* Multiple Choice Options */}
                  <div className="space-y-3 pt-2">
                    {(['A', 'B', 'C', 'D'] as const).map(optionKey => {
                      const optionProp = `option_${optionKey.toLowerCase()}` as 'option_a' | 'option_b' | 'option_c' | 'option_d';
                      const optionText = currentQuestions[currentQuestionIndex][optionProp];
                      const isSelected = studentAnswers[currentQuestions[currentQuestionIndex].id] === optionKey;

                      return (
                        <button
                          key={optionKey}
                          onClick={() => handleSelectOption(currentQuestions[currentQuestionIndex].id, optionKey)}
                          className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                            isSelected
                              ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/20 text-emerald-950 font-semibold'
                              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold font-mono shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-emerald-700 text-white shadow-2xs'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {optionKey}
                          </span>
                          <span className="text-xs sm:text-sm leading-relaxed">{optionText}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <button
                      disabled={currentQuestionIndex === 0}
                      onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                      className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>

                    {currentQuestionIndex < currentQuestions.length - 1 ? (
                      <button
                        onClick={() => setCurrentQuestionIndex(prev => Math.min(currentQuestions.length - 1, prev + 1))}
                        className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>Next Question</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowConfirmSubmit(true)}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black text-xs shadow-md cursor-pointer"
                      >
                        Finish & Submit
                      </button>
                    )}
                  </div>
                </>
              ) : null}
            </div>

            {/* Right: Question Navigation Palette */}
            <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 className="font-serif font-bold text-xs text-slate-900">Question Palette</h4>
                <span className="text-[11px] font-mono text-slate-500">
                  {Object.keys(studentAnswers).length} / {currentQuestions.length} answered
                </span>
              </div>

              {/* Status Legend */}
              <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-500">
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span>Flagged</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <span>Unanswered</span>
                </div>
              </div>

              {/* Grid Numbers */}
              <div className="grid grid-cols-5 gap-2 pt-2">
                {currentQuestions.map((q, idx) => {
                  const isAnswered = studentAnswers[q.id] !== undefined;
                  const isFlagged = flaggedQuestions[q.id];
                  const isCurrent = currentQuestionIndex === idx;

                  let btnBg = 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200';
                  if (isAnswered) btnBg = 'bg-emerald-600 text-white font-bold border-emerald-700';
                  if (isFlagged) btnBg = 'bg-amber-400 text-slate-950 font-bold border-amber-500 ring-2 ring-amber-300';
                  if (isCurrent) btnBg += ' ring-2 ring-blue-500 ring-offset-1';

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`h-10 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center ${btnBg}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => setShowConfirmSubmit(true)}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Submit Exam Now</span>
                </button>
              </div>
            </div>
          </div>

          {/* Submit Confirmation Modal */}
          {showConfirmSubmit && (
            <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-150">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-slate-900">
                    Ready to Submit Your Exam?
                  </h3>
                  <p className="text-xs text-slate-500">
                    Please review your submission summary below. You cannot modify answers after final submission.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Total Questions:</span>
                    <strong className="text-slate-900 font-mono">{currentQuestions.length}</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Questions Answered:</span>
                    <strong className="text-emerald-700 font-mono">{Object.keys(studentAnswers).length}</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Questions Unanswered:</span>
                    <strong className="text-rose-700 font-mono">{currentQuestions.length - Object.keys(studentAnswers).length}</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Flagged for Review:</span>
                    <strong className="text-amber-700 font-mono">{Object.values(flaggedQuestions).filter(Boolean).length}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setShowConfirmSubmit(false)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                  >
                    Return to Test
                  </button>
                  <button
                    onClick={handleSubmitExam}
                    disabled={isSubmitting}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Confirm & Submit'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. TEST RESULT & ANSWER KEY REVIEW */}
      {activeTab === 'result' && lastSubmission && selectedExam && (
        <div className="space-y-6">
          {/* Result Score Card */}
          <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-emerald-500/30 shadow-2xl text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Assessment Completed & Automatically Marked</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              {selectedExam.title}
            </h3>

            {/* Big Score Ring */}
            <div className="py-4">
              <div className="inline-block p-6 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-md">
                <div className="text-4xl sm:text-6xl font-black font-mono tracking-tight text-amber-400">
                  {lastSubmission.percentage}%
                </div>
                <div className="text-xs uppercase font-bold text-slate-300 mt-1">
                  Score: {lastSubmission.score} / {lastSubmission.total_marks} Marks
                </div>
              </div>
            </div>

            <div className="max-w-md mx-auto">
              <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider inline-block ${
                lastSubmission.passed 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-rose-500 text-white'
              }`}>
                {lastSubmission.passed ? 'PASSED • CONGRATULATIONS' : 'DID NOT MEET PASS MARK'}
              </span>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {lastSubmission.remarks}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Score Receipt</span>
              </button>
              <button
                onClick={() => setActiveTab('available')}
                className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-colors cursor-pointer"
              >
                Take Another Assessment
              </button>
            </div>
          </div>

          {/* Question Explanations & Solutions Breakdown */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h4 className="font-serif font-bold text-base text-slate-900">
                  Detailed Answer Key & Syllabus Explanations
                </h4>
                <p className="text-xs text-slate-500">
                  Review each question, your selected answer, and teacher annotations.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {currentQuestions.map((q, idx) => {
                const studentAns = lastSubmission.answers[q.id];
                const isCorrect = studentAns === q.correct_option;

                return (
                  <div 
                    key={q.id} 
                    className={`p-5 rounded-2xl border transition-all ${
                      isCorrect 
                        ? 'bg-emerald-50/40 border-emerald-200' 
                        : 'bg-rose-50/30 border-rose-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-xs font-mono font-bold text-slate-700">
                        Question {idx + 1}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 ${
                        isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                      }`}>
                        {isCorrect ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        <span>{isCorrect ? 'Correct (+2)' : 'Incorrect (0)'}</span>
                      </span>
                    </div>

                    <div className="text-sm font-medium text-slate-900 mb-3">
                      {q.question_text}
                    </div>

                    {/* Options list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                      {(['A', 'B', 'C', 'D'] as const).map(opt => {
                        const optText = q[`option_${opt.toLowerCase()}` as 'option_a' | 'option_b' | 'option_c' | 'option_d'];
                        const isStudentChoice = studentAns === opt;
                        const isCorrectOption = q.correct_option === opt;

                        let optClass = 'bg-white text-slate-700 border-slate-200';
                        if (isCorrectOption) optClass = 'bg-emerald-100/90 text-emerald-900 border-emerald-400 font-bold';
                        else if (isStudentChoice) optClass = 'bg-rose-100 text-rose-900 border-rose-300 font-semibold';

                        return (
                          <div key={opt} className={`p-2.5 rounded-xl border flex items-center gap-2 ${optClass}`}>
                            <span className="font-mono font-bold">{opt}.</span>
                            <span>{optText}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Teacher Explanation */}
                    {q.explanation && (
                      <div className="bg-white/80 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                        <div className="font-bold text-slate-800 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>Teacher Solution / Explanation:</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                          {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 4. EXAM HISTORY & PAST SUBMISSIONS */}
      {activeTab === 'history' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-serif font-bold text-base text-slate-900">Student CBT Examination History</h3>
              <p className="text-xs text-slate-500">Record of all completed computer-based tests and terminal assessments.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-3">Exam Subject / Title</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Score</th>
                  <th className="p-3">Percentage</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {examHistory.map(hist => (
                  <tr key={hist.id} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">
                      {exams.find(e => e.id === hist.exam_id)?.title || hist.exam_id}
                    </td>
                    <td className="p-3 text-slate-600 font-mono">{hist.student_name}</td>
                    <td className="p-3 text-slate-500">{new Date(hist.submitted_at).toLocaleDateString()}</td>
                    <td className="p-3 font-mono font-bold text-slate-900">{hist.score} / {hist.total_marks}</td>
                    <td className="p-3 font-mono font-bold text-emerald-700">{hist.percentage}%</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        hist.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {hist.passed ? 'Passed' : 'Failed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. CREATE EXAM (TEACHER / ADMIN) */}
      {activeTab === 'create' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-serif font-bold text-base text-slate-900">Create New CBT Examination</h3>
              <p className="text-xs text-slate-500">Configure exam parameters and author multiple choice questions with automatic marking keys.</p>
            </div>
          </div>

          {createSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Examination created successfully and published to student portal!</span>
            </div>
          )}

          <form onSubmit={handleCreateExamSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Exam Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SS 2 Physics 1st Term CA Test"
                  value={newExamTitle}
                  onChange={e => setNewExamTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Subject</label>
                <select
                  value={newExamSubject}
                  onChange={e => setNewExamSubject(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="English Language">English Language</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="Computer Studies">Computer Studies / ICT</option>
                  <option value="Economics">Economics</option>
                  <option value="Government">Government</option>
                  <option value="Financial Accounting">Financial Accounting</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Target Class</label>
                <select
                  value={newExamClass}
                  onChange={e => setNewExamClass(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                >
                  <option value="JSS 1">JSS 1</option>
                  <option value="JSS 2">JSS 2</option>
                  <option value="JSS 3">JSS 3</option>
                  <option value="SS 1">SS 1</option>
                  <option value="SS 2">SS 2</option>
                  <option value="SS 3">SS 3</option>
                  <option value="All Classes">All Classes</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Duration (Minutes)</label>
                <input
                  type="number"
                  required
                  min={5}
                  max={120}
                  value={newExamDuration}
                  onChange={e => setNewExamDuration(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            {/* Questions Builder */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-sm text-slate-900">
                  Multiple Choice Questions ({newQuestions.length})
                </h4>
                <button
                  type="button"
                  onClick={handleAddQuestionRow}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Question</span>
                </button>
              </div>

              <div className="space-y-4">
                {newQuestions.map((q, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">Question {idx + 1}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-500 font-bold">Correct Option:</span>
                        <select
                          value={q.correct_option}
                          onChange={e => {
                            const val = e.target.value as 'A' | 'B' | 'C' | 'D';
                            setNewQuestions(prev => prev.map((item, i) => i === idx ? { ...item, correct_option: val } : item));
                          }}
                          className="p-1 rounded-lg border border-slate-300 text-xs font-bold text-emerald-800 bg-white"
                        >
                          <option value="A">Option A</option>
                          <option value="B">Option B</option>
                          <option value="C">Option C</option>
                          <option value="D">Option D</option>
                        </select>
                      </div>
                    </div>

                    <textarea
                      required
                      placeholder="Type question prompt here..."
                      value={q.question_text}
                      onChange={e => {
                        const val = e.target.value;
                        setNewQuestions(prev => prev.map((item, i) => i === idx ? { ...item, question_text: val } : item));
                      }}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white"
                      rows={2}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Option A"
                        value={q.option_a}
                        onChange={e => {
                          const val = e.target.value;
                          setNewQuestions(prev => prev.map((item, i) => i === idx ? { ...item, option_a: val } : item));
                        }}
                        className="p-2 rounded-lg border border-slate-300 text-xs bg-white"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Option B"
                        value={q.option_b}
                        onChange={e => {
                          const val = e.target.value;
                          setNewQuestions(prev => prev.map((item, i) => i === idx ? { ...item, option_b: val } : item));
                        }}
                        className="p-2 rounded-lg border border-slate-300 text-xs bg-white"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Option C"
                        value={q.option_c}
                        onChange={e => {
                          const val = e.target.value;
                          setNewQuestions(prev => prev.map((item, i) => i === idx ? { ...item, option_c: val } : item));
                        }}
                        className="p-2 rounded-lg border border-slate-300 text-xs bg-white"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Option D"
                        value={q.option_d}
                        onChange={e => {
                          const val = e.target.value;
                          setNewQuestions(prev => prev.map((item, i) => i === idx ? { ...item, option_d: val } : item));
                        }}
                        className="p-2 rounded-lg border border-slate-300 text-xs bg-white"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Optional explanation / solution guide for students after exam..."
                      value={q.explanation}
                      onChange={e => {
                        const val = e.target.value;
                        setNewQuestions(prev => prev.map((item, i) => i === idx ? { ...item, explanation: val } : item));
                      }}
                      className="w-full p-2 rounded-lg border border-slate-300 text-xs bg-white text-slate-600"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              Publish Examination
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
