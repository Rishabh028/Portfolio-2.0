export interface AIResponse {
  text: string;
  chips?: string[];
  links?: { label: string; url: string }[];
}

export interface ProjectDetail {
  id: string;
  name: string;
  category: string;
  tagline: string;
  status: string;
  overview: string;
  keyFeatures: string[];
  techStack: string[];
  github: string;
  live?: string;
  highlights: string;
}

export const PORTFOLIO_KNOWLEDGE = {
  profile: {
    name: "Rishabh Rajak",
    title: "Full-Stack Developer, Systems Architect & Creative Technologist",
    institution: "Indian Institute of Technology (IIT) Guwahati",
    degree: "B.Tech in Electronics and Communication Engineering (ECE)",
    graduation: "2022 - 2026",
    location: "Guwahati, Assam, India",
    email: "rishabhrajak2004@gmail.com",
    github: "https://github.com/Rishabh028",
    linkedin: "https://www.linkedin.com/in/rishabh-rajak-621318316/",
    summary: "Rishabh Rajak is an engineer and software developer at IIT Guwahati (ECE, Class of 2026). He specializes in scalable distributed systems, high-concurrency backend engineering, modern edge cloud platforms, interactive 3D web applications with Three.js, and IoT/embedded systems."
  },
  
  projects: [
    {
      id: "voltage",
      name: "Voltage",
      category: "Edge Cloud Platform",
      tagline: "The Cloud for Builders & Autonomous Agents",
      status: "🚧 In Active Development",
      overview: "A developer-first edge cloud deployment platform inspired by Vercel and Render. It takes any Git repository and transforms it into a globally routed edge deployment with zero Docker configuration.",
      keyFeatures: [
        "Native Edge Builder Engine with zero-Docker compilation and automatic monorepo resolution",
        "Dynamic Subdomain Routing using *.localhost and direct universal path routing via OpenResty/Nginx",
        "Live Real-Time SSE Log Streaming piping compilation stdout/stderr straight into the web dashboard",
        "AES-256-GCM zero-knowledge authenticated secrets encryption for environment variables",
        "Auto-detection for Next.js (App & Pages router), Vite, React, and static SPAs",
        "Circuit-breaker persistence with instant fallback to local disk storage during upstream outages"
      ],
      techStack: ["Next.js 14", "TypeScript", "Node.js", "Express", "Tailwind CSS", "OpenResty", "Server-Sent Events (SSE)", "AES-256-GCM"],
      github: "https://github.com/Rishabh028/Voltage",
      highlights: "Built from scratch to eliminate container overhead for fast edge deployments with encrypted secrets and real-time terminal telemetry."
    },
    {
      id: "seatlock",
      name: "SeatLock",
      category: "Distributed Systems & Concurrency",
      tagline: "Industrial-Grade Event Ticketing & Seat Reservation Platform",
      status: "✅ Live Production App",
      overview: "An industrial-grade distributed ticketing engine engineered to completely eradicate race conditions, double-bookings, phantom inventory, and duplicate webhook settlements under extreme concurrent load.",
      keyFeatures: [
        "Pessimistic Row-Level Locking (SELECT ... FOR UPDATE) preventing simultaneous booking collisions",
        "PostgreSQL partial unique index storage-engine invariant guaranteeing zero double-reservations at DB layer",
        "Interactive Three.js 3D Stadium Visualizer with orbit controls, volumetric lighting, and tier selection",
        "Cursor-reactive 3D Holographic Tilt Ticket with metallic glare shader and dynamic cryptographic QR code",
        "Stripe Payment Gateway integration with PaymentIntents and HMAC webhook signature verification",
        "BullMQ background job queues with Transactional Outbox pattern for idempotent settlement",
        "Google OAuth 2.0 cryptographic token verification and auto user provisioning"
      ],
      techStack: ["Next.js 16", "TypeScript", "Fastify", "Three.js", "PostgreSQL 16", "Redis", "Stripe API", "BullMQ", "Docker"],
      github: "https://github.com/Rishabh028/SeatLock",
      live: "https://seatlock-front.vercel.app",
      highlights: "Validated with an automated concurrency test suite running 100 concurrent threads competing for the exact same seat with 0 double-bookings."
    },
    {
      id: "codepilot",
      name: "CodePilot AI",
      category: "AI Developer Tool",
      tagline: "Autonomous 8-Agent Software Lifecycle Automation",
      status: "✅ Completed",
      overview: "An advanced multi-agent development suite featuring 8 specialized AI agents that orchestrate everything from architectural requirements analysis to automated code generation, security scanning, and deployment.",
      keyFeatures: [
        "8 Specialized AI Agents: Architect, Code Generator, Code Reviewer, Security Scanner, Test Writer, and Deployer",
        "Real-time WebSocket streaming for live code generation and terminal output",
        "Powered by Anthropic Claude 3.5 Sonnet with fine-tuned domain prompts",
        "Automated vulnerability detection and test-suite verification",
        "Chat-based visual workflow canvas coordinating agents"
      ],
      techStack: ["Node.js", "Express", "PostgreSQL", "Prisma", "Anthropic Claude 3.5 Sonnet", "React 18", "Tailwind CSS"],
      github: "https://github.com/Rishabh028/CodePilot-AI",
      highlights: "Coordinates autonomous agents in parallel to generate production-ready code with live streaming feedback."
    },
    {
      id: "swasthai",
      name: "SwasthAI",
      category: "Healthcare Platform",
      tagline: "AI-Powered Comprehensive Healthcare & Telemedicine Ecosystem",
      status: "✅ Completed",
      overview: "A modern, full-spectrum digital healthcare platform connecting patients with certified doctors, diagnostic laboratories, and pharmacies with ABHA compatibility.",
      keyFeatures: [
        "Smart Doctor Finder & Appointment Scheduler with specialty, location, and rating filters",
        "AI-driven Clinical Symptom Checker recommending appropriate medical specialists",
        "ABHA-compatible digital health record storage and prescription tracking",
        "Integrated Medicine Pharmacy ordering with live dispatch tracking",
        "Telemedicine HD video consultation panel with real-time consultation notes",
        "Interactive 3D anatomical body scanner highlighting pain points"
      ],
      techStack: ["React 18.2", "React Router 6", "React Query 5", "Tailwind CSS", "Framer Motion", "Base44 API", "Axios", "Date-fns"],
      github: "https://github.com/Rishabh028/SwasthAI-Old",
      highlights: "End-to-end patient care bridging consultations, diagnostic booking, and prescription delivery in one unified portal."
    },
    {
      id: "codeverse",
      name: "CodeVerse",
      category: "Developer Tool & Online Judge",
      tagline: "Feature-Rich LeetCode Clone & Algorithm Arena",
      status: "✅ Live Production App",
      overview: "A web-based competitive programming and DSA practice platform designed as a modern LeetCode clone with interactive Monaco code editing, test evaluation, and progress heatmaps.",
      keyFeatures: [
        "Integrated Monaco Code Editor with multi-language syntax highlighting and testcase execution",
        "Dynamic problem catalog synchronized in real-time with Firebase Firestore",
        "Instant judge evaluation providing test case validation and execution time stats",
        "User progress tracking, difficulty breakdown (Easy, Medium, Hard), and activity streak heatmap",
        "Embedded video solutions and community discussion forums"
      ],
      techStack: ["Next.js", "Firebase Firestore", "Firebase Auth", "Tailwind CSS", "Monaco Editor"],
      github: "https://github.com/Rishabh028/CodeVerse",
      live: "https://code-verse-6ji0ghvlk-rishabh028s-projects.vercel.app/",
      highlights: "Full-fledged algorithm practice arena with real-time judge testing and detailed analytics."
    },
    {
      id: "stayfinder",
      name: "StayFinder Pro",
      category: "Booking Platform",
      tagline: "Modern Luxury Hotel & Resort Reservation System",
      status: "✅ Live Production App",
      overview: "A sleek hotel booking and property management platform built with React and Supabase, offering seamless stay discovery, multi-step booking, and an owner management portal.",
      keyFeatures: [
        "Real-time hotel search with multi-parameter filters (price, rating, amenities, location)",
        "Detailed property profiles with photo galleries, guest reviews, and availability calendar",
        "User dashboard with wishlist management and reservation tracking",
        "Admin control panel and property owner portal for managing listings and bookings",
        "Supabase authentication and row-level security policies"
      ],
      techStack: ["React", "Vite", "Supabase", "Tailwind CSS", "Vercel"],
      github: "https://github.com/Rishabh028/StayFinder",
      live: "https://stay-finder-75qt.vercel.app/",
      highlights: "Full reservation lifecycle with real-time database reactivity and dedicated owner analytics."
    }
  ],

  skills: {
    frontend: ["React 18/19", "Next.js (App & Pages Router)", "TypeScript", "JavaScript (ESNext)", "Tailwind CSS", "Three.js", "Framer Motion", "HTML5 & Modern CSS", "Vite", "Zustand / Redux"],
    backend: ["Node.js", "Express", "Fastify", "PostgreSQL", "MongoDB", "Redis", "Prisma ORM", "REST APIs", "GraphQL", "WebSockets", "Server-Sent Events (SSE)"],
    systemsAndCloud: ["Docker", "Linux / Bash", "Git & GitHub", "OpenResty / Nginx", "Supabase", "Firebase", "Vercel", "BullMQ (Queues)", "Distributed Locking"],
    aiAndTools: ["Anthropic Claude 3.5 Sonnet API", "OpenAI APIs", "Prompt Engineering", "Multi-Agent Workflows", "Vector/Embedding basics"],
    iotAndHardware: ["Arduino", "ESP8266 / ESP32", "Microcontroller Interfacing", "Serial Communications", "Embedded C++", "Sensors & Actuators"]
  }
};

