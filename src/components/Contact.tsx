import { motion, useScroll, useTransform, useMotionValue, useSpring, useVelocity } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { name: 'GitHub', icon: Github, url: 'https://github.com/Rishabh028' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/rishabh-rajak-621318316/' },
  { name: 'Email', icon: Mail, url: 'mailto:rishabhrajak2004@gmail.com' },
];

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);
  const timeRef = useRef(0);

  const { scrollYProgress } = useScroll({ 
    target: sectionRef, 
    offset: ["start end", "end start"] 
  });
  
  // Velocity-based effects
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityX = useTransform(smoothVelocity, [-0.5, 0.5], [-20, 20]);
  const velocityRotate = useTransform(smoothVelocity, [-0.5, 0.5], [-3, 3]);
  
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  // Continuous floating animation values
  const floatY1 = useMotionValue(0);
  const floatY2 = useMotionValue(0);
  const floatX1 = useMotionValue(0);
  const floatRotate = useMotionValue(0);
  
  const springY1 = useSpring(floatY1, { stiffness: 30, damping: 10 });
  const springY2 = useSpring(floatY2, { stiffness: 25, damping: 12 });
  const springX1 = useSpring(floatX1, { stiffness: 20, damping: 10 });
  const springRotate = useSpring(floatRotate, { stiffness: 15, damping: 8 });

  useEffect(() => {
    let animationId: number;
    
    // Continuous animation loop
    const animate = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;
      
      floatY1.set(Math.sin(t * 0.6) * 12);
      floatY2.set(Math.sin(t * 0.5 + 1) * 15);
      floatX1.set(Math.sin(t * 0.4) * 20);
      floatRotate.set(Math.sin(t * 0.3) * 6);
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();

    if (footerRef.current) {
      setFooterHeight(footerRef.current.offsetHeight);
    }

    // Curtain reveal effect for footer
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { 
          clipPath: 'inset(100% 0 0 0)' 
        },
        {
          clipPath: 'inset(0% 0 0 0)',
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 0.5,
          }
        }
      );
    });

    return () => {
      cancelAnimationFrame(animationId);
      ctx.revert();
    };
  }, []);

  const scrollToTop = () => {
    const lenis = (window as any).lenis;
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      ref={sectionRef} 
      id="contact" 
      className="relative overflow-hidden"
    >
      {/* Continuous floating background elements */}
      <motion.div 
        className="absolute top-10 right-20 w-48 h-48 rounded-full blur-3xl opacity-10"
        style={{ 
          background: 'hsl(var(--foreground) / 0.1)',
          y: springY1,
          x: springX1,
          rotate: springRotate
        }}
      />
      <motion.div 
        className="absolute bottom-20 left-10 w-64 h-64 rounded-full blur-3xl opacity-8"
        style={{ 
          background: 'hsl(var(--foreground) / 0.05)',
          y: springY2,
          rotate: velocityRotate
        }}
      />
      
      <motion.div
        ref={footerRef}
        style={{ opacity, y }}
        className="py-20 px-4 md:px-8 border-t border-foreground/10 bg-background relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <motion.div style={{ y: springY2 }}>
              <motion.h2 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                className="text-4xl md:text-6xl font-bold mb-6"
                style={{ x: velocityX }}
              >
                Let's work<br />
                <span className="text-stroke">together</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: 0.1 }} 
                className="text-muted-foreground max-w-md"
              >
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </motion.p>
            </motion.div>
            
            <div className="flex flex-col justify-end">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                className="flex gap-4"
                style={{ y: springY1 }}
              >
                {socialLinks.map((link, index) => (
                  <motion.a 
                    key={link.name} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300" 
                    whileHover={{ scale: 1.1, y: -5 }} 
                    whileTap={{ scale: 0.95 }} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    data-cursor="pointer"
                  >
                    <link.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-foreground/10">
            <motion.p 
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              © 2024 Rishabh Rajak. All rights reserved.
            </motion.p>
            <motion.button 
              onClick={scrollToTop} 
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors" 
              whileHover={{ y: -2 }} 
              data-cursor="pointer"
            >
              Back to top 
              <motion.span 
                animate={{ y: [0, -3, 0] }} 
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowUp className="w-4 h-4" />
              </motion.span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};