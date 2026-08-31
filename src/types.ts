export type PageTab = 
  | 'home' 
  | 'about' 
  | 'history' 
  | 'academics' 
  | 'departments'
  | 'activities'
  | 'learning-centre'
  | 'admissions' 
  | 'alumni' 
  | 'gallery' 
  | 'news' 
  | 'events' 
  | 'portal' 
  | 'admin' 
  | 'contact';

export interface SchoolContactInfo {
  schoolName: string;
  established?: number;
  founder?: string;
  addressLines: string[];
  fullAddress: string;
  whatsappDisplay: string;
  whatsappRaw: string;
  whatsappUrl: string;
  whatsappMessage: string;
  phoneDisplay: string;
  phoneTel: string;
  email: string;
  essosaUrl?: string;
  essosaHistoryUrl?: string;
  essosaGalleryUrl?: string;
}

export interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  subtitle?: string;
  description: string;
  tag: string;
  iconName: 'flag' | 'graduation' | 'award' | 'microscope' | 'book' | 'sparkles';
  photoPlaceholder?: string;
  verified: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  content: string;
  readTime?: string;
  pinned?: boolean;
  isSample?: boolean;
}

export type NewsArticle = NewsItem;

export interface SchoolEvent {
  id: string;
  title: string;
  category: string;
  date?: string;
  time?: string;
  venue?: string;
  schedule?: string;
  location?: string;
  description: string;
  isSample?: boolean;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  caption?: string;
  description?: string;
  imageUrl?: string;
  year?: string;
  date?: string;
  source?: string;
  placeholderLabel?: string;
  accentColor?: string;
}

export interface SubjectScore {
  subject: string;
  ca1: number;
  ca2: number;
  exam: number;
  total: number;
  grade: string;
  remark: string;
}

export interface StudentResultRecord {
  studentId: string;
  studentName: string;
  className: string;
  term: string;
  session: string;
  scores: SubjectScore[];
  totalScore: number;
  averageScore: number;
  position: string;
  attendanceDays: number;
  totalSchoolDays: number;
  classSize?: number;
  classTeacherRemark: string;
  principalRemark: string;
  nextTermBegins: string;
}

export interface StudentProfile {
  id: string;
  studentId: string;
  name: string;
  className: string;
  gender: 'Male' | 'Female';
  guardianName: string;
  guardianPhone: string;
  feesStatus: 'Paid' | 'Partial' | 'Partially Paid' | 'Pending';
  outstandingAmount?: number;
  attendanceRate: number;
  status?: 'Active' | 'Graduated' | 'Transferred';
}

export interface AdmissionApplication {
  id: string;
  applicantName: string;
  proposedClass: string;
  parentName: string;
  parentPhone: string;
  parentWhatsApp?: string;
  parentEmail?: string;
  previousSchool: string;
  submissionDate?: string;
  appliedDate?: string;
  status: 'Pending Review' | 'Entrance Test Scheduled' | 'Approved' | 'Declined';
  gender?: 'Male' | 'Female';
}

export interface AdmissionEnquiry {
  studentName: string;
  parentName: string;
  phone: string;
  email?: string;
  classApplying: string;
  previousSchool?: string;
  message?: string;
}

