import { motion, useScroll, useTransform, useMotionValue, useSpring, useVelocity } from 'framer-motion';
import { useRef, useEffect, useState, useMemo } from 'react';
import heroImage from '@/assets/profile-pic.jpg';
import { Download, ArrowDown } from 'lucide-react';

// Character animation component for staggered text reveal
const AnimatedText = ({ 
  text, 
  className, 
  delay = 0,
  isOutline = false 
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
          className={`inline-block ${isOutline ? 'text-transparent [-webkit-text-stroke:2px_hsl(var(--foreground)/0.4)] md:[-webkit-text-stroke:3px_hsl(var(--foreground)/0.4)]' : ''}`}
          initial={{ y: 100, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + index * 0.05,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Infinite horizontal marquee text
const MarqueeText = ({ words, direction = 'left', speed = 20 }: { words: string[]; direction?: 'left' | 'right'; speed?: number }) => {
  const repeatedWords = [...words, ...words, ...words, ...words];
  
  return (
    <div className="overflow-hidden whitespace-nowrap py-2">
      <motion.div
        className="inline-flex gap-8"
        animate={{
          x: direction === 'left' ? ['0%', '-25%'] : ['-25%', '0%']
        }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: 'linear'
          }
        }}
      >
        {repeatedWords.map((word, index) => (
          <span
            key={index}
            className="text-[8vw] md:text-[6vw] font-bold text-foreground/[0.015] tracking-tight select-none"
          >
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// Particle system
const Particle = ({ index }: { index: number }) => {
  const randomX = useMemo(() => Math.random() * 100, []);
  const randomY = useMemo(() => Math.random() * 100, []);
  const randomDelay = useMemo(() => Math.random() * 5, []);
  const randomDuration = useMemo(() => 3 + Math.random() * 4, []);
  const randomSize = useMemo(() => 2 + Math.random() * 4, []);
  
  return (
    <motion.div
      className="absolute rounded-full bg-foreground/20"
      style={{
        left: `${randomX}%`,
        top: `${randomY}%`,
        width: randomSize,
        height: randomSize,
      }}
      animate={{
        y: [-20, 20, -20],
        x: [-10, 10, -10],
        opacity: [0.1, 0.4, 0.1],
        scale: [1, 1.5, 1],
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  );
};

// Magnetic button effect
const MagneticButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.4;
    const distanceY = (e.clientY - centerY) * 0.4;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 15 }}
      className="group relative px-8 py-2.5 bg-foreground/10 backdrop-blur-sm text-foreground rounded-full font-medium text-sm overflow-hidden transition-all duration-300 hover:bg-foreground/20 border border-foreground/20 hover:border-foreground/40"
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

// Floating 3D Object component
const Float3DObject = ({ 
  className, 
  delay = 0, 
  floatY, 
  floatX, 
  floatRotate,
  children
}: { 
  className: string; 
  delay?: number;
  floatY: any;
  floatX: any;
  floatRotate: any;
  children?: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ y: floatY, x: floatX, rotateZ: floatRotate }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Neon flowing line - themed
const FlowingLine = ({ path, delay = 0 }: { path: string; delay?: number }) => {
  return (
    <motion.svg 
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
    >
      <motion.path
        d={path}
        fill="none"
        stroke="url(#neonGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 3, delay, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop', repeatDelay: 2 }}
        className="drop-shadow-[0_0_8px_hsl(var(--foreground)/0.3)]"
      />
      <defs>
        <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity="0.4" />
          <stop offset="50%" stopColor="hsl(var(--foreground))" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0.4" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};

const devKeywords = [
  'Multidisciplinary',
  'Analytical', 
  'Conscientious',
  'Industrious',
  'Innovative',
  'Creative',
  'Developer',
  'Engineer'
];

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const timeRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Velocity-based reactive transforms
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocitySkew = useTransform(smoothVelocity, [-0.5, 0.5], [-2, 2]);

  // Scroll-linked transforms (continuous scrubbing)
  const bgTextY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const bgTextScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const objectsParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  // Hero text fade on scroll
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 0.5, 0]);

  // Continuous floating animation values - NEVER STOPS (for background only)
  const floatY1 = useMotionValue(0);
  const floatY2 = useMotionValue(0);
  const floatY3 = useMotionValue(0);
  const floatX1 = useMotionValue(0);
  const floatX2 = useMotionValue(0);
  const floatRotate1 = useMotionValue(0);
  const floatRotate2 = useMotionValue(0);
  const floatRotate3 = useMotionValue(0);
  const pulseScale = useMotionValue(1);
  
  const springY1 = useSpring(floatY1, { stiffness: 20, damping: 10 });
  const springY2 = useSpring(floatY2, { stiffness: 15, damping: 12 });
  const springY3 = useSpring(floatY3, { stiffness: 25, damping: 8 });
  const springX1 = useSpring(floatX1, { stiffness: 18, damping: 10 });
  const springX2 = useSpring(floatX2, { stiffness: 22, damping: 12 });
  const springRotate1 = useSpring(floatRotate1, { stiffness: 12, damping: 6 });
  const springRotate2 = useSpring(floatRotate2, { stiffness: 10, damping: 8 });
  const springRotate3 = useSpring(floatRotate3, { stiffness: 8, damping: 5 });
  const springPulse = useSpring(pulseScale, { stiffness: 30, damping: 10 });

  // Generate particles
  const particles = useMemo(() => Array.from({ length: 50 }, (_, i) => i), []);

  useEffect(() => {
    setIsLoaded(true);
    let animationId: number;

    // Continuous animation loop - NEVER STOPS
    const animate = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;
      
      // Multi-frequency oscillations for organic, continuous feel
      floatY1.set(Math.sin(t * 0.5) * 30 + Math.sin(t * 1.2) * 10);
      floatY2.set(Math.sin(t * 0.4 + 1) * 40 + Math.cos(t * 0.8) * 15);
      floatY3.set(Math.sin(t * 0.6 + 2) * 25 + Math.sin(t * 1.5) * 8);
      floatX1.set(Math.sin(t * 0.3) * 50 + Math.cos(t * 0.7) * 20);
      floatX2.set(Math.cos(t * 0.35 + 1) * 45 + Math.sin(t * 0.9) * 15);
      floatRotate1.set(Math.sin(t * 0.2) * 15);
      floatRotate2.set(Math.cos(t * 0.25 + 0.5) * 20);
      floatRotate3.set(Math.sin(t * 0.15) * 25);
      pulseScale.set(1 + Math.sin(t * 0.8) * 0.05);
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      cancelAnimationFrame(animationId);
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
    <section 
      ref={sectionRef} 
      id="home" 
      className="min-h-screen relative overflow-hidden bg-background"
    >
      {/* Particle effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((index) => (
          <Particle key={index} index={index} />
        ))}
      </div>

      {/* Radial glow in center - themed */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--foreground)/0.08)_0%,transparent_70%)]"
        style={{ scale: springPulse }}
      />

      {/* Horizontal Marquee Text - Multiple Rows */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-center pointer-events-none select-none overflow-hidden opacity-50"
        style={{ y: bgTextY, scale: bgTextScale }}
      >
        <div className="relative -mt-20">
          <MarqueeText words={devKeywords} direction="left" speed={25} />
          <MarqueeText words={devKeywords} direction="right" speed={30} />
          <MarqueeText words={devKeywords} direction="left" speed={35} />
        </div>
      </motion.div>

      {/* Flowing lines - continuous animation */}
      <div className="absolute inset-0 opacity-40">
        <FlowingLine 
          path="M0,600 Q400,400 800,500 T1600,400 T1920,500" 
          delay={0} 
        />
        <FlowingLine 
          path="M0,700 Q500,500 1000,600 T1920,450" 
          delay={1.5} 
        />
        <FlowingLine 
          path="M1920,300 Q1400,500 800,400 T0,500" 
          delay={3} 
        />
      </div>

      {/* 3D Floating Objects - Continuous motion (background only) */}
      <motion.div style={{ y: objectsParallax }} className="absolute inset-0 pointer-events-none">
        {/* Abstract clock-like object (left side) */}
        <Float3DObject
          className="absolute top-[20%] left-[8%] w-32 h-32 md:w-48 md:h-48"
          delay={0.3}
          floatY={springY1}
          floatX={springX1}
          floatRotate={springRotate1}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 rounded-full bg-foreground/5 border border-foreground/10" />
            <div className="absolute inset-4 rounded-full bg-foreground/[0.02] backdrop-blur-sm" />
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-1 h-12 bg-foreground/20 rounded-full origin-bottom" />
            </motion.div>
          </div>
        </Float3DObject>

        {/* Abstract headphones-like object (right side) */}
        <Float3DObject
          className="absolute top-[15%] right-[10%] w-36 h-36 md:w-56 md:h-56"
          delay={0.5}
          floatY={springY2}
          floatX={springX2}
          floatRotate={springRotate2}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 rounded-3xl bg-foreground/5 border border-foreground/10 transform rotate-12" />
            <div className="absolute inset-6 rounded-2xl bg-foreground/[0.02]" />
            <motion.div 
              className="absolute inset-8 rounded-xl bg-foreground/[0.02]"
              animate={{ opacity: [0.02, 0.06, 0.02] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
        </Float3DObject>

        {/* Controller-like object (bottom center-right) */}
        <Float3DObject
          className="absolute bottom-[20%] right-[25%] w-40 h-28 md:w-64 md:h-44"
          delay={0.7}
          floatY={springY3}
          floatX={springX1}
          floatRotate={springRotate3}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 rounded-[2rem] bg-foreground/5 border border-foreground/10" />
            <div className="absolute top-4 left-8 w-10 h-10 rounded-full bg-foreground/10 blur-sm" />
            <div className="absolute bottom-4 right-8 w-6 h-6 rounded-full bg-foreground/15 blur-sm" />
            {/* Light trails */}
            <motion.div 
              className="absolute inset-0"
              style={{ 
                background: 'linear-gradient(90deg, transparent, hsl(var(--foreground) / 0.05), transparent)',
              }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </Float3DObject>

        {/* Small floating orbs */}
        <motion.div
          className="absolute top-[45%] left-[15%] w-4 h-4 rounded-full bg-foreground/30 blur-[2px]"
          style={{ y: springY2, x: springX2, scale: springPulse }}
        />
        <motion.div
          className="absolute top-[30%] right-[30%] w-3 h-3 rounded-full bg-foreground/25 blur-[2px]"
          style={{ y: springY1, x: springX1 }}
        />
        <motion.div
          className="absolute bottom-[35%] left-[30%] w-5 h-5 rounded-full bg-foreground/20 blur-[3px]"
          style={{ y: springY3, x: springX2 }}
        />
      </motion.div>

      {/* Main Content - Centered and FIXED (no floating) */}
      <motion.div 
        className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4"
        style={{ opacity: heroOpacity }}
      >
        {/* Small intro text - STABLE with animated reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <motion.p
            className="text-muted-foreground text-sm md:text-base tracking-[0.3em] uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hey, I am
          </motion.p>
        </motion.div>

        {/* Main Name - Character-by-character animated reveal */}
        <motion.div 
          className="mb-8 text-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* First name - solid fill */}
          <div className="overflow-hidden">
            <AnimatedText 
              text="Rishabh" 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground leading-[0.9]"
              delay={0.5}
            />
          </div>
          
          {/* Last name - outline style */}
          <div className="overflow-hidden -mt-1 md:-mt-2">
            <AnimatedText 
              text="Rajak" 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9]"
              delay={0.9}
              isOutline={true}
            />
          </div>
        </motion.div>

        {/* Location info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex items-center gap-8 mb-8 text-muted-foreground text-sm md:text-base"
        >
          {/* <span>Based in India</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground" />
          <span>IIT Guwahati</span> */}
        </motion.div>

        {/* Profile image with animated border - STABLE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 relative"
        >
          <div className="relative w-28 h-28 md:w-36 md:h-36">
            {/* Animated gradient border */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, hsl(var(--foreground)), hsl(var(--foreground)/0.3), hsl(var(--foreground)))',
                padding: '3px',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-full h-full rounded-full bg-background" />
            </motion.div>
            {/* Profile image */}
            <img
              src={heroImage}
              alt="Rishabh Rajak"
              className="absolute inset-[3px] w-[calc(100%-6px)] h-[calc(100%-6px)] rounded-full object-cover"
            />
          </div>
        </motion.div>

        {/* View Resume Button - STABLE (no floating animation) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.9 }}
          className="mb-12"
        >
          <MagneticButton onClick={handleDownloadResume}>
            View Resume
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 2.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      >
        <span className="text-muted-foreground text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
    </section>
  );
};