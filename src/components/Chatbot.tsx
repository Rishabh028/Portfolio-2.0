import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, RotateCcw, ExternalLink } from 'lucide-react';
import { generateAIResponse } from '@/lib/aiAssistant';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  chips?: string[];
  links?: { label: string; url: string }[];
  isTyping?: boolean;
}

const INITIAL_MESSAGE: Message = {
  id: '1',
  type: 'bot',
  text: "Hi! I'm Rishabh's AI Portfolio Assistant. Ask me anything about his technical stack, education at **IIT Guwahati**, or his flagship projects like **Voltage** and **SeatLock**!",
  chips: [
    "⚡ Tell me about Voltage",
    "🎟️ How SeatLock works",
    "🛠️ Full Tech Stack",
    "🎓 Education at IIT Guwahati",
    "📬 How to contact Rishabh?"
  ]
};

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, messages]);

  const handleSend = (textToSend?: string) => {
    const rawText = textToSend || inputValue;
    if (!rawText.trim()) return;

    // Remove emoji prefixes if clicked from chips for cleaner prompt
    const cleanedQuery = rawText.replace(/^[^\w\s]+\s*/, '').trim();
    setInputValue('');

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: rawText.trim()
    };
    setMessages(prev => [...prev, userMsg]);

    // Add typing indicator
    const typingId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: typingId, type: 'bot', text: '', isTyping: true }]);

    // Natural simulated AI generation delay
    setTimeout(() => {
      const response = generateAIResponse(cleanedQuery);

      setMessages(prev =>
        prev.map(msg =>
          msg.id === typingId
            ? {
                id: typingId,
                type: 'bot',
                text: response.text,
                chips: response.chips,
                links: response.links,
                isTyping: false
              }
            : msg
        )
      );
    }, 700);
  };

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  const renderFormattedText = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, lineIdx) => {
      if (!line.trim()) {
        return <div key={lineIdx} className="h-1.5" />;
      }

      const parts = [];
      const tokenRegex = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
      let lastIndex = 0;
      let match;

      while ((match = tokenRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.slice(lastIndex, match.index));
        }
        const token = match[0];
        if (token.startsWith('**') && token.endsWith('**')) {
          parts.push(
            <strong key={match.index} className="font-semibold text-foreground">
              {token.slice(2, -2)}
            </strong>
          );
        } else if (token.startsWith('`') && token.endsWith('`')) {
          parts.push(
            <code
              key={match.index}
              className="px-1.5 py-0.5 rounded bg-foreground/15 text-[11px] font-mono font-medium text-foreground"
            >
              {token.slice(1, -1)}
            </code>
          );
        } else if (token.startsWith('[')) {
          const linkMatch = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
          if (linkMatch) {
            parts.push(
              <a
                key={match.index}
                href={linkMatch[2]}
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold hover:opacity-80 inline-flex items-center gap-0.5 text-primary"
              >
                {linkMatch[1]}
              </a>
            );
          }
        }
        lastIndex = tokenRegex.lastIndex;
      }
      if (lastIndex < line.length) {
        parts.push(line.slice(lastIndex));
      }

      const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
      return (
        <div
          key={lineIdx}
          className={
            isBullet
              ? 'pl-2 py-0.5 text-xs sm:text-sm leading-relaxed'
              : 'py-0.5 text-xs sm:text-sm leading-relaxed'
          }
        >
          {parts}
        </div>
      );
    });
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
            aria-label="Open AI Assistant"
            className="fixed bottom-6 left-6 z-[100] w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center shadow-2xl shadow-foreground/20 border border-foreground/10 group"
          >
            <Bot className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95, x: -10 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, x: -10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 left-6 z-[100] w-[390px] max-w-[calc(100vw-2.5rem)] h-[560px] max-h-[calc(100vh-5rem)] bg-card/95 backdrop-blur-xl border border-foreground/15 rounded-[32px] shadow-2xl flex flex-col overflow-hidden text-foreground"
          >
            {/* Header */}
            <div className="p-4 border-b border-foreground/10 flex items-center justify-between bg-muted/40 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center shadow-md">
                  <Sparkles className="w-5 h-5 text-background" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight flex items-center gap-2">
                    Rishabh's AI
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-full bg-foreground/10 text-foreground font-semibold">
                      v2.0
                    </span>
                  </h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 block animate-pulse" />
                    Online & Ready
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-foreground/10 text-muted-foreground transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close assistant"
                  aria-label="Close assistant"
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-foreground/10 text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Stream */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-4"
              style={{ scrollbarWidth: 'thin' }}
              data-lenis-prevent
            >
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl p-3.5 text-sm ${
                      msg.type === 'user'
                        ? 'bg-foreground text-background rounded-br-sm shadow-md'
                        : 'bg-muted/80 text-foreground rounded-bl-sm border border-foreground/10 shadow-sm'
                    }`}
                  >
                    {msg.isTyping ? (
                      <div className="flex gap-1.5 items-center h-5 px-1">
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                          className="w-2 h-2 bg-foreground/60 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                          className="w-2 h-2 bg-foreground/60 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                          className="w-2 h-2 bg-foreground/60 rounded-full"
                        />
                      </div>
                    ) : (
                      <>
                        <div>{renderFormattedText(msg.text)}</div>

                        {/* Interactive Action Links */}
                        {msg.links && msg.links.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3 pt-2.5 border-t border-foreground/10">
                            {msg.links.map((link, idx) => (
                              <a
                                key={idx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[11px] font-semibold px-3 py-1.5 rounded-full bg-foreground text-background hover:opacity-90 inline-flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                              >
                                {link.label}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ))}
                          </div>
                        )}

                        {/* Suggested Follow-up Chips */}
                        {msg.chips && msg.chips.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-foreground/10">
                            {msg.chips.map((chip, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleSend(chip)}
                                className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-foreground/10 hover:bg-foreground/20 text-foreground transition-all duration-200 border border-foreground/10 flex items-center gap-1 active:scale-95 text-left"
                              >
                                {chip}
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3.5 border-t border-foreground/10 bg-background/80 backdrop-blur-md">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  placeholder="Ask about projects, skills, education..."
                  className="flex-1 bg-muted/60 border border-foreground/15 rounded-full px-4 py-2.5 text-xs sm:text-sm outline-none focus:border-foreground/40 focus:bg-background transition-all text-foreground placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  aria-label="Send message"
                  className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center shrink-0 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all shadow-md"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
