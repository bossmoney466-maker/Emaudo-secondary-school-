-- ============================================================================
-- EMAUDO SENIOR SECONDARY SCHOOL, EKPOMA, EDO STATE, NIGERIA
-- PostgreSQL / Supabase Migration: 20260828000000_init_emaudo_school_schema.sql
-- Description: Complete 15-Table Production-Ready Relational Schema with RLS Policies,
--              Foreign Keys, Triggers, Indexes, and Role-Based Access Control.
-- ============================================================================

-- 0. EXTENSIONS & HELPER UTILITIES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Trigger function to automatically maintain updated_at timestamps
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ----------------------------------------------------------------------------
-- 1. PROFILES TABLE (Linked directly to Supabase auth.users)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('superadmin', 'admin', 'teacher', 'student', 'parent', 'alumni')),
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

DROP TRIGGER IF EXISTS trg_profiles_updated_at ON public.profiles;
CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 2. CLASSES TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.classes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL, -- e.g. JSS 1 Gold, SS 2 Science A, SS 3 Arts
  level TEXT NOT NULL, -- JSS 1, JSS 2, JSS 3, SS 1, SS 2, SS 3
  arm TEXT NOT NULL DEFAULT 'Gold', -- Gold, Silver, Diamond, Science A, Arts
  category TEXT NOT NULL DEFAULT 'General' CHECK (category IN ('Junior', 'Science', 'Arts', 'Commercial', 'General')),
  class_teacher_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  academic_year TEXT NOT NULL DEFAULT '2024/2025',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_classes_level ON public.classes(level);
CREATE INDEX IF NOT EXISTS idx_classes_teacher ON public.classes(class_teacher_id);

DROP TRIGGER IF EXISTS trg_classes_updated_at ON public.classes;
CREATE TRIGGER trg_classes_updated_at
  BEFORE UPDATE ON public.classes
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 3. SUBJECTS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.subjects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL, -- MTH, ENG, PHY, CHM, BIO, LIT, GOV, ACC, ECO, BST
  name TEXT NOT NULL,
  level TEXT NOT NULL DEFAULT 'All' CHECK (level IN ('Junior', 'Senior', 'All')),
  department TEXT NOT NULL DEFAULT 'General' CHECK (department IN ('Science', 'Arts', 'Commercial', 'General')),
  is_core BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subjects_code ON public.subjects(code);
CREATE INDEX IF NOT EXISTS idx_subjects_department ON public.subjects(department);

DROP TRIGGER IF EXISTS trg_subjects_updated_at ON public.subjects;
CREATE TRIGGER trg_subjects_updated_at
  BEFORE UPDATE ON public.subjects
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 4. TEACHERS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.teachers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  employee_id TEXT UNIQUE NOT NULL, -- e.g. ESS/STAFF/012
  specialization TEXT NOT NULL,
  department TEXT NOT NULL,
  qualifications TEXT,
  employment_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_teachers_profile ON public.teachers(profile_id);
CREATE INDEX IF NOT EXISTS idx_teachers_employee_id ON public.teachers(employee_id);

