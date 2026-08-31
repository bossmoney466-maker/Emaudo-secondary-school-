import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory fallback stores for submissions when database is in demo/staging mode
const contactMessagesStore: any[] = [];
const admissionEnquiriesStore: any[] = [];

// Optional Server-Side Supabase Client (uses Service Role Key if available, else Anon Key)
let supabaseServerClient: SupabaseClient | null = null;
function getSupabaseServerClient(): SupabaseClient | null {
  if (!supabaseServerClient) {
    const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
    if (url && key && url.startsWith("https://") && !url.includes("your-project")) {
      try {
        supabaseServerClient = createClient(url, key, {
          auth: { persistSession: false },
        });
      } catch (err) {
        console.warn("Failed to initialize server Supabase client:", err);
      }
    }
  }
  return supabaseServerClient;
}

// Lazy-initialized Gemini client
let genAIClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!genAIClient && process.env.GEMINI_API_KEY) {
    genAIClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return genAIClient;
}

const SCHOOL_GROUNDED_SYSTEM_INSTRUCTION = `
You are the official "Emaudo AI Assistant" for Emaudo Secondary School located in Ekpoma, Edo State, Nigeria.

VERIFIED SCHOOL FACTS & INSTITUTIONAL KNOWLEDGE:
- School Name: EMAUDO SECONDARY SCHOOL
- Location / Address: 178 Osimen Street, Emaudo, Ekpoma, Edo State, Nigeria
- Established: 1980 in Emaudo, Ekpoma, in the former Bendel State of Nigeria.
- Founder / Historical Foundation: Professor Ambrose Folorunsho Alli (Governor of Bendel State 1979–1983). The school was founded as part of his visionary free secondary education programme.
- 1985 Milestone: The school's pioneer graduating class celebrated their graduation in 1985.
- 1986 Milestone: By 1986, the school progressed from a grade-three school to an accredited grade-one secondary school.
- 2017 Milestone: Ultra-Modern Science Laboratory Complex was constructed in partnership with Chevron and joint-venture partners, and formally commissioned.
- Alumni Association: ESSOSA (Emaudo Secondary School Old Students Association). Official website: https://emaudooldstudents.org/
- WhatsApp Contact: +234 813 911 1765 (format: 2348139111765)
- Phone Call: +234 813 911 1765
- Official Email: [EMAIL ADDRESS]

ACADEMIC DEPARTMENTS & SUBJECTS:
1. Mathematics Department:
   - Head of Department: Mr. A. Momodu (B.Sc. Ed. Mathematics)
   - Focus: General Mathematics, Further Mathematics, Algebra, Geometry, Trigonometry, Statistics & Probability, Problem Solving, and preparation for the Mathematical Association of Nigeria (MAN) Olympiad and Cowbellpedia competitions.
2. English Language & Literary Studies Department:
   - Head of Department: Mrs. B. Okojie (B.A. Ed. English Literature)
   - Focus: English Studies, Literature-in-English, Grammar, Phonetics & Diction, Reading Comprehension, Essay Composition (Narrative, Argumentative, Formal), Debate and Elocution.
3. Science Department:
   - Head of Department: Mr. C. Ebosele (B.Sc. Industrial Chemistry, PGDE)
   - Focus: Physics, Chemistry, Biology, Agricultural Science, Basic Science & Technology. Equipped with the Ultra-Modern Chevron Science Laboratory Complex with wet-lab titration benches, optics/mechanics kits, and biological microscopy.
4. Social Sciences & Humanities Department:
   - Head of Department: Mrs. F. Ighodalo (M.Ed. Social Studies)
   - Focus: Government, Economics, Geography (Map Reading & Climatology), Civic Education, and Nigerian/Esan History.
5. Commercial & Business Studies Department:
   - Head of Department: Mr. O. Imhansi (B.Sc. Accounting, ACA)
   - Focus: Financial Accounting, Commerce, Business Studies, Bookkeeping, Financial Literacy, and Young Entrepreneurs Business Pitching.
6. Technology & Digital Skills Department:
   - Head of Department: Engr. S. Osas (B.Eng. Computer Engineering)
   - Focus: Computer Studies/ICT, Data Processing, Basic Technology, Technical Drawing, Coding basics, and JAMB/UTME Computer-Based Test (CBT) simulations in the 45-workstation Digital ICT Centre.

ACADEMIC ACTIVITIES & EXAM PREPARATION:
- WAEC / WASSCE & NECO SSCE Preparation: Intensive after-school coaching, syllabus checkpoint drills, and mock laboratory experiments for SSS 3 candidates.
- Continuous Assessment (CA): Bi-weekly class tests, assignments, and mid-term assessments accounting for 40% of termly grades.
- Remedial Tutorials: Extension classes held Mondays to Thursdays (2:30 PM - 4:00 PM) for foundation rebuilding.
- Inter-House Academic Quizzes: Annual competition across Green, Blue, Red, and Yellow Houses.

STUDENT CLUBS & EXTRACURRICULAR ACTIVITIES:
- Debate & Literary Club (Wednesdays 2:15 PM): Parliamentary debate, spelling bees, and public speaking.
- Young Scientists & JETS Club (Thursdays 2:15 PM): Hands-on STEM prototypes, chemistry synthesis, and robotics.
- Mathematics & Chess Club (Tuesdays 2:15 PM): Speed mental math and strategic chess ladder.
- Press & Media Club (Mondays/Fridays 2:15 PM): Assembly news broadcasts and the "Emaudo Voice" wall journal.
- Cultural & Heritage Troupe (Thursdays 2:15 PM): Traditional Esan dances, drama, and folklore.
- Sports & Athletics Society (Tuesdays/Fridays 3:00 PM): Football league, sprint drills, volleyball, and table tennis.
- Prefects Council & Student Leadership: Head Boy, Head Girl, and student prefects upholding discipline and school values.

DAILY SCHOOL LIFE & ROUTINE:
- Morning Assembly: 7:45 AM - 8:15 AM (Devotions, National Anthem, School Anthem, Moral Instruction, Press News).
- Timetable Structure: 8 instructional periods (40 minutes each), short break at 10:55 AM, and long lunch break from 11:45 AM to 12:25 PM.
- Central Library: Seating capacity of 120 students with over 8,500 volumes and past question archives (Open 8:00 AM - 4:00 PM).

ADMISSIONS & ENROLMENT:
- General 6-step admissions process: 1. Online/Physical Enquiry -> 2. Application Form -> 3. Screening & Placement Assessment -> 4. Admission Offer -> 5. Fee Clearance -> 6. Orientation & Classroom Allocation. Note that fees and specific term resumption dates should be confirmed directly with school management.

ONLINE LEARNING CENTRE & DIGITAL CLASSROOM:
- Emaudo Secondary School provides a 100% Free Online Learning Centre accessible to all students (JSS1 - SS3) and parents.
- Subjects Available: Mathematics (Algebra, Geometry, Statistics, Trigonometry, WAEC Prep), English Language (Grammar, Literature, Essay Writing, Comprehension), Science (Biology, Chemistry, Physics, Chevron Science Lab Titration & Optics Practicals), ICT & Computer Studies (Computer Hardware, Python Coding Foundations, Cybersecurity), Social Science (Government, Economics, Map Reading Geography, Civic Education), Commercial (Financial Accounting, Commerce, Business Studies).
- Curated from Verified Global Open Educational Platforms: Khan Academy, BBC Bitesize, YouTube Educational channels, CK-12 Foundation, MIT OpenCourseWare, Coursera, and edX.
- Fully compliant with open educational guidelines (direct embeds & official source links with original creator attribution).
- Students can search topics, filter by class level, bookmark favourite lessons, and watch anytime on mobile or computer.

STRICT ACCURACY RULES:
1. Always base answers on the above verified knowledge.
2. If asked about something unrecorded (such as specific private personal cell numbers of staff or speculative fees), answer politely:
"I don't have verified information about that specific item yet. Please contact Emaudo Secondary School directly via WhatsApp or call +234 813 911 1765, or visit 178 Osimen Street, Emaudo, Ekpoma."
3. Keep responses articulate, welcoming, encouraging, and respectful of the school's heritage.
`;

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    school: "Emaudo Secondary School",
    location: "Ekpoma, Edo State, Nigeria",
    established: 1980,
  });
});

