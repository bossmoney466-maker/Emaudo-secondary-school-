import { NewsArticle, SchoolEvent, GalleryPhoto, StudentResultRecord, StudentProfile, AdmissionApplication } from '../types';

export const FOUNDER_INFO = {
  name: 'Professor Ambrose Folorunsho Alli',
  title: 'Founder & Visionary Statesman',
  lifeSpan: '1929 – 1989',
  role: 'First Civilian Governor of Bendel State (1979–1983) & Distinguished Professor of Morbid Anatomy',
  quote: 'Education is the greatest catalyst for human emancipation and community advancement. Every child in our land deserves an open door to knowledge.',
  bio: 'Professor Ambrose Folorunsho Alli was a visionary academician, medical scholar, and governor of Bendel State (now Edo and Delta States). Under his landmark free secondary and tertiary education policy in 1980, hundreds of secondary schools, including Emaudo Secondary School in Ekpoma, were established to make quality secondary education accessible to all children regardless of socio-economic background. He also founded Bendel State University (now Ambrose Alli University) in Ekpoma.',
  legacyPoints: [
    'Established Emaudo Secondary School in 1980 to serve the growing educational needs of Ekpoma and surrounding communities.',
    'Pioneered free, universal secondary education throughout Bendel State.',
    'Democratized access to science, arts, and technical learning in rural and semi-urban communities.',
    'Founded Ambrose Alli University (formerly Bendel State University) right in Ekpoma, creating an educational hub.',
  ]
};

export const HISTORY_TIMELINE = [
  {
    year: '1980',
    title: 'School Founded by Prof. Ambrose Alli',
    description: 'Emaudo Secondary School was formally founded and established under the educational expansion program of Bendel State Governor Prof. Ambrose Folorunsho Alli, welcoming its first cohort of pioneer students on Osimen Street.',
    tag: 'Foundation',
  },
  {
    year: '1988',
    title: 'Science & Technical Labs Inaugurated',
    description: 'Specialized Physics, Chemistry, Biology, and Introductory Technology workshops were established to meet rising standards for national school certificate examinations.',
    tag: 'Academics',
  },
  {
    year: '1995',
    title: 'WAEC & NECO Examination Centre Accreditation',
    description: 'The school received full accreditation as an independent examination center for the West African Examinations Council (WAEC) and later the National Examinations Council (NECO).',
    tag: 'Accreditation',
  },
  {
    year: '2005',
    title: 'Inauguration of ESSOSA Alumni Body',
    description: 'Graduates formed the Emaudo Secondary School Old Students Association (ESSOSA) to coordinate alumni giving, mentor younger students, and support infrastructural development.',
    tag: 'Alumni Network',
  },
  {
    year: '2016',
    title: 'Campus Renovation & Library Modernization',
    description: 'Major rehabilitation of classroom blocks, library expansion, and installation of modern science apparatus supported by ESSOSA and educational stakeholders.',
    tag: 'Infrastructure',
  },
  {
    year: 'Present',
    title: 'Digital Learning & Continuous Excellence',
    description: 'Transitioning to digital record keeping, computer-based testing preparation, and maintaining a high standard of academic excellence and moral leadership.',
    tag: 'Modern Era',
  },
];

