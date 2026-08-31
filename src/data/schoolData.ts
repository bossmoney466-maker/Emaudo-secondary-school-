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

// ============================================================================
// ACADEMIC DEPARTMENTS DATA
// ============================================================================
export const ACADEMIC_DEPARTMENTS = [
  {
    id: 'dept-maths',
    name: 'Mathematics Department',
    headOfDepartment: 'Mr. A. Momodu (B.Sc. Ed. Mathematics)',
    tagline: 'Fostering analytical logic, quantitative mastery, and competitive problem solving.',
    description: 'The Mathematics Department delivers rigorous instruction from foundational arithmetic in Junior Secondary through advanced calculus and trigonometry in Senior Secondary. Students participate in annual Olympiads and inter-school quizzes.',
    subjects: [
      'General Mathematics (JSS 1 – SSS 3)',
      'Further Mathematics (SSS 1 – SSS 3 Science)',
      'Basic Mathematics & Quantitative Reasoning'
    ],
    features: [
      'Algebra & Equations (Linear, Quadratic, Polynomials)',
      'Geometry, Trigonometry & Mensuration',
      'Statistics, Probability & Data Interpretation',
      'Real-world Problem Solving & Quantitative Reasoning',
      'National Mathematics Olympiad & MAN Quiz Training',
      'Step-by-step WAEC & NECO Theory Past Paper Drills'
    ],
    competitions: [
      'Mathematical Association of Nigeria (MAN) State Olympiad',
      'Cowbellpedia Secondary School Mathematics TV Quiz',
      'Edo State Secondary Schools Science & Maths Fair'
    ],
    labsOrFacilities: ['Mathematics Modeling Laboratory', 'CBT Mathematics Practice Centre']
  },
  {
    id: 'dept-english',
    name: 'English Language & Literary Studies',
    headOfDepartment: 'Mrs. B. Okojie (B.A. Ed. English Literature)',
    tagline: 'Cultivating articulate expression, critical reading, and powerful public speaking.',
    description: 'Empowering students with command over spoken and written English, phonetics, essay composition, and African and World literature. The department anchors the school Debate Club and Literary Society.',
    subjects: [
      'English Studies / Language (JSS 1 – SSS 3)',
      'Literature-in-English (SSS 1 – SSS 3 Arts)',
      'Phonetics, Diction & Spoken English'
    ],
    features: [
      'Grammar, Sentence Structure & Lexis',
      'African & Non-African Prose, Poetry & Drama',
      'Reading Comprehension & Summary Writing',
      'Formal, Informal, Narrative & Argumentative Essays',
      'Debate, Elocution, Oratory & Public Speaking',
      'Spelling Bee & Literary Criticism Workshops'
    ],
    competitions: [
      'Edo State Inter-School Debate Championship',
      'National Library Board Essay Competition',
      'Esan Literary & Cultural Arts Recitation Contest'
    ],
    labsOrFacilities: ['School Central Library & Reading Hall', 'Audio-Visual Language Clinic']
  },
  {
    id: 'dept-science',
    name: 'Science Department',
    headOfDepartment: 'Mr. C. Ebosele (B.Sc. Industrial Chemistry, PGDE)',
    tagline: 'Hands-on scientific inquiry powered by the ultra-modern Chevron laboratory complex.',
    description: 'Our premier STEM division offering comprehensive theory and wet-lab practicals across Biology, Chemistry, Physics, and Agricultural Science. Students conduct weekly laboratory experiments preparing them for WAEC/NECO practical exams and engineering/medical careers.',
    subjects: [
      'Physics (SSS 1 – SSS 3)',
      'Chemistry (SSS 1 – SSS 3)',
      'Biology (SSS 1 – SSS 3)',
      'Agricultural Science (JSS 1 – SSS 3)',
      'Basic Science & Technology (JSS 1 – JSS 3)'
    ],
    features: [
      'Ultra-Modern Science Laboratory Complex (Chevron 2017 Partnership)',
      'Wet Lab Titration & Qualitative Chemical Analysis',
      'Optics, Mechanics, Electricity & Magnetism Practicals',
      'Biological Specimens, Microscopy & Dissection Demonstrations',
      'Organic Agriculture & School Demonstration Farm',
      'Annual Science Exhibition & Student Innovation Projects'
    ],
    competitions: [
      'STAN (Science Teachers Association of Nigeria) Project Fair',
      'NNPC National Science Competition',
      'Edo State Young Scientists Exhibition'
    ],
    labsOrFacilities: [
      'Ultra-Modern Science Laboratory Complex (Inaugurated 2017 with Chevron & Partners)',
      'Dedicated Physics Lab with Optical Benches & Circuit Boards',
      'Chemistry Lab with Fume Hoods & Reagents Storage',
      'Biology Specimen Museum & Experimental Garden'
    ]
  },
  {
    id: 'dept-social',
    name: 'Social Sciences & Humanities',
    headOfDepartment: 'Mrs. F. Ighodalo (M.Ed. Social Studies)',
    tagline: 'Understanding civic duty, socioeconomic systems, governance, and history.',
    description: 'Fostering informed, ethical citizenship and global awareness through the study of Government, Economics, Geography, Civic Education, and Nigerian/Esan History.',
    subjects: [
      'Government (SSS 1 – SSS 3)',
      'Economics (SSS 1 – SSS 3)',
      'Geography (SSS 1 – SSS 3)',
      'Civic Education (Core JSS 1 – SSS 3)',
      'Social Studies & History (JSS 1 – JSS 3)'
    ],
    features: [
      'Constitutional Law, Political Systems & Governance',
      'Micro & Macro Economics, Fiscal Policy and Development',
      'Physical Geography, Map Reading, Climatology & Fieldwork',
      'Human Rights, National Ethics & Democratic Values',
      'Esan, Nigerian & World History and Cultural Heritage'
    ],
    competitions: [
      'National Civic Education Challenge',
      'Central Bank of Nigeria (CBN) Financial Literacy Quiz',
      'Junior Model United Nations (MUN) Simulations'
    ],
    labsOrFacilities: ['Geography Map Room & Meteorological Station', 'Civic Council Hall']
  },
  {
    id: 'dept-commercial',
    name: 'Commercial & Business Studies',
    headOfDepartment: 'Mr. O. Imhansi (B.Sc. Accounting, ACA)',
    tagline: 'Instilling entrepreneurial acumen, financial literacy, and commerce skills.',
    description: 'Equipping aspiring accountants, bankers, business leaders, and entrepreneurs with practical bookkeeping, business law, marketing, and modern financial management.',
    subjects: [
      'Financial Accounting (SSS 1 – SSS 3)',
      'Commerce (SSS 1 – SSS 3)',
      'Business Studies (JSS 1 – JSS 3)',
      'Bookkeeping & Store Management'
    ],
    features: [
      'Double Entry Bookkeeping, Ledger Accounts & Balance Sheets',
      'Trade, Banking, Insurance, Transport & Warehousing',
      'Office Practice, Business Correspondence & Record Keeping',
      'Personal Financial Literacy, Budgeting & Investment Basics',
      'Young Entrepreneurs Business Plan Pitching Contests'
    ],
    competitions: [
      'ICAN National Secondary School Accounting Challenge',
      'Junior Achievement Nigeria (JAN) Business Competition'
    ],
    labsOrFacilities: ['Simulated Banking & Accounting Room', 'Business Resource Corner']
  },
  {
    id: 'dept-tech',
    name: 'Technology & Digital Skills Department',
    headOfDepartment: 'Engr. S. Osas (B.Eng. Computer Engineering)',
    tagline: 'Mastering modern computer literacy, coding fundamentals, and CBT exam preparation.',
    description: 'Ensuring every Emaudo student gains digital competence. Covers computer hardware, office productivity software, internet safety, coding logic, and CBT examination readiness for JAMB UTME.',
    subjects: [
      'Computer Studies / ICT (JSS 1 – SSS 3)',
      'Data Processing (SSS 1 – SSS 3)',
      'Basic Technology & Technical Drawing (JSS 1 – JSS 3)'
    ],
    features: [
      'Computer Fundamentals, Operating Systems & Hardware',
      'Word Processing, Spreadsheets, Presentations & Databases',
      'Introduction to Coding & Algorithmic Problem Solving (HTML/Python basics)',
      'Cybersecurity Awareness & Responsible Digital Citizenship',
      'JAMB/UTME Computer-Based Testing (CBT) Practice Simulations',
      'Technical Drawing, Workshop Safety & Woodwork/Metalwork Basics'
    ],
    competitions: [
      'Nigeria Computer Society (NCS) Young IT Brains',
      'National Coding & Robotics School Fair'
    ],
    labsOrFacilities: ['Digital ICT Centre & CBT Computer Laboratory', 'Technical Drawing Workshop']
  }
];

