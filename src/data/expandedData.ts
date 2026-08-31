import { 
  SmartNotification, 
  Exam, 
  ExamQuestion, 
  StudentExamSubmission, 
  DigitalLibraryItem, 
  TimetableSlot, 
  ExamTimetableEntry, 
  StudentAchievement, 
  SchoolMessage, 
  AlumniProfile 
} from '../types';

// ==========================================
// 1. SMART NOTIFICATIONS DATA
// ==========================================
export const MOCK_NOTIFICATIONS: SmartNotification[] = [
  {
    id: 'notif-1',
    title: 'School Resumption for 1st Term 2024/2025',
    message: 'All returning students (JSS 2 - SSS 3) and newly admitted students (JSS 1 & SSS 1 transfer) resume on Monday, September 16, 2024. Assembly begins promptly at 7:45 AM.',
    category: 'resumption',
    target_role: 'all',
    priority: 'high',
    created_at: '2024-09-08T08:00:00Z',
    is_read: false,
    action_label: 'View Resumption Protocols',
    action_url: 'news',
  },
  {
    id: 'notif-2',
    title: 'WAEC / SSCE Mock CBT Examination Schedule',
    message: 'Online CBT Mock examinations for SS 3 students in Mathematics, English Language, Physics, Chemistry, and Financial Accounting will open on the Student Portal from October 14, 2024.',
    category: 'exam',
    target_role: 'students',
    target_class: 'SS3',
    priority: 'high',
    created_at: '2024-09-10T10:30:00Z',
    is_read: false,
    action_label: 'Access CBT Exam Portal',
    action_url: 'portal',
  },
  {
    id: 'notif-3',
    title: 'Senior Chemistry Lab Practical Assignment Due',
    message: 'Reminder: SS 2 Chemistry practical report on Acid-Base Titration must be submitted to Mr. Akhere on or before Friday, 4:00 PM.',
    category: 'assignment',
    target_role: 'students',
    target_class: 'SS2',
    priority: 'normal',
    created_at: '2024-09-12T14:15:00Z',
    is_read: false,
    action_label: 'View Assignment Details',
    action_url: 'portal',
  },
  {
    id: 'notif-4',
    title: 'School Fees Clearance & Receipt Issuance',
    message: 'Parents and guardians are kindly reminded to ensure term tuition and examination levies are completed by the 3rd week of resumption. Digital receipts are available on the Parent Portal.',
    category: 'fee',
    target_role: 'parents',
    priority: 'normal',
    created_at: '2024-09-09T09:00:00Z',
    is_read: true,
    action_label: 'Check Tuition Status',
    action_url: 'portal',
  },
  {
    id: 'notif-5',
    title: '2023/2024 3rd Term Report Cards Released',
    message: 'Approved promotional examination results and term report cards for all classes are now published on the Student & Parent Portals.',
    category: 'result',
    target_role: 'all',
    priority: 'high',
    created_at: '2024-08-30T11:00:00Z',
    is_read: true,
    action_label: 'View Report Card',
    action_url: 'portal',
  },
  {
    id: 'notif-6',
    title: 'Annual Inter-House Sports & Cultural Gala',
    message: 'House meetings for Red, Blue, Green, and Yellow houses will commence this Thursday after 6th period. Parents and alumni are warmly invited to the grand finale.',
    category: 'event',
    target_role: 'all',
    priority: 'normal',
    created_at: '2024-09-05T13:00:00Z',
    is_read: false,
    action_label: 'View Event Calendar',
    action_url: 'events',
  },
  {
    id: 'notif-7',
    title: 'Safety Advisory: Rainy Season Campus Guidelines',
    message: 'Students are advised to avoid staying under tall trees during heavy downpours. Please use paved walkways across the science quadrangle.',
    category: 'emergency',
    target_role: 'all',
    priority: 'urgent',
    created_at: '2024-09-11T07:30:00Z',
    is_read: false,
  }
];

