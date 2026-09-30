import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TerminalLine {
  type: 'input' | 'output';
  content: string;
}

const commands: Record<string, string | ((args: string[]) => string)> = {
  help: `
┌─────────────────────────────────────────────────────────┐
│                   AVAILABLE COMMANDS                    │
├─────────────────────────────────────────────────────────┤
│  help      │ Show this help menu                        │
│  about     │ Learn about Rishabh                        │
│  skills    │ View technical skills                      │
│  projects  │ See featured projects                      │
│  education │ View education background                  │
│  contact   │ Get contact information                    │
│  social    │ View social media links                    │
│  date      │ Show current date & time                   │
│  whoami    │ Display user info                          │
│  echo      │ Echo back your message                     │
│  clear     │ Clear terminal                             │
│  neofetch  │ System information                         │
└─────────────────────────────────────────────────────────┘`,

  about: `
╭──────────────────────────────────────────────────────────╮
│                     👋 RISHABH RAJAK                     │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  > Creative Developer based in India                     │
│  > B.Tech @ IIT Guwahati (ECE)                           │
│  > Full-Stack Developer & IoT Enthusiast                 │
│                                                          │
│  I'm passionate about building innovative web            │
│  applications and creating seamless user experiences.    │
│                                                          │
│  Currently exploring: AI/ML, Web3, System Design         │
│                                                          │
╰──────────────────────────────────────────────────────────╯`,

  skills: `
┌─────────────────── TECHNICAL SKILLS ────────────────────┐
│                                                         │
│  ▸ Frontend                                             │
│    React ████████░░ 80%    TypeScript ███████░░░ 70%    │
│    Tailwind ████████░░ 80%  Next.js █████░░░░░ 55%      │
│                                                         │
│  ▸ Backend                                              │
│    Node.js ███████░░░ 70%   Python ████████░░ 80%       │
│    MongoDB ███████░░░ 70%   MySQL █████░░░░░ 55%        │
│                                                         │
│  ▸ Tools & Others                                       │
│    Git ███████░░░ 75%       Arduino ███████░░░ 75%      │
│    C++ ███████░░░ 75%       MATLAB ██████░░░░ 60%       │
│                                                         │
└─────────────────────────────────────────────────────────┘`,

  projects: `
╭────────────────── FEATURED PROJECTS ─────────────────────╮
│                                                          │
│  [01] CodePilot AI                                       │
│       └─ Multi-agent autonomous software engineer        │
│                                                          │
│  [02] SwasthAI                                           │
│       └─ AI healthcare platform & telemedicine           │
│                                                          │
│  [03] SeatLock                                           │
│       └─ High-concurrency event booking & Three.js arena │
│                                                          │
│  [04] Voltage                                            │
│       └─ Modern edge cloud deployment & runtime platform │
│                                                          │
│  [05] CodeVerse                                          │
│       └─ LeetCode clone with interactive code editor     │
│                                                          │
│  [06] StayFinder                                         │
│       └─ Full-stack hotel booking platform with Supabase │
│                                                          │
│  [07] BingoChat                                          │
│       └─ Real-time chat with WebSocket & video calls     │
│                                                          │
│  [08] Data Structure Visualization                       │
│       └─ Interactive algorithm visualizations            │
│                                                          │
╰──────────────────────────────────────────────────────────╯
  
  Type 'open <number>' to view project details`,

  education: `
╭──────────────────── EDUCATION ───────────────────────────╮
│                                                          │
│  🎓 IIT Guwahati                        [2022 - 2026]    │
│     B.Tech in Electronics & Communication Engineering    │
│     Focus: Full-Stack Development & IoT Systems          │
│                                                          │
│  📚 KV No-1 Ishapore                    [2020 - 2022]    │
│     Class XII (CBSE) - Science Stream                    │
│                                                          │
│  📖 KV No-1 Ishapore                    [2010 - 2020]    │
│     Class X (CBSE)                                       │
│                                                          │
╰──────────────────────────────────────────────────────────╯`,

  contact: `
┌───────────────── CONTACT INFORMATION ───────────────────┐
│                                                         │
│  📧 Email    │ rishabhrajak2004@gmail.com               │
│  💼 LinkedIn │ linkedin.com/in/rishabh-rajak-621318316/ │
│  🐙 GitHub   │ github.com/Rishabh028                    │
│  🐦 Twitter  │ @rishabh_rajak                           │
│                                                         │
│  Feel free to reach out for collaborations!             │
│                                                         │
└─────────────────────────────────────────────────────────┘`,

  social: `
┌───────────────────── SOCIAL LINKS ──────────────────────┐
│                                                         │
│  GitHub    → github.com/Rishabh028                      │
│  LinkedIn  → linkedin.com/in/rishabh-rajak-621318316/   │
│  Twitter   → @rishabh_rajak                             │
│  Instagram → @rishabh_rajak                             │
│                                                         │
└─────────────────────────────────────────────────────────┘`,

  whoami: `
  User: visitor
  Role: Guest
  Session: Active
  Location: Portfolio Terminal v2.0`,

  neofetch: `
                  ██████                visitor@portfolio
                ██      ██              ─────────────────
              ██          ██            OS: Portfolio OS v2.0
            ██    ██  ██    ██          Host: Rishabh Rajak
          ██      ██  ██      ██        Kernel: React 18.3.1
          ██                  ██        Uptime: ${Math.floor(Math.random() * 100)} days
          ██       ████       ██        Shell: Terminal v2.0
          ██     ██    ██     ██        DE: Framer Motion
            ██              ██          Theme: Dark [GTK2/3]
              ██          ██            Terminal: Custom
                ██████████              CPU: Brain @ ∞GHz
                                        Memory: Full Stack`,

  date: () => {
    const now = new Date();
    return `
  Current Date & Time:
  ${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
  ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
  },

  echo: (args: string[]) => `  ${args.join(' ')}`,

  open: (args: string[]) => {
    const projectNum = parseInt(args[0]);
    const projects: Record<number, string> = {
      1: `
  CodePilot AI - Autonomous AI Developer Platform
  ─────────────────────────────────────────
  Tech: Node.js, Express, PostgreSQL, Prisma, Claude 3.5 Sonnet, React
  Features: 8 Specialized AI Agents, WebSocket Streaming, Code Generation
  Status: ✅ Active (github.com/Rishabh028/CodePilot-AI)`,
      2: `
  SwasthAI - AI Healthcare & Telemedicine Platform
  ─────────────────────────────────────────
  Tech: React 18, React Query, Tailwind CSS, Base44 API, Axios
  Features: Doctor Booking, AI Symptom Checker, Digital Health Records
  Status: ✅ Active (github.com/Rishabh028/SwasthAI-Old)`,
      3: `
  SeatLock - Event Booking & Concurrency System
  ─────────────────────────────────────────
  Tech: Next.js 16, Fastify, Three.js, PostgreSQL 16, Redis, Stripe
  Features: Row-level mutex locks, 3D stadium arena, Holographic ticket
  Status: ✅ Live (seatlock-front.vercel.app)`,
      4: `
  Voltage - Edge Cloud Deployment Platform
  ─────────────────────────────────────────
  Tech: Next.js 14, Express, TypeScript, SSE, OpenResty
  Features: Zero-config edge builds, Subdomain routing, SSE log streaming
  Status: 🚧 In Development (github.com/Rishabh028/Voltage)`,
      5: `
  CodeVerse - LeetCode Clone & Online Judge
  ─────────────────────────────────────────
  Tech: Next.js, Firebase, Firestore, Tailwind CSS, Monaco Editor
  Features: Interactive code editor, Real-time problems, Video solutions
  Status: ✅ Live (code-verse-6ji0ghvlk-rishabh028s-projects.vercel.app)`,
      6: `
  StayFinder Pro - Hotel Booking Platform
  ─────────────────────────────────────────
  Tech: React, Vite, Supabase, Tailwind CSS
  Features: Dynamic hotel search, Supabase Auth, Owner & Admin portals
  Status: ✅ Live (stay-finder-75qt.vercel.app)`,
      7: `
  BingoChat - Real-time Chat Application
  ─────────────────────────────────────────
  Tech: React, Socket.IO, Zustand, Node.js, MongoDB
  Features: Real-time messaging, JWT Auth, Image sharing
  Status: ✅ Live`,
      8: `
  Data Structure Visualization
  ─────────────────────────────────────────
  Tech: React, D3.js, TypeScript, Framer Motion
  Features: Interactive animations, Step-by-step visualizer
  Status: ✅ Live`,
    };
    return projects[projectNum] || '  Project not found. Use numbers 1-8.';
  },
};

const quickCommands = ['help', 'about', 'skills', 'projects', 'education', 'contact', 'neofetch', 'clear'];

export const Terminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      type: 'output', content: `
╭──────────────────────────────────────────────────────────╮
│         Welcome to Rishabh's Terminal v2.0               │
│                                                          │
│  Type 'help' for available commands                      │
│  Type 'neofetch' for system info                         │
╰──────────────────────────────────────────────────────────╯` },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleCommand = (cmd: string) => {
    const parts = cmd.trim().split(' ');
    const mainCmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (mainCmd === 'clear') {
      setLines([]);
      return;
    }

    if (cmd.trim()) {
      setCommandHistory(prev => [...prev, cmd]);
      setHistoryIndex(-1);
    }

    const command = commands[mainCmd];
    let output: string;

    if (typeof command === 'function') {
      output = command(args);
    } else if (typeof command === 'string') {
      output = command;
    } else {
      output = `  Command not found: ${mainCmd}
  Type 'help' for available commands.`;
    }

    setLines(prev => [
      ...prev,
      { type: 'input', content: cmd },
      { type: 'output', content: output },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matchingCommands = Object.keys(commands).filter(c => c.startsWith(currentInput.toLowerCase()));
      if (matchingCommands.length === 1) {
        setCurrentInput(matchingCommands[0]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      handleCommand(currentInput);
      setCurrentInput('');
    }
  };

  const handleQuickCommand = (cmd: string) => {
    handleCommand(cmd);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="bg-black/90 border border-white/10 rounded-xl overflow-hidden backdrop-blur-xl">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="ml-4 text-sm text-white/60 font-mono">rishabh@portfolio:~/terminal</span>
        </div>

        {/* Terminal Content */}
        <div
          ref={terminalRef}
          className="h-80 overflow-y-auto p-4 font-mono text-sm"
        >
          {lines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`mb-2 ${line.type === 'input' ? 'text-green-400' : 'text-white/80'}`}
            >
              {line.type === 'input' ? (
                <span>
                  <span className="text-blue-400">user@portfolio</span>
                  <span className="text-white/60">:</span>
                  <span className="text-purple-400">~/terminal</span>
                  <span className="text-white/60"> $ </span>
                  {line.content}
                </span>
              ) : (
                <pre className="whitespace-pre-wrap">{line.content}</pre>
              )}
            </motion.div>
          ))}

          {/* Input Line */}
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="text-blue-400">user@portfolio</span>
            <span className="text-white/60">:</span>
            <span className="text-purple-400">~/terminal</span>
            <span className="text-white/60"> $ </span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-green-400 caret-green-400"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="w-2 h-4 bg-green-400 ml-1"
            />
          </form>
        </div>

        {/* Quick Commands */}
        <div className="px-4 py-3 bg-white/5 border-t border-white/10 flex flex-wrap gap-2">
          {quickCommands.map((cmd) => (
            <motion.button
              key={cmd}
              onClick={() => handleQuickCommand(cmd)}
              className="px-3 py-1 text-xs font-mono bg-white/10 hover:bg-white/20 text-white/80 rounded border border-white/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cmd}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