DROP TRIGGER IF EXISTS trg_teachers_updated_at ON public.teachers;
CREATE TRIGGER trg_teachers_updated_at
  BEFORE UPDATE ON public.teachers
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 5. PARENTS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.parents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  occupation TEXT,
  residential_address TEXT,
  emergency_contact TEXT,
  relationship_type TEXT DEFAULT 'Guardian' CHECK (relationship_type IN ('Father', 'Mother', 'Guardian', 'Other')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_parents_profile ON public.parents(profile_id);

DROP TRIGGER IF EXISTS trg_parents_updated_at ON public.parents;
CREATE TRIGGER trg_parents_updated_at
  BEFORE UPDATE ON public.parents
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 6. STUDENTS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  student_id TEXT UNIQUE NOT NULL, -- e.g. ESS/2024/0142
  admission_number TEXT UNIQUE NOT NULL,
  class_id UUID REFERENCES public.classes(id) ON DELETE SET NULL,
  parent_id UUID REFERENCES public.parents(id) ON DELETE SET NULL,
  gender TEXT CHECK (gender IN ('Male', 'Female')),
  date_of_birth DATE,
  admission_date DATE DEFAULT CURRENT_DATE,
  track TEXT DEFAULT 'General' CHECK (track IN ('Science', 'Arts', 'Commercial', 'Junior', 'General')),
  status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Graduated', 'Transferred', 'Suspended')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_students_student_id ON public.students(student_id);
CREATE INDEX IF NOT EXISTS idx_students_class ON public.students(class_id);
CREATE INDEX IF NOT EXISTS idx_students_parent ON public.students(parent_id);

DROP TRIGGER IF EXISTS trg_students_updated_at ON public.students;
CREATE TRIGGER trg_students_updated_at
  BEFORE UPDATE ON public.students
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 7. RESULTS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE NOT NULL,
  term TEXT NOT NULL CHECK (term IN ('First Term', 'Second Term', 'Third Term')),
  session TEXT NOT NULL DEFAULT '2024/2025',
  ca_score NUMERIC(5,2) NOT NULL DEFAULT 0 CHECK (ca_score >= 0 AND ca_score <= 40),
  exam_score NUMERIC(5,2) NOT NULL DEFAULT 0 CHECK (exam_score >= 0 AND exam_score <= 60),
  total_score NUMERIC(5,2) GENERATED ALWAYS AS (ca_score + exam_score) STORED,
  grade TEXT, -- A1 (75+), B2 (70-74), B3 (65-69), C4 (60-64), C5 (55-59), C6 (50-54), D7 (45-49), E8 (40-44), F9 (0-39)
  remarks TEXT,
  teacher_id UUID REFERENCES public.teachers(id) ON DELETE SET NULL,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (student_id, subject_id, term, session)
);

CREATE INDEX IF NOT EXISTS idx_results_student ON public.results(student_id);
CREATE INDEX IF NOT EXISTS idx_results_term_session ON public.results(term, session);

DROP TRIGGER IF EXISTS trg_results_updated_at ON public.results;
CREATE TRIGGER trg_results_updated_at
  BEFORE UPDATE ON public.results
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 8. ATTENDANCE TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.attendance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE NOT NULL,
  recorded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL CHECK (status IN ('Present', 'Absent', 'Late', 'Excused')),
  remark TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (student_id, date)
);

CREATE INDEX IF NOT EXISTS idx_attendance_student ON public.attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON public.attendance(date);
CREATE INDEX IF NOT EXISTS idx_attendance_class ON public.attendance(class_id);

