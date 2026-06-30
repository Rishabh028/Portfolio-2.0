import { motion, useScroll, useTransform, useMotionValue, useSpring, useVelocity } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { HlsVideo } from './HlsVideo';
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
  

  
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  useEffect(() => {
    if (footerRef.current) {
      setFooterHeight(footerRef.current.offsetHeight);
    }
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
      className="relative overflow-hidden bg-background"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <div className="absolute inset-0 w-full h-full scale-[1.02] z-0 pointer-events-none overflow-hidden">
          <HlsVideo 
            src="https://stream.mux.com/01yW6GoUz01OTXk5w1Rt1MHkJWlCGIwj46SUONJZ4DJUE.m3u8"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-background/50" />
      </div>
      {/* Continuous floating background elements */}
      <motion.div 
        className="absolute top-10 right-20 w-48 h-48 rounded-full blur-3xl opacity-10"
        style={{ 
          background: 'hsl(var(--foreground) / 0.1)',
        }}
      />
      <motion.div 
        className="absolute bottom-20 left-10 w-64 h-64 rounded-full blur-3xl opacity-8"
        style={{ 
          background: 'hsl(var(--foreground) / 0.05)',
        }}
      />
      
      <motion.div
        ref={footerRef}
        style={{ opacity }}
        className="py-20 px-4 md:px-8 border-t border-foreground/10 relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                className="text-4xl md:text-6xl font-bold mb-6"
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
            </div>
            
            <div className="flex flex-col justify-end">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                className="flex gap-4"
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