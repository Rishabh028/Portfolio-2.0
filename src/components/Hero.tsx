import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import heroImage from '@/assets/profile-1.jpg';
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

// ─── RevealLayer: cursor-spotlight canvas mask ────────────────────────────
const RevealLayer = ({
  image,
  cursorX,
  cursorY,
}: {
  image: string;
  cursorX: number;
  cursorY: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  // Size the canvas to the viewport on mount + resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // On every cursor move, redraw the radial-gradient mask
  useEffect(() => {
    const canvas = canvasRef.current;
    const reveal = revealRef.current;
    if (!canvas || !reveal) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gradient = ctx.createRadialGradient(
      cursorX,
      cursorY,
      0,
      cursorX,
      cursorY,
      SPOTLIGHT_R,
    );
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.4, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.6, 'rgba(255,255,255,0.75)');
    gradient.addColorStop(0.75, 'rgba(255,255,255,0.4)');
    gradient.addColorStop(0.88, 'rgba(255,255,255,0.12)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2);
    ctx.fill();

    const dataURL = canvas.toDataURL();
    reveal.style.maskImage = `url(${dataURL})`;
    reveal.style.webkitMaskImage = `url(${dataURL})`;
    reveal.style.maskSize = '100% 100%';
    (reveal.style as any).webkitMaskSize = '100% 100%';
  }, [cursorX, cursorY]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ display: 'none' }}
      />
      <div
        ref={revealRef}
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
        style={{ backgroundImage: `url(${image})` }}
      />
    </>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────
export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cursor tracking with RAF-smoothed lerp
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number>(0);

  // Scroll-linked hero fade
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 0.5, 0]);

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
      setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
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
      className="relative w-full overflow-hidden bg-black"
      style={{ height: '100dvh' }}
    >
      {/* ── Layer 1: Base image ──────────────────────────────────────── */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom"
        style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
      />

      {/* ── Layer 2: Reveal image (cursor spotlight) ─────────────────── */}
      <RevealLayer
        image={BG_IMAGE_2}
        cursorX={cursorPos.x}
        cursorY={cursorPos.y}
      />

      {/* ── Layer 3: Dark vignette overlay for text readability ──────── */}
      <div className="absolute inset-0 z-40 pointer-events-none bg-gradient-to-b from-black/30 via-black/20 to-black/60" />

      {/* ── Layer 4: Main hero content ──────────────────────────────── */}
      <motion.div
        className="relative z-50 h-full flex flex-col-reverse md:flex-row justify-center items-center px-4 max-w-7xl mx-auto gap-12 md:gap-24 pt-10 md:pt-0 -mt-8 md:-mt-12"
        style={{ opacity: heroOpacity }}
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

            {/* Profile photo */}
            <img
              src={heroImage}
              alt="Rishabh Rajak"
              className="absolute inset-[4px] w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full object-cover"
            />
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
    </section>
  );
};
