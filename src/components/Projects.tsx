import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ExternalLink, Github, FolderGit2 } from 'lucide-react';

import codepilotImg1 from '@/assets/projects/codepilot-1.jpg';
import codepilotImg2 from '@/assets/projects/codepilot-2.jpg';
import codepilotImg3 from '@/assets/projects/codepilot-3.jpg';

import swasthaiImg1 from '@/assets/projects/swasthai-1.jpg';
import swasthaiImg2 from '@/assets/projects/swasthai-2.jpg';
import swasthaiImg3 from '@/assets/projects/swasthai-3.jpg';

import codeverseImg1 from '@/assets/projects/codeverse-3.jpg';
import codeverseImg2 from '@/assets/projects/codeverse-2.jpg';
import codeverseImg3 from '@/assets/projects/codeverse-1.jpg';

import stayfinderImg1 from '@/assets/projects/stayfinder-1.jpg';
import stayfinderImg2 from '@/assets/projects/stayfinder-2.jpg';
import stayfinderImg3 from '@/assets/projects/stayfinder-3.jpg';

import voltageImg1 from '@/assets/projects/voltage-3.jpg';
import voltageImg2 from '@/assets/projects/voltage-2.jpg';
import voltageImg3 from '@/assets/projects/voltage-1.jpg';
import seatlockImg1 from '@/assets/projects/seatlock-3.jpg';
import seatlockImg2 from '@/assets/projects/seatlock-2.jpg';
import seatlockImg3 from '@/assets/projects/seatlock-1.jpg';

// Reusable FadeIn Component
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const FadeIn = ({ children, delay = 0, duration = 0.7, x = 0, y = 30, className = '', as = 'div' }: FadeInProps) => {
  const MotionComponent = motion.create(as as any);
  return (
    <MotionComponent
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};

// Reusable AnimatedText Component
const AnimatedText = ({ text, className = '' }: { text: string, className?: string }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2']
  });

  return (
    <p ref={ref} className={`relative flex flex-wrap ${className}`}>
      {text.split('').map((char, i) => {
        const start = i / text.length;
        const end = start + (1 / text.length);
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
        
        return (
          <span key={i} className="relative inline-block">
            <span className="invisible">{char === ' ' ? '\u00A0' : char}</span>
            <motion.span className="absolute left-0 top-0" style={{ opacity }}>
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          </span>
        );
      })}
    </p>
  );
};

