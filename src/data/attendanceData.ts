import { AttendanceStatus, AttendanceRecordItem, StudentAttendanceSummary } from '../types';

export interface ClassRosterItem {
  id: string;
  studentId: string;
  admissionNumber: string;
  name: string;
  gender: 'Male' | 'Female';
  className: string;
  arm: string;
  guardianName: string;
  guardianPhone: string;
  historicalAttendanceRate: number;
}

export interface ClassMetadata {
  id: string;
  name: string;
  level: string;
  arm: string;
  category: 'Junior' | 'Science' | 'Arts' | 'Commercial' | 'General';
  classTeacherName: string;
  classTeacherEmail: string;
  totalStudents: number;
}

export const SCHOOL_CLASSES: ClassMetadata[] = [
  { id: 'cls-jss1-gold', name: 'JSS 1 Gold', level: 'JSS 1', arm: 'Gold', category: 'Junior', classTeacherName: 'Mrs. C. Omofonmwan', classTeacherEmail: 'c.omofonmwan@emaudo.edu.ng', totalStudents: 42 },
  { id: 'cls-jss1-silver', name: 'JSS 1 Silver', level: 'JSS 1', arm: 'Silver', category: 'Junior', classTeacherName: 'Mr. E. Izevbigie', classTeacherEmail: 'e.izevbigie@emaudo.edu.ng', totalStudents: 40 },
  { id: 'cls-jss2-a', name: 'JSS 2 A', level: 'JSS 2', arm: 'A', category: 'Junior', classTeacherName: 'Mr. F. Akhere', classTeacherEmail: 'f.akhere@emaudo.edu.ng', totalStudents: 44 },
  { id: 'cls-jss2-b', name: 'JSS 2 B', level: 'JSS 2', arm: 'B', category: 'Junior', classTeacherName: 'Mrs. B. Agbonlahor', classTeacherEmail: 'b.agbonlahor@emaudo.edu.ng', totalStudents: 39 },
  { id: 'cls-jss3-diamond', name: 'JSS 3 Diamond', level: 'JSS 3', arm: 'Diamond', category: 'Junior', classTeacherName: 'Mr. O. Eromosele', classTeacherEmail: 'o.eromosele@emaudo.edu.ng', totalStudents: 46 },
  { id: 'cls-ss1-sci', name: 'SS 1 Science', level: 'SS 1', arm: 'Science', category: 'Science', classTeacherName: 'Dr. I. Okoduwa', classTeacherEmail: 'i.okoduwa@emaudo.edu.ng', totalStudents: 38 },
  { id: 'cls-ss1-art', name: 'SS 1 Arts & Commercial', level: 'SS 1', arm: 'Arts & Commercial', category: 'Arts', classTeacherName: 'Mrs. R. Igbinoba', classTeacherEmail: 'r.igbinoba@emaudo.edu.ng', totalStudents: 35 },
  { id: 'cls-ss2-scia', name: 'SS 2 Science A', level: 'SS 2', arm: 'Science A', category: 'Science', classTeacherName: 'Mr. A. Momodu', classTeacherEmail: 'a.momodu@emaudo.edu.ng', totalStudents: 38 },
  { id: 'cls-ss2-scib', name: 'SS 2 Science B', level: 'SS 2', arm: 'Science B', category: 'Science', classTeacherName: 'Mr. K. Omo-Bare', classTeacherEmail: 'k.omobare@emaudo.edu.ng', totalStudents: 36 },
  { id: 'cls-ss2-art', name: 'SS 2 Arts', level: 'SS 2', arm: 'Arts', category: 'Arts', classTeacherName: 'Mrs. E. Okojie', classTeacherEmail: 'e.okojie@emaudo.edu.ng', totalStudents: 34 },
  { id: 'cls-ss3-gold', name: 'SS 3 Science Gold', level: 'SS 3', arm: 'Gold', category: 'Science', classTeacherName: 'Mr. P. Aikhorin', classTeacherEmail: 'p.aikhorin@emaudo.edu.ng', totalStudents: 41 },
  { id: 'cls-ss3-art', name: 'SS 3 Arts & Commercial', level: 'SS 3', arm: 'Arts & Commercial', category: 'Commercial', classTeacherName: 'Mrs. G. Ekhator', classTeacherEmail: 'g.ekhator@emaudo.edu.ng', totalStudents: 37 },
];

