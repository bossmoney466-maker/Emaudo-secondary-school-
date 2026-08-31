# Emaudo Secondary School — Digital Portal & Management Platform

An institutional web platform and student information system for **Emaudo Secondary School, Ekpoma, Edo State, Nigeria** (Founded 1980; Motto: *Knowledge is Light*).

The platform features:
- Complete school presentation (History, Academic Programs, Chevron 2017 Ultra-Modern Science Laboratory Complex, Leadership, Admissions, Contact).
- Interactive **Student & Parent Portal** (Results, Continuous Assessments, Attendance, Timetable, Assignments, School Fees).
- **Administrative Management Console** for admissions review, contact messages inbox, news announcements, event calendar, and student records.
- **Supabase Backend Integration** featuring 15 normalized relational tables with Row Level Security (RLS) policies and role-based authentication.

---

## 🚀 Supabase Setup Guide

### 1. Database Schema & Migration
1. Go to your [Supabase Dashboard](https://app.supabase.com/) and select your **Emaudo Secondary School** project.
2. In the left navigation, click on **SQL Editor** (`>_`).
3. Click **New Query**, paste the complete SQL script from `src/lib/supabase.ts` (or copy it directly from the **Admin Dashboard > Supabase SQL Blueprint** tab in the web application).
4. Click **Run** to provision all 15 relational tables, triggers, indexes, and RLS policies:
   - `profiles` (User profile linked to Supabase Auth `auth.users`)
   - `students` (Student registration, class, and guardian records)
   - `parents` (Parent details and student links)
   - `teachers` (Staff qualifications and departments)
   - `classes` (JSS 1 to SS 3 class arms)
   - `subjects` (Academic curriculum & science lab tracks)
   - `results` (Term exam & CA scores, grades, remarks)
   - `attendance` (Daily roll call records & excused absences)
   - `assignments` (Homework, lab practical tasks, deadlines)
   - `fees` (Term fee schedules, invoices, and payments)
   - `announcements` (Circulars, science lab updates, bulletins)
   - `events` (Academic calendar, sports, PTA meetings)
   - `gallery` (Campus photos, laboratory archives, milestones)
   - `admissions` (Prospective candidate applications)
   - `contact_messages` (Public enquiries and contact inquiries)

### 2. Environment Variables Configuration
Copy `.env.example` to `.env` or set the following environment variables in your hosting environment:

```env
# Client-Side (Vite) Variables — Supabase Anon Public Access
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...your_anon_public_key

# Server-Side Only Variable — Supabase Service Role Key
# (Never expose this key in client-side code or browser bundles)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...your_service_role_secret_key
```

Where to find your Supabase credentials:
1. In your Supabase project dashboard, navigate to **Project Settings** > **API**.
2. Copy the **Project URL** into `VITE_SUPABASE_URL`.
3. Copy the **anon / public** key into `VITE_SUPABASE_ANON_KEY`.
4. Copy the **service_role** secret key into `SUPABASE_SERVICE_ROLE_KEY` (used solely in `server.ts` on the Express backend).

---

## 🔒 Authentication & Role-Based Access Control (RBAC)

The application supports Supabase Authentication for four primary roles:
- **Students**: View their registered profile, report cards, attendance rates, assignments, and tuition fee status.
- **Parents**: Access their wards' termly progress, attendance logs, and school fee receipts.
- **Teachers**: Manage continuous assessment (CA 40%) and examination (60%) scores for their assigned classes.
- **Administrators**: Full access to the Management Console to review admission applications, process incoming contact inquiries, broadcast announcements, and update the event calendar.

### Offline & Demo Fallback
If Supabase environment variables are not yet configured or external services are temporarily unavailable, the application provides safe demo sessions and local fallback data so the entire user interface and preview load seamlessly.

---

## 🛠️ Development & Production Build

### Development
```bash
npm run dev
```
Starts the server at `http://0.0.0.0:3000`.

### Production Build & Launch
```bash
npm run build
npm start
```
Compiles the React frontend using Vite and bundles `server.ts` with esbuild for containerized deployment.