// ==========================================
// 2. ONLINE CBT EXAMINATIONS & QUESTIONS
// ==========================================
export const MOCK_EXAM_QUESTIONS: Record<string, ExamQuestion[]> = {
  'exam-math-ss2': [
    {
      id: 'q-m1',
      exam_id: 'exam-math-ss2',
      question_text: 'Solve the quadratic equation: 2x² - 5x + 2 = 0.',
      option_a: 'x = 1/2 or x = 2',
      option_b: 'x = -1/2 or x = -2',
      option_c: 'x = 1 or x = 4',
      option_d: 'x = 2 or x = 3',
      correct_option: 'A',
      explanation: 'Factorizing 2x² - 4x - x + 2 = 0 gives 2x(x - 2) - 1(x - 2) = 0 => (2x - 1)(x - 2) = 0. Thus x = 1/2 or x = 2.',
      points: 2
    },
    {
      id: 'q-m2',
      exam_id: 'exam-math-ss2',
      question_text: 'If log₁₀ 2 = 0.3010 and log₁₀ 3 = 0.4771, calculate log₁₀ 18 without using mathematical tables.',
      option_a: '1.2552',
      option_b: '1.1441',
      option_c: '1.3010',
      option_d: '0.9542',
      correct_option: 'A',
      explanation: '18 = 2 × 3² = log₁₀ 2 + 2 log₁₀ 3 = 0.3010 + 2(0.4771) = 0.3010 + 0.9542 = 1.2552.',
      points: 2
    },
    {
      id: 'q-m3',
      exam_id: 'exam-math-ss2',
      question_text: 'Find the 10th term of the Arithmetic Progression (A.P.): 3, 7, 11, 15, ...',
      option_a: '36',
      option_b: '39',
      option_c: '43',
      option_d: '40',
      correct_option: 'B',
      explanation: 'First term a = 3, common difference d = 4. T₁₀ = a + (10 - 1)d = 3 + 9(4) = 3 + 36 = 39.',
      points: 2
    },
    {
      id: 'q-m4',
      exam_id: 'exam-math-ss2',
      question_text: 'A chord of length 12 cm is drawn in a circle of radius 10 cm. Calculate the distance of the chord from the center of the circle.',
      option_a: '6 cm',
      option_b: '8 cm',
      option_c: '7 cm',
      option_d: '9 cm',
      correct_option: 'B',
      explanation: 'Using Pythagoras theorem: d² = r² - (half chord)² = 10² - 6² = 100 - 36 = 64. Thus d = √64 = 8 cm.',
      points: 2
    },
    {
      id: 'q-m5',
      exam_id: 'exam-math-ss2',
      question_text: 'Evaluate the trigonometric value: sin 30° + cos 60°.',
      option_a: '1/2',
      option_b: '1',
      option_c: '√3/2',
      option_d: '2',
      correct_option: 'B',
      explanation: 'sin 30° = 1/2 and cos 60° = 1/2. Therefore, 1/2 + 1/2 = 1.',
      points: 2
    }
  ],
  'exam-chem-ss2': [
    {
      id: 'q-c1',
      exam_id: 'exam-chem-ss2',
      question_text: 'Which of the following indicators is most suitable for titrating a weak acid against a strong base (e.g. CH₃COOH vs NaOH)?',
      option_a: 'Methyl Orange',
      option_b: 'Phenolphthalein',
      option_c: 'Litmus Paper',
      option_d: 'Universal Indicator',
      correct_option: 'B',
      explanation: 'Phenolphthalein has a pH range of 8.3 - 10.0, which perfectly matches the basic equivalence point of a weak acid and strong base titration.',
      points: 2
    },
    {
      id: 'q-c2',
      exam_id: 'exam-chem-ss2',
      question_text: 'Calculate the molar mass of hydrated copper(II) tetraoxosulphate(VI) pentahydrate, CuSO₄·5H₂O. [Cu=64, S=32, O=16, H=1]',
      option_a: '160 g/mol',
      option_b: '250 g/mol',
      option_c: '232 g/mol',
      option_d: '180 g/mol',
      correct_option: 'B',
      explanation: 'CuSO₄ = 64 + 32 + 4(16) = 160. 5H₂O = 5(18) = 90. Total = 160 + 90 = 250 g/mol.',
      points: 2
    },
    {
      id: 'q-c3',
      exam_id: 'exam-chem-ss2',
      question_text: 'According to Graham\'s Law of diffusion, the rate of diffusion of a gas is:',
      option_a: 'Directly proportional to its density',
      option_b: 'Inversely proportional to the square root of its vapour density',
      option_c: 'Directly proportional to its absolute temperature',
      option_d: 'Equal to its atmospheric pressure',
      correct_option: 'B',
      explanation: 'Graham\'s Law states that at constant temperature and pressure, the rate of diffusion of a gas is inversely proportional to the square root of its molar mass or vapour density.',
      points: 2
    },
    {
      id: 'q-c4',
      exam_id: 'exam-chem-ss2',
      question_text: 'What volume of 0.5 M HCl is required to neutralize 25.0 cm³ of 0.2 M NaOH solution?',
      option_a: '10.0 cm³',
      option_b: '12.5 cm³',
      option_c: '15.0 cm³',
      option_d: '20.0 cm³',
      correct_option: 'A',
      explanation: 'Using CₐVₐ / C_bV_b = nₐ / n_b => (0.5 × Vₐ) / (0.2 × 25) = 1/1 => 0.5 Vₐ = 5.0 => Vₐ = 10.0 cm³.',
      points: 2
    },
    {
      id: 'q-c5',
      exam_id: 'exam-chem-ss2',
      question_text: 'Which noble gas is used in filling incandescent electric light bulbs to prevent oxidation of the tungsten filament?',
      option_a: 'Helium',
      option_b: 'Neon',
      option_c: 'Argon',
      option_d: 'Krypton',
      correct_option: 'C',
      explanation: 'Argon is chemically unreactive (inert) and cheap, making it ideal for filling incandescent bulbs.',
      points: 2
    }
  ],
  'exam-eng-ss2': [
    {
      id: 'q-e1',
      exam_id: 'exam-eng-ss2',
      question_text: 'Choose the option that nearest in meaning to the underlined word: "The principal gave an *impassioned* speech at the valedictory service."',
      option_a: 'boring',
      option_b: 'emotional and fervent',
      option_c: 'brief',
      option_d: 'angry',
      correct_option: 'B',
      explanation: 'Impassioned means filled with or showing great emotion, fervor, or enthusiasm.',
      points: 2
    },
    {
      id: 'q-e2',
      exam_id: 'exam-eng-ss2',
      question_text: 'Complete the sentence with the most appropriate option: "Neither the class teacher nor the students _____ aware of the sudden timetable change."',
      option_a: 'was',
      option_b: 'were',
      option_c: 'is',
      option_d: 'are',
      correct_option: 'B',
      explanation: 'With "neither...nor", the verb agrees with the closer subject ("the students", which is plural), hence "were".',
      points: 2
    },
    {
      id: 'q-e3',
      exam_id: 'exam-eng-ss2',
      question_text: 'Identify the figure of speech in: "The trees danced joyfully to the rhythm of the wind."',
      option_a: 'Simile',
      option_b: 'Metaphor',
      option_c: 'Personification',
      option_d: 'Hyperbole',
      correct_option: 'C',
      explanation: 'Giving human characteristics (dancing joyfully) to non-human entities (trees) is personification.',
      points: 2
    },
    {
      id: 'q-e4',
      exam_id: 'exam-eng-ss2',
      question_text: 'Choose the word with the same vowel sound as the underlined letters in: *b<u>i</u>rd*.',
      option_a: 'beard',
      option_b: 'nurse',
      option_c: 'board',
      option_d: 'bread',
      correct_option: 'B',
      explanation: '"Bird" and "nurse" both contain the central long vowel sound /ɜː/.',
      points: 2
    },
    {
      id: 'q-e5',
      exam_id: 'exam-eng-ss2',
      question_text: 'Which sentence is punctuated correctly?',
      option_a: 'Although it rained heavily, we attended the physics practical.',
      option_b: 'Although it rained heavily we attended, the physics practical.',
      option_c: 'Although, it rained heavily we attended the physics practical.',
      option_d: 'Although it rained heavily; we attended the physics practical.',
      correct_option: 'A',
      explanation: 'A dependent introductory adverb clause followed by a comma before the main independent clause.',
      points: 2
    }
  ],
  'exam-ict-ss2': [
    {
      id: 'q-i1',
      exam_id: 'exam-ict-ss2',
      question_text: 'Which component is considered the primary brain and arithmetic-logic processing unit of a microcomputer?',
      option_a: 'Random Access Memory (RAM)',
      option_b: 'Central Processing Unit (CPU)',
      option_c: 'Hard Disk Drive (HDD)',
      option_d: 'Graphics Card (GPU)',
      correct_option: 'B',
      explanation: 'The CPU performs fundamental arithmetic, logical, control and input/output operations specified by computer instructions.',
      points: 2
    },
    {
      id: 'q-i2',
      exam_id: 'exam-ict-ss2',
      question_text: 'In Python programming, which keyword is used to define a reusable function?',
      option_a: 'func',
      option_b: 'function',
      option_c: 'def',
      option_d: 'lambda',
      correct_option: 'C',
      explanation: 'The `def` keyword begins a function definition header in Python (e.g. `def calculate_average(scores):`).',
      points: 2
    },
    {
      id: 'q-i3',
      exam_id: 'exam-ict-ss2',
      question_text: 'Which network topology connects all client devices directly to a central switch or hub?',
      option_a: 'Bus Topology',
      option_b: 'Star Topology',
      option_c: 'Ring Topology',
      option_d: 'Mesh Topology',
      correct_option: 'B',
      explanation: 'In a Star topology, each network host is connected to a central hub with a point-to-point connection.',
      points: 2
    },
    {
      id: 'q-i4',
      exam_id: 'exam-ict-ss2',
      question_text: 'What is the binary representation of the decimal number 25?',
      option_a: '11001',
      option_b: '10101',
      option_c: '11100',
      option_d: '10011',
      correct_option: 'A',
      explanation: '25 = 16 + 8 + 1 = 1×2⁴ + 1×2³ + 0×2² + 0×2¹ + 1×2⁰ = 11001 in binary.',
      points: 2
    },
    {
      id: 'q-i5',
      exam_id: 'exam-ict-ss2',
      question_text: 'Which cybersecurity measure encrypts web traffic between a user browser and school web portal?',
      option_a: 'FTP',
      option_b: 'HTTPS / TLS',
      option_c: 'HTTP',
      option_d: 'SMTP',
      correct_option: 'B',
      explanation: 'HTTPS (Hypertext Transfer Protocol Secure) encrypts communication using Transport Layer Security (TLS/SSL).',
      points: 2
    }
  ]
};

