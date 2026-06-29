import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  isTyping?: boolean;
}

const portfolioContext = [
  { keywords: ['skills', 'tech', 'stack', 'technologies', 'know'], reply: "Rishabh specializes in Full-Stack Development and IoT. His core stack includes React, Next.js, Node.js, TypeScript, and MongoDB, alongside IoT tech like Arduino and ESP8266." },
  { keywords: ['contact', 'email', 'hire', 'reach'], reply: "You can reach Rishabh directly at rishabhrajak2004@gmail.com, or connect with him on LinkedIn. He's always open to new opportunities!" },
  { keywords: ['projects', 'work', 'portfolio', 'built'], reply: "Rishabh has built several impressive projects including CodePilot AI, SwasthAI, CodeVerse, and StayFinder Pro. You can check them out in the Selected Projects section!" },
  { keywords: ['education', 'college', 'iit', 'study', 'university'], reply: "Rishabh is currently pursuing his B.Tech in Electronics and Communication Engineering at the prestigious Indian Institute of Technology (IIT), Guwahati (2022-2026)." },
  { keywords: ['hello', 'hi', 'hey', 'greetings'], reply: "Hi there! I'm Rishabh's AI assistant. Ask me anything about his skills, projects, or background!" }
];

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', type: 'bot', text: "Hi! I'm Rishabh's AI assistant. How can I help you today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    setInputValue('');
    
    // Add user message
    const userMsg: Message = { id: Date.now().toString(), type: 'user', text: userText };
    setMessages(prev => [...prev, userMsg]);

    // Add typing indicator
    const typingId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: typingId, type: 'bot', text: '', isTyping: true }]);

    // Simulate AI response delay
    setTimeout(() => {
      let botReply = "I'm still learning! But you can find most details about Rishabh in the sections above, or email him directly at rishabhrajak2004@gmail.com.";
      
      const lowerInput = userText.toLowerCase();
      for (const context of portfolioContext) {
        if (context.keywords.some(kw => lowerInput.includes(kw))) {
          botReply = context.reply;
          break;
        }
      }

      setMessages(prev => 
        prev.map(msg => msg.id === typingId ? { id: typingId, type: 'bot', text: botReply, isTyping: false } : msg)
      );
    }, 1500);
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-6 z-[100] w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center shadow-2xl shadow-foreground/20 border border-foreground/10"
          >
            <Bot className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, x: -20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.9, x: -20 }}
            className="fixed bottom-6 left-6 z-[100] w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-card border border-foreground/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-foreground/10 flex items-center justify-between bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Rishabh's AI</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 block animate-pulse"></span> Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-foreground/10 text-muted-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollbarWidth: 'thin' }}>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-3.5 text-sm ${
                    msg.type === 'user' 
                      ? 'bg-foreground text-background rounded-br-sm' 
                      : 'bg-muted text-foreground rounded-bl-sm border border-foreground/5'
                  }`}>
                    {msg.isTyping ? (
                      <div className="flex gap-1.5 items-center h-5 px-1">
                        <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-foreground/50 rounded-full" />
                        <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-foreground/50 rounded-full" />
                        <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-foreground/50 rounded-full" />
                      </div>
                    ) : (
                      <p className="leading-relaxed">{msg.text}</p>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-foreground/10 bg-background/50">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-3"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about my skills..."
                  className="flex-1 bg-muted/50 border border-foreground/10 rounded-full px-4 py-3 text-sm outline-none focus:border-foreground/30 focus:bg-background transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-11 h-11 rounded-full bg-foreground text-background flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all shadow-md"
                >
                  <Send className="w-4 h-4 ml-1" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
