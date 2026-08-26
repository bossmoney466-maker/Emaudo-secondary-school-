export type PageTab = 
  | 'home' 
  | 'about' 
  | 'history' 
  | 'academics' 
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