export const SCHOOL_SUBJECTS_REGISTER = [
  'General Morning Roll Call',
  'Mathematics',
  'English Language',
  'Physics',
  'Chemistry',
  'Biology',
  'Agricultural Science',
  'Civic Education',
  'Economics',
  'Government',
  'Literature in English',
  'Financial Accounting',
  'Basic Science & Technology',
  'Computer Studies',
];

export const ALL_STUDENTS_ROSTER: Record<string, ClassRosterItem[]> = {
  'SS 2 Science A': [
    { id: 'std-101', studentId: 'ESS/2024/0142', admissionNumber: 'ESS/2024/0142', name: 'Osahon Emmanuel Okojie', gender: 'Male', className: 'SS 2 Science A', arm: 'Science A', guardianName: 'Mr. Patrick Okojie', guardianPhone: '08034567891', historicalAttendanceRate: 96.5 },
    { id: 'std-102', studentId: 'ESS/2024/0143', admissionNumber: 'ESS/2024/0143', name: 'Amina Fatima Bello', gender: 'Female', className: 'SS 2 Science A', arm: 'Science A', guardianName: 'Alhaji Bello', guardianPhone: '08023456789', historicalAttendanceRate: 98.0 },
    { id: 'std-103', studentId: 'ESS/2024/0144', admissionNumber: 'ESS/2024/0144', name: 'Chukwudi Victor Okonkwo', gender: 'Male', className: 'SS 2 Science A', arm: 'Science A', guardianName: 'Chief Okonkwo', guardianPhone: '08134567890', historicalAttendanceRate: 91.5 },
    { id: 'std-104', studentId: 'ESS/2024/0145', admissionNumber: 'ESS/2024/0145', name: 'Eseosa Miracle Agbonlahor', gender: 'Female', className: 'SS 2 Science A', arm: 'Science A', guardianName: 'Mrs. Agbonlahor', guardianPhone: '07045678901', historicalAttendanceRate: 94.0 },
    { id: 'std-105', studentId: 'ESS/2024/0146', admissionNumber: 'ESS/2024/0146', name: 'Favour Oghogho Idahosa', gender: 'Female', className: 'SS 2 Science A', arm: 'Science A', guardianName: 'Dr. Idahosa', guardianPhone: '08056789012', historicalAttendanceRate: 88.5 },
    { id: 'std-106', studentId: 'ESS/2024/0147', admissionNumber: 'ESS/2024/0147', name: 'Godwin Itua Akhigbe', gender: 'Male', className: 'SS 2 Science A', arm: 'Science A', guardianName: 'Mr. Akhigbe', guardianPhone: '08167890123', historicalAttendanceRate: 95.0 },
    { id: 'std-107', studentId: 'ESS/2024/0148', admissionNumber: 'ESS/2024/0148', name: 'Helen Ifueko Osunde', gender: 'Female', className: 'SS 2 Science A', arm: 'Science A', guardianName: 'Mrs. Osunde', guardianPhone: '07078901234', historicalAttendanceRate: 64.0 },
    { id: 'std-108', studentId: 'ESS/2024/0149', admissionNumber: 'ESS/2024/0149', name: 'Israel Osariemen Enoma', gender: 'Male', className: 'SS 2 Science A', arm: 'Science A', guardianName: 'Elder Enoma', guardianPhone: '08089012345', historicalAttendanceRate: 92.5 },
    { id: 'std-109', studentId: 'ESS/2024/0150', admissionNumber: 'ESS/2024/0150', name: 'Jennifer Nosakhare Igbinedion', gender: 'Female', className: 'SS 2 Science A', arm: 'Science A', guardianName: 'Mr. Igbinedion', guardianPhone: '08190123456', historicalAttendanceRate: 97.0 },
    { id: 'std-110', studentId: 'ESS/2024/0151', admissionNumber: 'ESS/2024/0151', name: 'Kelvin Osaze Ekhator', gender: 'Male', className: 'SS 2 Science A', arm: 'Science A', guardianName: 'Engr. Ekhator', guardianPhone: '07001234567', historicalAttendanceRate: 68.5 },
    { id: 'std-111', studentId: 'ESS/2024/0152', admissionNumber: 'ESS/2024/0152', name: 'Mercy Efe Omorodion', gender: 'Female', className: 'SS 2 Science A', arm: 'Science A', guardianName: 'Mrs. Omorodion', guardianPhone: '08012345670', historicalAttendanceRate: 95.5 },
    { id: 'std-112', studentId: 'ESS/2024/0153', admissionNumber: 'ESS/2024/0153', name: 'Noah Osaro Obasuyi', gender: 'Male', className: 'SS 2 Science A', arm: 'Science A', guardianName: 'Mr. Obasuyi', guardianPhone: '08123456701', historicalAttendanceRate: 89.0 },
  ],
  'SS 3 Science Gold': [
    { id: 'std-201', studentId: 'ESS/2023/0011', admissionNumber: 'ESS/2023/0011', name: 'Victor Osahon Momodu', gender: 'Male', className: 'SS 3 Science Gold', arm: 'Gold', guardianName: 'Mr. Momodu', guardianPhone: '08033334444', historicalAttendanceRate: 99.0 },
    { id: 'std-202', studentId: 'ESS/2023/0012', admissionNumber: 'ESS/2023/0012', name: 'Cynthia Eboselume Oziegbe', gender: 'Female', className: 'SS 3 Science Gold', arm: 'Gold', guardianName: 'Dr. Oziegbe', guardianPhone: '08144445555', historicalAttendanceRate: 96.0 },
    { id: 'std-203', studentId: 'ESS/2023/0013', admissionNumber: 'ESS/2023/0013', name: 'Emmanuel Eromosele Ibhaze', gender: 'Male', className: 'SS 3 Science Gold', arm: 'Gold', guardianName: 'Elder Ibhaze', guardianPhone: '07055556666', historicalAttendanceRate: 94.5 },
    { id: 'std-204', studentId: 'ESS/2023/0014', admissionNumber: 'ESS/2023/0014', name: 'Priscilla Isoken Igbinosun', gender: 'Female', className: 'SS 3 Science Gold', arm: 'Gold', guardianName: 'Mrs. Igbinosun', guardianPhone: '08066667777', historicalAttendanceRate: 67.0 },
    { id: 'std-205', studentId: 'ESS/2023/0015', admissionNumber: 'ESS/2023/0015', name: 'Solomon Orobosa Erhahon', gender: 'Male', className: 'SS 3 Science Gold', arm: 'Gold', guardianName: 'Chief Erhahon', guardianPhone: '08177778888', historicalAttendanceRate: 93.0 },
  ],
  'SS 3 Arts & Commercial': [
    { id: 'std-301', studentId: 'ESS/2024/0088', admissionNumber: 'ESS/2024/0088', name: 'Blessing Eromosele', gender: 'Female', className: 'SS 3 Arts & Commercial', arm: 'Arts', guardianName: 'Mrs. Victoria Eromosele', guardianPhone: '08123456780', historicalAttendanceRate: 98.5 },
    { id: 'std-302', studentId: 'ESS/2024/0089', admissionNumber: 'ESS/2024/0089', name: 'Gabriel Osayande Iyare', gender: 'Male', className: 'SS 3 Arts & Commercial', arm: 'Arts', guardianName: 'Mr. Iyare', guardianPhone: '07033332211', historicalAttendanceRate: 92.0 },
    { id: 'std-303', studentId: 'ESS/2024/0090', admissionNumber: 'ESS/2024/0090', name: 'Joy Omoike', gender: 'Female', className: 'SS 3 Arts & Commercial', arm: 'Commercial', guardianName: 'Deaconess Omoike', guardianPhone: '08055554433', historicalAttendanceRate: 95.0 },
    { id: 'std-304', studentId: 'ESS/2024/0091', admissionNumber: 'ESS/2024/0091', name: 'Tariq Ochuwa Audu', gender: 'Male', className: 'SS 3 Arts & Commercial', arm: 'Commercial', guardianName: 'Alhaji Audu', guardianPhone: '08199998877', historicalAttendanceRate: 63.5 },
  ],
  'SS 2 Arts': [
    { id: 'std-401', studentId: 'ESS/2024/0520', admissionNumber: 'ESS/2024/0520', name: 'Precious Igiehon', gender: 'Female', className: 'SS 2 Arts', arm: 'Arts', guardianName: 'Dr. (Mrs) Igiehon', guardianPhone: '08055667788', historicalAttendanceRate: 97.2 },
    { id: 'std-402', studentId: 'ESS/2024/0521', admissionNumber: 'ESS/2024/0521', name: 'Daniel Osaretin Omokaro', gender: 'Male', className: 'SS 2 Arts', arm: 'Arts', guardianName: 'Chief Omokaro', guardianPhone: '08144332211', historicalAttendanceRate: 90.0 },
    { id: 'std-403', studentId: 'ESS/2024/0522', admissionNumber: 'ESS/2024/0522', name: 'Sandra Omono Ehigiator', gender: 'Female', className: 'SS 2 Arts', arm: 'Arts', guardianName: 'Mrs. Ehigiator', guardianPhone: '07022114455', historicalAttendanceRate: 71.0 },
  ],
  'SS 1 Science': [
    { id: 'std-501', studentId: 'ESS/2024/0301', admissionNumber: 'ESS/2024/0301', name: 'David Osamudiamen Iyamu', gender: 'Male', className: 'SS 1 Science', arm: 'Science', guardianName: 'Mr. Iyamu', guardianPhone: '08033221100', historicalAttendanceRate: 96.0 },
    { id: 'std-502', studentId: 'ESS/2024/0302', admissionNumber: 'ESS/2024/0302', name: 'Esther Omodamwen Osagie', gender: 'Female', className: 'SS 1 Science', arm: 'Science', guardianName: 'Mrs. Osagie', guardianPhone: '08155667700', historicalAttendanceRate: 94.5 },
    { id: 'std-503', studentId: 'ESS/2024/0303', admissionNumber: 'ESS/2024/0303', name: 'Kenneth Osayuwamen Edokpayi', gender: 'Male', className: 'SS 1 Science', arm: 'Science', guardianName: 'Engr. Edokpayi', guardianPhone: '07066778811', historicalAttendanceRate: 69.0 },
  ],
  'SS 1 Arts & Commercial': [
    { id: 'std-601', studentId: 'ESS/2024/0305', admissionNumber: 'ESS/2024/0305', name: 'Faith Omorogbe', gender: 'Female', className: 'SS 1 Arts & Commercial', arm: 'Commercial', guardianName: 'Elder Omorogbe', guardianPhone: '08099887766', historicalAttendanceRate: 91.2 },
    { id: 'std-602', studentId: 'ESS/2024/0306', admissionNumber: 'ESS/2024/0306', name: 'Samuel Osamuyi Agho', gender: 'Male', className: 'SS 1 Arts & Commercial', arm: 'Arts', guardianName: 'Mr. Agho', guardianPhone: '08122334455', historicalAttendanceRate: 93.0 },
  ],
  'JSS 1 Gold': [
    { id: 'std-701', studentId: 'ESS/2024/0701', admissionNumber: 'ESS/2024/0701', name: 'Godswill Momoh', gender: 'Male', className: 'JSS 1 Gold', arm: 'Gold', guardianName: 'Alhaji Momoh', guardianPhone: '08133221100', historicalAttendanceRate: 97.0 },
    { id: 'std-702', studentId: 'ESS/2024/0702', admissionNumber: 'ESS/2024/0702', name: 'Victory Osamudiamen Ojo', gender: 'Female', className: 'JSS 1 Gold', arm: 'Gold', guardianName: 'Mr. Ojo', guardianPhone: '07011223344', historicalAttendanceRate: 95.5 },
    { id: 'std-703', studentId: 'ESS/2024/0703', admissionNumber: 'ESS/2024/0703', name: 'Caleb Osagioduwa Igbinoba', gender: 'Male', className: 'JSS 1 Gold', arm: 'Gold', guardianName: 'Mrs. Igbinoba', guardianPhone: '08044556677', historicalAttendanceRate: 65.0 },
  ],
  'JSS 2 A': [
    { id: 'std-801', studentId: 'ESS/2024/0210', admissionNumber: 'ESS/2024/0210', name: 'Kelvin Osagie', gender: 'Male', className: 'JSS 2 A', arm: 'A', guardianName: 'Engr. Festus Osagie', guardianPhone: '07033445566', historicalAttendanceRate: 93.8 },
    { id: 'std-802', studentId: 'ESS/2024/0211', admissionNumber: 'ESS/2024/0211', name: 'Princess Osamede Aimiuwu', gender: 'Female', className: 'JSS 2 A', arm: 'A', guardianName: 'Chief Aimiuwu', guardianPhone: '08122446688', historicalAttendanceRate: 96.0 },
  ],
  'JSS 3 Diamond': [
    { id: 'std-901', studentId: 'ESS/2024/0412', admissionNumber: 'ESS/2024/0412', name: 'Destiny Akhilomen', gender: 'Male', className: 'JSS 3 Diamond', arm: 'Diamond', guardianName: 'Chief M. Akhilomen', guardianPhone: '08144556677', historicalAttendanceRate: 96.0 },
    { id: 'std-902', studentId: 'ESS/2024/0413', admissionNumber: 'ESS/2024/0413', name: 'Miracle Orobosa Omere', gender: 'Female', className: 'JSS 3 Diamond', arm: 'Diamond', guardianName: 'Mrs. Omere', guardianPhone: '08088776655', historicalAttendanceRate: 66.5 },
  ],
};