export const MOCK_EXAMS: Exam[] = [
  {
    id: 'exam-math-ss2',
    title: 'SS 2 General Mathematics 1st Term CBT Assessment',
    subject: 'Mathematics',
    class_level: 'SS 2',
    term: '1st Term',
    session: '2024/2025',
    duration_minutes: 15,
    total_questions: 5,
    pass_mark_percentage: 60,
    instructions: 'Answer all 5 questions. Each question carries 2 marks. Ensure you have rough calculation sheets ready before starting.',
    status: 'active',
    created_by: 'Mr. E. Akhere (HOD Mathematics)',
    created_at: '2024-09-10T09:00:00Z',
    questions: MOCK_EXAM_QUESTIONS['exam-math-ss2'],
  },
  {
    id: 'exam-chem-ss2',
    title: 'Senior Chemistry Volumetric Analysis & Gas Laws Quiz',
    subject: 'Chemistry',
    class_level: 'SS 2',
    term: '1st Term',
    session: '2024/2025',
    duration_minutes: 15,
    total_questions: 5,
    pass_mark_percentage: 60,
    instructions: 'Standard temperature and pressure constants apply. Choose the most accurate option.',
    status: 'active',
    created_by: 'Mrs. F. Omoigiade (Chemistry Faculty)',
    created_at: '2024-09-11T11:00:00Z',
    questions: MOCK_EXAM_QUESTIONS['exam-chem-ss2'],
  },
  {
    id: 'exam-eng-ss2',
    title: 'SS 2 English Language Lexis, Structure & Oral English',
    subject: 'English Language',
    class_level: 'SS 2',
    term: '1st Term',
    session: '2024/2025',
    duration_minutes: 15,
    total_questions: 5,
    pass_mark_percentage: 60,
    instructions: 'Read each prompt carefully and select the nearest in meaning or grammatically correct syntax.',
    status: 'active',
    created_by: 'Mr. K. Igiebor (HOD Languages)',
    created_at: '2024-09-12T10:00:00Z',
    questions: MOCK_EXAM_QUESTIONS['exam-eng-ss2'],
  },
  {
    id: 'exam-ict-ss2',
    title: 'SS 2 Computer Studies & Programming Fundamentals',
    subject: 'Computer Studies',
    class_level: 'SS 2',
    term: '1st Term',
    session: '2024/2025',
    duration_minutes: 15,
    total_questions: 5,
    pass_mark_percentage: 60,
    instructions: 'Covers CPU architecture, Python syntax, number systems, and network protocols.',
    status: 'active',
    created_by: 'Engr. D. Okosun (ICT Coordinator)',
    created_at: '2024-09-13T08:30:00Z',
    questions: MOCK_EXAM_QUESTIONS['exam-ict-ss2'],
  },
  {
    id: 'exam-waec-mock-ss3',
    title: 'WAEC / WASSCE Comprehensive All-Subjects Mock Preparation',
    subject: 'General Mock',
    class_level: 'SS 3',
    term: '1st Term',
    session: '2024/2025',
    duration_minutes: 45,
    total_questions: 20,
    pass_mark_percentage: 65,
    instructions: 'Full national curriculum mock test for all SS 3 candidates. Scheduled to open in 2 weeks.',
    status: 'upcoming',
    created_by: 'Academic Board & Examination Committee',
    created_at: '2024-09-01T08:00:00Z',
  }
];