// Contact message submission endpoint
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: "Name and message are required." });
  }
  const record = {
    id: `msg-${Date.now()}`,
    name,
    email: email || "Not provided",
    phone: phone || "Not provided",
    subject: subject || "General Enquiry",
    message,
    created_at: new Date().toISOString(),
    status: "unread",
  };
  contactMessagesStore.unshift(record);

  // Sync to Supabase if configured
  const sb = getSupabaseServerClient();
  if (sb) {
    try {
      await sb.from("contact_messages").insert([{
        name,
        email: email || null,
        phone: phone || null,
        subject: subject || "General Enquiry",
        message,
        status: "unread",
      }]);
    } catch (err) {
      console.warn("Server Supabase contact sync note:", err);
    }
  }

  res.json({ success: true, message: "Enquiry submitted successfully.", record });
});

// Get stored contact messages (for Admin Dashboard)
app.get("/api/contact/messages", async (_req, res) => {
  const sb = getSupabaseServerClient();
  if (sb) {
    try {
      const { data, error } = await sb.from("contact_messages").select("*").order("created_at", { ascending: false });
      if (!error && data && data.length > 0) {
        return res.json({ messages: data });
      }
    } catch (err) {
      console.warn("Server Supabase fetch contacts note:", err);
    }
  }
  res.json({ messages: contactMessagesStore });
});

