import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import heroImage from '@/assets/profile-1.png';
import profileInner from '@/assets/profile-inner.jpg';
import { Download, ArrowDown } from 'lucide-react';

const BG_IMAGE_1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85';
const BG_IMAGE_2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85';
const SPOTLIGHT_R = 260;

// ─── Character animation component for staggered text reveal ──────────────
const AnimatedText = ({
  text,
  className,
  delay = 0,
  isOutline = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  isOutline?: boolean;
}) => {
  const characters = text.split('');

  return (
    <motion.span className={`inline-block ${className}`}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className={`inline-block ${
            isOutline
              ? 'text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.4)] md:[-webkit-text-stroke:3px_rgba(255,255,255,0.4)]'
              : ''
          }`}
          initial={{ y: 100, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + index * 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// ─── Magnetic button effect ───────────────────────────────────────────────
const MagneticButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setPosition({
      x: (e.clientX - centerX) * 0.4,
      y: (e.clientY - centerY) * 0.4,
    });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 15 }}
      className="group relative px-8 py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-full font-medium text-sm overflow-hidden transition-all duration-300 hover:bg-white/20 border border-white/20 hover:border-white/40"
    >
      <span className="relative z-10 flex items-center gap-3 tracking-widest uppercase">
        {children}
        <motion.span
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Download className="w-4 h-4" />
        </motion.span>
      </span>
    </motion.button>
  );
};

// ─── RevealLayer: cursor-spotlight CSS mask ────────────────────────────
const RevealLayer = ({
  image,
  revealRef,
}: {
  image: string;
  revealRef: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <div
      ref={revealRef}
      className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none will-change-[mask-image]"
      style={{
        backgroundImage: `url(${image})`,
        maskImage: 'radial-gradient(circle 260px at -999px -999px, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.12) 88%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(circle 260px at -999px -999px, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.12) 88%, transparent 100%)',
      }}
    />
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────
export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cursor tracking with RAF-smoothed lerp - zero React re-renders
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number>(0);
  const isVisible = useRef(true);

  // Scroll-linked hero fade
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 0.5, 0]);

  useEffect(() => {
    setIsLoaded(true);

    const updateMask = () => {
      if (!isVisible.current) {
        rafRef.current = 0;
        return;
      }

      const dx = mouse.current.x - smooth.current.x;
      const dy = mouse.current.y - smooth.current.y;
      smooth.current.x += dx * 0.15;
      smooth.current.y += dy * 0.15;

      if (revealRef.current) {
        const mask = `radial-gradient(circle ${SPOTLIGHT_R}px at ${smooth.current.x.toFixed(1)}px ${smooth.current.y.toFixed(1)}px, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.12) 88%, transparent 100%)`;
        revealRef.current.style.maskImage = mask;
        revealRef.current.style.webkitMaskImage = mask;
      }

      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        rafRef.current = requestAnimationFrame(updateMask);
      } else {
        rafRef.current = 0;
      }
    };

    const startLoop = () => {
      if (!rafRef.current && isVisible.current) {
        rafRef.current = requestAnimationFrame(updateMask);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startLoop();
        } else {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = 0;
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      startLoop();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/src/assets/SDE_resume (1).pdf';
    link.download = '/src/assets/SDE_resume (1).pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.section
      ref={sectionRef}
      id="home"
      className="relative w-full overflow-hidden bg-black"
      style={{ height: '100dvh', opacity: heroOpacity }}
    >
      {/* ── Layer 1: Base image ──────────────────────────────────────── */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom"
        style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
      />

      {/* ── Layer 2: Reveal image (cursor spotlight) ─────────────────── */}
      <RevealLayer
        image={BG_IMAGE_2}
        revealRef={revealRef}
      />

      {/* ── Layer 3: Dark vignette overlay for text readability ──────── */}
      <div className="absolute inset-0 z-40 pointer-events-none bg-gradient-to-b from-black/30 via-black/20 to-black/60" />

      {/* ── Layer 4: Main hero content ──────────────────────────────── */}
      <motion.div
        className="relative z-50 h-full flex flex-col-reverse md:flex-row justify-center items-center px-4 max-w-7xl mx-auto gap-12 md:gap-24 pt-10 md:pt-0 -mt-8 md:-mt-12"
      >
        {/* Left side texts */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left md:pl-8 lg:pl-12">
          {/* Small intro */}
          <div
            className="mb-4 hero-anim hero-fade"
            style={{ animationDelay: '0.15s' }}
          >
            <p className="text-white/80 text-sm md:text-lg tracking-[0.3em] uppercase">
              Hey, I am
            </p>
          </div>

          {/* Name */}
          <div className="mb-4 overflow-hidden">
            <span
              className="hero-anim hero-reveal inline-block"
              style={{ animationDelay: '0.25s' }}
            >
              <AnimatedText
                text="Rishabh"
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[0.9]"
                delay={0.5}
              />
            </span>
            <br className="hidden md:block" />
            <span className="md:hidden"> </span>
            <span
              className="hero-anim hero-reveal inline-block mt-2"
              style={{ animationDelay: '0.42s' }}
            >
              <AnimatedText
                text="Rajak"
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9]"
                delay={0.9}
                isOutline
              />
            </span>
          </div>
          
          {/* About Me */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.5 }}
            className="mb-10"
          >
            <p className="text-white/70 text-sm md:text-lg max-w-2xl font-light leading-relaxed">
              Web Developer <span className="text-white/30 mx-2">|</span> Tech Enthusiast <span className="text-white/30 mx-2">|</span> Electronics and communication Engineer
            </p>
          </motion.div>

          {/* View Resume button */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.7 }}
            className="hero-anim hero-fade"
            style={{ animationDelay: '0.75s' }}
          >
            <MagneticButton onClick={handleDownloadResume}>
              View Resume
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right side Profile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative hero-anim hero-fade shrink-0"
        >
          <div className="relative w-48 h-48 md:w-80 md:h-80">
            {/* Spinning conic border */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'conic-gradient(from 0deg, #ffffff, rgba(255,255,255,0.3), #ffffff)',
                padding: '4px',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-full h-full rounded-full bg-black" />
            </motion.div>

            {/* Profile photo container */}
            <div 
              className="group absolute inset-[4px] w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full overflow-hidden"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
              }}
            >
              {/* Base profile image */}
              <img
                src={heroImage}
                alt="Rishabh Rajak"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Inner profile image (Spotlight Reveal) */}
              <img
                src={profileInner}
                alt="Rishabh Rajak Inner"
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  maskImage: 'radial-gradient(circle 100px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(circle 100px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)'
                }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 2.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-50 hero-anim hero-fade"
        style={{ animationDelay: '0.9s' }}
      >
        <span className="text-white/60 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-6 h-6 text-white/60" />
        </motion.div>
      </motion.div>

      {/* ── Bottom gradient blend into next section ─────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-50" />
    </motion.section>
  );
};
