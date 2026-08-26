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
  X 
} from 'lucide-react';
import { SCHOOL_INFO } from '../../constants/schoolData';

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
      text: "Welcome to **Emaudo Secondary School, Ekpoma**! 🎓\n\nI am your interactive AI School Guide. You can ask me about:\n• School History & Founder (Prof. Ambrose Alli)\n• Academic Curriculum (Junior & Senior Secondary)\n• Science Laboratory Complex (2017 Chevron Project)\n• ESSOSA Alumni Network\n• Official Contact Channels (WhatsApp & Direct Call)",
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "Who is the founder of Emaudo Secondary School?",
    "How can I contact the school on WhatsApp?",
    "Tell me about the 2017 Science Laboratory",
    "Where is the school located in Ekpoma?",
    "How do I join the ESSOSA Alumni Association?",
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
        text: data.reply || "Thank you for your enquiry. For official administrative matters, please reach out via WhatsApp at +234 813 911 1765 or call 07018543531.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      // Grounded fallback
      const fallbackReply: ChatMessage = {
        id: `ai-fallback-${Date.now()}`,
        sender: 'ai',
        text: `Emaudo Secondary School was established in 1980 by Professor Ambrose Folorunsho Alli at 178 Osimen Street, Emaudo, Ekpoma, Edo State.\n\nOfficial Contacts:\n💬 WhatsApp: ${SCHOOL_INFO.whatsappDisplay}\n📞 Direct Call: ${SCHOOL_INFO.phoneDisplay}\n🌐 Alumni Portal: https://emaudooldstudents.org/`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            id="btn-open-ai-assistant"
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-amber-400/40 cursor-pointer group"
            aria-label="Open Emaudo AI Assistant"
          >
            <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 group-hover:rotate-12 transition-transform">
              <Bot className="w-5 h-5" />
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold leading-none text-white">Emaudo AI</div>
              <div className="text-[10px] text-amber-300 leading-tight">School Assistant</div>
            </div>
          </button>
        )}
      </div>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div 
          id="emaudo-ai-assistant-modal"
          className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] max-h-[580px] h-[78vh] bg-white rounded-3xl shadow-2xl border border-slate-300 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-200"
        >
          {/* Modal Header */}
          <div className="bg-slate-950 text-white p-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                  <span>Emaudo AI Guide</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h3>
                <p className="text-[11px] text-slate-300">Grounded School Information</p>
              </div>
            </div>

            <button
              id="btn-close-ai-assistant"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
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
                      ? 'bg-blue-900 text-white rounded-tr-none shadow'
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-200 shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-slate-500 bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 w-fit">
                <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                <span className="text-xs">Consulting Emaudo knowledge base...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Prompts */}
          <div className="p-2.5 bg-slate-100 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-2.5 py-1 rounded-full bg-white text-slate-700 hover:bg-amber-50 hover:text-blue-900 border border-slate-200 text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0"
              >
                {q}
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
                placeholder="Ask about history, founder, admissions..."
                className="flex-1 text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-900 focus:outline-none"
              />
              <button
                id="btn-send-ai-message"
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="p-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white disabled:opacity-40 transition-colors cursor-pointer"
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