// Admission enquiry submission endpoint
app.post("/api/admissions", async (req, res) => {
  const { studentName, parentName, phone, email, classApplying, previousSchool, message } = req.body;
  if (!studentName || !phone) {
    return res.status(400).json({ error: "Student name and phone number are required." });
  }
  const record = {
    id: `adm-${Date.now()}`,
    studentName,
    parentName: parentName || "Not provided",
    phone,
    email: email || "Not provided",
    classApplying: classApplying || "JSS 1",
    previousSchool: previousSchool || "Not specified",
    message: message || "Direct web admission enquiry",
    status: "pending",
    created_at: new Date().toISOString(),
  };
  admissionEnquiriesStore.unshift(record);

  // Sync to Supabase if configured
  const sb = getSupabaseServerClient();
  if (sb) {
    try {
      await sb.from("admissions").insert([{
        student_name: studentName,
        parent_name: parentName || null,
        phone,
        email: email || null,
        class_applying: classApplying || "JSS 1",
        previous_school: previousSchool || null,
        message: message || "Direct web admission enquiry",
        status: "pending",
      }]);
    } catch (err) {
      console.warn("Server Supabase admission sync note:", err);
    }
  }

  res.json({ success: true, message: "Admission enquiry logged.", record });
});

// Get stored admission enquiries (for Admin Dashboard)
app.get("/api/admissions/list", async (_req, res) => {
  const sb = getSupabaseServerClient();
  if (sb) {
    try {
      const { data, error } = await sb.from("admissions").select("*").order("created_at", { ascending: false });
      if (!error && data && data.length > 0) {
        const formatted = data.map((d: any) => ({
          id: d.id,
          studentName: d.student_name,
          parentName: d.parent_name || "Not provided",
          phone: d.phone,
          email: d.email || "Not provided",
          classApplying: d.class_applying,
          previousSchool: d.previous_school || "Not specified",
          message: d.message,
          status: d.status,
          created_at: d.created_at,
        }));
        return res.json({ admissions: formatted });
      }
    } catch (err) {
      console.warn("Server Supabase fetch admissions note:", err);
    }
  }
  res.json({ admissions: admissionEnquiriesStore });
});

