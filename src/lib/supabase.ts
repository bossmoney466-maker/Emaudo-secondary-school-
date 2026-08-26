import { createClient } from '@supabase/supabase-js';

const env = (import.meta as unknown as { env?: Record<string, string> }).env || {};
const supabaseUrl = env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project') &&
  !supabaseAnonKey.includes('your-anon-public-key')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Complete Supabase SQL Schema for Emaudo Secondary School
export const SUPABASE_SQL_SCHEMA = `-- EMAUDO SECONDARY SCHOOL, EKPOMA - SUPABASE DATABASE SCHEMA
-- Generated for full school management, student portal, admissions, and content management.

-- 1. Profiles Table (Authentication / Role-Based Access)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('superadmin', 'admin', 'teacher', 'student', 'parent', 'alumni')),
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Classes Table
CREATE TABLE IF NOT EXISTS public.classes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL, -- e.g. JSS 1A, SS 2 Science A
  level TEXT NOT NULL, -- JSS 1, JSS 2, JSS 3, SS 1, SS 2, SS 3
  arm TEXT NOT NULL, -- A, B, C, Gold, etc.
  category TEXT CHECK (category IN ('Junior', 'Science', 'Arts', 'Commercial', 'General')),
  class_teacher_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  academic_year TEXT NOT NULL DEFAULT '2024/2025',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Subjects Table
CREATE TABLE IF NOT EXISTS public.subjects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL, -- Mathematics, English Language, Physics, Chemistry, Biology, Literature, etc.
  code TEXT UNIQUE NOT NULL, -- MTH, ENG, PHY, CHM, BIO, LIT
  level TEXT NOT NULL, -- Junior, Senior, All
  department TEXT NOT NULL, -- Science, Arts, Humanities, Commercial, General
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Teachers Table
CREATE TABLE IF NOT EXISTS public.teachers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  employee_id TEXT UNIQUE NOT NULL,
  specialization TEXT NOT NULL,
  department TEXT NOT NULL,
  qualifications TEXT,
  employment_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Parents Table
CREATE TABLE IF NOT EXISTS public.parents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  occupation TEXT,
  residential_address TEXT,
  emergency_contact TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Students Table
CREATE TABLE IF NOT EXISTS public.students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  student_id TEXT UNIQUE NOT NULL, -- e.g. ESS/2024/001
  admission_number TEXT UNIQUE NOT NULL,
  class_id UUID REFERENCES public.classes(id) ON DELETE SET NULL,
  parent_id UUID REFERENCES public.parents(id) ON DELETE SET NULL,
  gender TEXT CHECK (gender IN ('Male', 'Female')),
  date_of_birth DATE,
  admission_date DATE DEFAULT CURRENT_DATE,
  track TEXT CHECK (track IN ('Science', 'Arts', 'Commercial', 'Junior')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Results Table
CREATE TABLE IF NOT EXISTS public.results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
  term TEXT NOT NULL CHECK (term IN ('First Term', 'Second Term', 'Third Term')),
  session TEXT NOT NULL, -- e.g. 2024/2025
  ca_score NUMERIC(5,2) DEFAULT 0, -- Continuous Assessment (e.g. max 40)
  exam_score NUMERIC(5,2) DEFAULT 0, -- Examination (e.g. max 60)
  total_score NUMERIC(5,2) GENERATED ALWAYS AS (ca_score + exam_score) STORED,
  grade TEXT, -- A1, B2, B3, C4, C5, C6, D7, E8, F9
  remarks TEXT,
  teacher_id UUID REFERENCES public.teachers(id) ON DELETE SET NULL,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Attendance Table
CREATE TABLE IF NOT EXISTS public.attendance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Present', 'Absent', 'Late', 'Excused')),
  remark TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Assignments Table
CREATE TABLE IF NOT EXISTS public.assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES public.teachers(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  due_date TIMESTAMPTZ NOT NULL,
  max_marks INTEGER DEFAULT 20,
  attachment_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Fees Table
CREATE TABLE IF NOT EXISTS public.fees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  title TEXT NOT NULL, -- e.g. Term Tuition, PTA Levy, Science Lab Fee
  amount NUMERIC(10,2) NOT NULL,
  amount_paid NUMERIC(10,2) DEFAULT 0,
  term TEXT NOT NULL,
  session TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Paid', 'Partial', 'Unpaid')),
  due_date DATE,
  receipt_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Announcements Table
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  content TEXT NOT NULL,
  audience TEXT NOT NULL CHECK (audience IN ('All', 'Students', 'Parents', 'Teachers', 'Public')),
  is_urgent BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Events Table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date DATE NOT NULL,
  start_time TEXT,
  end_time TEXT,
  location TEXT DEFAULT 'Emaudo Secondary School Campus',
  is_sample BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Gallery Table
CREATE TABLE IF NOT EXISTS public.gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  event_date TEXT,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. Admissions Enquiries Table
CREATE TABLE IF NOT EXISTS public.admissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  parent_name TEXT,
  phone TEXT NOT NULL,
  email TEXT,
  class_applying TEXT NOT NULL,
  previous_school TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'assessing', 'accepted', 'enrolled', 'declined')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. Contact Messages Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public Announcements are viewable by everyone" ON public.announcements FOR SELECT USING (true);
CREATE POLICY "Events are viewable by everyone" ON public.events FOR SELECT USING (true);
CREATE POLICY "Gallery is viewable by everyone" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Anyone can submit admission enquiry" ON public.admissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can submit contact message" ON public.contact_messages FOR INSERT WITH CHECK (true);
`;