const projectsData = [
  {
    id: 'codepilot',
    number: '01',
    category: 'AI Developer Tool',
    title: 'CodePilot AI',
    image1: codepilotImg1,
    image2: codepilotImg2,
    image3: codepilotImg3,
    description: 'An advanced AI-powered platform with 8 specialized agents that automate the entire software development lifecycle, from requirements analysis to production deployment.',
    github: 'https://github.com/Rishabh028/CodePilot-AI',
    live: '',
    features: [
      '8 Specialized AI Agents including Code Generator, Reviewer, and Security Scanner',
      'Real-time output streaming via WebSockets',
      'Chat-based agent interface',
      'Production-ready code generation in multiple languages',
    ],
    techStack: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Anthropic Claude 3.5 Sonnet', 'React 18', 'Tailwind CSS']
  },
  {
    id: 'swasthai',
    number: '02',
    category: 'Healthcare Platform',
    title: 'SwasthAI',
    image1: swasthaiImg1,
    image2: swasthaiImg2,
    image3: swasthaiImg3,
    description: 'A modern, AI-powered healthcare platform connecting patients with doctors, laboratories, hospitals, and pharmacies. Built with React and powered by Base44 healthcare data platform.',
    github: 'https://github.com/Rishabh028/SwasthAI-Old',
    live: '',
    features: [
      'Doctor Finder & Booking by specialty, location, and ratings',
      'AI-powered Symptom Checker with doctor recommendations',
      'Secure digital health record management (ABHA compatible)',
      'Lab Tests & Pharmacy Medicine ordering with home delivery',
      'Telemedicine via Video consultations with doctors',
      'Health Forum & Articles for community discussions and wellness tips',
      'Comprehensive Appointment & Multi-user Support (Patient, Doctor, Hospital, Lab Partner)'
    ],
    techStack: ['React 18.2', 'React Router 6', 'React Query 5', 'Tailwind CSS', 'Framer Motion', 'Lucide React', 'Vite 5', 'Base44 API', 'Axios', 'Date-fns']
  },
  {
    id: 'codeverse',
    number: '03',
    category: 'Developer Tool',
    title: 'CodeVerse',
    image1: codeverseImg1,
    image2: codeverseImg2,
    image3: codeverseImg3,
    description: 'CodeVerse is a feature-rich, web-based platform designed as a LeetCode clone. It provides a space for developers to practice and hone their data structures and algorithms skills with an interactive coding environment, detailed problem descriptions, and user progress tracking.',
    github: 'https://github.com/Rishabh028/CodeVerse',
    live: 'https://code-verse-6ji0ghvlk-rishabh028s-projects.vercel.app/',
    features: [
      'Full User Authentication with Firebase',
      'Dynamic Problem List fetched in real-time from Firestore',
      'Detailed Problem View with description, examples, and constraints',
      'Interactive Code Editor for writing and testing solutions',
      'User Progress Tracking (solved, liked, disliked, starred)',
      'Embedded Video Solutions for problems'
    ],
    techStack: ['Next.js', 'Firebase', 'Tailwind CSS']
  },
  {
    id: 'stayfinder',
    number: '04',
    category: 'Booking Platform',
    title: 'StayFinder Pro',
    image1: stayfinderImg2,
    image2: stayfinderImg3,
    image3: stayfinderImg1,
    description: 'A sleek, modern, and full-featured hotel booking platform built with React and Supabase. Discover, book, and manage your stays with a seamless and beautiful user experience.',
    github: 'https://github.com/Rishabh028/StayFinder',
    live: 'https://stay-finder-75qt.vercel.app/',
    features: [
      'Secure User Authentication powered by Supabase',
      'Dynamic Hotel Search with advanced filtering',
      'Detailed Hotel Pages with photo galleries, amenities, and reviews',
      'Personalized User Dashboard & Wishlist Functionality',
      'Effortless Booking Flow for multi-step reservations',
      'Admin Control Panel for managing bookings, users, and content',
      'Owner Portal for managing property listings and analytics'
    ],
    techStack: ['React', 'Vite', 'Supabase', 'Tailwind CSS', 'Vercel']
  },
  {
    id: 'voltage',
    number: '05',
    category: 'Edge Cloud Platform',
    title: 'Voltage',
    image1: voltageImg1,
    image2: voltageImg2,
    image3: voltageImg3,
    description: 'A developer-first edge cloud deployment platform — inspired by Vercel and Render — that transforms any Git repository into a live, globally routed edge deployment with zero configuration.',
    github: 'https://github.com/Rishabh028/Voltage',
    live: '',
    features: [
      'Native Edge Builder Engine with zero-Docker lightweight compilation and monorepo auto-resolution',
      'Real Dynamic Subdomain Routing with *.localhost and universal direct path URLs',
      'Live Real-Time SSE Log Streaming piping compilation stdout and stderr directly into the dashboard terminal',
      'AES-256-GCM authenticated zero-knowledge secrets encryption for environment variables',
      'Automatic Framework Detection for Next.js (App & Pages Router), Vite, React, and static SPAs',
      'Resilient Circuit-Breaker persistence with instant fallback to local disk storage during outages'
    ],
    techStack: ['Next.js 14', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'OpenResty', 'Server-Sent Events (SSE)', 'AES-256-GCM']
  },
  {
    id: 'seatlock',
    number: '06',
    category: 'Distributed Systems',
    title: 'SeatLock',
    image1: seatlockImg1,
    image2: seatlockImg2,
    image3: seatlockImg3,
    description: 'An industrial-grade, distributed event ticketing and seat reservation platform engineered to eliminate race conditions, double-bookings, phantom inventory, and webhook duplicates under extreme concurrent load.',
    github: 'https://github.com/Rishabh028/SeatLock',
    live: 'https://seatlock-front.vercel.app',
    features: [
      'Pessimistic Row-Level Locking (SELECT ... FOR UPDATE) preventing concurrent double-reservations',
      'Storage-Engine Invariant via PostgreSQL partial unique index guaranteeing zero double-bookings',
      'Interactive Three.js 3D Stadium Visualizer with volumetric lighting, tiered arcs, and orbit controls',
      'Cursor-reactive 3D Holographic Tilt Ticket with metallic glare and dynamic QR verification',
      'Full Stripe Payment Gateway integration with PaymentIntents and HMAC webhook signature verification',
      'Google OAuth 2.0 cryptographic token verification via google-auth-library and auto user provisioning',
      'Idempotent payment settlement with Transactional Outbox Pattern and BullMQ background workers',
      'Automated concurrency test suite simulating 100 concurrent threads competing for identical seats'
    ],
    techStack: ['Next.js 16', 'TypeScript', 'Fastify', 'Three.js', 'PostgreSQL 16', 'Redis', 'Stripe API', 'BullMQ', 'Docker']
  }
];