export const MOCK_STUDENT_EXAM_HISTORY: StudentExamSubmission[] = [
  {
    id: 'sub-001',
    exam_id: 'exam-math-ss2',
    student_id: 'ESS/2024/0142',
    student_name: 'Osasere Emmanuel',
    class_name: 'SS 2 Science A',
    score: 10,
    total_marks: 10,
    percentage: 100,
    passed: true,
    answers: { 'q-m1': 'A', 'q-m2': 'A', 'q-m3': 'B', 'q-m4': 'B', 'q-m5': 'B' },
    time_spent_seconds: 412,
    submitted_at: '2024-09-14T14:22:00Z',
    approved: true,
    remarks: 'Outstanding performance! Demonstrates solid grasp of quadratic equations and logarithms.'
  },
  {
    id: 'sub-002',
    exam_id: 'exam-eng-ss2',
    student_id: 'ESS/2024/0142',
    student_name: 'Osasere Emmanuel',
    class_name: 'SS 2 Science A',
    score: 8,
    total_marks: 10,
    percentage: 80,
    passed: true,
    answers: { 'q-e1': 'B', 'q-e2': 'B', 'q-e3': 'C', 'q-e4': 'B', 'q-e5': 'B' },
    time_spent_seconds: 350,
    submitted_at: '2024-09-13T10:15:00Z',
    approved: true,
    remarks: 'Very good score. Review clause punctuation rules.'
  }
];

// ==========================================
// 3. DIGITAL LIBRARY RESOURCES
// ==========================================
export const MOCK_DIGITAL_LIBRARY: DigitalLibraryItem[] = [
  {
    id: 'lib-01',
    title: 'New General Mathematics for Senior Secondary Schools (Book 2)',
    author_or_publisher: 'M.F. Macrae, A.O. Kalejaiye, Pearson Education',
    subject: 'Mathematics',
    class_level: 'SS2',
    category: 'textbook',
    file_format: 'PDF',
    file_size: '14.2 MB',
    page_count: 320,
    download_url: '#',
    preview_summary: 'Comprehensive textbook covering quadratic equations, logarithms, trigonometry, circle geometry, statistics, and algebraic fractions with worked examples and exercise solutions.',
    topics_covered: ['Quadratic Equations', 'Logarithmic Computations', 'Trigonometric Ratios', 'Circle Theorems', 'Probability'],
    is_featured: true,
    downloads_count: 428,
    created_at: '2024-08-15T00:00:00Z'
  },
  {
    id: 'lib-02',
    title: 'WAEC / WASSCE Mathematics Past Questions & Step-by-Step Solutions (2015 - 2024)',
    author_or_publisher: 'Emaudo Secondary School Academic Board',
    subject: 'Mathematics',
    class_level: 'SS3',
    category: 'waec_past_question',
    file_format: 'PDF',
    file_size: '8.7 MB',
    page_count: 184,
    download_url: '#',
    preview_summary: '10 years of verified WAEC theory and objective questions with step-by-step marking scheme solutions, chief examiner comments, and common candidate pitfalls.',
    topics_covered: ['Algebra', 'Geometry & Trigonometry', 'Calculus Fundamentals', 'Statistics & Probability', 'Vectors'],
    is_featured: true,
    downloads_count: 615,
    created_at: '2024-08-20T00:00:00Z'
  },
  {
    id: 'lib-03',
    title: 'Senior Secondary Chemistry: Principles, Reactions & Practical Manual',
    author_or_publisher: 'S.T. Bajah, B.O. Onwu, African Science Publishers',
    subject: 'Chemistry',
    class_level: 'SS2',
    category: 'textbook',
    file_format: 'PDF',
    file_size: '18.5 MB',
    page_count: 290,
    download_url: '#',
    preview_summary: 'Covers physical, inorganic, and organic chemistry. Includes step-by-step laboratory guides for acid-base titrations, qualitative analysis of cations/anions, and chemical equilibrium.',
    topics_covered: ['Volumetric Analysis', 'Redox Reactions', 'Hydrocarbons', 'Periodic Table Periodic Trends', 'Thermochemistry'],
    is_featured: true,
    downloads_count: 340,
    created_at: '2024-08-18T00:00:00Z'
  },
  {
    id: 'lib-04',
    title: 'NECO Senior School Certificate Physics Past Papers & Model Answers (2018 - 2024)',
    author_or_publisher: 'Edo State Science Educators Forum',
    subject: 'Physics',
    class_level: 'SS3',
    category: 'neco_past_question',
    file_format: 'PDF',
    file_size: '9.3 MB',
    page_count: 140,
    download_url: '#',
    preview_summary: 'Authentic NECO SSCE Physics papers covering mechanics, optics, wave motion, electromagnetism, and modern atomic physics with graphical analysis solutions.',
    topics_covered: ['Optics & Lenses', 'Electric Circuits', 'Hooke\'s Law & Mechanics', 'Radioactivity', 'Wave Motion'],
    is_featured: false,
    downloads_count: 289,
    created_at: '2024-08-22T00:00:00Z'
  },
  {
    id: 'lib-05',
    title: 'Comprehensive English Grammar & Composition for Secondary Schools',
    author_or_publisher: 'J. Eyisi, University Press Plc',
    subject: 'English Language',
    class_level: 'All Levels',
    category: 'textbook',
    file_format: 'PDF',
    file_size: '11.1 MB',
    page_count: 245,
    download_url: '#',
    preview_summary: 'Essential reference for English grammar, concord rules, lexis and structure, idioms, essay writing techniques, formal letter writing, and summary writing.',
    topics_covered: ['Sentence Concord', 'Essay Writing Techniques', 'Oral English Vowel Sounds', 'Comprehension Strategies', 'Direct & Indirect Speech'],
    is_featured: true,
    downloads_count: 512,
    created_at: '2024-08-10T00:00:00Z'
  },
  {
    id: 'lib-06',
    title: 'Junior Secondary Basic Science & Technology Integrated Notes (JSS 1 - 3)',
    author_or_publisher: 'Emaudo Secondary School Basic Science Faculty',
    subject: 'Science',
    class_level: 'JSS3',
    category: 'class_note',
    file_format: 'PDF',
    file_size: '6.4 MB',
    page_count: 110,
    download_url: '#',
    preview_summary: 'Structured revision notes covering Basic Science, Basic Technology, Physical Health Education, and Computer Studies for BECE / Junior WAEC candidates.',
    topics_covered: ['Living and Non-Living Things', 'Energy & Power', 'Woodwork & Metalwork Tools', 'Computer Systems', 'Environmental Health'],
    is_featured: false,
    downloads_count: 195,
    created_at: '2024-08-25T00:00:00Z'
  },
  {
    id: 'lib-07',
    title: 'Chevron Science Laboratory Manual & Experimental Safety Protocol',
    author_or_publisher: 'Emaudo Secondary School Science Department',
    subject: 'Science',
    class_level: 'All Levels',
    category: 'science_lab_guide',
    file_format: 'PDF',
    file_size: '4.8 MB',
    page_count: 65,
    download_url: '#',
    preview_summary: 'Standard operating procedures for Physics, Chemistry, and Biology laboratories at Emaudo Secondary School. Safety protocols, reagent handling, and specimen preparation.',
    topics_covered: ['Lab Safety Rules', 'Bunsen Burner Operation', 'Microscope Usage', 'Chemical Spill Protocols', 'Apparatus Cleaning'],
    is_featured: false,
    downloads_count: 230,
    created_at: '2024-08-28T00:00:00Z'
  }
];

