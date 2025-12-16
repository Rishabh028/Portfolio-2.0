import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export const PageTransition = ({ children, id, className = '' }: PageTransitionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Smooth continuous scroll-linked transforms (work both directions)
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.3]);
  const y = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [60, 0, 0, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.98, 1, 1, 0.98]);

  // Spring versions for smooth interpolation
  const springY = useSpring(y, { stiffness: 80, damping: 20 });
  const springScale = useSpring(scale, { stiffness: 80, damping: 20 });
  const springOpacity = useSpring(opacity, { stiffness: 80, damping: 20 });

  return (
    <motion.div
      ref={sectionRef}
      id={id}
      className={`relative ${className}`}
      style={{
        opacity: springOpacity,
        y: springY,
        scale: springScale,
      }}
    >
      {children}
    </motion.div>
  );
};

// Parallax wrapper for elements within sections
export const ParallaxElement = ({ 
  children, 
  speed = 0.5,
  className = '' 
}: { 
  children: ReactNode; 
  speed?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y: springY }}
    >
      {children}
    </motion.div>
  );
};

// Fade slide for content blocks
export const FadeSlide = ({ 
  children, 
  direction = 'up',
  delay = 0,
  className = '' 
}: { 
  children: ReactNode; 
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const directionMap = {
    up: { y: [60, 0, 0, -60], x: [0, 0, 0, 0] },
    down: { y: [-60, 0, 0, 60], x: [0, 0, 0, 0] },
    left: { x: [60, 0, 0, -60], y: [0, 0, 0, 0] },
    right: { x: [-60, 0, 0, 60], y: [0, 0, 0, 0] },
  };

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], directionMap[direction].y);
  const x = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], directionMap[direction].x);

  const springY = useSpring(y, { stiffness: 80, damping: 25 });
  const springX = useSpring(x, { stiffness: 80, damping: 25 });
  const springOpacity = useSpring(opacity, { stiffness: 80, damping: 25 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ 
        opacity: springOpacity, 
        y: springY, 
        x: springX,
      }}
    >
      {children}
    </motion.div>
  );
};

// Stagger container for multiple items
export const StaggerContainer = ({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity: springOpacity }}
    >
      {children}
    </motion.div>
  );
};