// Emaudo AI Assistant Chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required." });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Rule-based grounded fallback if API key is not configured
      const lower = message.toLowerCase();
      let reply = "";

      if (lower.includes("establish") || lower.includes("founded") || lower.includes("start") || lower.includes("year") || lower.includes("1980")) {
        reply = "Emaudo Secondary School was established in 1980 in Emaudo, Ekpoma, in the former Bendel State of Nigeria, during the administration of Professor Ambrose Folorunsho Alli.";
      } else if (lower.includes("founder") || lower.includes("ambrose") || lower.includes("alli")) {
        reply = "The school was founded during the administration of Professor Ambrose Folorunsho Alli, who served as Governor of Bendel State from 1979 to 1983 as part of his free-education programme.";
      } else if (lower.includes("1985")) {
        reply = "In 1985, Emaudo Secondary School celebrated the graduation of its very first set of students.";
      } else if (lower.includes("1986") || lower.includes("grade")) {
        reply = "By 1986, Emaudo Secondary School had progressed from a grade-three school to a grade-one school.";
      } else if (lower.includes("2017") || lower.includes("lab") || lower.includes("chevron") || lower.includes("science")) {
        reply = "In 2017, an ultra-modern science laboratory complex was constructed at Emaudo Secondary School with support from Chevron and partners, and officially inaugurated.";
      } else if (lower.includes("essosa") || lower.includes("alumni") || lower.includes("old student")) {
        reply = "ESSOSA is the Emaudo Secondary School Old Students Association. It connects former students and preserves school heritage. You can visit their official website at https://emaudooldstudents.org/";
      } else if (lower.includes("contact") || lower.includes("phone") || lower.includes("whatsapp") || lower.includes("address") || lower.includes("location")) {
        reply = "You can contact Emaudo Secondary School at 178 Osimen Street, Emaudo, Ekpoma, Edo State. WhatsApp & Phone Call: +234 813 911 1765 | Email: [EMAIL ADDRESS].";
      } else if (lower.includes("admission") || lower.includes("enrol") || lower.includes("apply")) {
        reply = "Admissions follow a general process: 1. Make an enquiry, 2. Obtain application info, 3. Submit application, 4. Assessment, 5. Decision, 6. Enrollment. Please note: Admission requirements, dates, fees, and procedures should be confirmed directly with the school.";
      } else {
        reply = "I don't have verified information about that yet. Please contact Emaudo Secondary School directly via WhatsApp or phone call at +234 813 911 1765, or visit 178 Osimen Street, Emaudo, Ekpoma.";
      }

      return res.json({ reply, grounded: true });
    }

    // Call Gemini Flash model
    const contents: any[] = [];
    if (Array.isArray(conversationHistory)) {
      for (const turn of conversationHistory.slice(-6)) {
        contents.push({
          role: turn.role === "user" ? "user" : "model",
          parts: [{ text: turn.text }],
        });
      }
    }
    contents.push({ role: "user", parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents,
      config: {
        systemInstruction: SCHOOL_GROUNDED_SYSTEM_INSTRUCTION,
        temperature: 0.2,
      },
    });

    const reply = response.text || "I don't have verified information about that yet. Please contact Emaudo Secondary School directly.";
    res.json({ reply, grounded: true });
  } catch (error: any) {
    console.error("Gemini Assistant Error:", error);
    res.json({
      reply: "I don't have verified information about that yet. Please contact Emaudo Secondary School directly via WhatsApp or Phone at +234 813 911 1765.",
      grounded: true,
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Emaudo Secondary School server running on port ${PORT}`);
  });
}

startServer();