// ============================================================================
// STUDENT CLUBS & EXTRACURRICULARS
// ============================================================================
export const SCHOOL_CLUBS = [
  {
    id: 'club-debate',
    name: 'Debate & Literary Club',
    category: 'Academic',
    description: 'Sharpens critical thinking, persuasive argumentation, elocution, and stage confidence through weekly parliamentary and Oxford-style debates.',
    coordinator: 'Mrs. B. Okojie',
    meetingDay: 'Wednesdays',
    meetingTime: '2:15 PM – 3:30 PM',
    venue: 'School Auditorium',
    activities: ['Weekly moot motions', 'Inter-class debate leagues', 'Spelling bee tournaments', 'Poetry recitation'],
    achievements: ['1st Place in 2023 Esan Central Inter-School Debate Trophy']
  },
  {
    id: 'club-science',
    name: 'Young Scientists & JETS Club',
    category: 'Academic',
    description: 'Junior Engineers, Technicians & Scientists (JETS) club dedicated to hands-on experiments, robotics prototypes, renewable energy models, and science exhibitions.',
    coordinator: 'Mr. C. Ebosele',
    meetingDay: 'Thursdays',
    meetingTime: '2:15 PM – 3:30 PM',
    venue: 'Chevron Science Laboratory Complex',
    activities: ['Chemical synthesis experiments', 'Simple electronic circuits', 'Solar oven projects', 'Water purification testing'],
    achievements: ['Best STEM Project at the 2024 Edo Central Science Fair']
  },
  {
    id: 'club-maths',
    name: 'Mathematics & Chess Club',
    category: 'Academic',
    description: 'Fosters mathematical puzzle solving, mental math speed drills, Rubik’s cube mastery, and strategic chess tournaments.',
    coordinator: 'Mr. A. Momodu',
    meetingDay: 'Tuesdays',
    meetingTime: '2:15 PM – 3:30 PM',
    venue: 'Mathematics Lab / Room 104',
    activities: ['Speed arithmetic contests', 'Logic puzzle challenges', 'Chess ladder tournament', 'Past Olympiad solution workshops'],
    achievements: ['3 Top-10 qualifiers in State MAN Mathematics Olympiad']
  },
  {
    id: 'club-press',
    name: 'Press & Media Club',
    category: 'Civic',
    description: 'Trains student journalists, photojournalists, and broadcasters to produce the weekly school wall bulletin, assembly morning news, and term magazine.',
    coordinator: 'Mr. P. Akhimien',
    meetingDay: 'Mondays & Fridays',
    meetingTime: '2:15 PM – 3:15 PM',
    venue: 'Media Studio / Room 202',
    activities: ['Morning assembly news broadcasts', 'Interviewing teachers & alumni', 'Publishing the "Emaudo Voice" wall journal', 'Photography coverage of sports'],
    achievements: ['Continuous publication of the termly Emaudo Beacon Newsletter']
  },
  {
    id: 'club-cultural',
    name: 'Cultural & Heritage Troupe',
    category: 'Arts',
    description: 'Celebrates rich Esan, Edo, and Nigerian traditional dances, folklore, folk music, drama, and cultural costumes during school celebrations and inter-school festivals.',
    coordinator: 'Mrs. F. Ighodalo',
    meetingDay: 'Thursdays',
    meetingTime: '2:15 PM – 3:30 PM',
    venue: 'School Amphitheatre / Open Grounds',
    activities: ['Traditional Esan dance choreography', 'Cultural drama presentations', 'Native language proverb quizzes', 'Costume & craft design'],
    achievements: ['Grand performance at 2024 ESSOSA Homecoming Ceremony']
  },
  {
    id: 'club-sports',
    name: 'Sports & Athletics Society',
    category: 'Sports',
    description: 'Coordinates inter-house football tournaments, track and field training, table tennis, volleyball, and physical fitness conditioning.',
    coordinator: 'Coach E. Friday',
    meetingDay: 'Tuesdays & Fridays',
    meetingTime: '3:00 PM – 4:30 PM',
    venue: 'Emaudo Sports Grounds & Football Pitch',
    activities: ['Sprint and relay drills', 'Football league fixtures', 'Table tennis competitions', 'Volleyball & handball training'],
    achievements: ['Runners-up in Edo State Secondary Schools Football Cup']
  },
  {
    id: 'club-prefects',
    name: 'Prefects Council & Student Leadership',
    category: 'Leadership',
    description: 'Elected and appointed student leaders (Head Boy, Head Girl, Assembly Prefect, Chapel/Mosque Prefect, Health Prefect, Sports Prefect) representing student welfare and upholding discipline.',
    coordinator: 'Vice Principal (Administration)',
    meetingDay: 'Alternate Mondays',
    meetingTime: '1:45 PM – 2:30 PM',
    venue: 'Administrative Conference Room',
    activities: ['Assembly coordination', 'Student welfare advocacy', 'Anti-bullying peer support', 'Campus cleanliness campaigns'],
    achievements: ['Zero-tolerance discipline framework and peer mentorship network']
  }
];

