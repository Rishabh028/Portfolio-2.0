import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'qualification', label: 'Education' },
  { id: 'projects', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'terminal', label: 'Terminal' },
  { id: 'contact', label: 'Contact' },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => setIsScrolled(latest > 0.02));

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;
      sections.forEach((section, index) => {
        if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          setActiveSection(navItems[index].id);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const lenis = (window as any).lenis;
      if (lenis) lenis.scrollTo(element);
      else element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-foreground origin-left z-[100]" style={{ scaleX: scrollYProgress }} />
      <motion.header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-6'}`} initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          <motion.a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="text-xl font-bold tracking-tight" whileHover={{ scale: 1.05 }} data-cursor="pointer">RR<span className="text-muted-foreground">.</span></motion.a>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <motion.button key={item.id} onClick={() => scrollToSection(item.id)} className={`text-sm tracking-wide transition-colors relative ${activeSection === item.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`} whileHover={{ y: -2 }} data-cursor="pointer">
                {item.label}
                {activeSection === item.id && <motion.div layoutId="activeNav" className="absolute -bottom-1 left-0 right-0 h-px bg-foreground" />}
              </motion.button>
            ))}
            <ThemeToggle />
          </nav>
          <motion.button className="md:hidden w-10 h-10 flex items-center justify-center" onClick={() => setIsOpen(!isOpen)} whileTap={{ scale: 0.95 }} data-cursor="pointer">
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </motion.header>
      <motion.div className="fixed inset-0 bg-background z-40 md:hidden flex flex-col justify-center items-center gap-8" initial={{ opacity: 0, x: '100%' }} animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : '100%' }} transition={{ duration: 0.3 }} style={{ pointerEvents: isOpen ? 'auto' : 'none' }}>
        {navItems.map((item, index) => (
          <motion.button key={item.id} onClick={() => scrollToSection(item.id)} className="text-4xl font-bold" initial={{ opacity: 0, y: 20 }} animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }} transition={{ delay: index * 0.1 }} data-cursor="pointer">{item.label}</motion.button>
        ))}
      </motion.div>
    </>
  );
};