export type Project = typeof projectsData[0];

const ProjectCard = ({ project, index, progress, totalCards, onViewDetails }: any) => {
  // targetScale for card stacking down effect
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(progress, [index * (1 / totalCards), 1], [1, targetScale]);
  
  return (
    <div className="sticky top-24 md:top-32 h-[85vh] flex items-start justify-center w-full">
      <motion.div 
        style={{ 
          scale, 
          top: `calc(${index * 28}px)`,
          willChange: 'transform',
        }} 
        className="w-full h-full max-w-7xl bg-[#0C0C0C] border-2 border-[#D7E2EA] p-4 sm:p-6 md:p-8 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] origin-top flex flex-col relative overflow-hidden"
      >
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-6 md:mb-8 shrink-0 relative z-10">
          <div className="flex items-end gap-4">
            <span className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter">
              {project.number}
            </span>
            <div className="flex flex-col pb-1 md:pb-2">
              <span className="text-[#D7E2EA] uppercase tracking-widest text-sm mb-1 font-medium">
                {project.category}
              </span>
              <h3 className="text-3xl md:text-5xl font-bold text-white leading-none tracking-tight">
                {project.title}
              </h3>
            </div>
          </div>
          <button 
            onClick={() => onViewDetails(project)}
            className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors whitespace-nowrap z-20"
          >
            View Details
          </button>
        </div>

        {/* Bottom row: Two-column image grid */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 flex-1 min-h-0 relative z-10">
          {/* Left column (40%) */}
          <div className="w-full sm:w-[40%] flex flex-col gap-4 sm:gap-6 shrink-0 h-[40%] sm:h-full">
            <div 
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-white/5 border border-white/10"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            >
              <img src={project.image1} alt={`${project.title} image 1`} loading="lazy" decoding="async" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div 
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-white/5 border border-white/10 flex-1"
              style={{ minHeight: 'clamp(160px, 22vw, 340px)' }}
            >
              <img src={project.image2} alt={`${project.title} image 2`} loading="lazy" decoding="async" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
          
          {/* Right column (60%) */}
          <div className="w-full sm:w-[60%] h-[60%] sm:h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-white/5 border border-white/10">
            <img src={project.image3} alt={`${project.title} image 3`} loading="lazy" decoding="async" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const Projects = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <section 
      ref={containerRef} 
      id="projects" 
      className="relative z-10 bg-[#0C0C0C] font-kanit rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pb-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-24 md:pt-32">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
              className="w-14 h-14 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center"
            >
              <FolderGit2 className="w-7 h-7 text-white" />
            </motion.div>
            <span className="text-sm font-mono text-muted-foreground tracking-wider uppercase">
              Portfolio
            </span>
          </div>
          
          <motion.h2 
            className="text-5xl md:text-7xl font-bold tracking-tight text-white"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Selected
            <motion.span 
              className="block text-muted-foreground"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Projects
            </motion.span>
          </motion.h2>
        </motion.div>
        
        <div 
          className="flex flex-col relative w-full"
          style={{ height: `${projectsData.length * 100}vh` }}
        >
          {projectsData.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              index={index} 
              project={project} 
              progress={scrollYProgress} 
              totalCards={projectsData.length}
              onViewDetails={setSelectedProject}
            />
          ))}
        </div>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden bg-background border border-foreground/20 text-foreground flex flex-col rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold font-kanit">{selectedProject?.title}</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto flex-1 pr-4" data-lenis-prevent>
            <div className="mt-4 space-y-6">
              <p className="text-muted-foreground text-lg leading-relaxed">
                {selectedProject?.description}
              </p>

              <div>
                <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-px bg-foreground/20"></span> Key Features
                </h4>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {selectedProject?.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground bg-foreground/5 p-3 rounded-lg">
                      <div className="w-1.5 h-1.5 rounded-full bg-foreground/40 mt-2 shrink-0"></div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-px bg-foreground/20"></span> Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject?.techStack.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-foreground/10 text-foreground rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-6 border-t border-foreground/10">
                {selectedProject?.live && (
                  <a 
                    href={selectedProject.live} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded-full hover:scale-105 transition-transform"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Live Site
                  </a>
                )}
                {selectedProject?.github && (
                  <a 
                    href={selectedProject.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 border border-foreground/20 font-medium rounded-full hover:bg-foreground/5 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    View Source
                  </a>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