// Fallback generator for other class arms if not explicitly defined above
export function getStudentsForClass(className: string): ClassRosterItem[] {
  if (ALL_STUDENTS_ROSTER[className]) {
    return ALL_STUDENTS_ROSTER[className];
  }
  // Generate consistent placeholder cohort
  const cleanCode = className.replace(/[^a-zA-Z0-9]/g, '').slice(0, 4).toUpperCase();
  return [
    { id: `gen-${cleanCode}-1`, studentId: `ESS/2024/${cleanCode}01`, admissionNumber: `ESS/2024/${cleanCode}01`, name: `Emmanuel ${cleanCode} Okojie`, gender: 'Male', className, arm: 'A', guardianName: 'Mr. Okojie', guardianPhone: '08034567891', historicalAttendanceRate: 94.0 },
    { id: `gen-${cleanCode}-2`, studentId: `ESS/2024/${cleanCode}02`, admissionNumber: `ESS/2024/${cleanCode}02`, name: `Blessing ${cleanCode} Bello`, gender: 'Female', className, arm: 'A', guardianName: 'Mrs. Bello', guardianPhone: '08023456789', historicalAttendanceRate: 96.5 },
    { id: `gen-${cleanCode}-3`, studentId: `ESS/2024/${cleanCode}03`, admissionNumber: `ESS/2024/${cleanCode}03`, name: `Victor ${cleanCode} Akhigbe`, gender: 'Male', className, arm: 'A', guardianName: 'Chief Akhigbe', guardianPhone: '08134567890', historicalAttendanceRate: 68.0 },
    { id: `gen-${cleanCode}-4`, studentId: `ESS/2024/${cleanCode}04`, admissionNumber: `ESS/2024/${cleanCode}04`, name: `Favour ${cleanCode} Idahosa`, gender: 'Female', className, arm: 'A', guardianName: 'Dr. Idahosa', guardianPhone: '07045678901', historicalAttendanceRate: 91.0 },
  ];
}