// ============================================================================
// ACADEMIC ACTIVITIES & SCHOOL LIFE
// ============================================================================
export const SCHOOL_ACTIVITIES = [
  {
    id: 'act-waec',
    title: 'WAEC / WASSCE & NECO SSCE Comprehensive Preparation',
    category: 'WAEC/NECO Prep',
    description: 'Intensive after-school coaching, syllabus coverage checkpoints, practical mock laboratory sessions, and 10-year past question analysis for SSS 3 students.',
    frequency: 'Daily during Second & Third Terms',
    targetAudience: 'SSS 3 & Private Candidates',
    keyHighlights: ['Weekend mock practicals in Physics, Chemistry, Biology', 'Theory answering technique workshops', 'Examiner feedback sessions']
  },
  {
    id: 'act-ca',
    title: 'Continuous Assessment (CA) & Formative Testing',
    category: 'Continuous Assessment',
    description: 'Structured bi-weekly class tests, homework assignments, group presentations, and mid-term assessments accounting for 40% of the termly score.',
    frequency: 'Continuous throughout 1st, 2nd, and 3rd Terms',
    targetAudience: 'JSS 1 through SSS 3',
    keyHighlights: ['CA 1 (15 Marks) + CA 2 (15 Marks) + Assignments/Punctuality (10 Marks)', 'Standardized grading rubrics', 'Instant feedback via Student Portal']
  },
  {
    id: 'act-tutorials',
    title: 'Remedial Tutorials & Extension Classes',
    category: 'Tutorials',
    description: 'Free targeted remedial classes for students needing additional guidance in Mathematics, English, Physics, and Chemistry.',
    frequency: 'Mondays to Thursdays (2:30 PM – 4:00 PM)',
    targetAudience: 'Identified students & aspiring distinctions',
    keyHighlights: ['Small-group tutor ratio (1:15)', 'Foundation rebuilding in algebra and phonetics', 'Peer tutoring pairings']
  },
  {
    id: 'act-competitions',
    title: 'Inter-House Academic Quiz & State Olympiads',
    category: 'Competitions',
    description: 'Annual battle of wits among Green, Blue, Red, and Yellow Houses spanning science, humanities, current affairs, and spelling.',
    frequency: 'Annual (Second Term)',
    targetAudience: 'All classes across Junior & Senior sections',
    keyHighlights: ['Live buzzer system', 'Trophies and academic scholarships awarded by ESSOSA alumni', 'Edo State competition team selection']
  }
];