DROP TRIGGER IF EXISTS trg_attendance_updated_at ON public.attendance;
CREATE TRIGGER trg_attendance_updated_at
  BEFORE UPDATE ON public.attendance
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 9. ASSIGNMENTS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE NOT NULL,
  subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE NOT NULL,
  teacher_id UUID REFERENCES public.teachers(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  due_date TIMESTAMPTZ NOT NULL,
  max_marks INTEGER NOT NULL DEFAULT 20 CHECK (max_marks > 0),
  attachment_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_assignments_class ON public.assignments(class_id);
CREATE INDEX IF NOT EXISTS idx_assignments_subject ON public.assignments(subject_id);

DROP TRIGGER IF EXISTS trg_assignments_updated_at ON public.assignments;
CREATE TRIGGER trg_assignments_updated_at
  BEFORE UPDATE ON public.assignments
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 10. FEES TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.fees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL, -- e.g. 1st Term Tuition, PTA Levy, Science Lab Fee
  amount NUMERIC(10,2) NOT NULL CHECK (amount >= 0),
  amount_paid NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (amount_paid >= 0),
  term TEXT NOT NULL,
  session TEXT NOT NULL DEFAULT '2024/2025',
  status TEXT NOT NULL CHECK (status IN ('Paid', 'Partial', 'Unpaid', 'Overdue')),
  due_date DATE,
  receipt_number TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_fees_student ON public.fees(student_id);
CREATE INDEX IF NOT EXISTS idx_fees_status ON public.fees(status);

DROP TRIGGER IF EXISTS trg_fees_updated_at ON public.fees;
CREATE TRIGGER trg_fees_updated_at
  BEFORE UPDATE ON public.fees
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 11. ANNOUNCEMENTS (NEWS) TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  summary TEXT,
  content TEXT NOT NULL,
  audience TEXT NOT NULL DEFAULT 'All' CHECK (audience IN ('All', 'Students', 'Parents', 'Teachers', 'Public')),
  is_urgent BOOLEAN NOT NULL DEFAULT FALSE,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_announcements_published ON public.announcements(is_published, published_at DESC);

DROP TRIGGER IF EXISTS trg_announcements_updated_at ON public.announcements;
CREATE TRIGGER trg_announcements_updated_at
  BEFORE UPDATE ON public.announcements
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 12. EVENTS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date DATE NOT NULL,
  start_time TEXT,
  end_time TEXT,
  location TEXT NOT NULL DEFAULT 'Emaudo Secondary School Campus, Ekpoma',
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(event_date ASC);

DROP TRIGGER IF EXISTS trg_events_updated_at ON public.events;
CREATE TRIGGER trg_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 13. GALLERY TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  placeholder_label TEXT,
  event_date TEXT,
  source TEXT,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gallery_published ON public.gallery(is_published);

DROP TRIGGER IF EXISTS trg_gallery_updated_at ON public.gallery;
CREATE TRIGGER trg_gallery_updated_at
  BEFORE UPDATE ON public.gallery
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 14. ADMISSIONS TABLE
-- ----------------------------------------------------------------------------
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
  reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admissions_status ON public.admissions(status);

DROP TRIGGER IF EXISTS trg_admissions_updated_at ON public.admissions;
CREATE TRIGGER trg_admissions_updated_at
  BEFORE UPDATE ON public.admissions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 15. CONTACT_MESSAGES TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
  replied_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  replied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON public.contact_messages(status);

DROP TRIGGER IF EXISTS trg_contact_messages_updated_at ON public.contact_messages;
CREATE TRIGGER trg_contact_messages_updated_at
  BEFORE UPDATE ON public.contact_messages
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 16. DEPARTMENTS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.departments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  department_name TEXT UNIQUE NOT NULL,
  description TEXT,
  head_of_department TEXT,
  tagline TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_departments_name ON public.departments(department_name);

DROP TRIGGER IF EXISTS trg_departments_updated_at ON public.departments;
CREATE TRIGGER trg_departments_updated_at
  BEFORE UPDATE ON public.departments
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 17. CLUBS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.clubs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  club_name TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  coordinator TEXT,
  category TEXT DEFAULT 'Academic' CHECK (category IN ('Academic', 'Arts', 'Civic', 'Sports', 'Leadership')),
  meeting_day TEXT,
  meeting_time TEXT,
  venue TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_clubs_category ON public.clubs(category);

DROP TRIGGER IF EXISTS trg_clubs_updated_at ON public.clubs;
CREATE TRIGGER trg_clubs_updated_at
  BEFORE UPDATE ON public.clubs
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 18. ACTIVITIES TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_name TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE,
  category TEXT NOT NULL DEFAULT 'General',
  target_audience TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activities_date ON public.activities(date);

DROP TRIGGER IF EXISTS trg_activities_updated_at ON public.activities;
CREATE TRIGGER trg_activities_updated_at
  BEFORE UPDATE ON public.activities
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 19. TIMETABLE TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.timetable (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  class_name TEXT NOT NULL,
  subject_id UUID REFERENCES public.subjects(id) ON DELETE SET NULL,
  subject_name TEXT NOT NULL,
  teacher_id UUID REFERENCES public.teachers(id) ON DELETE SET NULL,
  teacher_name TEXT,
  day TEXT NOT NULL CHECK (day IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday')),
  period_number INTEGER CHECK (period_number BETWEEN 1 AND 10),
  time TEXT NOT NULL,
  room TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_timetable_class ON public.timetable(class_name, day);

DROP TRIGGER IF EXISTS trg_timetable_updated_at ON public.timetable;
CREATE TRIGGER trg_timetable_updated_at
  BEFORE UPDATE ON public.timetable
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();



-- ============================================================================
-- AUTOMATIC PROFILE CREATION TRIGGER ON AUTH.SIGNUP
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, phone)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'School User'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student'),
    NEW.raw_user_meta_data->>'phone'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name),
    role = COALESCE(EXCLUDED.role, public.profiles.role),
    phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ============================================================================
-- ROW LEVEL SECURITY (RLS) ACTIVATION & POLICIES
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timetable ENABLE ROW LEVEL SECURITY;

-- Helper security function: Check if current authenticated user is an administrator
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper security function: Check if current user is a teacher
CREATE OR REPLACE FUNCTION public.is_teacher()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'teacher'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ----------------------------------------------------------------------------
-- POLICIES: 1. PROFILES
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can update any profile" ON public.profiles;
CREATE POLICY "Admins can update any profile" ON public.profiles
  FOR ALL USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- POLICIES: 2. PUBLIC/AUTHENTICATED VIEW DATA (Classes, Subjects, Announcements, Events, Gallery)
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Classes viewable by everyone" ON public.classes;
CREATE POLICY "Classes viewable by everyone" ON public.classes
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Subjects viewable by everyone" ON public.subjects;
CREATE POLICY "Subjects viewable by everyone" ON public.subjects
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Published Announcements are viewable by everyone" ON public.announcements;
CREATE POLICY "Published Announcements are viewable by everyone" ON public.announcements
  FOR SELECT USING (is_published = true OR public.is_admin());

DROP POLICY IF EXISTS "Events are viewable by everyone" ON public.events;
CREATE POLICY "Events are viewable by everyone" ON public.events
  FOR SELECT USING (is_published = true OR public.is_admin());

DROP POLICY IF EXISTS "Gallery is viewable by everyone" ON public.gallery;
CREATE POLICY "Gallery is viewable by everyone" ON public.gallery
  FOR SELECT USING (is_published = true OR public.is_admin());

DROP POLICY IF EXISTS "Departments viewable by everyone" ON public.departments;
CREATE POLICY "Departments viewable by everyone" ON public.departments
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Clubs viewable by everyone" ON public.clubs;
CREATE POLICY "Clubs viewable by everyone" ON public.clubs
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Activities viewable by everyone" ON public.activities;
CREATE POLICY "Activities viewable by everyone" ON public.activities
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Timetable viewable by everyone" ON public.timetable;
CREATE POLICY "Timetable viewable by everyone" ON public.timetable
  FOR SELECT USING (true);

-- ----------------------------------------------------------------------------
-- POLICIES: 3. PUBLIC FORM INSERTS (Admissions, Contact Messages)
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Anyone can submit admission enquiry" ON public.admissions;
CREATE POLICY "Anyone can submit admission enquiry" ON public.admissions
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can submit contact message" ON public.contact_messages;
CREATE POLICY "Anyone can submit contact message" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

-- ----------------------------------------------------------------------------
-- POLICIES: 4. STUDENTS, PARENTS & ACADEMIC DATA ACCESS
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Students and Parents view student profile" ON public.students;
CREATE POLICY "Students and Parents view student profile" ON public.students
  FOR SELECT USING (
    profile_id = auth.uid() OR
    parent_id IN (SELECT id FROM public.parents WHERE profile_id = auth.uid()) OR
    public.is_teacher() OR
    public.is_admin()
  );

DROP POLICY IF EXISTS "Teachers and Admins view teachers profile" ON public.teachers;
CREATE POLICY "Teachers and Admins view teachers profile" ON public.teachers
  FOR SELECT USING (
    profile_id = auth.uid() OR
    public.is_admin() OR
    true -- Directory viewable for staff identification
  );

DROP POLICY IF EXISTS "Parents view own parent record" ON public.parents;
CREATE POLICY "Parents view own parent record" ON public.parents
  FOR SELECT USING (
    profile_id = auth.uid() OR
    public.is_admin()
  );

DROP POLICY IF EXISTS "Authorized users view results" ON public.results;
CREATE POLICY "Authorized users view results" ON public.results
  FOR SELECT USING (
    (published = true AND student_id IN (SELECT id FROM public.students WHERE profile_id = auth.uid())) OR
    (published = true AND student_id IN (SELECT s.id FROM public.students s JOIN public.parents p ON s.parent_id = p.id WHERE p.profile_id = auth.uid())) OR
    public.is_teacher() OR
    public.is_admin()
  );

DROP POLICY IF EXISTS "Teachers can record and edit results" ON public.results;
CREATE POLICY "Teachers can record and edit results" ON public.results
  FOR ALL USING (public.is_teacher() OR public.is_admin());

DROP POLICY IF EXISTS "Authorized users view attendance" ON public.attendance;
CREATE POLICY "Authorized users view attendance" ON public.attendance
  FOR SELECT USING (
    student_id IN (SELECT id FROM public.students WHERE profile_id = auth.uid()) OR
    student_id IN (SELECT s.id FROM public.students s JOIN public.parents p ON s.parent_id = p.id WHERE p.profile_id = auth.uid()) OR
    public.is_teacher() OR
    public.is_admin()
  );

DROP POLICY IF EXISTS "Teachers can mark attendance" ON public.attendance;
CREATE POLICY "Teachers can mark attendance" ON public.attendance
  FOR ALL USING (public.is_teacher() OR public.is_admin());

DROP POLICY IF EXISTS "Students view assignments for their class" ON public.assignments;
CREATE POLICY "Students view assignments for their class" ON public.assignments
  FOR SELECT USING (
    class_id IN (SELECT class_id FROM public.students WHERE profile_id = auth.uid()) OR
    public.is_teacher() OR
    public.is_admin()
  );

DROP POLICY IF EXISTS "Teachers can create and manage assignments" ON public.assignments;
CREATE POLICY "Teachers can create and manage assignments" ON public.assignments
  FOR ALL USING (public.is_teacher() OR public.is_admin());

DROP POLICY IF EXISTS "Students and Parents view fees" ON public.fees;
CREATE POLICY "Students and Parents view fees" ON public.fees
  FOR SELECT USING (
    student_id IN (SELECT id FROM public.students WHERE profile_id = auth.uid()) OR
    student_id IN (SELECT s.id FROM public.students s JOIN public.parents p ON s.parent_id = p.id WHERE p.profile_id = auth.uid()) OR
    public.is_admin()
  );

-- ----------------------------------------------------------------------------
-- POLICIES: 5. ADMIN ALL-PERMISSIONS POLICIES
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Admins full access to classes" ON public.classes;
CREATE POLICY "Admins full access to classes" ON public.classes FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admins full access to subjects" ON public.subjects;
CREATE POLICY "Admins full access to subjects" ON public.subjects FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admins full access to teachers" ON public.teachers;
CREATE POLICY "Admins full access to teachers" ON public.teachers FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admins full access to parents" ON public.parents;
CREATE POLICY "Admins full access to parents" ON public.parents FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admins full access to students" ON public.students;
CREATE POLICY "Admins full access to students" ON public.students FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admins full access to fees" ON public.fees;
CREATE POLICY "Admins full access to fees" ON public.fees FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admins full access to announcements" ON public.announcements;
CREATE POLICY "Admins full access to announcements" ON public.announcements FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admins full access to events" ON public.events;
CREATE POLICY "Admins full access to events" ON public.events FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admins full access to gallery" ON public.gallery;
CREATE POLICY "Admins full access to gallery" ON public.gallery FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admins full access to admissions" ON public.admissions;
CREATE POLICY "Admins full access to admissions" ON public.admissions FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admins full access to contact messages" ON public.contact_messages;
CREATE POLICY "Admins full access to contact messages" ON public.contact_messages FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admins full access to departments" ON public.departments;
CREATE POLICY "Admins full access to departments" ON public.departments FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admins full access to clubs" ON public.clubs;
CREATE POLICY "Admins full access to clubs" ON public.clubs FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admins full access to activities" ON public.activities;
CREATE POLICY "Admins full access to activities" ON public.activities FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admins full access to timetable" ON public.timetable;
CREATE POLICY "Admins full access to timetable" ON public.timetable FOR ALL USING (public.is_admin());

-- ============================================================================
-- INITIAL SEED DATA FOR EMAUDO SENIOR SECONDARY SCHOOL, EKPOMA
-- ============================================================================
INSERT INTO public.departments (department_name, head_of_department, tagline, description) VALUES
  ('Mathematics', 'Mr. A. Momodu (B.Sc. Ed. Mathematics)', 'Fostering analytical logic, quantitative mastery, and competitive problem solving.', 'Delivers rigorous instruction in algebra, geometry, trigonometry, statistics, and competition drills.'),
  ('English Language & Literary Studies', 'Mrs. B. Okojie (B.A. Ed. English Literature)', 'Cultivating articulate expression, critical reading, and powerful public speaking.', 'Covers grammar, essay writing, African & world literature, reading comprehension, debate, and diction.'),
  ('Science', 'Mr. C. Ebosele (B.Sc. Industrial Chemistry, PGDE)', 'Hands-on scientific inquiry powered by the ultra-modern Chevron laboratory complex.', 'Offers comprehensive laboratory practicals in Physics, Chemistry, Biology, and Agricultural Science.'),
  ('Social Sciences & Humanities', 'Mrs. F. Ighodalo (M.Ed. Social Studies)', 'Understanding civic duty, socioeconomic systems, governance, and history.', 'Focuses on Government, Economics, Geography, Civic Education, and Nigerian/Esan heritage.'),
  ('Commercial & Business Studies', 'Mr. O. Imhansi (B.Sc. Accounting, ACA)', 'Instilling entrepreneurial acumen, financial literacy, and commerce skills.', 'Equips students with Financial Accounting, Commerce, Business Studies, and Bookkeeping.'),
  ('Technology & Digital Skills', 'Engr. S. Osas (B.Eng. Computer Engineering)', 'Mastering modern computer literacy, coding fundamentals, and CBT exam preparation.', 'Covers Computer Studies, Data Processing, ICT practicals, and Basic Technology.')
ON CONFLICT (department_name) DO NOTHING;

INSERT INTO public.clubs (club_name, coordinator, category, meeting_day, meeting_time, venue, description) VALUES
  ('Debate & Literary Club', 'Mrs. B. Okojie', 'Academic', 'Wednesdays', '2:15 PM – 3:30 PM', 'School Auditorium', 'Sharpens critical thinking, persuasive argumentation, elocution, and stage confidence.'),
  ('Young Scientists & JETS Club', 'Mr. C. Ebosele', 'Academic', 'Thursdays', '2:15 PM – 3:30 PM', 'Chevron Science Laboratory Complex', 'Hands-on experiments, robotics prototypes, renewable energy, and science exhibitions.'),
  ('Mathematics & Chess Club', 'Mr. A. Momodu', 'Academic', 'Tuesdays', '2:15 PM – 3:30 PM', 'Mathematics Lab / Room 104', 'Mental math speed drills, Rubik’s cube mastery, and strategic chess tournaments.'),
  ('Press & Media Club', 'Mr. P. Akhimien', 'Civic', 'Mondays & Fridays', '2:15 PM – 3:15 PM', 'Media Studio / Room 202', 'Produces weekly school wall bulletin, assembly morning news, and term magazine.'),
  ('Cultural & Heritage Troupe', 'Mrs. F. Ighodalo', 'Arts', 'Thursdays', '2:15 PM – 3:30 PM', 'School Amphitheatre', 'Traditional Esan dance, folk music, drama, and cultural costumes.'),
  ('Sports & Athletics Society', 'Coach E. Friday', 'Sports', 'Tuesdays & Fridays', '3:00 PM – 4:30 PM', 'Emaudo Sports Grounds', 'Inter-house football, track and field, table tennis, and physical conditioning.'),
  ('Prefects Council & Student Leadership', 'Vice Principal (Admin)', 'Leadership', 'Alternate Mondays', '1:45 PM – 2:30 PM', 'Administrative Conference Room', 'Elected student leadership upholding discipline, student welfare, and school values.')
ON CONFLICT (club_name) DO NOTHING;

INSERT INTO public.activities (activity_name, category, target_audience, description, date) VALUES
  ('WAEC / WASSCE & NECO SSCE Preparation', 'WAEC/NECO Prep', 'SSS 3 Students', 'Intensive after-school coaching, mock laboratory sessions, and 10-year past questions analysis.', CURRENT_DATE + INTERVAL '7 days'),
  ('Continuous Assessment (CA) Mid-Term Test', 'Continuous Assessment', 'JSS 1 – SSS 3', 'Structured bi-weekly class tests and mid-term assessments accounting for 40% termly score.', CURRENT_DATE + INTERVAL '21 days'),
  ('Remedial Tutorials & Extension Classes', 'Tutorials', 'Identified Students', 'Targeted small-group remedial classes in Mathematics, English, Physics, and Chemistry.', CURRENT_DATE + INTERVAL '2 days'),
  ('Inter-House Academic Quiz Competition', 'Competitions', 'All Students', 'Annual quiz competition among Green, Blue, Red, and Yellow Houses.', CURRENT_DATE + INTERVAL '40 days')
ON CONFLICT DO NOTHING;

INSERT INTO public.subjects (code, name, level, department, is_core) VALUES
  ('MTH', 'Mathematics', 'All', 'General', true),
  ('ENG', 'English Language', 'All', 'General', true),
  ('PHY', 'Physics', 'Senior', 'Science', false),
  ('CHM', 'Chemistry', 'Senior', 'Science', false),
  ('BIO', 'Biology', 'Senior', 'Science', false),
  ('LIT', 'Literature in English', 'Senior', 'Arts', false),
  ('GOV', 'Government', 'Senior', 'Arts', false),
  ('ECO', 'Economics', 'Senior', 'Commercial', false),
  ('ACC', 'Financial Accounting', 'Senior', 'Commercial', false),
  ('BST', 'Basic Science & Technology', 'Junior', 'General', true),
  ('AGR', 'Agricultural Science', 'All', 'General', false),
  ('CIV', 'Civic Education', 'All', 'General', true),
  ('ICT', 'Computer Studies / ICT', 'All', 'General', true)
ON CONFLICT (code) DO NOTHING;


INSERT INTO public.classes (name, level, arm, category, academic_year) VALUES
  ('JSS 1 Gold', 'JSS 1', 'Gold', 'Junior', '2024/2025'),
  ('JSS 2 Silver', 'JSS 2', 'Silver', 'Junior', '2024/2025'),
  ('JSS 3 Diamond', 'JSS 3', 'Diamond', 'Junior', '2024/2025'),
  ('SS 1 Science', 'SS 1', 'Science', 'Science', '2024/2025'),
  ('SS 2 Science A', 'SS 2', 'Science A', 'Science', '2024/2025'),
  ('SS 2 Arts', 'SS 2', 'Arts', 'Arts', '2024/2025'),
  ('SS 3 Science Gold', 'SS 3', 'Gold', 'Science', '2024/2025'),
  ('SS 3 Arts & Commercial', 'SS 3', 'Arts & Commercial', 'Arts', '2024/2025')
ON CONFLICT DO NOTHING;

INSERT INTO public.announcements (title, category, summary, content, audience, is_urgent, is_published) VALUES
  ('2024/2025 Academic Session Resumption Notice', 'Academic', 'All students and parents are reminded of the resumption guidelines for the 2024/2025 academic calendar.', 'Students are to report in full standard school uniform on opening day with completed holiday assignments. Assembly starts promptly at 7:45 AM.', 'All', false, true),
  ('Chevron-Supported Science Laboratory Practical Workshops', 'Sciences', 'Senior secondary science students scheduled for chemistry and physics laboratory practical sessions.', 'Practical sessions in the modernized Science Laboratory Complex will commence for SS 2 and SS 3 classes under senior faculty supervision.', 'Students', false, true),
  ('ESSOSA Annual Alumni Homecoming & Mentorship Day', 'Alumni', 'Emaudo Secondary School Old Students Association announces annual gathering and student scholarship fund.', 'The global alumni body welcomes all sets from 1985 onward to celebrate institutional heritage and mentor senior students.', 'All', false, true)
ON CONFLICT DO NOTHING;

INSERT INTO public.events (title, category, description, event_date, start_time, end_time, location, is_published) VALUES
  ('First Term Resumption Assembly', 'Academic', 'General orientation, assembly address by school management, and distribution of class timetables.', CURRENT_DATE + INTERVAL '14 days', '08:00 AM', '10:30 AM', 'School Assembly Ground', true),
  ('Inter-House Science & Quiz Competition', 'Competition', 'Annual academic exhibition and quiz across Junior and Senior secondary divisions.', CURRENT_DATE + INTERVAL '35 days', '09:00 AM', '02:00 PM', 'Emaudo School Hall', true),
  ('PTA General Meeting & Progress Review', 'PTA', 'Termly Parent-Teacher Association meeting to discuss academic progress, facility maintenance, and student welfare.', CURRENT_DATE + INTERVAL '45 days', '10:00 AM', '01:00 PM', 'School Multi-Purpose Hall', true)
ON CONFLICT DO NOTHING;