// Initial sample historical log dates (for trends & analytics)
export const SAMPLE_HISTORICAL_LOGS: AttendanceRecordItem[] = [
  // SS 2 Science A logs for 2026-08-25
  { id: 'att-hist-1', studentId: 'std-101', admissionNumber: 'ESS/2024/0142', studentName: 'Osahon Emmanuel Okojie', gender: 'Male', className: 'SS 2 Science A', arm: 'Science A', date: '2026-08-25', status: 'Present', teacherName: 'Mr. A. Momodu', timeRecorded: '08:05 AM' },
  { id: 'att-hist-2', studentId: 'std-102', admissionNumber: 'ESS/2024/0143', studentName: 'Amina Fatima Bello', gender: 'Female', className: 'SS 2 Science A', arm: 'Science A', date: '2026-08-25', status: 'Present', teacherName: 'Mr. A. Momodu', timeRecorded: '08:05 AM' },
  { id: 'att-hist-3', studentId: 'std-107', admissionNumber: 'ESS/2024/0148', studentName: 'Helen Ifueko Osunde', gender: 'Female', className: 'SS 2 Science A', arm: 'Science A', date: '2026-08-25', status: 'Absent', remark: 'No official note received', teacherName: 'Mr. A. Momodu', timeRecorded: '08:05 AM' },
  { id: 'att-hist-4', studentId: 'std-110', admissionNumber: 'ESS/2024/0151', studentName: 'Kelvin Osaze Ekhator', gender: 'Male', className: 'SS 2 Science A', arm: 'Science A', date: '2026-08-25', status: 'Late', remark: 'Arrived at 08:35 AM (Heavy morning rain)', teacherName: 'Mr. A. Momodu', timeRecorded: '08:35 AM' },
  
  // SS 2 Science A logs for 2026-08-26
  { id: 'att-hist-5', studentId: 'std-101', admissionNumber: 'ESS/2024/0142', studentName: 'Osahon Emmanuel Okojie', gender: 'Male', className: 'SS 2 Science A', arm: 'Science A', date: '2026-08-26', status: 'Present', teacherName: 'Mr. A. Momodu', timeRecorded: '08:00 AM' },
  { id: 'att-hist-6', studentId: 'std-107', admissionNumber: 'ESS/2024/0148', studentName: 'Helen Ifueko Osunde', gender: 'Female', className: 'SS 2 Science A', arm: 'Science A', date: '2026-08-26', status: 'Absent', remark: 'Unexcused', teacherName: 'Mr. A. Momodu', timeRecorded: '08:00 AM' },
  { id: 'att-hist-7', studentId: 'std-110', admissionNumber: 'ESS/2024/0151', studentName: 'Kelvin Osaze Ekhator', gender: 'Male', className: 'SS 2 Science A', arm: 'Science A', date: '2026-08-26', status: 'Excused', remark: 'Attended clinic on referral', teacherName: 'Mr. A. Momodu', timeRecorded: '08:00 AM' },

  // SS 2 Science A logs for 2026-08-27
  { id: 'att-hist-8', studentId: 'std-101', admissionNumber: 'ESS/2024/0142', studentName: 'Osahon Emmanuel Okojie', gender: 'Male', className: 'SS 2 Science A', arm: 'Science A', date: '2026-08-27', status: 'Present', teacherName: 'Mr. A. Momodu', timeRecorded: '07:55 AM' },
  { id: 'att-hist-9', studentId: 'std-107', admissionNumber: 'ESS/2024/0148', studentName: 'Helen Ifueko Osunde', gender: 'Female', className: 'SS 2 Science A', arm: 'Science A', date: '2026-08-27', status: 'Absent', remark: 'Third consecutive unexcused absence', teacherName: 'Mr. A. Momodu', timeRecorded: '07:55 AM' },
  { id: 'att-hist-10', studentId: 'std-110', admissionNumber: 'ESS/2024/0151', studentName: 'Kelvin Osaze Ekhator', gender: 'Male', className: 'SS 2 Science A', arm: 'Science A', date: '2026-08-27', status: 'Late', remark: 'Arrived at 08:20 AM', teacherName: 'Mr. A. Momodu', timeRecorded: '08:20 AM' },
];
