
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { AppScreen } from '../types';
import { APP_LOGO } from '../constants';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ConsultantScreen: React.FC<{ onNavigate: (s: AppScreen) => void }> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'أهلاً بك في عالم HR Accessories. أنا مستشارك الخاص، يسعدني مساعدتك في اختيار القطعة التي تليق بذوقك الرفيع. هل تبحث عن حقيبة لسهرة خاصة أم للاستخدام اليومي الراقي؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...messages.map(m => ({ 
            role: m.role, 
            parts: [{ text: m.text }] 
          })), 
          { role: 'user', parts: [{ text: userMsg }] }
        ],
        config: {
          systemInstruction: "أنت خبير مبيعات ومستشار أناقة في 'HR Accessories'. أسلوبك يجب أن يكون راقياً جداً، مهذباً، ومفعماً بالفخامة. استخدم مصطلحات مثل 'سيدتي'، 'ذوق رفيع'، 'جلد طبيعي فاخر'. إذا سأل المستخدم عن نوع حقيبة، اقترح عليه خيارات بناءً على المناسبة (عمل، سهرة، سفر). إجاباتك يجب أن تكون قصيرة ومباشرة وباللغة العربية الفصحى المعاصرة أو اللهجة العراقية المهذبة جداً.",
          temperature: 0.7,
        }
      });

      const aiText = response.text || "أعتذر منك بشدة، واجهت عائقاً تقنياً بسيطاً. هل يمكنك إعادة سؤالك؟";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: 'نعتذر منك، الخدمة غير متوفرة حالياً بسبب ضغط الطلبات. يرجى المحاولة لاحقاً.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark overflow-hidden">
      <header className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-4 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-10">
        <button onClick={() => onNavigate(AppScreen.HOME)} className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-full bg-white flex items-center justify-center border border-primary/30 relative p-1 shadow-sm">
            <img src={APP_LOGO} alt="HR Logo" className="w-full h-full object-contain" />
            <span className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-white dark:border-background-dark rounded-full"></span>
          </div>
          <div>
            <h2 className="font-bold text-sm tracking-tight">مستشار HR الذكي</h2>
            <p className="text-[10px] text-gray-500 font-bold">متصل الآن</p>
          </div>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar bg-[radial-gradient(circle_at_top_right,rgba(244,209,37,0.05),transparent)]">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm relative ${
              m.role === 'user' 
              ? 'bg-slate-900 text-white rounded-br-none' 
              : 'bg-white dark:bg-background-surface text-slate-800 dark:text-white border border-gray-100 dark:border-white/5 rounded-bl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-end animate-pulse">
            <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 flex gap-1.5 items-center">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-[10px] text-primary/60 mr-2 font-bold">يفكر المستشار...</span>
            </div>
          </div>
        )}
      </div>

      <footer className="p-4 bg-white dark:bg-background-dark border-t border-gray-100 dark:border-gray-800 pb-10">
        <div className="relative flex items-center gap-2 max-w-lg mx-auto">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-gray-100 dark:bg-white/5 border-none rounded-2xl h-14 pr-4 pl-14 text-sm focus:ring-2 focus:ring-primary transition-all outline-none"
            placeholder="اسأل عن حقيبة أحلامك..."
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute left-2 size-10 bg-primary text-black rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 active:scale-90 transition-all disabled:opacity-50 disabled:grayscale"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ConsultantScreen;