export const SCHOOL_LIFE_DETAILS = {
  morningAssembly: {
    title: 'Morning Assembly & Character Formation',
    schedule: 'Mondays to Fridays: 7:45 AM – 8:15 AM (Prompt)',
    order: [
      '7:45 AM: Assembly Bell & Class Lining (Order of height and class arms)',
      '7:50 AM: Opening Prayer & National Anthem / School Anthem',
      '7:55 AM: National Pledge & Edo State Anthem',
      '8:00 AM: Moral Instruction / Principal’s Address & Thought for the Day',
      '8:10 AM: Press Club News Highlights & Urgent Announcements',
      '8:15 AM: March to Classrooms to traditional marching band rhythm'
    ],
    schoolAnthem: `Great Emaudo, fountain of light and truth,
Formed on Osimen Street to guide our youth.
With knowledge, honour, and virtue bright,
We strive for the peak, we walk in light.
Ambrose Alli's vision lives today,
Emaudo School leads the noble way!`
  },
  timetableSummary: {
    dayStart: '7:45 AM',
    assemblyEnd: '8:15 AM',
    periodDuration: '40 Minutes per period',
    periodsPerDay: 8,
    breakTime: '11:35 AM – 12:15 PM (40 Minutes Long Break)',
    closingTime: '2:00 PM (Regular) / 3:30 PM (Clubs & Tutorials)',
    periods: [
      { period: 'Assembly', time: '7:45 AM – 8:15 AM', activity: 'Devotion, Anthem, Moral Talk' },
      { period: 'Period 1', time: '8:15 AM – 8:55 AM', activity: 'Core Subject 1' },
      { period: 'Period 2', time: '8:55 AM – 9:35 AM', activity: 'Core Subject 2' },
      { period: 'Period 3', time: '9:35 AM – 10:15 AM', activity: 'Subject 3' },
      { period: 'Period 4', time: '10:15 AM – 10:55 AM', activity: 'Subject 4' },
      { period: 'Short Break', time: '10:55 AM – 11:05 AM', activity: '10-minute Refreshment' },
      { period: 'Period 5', time: '11:05 AM – 11:45 AM', activity: 'Laboratory Practical / Subject 5' },
      { period: 'Long Break', time: '11:45 AM – 12:25 PM', activity: 'Lunch, Library & Recreation' },
      { period: 'Period 6', time: '12:25 PM – 1:05 PM', activity: 'Subject 6' },
      { period: 'Period 7', time: '1:05 PM – 1:45 PM', activity: 'Subject 7' },
      { period: 'Period 8', time: '1:45 PM – 2:00 PM', activity: 'Class Teacher Form Period & Dismissal' },
      { period: 'After School', time: '2:15 PM – 3:30 PM', activity: 'Clubs, Remedial Tutorials & Sports' }
    ]
  },
  library: {
    name: 'Emaudo Secondary School Central Library',
    capacity: '120 seated students',
    holdings: 'Over 8,500 volumes covering WAEC textbooks, encyclopedias, African literature, science journals, past examination papers, and digital e-books.',
    hours: 'Monday – Friday: 8:00 AM to 4:00 PM',
    librarian: 'Mrs. R. Agbonlahor (MLS)'
  },
  laboratories: {
    scienceComplex: 'Ultra-Modern Science Laboratory Complex (Inaugurated 2017 with Chevron and partners)',
    ictCentre: 'Digital ICT Laboratory with 45 network-connected workstations and CBT simulation engine',
    technicalWorkshop: 'Introductory Technology & Technical Drawing Studio'
  },
  awardsAndAchievements: [
    { year: '2024', title: 'Top 5 Science School in Edo Central Senatorial District (STAN Fair)' },
    { year: '2023', title: '1st Place Winner in Esan Central Inter-School Debate League' },
    { year: '2023', title: 'Over 88% Credit Pass Rate in WASSCE (WAEC) & NECO Examinations' },
    { year: '2022', title: 'Edo State Secondary Schools Clean Green Campus Award' },
    { year: '2017', title: 'Commissioning of Chevron Ultra-Modern Science Laboratory Complex' },
    { year: '1986', title: 'Formal Elevation from Grade-Three to Grade-One Secondary School' },
    { year: '1985', title: 'First Pioneer Graduating Class of Emaudo Secondary School' }
  ]
};