export interface ContactSubmission {
  name: string;
  email?: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ChatMessage {
  id: string;
  sender?: 'user' | 'ai';
  role?: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Excused';

export type UserRole = 'superadmin' | 'admin' | 'teacher' | 'student' | 'parent' | 'alumni';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  phone?: string;
  avatar_url?: string;
  created_at?: string;
}

export interface AcademicDepartment {
  id: string;
  name: string;
  headOfDepartment: string;
  description: string;
  tagline: string;
  iconName: string;
  subjects: string[];
  features: string[];
  competitions?: string[];
  labsOrFacilities?: string[];
}

export interface CurriculumSubject {
  id: string;
  code: string;
  name: string;
  department: string;
  level: 'Junior' | 'Senior' | 'All';
  isCore: boolean;
  description: string;
  syllabusTopics: string[];
}

export interface SchoolClub {
  id: string;
  name: string;
  category: 'Academic' | 'Arts' | 'Civic' | 'Sports' | 'Leadership';
  description: string;
  coordinator: string;
  meetingDay: string;
  meetingTime: string;
  venue: string;
  activities: string[];
  achievements: string[];
}

export interface SchoolActivityItem {
  id: string;
  title: string;
  category: 'WAEC/NECO Prep' | 'Continuous Assessment' | 'Tutorials' | 'Competitions' | 'Assembly' | 'Sports' | 'Leadership';
  description: string;
  frequency: string;
  targetAudience: string;
  keyHighlights: string[];
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  period: number;
  time: string;
  className: string;
  subject: string;
  teacherName: string;
  room: string;
}

export interface AttendanceRecordItem {
  id: string;
  studentId: string;
  admissionNumber: string;
  studentName: string;
  gender: 'Male' | 'Female';
  className: string;
  arm: string;
  subject?: string;
  date: string;
  status: AttendanceStatus;
  remark?: string;
  recordedBy?: string;
  teacherName?: string;
  timeRecorded?: string;
}

export interface StudentAttendanceSummary {
  studentId: string;
  admissionNumber: string;
  studentName: string;
  className: string;
  gender: 'Male' | 'Female';
  guardianName?: string;
  guardianPhone?: string;
  totalSessions: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  excusedCount: number;
  attendancePercentage: number;
  statusCategory: 'Regular' | 'Fair' | 'Chronic Absenteeism' | 'At Risk';
}

export type LearningSubjectType = 
  | 'Mathematics' 
  | 'English Language' 
  | 'Science' 
  | 'ICT' 
  | 'Social Science' 
  | 'Commercial';

export type ClassLevelType = 
  | 'JSS1' 
  | 'JSS2' 
  | 'JSS3' 
  | 'SS1' 
  | 'SS2' 
  | 'SS3'
  | 'All Levels';

export type LearningPlatformType = 
  | 'YouTube' 
  | 'Khan Academy' 
  | 'BBC Bitesize' 
  | 'CK-12' 
  | 'MIT OpenCourseWare' 
  | 'Coursera' 
  | 'edX'
  | 'Other';

export interface LearningResource {
  id: string;
  title: string;
  subject: LearningSubjectType | string;
  class_level: ClassLevelType | string;
  topic: string;
  platform: LearningPlatformType | string;
  video_url: string;
  thumbnail_url: string;
  creator: string;
  description: string;
  approved: boolean;
  duration?: string;
  created_at?: string;
  is_available?: boolean;
  validation_status?: 'valid' | 'invalid' | 'warning' | 'checking';
  last_checked_at?: string;
  youtube_video_id?: string;
  embed_allowed?: boolean;
  fallback_resource_id?: string;
  replacement_suggestion?: string;
}

// 1. SMART NOTIFICATION SYSTEM TYPES
export type NotificationCategory = 
  | 'resumption' 
  | 'exam' 
  | 'assignment' 
  | 'fee' 
  | 'result' 
  | 'event' 
  | 'emergency' 
  | 'general';

export type NotificationTarget = 'all' | 'students' | 'parents' | 'teachers' | 'admins' | 'JSS' | 'SSS';

export interface SmartNotification {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  target_role: NotificationTarget;
  target_class?: string;
  priority: 'normal' | 'high' | 'urgent';
  created_at: string;
  date?: string;
  scheduled_for?: string;
  is_read?: boolean;
  action_url?: string;
  action_label?: string;
  created_by?: string;
}

// 2. ONLINE CBT EXAMINATION SYSTEM TYPES
export interface ExamQuestion {
  id: string;
  exam_id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: 'A' | 'B' | 'C' | 'D';
  explanation?: string;
  points: number;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  class_level: string; // 'JSS 1' | 'JSS 2' | 'JSS 3' | 'SS 1' | 'SS 2' | 'SS 3' | 'All'
  term: string; // '1st Term' | '2nd Term' | '3rd Term'
  session: string; // '2024/2025'
  duration_minutes: number;
  total_questions: number;
  pass_mark_percentage: number;
  instructions: string;
  status: 'active' | 'upcoming' | 'closed' | 'draft';
  created_by: string;
  created_at: string;
  questions?: ExamQuestion[];
}

export interface StudentExamSubmission {
  id: string;
  exam_id: string;
  student_id: string;
  student_name: string;
  class_name: string;
  score: number;
  total_marks: number;
  percentage: number;
  passed: boolean;
  answers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  time_spent_seconds: number;
  submitted_at: string;
  approved: boolean;
  remarks?: string;
}

// 3. DIGITAL LIBRARY TYPES
export type LibraryCategory = 
  | 'textbook' 
  | 'class_note' 
  | 'waec_past_question' 
  | 'neco_past_question' 
  | 'study_guide' 
  | 'science_lab_guide';

export interface DigitalLibraryItem {
  id: string;
  title: string;
  author_or_publisher: string;
  subject: string;
  class_level: 'JSS1' | 'JSS2' | 'JSS3' | 'SS1' | 'SS2' | 'SS3' | 'All Levels';
  category: LibraryCategory;
  file_format: 'PDF' | 'EPUB' | 'DOCX';
  file_size: string;
  page_count: number;
  download_url: string;
  preview_summary: string;
  topics_covered: string[];
  is_featured?: boolean;
  downloads_count: number;
  created_at: string;
}

// 4. STUDENT TIMETABLE SYSTEM TYPES
export interface ExamTimetableEntry {
  id: string;
  exam_type: 'WAEC' | 'NECO' | 'Terminal Exam' | 'Mock CBT';
  date: string;
  day_name: string;
  time: string;
  subject: string;
  paper_code: string;
  class_level: string;
  venue: string;
  invigilator: string;
}

// 5. STUDENT ACHIEVEMENT SYSTEM TYPES
export type AchievementCategory = 
  | 'Academic Excellence' 
  | 'WAEC/NECO Distinction' 
  | 'STEM & Olympiad' 
  | 'Debate & Literary' 
  | 'Sports & Athletics' 
  | 'Leadership & Service' 
  | 'Arts & Cultural Heritage'
  | 'academic'
  | 'olympiad'
  | 'sports'
  | 'arts_debate'
  | 'leadership';

export interface StudentAchievement {
  id: string;
  student_name: string;
  class_name: string;
  year: string | number;
  category: AchievementCategory;
  award_title?: string;
  title?: string;
  competition_or_event?: string;
  competition_name?: string;
  position?: string;
  description: string;
  rank_or_medal?: string;
  badge_color?: string;
  image_url?: string;
  certificate_url?: string;
  is_featured?: boolean;
  featured?: boolean;
  date_awarded?: string;
}

// 6. SCHOOL COMMUNICATION & MESSAGING SYSTEM TYPES
export interface SchoolMessage {
  id: string;
  sender_id: string;
  sender_name: string;
  sender_role: UserRole;
  recipient_id: string;
  recipient_name: string;
  recipient_role: UserRole | string;
  ward_id?: string;
  ward_name?: string;
  subject: string;
  message: string;
  body?: string;
  category: 'academic' | 'behaviour' | 'fees' | 'attendance' | 'general' | 'emergency';
  created_at: string;
  is_read: boolean;
  reply_to_id?: string;
  parent_message_id?: string;
}

// 7. ALUMNI NETWORK TYPES
export interface AlumniProfile {
  id: string;
  full_name: string;
  grad_year: string;
  graduation_year?: string;
  set_name: string; // e.g. "Class of 1995"
  profession: string;
  company_or_institution: string;
  city: string;
  country: string;
  email: string;
  phone?: string;
  bio: string;
  achievements: string;
  chapter: string;
  mentorship_available: boolean;
  mentorship_fields?: string[];
  photo_url?: string;
  approved: boolean;
  created_at: string;
}

export interface AlumniMentorshipRequest {
  id: string;
  student_name: string;
  student_id: string;
  class_level: string;
  target_career: string;
  mentor_id: string;
  mentor_name: string;
  message: string;
  status: 'Pending' | 'Accepted' | 'Completed';
  created_at: string;
}