export const ESSOSA_DATA = {
  name: 'Emaudo Secondary School Old Students Association (ESSOSA)',
  website: 'https://emaudooldstudents.org/',
  historyUrl: 'https://emaudooldstudents.org/about/history/',
  galleryUrl: 'https://emaudooldstudents.org/gallery/',
  mission: 'To foster unity among all generations of Emaudo Secondary School alumni, champion the educational development of our alma mater, and mentor the next generation of Nigerian leaders.',
  chapters: [
    { city: 'Ekpoma / Esan Chapter', contact: 'Host Chapter & Campus Liaison' },
    { city: 'Benin City Chapter', contact: 'Edo State Capital Network' },
    { city: 'Lagos State Chapter', contact: 'Commercial Hub Network' },
    { city: 'Abuja (FCT) Chapter', contact: 'Federal Capital Chapter' },
    { city: 'UK & Europe Diaspora', contact: 'International Alumni Chapter' },
    { city: 'North America (USA/Canada)', contact: 'Diaspora Liaison' },
  ],
  achievements: [
    'Refurbishment of Senior Science Laboratories and procurement of chemical reagents.',
    'Annual scholarship awards for best-performing graduating JSS 3 and SSS 3 students.',
    'Donation of computers and library textbooks.',
    'Career guidance, motivational mentorship, and leadership seminars for current students.',
  ]
};

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Resumption for 2024/2025 Academic Session & Important Guidelines',
    category: 'Academic',
    date: 'September 12, 2024',
    summary: 'All new and returning students are hereby notified of the commencement dates, mandatory registration clearance, and assembly protocols.',
    content: 'All students are expected to arrive in complete, neat school uniform on or before 7:45 AM. Screening of newly admitted JSS 1 and SSS 1 transfer students will take place at the administrative hall.',
    readTime: '3 min read',
    pinned: true,
  },
  {
    id: 'news-2',
    title: 'WAEC / WASSCE & NECO 2024 Outstanding Academic Results',
    category: 'Academic',
    date: 'August 28, 2024',
    summary: 'Emaudo Secondary School records remarkable pass rates in Mathematics, English Language, and Science disciplines.',
    content: 'We congratulate our graduating class for their dedication, producing over 88% credit passes in key STEM and Humanities subjects. Parents can verify results at the administrative office.',
    readTime: '4 min read',
    pinned: true,
  },
  {
    id: 'news-3',
    title: 'ESSOSA National Alumni Homecoming & Mentorship Day',
    category: 'Alumni',
    date: 'July 15, 2024',
    summary: 'Distinguished alumni from across Nigeria and the diaspora converge in Ekpoma to inspire current students and review ongoing school support projects.',
    content: 'The gathering featured interactive career panels covering Medicine, Law, Engineering, Tech, Agriculture, and Civil Service. Visit https://emaudooldstudents.org/ for official chapter details.',
    readTime: '5 min read',
  },
  {
    id: 'news-4',
    title: 'Annual Inter-House Sports Competition Announced',
    category: 'Sports',
    date: 'June 05, 2024',
    summary: 'Green, Blue, Red, and Yellow Houses gear up for track and field events, march past, and cultural displays at the school sports pavilion.',
    content: 'Parents, guardians, and old students are warmly invited to cheer on our athletes in sprint races, relays, high jump, and football tournaments.',
    readTime: '2 min read',
  },
];

export const SCHOOL_EVENTS: SchoolEvent[] = [
  {
    id: 'evt-1',
    title: 'First Term Mid-Term Assessment & Continuous Testing',
    category: 'Exam',
    date: 'October 24 - 28, 2024',
    time: '8:00 AM - 1:30 PM',
    venue: 'Main Examination Halls',
    description: 'Mandatory continuous assessment tests across all Junior and Senior Secondary classes.',
  },
  {
    id: 'evt-2',
    title: 'Parent-Teacher Association (PTA) General Meeting',
    category: 'Meeting',
    date: 'November 16, 2024',
    time: '10:00 AM Prompt',
    venue: 'School Assembly Auditorium',
    description: 'Deliberation on student welfare, academic progress, infrastructure maintenance, and developmental initiatives.',
  },
  {
    id: 'evt-3',
    title: 'Inter-House Sports Athletics Championship Finals',
    category: 'Sports',
    date: 'December 06, 2024',
    time: '9:00 AM - 4:00 PM',
    venue: 'Emaudo Sports Complex',
    description: 'Finals of the inter-house sprint competitions, relays, tug-of-war, and prize presentations.',
  },
  {
    id: 'evt-4',
    title: 'Speech & Prize-Giving Day / Valedictory Service',
    category: 'Ceremony',
    date: 'July 22, 2025',
    time: '10:00 AM',
    venue: 'School Main Auditorium',
    description: 'Honoring outstanding students in academics, moral leadership, sports, and celebrating our graduating seniors.',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Main Academic Block & Central Quadrangle',
    category: 'Campus',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80',
    caption: 'Conducive, open-air campus grounds designed for peaceful learning at 178 Osimen Street, Emaudo, Ekpoma.',
    year: '2024'
  },
  {
    id: 'gal-2',
    title: 'Science Practical Session in Biology & Chemistry',
    category: 'Laboratories',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80',
    caption: 'Students conducting titration experiments and biological specimen examinations under teacher supervision.',
    year: '2024'
  },
  {
    id: 'gal-3',
    title: 'Computer Science & ICT Center',
    category: 'Laboratories',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80',
    caption: 'Computer literacy training preparing students for digital competency and online examination formats.',
    year: '2024'
  },
  {
    id: 'gal-4',
    title: 'Annual Inter-House Sports Sprint & Relay Track',
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1000&q=80',
    caption: 'Fostering teamwork, physical fitness, and healthy athletic competition among school houses.',
    year: '2024'
  },
  {
    id: 'gal-5',
    title: 'Cultural Day & Traditional Heritage Celebration',
    category: 'Cultural',
    imageUrl: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=80',
    caption: 'Celebrating the rich cultural traditions and heritage of Esanland, Edo State, and Nigeria.',
    year: '2024'
  },
  {
    id: 'gal-6',
    title: 'Interactive Senior Secondary Classroom Learning',
    category: 'Academics',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80',
    caption: 'Dedicated teachers engaging students with rigorous national curriculum standards.',
    year: '2024'
  },
  {
    id: 'gal-7',
    title: 'ESSOSA Alumni Homecoming & Alma Mater Tree Planting',
    category: 'Alumni',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=80',
    caption: 'Alumni members visiting the school compound during their annual reunion and inspection of funded projects.',
    year: '2024'
  },
  {
    id: 'gal-8',
    title: 'School Assembly & Morning Devotional Gathering',
    category: 'Campus',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80',
    caption: 'Building moral discipline, punctuality, and character during daily morning assemblies.',
    year: '2024'
  }
];

