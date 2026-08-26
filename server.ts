import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory fallback stores for submissions when database is in demo/staging mode
const contactMessagesStore: any[] = [];
const admissionEnquiriesStore: any[] = [];

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

VERIFIED SCHOOL FACTS (ONLY USE THESE FACTS, NEVER FABRICATE OTHERS):
- School Name: EMAUDO SECONDARY SCHOOL
- Location / Address: 178 Osimen Street, Emaudo, Ekpoma, Edo State, Nigeria
- Established: 1980 in Emaudo, Ekpoma, in the former Bendel State of Nigeria.
- Founder: Professor Ambrose Folorunsho Alli (Governor of Bendel State from 1979 to 1983). The school was part of the expansion of secondary education associated with his educational policies and free-education programme.
- 1985 Milestone: The school's first students graduated in 1985.
- 1986 Milestone: By 1986, the school progressed from a grade-three school to a grade-one school.
- Academic Tradition: Historical strength in both Science and Arts within the former Bendel State.
- 2017 Science Laboratory Complex: An ultra-modern science laboratory complex was constructed at Emaudo Secondary School with support from Chevron and partners, and inaugurated in 2017.
- Alumni Association: ESSOSA (Emaudo Secondary School Old Students Association). Official website: https://emaudooldstudents.org/
- WhatsApp Contact: +234 813 911 1765 (format: 2348139111765)
- Phone Call: 07018543531
- Official Email: [EMAIL ADDRESS] (verified email placeholder)
- Levels: Junior Secondary (JSS 1 - JSS 3) and Senior Secondary (SS 1 - SS 3: Science, Arts, Commercial tracks).
- Admissions Process: 1. Enquiry -> 2. Application Form -> 3. Assessment/Test -> 4. Admission Offer -> 5. Enrollment. Note: Admission requirements, dates, fees, and procedures should be confirmed directly with the school.

STRICT ACCURACY RULES:
1. Never invent or guess unverified details such as current principal/staff names, school fees amount, current student population, specific examination rankings, or fictional events.
2. If asked about something that is not in the verified facts above (like specific school fees, current principal name, or exact term dates), answer politely:
"I don't have verified information about that yet. Please contact Emaudo Secondary School directly via WhatsApp at +234 813 911 1765 or call 07018543531, or visit 178 Osimen Street, Emaudo, Ekpoma."
3. Keep answers respectful, accurate, articulate, and welcoming.
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
app.post("/api/contact", (req, res) => {
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
  res.json({ success: true, message: "Enquiry submitted successfully.", record });
});

// Get stored contact messages (for demo Admin Dashboard)
app.get("/api/contact/messages", (_req, res) => {
  res.json({ messages: contactMessagesStore });
});

// Admission enquiry submission endpoint
app.post("/api/admissions", (req, res) => {
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
  res.json({ success: true, message: "Admission enquiry logged.", record });
});

// Get stored admission enquiries (for demo Admin Dashboard)
app.get("/api/admissions/list", (_req, res) => {
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
        reply = "You can contact Emaudo Secondary School at 178 Osimen Street, Emaudo, Ekpoma, Edo State. WhatsApp: +234 813 911 1765 | Phone Call: 07018543531 | Email: [EMAIL ADDRESS].";
      } else if (lower.includes("admission") || lower.includes("enrol") || lower.includes("apply")) {
        reply = "Admissions follow a general process: 1. Make an enquiry, 2. Obtain application info, 3. Submit application, 4. Assessment, 5. Decision, 6. Enrollment. Please note: Admission requirements, dates, fees, and procedures should be confirmed directly with the school.";
      } else {
        reply = "I don't have verified information about that yet. Please contact Emaudo Secondary School directly via WhatsApp at +234 813 911 1765, phone call at 07018543531, or visit 178 Osimen Street, Emaudo, Ekpoma.";
      }

      return res.json({ reply, grounded: true });
    }

    // Call Gemini 2.5 Flash model
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
      model: "gemini-2.5-flash",
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
      reply: "I don't have verified information about that yet. Please contact Emaudo Secondary School directly at +234 813 911 1765 (WhatsApp) or 07018543531 (Phone).",
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