// ==========================================
// 4. TIMETABLE DATA & EXAM TIMETABLE
// ==========================================
export const MOCK_TIMETABLE_SLOTS: TimetableSlot[] = [
  // MONDAY - SS 2 Science A
  { id: 't-1', day: 'Monday', period: 1, time: '08:00 - 08:45 AM', className: 'SS 2 Science A', subject: 'Mathematics', teacherName: 'Mr. E. Akhere', room: 'Hall 3' },
  { id: 't-2', day: 'Monday', period: 2, time: '08:45 - 09:30 AM', className: 'SS 2 Science A', subject: 'Mathematics', teacherName: 'Mr. E. Akhere', room: 'Hall 3' },
  { id: 't-3', day: 'Monday', period: 3, time: '09:30 - 10:15 AM', className: 'SS 2 Science A', subject: 'English Language', teacherName: 'Mr. K. Igiebor', room: 'Hall 3' },
  { id: 't-4', day: 'Monday', period: 4, time: '10:15 - 11:00 AM', className: 'SS 2 Science A', subject: 'Physics', teacherName: 'Mr. O. Emmanuel', room: 'Physics Lab' },
  { id: 't-5', day: 'Monday', period: 5, time: '11:30 - 12:15 PM', className: 'SS 2 Science A', subject: 'Chemistry', teacherName: 'Mrs. F. Omoigiade', room: 'Chemistry Lab' },
  { id: 't-6', day: 'Monday', period: 6, time: '12:15 - 01:00 PM', className: 'SS 2 Science A', subject: 'Biology', teacherName: 'Dr. P. Akhigbe', room: 'Biology Lab' },
  { id: 't-7', day: 'Monday', period: 7, time: '01:00 - 01:45 PM', className: 'SS 2 Science A', subject: 'Computer Studies / ICT', teacherName: 'Engr. D. Okosun', room: 'ICT Centre' },
  { id: 't-8', day: 'Monday', period: 8, time: '01:45 - 02:30 PM', className: 'SS 2 Science A', subject: 'Civic Education', teacherName: 'Mrs. A. Momoh', room: 'Hall 3' },

  // TUESDAY
  { id: 't-9', day: 'Tuesday', period: 1, time: '08:00 - 08:45 AM', className: 'SS 2 Science A', subject: 'Chemistry Practical', teacherName: 'Mrs. F. Omoigiade', room: 'Chemistry Lab' },
  { id: 't-10', day: 'Tuesday', period: 2, time: '08:45 - 09:30 AM', className: 'SS 2 Science A', subject: 'Chemistry Practical', teacherName: 'Mrs. F. Omoigiade', room: 'Chemistry Lab' },
  { id: 't-11', day: 'Tuesday', period: 3, time: '09:30 - 10:15 AM', className: 'SS 2 Science A', subject: 'English Language', teacherName: 'Mr. K. Igiebor', room: 'Hall 3' },
  { id: 't-12', day: 'Tuesday', period: 4, time: '10:15 - 11:00 AM', className: 'SS 2 Science A', subject: 'Agricultural Science', teacherName: 'Mr. B. Ojeifo', room: 'Hall 3' },
  { id: 't-13', day: 'Tuesday', period: 5, time: '11:30 - 12:15 PM', className: 'SS 2 Science A', subject: 'Mathematics', teacherName: 'Mr. E. Akhere', room: 'Hall 3' },
  { id: 't-14', day: 'Tuesday', period: 6, time: '12:15 - 01:00 PM', className: 'SS 2 Science A', subject: 'Economics', teacherName: 'Mr. S. Okojie', room: 'Hall 3' },
  { id: 't-15', day: 'Tuesday', period: 7, time: '01:00 - 01:45 PM', className: 'SS 2 Science A', subject: 'Further Mathematics', teacherName: 'Mr. E. Akhere', room: 'Hall 3' },
  { id: 't-16', day: 'Tuesday', period: 8, time: '01:45 - 02:30 PM', className: 'SS 2 Science A', subject: 'Library / Independent Study', teacherName: 'Librarian', room: 'School Library' },

  // WEDNESDAY
  { id: 't-17', day: 'Wednesday', period: 1, time: '08:00 - 08:45 AM', className: 'SS 2 Science A', subject: 'Physics Practical', teacherName: 'Mr. O. Emmanuel', room: 'Physics Lab' },
  { id: 't-18', day: 'Wednesday', period: 2, time: '08:45 - 09:30 AM', className: 'SS 2 Science A', subject: 'Physics Practical', teacherName: 'Mr. O. Emmanuel', room: 'Physics Lab' },
  { id: 't-19', day: 'Wednesday', period: 3, time: '09:30 - 10:15 AM', className: 'SS 2 Science A', subject: 'Biology', teacherName: 'Dr. P. Akhigbe', room: 'Biology Lab' },
  { id: 't-20', day: 'Wednesday', period: 4, time: '10:15 - 11:00 AM', className: 'SS 2 Science A', subject: 'Technical Drawing', teacherName: 'Mr. T. Oshoma', room: 'Tech Workshop' },
  { id: 't-21', day: 'Wednesday', period: 5, time: '11:30 - 12:15 PM', className: 'SS 2 Science A', subject: 'English Comprehension', teacherName: 'Mr. K. Igiebor', room: 'Hall 3' },
  { id: 't-22', day: 'Wednesday', period: 6, time: '12:15 - 01:00 PM', className: 'SS 2 Science A', subject: 'Mathematics', teacherName: 'Mr. E. Akhere', room: 'Hall 3' },
  { id: 't-23', day: 'Wednesday', period: 7, time: '01:00 - 02:30 PM', className: 'SS 2 Science A', subject: 'Clubs & Societies / JET Club', teacherName: 'Coordinators', room: 'Campus Quad' },

  // THURSDAY
  { id: 't-24', day: 'Thursday', period: 1, time: '08:00 - 08:45 AM', className: 'SS 2 Science A', subject: 'Mathematics', teacherName: 'Mr. E. Akhere', room: 'Hall 3' },
  { id: 't-25', day: 'Thursday', period: 2, time: '08:45 - 09:30 AM', className: 'SS 2 Science A', subject: 'Biology Practical', teacherName: 'Dr. P. Akhigbe', room: 'Biology Lab' },
  { id: 't-26', day: 'Thursday', period: 3, time: '09:30 - 10:15 AM', className: 'SS 2 Science A', subject: 'Biology Practical', teacherName: 'Dr. P. Akhigbe', room: 'Biology Lab' },
  { id: 't-27', day: 'Thursday', period: 4, time: '10:15 - 11:00 AM', className: 'SS 2 Science A', subject: 'English Essay Writing', teacherName: 'Mr. K. Igiebor', room: 'Hall 3' },
  { id: 't-28', day: 'Thursday', period: 5, time: '11:30 - 12:15 PM', className: 'SS 2 Science A', subject: 'Chemistry', teacherName: 'Mrs. F. Omoigiade', room: 'Hall 3' },
  { id: 't-29', day: 'Thursday', period: 6, time: '12:15 - 01:00 PM', className: 'SS 2 Science A', subject: 'Physics', teacherName: 'Mr. O. Emmanuel', room: 'Hall 3' },
  { id: 't-30', day: 'Thursday', period: 7, time: '01:00 - 01:45 PM', className: 'SS 2 Science A', subject: 'Computer Studies / Coding', teacherName: 'Engr. D. Okosun', room: 'ICT Centre' },
  { id: 't-31', day: 'Thursday', period: 8, time: '01:45 - 02:30 PM', className: 'SS 2 Science A', subject: 'Civic Education', teacherName: 'Mrs. A. Momoh', room: 'Hall 3' },

  // FRIDAY
  { id: 't-32', day: 'Friday', period: 1, time: '08:00 - 08:45 AM', className: 'SS 2 Science A', subject: 'General Assembly & Moral Instructions', teacherName: 'Principal', room: 'Assembly Ground' },
  { id: 't-33', day: 'Friday', period: 2, time: '08:45 - 09:30 AM', className: 'SS 2 Science A', subject: 'Further Mathematics', teacherName: 'Mr. E. Akhere', room: 'Hall 3' },
  { id: 't-34', day: 'Friday', period: 3, time: '09:30 - 10:15 AM', className: 'SS 2 Science A', subject: 'Agricultural Science', teacherName: 'Mr. B. Ojeifo', room: 'School Farm' },
  { id: 't-35', day: 'Friday', period: 4, time: '10:15 - 11:00 AM', className: 'SS 2 Science A', subject: 'Economics', teacherName: 'Mr. S. Okojie', room: 'Hall 3' },
  { id: 't-36', day: 'Friday', period: 5, time: '11:30 - 01:00 PM', className: 'SS 2 Science A', subject: 'Sports, Physical Health & Games', teacherName: 'Coach Osemwegie', room: 'Sports Ground' }
];

