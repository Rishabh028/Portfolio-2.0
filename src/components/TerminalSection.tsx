import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Terminal } from './Terminal';

export const TerminalSection = () => {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} id="terminal" className="py-32 px-4 md:px-8 relative">
      <motion.div style={{ opacity }} className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4"
          >
            Interactive Experience
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold"
          >
            Terminal
          </motion.h2>
        </div>

        {/* Terminal Component */}
        <Terminal />
      </motion.div>
    </section>
  );
};