export const MOCK_STUDENT_RESULTS: Record<string, StudentResultRecord> = {
  'ESS/2024/0142': {
    studentId: 'ESS/2024/0142',
    studentName: 'Osahon Emmanuel Okojie',
    className: 'SSS 2 Science',
    term: '1st Term',
    session: '2024/2025',
    scores: [
      { subject: 'English Language', ca1: 18, ca2: 17, exam: 52, total: 87, grade: 'A1', remark: 'Distinction' },
      { subject: 'General Mathematics', ca1: 19, ca2: 18, exam: 54, total: 91, grade: 'A1', remark: 'Excellent' },
      { subject: 'Physics', ca1: 17, ca2: 16, exam: 48, total: 81, grade: 'A1', remark: 'Very Good' },
      { subject: 'Chemistry', ca1: 16, ca2: 15, exam: 45, total: 76, grade: 'B2', remark: 'Very Good' },
      { subject: 'Biology', ca1: 18, ca2: 17, exam: 49, total: 84, grade: 'A1', remark: 'Distinction' },
      { subject: 'Civic Education', ca1: 18, ca2: 19, exam: 50, total: 87, grade: 'A1', remark: 'Distinction' },
      { subject: 'Further Mathematics', ca1: 15, ca2: 16, exam: 42, total: 73, grade: 'B3', remark: 'Good' },
      { subject: 'Agricultural Science', ca1: 19, ca2: 17, exam: 51, total: 87, grade: 'A1', remark: 'Distinction' },
      { subject: 'Computer Studies', ca1: 19, ca2: 18, exam: 53, total: 90, grade: 'A1', remark: 'Outstanding' },
    ],
    totalScore: 756,
    averageScore: 84.0,
    position: '2nd out of 45',
    classSize: 45,
    attendanceDays: 62,
    totalSchoolDays: 65,
    classTeacherRemark: 'Osahon is an exceptionally focused, disciplined, and studious young man with tremendous STEM potential.',
    principalRemark: 'An outstanding academic performance. Keep up this exemplary momentum.',
    nextTermBegins: 'January 13, 2025'
  },
  'ESS/2024/0088': {
    studentId: 'ESS/2024/0088',
    studentName: 'Blessing Eromosele',
    className: 'SSS 3 Arts',
    term: '1st Term',
    session: '2024/2025',
    scores: [
      { subject: 'English Language', ca1: 19, ca2: 18, exam: 54, total: 91, grade: 'A1', remark: 'Outstanding' },
      { subject: 'General Mathematics', ca1: 15, ca2: 16, exam: 44, total: 75, grade: 'B2', remark: 'Very Good' },
      { subject: 'Literature in English', ca1: 19, ca2: 19, exam: 55, total: 93, grade: 'A1', remark: 'Distinction' },
      { subject: 'Government', ca1: 18, ca2: 17, exam: 51, total: 86, grade: 'A1', remark: 'Distinction' },
      { subject: 'Christian Religious Studies', ca1: 19, ca2: 18, exam: 52, total: 89, grade: 'A1', remark: 'Distinction' },
      { subject: 'Civic Education', ca1: 18, ca2: 18, exam: 50, total: 86, grade: 'A1', remark: 'Distinction' },
      { subject: 'Economics', ca1: 16, ca2: 15, exam: 47, total: 78, grade: 'B2', remark: 'Very Good' },
      { subject: 'History', ca1: 18, ca2: 18, exam: 52, total: 88, grade: 'A1', remark: 'Distinction' },
    ],
    totalScore: 686,
    averageScore: 85.75,
    position: '1st out of 38',
    classSize: 38,
    attendanceDays: 64,
    totalSchoolDays: 65,
    classTeacherRemark: 'Blessing demonstrates extraordinary analytical and literary writing abilities. Highly commended.',
    principalRemark: 'Exemplary result. A role model in discipline and intellectual dedication.',
    nextTermBegins: 'January 13, 2025'
  },
  'ESS/2024/0210': {
    studentId: 'ESS/2024/0210',
    studentName: 'Kelvin Osagie',
    className: 'JSS 2A',
    term: '1st Term',
    session: '2024/2025',
    scores: [
      { subject: 'English Studies', ca1: 16, ca2: 15, exam: 46, total: 77, grade: 'B2', remark: 'Very Good' },
      { subject: 'Mathematics', ca1: 17, ca2: 18, exam: 48, total: 83, grade: 'A1', remark: 'Excellent' },
      { subject: 'Basic Science & Tech', ca1: 16, ca2: 16, exam: 47, total: 79, grade: 'B2', remark: 'Very Good' },
      { subject: 'Social Studies', ca1: 18, ca2: 17, exam: 49, total: 84, grade: 'A1', remark: 'Distinction' },
      { subject: 'Civic Education', ca1: 17, ca2: 18, exam: 50, total: 85, grade: 'A1', remark: 'Distinction' },
      { subject: 'Agricultural Science', ca1: 18, ca2: 16, exam: 46, total: 80, grade: 'A1', remark: 'Distinction' },
      { subject: 'Business Studies', ca1: 15, ca2: 14, exam: 43, total: 72, grade: 'B3', remark: 'Good' },
      { subject: 'Cultural & Creative Arts', ca1: 18, ca2: 19, exam: 51, total: 88, grade: 'A1', remark: 'Distinction' },
    ],
    totalScore: 648,
    averageScore: 81.0,
    position: '4th out of 52',
    classSize: 52,
    attendanceDays: 61,
    totalSchoolDays: 65,
    classTeacherRemark: 'Kelvin is a respectful and hard-working student with steady academic growth.',
    principalRemark: 'Commendable result. Maintain this high standard.',
    nextTermBegins: 'January 13, 2025'
  }
};