export const MOCK_EXAM_TIMETABLE: ExamTimetableEntry[] = [
  {
    id: 'ext-1',
    exam_type: 'Terminal Exam',
    date: '2024-11-25',
    day_name: 'Monday',
    time: '09:00 - 11:30 AM',
    subject: 'General Mathematics (Paper 1 & 2)',
    paper_code: 'MTH 201',
    class_level: 'SS 2',
    venue: 'Main Examination Hall A',
    invigilator: 'Mr. E. Akhere / Mrs. A. Momoh'
  },
  {
    id: 'ext-2',
    exam_type: 'Terminal Exam',
    date: '2024-11-26',
    day_name: 'Tuesday',
    time: '09:00 - 12:00 PM',
    subject: 'English Language (Essay, Lexis & Orals)',
    paper_code: 'ENG 201',
    class_level: 'SS 2',
    venue: 'Main Examination Hall A',
    invigilator: 'Mr. K. Igiebor / Mr. S. Okojie'
  },
  {
    id: 'ext-3',
    exam_type: 'Terminal Exam',
    date: '2024-11-27',
    day_name: 'Wednesday',
    time: '09:00 - 11:45 AM',
    subject: 'Physics (Theory & Practical Alternative)',
    paper_code: 'PHY 201',
    class_level: 'SS 2',
    venue: 'Chevron Science Laboratory',
    invigilator: 'Mr. O. Emmanuel / Engr. D. Okosun'
  },
  {
    id: 'ext-4',
    exam_type: 'Terminal Exam',
    date: '2024-11-28',
    day_name: 'Thursday',
    time: '09:00 - 11:45 AM',
    subject: 'Chemistry (Theory & Titration Practical)',
    paper_code: 'CHM 201',
    class_level: 'SS 2',
    venue: 'Chevron Science Laboratory',
    invigilator: 'Mrs. F. Omoigiade / Dr. P. Akhigbe'
  },
  {
    id: 'ext-5',
    exam_type: 'Terminal Exam',
    date: '2024-11-29',
    day_name: 'Friday',
    time: '09:00 - 11:00 AM',
    subject: 'Computer Studies / ICT CBT Assessment',
    paper_code: 'ICT 201',
    class_level: 'SS 2',
    venue: 'ICT E-Testing Centre',
    invigilator: 'Engr. D. Okosun / Tech Assistants'
  }
];

