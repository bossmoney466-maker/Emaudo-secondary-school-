import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  ChevronDown, 
  ExternalLink, 
  MessageCircle, 
  MessageSquare, 
  Phone, 
  Send, 
  Sparkles, 
  X,
  BookOpen,
  GraduationCap,
  FlaskConical,
  Landmark,
  Layers,
  HelpCircle
} from 'lucide-react';
import { SCHOOL_INFO } from '../../constants/schoolData';
import { SCHOOL_CONTACT } from '../../constants/contactInfo';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const EmaudoAiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Welcome to **Emaudo Secondary School, Ekpoma**! 🎓\n\nI am your interactive **AI School Guide & Academic Assistant**. How can I help you today?\n\n• **School History & Founder**: Prof. Ambrose Alli (Est. 1980)\n• **Academics & Subjects**: Mathematics, English, Sciences, Commercial\n• **2017 Science Lab Complex**: Chevron-supported modern facility\n• **Clubs & Activities**: Sports, JETS, Debate, Chess, Cultural\n• **Admissions & Portal**: Enquiries & login access\n• **Official WhatsApp Desk**: Instant contact with administration",
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    { label: "Founder & History", query: "Who founded Emaudo Secondary School and when?" },
    { label: "2017 Science Lab", query: "Tell me about the ultra-modern Science Laboratory complex" },
    { label: "Core Subjects", query: "What subjects are taught in Junior and Senior Secondary?" },
    { label: "Clubs & Sports", query: "What extracurricular activities and clubs are available?" },
    { label: "Admissions Process", query: "How do I apply for admission at Emaudo Secondary School?" },
    { label: "WhatsApp Desk", query: "How do I chat with the admissions office on WhatsApp?" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      if (!response.ok) {
        throw new Error('Server response error');
      }

      const data = await response.json();
      const aiReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || `Thank you for your enquiry. For official administrative queries, please contact the administrative desk via WhatsApp at ${SCHOOL_CONTACT.whatsappDisplay}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      // Grounded verified fallback
      const fallbackReply: ChatMessage = {
        id: `ai-fallback-${Date.now()}`,
        sender: 'ai',
        text: `**Emaudo Secondary School, Ekpoma** was founded in 1980 by **Professor Ambrose Folorunsho Alli** (Governor of Bendel State) at 178 Osimen Street, Emaudo, Ekpoma, Edo State.\n\nKey Highlights:\n• **Chevron Science Complex**: Commissioned in 2017 with dedicated Physics, Chemistry & Biology laboratories.\n• **Curriculum**: WAEC, NECO & BECE certified across Science, Arts & Commercial disciplines.\n• **WhatsApp Direct**: ${SCHOOL_CONTACT.whatsappDisplay}\n• **Phone Call**: ${SCHOOL_CONTACT.phoneDisplay}\n• **ESSOSA Alumni**: https://emaudooldstudents.org/`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button with Glowing Emerald & Gold Pulse */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            id="btn-open-ai-assistant"
            className="flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-950 via-slate-950 to-emerald-900 text-white shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-amber-400/60 cursor-pointer group hover:shadow-amber-500/20"
            aria-label="Open Emaudo AI Assistant"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 group-hover:rotate-12 transition-transform">
                <Bot className="w-5 h-5" />
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-black leading-none text-white tracking-wide">AI School Guide</div>
              <div className="text-[10px] text-amber-300 font-semibold leading-tight mt-0.5">Emaudo Smart Assistant</div>
            </div>
          </button>
        )}
      </div>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div 
          id="emaudo-ai-assistant-modal"
          className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[430px] max-h-[600px] h-[80vh] bg-white rounded-3xl shadow-2xl border-2 border-emerald-800/40 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-200"
        >
          {/* Modal Header: Deep Emerald & Gold Accents */}
          <div className="bg-gradient-to-r from-emerald-950 via-slate-950 to-emerald-950 text-white p-4 flex items-center justify-between border-b border-emerald-800/50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-black text-sm text-white flex items-center gap-2">
                  <span>Emaudo AI School Guide</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h3>
                <p className="text-[10px] text-amber-300 font-medium">Grounded Knowledge • Est. 1980</p>
              </div>
            </div>

            <button
              id="btn-close-ai-assistant"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50 text-xs leading-relaxed scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-emerald-900 text-white rounded-tr-none shadow-md'
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-200/90 shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-slate-600 bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 w-fit">
                <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                <span className="text-xs">Consulting Emaudo knowledge base...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Prompt Chips */}
          <div className="p-2.5 bg-slate-100 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q.query)}
                className="px-3 py-1 rounded-full bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300 border border-slate-200 text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer shrink-0"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                id="input-ai-chat"
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about founder, 2017 lab, subjects, sports..."
                className="flex-1 text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 focus:outline-none"
              />
              <button
                id="btn-send-ai-message"
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="p-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white disabled:opacity-40 transition-colors cursor-pointer shadow-sm"
              >
                <Send className="w-4 h-4 text-amber-400" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