// ============================================================================
// MASTER CLASS TIMETABLE SAMPLES
// ============================================================================
export const SAMPLE_TIMETABLE_ENTRIES = [
  // SSS 2 Science
  { id: 'tt-1', day: 'Monday', period: 1, time: '8:15 AM - 8:55 AM', className: 'SSS 2 Science', subject: 'Mathematics', teacherName: 'Mr. A. Momodu', room: 'Room 201' },
  { id: 'tt-2', day: 'Monday', period: 2, time: '8:55 AM - 9:35 AM', className: 'SSS 2 Science', subject: 'Physics', teacherName: 'Mr. C. Ebosele', room: 'Physics Lab' },
  { id: 'tt-3', day: 'Monday', period: 3, time: '9:35 AM - 10:15 AM', className: 'SSS 2 Science', subject: 'English Language', teacherName: 'Mrs. B. Okojie', room: 'Room 201' },
  { id: 'tt-4', day: 'Monday', period: 4, time: '10:15 AM - 10:55 AM', className: 'SSS 2 Science', subject: 'Chemistry', teacherName: 'Mr. C. Ebosele', room: 'Chemistry Lab' },
  { id: 'tt-5', day: 'Monday', period: 5, time: '11:05 AM - 11:45 AM', className: 'SSS 2 Science', subject: 'Biology Practical', teacherName: 'Mrs. F. Ighodalo', room: 'Biology Lab' },
  { id: 'tt-6', day: 'Monday', period: 6, time: '12:25 PM - 1:05 PM', className: 'SSS 2 Science', subject: 'Civic Education', teacherName: 'Mrs. F. Ighodalo', room: 'Room 201' },
  { id: 'tt-7', day: 'Monday', period: 7, time: '1:05 PM - 1:45 PM', className: 'SSS 2 Science', subject: 'Computer Studies', teacherName: 'Engr. S. Osas', room: 'ICT Centre' },
  // SSS 3 Arts
  { id: 'tt-8', day: 'Tuesday', period: 1, time: '8:15 AM - 8:55 AM', className: 'SSS 3 Arts', subject: 'Literature-in-English', teacherName: 'Mrs. B. Okojie', room: 'Room 302' },
  { id: 'tt-9', day: 'Tuesday', period: 2, time: '8:55 AM - 9:35 AM', className: 'SSS 3 Arts', subject: 'Government', teacherName: 'Mrs. F. Ighodalo', room: 'Room 302' },
  { id: 'tt-10', day: 'Tuesday', period: 3, time: '9:35 AM - 10:15 AM', className: 'SSS 3 Arts', subject: 'General Mathematics', teacherName: 'Mr. A. Momodu', room: 'Room 302' },
  { id: 'tt-11', day: 'Tuesday', period: 4, time: '10:15 AM - 10:55 AM', className: 'SSS 3 Arts', subject: 'Economics', teacherName: 'Mr. O. Imhansi', room: 'Room 302' },
  { id: 'tt-12', day: 'Tuesday', period: 5, time: '11:05 AM - 11:45 AM', className: 'SSS 3 Arts', subject: 'CRS / IRS', teacherName: 'Pastor J. Ekhator', room: 'Room 302' },
  // JSS 2A
  { id: 'tt-13', day: 'Wednesday', period: 1, time: '8:15 AM - 8:55 AM', className: 'JSS 2A', subject: 'Mathematics', teacherName: 'Mr. A. Momodu', room: 'Room 102' },
  { id: 'tt-14', day: 'Wednesday', period: 2, time: '8:55 AM - 9:35 AM', className: 'JSS 2A', subject: 'English Studies', teacherName: 'Mrs. B. Okojie', room: 'Room 102' },
  { id: 'tt-15', day: 'Wednesday', period: 3, time: '9:35 AM - 10:15 AM', className: 'JSS 2A', subject: 'Basic Science', teacherName: 'Mr. C. Ebosele', room: 'Room 102' },
  { id: 'tt-16', day: 'Wednesday', period: 4, time: '10:15 AM - 10:55 AM', className: 'JSS 2A', subject: 'Social Studies', teacherName: 'Mrs. F. Ighodalo', room: 'Room 102' },
  { id: 'tt-17', day: 'Wednesday', period: 5, time: '11:05 AM - 11:45 AM', className: 'JSS 2A', subject: 'Computer Studies', teacherName: 'Engr. S. Osas', room: 'ICT Centre' },
];