// ==========================================
// 5. STUDENT ACHIEVEMENTS & HONOURS
// ==========================================
export const MOCK_ACHIEVEMENTS: StudentAchievement[] = [
  {
    id: 'ach-1',
    student_name: 'Osasere Emmanuel',
    class_name: 'SS 2 Science',
    year: '2024',
    category: 'Academic Excellence',
    award_title: 'Overall Best Academic Student (1st Term)',
    competition_or_event: 'Annual Academic Honors Day',
    description: 'Achieved a terminal average of 92.4% with A1 distinctions across all science and core subjects, winning the Principal\'s Gold Crest Trophy.',
    rank_or_medal: '1st Position (Gold Crest Award)',
    badge_color: 'amber',
    is_featured: true
  },
  {
    id: 'ach-2',
    student_name: 'Destiny Efeosa',
    class_name: 'SS 3 Science',
    year: '2024',
    category: 'STEM & Olympiad',
    award_title: '1st Prize Winner - Edo Central STEM Competition',
    competition_or_event: 'National Mathematical Centre (NMC) Olympiad',
    description: 'Represented Esan West Local Government Area and won 1st position in the Senior Physics and Mathematics category.',
    rank_or_medal: '1st Prize (State Finalist)',
    badge_color: 'emerald',
    is_featured: true
  },
  {
    id: 'ach-3',
    student_name: 'Blessing Omoruyi & Team',
    class_name: 'SS 2 Arts & Commercial',
    year: '2024',
    category: 'Debate & Literary',
    award_title: 'Edo State Inter-School Debate Champions',
    competition_or_event: 'Edo State Ministry of Education Secondary Schools Debate',
    description: 'Clinched the championship trophy speaking on "Artificial Intelligence and the Future of Secondary Education in Developing Nations".',
    rank_or_medal: 'State Champions (Trophy & Cash Grant)',
    badge_color: 'blue',
    is_featured: true
  },
  {
    id: 'ach-4',
    student_name: 'Eromosele Emmanuel',
    class_name: 'JSS 1A',
    year: '2024',
    category: 'Academic Excellence',
    award_title: 'Best Junior Secondary Pioneer Scholar',
    competition_or_event: 'Junior School Assessment Showcase',
    description: 'Ranked 1st in JSS 1 with 91.8% average and distinction scores in Basic Science, Basic Technology, and Mathematics.',
    rank_or_medal: '1st Position JSS 1',
    badge_color: 'amber',
    is_featured: false
  },
  {
    id: 'ach-5',
    student_name: 'Emaudo Senior Football & Track Squad (Green House)',
    class_name: 'All School Houses',
    year: '2024',
    category: 'Sports & Athletics',
    award_title: 'Inter-House Athletics & Football Champions',
    competition_or_event: 'Annual Emaudo Inter-House Sports Festival',
    description: 'Set a new school record in the 4x100m senior boys relay (43.2s) and won the Ambrose Alli Memorial Football Trophy.',
    rank_or_medal: 'Overall Champion House (Gold Cup)',
    badge_color: 'emerald',
    is_featured: false
  },
  {
    id: 'ach-6',
    student_name: 'Goodluck Ighodaro',
    class_name: 'SS 3 Science (Class of 2024)',
    year: '2024',
    category: 'WAEC/NECO Distinction',
    award_title: 'Straight 8 A1 Distinctions in WASSCE 2024',
    competition_or_event: 'West African Examinations Council (WAEC)',
    description: 'Secured 8 A1s in Further Maths, General Maths, Physics, Chemistry, Biology, English, Civic Education, and Technical Drawing.',
    rank_or_medal: 'Top 0.1% National WAEC Distinction',
    badge_color: 'purple',
    is_featured: true
  }
];