export const MOCK_STUDENTS_REGISTRY: StudentProfile[] = [
  { id: '1', studentId: 'ESS/2024/0142', name: 'Osahon Emmanuel Okojie', className: 'SSS 2 Science', gender: 'Male', guardianName: 'Mr. Patrick Okojie', guardianPhone: '08034567891', status: 'Active', feesStatus: 'Paid', outstandingAmount: 0, attendanceRate: 95.4 },
  { id: '2', studentId: 'ESS/2024/0088', name: 'Blessing Eromosele', className: 'SSS 3 Arts', gender: 'Female', guardianName: 'Mrs. Victoria Eromosele', guardianPhone: '08123456780', status: 'Active', feesStatus: 'Paid', outstandingAmount: 0, attendanceRate: 98.5 },
  { id: '3', studentId: 'ESS/2024/0210', name: 'Kelvin Osagie', className: 'JSS 2A', gender: 'Male', guardianName: 'Engr. Festus Osagie', guardianPhone: '07033445566', status: 'Active', feesStatus: 'Paid', outstandingAmount: 0, attendanceRate: 93.8 },
  { id: '4', studentId: 'ESS/2024/0305', name: 'Faith Omorogbe', className: 'SSS 1 Commercial', gender: 'Female', guardianName: 'Elder Omorogbe', guardianPhone: '08099887766', status: 'Active', feesStatus: 'Partially Paid', outstandingAmount: 12500, attendanceRate: 91.2 },
  { id: '5', studentId: 'ESS/2024/0412', name: 'Destiny Akhilomen', className: 'JSS 3B', gender: 'Male', guardianName: 'Chief M. Akhilomen', guardianPhone: '08144556677', status: 'Active', feesStatus: 'Paid', outstandingAmount: 0, attendanceRate: 96.0 },
  { id: '6', studentId: 'ESS/2024/0520', name: 'Precious Igiehon', className: 'SSS 2 Arts', gender: 'Female', guardianName: 'Dr. (Mrs) Igiehon', guardianPhone: '08055667788', status: 'Active', feesStatus: 'Paid', outstandingAmount: 0, attendanceRate: 97.2 },
];

export const MOCK_ADMISSION_APPLICATIONS: AdmissionApplication[] = [
  { id: 'app-1', applicantName: 'Daniel Osagiede', proposedClass: 'JSS 1', gender: 'Male', parentName: 'Mr. Clifford Osagiede', parentPhone: '08022334455', parentWhatsApp: '+2348022334455', previousSchool: 'St. Mary Primary School, Ekpoma', status: 'Entrance Test Scheduled', appliedDate: '2024-09-04' },
  { id: 'app-2', applicantName: 'Miracle Iyamu', proposedClass: 'SSS 1 Science', gender: 'Female', parentName: 'Mrs. Stella Iyamu', parentPhone: '07066778899', parentWhatsApp: '+2347066778899', previousSchool: 'University Demonstration Sec School', status: 'Pending Review', appliedDate: '2024-09-08' },
  { id: 'app-3', applicantName: 'Godswill Momoh', proposedClass: 'JSS 1', gender: 'Male', parentName: 'Alhaji Momoh', parentPhone: '08133221100', parentWhatsApp: '+2348133221100', previousSchool: 'Emaudo Community Primary School', status: 'Approved', appliedDate: '2024-09-01' },
];
