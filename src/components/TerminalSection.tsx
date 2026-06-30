import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Terminal } from './Terminal';
import { HlsVideo } from './HlsVideo';

export const TerminalSection = () => {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} id="terminal" className="py-32 px-4 md:px-8 relative overflow-hidden bg-background">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <div className="absolute inset-0 w-full h-full scale-[1.02] z-0 pointer-events-none overflow-hidden">
          <HlsVideo 
            src="https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8"
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

      <motion.div className="max-w-6xl mx-auto relative z-10 pointer-events-auto">
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