// ==========================================
// 6. SCHOOL COMMUNICATION & MESSAGES
// ==========================================
export const MOCK_MESSAGES: SchoolMessage[] = [
  {
    id: 'msg-1',
    sender_id: 'teacher-akhigbe',
    sender_name: 'Mr. E. Akhere (Physics / Maths Faculty)',
    sender_role: 'teacher',
    recipient_id: 'parent-emmanuel',
    recipient_name: 'Chief & Mrs. O. Emmanuel',
    recipient_role: 'parent',
    ward_id: 'ESS/2024/0142',
    ward_name: 'Osasere Emmanuel',
    subject: 'Commendation on Physics Practical & Olympiad Selection',
    message: 'Good day Chief & Mrs. Emmanuel. I am pleased to inform you that Osasere showed remarkable diligence in this week\'s Light and Optics practicals. We have also shortlisted him to represent Emaudo Secondary School in the upcoming Edo State STEM Olympiad. Warm regards.',
    category: 'academic',
    created_at: '2024-09-12T14:30:00Z',
    is_read: true
  },
  {
    id: 'msg-2',
    sender_id: 'parent-emmanuel',
    sender_name: 'Chief & Mrs. O. Emmanuel',
    sender_role: 'parent',
    recipient_id: 'teacher-akhigbe',
    recipient_name: 'Mr. E. Akhere (Physics / Maths Faculty)',
    recipient_role: 'teacher',
    ward_id: 'ESS/2024/0142',
    ward_name: 'Osasere Emmanuel',
    subject: 'RE: Commendation on Physics Practical & Olympiad Selection',
    message: 'Thank you very much Mr. Akhere. We truly appreciate the dedication of the teachers and administration at Emaudo Secondary School. We will support Osasere with all necessary revision materials at home.',
    category: 'academic',
    created_at: '2024-09-12T17:10:00Z',
    is_read: true
  },
  {
    id: 'msg-3',
    sender_id: 'admin-principal',
    sender_name: 'Principal\'s Office / Administration',
    sender_role: 'admin',
    recipient_id: 'parent-emmanuel',
    recipient_name: 'Chief & Mrs. O. Emmanuel',
    recipient_role: 'parent',
    ward_id: 'ESS/2024/0142',
    ward_name: 'Osasere Emmanuel',
    subject: 'Parent-Teacher Association (PTA) General Meeting Notice',
    message: 'Dear Esteemed Parents and Guardians, the first term PTA general meeting will hold on Saturday, October 19, 2024, at 10:00 AM at the School Assembly Hall. Agenda includes school laboratory modernization and student welfare.',
    category: 'general',
    created_at: '2024-09-10T08:00:00Z',
    is_read: false
  }
];

// ==========================================
// 7. ALUMNI PROFILES & MENTORSHIP
// ==========================================
export const MOCK_ALUMNI_PROFILES: AlumniProfile[] = [
  {
    id: 'alum-1',
    full_name: 'Dr. Osaze Akhere, MBBS, FWACS',
    grad_year: '1995',
    set_name: 'Class of 1995',
    profession: 'Consultant Neurosurgeon & Medical Director',
    company_or_institution: 'University of Benin Teaching Hospital (UBTH)',
    city: 'Benin City',
    country: 'Nigeria',
    email: 'dr.osaze.akhere@gmail.com',
    bio: 'Pioneer student of the late Prof. Ambrose Alli educational vision. Graduated with top distinctions in sciences from Emaudo Secondary School before studying Medicine and Surgery. Passionate about medical outreach and student mentorship in Esanland.',
    achievements: 'Sponsored the 2022 Senior Science Laboratory Reagent Fund; Annual scholarship sponsor for best graduating science student.',
    chapter: 'Benin City Chapter',
    mentorship_available: true,
    mentorship_fields: ['Medicine & Surgery', 'Public Health', 'STEM Disciplines'],
    approved: true,
    created_at: '2024-05-10T00:00:00Z'
  },
  {
    id: 'alum-2',
    full_name: 'Engr. (Mrs.) Blessing Ighodaro-Eromosele, FNSE',
    grad_year: '2001',
    set_name: 'Class of 2001',
    profession: 'Senior Principal Petroleum & Energy Engineer',
    company_or_institution: 'Chevron Nigeria / West Africa Energy Hub',
    city: 'Lagos & Port Harcourt',
    country: 'Nigeria',
    email: 'b.ighodaro.energy@outlook.com',
    bio: 'Former Head Girl of Emaudo Secondary School (2000/2001 session). First Class Honours graduate in Mechanical Engineering. Champions women in STEM and youth technology literacy in Edo State.',
    achievements: 'Facilitated Chevron Nigeria CSR educational grant and donated 20 modern laptops to Emaudo ICT centre.',
    chapter: 'Lagos State Chapter',
    mentorship_available: true,
    mentorship_fields: ['Engineering', 'Oil & Gas', 'Women in STEM', 'Career Strategy'],
    approved: true,
    created_at: '2024-06-12T00:00:00Z'
  },
  {
    id: 'alum-3',
    full_name: 'Barrister Kenneth O. Okojie, LL.M, SAN',
    grad_year: '1991',
    set_name: 'Class of 1991',
    profession: 'Senior Advocate of Nigeria & Constitutional Law Scholar',
    company_or_institution: 'Okojie & Partners Legal Practitioners',
    city: 'Abuja (FCT)',
    country: 'Nigeria',
    email: 'kenneth.okojie.san@law.ng',
    bio: 'Graduated from Emaudo Secondary School with distinctions in Arts and Literature. Read Law at Ambrose Alli University, Ekpoma, before advancing to Harvard Law School. Dedicated supporter of secondary school debate clubs.',
    achievements: 'Endowed the Annual Emaudo Inter-School Literary & Debate Championship with a N500,000 prize grant.',
    chapter: 'Abuja (FCT) Chapter',
    mentorship_available: true,
    mentorship_fields: ['Law & Jurisprudence', 'Public Policy', 'Advocacy', 'Leadership'],
    approved: true,
    created_at: '2024-04-18T00:00:00Z'
  },
  {
    id: 'alum-4',
    full_name: 'Victor E. Momoh, M.Sc.',
    grad_year: '2012',
    set_name: 'Class of 2012',
    profession: 'Staff Software Engineer & Cloud Solutions Architect',
    company_or_institution: 'Google EMEA / FinTech Innovations',
    city: 'London & Ekpoma',
    country: 'United Kingdom',
    email: 'victor.momoh.tech@gmail.com',
    bio: 'Passionate software developer who learned his first lines of code at Emaudo Secondary School computer club. Built fintech infrastructure handling millions of daily transactions across Africa and Europe.',
    achievements: 'Coordinates digital skills bootcamps for senior students in Ekpoma; co-founded Emaudo Tech Mentors network.',
    chapter: 'UK & Europe Diaspora',
    mentorship_available: true,
    mentorship_fields: ['Software Engineering', 'Artificial Intelligence', 'Cloud Architecture', 'Global Tech Careers'],
    approved: true,
    created_at: '2024-07-01T00:00:00Z'
  }
];