/**
 * Natural language intent matcher and response generator
 */
export function generateAIResponse(userInput: string): AIResponse {
  const query = userInput.toLowerCase().trim();

  // 1. Greetings & Casual
  if (/^(hi|hello|hey|greetings|hola|namaste|yo|sup|good (morning|afternoon|evening))\b/i.test(query)) {
    return {
      text: `Hello! 👋 I'm Rishabh's AI Portfolio Assistant. I can tell you all about Rishabh's projects (like **Voltage** and **SeatLock**), his technical skills, his education at **IIT Guwahati**, or how to get in touch. What would you like to know?`,
      chips: ["⚡ Tell me about Voltage", "🎟️ How SeatLock works", "🛠️ What is your tech stack?", "🎓 Education & IIT Guwahati", "📬 How to contact Rishabh?"]
    };
  }

  // 2. Who is Rishabh / Bio / About
  if (/(who is|about rishabh|tell me about (yourself|him|rishabh)|introduce|bio|background|profile|summary)\b/i.test(query)) {
    const { name, title, institution, degree, graduation, summary, email } = PORTFOLIO_KNOWLEDGE.profile;
    return {
      text: `**${name}** is a **${title}** currently pursuing his **${degree}** at the prestigious **${institution}** (${graduation}).\n\n${summary}\n\nHe has built cutting-edge systems including an edge cloud deployment engine (**Voltage**) and a race-condition-free distributed ticketing platform with Three.js 3D visuals (**SeatLock**).\n\nFeel free to explore his projects or email him at [${email}](mailto:${email})!`,
      chips: ["⚡ Tell me about Voltage", "🎟️ Tell me about SeatLock", "🛠️ Full Tech Stack", "📬 Contact Info"]
    };
  }

  // 3. Voltage Project Deep Dive
  if (/(\bvoltage\b|edge cloud|cloud deployment|deploy platform|builder engine|\*\.localhost)/i.test(query)) {
    const p = PORTFOLIO_KNOWLEDGE.projects.find(x => x.id === "voltage")!;
    return {
      text: `⚡ **Voltage — Edge Cloud Platform** (${p.status})\n\n${p.overview}\n\n**Key Highlights:**\n• ${p.keyFeatures[0]}\n• ${p.keyFeatures[1]}\n• ${p.keyFeatures[2]}\n• ${p.keyFeatures[3]}\n• ${p.keyFeatures[4]}\n\n**Tech Stack:** ${p.techStack.join(", ")}\n\nCheck out the repository on [GitHub](${p.github})!`,
      chips: ["🎟️ Tell me about SeatLock", "🤖 How about CodePilot AI?", "🛠️ Rishabh's Backend Skills", "📬 Contact Rishabh"],
      links: [{ label: "View Voltage on GitHub", url: p.github }]
    };
  }

  // 4. SeatLock Project Deep Dive
  if (/(\bseatlock\b|seat lock|ticketing|reservation|race condition|pessimistic lock|row-level lock|stadium|3d ticket|three\.js ticket)/i.test(query)) {
    const p = PORTFOLIO_KNOWLEDGE.projects.find(x => x.id === "seatlock")!;
    return {
      text: `🎟️ **SeatLock — Distributed Ticketing Platform** (${p.status})\n\n${p.overview}\n\n**Architectural Highlights:**\n• **Pessimistic Row-Level Locking:** Uses \`SELECT ... FOR UPDATE\` to lock target seats within database transactions, completely preventing double-bookings.\n• **PostgreSQL Partial Unique Index:** Enforces zero duplicate reservations at the storage layer.\n• **Interactive Three.js 3D Stadium:** Tiered arena visualizer with orbital camera controls and volumetric lighting.\n• **3D Holographic Ticket:** Dynamic tilt card with metallic reflections and cryptographic verification QR.\n• **Stripe Integration & BullMQ:** HMAC webhook verification with idempotent Transactional Outbox processing.\n\n**Tech Stack:** ${p.techStack.join(", ")}\n\nYou can test the live application at [seatlock-front.vercel.app](${p.live}) or view the code on [GitHub](${p.github})!`,
      chips: ["⚡ How does Voltage compare?", "🌐 What is CodeVerse?", "🛠️ Database & Redis skills", "📬 Reach out to Rishabh"],
      links: [
        { label: "Visit Live Site", url: p.live! },
        { label: "View SeatLock on GitHub", url: p.github }
      ]
    };
  }

  // 5. CodePilot AI Deep Dive
  if (/(\bcodepilot\b|code pilot|ai agent|8 agent|multi-agent|claude 3\.5|code generator|security scanner)/i.test(query)) {
    const p = PORTFOLIO_KNOWLEDGE.projects.find(x => x.id === "codepilot")!;
    return {
      text: `🤖 **CodePilot AI — Autonomous Multi-Agent Platform**\n\n${p.overview}\n\n**Core Capabilities:**\n• **8 Specialized Agents:** Architect, Generator, Code Reviewer, Vulnerability Scanner, and Test Writer.\n• **Real-time WebSockets:** Live streaming of generated code, terminal output, and agent decisions.\n• **Powered by Claude 3.5 Sonnet:** Fine-tuned domain prompts producing production-grade syntax.\n\n**Tech Stack:** ${p.techStack.join(", ")}\n\nExplore the project on [GitHub](${p.github})!`,
      chips: ["🏥 What is SwasthAI?", "⚡ Tell me about Voltage", "🛠️ AI & LLM Skills", "📬 Contact Rishabh"],
      links: [{ label: "CodePilot on GitHub", url: p.github }]
    };
  }

  // 6. SwasthAI Deep Dive
  if (/(\bswasth\b|swasthai|health|telemedicine|doctor|patient|pharmacy|symptom checker|abha)/i.test(query)) {
    const p = PORTFOLIO_KNOWLEDGE.projects.find(x => x.id === "swasthai")!;
    return {
      text: `🏥 **SwasthAI — Intelligent Healthcare & Telemedicine**\n\n${p.overview}\n\n**Key Features:**\n• **Doctor Finder & Booking:** Filter by specialty, location, and verified reviews.\n• **AI Symptom Checker:** Analyzes symptoms and directs patients to proper medical specialists.\n• **ABHA Compatibility:** Secure digital medical records and prescription history.\n• **Telemedicine HD Consultations:** Real-time video appointments with doctors.\n• **Pharmacy Delivery & Lab Bookings:** Direct medicine orders and home sample collection.\n\n**Tech Stack:** ${p.techStack.join(", ")}\n\nExplore the codebase on [GitHub](${p.github})!`,
      chips: ["🏨 What is StayFinder Pro?", "⚡ Tell me about Voltage", "🛠️ Frontend Skills", "📬 Contact Rishabh"],
      links: [{ label: "SwasthAI on GitHub", url: p.github }]
    };
  }

  // 7. CodeVerse Deep Dive
  if (/(\bcodeverse\b|code verse|leetcode|online judge|coding arena|algo practice|monaco)/i.test(query)) {
    const p = PORTFOLIO_KNOWLEDGE.projects.find(x => x.id === "codeverse")!;
    return {
      text: `⚡ **CodeVerse — LeetCode Clone & Problem Arena** (${p.status})\n\n${p.overview}\n\n**Highlights:**\n• **Interactive Monaco Editor:** Full code editing with syntax highlighting and instant compilation.\n• **Dynamic Firestore Sync:** Real-time problem catalog with difficulty tags and constraints.\n• **Streak & Heatmaps:** User progress tracking with GitHub-style submission activity graphs.\n• **Video Walkthroughs:** Embedded video solutions for complex algorithmic problems.\n\n**Tech Stack:** ${p.techStack.join(", ")}\n\nTry it live at [code-verse.vercel.app](${p.live}) or view the code on [GitHub](${p.github})!`,
      chips: ["🏨 Tell me about StayFinder", "🎟️ How SeatLock works", "⚡ Tell me about Voltage", "📬 Contact Rishabh"],
      links: [
        { label: "Visit CodeVerse Live", url: p.live! },
        { label: "CodeVerse on GitHub", url: p.github }
      ]
    };
  }

  // 8. StayFinder Pro Deep Dive
  if (/(\bstayfinder\b|stay finder|hotel booking|resort|hotel|supabase booking)/i.test(query)) {
    const p = PORTFOLIO_KNOWLEDGE.projects.find(x => x.id === "stayfinder")!;
    return {
      text: `🏨 **StayFinder Pro — Luxury Hotel Booking Platform** (${p.status})\n\n${p.overview}\n\n**Key Features:**\n• **Dynamic Search:** Filter hotels by pricing, guest reviews, amenities, and locations.\n• **Interactive Booking Engine:** Multi-step reservation flow with instant confirmation.\n• **Admin & Owner Portals:** Dedicated dashboard for property managers to publish and edit listings.\n• **Supabase Backend:** High-performance real-time PostgreSQL database with Row-Level Security.\n\n**Tech Stack:** ${p.techStack.join(", ")}\n\nExperience it live at [stay-finder-75qt.vercel.app](${p.live}) or inspect on [GitHub](${p.github})!`,
      chips: ["⚡ Tell me about Voltage", "🎟️ Tell me about SeatLock", "🛠️ Full Tech Stack", "📬 Contact Rishabh"],
      links: [
        { label: "Visit StayFinder Live", url: p.live! },
        { label: "StayFinder on GitHub", url: p.github }
      ]
    };
  }

  // 9. All Projects Overview
  if (/(projects|what (has he|did he|have you) (built|made|created)|portfolio|work|showcase|apps)\b/i.test(query)) {
    return {
      text: `Rishabh has engineered several flagship projects spanning distributed systems, edge computing, AI, and full-stack web:\n\n1. ⚡ **Voltage:** Edge cloud deployment platform with zero-Docker compilation and real-time SSE logs.\n2. 🎟️ **SeatLock:** Distributed event ticketing with Three.js 3D stadium, row-level locking, and Stripe payments (Live).\n3. 🤖 **CodePilot AI:** 8-agent autonomous software lifecycle platform powered by Claude 3.5 Sonnet.\n4. 🏥 **SwasthAI:** Full-spectrum healthcare ecosystem with AI symptom checker and telemedicine.\n5. ⚡ **CodeVerse:** LeetCode clone online judge with Monaco editor and streak heatmaps (Live).\n6. 🏨 **StayFinder Pro:** Modern hotel booking platform with Supabase and owner management (Live).\n\nWhich project would you like a deep dive on?`,
      chips: ["⚡ Tell me about Voltage", "🎟️ How SeatLock works", "🤖 What is CodePilot AI?", "⚡ What is CodeVerse?"]
    };
  }

  // 10. Skills & Tech Stack
  if (/(skill|skills|tech stack|technologies|stack|what does he know|tools|frameworks|programming language|languages)\b/i.test(query)) {
    const s = PORTFOLIO_KNOWLEDGE.skills;
    return {
      text: `Rishabh has an extensive technical arsenal across modern web, distributed backends, and systems:\n\n• **Frontend:** ${s.frontend.join(", ")}\n• **Backend & Distributed:** ${s.backend.join(", ")}\n• **Databases & Queues:** PostgreSQL (Row-level locks), Redis, MongoDB, Prisma, BullMQ\n• **Cloud, Systems & DevOps:** Docker, OpenResty/Nginx, Linux/Bash, Git, Supabase, Firebase, Vercel\n• **AI Engineering:** Anthropic Claude API, OpenAI GPT, Multi-Agent pipelines, WebSockets\n• **IoT & Hardware:** Arduino, ESP8266/ESP32, Microcontroller C++, Sensor Interfacing\n\nLooking for his expertise with a specific technology? Ask away!`,
      chips: ["🎟️ Does he know Three.js?", "⚡ Experience with PostgreSQL & Redis?", "🤖 AI & LLM experience?", "🎓 Education"]
    };
  }

  // 11. Specific Tech Inquiries (Three.js, React, Next.js, Node, PostgreSQL, Redis, Docker, IoT, Python)
  if (/(\bthree\.?js\b|3d|webgl|shaders)/i.test(query)) {
    return {
      text: `Yes! Rishabh is highly skilled with **Three.js** and 3D web graphics. In **SeatLock**, he engineered an interactive 3D stadium arena with orbital cameras, volumetric lighting, and a cursor-reactive holographic 3D tilt ticket featuring metallic reflection shaders and dynamic QR codes!`,
      chips: ["🎟️ Tell me more about SeatLock", "🛠️ Frontend Skills", "⚡ Voltage Platform"]
    };
  }

  if (/(\bpostgresql\b|postgres|sql|row[- ]level lock|select \.\.\. for update|database|db|redis|mongodb)/i.test(query)) {
    return {
      text: `Rishabh has deep experience in database design and concurrency control:\n\n• **PostgreSQL:** Proficient with pessimistic locking (\`SELECT ... FOR UPDATE\`), partial unique indexes for data invariants, transactional boundaries, and schema design.\n• **Redis:** Used for sub-millisecond distributed caching, rate-limiting, and BullMQ background queue management.\n• **MongoDB & Firestore:** NoSQL document databases used across SwasthAI and CodeVerse.\n• **Prisma ORM & Supabase:** Type-safe database querying and row-level security (RLS).`,
      chips: ["🎟️ How SeatLock uses PostgreSQL", "⚡ Tell me about Voltage", "🛠️ Full Tech Stack"]
    };
  }

  if (/(\biot\b|arduino|esp8266|esp32|hardware|embedded|sensors)/i.test(query)) {
    return {
      text: `Alongside software engineering, Rishabh has a strong foundation in **IoT & Embedded Systems** through his Electronics & Communication Engineering background at IIT Guwahati. He has worked with **Arduino**, **ESP8266 / ESP32**, microcontroller firmware in C++, sensor arrays, and serial communication protocols.`,
      chips: ["🎓 Tell me about IIT Guwahati", "🛠️ All Skills", "⚡ Flagship Projects"]
    };
  }

  if (/(\bnext\.?js\b|react|frontend|tailwind|css)/i.test(query)) {
    return {
      text: `Rishabh is an expert in modern React and Next.js:\n\n• Built **Voltage** with **Next.js 14** (App Router, Server-Sent Events, dynamic routing).\n• Built **SeatLock** with **Next.js 16**, Fastify, and Three.js.\n• Uses **TypeScript** for strict type safety, **Tailwind CSS** for modern bespoke design systems, and **Framer Motion** for fluid micro-interactions and scroll animations.`,
      chips: ["⚡ Check out Voltage", "🎟️ Check out SeatLock", "📬 Contact Rishabh"]
    };
  }

  // 12. Education & College (IIT Guwahati)
  if (/(education|college|university|degree|iit|guwahati|study|school|btech|b\.tech|cgpa|branch|ece|academics)\b/i.test(query)) {
    const { name, institution, degree, graduation, location } = PORTFOLIO_KNOWLEDGE.profile;
    return {
      text: `🎓 **Education & Background:**\n\n**${name}** is an undergraduate student at the **${institution}** (${location}).\n\n• **Degree:** ${degree}\n• **Tenure:** ${graduation}\n• **Core Areas of Study:** Computer Architecture, Data Structures & Algorithms, Network Protocols, Digital Signal Processing, Embedded Systems, and Communication Systems.\n\nIIT Guwahati is renowned as one of India's premier engineering institutions, known for world-class technical rigor and research excellence.`,
      chips: ["🛠️ Rishabh's Tech Stack", "⚡ Flagship Projects", "💼 Is he open for hire?", "📬 Get in touch"]
    };
  }

  // 13. Contact / Email / Socials / Reach out
  if (/(contact|email|reach|message|talk to|socials|linkedin|github|twitter|phone|connect)\b/i.test(query)) {
    const { email, github, linkedin } = PORTFOLIO_KNOWLEDGE.profile;
    return {
      text: `📬 **Let's Connect!**\n\nYou can reach Rishabh through any of the following channels:\n\n• **Email:** [${email}](mailto:${email})\n• **GitHub:** [github.com/Rishabh028](${github})\n• **LinkedIn:** [linkedin.com/in/rishabh-rajak-621318316](${linkedin})\n\nHe usually responds within 24 hours and is always excited to discuss software engineering, distributed systems, and collaborative ideas!`,
      chips: ["💼 Hiring & Roles", "⚡ Explore Projects", "🛠️ Tech Stack"],
      links: [
        { label: "Send Email", url: `mailto:${email}` },
        { label: "GitHub Profile", url: github },
        { label: "LinkedIn Profile", url: linkedin }
      ]
    };
  }

  // 14. Hiring / Resume / Work Availability / Internships
  if (/(hire|job|work with|resume|cv|internship|roles|career|available|freelance|opportunity|opportunities)\b/i.test(query)) {
    const { email, linkedin } = PORTFOLIO_KNOWLEDGE.profile;
    return {
      text: `💼 **Open to Opportunities!**\n\nYes! Rishabh is actively seeking **Software Engineering**, **Full-Stack Developer**, and **Distributed/Backend Engineering** roles, internships, and high-impact freelance projects.\n\n**Why Rishabh?**\n• Strong CS foundation from **IIT Guwahati** (ECE '26).\n• Proven experience building production-grade distributed platforms (**SeatLock**, **Voltage**) that handle concurrency and cloud deployments.\n• Polyglot technologist skilled across React/Next.js, Node.js/Fastify, PostgreSQL, Three.js, Redis, and Cloud/Docker.\n\nDrop an email at [${email}](mailto:${email}) or connect on [LinkedIn](${linkedin}) to discuss opportunities!`,
      chips: ["📬 Send an Email", "⚡ View Key Projects", "🛠️ Full Tech Stack"],
      links: [
        { label: "Email Rishabh", url: `mailto:${email}` },
        { label: "LinkedIn Profile", url: linkedin }
      ]
    };
  }

  // 15. System Architecture / Concurrency
  if (/(architecture|concurrency|scalability|scale|distributed|load|race condition)\b/i.test(query)) {
    return {
      text: `⚙️ **Architecture & Concurrency Philosophy:**\n\nRishabh approaches system design with reliability and data correctness first:\n\n1. **Concurrency Control:** In **SeatLock**, he implemented Pessimistic Row-Level Locking (\`SELECT ... FOR UPDATE\`) combined with PostgreSQL partial unique indexes to guarantee that concurrent flash-sale requests never result in double-reservations or race conditions.\n2. **Resilience & Outbox Pattern:** Utilizes BullMQ queues and transactional outbox patterns to guarantee at-least-once delivery for webhook payments (Stripe) and background task processing.\n3. **Edge Performance:** In **Voltage**, zero-Docker lightweight execution and OpenResty dynamic reverse-proxy routing provide sub-second cold starts.`,
      chips: ["🎟️ SeatLock Details", "⚡ Voltage Details", "🛠️ Tech Stack"]
    };
  }

  // 16. Terminal / Interactive Shell
  if (/(terminal|shell|cli|command line|console)\b/i.test(query)) {
    return {
      text: `🖥️ The portfolio includes an **interactive Terminal** section! You can run commands like:\n\n• \`help\` — List all available commands\n• \`projects\` — View detailed project status\n• \`skills\` — Print technical skill matrix\n• \`contact\` — Display direct communication endpoints\n• \`clear\` — Reset terminal view\n\nScroll down to the Terminal section to test it directly!`,
      chips: ["⚡ Tell me about Voltage", "🎟️ Tell me about SeatLock", "🎓 Education"]
    };
  }

  // 17. Fun / Easter Eggs
  if (/(joke|funny|easter egg|hobby|hobbies|free time|fun)\b/i.test(query)) {
    const jokes = [
      "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
      "There are 10 types of people in the world: those who understand binary, and those who don't.",
      "Why did the developer go broke? Because he used up all his cache! 💸"
    ];
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    return {
      text: `${randomJoke}\n\nWhen Rishabh isn't coding high-concurrency systems or tinkering with Three.js shaders at IIT Guwahati, he enjoys exploring cutting-edge AI agent papers, listening to music, and experimenting with IoT hardware.`,
      chips: ["⚡ Tell me about Voltage", "🎟️ How SeatLock works", "🛠️ Tech Stack"]
    };
  }

  // 18. Smart Fallback with Intelligent Matching & Recommendations
  return {
    text: `I'm happy to help you discover everything about Rishabh Rajak! Here are some key things you can ask me about:\n\n• **Projects:** ⚡ *Voltage* (Edge Cloud), 🎟️ *SeatLock* (Distributed Ticketing & Three.js), 🤖 *CodePilot AI*, 🏥 *SwasthAI*, ⚡ *CodeVerse*, or 🏨 *StayFinder Pro*.\n• **Technical Skills:** React, Next.js, TypeScript, Node.js, Fastify, PostgreSQL, Three.js, Redis, Docker, and IoT.\n• **Background:** B.Tech at IIT Guwahati (ECE 2022-2026).\n• **Contact & Hiring:** How to reach him for software engineering roles or collaboration.\n\nWhat would you like to explore?`,
    chips: [
      "⚡ Tell me about Voltage",
      "🎟️ How does SeatLock work?",
      "🛠️ What is your tech stack?",
      "🎓 Education at IIT Guwahati",
      "📬 How to contact Rishabh?"
    ]
  };
}
